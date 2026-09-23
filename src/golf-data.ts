export const qualifier = {
  club: "Club de Golf Corinto",
  event: "Interclubes Corinto 2027",
  dek: "Clasificatorio · juego por golpes · bruto · par 72",
  captain: "Ricardo Fuzzi",
  par: 72,
  bestOf: 4,
  minRounds: 4,
  autoQualify: 8,
  captainPicks: 2,
  teamSize: 8,
  maxJuniors: 2,
  dates: [
    { id: "d1", label: "15 ago", iso: "2026-08-15" },
    { id: "d2", label: "16 ago", iso: "2026-08-16" },
    { id: "d3", label: "6 sep", iso: "2026-09-06" },
    { id: "d4", label: "19 sep", iso: "2026-09-19" },
    { id: "d5", label: "Fecha 5", iso: "" },
    { id: "d6", label: "Fecha 6", iso: "" },
    { id: "d7", label: "Fecha 7", iso: "" },
    { id: "d8", label: "Fecha 8", iso: "" },
  ],
} as const;

/** Corinto par by hole. Ida 36, vuelta 36. */
export const holePars = [5, 4, 3, 5, 4, 4, 4, 3, 4, 4, 4, 3, 4, 5, 4, 3, 4, 5] as const;

export type PlayerRow = {
  name: string;
  junior: boolean;
  captainPick: boolean;
  rounds: (number | null)[];
  /** Parallel to `rounds`. Null when the date is unplayed or totals-only (15 ago). */
  holes: (number[] | null)[];
};

const emptyHoles: (number[] | null)[] = [null, null, null, null, null, null, null, null];

