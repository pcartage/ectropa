import { holePars, players, qualifier, type PlayerRow } from "./golf-data";

export type HoleKindCounts = {
  eagles: number;
  birdies: number;
  pars: number;
  bogeys: number;
  doubles: number;
};

export type RoundCard = {
  dateIndex: number;
  dateLabel: string;
  total: number;
  holes: number[] | null;
  ida: number | null;
  vuelta: number | null;
  counts: HoleKindCounts | null;
};

export type PlayerHoleStats = HoleKindCounts & {
  name: string;
  par3VsPar: number | null;
  par4VsPar: number | null;
  par5VsPar: number | null;
  bestIda: number | null;
  bestVuelta: number | null;
  cards: RoundCard[];
};

export type HoleAverage = {
  hole: number;
  par: number;
  average: number;
  vsPar: number;
};

export type HighlightChip = {
  key: string;
  label: string;
  detail: string;
};

export type GolfStats = {
  byName: Record<string, PlayerHoleStats>;
  holeAverages: HoleAverage[];
  hardest: HoleAverage | null;
  easiest: HoleAverage | null;
  highlights: HighlightChip[];
  campoLine: string | null;
};

function emptyCounts(): HoleKindCounts {
  return { eagles: 0, birdies: 0, pars: 0, bogeys: 0, doubles: 0 };
}

export function classifyHoles(holes: number[]): HoleKindCounts & {
  ida: number;
  vuelta: number;
  par3: number[];
  par4: number[];
  par5: number[];
} {
  const counts = emptyCounts();
  const par3: number[] = [];
  const par4: number[] = [];
  const par5: number[] = [];
  holes.forEach((score, i) => {
    const par = holePars[i];
    const diff = score - par;
    if (diff <= -2) counts.eagles += 1;
    else if (diff === -1) counts.birdies += 1;
    else if (diff === 0) counts.pars += 1;
    else if (diff === 1) counts.bogeys += 1;
    else counts.doubles += 1;
    if (par === 3) par3.push(diff);
    else if (par === 4) par4.push(diff);
    else par5.push(diff);
  });
  return {
    ...counts,
    ida: holes.slice(0, 9).reduce((sum, n) => sum + n, 0),
    vuelta: holes.slice(9).reduce((sum, n) => sum + n, 0),
    par3,
    par4,
    par5,
  };
}

export function formatAvgVsPar(value: number): string {
  const rounded = Number(value.toFixed(2));
  if (rounded === 0) return "E";
  const body = Math.abs(rounded).toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
  return rounded > 0 ? `+${body}` : `-${body}`;
}

export function formatCounts(counts: HoleKindCounts): string {
  const parts = [
    `${counts.birdies} birdies`,
    `${counts.pars} pares`,
    `${counts.bogeys} bogeys`,
  ];
  if (counts.eagles > 0) parts.unshift(`${counts.eagles} ${counts.eagles === 1 ? "eagle" : "eagles"}`);
  if (counts.doubles > 0) parts.push(`${counts.doubles} dobles`);
  return parts.join(" · ");
}

function mean(values: number[]): number | null {
  if (values.length === 0) return null;
  return values.reduce((sum, n) => sum + n, 0) / values.length;
}

/** Unique min/max. Ties (would otherwise fall to name) are skipped. */
function uniqueExtreme<T>(
  items: T[],
  valueOf: (item: T) => number,
  direction: "min" | "max",
  nameOf: (item: T) => string,
): T | null {
  if (items.length === 0) return null;
  const target = direction === "min"
    ? Math.min(...items.map(valueOf))
    : Math.max(...items.map(valueOf));
  const tied = items.filter((item) => valueOf(item) === target);
  const names = new Set(tied.map(nameOf));
  if (names.size !== 1) return null;
  return tied[0];
}

