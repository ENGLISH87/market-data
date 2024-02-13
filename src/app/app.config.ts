import { ApplicationConfig, importProvidersFrom, InjectionToken } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { IRestClient, IWebsocketClient, restClient, websocketClient } from '@polygon.io/client-js';
import { TimeagoModule } from 'ngx-timeago';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { marketDataEffects, metaReducers, reducers } from './state';

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
    provideEffects(marketDataEffects),
    provideStore(reducers, {
      metaReducers,
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true,
      },
    }),
    provideAnimationsAsync(),
  ],
};
