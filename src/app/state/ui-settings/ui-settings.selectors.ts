import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UiSettingsState } from './ui-settings.reducer';

export const selectUIState = createFeatureSelector<UiSettingsState>('uiSettings');

export const selectIsDarkMode = createSelector(selectUIState, (state) => state.darkMode);

export const selectIsSidebarVisible = createSelector(selectUIState, (state) => state.showSidebar);
