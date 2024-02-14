import { ApplicationConfig, importProvidersFrom, InjectionToken, isDevMode } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withRouterConfig } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { IRestClient, IWebsocketClient, restClient, websocketClient } from '@polygon.io/client-js';
import { TimeagoModule } from 'ngx-timeago';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { marketDataEffects, metaReducers, reducers, uiEffects } from './state';

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
    provideRouter(
      routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload',
      }),
    ),
    provideEffects(marketDataEffects, uiEffects),
    provideRouterStore(),
    provideStore(reducers, {
      metaReducers,
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true,
      },
    }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      traceLimit: 75,
      connectInZone: true,
    }),
    provideAnimationsAsync(),
  ],
};
