import { IAggregateStockEvent, UniversalSnapshotInfo } from '@polygon.io/client-js';
import { ITickerDetailsResults, SnapshotInfo } from '../app/core/models/polygon.io.models';

export const SNAPSHOT_INFO_MOCK: SnapshotInfo = {
  day: {},
  min: {},
  prevDay: {},
  ticker: 'test',
  todaysChange: 1,
  todaysChangePerc: 1,
  updated: 1710317839,
};

export const SNAPSHOT_SUMMARY_MOCK: ITickerDetailsResults = {
  ticker: 'test',
  description: 'test stock',
};

export const UNI_SNAPSHOT_MOCK: UniversalSnapshotInfo = {
  ticker: 'test',
  market_status: 'open',
};

export const LATEST_PRICE_MOCK: IAggregateStockEvent = {
  ev: 'AM',
  sym: 'test',
  v: 4110,
  av: 9470157,
  op: 0.4372,
  vw: 0.4488,
  o: 0.4488,
  c: 0.4486,
  h: 0.4489,
  l: 0.4486,
  a: 0.4352,
  z: 685,
  s: 1610144640000,
  e: 1610144700000,
};

export const BIGGEST_GAINERS_MOCK: SnapshotInfo[] = [SNAPSHOT_INFO_MOCK];

export const BIGGEST_LOSERS_MOCK: SnapshotInfo[] = [SNAPSHOT_INFO_MOCK];
