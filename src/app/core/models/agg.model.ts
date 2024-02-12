export interface IAggsResults {
  T?: string;
  c?: number;
  h?: number;
  l?: number;
  n?: number;
  o?: number;
  t?: number;
  v?: number;
  vw?: number;
}

export enum Timespan {
  minute = 'minute',
  hour = 'hour',
  day = 'day',
  week = 'week',
  month = 'month',
}
