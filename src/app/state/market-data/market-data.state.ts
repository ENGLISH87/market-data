import { IAggregateStockEvent, UniversalSnapshotInfo } from '@polygon.io/client-js';
import { CandlestickData } from 'lightweight-charts';
import { ITickerDetailsResults } from '../../core/models/polygon.io.models';
import {
  getTickerSnapshotsSuccess,
  getTickerSummarySuccess,
  setCurrentTicker,
  toggleTickerFavourite,
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
  { snapshots }: ReturnType<typeof getTickerSnapshotsSuccess>,
): MarketDataState => ({
  ...state,
  tickers: {
    ...state.tickers,
    ...snapshots.reduce(
      (acc, cur) => {
        acc[cur.ticker!] = {
          ...state.tickers[cur.ticker!],
          snapshot: cur,
        };

        return acc;
      },
      {} as Record<string, TickerData>,
    ),
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

export const updateFavourites = (
  state: MarketDataState,
  { add, ticker }: ReturnType<typeof toggleTickerFavourite>,
): MarketDataState => {
  const match = state.favourites.indexOf(ticker);

  if (add && match === -1) {
    // const na = [...state.favourites, ticker];
    return {
      ...state,
      favourites: [...state.favourites, ticker],
    };
  } else {
    // const na = [...state.favourites.slice(0, match), ...state.favourites.slice(match + 1)];

    return {
      ...state,
      favourites: [...state.favourites.slice(0, match), ...state.favourites.slice(match + 1)],
    };
  }
};
