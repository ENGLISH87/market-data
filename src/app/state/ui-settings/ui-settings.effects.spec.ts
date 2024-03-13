import { Injector, runInInjectionContext } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { MarketDataWsService } from '../../core/services/data-ws.service';
import { apiConnect } from './ui-settings.actions';
import { apiConnect$ } from './ui-settings.effects';

describe('uiSettingsEffects', () => {
  let injector: Injector;
  let actions$ = new Observable<Action>();
  let marketWsSvc: MarketDataWsService;

  beforeEach(() => {
    injector = Injector.create({
      providers: [
        provideMockActions(() => actions$),
        {
          provide: MarketDataWsService,
          useValue: {
            connect: jasmine.createSpy('connect'),
          },
        },
      ],
    });

    actions$ = injector.get(Actions);
    marketWsSvc = injector.get(MarketDataWsService);
  });

  describe('apiConnect$', () => {
    it('should call connect on websocket service', (done) => {
      // arrange
      actions$ = of(apiConnect);

      // act
      runInInjectionContext(injector, apiConnect$).subscribe((action) => {
        // assert
        expect(marketWsSvc.connect).toHaveBeenCalled();
        expect(action).toEqual(apiConnect);
        done();
      });
    });
  });
});
