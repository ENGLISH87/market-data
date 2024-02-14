import { routerNavigationAction } from '@ngrx/router-store';
import { createReducer, on } from '@ngrx/store';
import {
  apiConnectSuccess,
  apiDisconnected,
  toggleDarkMode,
  toggleSidebar,
} from './ui-settings.actions';

export interface UiSettingsState {
  darkMode: boolean;
  showSidebar: boolean;
  connected: boolean;
}

export const INITIAL_UI_STATE: UiSettingsState = {
  darkMode: false,
  showSidebar: false,
  connected: false,
};

export const uiSettingsReducer = createReducer(
  INITIAL_UI_STATE,

  on(
    routerNavigationAction,
    (state): UiSettingsState => ({
      ...state,
      showSidebar: false,
    }),
  ),

  /** Toggle Dark Mode */
  on(
    toggleDarkMode,
    (state, { dark }): UiSettingsState => ({
      ...state,
      darkMode: dark,
    }),
  ),

  /** Toggle sidebar */
  on(
    toggleSidebar,
    (state): UiSettingsState => ({
      ...state,
      showSidebar: !state.showSidebar,
    }),
  ),

  /** connected to api */
  on(
    apiConnectSuccess,
    (state): UiSettingsState => ({
      ...state,
      connected: true,
    }),
  ),

  /** disconnected to api */
  on(
    apiDisconnected,
    (state): UiSettingsState => ({
      ...state,
      connected: false,
    }),
  ),
);
