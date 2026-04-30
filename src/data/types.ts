export interface HistoricalEvent {
  year: number;
  description: string;
}

export interface HistoricalPeriod {
  id: number;
  category: string;
  startYear: number;
  endYear: number;
  events: HistoricalEvent[];
}
