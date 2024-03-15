import { TestBed } from '@angular/core/testing';
import * as Poly from '@polygon.io/client-js';
import {
  SNAPSHOT_INFO_MOCK,
  SNAPSHOT_SUMMARY_MOCK,
  UNI_SNAPSHOT_MOCK,
} from '../../../test/market-data.mock';
import { POLYGON_CLIENT } from '../../app.config';
import { Timespan } from '../models/agg.model';
import { SnapshotInfo } from '../models/polygon.io.models';
import { MarketDataRestService } from './data-rest.service';

describe('MarketDataRestService', () => {
  let service: MarketDataRestService;
  let polygonSvc: Poly.IRestClient;

  const polygonRestMock: {
    reference: jasmine.SpyObj<Poly.IReferenceClient>;
    stocks: jasmine.SpyObj<Poly.IStocksClient>;
  } = {
    reference: jasmine.createSpyObj('reference', ['tickers', 'tickerDetails', 'tickerNews']),
    stocks: jasmine.createSpyObj('stocks', [
      'snapshotAllTickers',
      'universalSnapshot',
      'snapshotGainersLosers',
      'aggregates',
    ]),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: POLYGON_CLIENT,
          useValue: polygonRestMock,
        },
      ],
    });

    service = TestBed.inject(MarketDataRestService);
    polygonSvc = TestBed.inject(POLYGON_CLIENT);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make api call to search reference.tickers()', (done) => {
    const response: Poly.ITickers = {
      count: 0,
      request_id: '',
      status: 'success',
      results: [],
    };
    polygonRestMock.reference.tickers.and.returnValue(Promise.resolve(response));
    const result = service.search('test');

    expect(polygonSvc.reference.tickers).toHaveBeenCalledWith({
      search: 'test',
      order: 'asc',
    });

    result.subscribe((res) => {
      expect(res).toEqual(response.results);
      done();
    });
  });

  it('should make api call to retrieve ticker details', (done) => {
    const response: Poly.ITickerDetails = {
      results: SNAPSHOT_SUMMARY_MOCK,
    };
    polygonRestMock.reference.tickerDetails.and.returnValue(Promise.resolve(response));
    const result = service.tickerDetails('test');

    expect(polygonSvc.reference.tickerDetails).toHaveBeenCalledWith('test');

    result.subscribe((res) => {
      expect(res).toEqual(response.results!);
      done();
    });
  });

  it('should make api call to retrieve ticker news', (done) => {
    const response: Poly.ITickerNews = {
      count: 0,
      request_id: '',
      status: 'success',
      results: [],
    };
    polygonRestMock.reference.tickerNews.and.returnValue(Promise.resolve(response));
    const result = service.loadNews('test');

    expect(polygonSvc.reference.tickerNews).toHaveBeenCalledWith({
      ticker: 'test',
      limit: 50,
    });

    result.subscribe((res) => {
      expect(res).toEqual(response.results);
      done();
    });
  });

  it('should make api call to snapshotAllTickers', (done) => {
    const response: Poly.ISnapshotTickers = {
      count: 1,
      status: 'success',
      tickers: [SNAPSHOT_INFO_MOCK],
    };
    polygonRestMock.stocks.snapshotAllTickers.and.returnValue(Promise.resolve(response));
    const result = service.snapshot(['test']);

    expect(polygonSvc.stocks.snapshotAllTickers).toHaveBeenCalledWith({
      tickers: 'test',
    });

    result.subscribe((res: SnapshotInfo[]) => {
      expect(res).toEqual(response.tickers as SnapshotInfo[]);
      done();
    });
  });

  it('should make api call to universalSnapshot', (done) => {
    const response: Poly.IUniversalSnapshot = {
      status: 'success',
      results: [UNI_SNAPSHOT_MOCK],
    };
    polygonRestMock.stocks.universalSnapshot.and.returnValue(Promise.resolve(response));
    const result = service.universalSnapshot(['test']);

    expect(polygonSvc.stocks.universalSnapshot).toHaveBeenCalledWith({
      'ticker.any_of': 'test',
    });

    result.subscribe((res) => {
      expect(res).toEqual(response.results!);
      done();
    });
  });

  it('should make api call to snapshotGainersLosers', (done) => {
    const response: Poly.ISnapshotTickers = {
      status: 'success',
      count: 1,
      tickers: [SNAPSHOT_SUMMARY_MOCK],
    };
    polygonRestMock.stocks.snapshotGainersLosers.and.returnValue(Promise.resolve(response));
    const result = service.snapshotGainersLosers('gainers');

    expect(polygonSvc.stocks.snapshotGainersLosers).toHaveBeenCalledWith('gainers');

    result.subscribe((res) => {
      expect(res).toEqual(response.tickers as SnapshotInfo[]);
      done();
    });
  });

  it('should make api call to aggregates', (done) => {
    const response: Poly.IAggs = {
      status: 'success',
      results: [],
    };
    polygonRestMock.stocks.aggregates.and.returnValue(Promise.resolve(response));
    const result = service.aggregates('test', 1, Timespan.day, 1, 1);

    expect(polygonSvc.stocks.aggregates).toHaveBeenCalledWith('test', 1, Timespan.day, '1', '1', {
      limit: 150000,
    });

    result.subscribe((res) => {
      expect(res).toEqual([]);
      done();
    });
  });
});
