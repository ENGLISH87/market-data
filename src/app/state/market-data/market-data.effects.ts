import { inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, tap } from 'rxjs';
import { MarketDataRestService } from '../../core/services/data-rest.service';
import { MarketDataWsService } from '../../core/services/data-ws.service';
import * as mdActions from './market-data.actions';
import { selectMarketDataState } from './market-data.selectors';

export const wsMessage$ = createEffect(
  (
    actions$: Actions = inject(Actions),
    marketWsSvc: MarketDataWsService = inject(MarketDataWsService),
  ) => {
    return actions$.pipe(
      ofType(mdActions.subscribeToPriceEvents),
      tap(({ message }) => {
        marketWsSvc.message(message);
      }),
      map(() => mdActions.subscribeToPriceEventsSuccess()),
    );
  },
  {
    functional: true,
  },
);

export const fetchTickers$ = createEffect(
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
          .universalSnapshot(state.favourites)
          .pipe(map((snapshots) => mdActions.getTickerSnapshotsSuccess({ snapshots }))),
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
          .snapshot(t)
          .pipe(map((snapshot) => mdActions.getTickerSnapshotsSuccess({ snapshots: [snapshot] }))),
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
