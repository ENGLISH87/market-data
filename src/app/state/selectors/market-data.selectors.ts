import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MarketDataState } from '../reducers/market-data.reducer';

export const selectMarketDataState = createFeatureSelector<MarketDataState>('marketData');

export const selectTicker = createSelector(selectMarketDataState, (state) => state.currentTicker);
