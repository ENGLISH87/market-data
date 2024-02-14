import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { MarketDataWsService } from '../../core/services/data-ws.service';
import * as uiActions from './ui-settings.actions';

export const apiConnect$ = createEffect(
  (
    actions$: Actions = inject(Actions),
    marketWsSvc: MarketDataWsService = inject(MarketDataWsService),
  ) => {
    return actions$.pipe(
      ofType(uiActions.apiConnect),
      tap(() => marketWsSvc.connect()),
    );
  },
  {
    functional: true,
    dispatch: false,
  },
);
