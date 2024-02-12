import { ApplicationConfig, InjectionToken, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { reducers, metaReducers } from './state';
import { TimeagoModule } from 'ngx-timeago';
import { environment } from '../environments/environment';
import { IRestClient, IWebsocketClient, restClient, websocketClient } from '@polygon.io/client-js';

export const POLYGON_CLIENT = new InjectionToken<IRestClient>('polygonRestClient');
export const POLYGON_WEBSOCKET_CLIENT = new InjectionToken<IWebsocketClient>(
  'polygonWebsocketClient',
);

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: POLYGON_CLIENT,
      useValue: restClient(environment.polygonApiKey),
    },
    {
      provide: POLYGON_WEBSOCKET_CLIENT,
      useValue: websocketClient(environment.polygonApiKey, environment.polygonApi),
    },
    importProvidersFrom(TimeagoModule.forRoot()),
    provideAnimationsAsync(),
    provideRouter(routes),
    provideStore(reducers, { metaReducers }), provideAnimationsAsync(),
  ],
};
