import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAggregateStockEvent, IWebsocketClient } from '@polygon.io/client-js';
import { BehaviorSubject, filter, Observable, Subject } from 'rxjs';
import { ICloseEvent, IMessageEvent, w3cwebsocket } from 'websocket';
import { environment } from '../../../environments/environment';
import { POLYGON_WEBSOCKET_CLIENT } from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class DataWsService {
  private _connected$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _events$: Subject<IAggregateStockEvent> = new Subject();
  socket$: w3cwebsocket | undefined;

  constructor(
    @Inject(POLYGON_WEBSOCKET_CLIENT) private socket: IWebsocketClient,
    private snackbar: MatSnackBar,
  ) {}

  /**
   * Websocket setup and connection
   * @returns w3cwebsocket
   */
  connect(): w3cwebsocket {
    if (!this.socket$) {
      const ws: w3cwebsocket = this.socket.stocks();

      ws.onmessage = (m: IMessageEvent) => {
        const data = JSON.parse(`${m.data}`)?.[0];

        if (data.status === 'auth_success') {
          this._connected$.next(true);
          this.snackbar.open('Successfully connected and authenticated with server', 'Close', {
            duration: 3000,
          });
        }

        this._events$.next(data);
      };

      ws.onerror = (e: Error) => {
        console.log(e);
        this.snackbar.open('Something went wrong!', 'Close');
      };

      ws.onopen = () => {
        this.message({ action: 'auth', params: environment.polygonApiKey });
      };

      ws.onclose = (e: ICloseEvent) => {
        console.log('Connection closed!', e);
        this.snackbar.open('Connection closed!', 'Close', { duration: 1500 });
        this._connected$.next(false);
      };

      this.socket$ = ws;
    }

    return this.socket$;
  }

  /**
   * Websocket close and cleanup
   */
  disconnect(): void {
    this.socket$?.close();
    this.socket$ = undefined;
  }

  /**
   * Send websocket message
   * @param msg data
   */
  message(msg: object): void {
    this.socket$?.send(JSON.stringify(msg));
  }

  /**
   * Connected to websocket observable
   * @returns Observable<boolean>
   */
  connected(): Observable<boolean> {
    return this._connected$.asObservable();
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
