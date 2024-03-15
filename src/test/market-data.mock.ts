import { IAggregateStockEvent, UniversalSnapshotInfo } from '@polygon.io/client-js';
import {
  ITickerDetailsResults,
  ITickerNewsResults,
  SnapshotInfo,
} from '../app/core/models/polygon.io.models';
import { TickerData } from '../app/state/market-data/market-data.state';

export const SNAPSHOT_INFO_MOCK: SnapshotInfo = {
  day: {},
  min: {},
  prevDay: {
    o: 1.01,
    c: 1.01,
  },
  ticker: 'test',
  todaysChange: 1,
  todaysChangePerc: 1,
  updated: 1710317839,
};

export const SNAPSHOT_SUMMARY_MOCK: ITickerDetailsResults = {
  ticker: 'test',
  name: 'test',
  primary_exchange: 'test',
  currency_name: 'USD',
  description: 'test stock',
  homepage_url: 'www.google.com',
  total_employees: 100,
  sic_code: 100,
  market_cap: 1000000,
  branding: {
    icon_url: 'www.google.com',
  },
};

export const UNI_SNAPSHOT_MOCK: UniversalSnapshotInfo = {
  ticker: 'test',
  market_status: 'open',
  session: {
    price: 1.11,
    open: 1.09,
    close: 1.11,
    late_trading_change: 1,
    late_trading_change_percent: 1,
    early_trading_change: 2,
    early_trading_change_percent: 2,
    change: 0.11,
    change_percent: 1.11,
    volume: 1000000,
    previous_close: 1.01,
  },
};

export const LATEST_PRICE_MOCK: IAggregateStockEvent = {
  ev: 'AM',
  sym: 'test',
  v: 4110,
  av: 9470157,
  op: 0.43,
  vw: 0.44,
  o: 0.44,
  c: 0.44,
  h: 0.44,
  l: 0.44,
  a: 0.43,
  z: 685,
  s: 1610144640000,
  e: 1610144700000,
};

export const BIGGEST_GAINERS_MOCK: SnapshotInfo[] = [SNAPSHOT_INFO_MOCK];

export const BIGGEST_LOSERS_MOCK: SnapshotInfo[] = [SNAPSHOT_INFO_MOCK];

export const TICKER_DATA: TickerData = {
  summary: SNAPSHOT_SUMMARY_MOCK,
  uniSnapshot: UNI_SNAPSHOT_MOCK,
};

export const AGG_STOCK_EVENT_MOCK: IAggregateStockEvent = {
  ev: 'AM',
  sym: 'test',
  v: 4110,
  av: 9470157,
  op: 0.43,
  vw: 0.44,
  o: 0.44,
  c: 0.44,
  h: 0.44,
  l: 0.44,
  a: 0.43,
  z: 685,
  s: 1610144640000,
  e: 1610144700000,
};

export const NEWS_ITEM_MOCK: ITickerNewsResults = {
  id: 'test',
  title: 'Title',
  published_utc: '2024-03-15T12:48:54Z',
  article_url: 'www.google.com',
  image_url: '',
  publisher: {
    name: 'Publisher',
  },
  tickers: ['test'],
};