/** Snapshot after 15 ago, 16 ago, 6 Sep, and 19 Sep 2026. 15 ago is totals-only. */
export const players: PlayerRow[] = [
  { name: "Marco Samour", junior: true, captainPick: false, rounds: [null, 84, 76, 85, null, null, null, null], holes: [null, [5, 5, 3, 6, 6, 4, 4, 4, 6, 3, 7, 4, 4, 5, 5, 3, 4, 6], [5, 4, 3, 5, 4, 3, 4, 3, 5, 5, 5, 4, 4, 5, 4, 3, 5, 5], [6, 4, 6, 6, 6, 4, 6, 4, 5, 5, 4, 3, 5, 5, 4, 3, 4, 5], null, null, null, null] },
  { name: "Rodrigo Sol", junior: false, captainPick: false, rounds: [null, 77, null, null, null, null, null, null], holes: [null, [5, 5, 2, 4, 4, 4, 4, 4, 6, 4, 5, 4, 5, 5, 4, 3, 4, 5], null, null, null, null, null, null] },
  { name: "Juanfer Castellanos", junior: false, captainPick: false, rounds: [69, 73, 76, null, null, null, null, null], holes: [null, [5, 3, 3, 4, 5, 4, 4, 4, 5, 4, 4, 4, 5, 4, 4, 2, 4, 5], [4, 3, 3, 6, 4, 5, 4, 3, 4, 5, 4, 2, 5, 7, 5, 3, 4, 5], null, null, null, null, null] },
  { name: "Gabriel Sanchez", junior: false, captainPick: false, rounds: [76, 82, 75, null, null, null, null, null], holes: [null, [8, 3, 3, 6, 5, 6, 5, 4, 4, 4, 4, 4, 4, 5, 4, 3, 4, 6], [5, 3, 2, 5, 4, 5, 4, 4, 5, 3, 5, 4, 3, 5, 5, 3, 5, 5], null, null, null, null, null] },
  { name: "Daniel Guillen", junior: true, captainPick: false, rounds: [null, 82, 76, 75, null, null, null, null], holes: [null, [5, 7, 3, 6, 4, 5, 4, 4, 4, 5, 5, 3, 4, 6, 4, 3, 5, 5], [6, 4, 3, 7, 4, 4, 3, 4, 4, 4, 4, 4, 4, 5, 4, 3, 4, 5], [5, 4, 3, 5, 5, 4, 4, 3, 4, 4, 5, 2, 4, 6, 5, 3, 4, 5], null, null, null, null] },
  { name: "Samuel Kahn", junior: true, captainPick: false, rounds: [null, 77, 80, null, null, null, null, null], holes: [null, [5, 7, 3, 4, 4, 4, 5, 3, 4, 6, 4, 3, 5, 5, 3, 2, 5, 5], [7, 4, 3, 4, 4, 6, 4, 4, 4, 5, 4, 4, 4, 6, 4, 3, 5, 5], null, null, null, null, null] },
  { name: "Marco Olano", junior: false, captainPick: false, rounds: [null, 90, null, null, null, null, null, null], holes: [null, [7, 5, 3, 6, 5, 5, 7, 5, 5, 3, 5, 3, 4, 6, 6, 4, 4, 7], null, null, null, null, null, null] },
  { name: "Paolo Cartagena", junior: false, captainPick: false, rounds: [null, 81, 81, 81, null, null, null, null], holes: [null, [6, 3, 4, 6, 5, 4, 5, 4, 5, 5, 5, 3, 4, 5, 4, 4, 4, 5], [8, 4, 2, 6, 4, 4, 5, 3, 5, 4, 4, 4, 4, 6, 4, 3, 5, 6], [5, 4, 3, 6, 5, 5, 3, 3, 4, 3, 4, 5, 4, 6, 5, 3, 5, 8], null, null, null, null] },
  { name: "Ever Ruiz", junior: false, captainPick: false, rounds: [84, 84, 78, 81, null, null, null, null], holes: [null, [8, 5, 3, 4, 6, 4, 4, 4, 5, 4, 5, 4, 5, 5, 4, 4, 5, 5], [5, 5, 3, 5, 4, 4, 4, 4, 4, 5, 6, 4, 5, 5, 4, 3, 3, 5], [5, 6, 3, 5, 5, 5, 4, 3, 6, 4, 3, 4, 6, 8, 4, 3, 5, 2], null, null, null, null] },
  { name: "Tomas Izaguire", junior: false, captainPick: false, rounds: [null, 78, 79, null, null, null, null, null], holes: [null, [5, 3, 3, 7, 3, 4, 5, 4, 3, 4, 6, 3, 5, 4, 4, 4, 5, 6], [5, 4, 3, 6, 4, 3, 5, 3, 6, 4, 4, 3, 6, 6, 4, 4, 4, 5], null, null, null, null, null] },
  { name: "Sebastian Bettaglio", junior: false, captainPick: false, rounds: [83, 92, 84, null, null, null, null, null], holes: [null, [7, 5, 4, 8, 5, 5, 5, 4, 6, 5, 5, 4, 5, 5, 6, 4, 4, 6], [5, 4, 3, 4, 4, 5, 4, 4, 5, 5, 4, 5, 5, 5, 5, 5, 6, 6], null, null, null, null, null] },
  { name: "Nicolas Betts", junior: false, captainPick: false, rounds: [null, 81, 74, null, null, null, null, null], holes: [null, [4, 3, 3, 6, 4, 5, 5, 4, 6, 4, 5, 4, 4, 5, 5, 3, 5, 6], [4, 4, 3, 3, 4, 4, 4, 3, 4, 5, 6, 3, 5, 5, 5, 3, 4, 5], null, null, null, null, null] },
  { name: "Eduardo Alvarez", junior: false, captainPick: false, rounds: [86, 85, null, null, null, null, null, null], holes: [null, [6, 4, 5, 6, 4, 5, 4, 4, 6, 4, 5, 5, 4, 6, 5, 3, 3, 6], null, null, null, null, null, null] },
  { name: "Jose Bruyeros", junior: false, captainPick: false, rounds: [null, 87, null, null, null, null, null, null], holes: [null, [6, 5, 4, 5, 6, 4, 4, 4, 5, 4, 6, 4, 5, 7, 4, 4, 5, 6], null, null, null, null, null, null] },
  { name: "Peche Arguello", junior: false, captainPick: false, rounds: [null, 80, 83, null, null, null, null, null], holes: [null, [7, 3, 3, 6, 5, 4, 5, 4, 3, 4, 5, 4, 5, 5, 4, 3, 5, 5], [6, 6, 3, 5, 4, 5, 5, 4, 4, 4, 5, 3, 5, 6, 4, 4, 5, 5], null, null, null, null, null] },
  { name: "Jordan Don", junior: true, captainPick: false, rounds: [74, 78, 77, null, null, null, null, null], holes: [null, [6, 3, 3, 5, 4, 6, 4, 5, 4, 3, 4, 4, 4, 6, 3, 4, 4, 6], [5, 4, 3, 5, 3, 4, 4, 3, 5, 4, 5, 4, 6, 5, 4, 3, 4, 6], null, null, null, null, null] },
  { name: "Juan Pablo Diaz", junior: false, captainPick: false, rounds: [82, 80, null, null, null, null, null, null], holes: [null, [6, 4, 4, 5, 4, 5, 4, 4, 4, 4, 4, 5, 4, 5, 6, 3, 5, 4], null, null, null, null, null, null] },
  { name: "Carlos Guardado", junior: false, captainPick: false, rounds: [92, null, null, null, null, null, null, null], holes: emptyHoles },
  { name: "Juan Diego Barrios", junior: true, captainPick: false, rounds: [84, null, null, 81, null, null, null, null], holes: [null, null, null, [5, 4, 3, 7, 5, 5, 5, 3, 5, 5, 4, 3, 4, 6, 4, 3, 4, 6], null, null, null, null] },
  { name: "Alberto Castellanos", junior: false, captainPick: false, rounds: [null, null, 82, null, null, null, null, null], holes: [null, null, [4, 7, 3, 5, 4, 5, 4, 4, 4, 5, 4, 2, 5, 7, 4, 3, 5, 7], null, null, null, null, null] },
];
