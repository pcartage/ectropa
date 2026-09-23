import { players, qualifier, type PlayerRow } from "./golf-data";

export type Status =
  | "qualify"
  | "captain-pick"
  | "captain-pool"
  | "junior-cap"
  | "need-more";

export type Standing = {
  player: PlayerRow;
  played: number;
  cumulative: number;
  average: number | null;
  best4: number | null;
  toPar: number | null;
  status: Status;
  needMore: number;
  pos: number;
  posLabel: string;
  autoQualify: boolean;
  cutAfter: boolean;
};

export function playedScores(rounds: (number | null)[]): number[] {
  return rounds.filter((n): n is number => typeof n === "number");
}

export function best4(rounds: (number | null)[]): number | null {
  const played = playedScores(rounds);
  if (played.length < qualifier.minRounds) return null;
  return [...played]
    .sort((a, b) => a - b)
    .slice(0, qualifier.bestOf)
    .reduce((sum, n) => sum + n, 0);
}

export function toPar(best4Sum: number | null): number | null {
  if (best4Sum == null) return null;
  return best4Sum - qualifier.par * qualifier.bestOf;
}

/** Primary order: average of rounds played (lower better). Unplayed last. */
function compareStandings(a: Standing, b: Standing): number {
  if (a.played === 0 && b.played === 0) return a.player.name.localeCompare(b.player.name);
  if (a.played === 0) return 1;
  if (b.played === 0) return -1;
  const avgA = a.average as number;
  const avgB = b.average as number;
  if (avgA !== avgB) return avgA - avgB;
  if (a.best4 != null && b.best4 != null && a.best4 !== b.best4) return a.best4 - b.best4;
  if ((a.best4 != null) !== (b.best4 != null)) return a.best4 != null ? -1 : 1;
  return a.player.name.localeCompare(b.player.name);
}

/**
 * Only the average top-`teamSize` window can Clasifica. Within that window,
 * at most `maxJuniors` juveniles qualify; extra juveniles stay junior-cap.
 * Does not pull players from below the cut to backfill junior slots.
 */
function assignAutoQualify(rows: Standing[]): void {
  const window: Standing[] = [];
  for (const row of rows) {
    if (row.played === 0) break;
    if (window.length < qualifier.teamSize) {
      window.push(row);
      continue;
    }
    // Include ties with the last player inside the band.
    const edge = window[window.length - 1];
    if (row.average === edge.average) window.push(row);
    else break;
  }
  let juniorsAuto = 0;
  for (const row of window) {
    if (row.player.junior && juniorsAuto >= qualifier.maxJuniors) continue;
    row.autoQualify = true;
    if (row.player.junior) juniorsAuto += 1;
  }
}

function assignStatus(row: Standing, rows: Standing[]): void {
  if (row.played === 0) {
    row.status = "need-more";
    row.needMore = qualifier.minRounds;
    return;
  }
  if (row.autoQualify) {
    row.status = "qualify";
    return;
  }
  if (row.player.captainPick) {
    row.status = "captain-pick";
    return;
  }
  // Juvenile who sits inside the average top-8 window but junior slots are full.
  if (row.player.junior) {
    const window = rows.filter((r) => r.played > 0).slice(0, qualifier.teamSize);
    if (window.some((r) => r.player.name === row.player.name)) {
      row.status = "junior-cap";
      return;
    }
  }
  if (row.played < qualifier.minRounds) {
    row.status = "need-more";
    row.needMore = qualifier.minRounds - row.played;
    return;
  }
  row.status = "captain-pool";
}

function assignPositions(rows: Standing[]): void {
  let i = 0;
  while (i < rows.length) {
    const current = rows[i];
    if (current.average == null) {
      current.pos = i + 1;
      current.posLabel = String(i + 1);
      i += 1;
      continue;
    }
    let j = i + 1;
    while (j < rows.length && rows[j].average === current.average) j += 1;
    const pos = i + 1;
    const tied = j - i > 1;
    const label = tied ? `T${pos}` : String(pos);
    for (let k = i; k < j; k += 1) {
      rows[k].pos = pos;
      rows[k].posLabel = label;
    }
    i = j;
  }
}

export function computeStandings(rows: PlayerRow[] = players): Standing[] {
  const standings: Standing[] = rows.map((player) => {
    const playedList = playedScores(player.rounds);
    const played = playedList.length;
    const cumulative = playedList.reduce((sum, n) => sum + n, 0);
    const best4Sum = best4(player.rounds);
    return {
      player,
      played,
      cumulative,
      average: played > 0 ? cumulative / played : null,
      best4: best4Sum,
      toPar: toPar(best4Sum),
      status: "need-more" as Status,
      needMore: Math.max(0, qualifier.minRounds - played),
      pos: 0,
      posLabel: "",
      autoQualify: false,
      cutAfter: false,
    };
  });

  standings.sort(compareStandings);
  assignAutoQualify(standings);
  for (const row of standings) assignStatus(row, standings);
  assignPositions(standings);

  // Cut after the average top-`teamSize` window (ties share a pos; line sits on last row in that band).
  let ranked = 0;
  let cutAt = -1;
  for (let i = 0; i < standings.length; i += 1) {
    if (standings[i].played === 0) break;
    ranked += 1;
    cutAt = i;
    if (ranked >= qualifier.teamSize) {
      // Include any remaining rows tied on the same average as the cut row.
      while (
        cutAt + 1 < standings.length &&
        standings[cutAt + 1].average === standings[cutAt].average
      ) {
        cutAt += 1;
      }
      break;
    }
  }
  if (cutAt >= 0) standings[cutAt].cutAfter = true;

  return standings;
}

export function formatToPar(value: number | null): string {
  if (value == null) return "";
  if (value === 0) return "E";
  return value > 0 ? `+${value}` : String(value);
}

export function formatAverage(value: number | null): string {
  if (value == null) return "";
  const rounded = Math.round(value * 100) / 100;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

export function formatStatus(row: Standing): string {
  switch (row.status) {
    case "qualify":
      return "Clasifica";
    case "captain-pick":
      return "Elección del capitán";
    case "captain-pool":
      return "Bolsa del capitán";
    case "junior-cap":
      return "Cupo juv. lleno";
    case "need-more":
      return `Faltan ${row.needMore}`;
  }
}

export function isUnderParRound(score: number | null): boolean {
  return score != null && score < qualifier.par;
}

export function isUnderToPar(value: number | null): boolean {
  return value != null && value < 0;
}
