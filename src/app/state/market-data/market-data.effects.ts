import { inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, map, skipWhile, switchMap, take, tap } from 'rxjs';
import { MarketDataRestService } from '../../core/services/data-rest.service';
import { MarketDataWsService } from '../../core/services/data-ws.service';
import { selectIsConnected } from '../ui-settings/ui-settings.selectors';
import * as mdActions from './market-data.actions';
import { selectMarketDataState } from './market-data.selectors';

export const wsMessage$ = createEffect(
  (
    store: Store = inject(Store),
    actions$: Actions = inject(Actions),
    marketWsSvc: MarketDataWsService = inject(MarketDataWsService),
  ) => {
    return actions$.pipe(
      ofType(mdActions.subscribeToPriceEvents),
      switchMap((action) =>
        store.select(selectIsConnected).pipe(
          skipWhile((connected) => !connected),
          take(1),
          map(() => action),
        ),
      ),
      tap(({ message }) => marketWsSvc.message(message)),
      map(() => mdActions.subscribeToPriceEventsSuccess()),
    );
  },
  {
    functional: true,
  },
);

export const wsUnsubscribe$ = createEffect(
  (
    actions$: Actions = inject(Actions),
    marketWsSvc: MarketDataWsService = inject(MarketDataWsService),
  ) => {
    return actions$.pipe(
      ofType(mdActions.unsubscribePriceEvents),
      map(({ message }) => marketWsSvc.message(message)),
      map(() => mdActions.unsubscribePriceEventsSuccess()),
    );
  },
  {
    functional: true,
  },
);

export const fetchFavourites$ = createEffect(
  (
    store: Store = inject(Store),
    actions$: Actions = inject(Actions),
    marketDataSvc: MarketDataRestService = inject(MarketDataRestService),
  ) => {
    return actions$.pipe(
      ofType(mdActions.getStockFavourites),
      concatLatestFrom(() => store.select(selectMarketDataState)),
      switchMap(([, state]) =>
        marketDataSvc
          .snapshot(state.favourites)
          .pipe(map((snapshots) => mdActions.getStockFavouritesSuccess({ snapshots }))),
      ),
    );
  },
  {
    functional: true,
  },
);

export const loadSnapshot$ = createEffect(
  (
    actions$: Actions = inject(Actions),
    marketDataSvc: MarketDataRestService = inject(MarketDataRestService),
  ) => {
    return actions$.pipe(
      ofType(mdActions.getTickerSnapshot),
      switchMap(({ t }) =>
        marketDataSvc
          .universalSnapshot([t])
          .pipe(map((snapshots) => mdActions.getTickerSnapshotsSuccess({ snapshots }))),
      ),
    );
  },
  {
    functional: true,
  },
);

export const loadTickerSummary$ = createEffect(
  (
    actions$: Actions = inject(Actions),
    marketDataSvc: MarketDataRestService = inject(MarketDataRestService),
  ) => {
    return actions$.pipe(
      ofType(mdActions.getTickerSummary),
      switchMap(({ t }) =>
        marketDataSvc
          .tickerDetails(t)
          .pipe(map((summary) => mdActions.getTickerSummarySuccess({ summary }))),
      ),
    );
  },
  {
    functional: true,
  },
);

export const loadGainersLosers$ = createEffect(
  (
    actions$: Actions = inject(Actions),
    marketDataSvc: MarketDataRestService = inject(MarketDataRestService),
  ) => {
    return actions$.pipe(
      ofType(mdActions.getGainersLosers),
      concatMap(({ direction }) => {
        return marketDataSvc
          .snapshotGainersLosers(direction)
          .pipe(map((data) => mdActions.getGainersLosersSuccess({ data, direction })));
      }),
    );
  },
  {
    functional: true,
  },
);

export const loadAllSnapshots$ = createEffect(
  (
    actions$: Actions = inject(Actions),
    marketDataSvc: MarketDataRestService = inject(MarketDataRestService),
  ) => {
    return actions$.pipe(
      ofType(mdActions.getAllSnapshots),
      switchMap(() =>
        marketDataSvc.snapshot().pipe(
          map((snapshots) =>
            mdActions.getAllSnapshotsSuccess({
              snapshots,
            }),
          ),
        ),
      ),
    );
  },
  {
    functional: true,
  },
);
