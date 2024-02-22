import { createAction, props } from '@ngrx/store';
import { IAggregateStockEvent, UniversalSnapshotInfo } from '@polygon.io/client-js';
import { ITickerDetailsResults, SnapshotInfo } from '../../core/models/polygon.io.models';

const actionKey = '[MARKET DATA]';

export const setCurrentTicker = createAction(
  `${actionKey} Set Current Ticker`,
  props<{ t: string }>(),
);

/** PRICE EVENTS */
export const subscribeToPriceEvents = createAction(
  `${actionKey} Subscribe To Price Events`,
  (ticks: string[]) => ({
    message: { action: 'subscribe', params: ticks.map((s) => `A.${s}`).join(',') },
  }),
);
export const subscribeToPriceEventsSuccess = createAction(
  `${actionKey} Subscribe To Price Event Success`,
);
export const unsubscribePriceEvents = createAction(
  `${actionKey} Unsubscribe From Price Events`,
  (ticks: string[]) => ({
    message: { action: 'unsubscribe', params: ticks.map((s) => `A.${s}`).join(',') },
  }),
);
export const unsubscribePriceEventsSuccess = createAction(
  `${actionKey} Unsubscribe From Price Events Success`,
);
export const receivedPriceMessage = createAction(
  `${actionKey} Received WS Price Message`,
  props<{ data: IAggregateStockEvent }>(),
);

/** GET SUMMARY */
export const getTickerSummary = createAction(
  `${actionKey} Get Ticker Summary`,
  props<{ t: string }>(),
);
export const getTickerSummaryError = createAction(`${actionKey} Get Ticker Summary Error`);
export const getTickerSummarySuccess = createAction(
  `${actionKey} Get Ticker Summary Success`,
  props<{ summary: ITickerDetailsResults }>(),
);

/** GET FAVOURITES */
export const getStockFavourites = createAction(`${actionKey} Get Stock Favourites`);
export const getStockFavouritesSuccess = createAction(
  `${actionKey} Get Stock Favourites Success`,
  props<{ snapshots: SnapshotInfo[] }>(),
);

/** GET SNAPSHOT  */
export const getTickerSnapshot = createAction(
  `${actionKey} Get Ticker Snapshot`,
  props<{ t: string }>(),
);
export const getTickerSnapshotError = createAction(`${actionKey} Get Ticker Snapshot Error`);
export const getTickerSnapshotsSuccess = createAction(
  `${actionKey} Get Ticker Snapshot Success`,
  props<{ snapshots: UniversalSnapshotInfo[] }>(),
);

/** GET ALL SNAPSHOTS */
export const getAllSnapshots = createAction(`${actionKey} Get All Snapshots`);
export const getAllSnapshotsSuccess = createAction(
  `${actionKey} Get All Snapshots Success`,
  props<{ snapshots: SnapshotInfo[] }>(),
);

/** GAINERS LOSERS SNAPSHOTS */
export const getGainersLosers = createAction(
  `${actionKey} Get Gainers Losers`,
  props<{ direction: 'gainers' | 'losers' }>(),
);
export const getGainersLosersSuccess = createAction(
  `${actionKey} Get Gainers Losers Success`,
  props<{ data: SnapshotInfo[]; direction: 'gainers' | 'losers' }>(),
);

/** TOGGLE FAVOURITE  */
export const toggleTickerFavourite = createAction(
  `${actionKey} Toggle Ticker Favourite`,
  props<{ ticker: string; add: boolean }>(),
);
