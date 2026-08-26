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

export type PlayerRow = {
  name: string;
  junior: boolean;
  captainPick: boolean;
  rounds: (number | null)[];
};

/** Snapshot of the official qualifier sheet after 15 and 16 Aug 2026. Dates 5–8 TBD. Names match the sheet. */
export const players: PlayerRow[] = [
  { name: "Marco Samour", junior: false, captainPick: false, rounds: [null, 84, null, null, null, null, null, null] },
  { name: "Rodrigo Sol", junior: false, captainPick: false, rounds: [null, 77, null, null, null, null, null, null] },
  { name: "Juanfer Castellanos", junior: false, captainPick: false, rounds: [69, 73, null, null, null, null, null, null] },
  { name: "Gabriel Sanchez", junior: false, captainPick: false, rounds: [76, 82, null, null, null, null, null, null] },
  { name: "Daniel Guillen", junior: true, captainPick: false, rounds: [null, 82, null, null, null, null, null, null] },
  { name: "Samuel Kahn", junior: false, captainPick: false, rounds: [null, 77, null, null, null, null, null, null] },
  { name: "Marco Olano", junior: false, captainPick: false, rounds: [null, 90, null, null, null, null, null, null] },
  { name: "Paolo Cartagena", junior: false, captainPick: false, rounds: [null, 81, null, null, null, null, null, null] },
  { name: "Ever Ruiz", junior: false, captainPick: false, rounds: [84, 84, null, null, null, null, null, null] },
  { name: "Tomas Izaguire", junior: false, captainPick: false, rounds: [null, 78, null, null, null, null, null, null] },
  { name: "Sebastian Bettaglio", junior: false, captainPick: false, rounds: [83, 92, null, null, null, null, null, null] },
  { name: "Nicolas Betts", junior: false, captainPick: false, rounds: [null, 81, null, null, null, null, null, null] },
  { name: "Eduardo Alvarez", junior: false, captainPick: false, rounds: [86, 85, null, null, null, null, null, null] },
  { name: "Jose Bruyeros", junior: false, captainPick: false, rounds: [null, 87, null, null, null, null, null, null] },
  { name: "Peche Arguello", junior: false, captainPick: false, rounds: [null, 80, null, null, null, null, null, null] },
  { name: "Jordan Don", junior: false, captainPick: false, rounds: [74, 78, null, null, null, null, null, null] },
  { name: "Juan Pablo Diaz", junior: false, captainPick: false, rounds: [82, 80, null, null, null, null, null, null] },
  { name: "Carlos Guardado", junior: false, captainPick: false, rounds: [92, null, null, null, null, null, null, null] },
  { name: "Juan Diego Barrios", junior: false, captainPick: false, rounds: [84, null, null, null, null, null, null, null] },
];
