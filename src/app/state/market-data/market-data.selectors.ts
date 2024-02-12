import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MarketDataState } from './market-data.state';

const selectState = createFeatureSelector<MarketDataState>('marketData');

export const selectCurrentTicker = createSelector(selectState, (state) => state.currentTicker);
export const selectCurrentTickerData = createSelector(selectState, (state) => {
  return state.currentTicker ? state.tickers[state.currentTicker!] : undefined;
});
