import { Injector, runInInjectionContext } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import {
  BIGGEST_GAINERS_MOCK,
  SNAPSHOT_SUMMARY_MOCK,
  UNI_SNAPSHOT_MOCK,
} from '../../../test/market-data.mock';
import { MOCK_DATA_STATE } from '../../../test/state.mock';
import { MarketDataRestService } from '../../core/services/data-rest.service';
import { MarketDataWsService } from '../../core/services/data-ws.service';
import { selectIsConnected } from '../ui-settings/ui-settings.selectors';
import * as DataActions from './market-data.actions';
import * as DataEffects from './market-data.effects';
import { selectMarketDataState } from './market-data.selectors';

describe('Market Data Effects', () => {
  let injector: Injector;
  let actions$ = new Observable<Action>();
  let store: MockStore;
  let marketWsSvc: MarketDataWsService;
  let marketRestSvc: MarketDataRestService;

  const marketWsSvcMock = jasmine.createSpyObj('MarketDataWsService', ['message']);
  const marketRestSvcMock: jasmine.SpyObj<MarketDataRestService> = jasmine.createSpyObj(
    'MarketDataRestService',
    ['snapshot', 'universalSnapshot', 'tickerDetails', 'snapshotGainersLosers'],
  );

  beforeEach(() => {
    injector = Injector.create({
      providers: [
        provideMockActions(() => actions$),
        provideMockStore({ initialState: {} }),
        { provide: MarketDataWsService, useValue: marketWsSvcMock },
        { provide: MarketDataRestService, useValue: marketRestSvcMock },
      ],
    });

    actions$ = injector.get(Actions);
    store = injector.get(MockStore);
    marketWsSvc = injector.get(MarketDataWsService);
    marketRestSvc = injector.get(MarketDataRestService);
  });

  describe('wsMessage$', () => {
    it('should call message() and return subscribeToPriceEventsSuccess action', (done) => {
      // arrange
      const a = DataActions.subscribeToPriceEvents(['test']);
      actions$ = of(a);
      store.overrideSelector(selectIsConnected, true);

      // act
      runInInjectionContext(injector, DataEffects.wsMessage$).subscribe((action) => {
        // assert
        expect(marketWsSvc.message).toHaveBeenCalledWith(a.message);
        expect(action).toEqual(DataActions.subscribeToPriceEventsSuccess());
        done();
      });
    });
  });

  describe('wsUnsubscribe$', () => {
    it('should call message() and return unsubscribePriceEventsSuccess action', (done) => {
      // arrange
      const a = DataActions.unsubscribePriceEvents(['test']);
      actions$ = of(a);

      // act
      runInInjectionContext(injector, DataEffects.wsUnsubscribe$).subscribe((action) => {
        // assert
        expect(marketWsSvc.message).toHaveBeenCalledWith(a.message);
        expect(action).toEqual(DataActions.unsubscribePriceEventsSuccess());
        done();
      });
    });
  });

  describe('fetchFavourites$', () => {
    it('should call snapshot() and return getStockFavouritesSuccess action', (done) => {
      // arrange
      actions$ = of(DataActions.getStockFavourites());
      store.overrideSelector(selectMarketDataState, MOCK_DATA_STATE);
      marketRestSvcMock.snapshot.and.returnValue(of([]));

      // act
      runInInjectionContext(injector, DataEffects.fetchFavourites$).subscribe((action) => {
        // assert
        expect(marketRestSvc.snapshot).toHaveBeenCalledWith(MOCK_DATA_STATE.favourites);
        expect(action).toEqual(DataActions.getStockFavouritesSuccess({ snapshots: [] }));
        done();
      });
    });
  });

  describe('loadSnapshot$', () => {
    it('should call universalSnapshot() and return getTickerSnapshotsSuccess action', (done) => {
      // arrange
      actions$ = of(DataActions.getTickerSnapshot({ t: 'test' }));
      marketRestSvcMock.universalSnapshot.and.returnValue(of([UNI_SNAPSHOT_MOCK]));

      // act
      runInInjectionContext(injector, DataEffects.loadSnapshot$).subscribe((action) => {
        // assert
        expect(marketRestSvc.universalSnapshot).toHaveBeenCalledWith(['test']);
        expect(action).toEqual(
          DataActions.getTickerSnapshotsSuccess({ snapshots: [UNI_SNAPSHOT_MOCK] }),
        );
        done();
      });
    });
  });

  describe('loadTickerSummary$', () => {
    it('should call tickerDetails() and return getTickerSummarySuccess action', (done) => {
      // arrange
      actions$ = of(DataActions.getTickerSummary({ t: 'test' }));
      marketRestSvcMock.tickerDetails.and.returnValue(of(SNAPSHOT_SUMMARY_MOCK));

      // act
      runInInjectionContext(injector, DataEffects.loadTickerSummary$).subscribe((action) => {
        // assert
        expect(marketRestSvc.tickerDetails).toHaveBeenCalledWith('test');
        expect(action).toEqual(
          DataActions.getTickerSummarySuccess({ summary: SNAPSHOT_SUMMARY_MOCK }),
        );
        done();
      });
    });
  });

  describe('loadGainersLosers$', () => {
    it('should call snapshotGainersLosers() and return getGainersLosersSuccess action', (done) => {
      // arrange
      actions$ = of(DataActions.getGainersLosers({ direction: 'gainers' }));
      marketRestSvcMock.snapshotGainersLosers.and.returnValue(of(BIGGEST_GAINERS_MOCK));

      // act
      runInInjectionContext(injector, DataEffects.loadGainersLosers$).subscribe((action) => {
        // assert
        expect(marketRestSvc.snapshotGainersLosers).toHaveBeenCalledWith('gainers');
        expect(action).toEqual(
          DataActions.getGainersLosersSuccess({ data: BIGGEST_GAINERS_MOCK, direction: 'gainers' }),
        );
        done();
      });
    });
  });

  describe('loadAllSnapshots$', () => {
    it('should call snapshot() and return getAllSnapshotsSuccess action', (done) => {
      // arrange
      actions$ = of(DataActions.getAllSnapshots());
      marketRestSvcMock.snapshot.and.returnValue(of([]));

      // act
      runInInjectionContext(injector, DataEffects.loadAllSnapshots$).subscribe((action) => {
        // assert
        expect(marketRestSvc.snapshot).toHaveBeenCalledWith();
        expect(action).toEqual(DataActions.getAllSnapshotsSuccess({ snapshots: [] }));
        done();
      });
    });
  });
});
