import { createReducer, on } from '@ngrx/store';
import { toggleDarkMode } from './ui-settings.actions';

export interface UiSettingsState {
  darkMode: boolean;
}

export const INITIAL_UI_STATE: UiSettingsState = {
  darkMode: false,
};

export const uiSettingsReducer = createReducer(
  INITIAL_UI_STATE,

  /** Toggle Dark Mode */
  on(
    toggleDarkMode,
    (state, { dark }): UiSettingsState => ({
      ...state,
      darkMode: dark,
    }),
  ),
);
