import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { IAggregateStockEvent, IWebsocketClient } from '@polygon.io/client-js';
import { filter, Observable, Subject } from 'rxjs';
import { ICloseEvent, IMessageEvent, w3cwebsocket } from 'websocket';
import { environment } from '../../../environments/environment';
import { POLYGON_WEBSOCKET_CLIENT } from '../../app.config';
import { receivedEvent } from '../../state/market-data/market-data.actions';
import { apiConnectSuccess, apiDisconnected } from '../../state/ui-settings/ui-settings.actions';

@Injectable({
  providedIn: 'root',
})
export class MarketDataWsService {
  private _socket$: w3cwebsocket | undefined;
  private _events$: Subject<IAggregateStockEvent> = new Subject();

  constructor(
    @Inject(POLYGON_WEBSOCKET_CLIENT) private socket: IWebsocketClient,
    private snackbar: MatSnackBar,
    private store: Store,
  ) {}

  /**
   * Websocket setup and connection
   * @returns w3cwebsocket
   */
  connect(): w3cwebsocket {
    if (!this._socket$) {
      const ws: w3cwebsocket = this.socket.stocks();

      ws.onmessage = (m: IMessageEvent) => {
        const data = JSON.parse(`${m.data}`)?.[0];

        if (data.status === 'auth_success') {
          this.store.dispatch(apiConnectSuccess());
          this.snackbar.open('Successfully connected and authenticated with server', 'Close', {
            duration: 3000,
          });
        }

        // dispatch event if IAggregateStockEvent event
        if (data.sym) {
          this.store.dispatch(receivedEvent({ data }));
          this._events$.next(data);
        }
      };

      ws.onerror = (e: Error) => {
        console.log('ERROR: ' + e);
        this.snackbar.open('Something went wrong!', 'Close');
      };

      ws.onopen = () => {
        this.message({ action: 'auth', params: environment.polygonApiKey });
      };

      ws.onclose = (e: ICloseEvent) => {
        console.log('CONNECTION CLOSED: ' + e);
        this.snackbar.open('Connection closed!', 'Close', { duration: 1500 });
        this.store.dispatch(apiDisconnected({ e }));
      };

      this._socket$ = ws;
    }

    return this._socket$;
  }

  /**
   * Websocket close and cleanup
   */
  disconnect(): void {
    this._socket$?.close();
    this._socket$ = undefined;
  }

  /**
   * Send websocket message
   * @param msg data
   */
  message(msg: object): void {
    this._socket$?.send(JSON.stringify(msg));
  }

  /**
   * Filter websocket events by given ticker
   * @param ticker stock ticker
   * @returns Observable<IAggregateStockEvent>
   */
  events(ticker?: string): Observable<IAggregateStockEvent> {
    return this._events$.asObservable().pipe(filter((e) => (ticker ? e.sym === ticker : true)));
  }
}
