import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { MarketDataRestService } from '../../core/services/data-rest.service';
import * as mdActions from './market-data.actions';

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
          .pipe(map((snapshot) => mdActions.getTickerSnapshotSuccess({ snapshot }))),
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
