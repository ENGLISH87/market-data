import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MarketDataState } from '../reducers/market-data.reducer';

const selectState = createFeatureSelector<MarketDataState>('marketData');

export const selectCurrentTicker = createSelector(selectState, (state) => state.currentTicker);
export const selectCurrentTickerData = createSelector(selectState, (state) =>
  state.currentTicker ? state.tickers[state.currentTicker!] : undefined,
);
