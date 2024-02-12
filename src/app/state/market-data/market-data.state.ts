import { IAggregateStockEvent, UniversalSnapshotInfo } from '@polygon.io/client-js';
import { CandlestickData } from 'lightweight-charts';
import { ITickerDetailsResults } from '../../core/models/polygon.io.models';
import {
  getTickerSnapshotSuccess,
  getTickerSummarySuccess,
  setCurrentTicker,
} from './market-data.actions';

export interface TickerData {
  summary?: ITickerDetailsResults;
  snapshot?: UniversalSnapshotInfo;
  latestPrice?: IAggregateStockEvent;
  lastWeekAgg?: CandlestickData[];
}

export interface MarketDataState {
  tickers: Record<string, TickerData | undefined>;
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

export const setTicker = (
  state: MarketDataState,
  { t }: ReturnType<typeof setCurrentTicker>,
): MarketDataState => ({
  ...state,
  currentTicker: t,
});

export const updateTickerSnapshot = (
  state: MarketDataState,
  { snapshot }: ReturnType<typeof getTickerSnapshotSuccess>,
): MarketDataState => ({
  ...state,
  tickers: {
    ...state.tickers,
    [snapshot.ticker!]: {
      ...state.tickers[snapshot.ticker!],
      snapshot,
    } as TickerData,
  },
});

export const updateTickerSummary = (
  state: MarketDataState,
  { summary }: ReturnType<typeof getTickerSummarySuccess>,
): MarketDataState => ({
  ...state,
  tickers: {
    ...state.tickers,
    [summary.ticker!]: {
      ...state.tickers[summary.ticker!],
      summary,
    } as TickerData,
  },
});
