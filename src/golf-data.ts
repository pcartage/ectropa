export const qualifier = {
  club: "Club de Golf Corinto",
  event: "Interclubes Corinto 2027",
  dek: "Clasificatorio · juego por golpes · bruto · par 72",
  captain: "Ricardo Fuzzi",
  par: 72,
  bestOf: 4,
  minRounds: 4,
  autoQualify: 6,
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

function holes16(scores: number[]): (number[] | null)[] {
  return [null, scores, null, null, null, null, null, null];
}

/** Snapshot of the official qualifier sheet after 15 and 16 Aug 2026. Dates 5–8 TBD. Names match the sheet. 15 ago is totals-only. */
export const players: PlayerRow[] = [
  { name: "Marco Samour", junior: false, captainPick: false, rounds: [null, 84, null, null, null, null, null, null], holes: holes16([5, 5, 3, 6, 6, 4, 4, 4, 6, 3, 7, 4, 4, 5, 5, 3, 4, 6]) },
  { name: "Rodrigo Sol", junior: false, captainPick: false, rounds: [null, 77, null, null, null, null, null, null], holes: holes16([5, 5, 2, 4, 4, 4, 4, 4, 6, 4, 5, 4, 5, 5, 4, 3, 4, 5]) },
  { name: "Juanfer Castellanos", junior: false, captainPick: false, rounds: [69, 73, null, null, null, null, null, null], holes: holes16([5, 3, 3, 4, 5, 4, 4, 4, 5, 4, 4, 4, 5, 4, 4, 2, 4, 5]) },
  { name: "Gabriel Sanchez", junior: false, captainPick: false, rounds: [76, 82, null, null, null, null, null, null], holes: holes16([8, 3, 3, 6, 5, 6, 5, 4, 4, 4, 4, 4, 4, 5, 4, 3, 4, 6]) },
  { name: "Daniel Guillen", junior: true, captainPick: false, rounds: [null, 82, null, null, null, null, null, null], holes: holes16([5, 7, 3, 6, 4, 5, 4, 4, 4, 5, 5, 3, 4, 6, 4, 3, 5, 5]) },
  { name: "Samuel Kahn", junior: false, captainPick: false, rounds: [null, 77, null, null, null, null, null, null], holes: holes16([5, 7, 3, 4, 4, 4, 5, 3, 4, 6, 4, 3, 5, 5, 3, 2, 5, 5]) },
  { name: "Marco Olano", junior: false, captainPick: false, rounds: [null, 90, null, null, null, null, null, null], holes: holes16([7, 5, 3, 6, 5, 5, 7, 5, 5, 3, 5, 3, 4, 6, 6, 4, 4, 7]) },
  { name: "Paolo Cartagena", junior: false, captainPick: false, rounds: [null, 81, null, null, null, null, null, null], holes: holes16([6, 3, 4, 6, 5, 4, 5, 4, 5, 5, 5, 3, 4, 5, 4, 4, 4, 5]) },
  { name: "Ever Ruiz", junior: false, captainPick: false, rounds: [84, 84, null, null, null, null, null, null], holes: holes16([8, 5, 3, 4, 6, 4, 4, 4, 5, 4, 5, 4, 5, 5, 4, 4, 5, 5]) },
  { name: "Tomas Izaguire", junior: false, captainPick: false, rounds: [null, 78, null, null, null, null, null, null], holes: holes16([5, 3, 3, 7, 3, 4, 5, 4, 3, 4, 6, 3, 5, 4, 4, 4, 5, 6]) },
  { name: "Sebastian Bettaglio", junior: false, captainPick: false, rounds: [83, 92, null, null, null, null, null, null], holes: holes16([7, 5, 4, 8, 5, 5, 5, 4, 6, 5, 5, 4, 5, 5, 6, 4, 4, 6]) },
  { name: "Nicolas Betts", junior: false, captainPick: false, rounds: [null, 81, null, null, null, null, null, null], holes: holes16([4, 3, 3, 6, 4, 5, 5, 4, 6, 4, 5, 4, 4, 5, 5, 3, 5, 6]) },
  { name: "Eduardo Alvarez", junior: false, captainPick: false, rounds: [86, 85, null, null, null, null, null, null], holes: holes16([6, 4, 5, 6, 4, 5, 4, 4, 6, 4, 5, 5, 4, 6, 5, 3, 3, 6]) },
  { name: "Jose Bruyeros", junior: false, captainPick: false, rounds: [null, 87, null, null, null, null, null, null], holes: holes16([6, 5, 4, 5, 6, 4, 4, 4, 5, 4, 6, 4, 5, 7, 4, 4, 5, 6]) },
  { name: "Peche Arguello", junior: false, captainPick: false, rounds: [null, 80, null, null, null, null, null, null], holes: holes16([7, 3, 3, 6, 5, 4, 5, 4, 3, 4, 5, 4, 5, 5, 4, 3, 5, 5]) },
  { name: "Jordan Don", junior: false, captainPick: false, rounds: [74, 78, null, null, null, null, null, null], holes: holes16([6, 3, 3, 5, 4, 6, 4, 5, 4, 3, 4, 4, 4, 6, 3, 4, 4, 6]) },
  { name: "Juan Pablo Diaz", junior: false, captainPick: false, rounds: [82, 80, null, null, null, null, null, null], holes: holes16([6, 4, 4, 5, 4, 5, 4, 4, 4, 4, 4, 5, 4, 5, 6, 3, 5, 4]) },
  { name: "Carlos Guardado", junior: false, captainPick: false, rounds: [92, null, null, null, null, null, null, null], holes: emptyHoles },
  { name: "Juan Diego Barrios", junior: false, captainPick: false, rounds: [84, null, null, null, null, null, null, null], holes: emptyHoles },
];
