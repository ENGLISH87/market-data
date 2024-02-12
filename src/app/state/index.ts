import { isDevMode } from '@angular/core';
import { Action, ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { marketDataReducer } from './market-data/market-data.reducers';
import { MarketDataState } from './market-data/market-data.state';
import { uiSettingsReducer, UiSettingsState } from './ui-settings/ui-settings.reducer';

export * as marketDataEffects from './market-data/market-data.effects';

export interface AppState {
  uiSettings: UiSettingsState;
  marketData: MarketDataState;
}

export function logger(
  reducer: ActionReducer<AppState>,
): (state: AppState, action: Action) => AppState {
  return (state: AppState, action: Action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

export function localStorageSyncReducer(
  actionReducer: ActionReducer<AppState>,
): ActionReducer<AppState> {
  return localStorageSync({
    keys: ['uiSettings'],
    rehydrate: true,
    restoreDates: false,
    storage: sessionStorage,
  })(actionReducer);
}

export const reducers: ActionReducerMap<AppState> = {
  uiSettings: uiSettingsReducer,
  marketData: marketDataReducer,
};

export const metaReducers: MetaReducer[] = isDevMode()
  ? [logger, localStorageSyncReducer]
  : [localStorageSyncReducer];
