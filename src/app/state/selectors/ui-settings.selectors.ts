import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UiSettingsState } from '../reducers/ui-settings.reducer';

export const selectMarketDataState = createFeatureSelector<UiSettingsState>('uiSettings');

export const selectIsDarkMode = createSelector(selectMarketDataState, (state) => state.darkMode);
