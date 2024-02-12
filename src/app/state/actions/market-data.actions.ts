import { createAction, props } from '@ngrx/store';

export const setSelectedTicker = createAction('[DATA] Set Selected Ticker', props<{ t: string }>());
export const getStockSummary = createAction('[DATA] Get Stock Summary');
export const getStockSummarySuccess = createAction('[DATA] Get Stock Summary Success');

export const getStockFavourites = createAction('[DATA] Get Stock Favourites');
