import { IAggregateStockEvent, UniversalSnapshotInfo } from '@polygon.io/client-js';
import { CandlestickData } from 'lightweight-charts';
import { ITickerDetailsResults, SnapshotInfo } from '../../core/models/polygon.io.models';
import {
  getGainersLosersSuccess,
  getTickerSnapshotsSuccess,
  getTickerSummarySuccess,
  receivedEvent,
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
  gainers: SnapshotInfo[];
  losers: SnapshotInfo[];
  favourites: string[];
  currentTicker: string | undefined;
}

export const INITIAL_MARKET_DATA_STATE: MarketDataState = {
  tickers: {},
  gainers: [],
  losers: [],
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
    return {
      ...state,
      favourites: [...state.favourites, ticker],
    };
  } else {
    return {
      ...state,
      favourites: [...state.favourites.slice(0, match), ...state.favourites.slice(match + 1)],
    };
  }
};

/**
 * Update ticker data in state if match found
 * @param state MarketDataState
 * @param { data: IAggregateStockEvent }
 * @returns MarketDataState
 */
export const updateFromEvent = (
  state: MarketDataState,
  { data }: ReturnType<typeof receivedEvent>,
): MarketDataState => {
  const match = state.tickers[data.sym];
  const newState = Object.assign({}, state);

  if (match) {
    newState.tickers = {
      ...newState.tickers,
      [data.sym]: {
        ...newState.tickers[data.sym],
        latestPrice: data,
      },
    };
  }

  return newState;
};

export const updateGainersLosers = (
  state: MarketDataState,
  { data, direction }: ReturnType<typeof getGainersLosersSuccess>,
): MarketDataState => {
  return {
    ...state,
    [direction]: data,
  };
};
