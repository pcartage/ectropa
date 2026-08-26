import { players, qualifier, type PlayerRow } from "./golf-data";

export type Status = "qualify" | "captain-pick" | "captain-pool" | "need-more";

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

function compareStandings(a: Standing, b: Standing): number {
  const aReady = a.best4 != null;
  const bReady = b.best4 != null;
  if (aReady !== bReady) return aReady ? -1 : 1;
  if (aReady && bReady) {
    if (a.best4 !== b.best4) return (a.best4 as number) - (b.best4 as number);
    return a.player.name.localeCompare(b.player.name);
  }
  if (a.played === 0 && b.played === 0) return a.player.name.localeCompare(b.player.name);
  if (a.played === 0) return 1;
  if (b.played === 0) return -1;
  const avgA = a.cumulative / a.played;
  const avgB = b.cumulative / b.played;
  if (avgA !== avgB) return avgA - avgB;
  return a.player.name.localeCompare(b.player.name);
}

function assignAutoQualify(rows: Standing[]): void {
  let autos = 0;
  let juniorsAuto = 0;
  for (const row of rows) {
    if (row.best4 == null) continue;
    if (row.player.junior && juniorsAuto >= qualifier.maxJuniors) continue;
    if (autos >= qualifier.autoQualify) continue;
    row.autoQualify = true;
    autos += 1;
    if (row.player.junior) juniorsAuto += 1;
  }
}

function assignStatus(row: Standing): void {
  if (row.played < qualifier.minRounds) {
    row.status = "need-more";
    row.needMore = qualifier.minRounds - row.played;
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
  row.status = "captain-pool";
}

function assignPositions(rows: Standing[]): void {
  let i = 0;
  while (i < rows.length) {
    const current = rows[i];
    if (current.best4 == null) {
      current.pos = i + 1;
      current.posLabel = String(i + 1);
      i += 1;
      continue;
    }
    let j = i + 1;
    while (j < rows.length && rows[j].best4 === current.best4) j += 1;
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
      status: "need-more",
      needMore: Math.max(0, qualifier.minRounds - played),
      pos: 0,
      posLabel: "",
      autoQualify: false,
      cutAfter: false,
    };
  });

  standings.sort(compareStandings);
  assignAutoQualify(standings);
  for (const row of standings) assignStatus(row);
  assignPositions(standings);

  let lastQualify = -1;
  for (let i = 0; i < standings.length; i += 1) {
    if (standings[i].status === "qualify") lastQualify = i;
  }
  if (lastQualify >= 0) standings[lastQualify].cutAfter = true;

  return standings;
}

export function formatToPar(value: number | null): string {
  if (value == null) return "";
  if (value === 0) return "E";
  return value > 0 ? `+${value}` : String(value);
}

export function formatStatus(row: Standing): string {
  switch (row.status) {
    case "qualify":
      return "Qualify";
    case "captain-pick":
      return "Captain pick";
    case "captain-pool":
      return "Captain pool";
    case "need-more":
      return `Need ${row.needMore} more`;
  }
}

export function isUnderParRound(score: number | null): boolean {
  return score != null && score < qualifier.par;
}

export function isUnderToPar(value: number | null): boolean {
  return value != null && value < 0;
}
