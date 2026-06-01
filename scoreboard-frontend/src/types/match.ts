export interface MatchState {
  localName: string;
  awayName: string;

  localScore: number;
  awayScore: number;

  period: number;

  timeSeconds: number;
  startTime: string; // human-readable scheduled start time, e.g. "21:00"
}