import { TestBed } from '@angular/core/testing';
import { POLYGON_CLIENT } from '../../app.config';
import { MarketDataRestService } from './data-rest.service';

describe('MarketDataRestService', () => {
  let service: MarketDataRestService;
  const polygonRestMock = jasmine.createSpyObj('IRestClient', {
    reference: jasmine.createSpyObj('reference', ['tickers', 'tickerDetails', 'tickerNews']),
    stocks: jasmine.createSpyObj('stocks', [
      'snapshotAllTickers',
      'universalSnapshot',
      'snapshotGainersLosers',
      'aggregates',
    ]),
  });

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
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make api call to search reference.tickers()', () => {
    // TODO:
  });

  it('should make api call to retrieve ticker details', () => {
    // TODO:
  });

  it('should make api call to retrieve ticker news', () => {
    // TODO:
  });

  it('should make api call to snapshotAllTickers', () => {
    // TODO:
  });

  it('should make api call to universalSnapshot', () => {
    // TODO:
  });

  it('should make api call to snapshotGainersLosers', () => {
    // TODO:
  });

  it('should make api call to aggregates', () => {
    // TODO:
  });
});
