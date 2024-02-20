import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SnapshotInfo } from '../../core/models/polygon.io.models';
import { MarketDataState, TickerData } from './market-data.state';

export const selectMarketDataState = createFeatureSelector<MarketDataState>('marketData');

export const selectCurrentTicker = createSelector(
  selectMarketDataState,
  (state) => state.currentTicker,
);

export const selectCurrentTickerData = createSelector(selectMarketDataState, (state) =>
  state.currentTicker ? state.tickers[state.currentTicker!] : undefined,
);

export const selectIsTickerFavourite = createSelector(
  selectMarketDataState,
  (state) => (state.currentTicker && state.favourites.includes(state.currentTicker)) || false,
);

export const selectFavouriteTickers = createSelector(
  selectMarketDataState,
  (state) =>
    state.favourites
      .map((key) => state.tickers[key])
      .filter((value) => value !== undefined) as TickerData[],
);

export const selectGainers = createSelector(selectMarketDataState, (state) => state.gainers);
export const selectLosers = createSelector(selectMarketDataState, (state) => state.losers);

export const selectAllSnapshots = createSelector(selectMarketDataState, (state) =>
  Object.values(state.tickers).reduce(
    (acc: SnapshotInfo[], cur: TickerData | undefined): SnapshotInfo[] => {
      if (cur?.snapshot) {
        acc.push(cur.snapshot);
      }
      return acc;
    },
    [],
  ),
);
