export interface MatchState {
  localName: string;
  awayName: string;
  localScore: number;
  awayScore: number;
  period: number;
  timeSeconds: number;
  startTime: string;
}

export const defaultMatchState: MatchState = {
  localName: "EQUIPO A",
  awayName: "EQUIPO B",
  localScore: 0,
  awayScore: 0,
  period: 1,
  timeSeconds: 0,
  startTime: "21:00",
};