export function computeGolfStats(rows: PlayerRow[] = players): GolfStats {
  const byName: Record<string, PlayerHoleStats> = {};
  const holeSums = holePars.map(() => 0);
  let holeRounds = 0;

  for (const player of rows) {
    const cards: RoundCard[] = [];
    const totals = emptyCounts();
    const par3: number[] = [];
    const par4: number[] = [];
    const par5: number[] = [];
    let bestIda: number | null = null;
    let bestVuelta: number | null = null;

    player.rounds.forEach((total, dateIndex) => {
      if (total == null) return;
      const holes = player.holes[dateIndex] ?? null;
      if (holes && holes.length === holePars.length) {
        const classified = classifyHoles(holes);
        totals.eagles += classified.eagles;
        totals.birdies += classified.birdies;
        totals.pars += classified.pars;
        totals.bogeys += classified.bogeys;
        totals.doubles += classified.doubles;
        par3.push(...classified.par3);
        par4.push(...classified.par4);
        par5.push(...classified.par5);
        if (bestIda == null || classified.ida < bestIda) bestIda = classified.ida;
        if (bestVuelta == null || classified.vuelta < bestVuelta) bestVuelta = classified.vuelta;
        holes.forEach((score, i) => {
          holeSums[i] += score;
        });
        holeRounds += 1;
        cards.push({
          dateIndex,
          dateLabel: qualifier.dates[dateIndex].label,
          total,
          holes,
          ida: classified.ida,
          vuelta: classified.vuelta,
          counts: {
            eagles: classified.eagles,
            birdies: classified.birdies,
            pars: classified.pars,
            bogeys: classified.bogeys,
            doubles: classified.doubles,
          },
        });
        return;
      }
      cards.push({
        dateIndex,
        dateLabel: qualifier.dates[dateIndex].label,
        total,
        holes: null,
        ida: null,
        vuelta: null,
        counts: null,
      });
    });

    byName[player.name] = {
      name: player.name,
      ...totals,
      par3VsPar: mean(par3),
      par4VsPar: mean(par4),
      par5VsPar: mean(par5),
      bestIda,
      bestVuelta,
      cards,
    };
  }

  const holeAverages: HoleAverage[] = holePars.map((par, i) => {
    const average = holeRounds > 0 ? holeSums[i] / holeRounds : 0;
    return { hole: i + 1, par, average, vsPar: average - par };
  });

  const hardest = holeRounds
    ? uniqueExtreme(holeAverages, (hole) => hole.vsPar, "max", (hole) => String(hole.hole))
    : null;
  const easiest = holeRounds
    ? uniqueExtreme(holeAverages, (hole) => hole.vsPar, "min", (hole) => String(hole.hole))
    : null;

  const withHoles = Object.values(byName).filter((player) => player.cards.some((card) => card.holes));
  const lowRounds: { name: string; score: number }[] = [];
  for (const player of rows) {
    for (const score of player.rounds) {
      if (score != null) lowRounds.push({ name: player.name, score });
    }
  }

  const low = uniqueExtreme(lowRounds, (round) => round.score, "min", (round) => round.name);
  const mostBirdies = uniqueExtreme(withHoles, (player) => player.birdies, "max", (player) => player.name);
  const mostEagles = uniqueExtreme(withHoles, (player) => player.eagles, "max", (player) => player.name);
  const fewestDoubles = uniqueExtreme(withHoles, (player) => player.doubles, "min", (player) => player.name);
  const bestPar3 = uniqueExtreme(
    withHoles.filter((player) => player.par3VsPar != null),
    (player) => player.par3VsPar as number,
    "min",
    (player) => player.name,
  );
  const bestPar4 = uniqueExtreme(
    withHoles.filter((player) => player.par4VsPar != null),
    (player) => player.par4VsPar as number,
    "min",
    (player) => player.name,
  );
  const bestPar5 = uniqueExtreme(
    withHoles.filter((player) => player.par5VsPar != null),
    (player) => player.par5VsPar as number,
    "min",
    (player) => player.name,
  );

  const highlights: HighlightChip[] = [];
  const add = (chip: HighlightChip | null | undefined) => {
    if (chip && highlights.length < 6) highlights.push(chip);
  };

  if (low) add({ key: "low", label: "Ronda más baja", detail: `${low.name} ${low.score}` });
  if (mostBirdies && mostBirdies.birdies > 0) {
    add({ key: "birdies", label: "Más birdies", detail: `${mostBirdies.name} ${mostBirdies.birdies}` });
  }
  if (mostEagles && mostEagles.eagles > 0) {
    add({ key: "eagles", label: "Más eagles", detail: `${mostEagles.name} ${mostEagles.eagles}` });
  }
  if (hardest) {
    add({
      key: "hard",
      label: "Hoyo más difícil",
      detail: `Hoyo ${hardest.hole} (${formatAvgVsPar(hardest.vsPar)})`,
    });
  }
  if (easiest) {
    add({
      key: "easy",
      label: "Hoyo más fácil",
      detail: `Hoyo ${easiest.hole} (${formatAvgVsPar(easiest.vsPar)})`,
    });
  }
  if (bestPar3 && bestPar3.par3VsPar != null) {
    add({
      key: "par3",
      label: "Mejor par 3",
      detail: `${bestPar3.name} ${formatAvgVsPar(bestPar3.par3VsPar)}`,
    });
  }
  if (bestPar4 && bestPar4.par4VsPar != null) {
    add({
      key: "par4",
      label: "Mejor par 4",
      detail: `${bestPar4.name} ${formatAvgVsPar(bestPar4.par4VsPar)}`,
    });
  }
  if (bestPar5 && bestPar5.par5VsPar != null) {
    add({
      key: "par5",
      label: "Mejor par 5",
      detail: `${bestPar5.name} ${formatAvgVsPar(bestPar5.par5VsPar)}`,
    });
  }
  if (fewestDoubles) {
    add({
      key: "doubles",
      label: "Menos dobles",
      detail: `${fewestDoubles.name} ${fewestDoubles.doubles}`,
    });
  }

  let campoLine: string | null = null;
  if (hardest && easiest) {
    campoLine = `El campo · Hoyo más difícil ${hardest.hole} (${formatAvgVsPar(hardest.vsPar)}) · Hoyo más fácil ${easiest.hole} (${formatAvgVsPar(easiest.vsPar)})`;
  } else if (hardest) {
    campoLine = `El campo · Hoyo más difícil ${hardest.hole} (${formatAvgVsPar(hardest.vsPar)})`;
  } else if (easiest) {
    campoLine = `El campo · Hoyo más fácil ${easiest.hole} (${formatAvgVsPar(easiest.vsPar)})`;
  }

  return { byName, holeAverages, hardest, easiest, highlights, campoLine };
}
