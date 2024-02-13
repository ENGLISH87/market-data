import { createAction, props } from '@ngrx/store';
import { UniversalSnapshotInfo } from '@polygon.io/client-js';
import { ITickerDetailsResults } from '../../core/models/polygon.io.models';

const actionKey = '[MARKET DATA]';

export const subscribeToPriceEventsFactory = (t: string) =>
  subscribeToPriceEvents({ message: { action: 'subscribe', params: `A.${t}` } });

export const subscribeToPriceEvents = createAction(
  `${actionKey} Subscribe To Price Events`,
  props<{ message: object }>(),
);
export const subscribeToPriceEventsSuccess = createAction(
  `${actionKey} Subscribe To Price Event Success`,
);

export const setCurrentTicker = createAction(
  `${actionKey} Set Current Ticker`,
  props<{ t: string }>(),
);

export const getTickerSummary = createAction(
  `${actionKey} Get Ticker Summary`,
  props<{ t: string }>(),
);
export const getTickerSummaryError = createAction(`${actionKey} Get Ticker Summary Error`);
export const getTickerSummarySuccess = createAction(
  `${actionKey} Get Ticker Summary Success`,
  props<{ summary: ITickerDetailsResults }>(),
);

export const getStockFavourites = createAction(`${actionKey} Get Stock Favourites`);
export const getTickerSnapshot = createAction(
  `${actionKey} Get Ticker Snapshot`,
  props<{ t: string }>(),
);
export const getTickerSnapshotError = createAction(`${actionKey} Get Ticker Snapshot Error`);
export const getTickerSnapshotsSuccess = createAction(
  `${actionKey} Get Ticker Snapshot Success`,
  props<{ snapshots: UniversalSnapshotInfo[] }>(),
);

export const toggleTickerFavourite = createAction(
  `${actionKey} Toggle Ticker Favourite`,
  props<{ ticker: string; add: boolean }>(),
);
