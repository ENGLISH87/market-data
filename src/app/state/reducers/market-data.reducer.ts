import { createReducer } from '@ngrx/store';
import { IAggregateStockEvent, UniversalSnapshotInfo } from '@polygon.io/client-js';
import { CandlestickData } from 'lightweight-charts';

export interface TickerData {
  snapshot: UniversalSnapshotInfo;
  latestPrice: IAggregateStockEvent;
  lastWeekAgg: CandlestickData[];
}

export interface MarketDataState {
  tickers: Record<string, TickerData>;
  favourites: string[];
  currentTicker: string | undefined;
}

export const INITIAL_MARKET_DATA_STATE: MarketDataState = {
  tickers: {},
  currentTicker: undefined,
  favourites: [
    'NVDA',
    'TSLA',
    'AAPL',
    'MSFT',
    'GOOGL',
    'META',
    'NFLX',
    'AMZN',
    'LLY',
    'TSM',
    'NVO',
    'JPM',
    'WMT',
    'PG',
    'MAT',
  ],
};

export const marketDataReducer = createReducer(INITIAL_MARKET_DATA_STATE);
