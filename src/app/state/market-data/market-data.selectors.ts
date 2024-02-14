import { createFeatureSelector, createSelector } from '@ngrx/store';
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
