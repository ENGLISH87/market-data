import { createReducer, on } from '@ngrx/store';
import { toggleDarkMode, toggleSidebar } from './ui-settings.actions';

export interface UiSettingsState {
  darkMode: boolean;
  showSidebar: boolean;
}

export const INITIAL_UI_STATE: UiSettingsState = {
  darkMode: false,
  showSidebar: false,
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

  on(
    toggleSidebar,
    (state): UiSettingsState => ({
      ...state,
      showSidebar: !state.showSidebar,
    }),
  ),
);
