import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { POLYGON_WEBSOCKET_CLIENT } from '../../app.config';
import { MarketDataWsService } from './data-ws.service';

describe('MarketDataWsService', () => {
  let service: MarketDataWsService;

  const polygonWSMock = jasmine.createSpyObj('IWebsocketClient', ['stocks']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
        {
          provide: POLYGON_WEBSOCKET_CLIENT,
          useValue: polygonWSMock,
        },
      ],
    });
    service = TestBed.inject(MarketDataWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should setup websocket on connect()', () => {
    // TODO:
  });

  it('should close websocket and set to undefined on disconnect()', () => {
    // TODO:
  });

  it('should send websocket message', () => {
    // TODO:
  });

  it('should filter events by ticker and return observable', () => {
    // TODO:
  });
});
