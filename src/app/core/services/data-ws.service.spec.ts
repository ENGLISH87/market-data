import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IWebsocketClient } from '@polygon.io/client-js';
import { IMessageEvent, w3cwebsocket } from 'websocket';
import { environment } from '../../../environments/environment';
import { AGG_STOCK_EVENT_MOCK } from '../../../test/market-data.mock';
import { POLYGON_WEBSOCKET_CLIENT } from '../../app.config';
import { receivedPriceMessage } from '../../state/market-data/market-data.actions';
import { apiConnectSuccess } from '../../state/ui-settings/ui-settings.actions';
import { MarketDataWsService } from './data-ws.service';

describe('MarketDataWsService', () => {
  let service: MarketDataWsService;
  let store: MockStore;
  let polySvc: IWebsocketClient;
  let ws: w3cwebsocket;
  let snackbar: MatSnackBar;

  const polygonWSMock: jasmine.SpyObj<IWebsocketClient> = jasmine.createSpyObj('IWebsocketClient', [
    'stocks',
  ]);
  const wsMock: jasmine.SpyObj<w3cwebsocket> = jasmine.createSpyObj('w3cwebsocket', [
    'close',
    'send',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
        {
          provide: POLYGON_WEBSOCKET_CLIENT,
          useValue: polygonWSMock,
        },
        {
          provide: MatSnackBar,
          useValue: { open: jasmine.createSpy('open') },
        },
      ],
    });

    polygonWSMock.stocks.and.returnValue(wsMock);
    service = TestBed.inject(MarketDataWsService);
    polySvc = TestBed.inject(POLYGON_WEBSOCKET_CLIENT);
    store = TestBed.inject(MockStore);
    snackbar = TestBed.inject(MatSnackBar);

    spyOn(store, 'dispatch');
    ws = service.connect();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should setup websocket on connect()', () => {
    const ws = service.connect();

    expect(ws.onmessage).toBeDefined();
    expect(ws.onerror).toBeDefined();
    expect(ws.onopen).toBeDefined();
    expect(ws.onclose).toBeDefined();
    expect(polySvc.stocks).toHaveBeenCalled();
  });

  it('should close websocket and set to undefined on disconnect()', () => {
    service.disconnect();
    expect(ws.close).toHaveBeenCalled();
  });

  it('should send websocket message', () => {
    const msg = { subscribe: 'test' };
    service.message(msg);

    expect(ws.send).toHaveBeenCalledWith(JSON.stringify(msg));
  });

  it('should filter events by ticker and return observable', (done) => {
    const evtObvs = service.events('test');
    const data = [{ ...AGG_STOCK_EVENT_MOCK }];
    const msg: IMessageEvent = {
      data: JSON.stringify(data),
    };

    evtObvs.subscribe((evt) => {
      expect(store.dispatch).toHaveBeenCalledWith(
        receivedPriceMessage({ data: AGG_STOCK_EVENT_MOCK }),
      );
      expect(evt).toEqual(AGG_STOCK_EVENT_MOCK);
      done();
    });

    ws.onmessage(msg);
  });

  it('should dispatch and call snackbar.open() on auth_success message received', () => {
    const data = [{ status: 'auth_success' }];
    const msg: IMessageEvent = {
      data: JSON.stringify(data),
    };

    ws.onmessage(msg);
    expect(snackbar.open).toHaveBeenCalledWith(
      'Successfully connected and authenticated with server',
      'Close',
      {
        duration: 3000,
      },
    );
    expect(store.dispatch).toHaveBeenCalledWith(apiConnectSuccess());
  });

  it('should call ws.send() on onopen', () => {
    const msg = { action: 'auth', params: environment.polygonApiKey };
    ws.onopen();

    expect(ws.send).toHaveBeenCalledWith(JSON.stringify(msg));
  });

  it('should call snackbar.open() on error', () => {
    ws.onerror({ message: 'test', name: 'test' });

    expect(snackbar.open).toHaveBeenCalledWith('Something went wrong!', 'Close');
  });

  it('should call snackbar.open() in connection close', () => {
    ws.onclose({ code: 1, reason: 'test', wasClean: true });

    expect(snackbar.open).toHaveBeenCalledWith('Connection closed!', 'Close', { duration: 1500 });
  });
});
