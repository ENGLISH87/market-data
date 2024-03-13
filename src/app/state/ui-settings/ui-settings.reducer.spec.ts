import { routerNavigationAction, RouterNavigationPayload } from '@ngrx/router-store';
import { ICloseEvent } from 'websocket';
import { MOCK_UI_STATE } from '../../../test/state.mock';
import {
  apiConnectSuccess,
  apiDisconnected,
  toggleDarkMode,
  toggleSidebar,
} from './ui-settings.actions';
import { INITIAL_UI_STATE, uiSettingsReducer, UiSettingsState } from './ui-settings.reducer';

describe('uiSettingsReducer', () => {
  let mockState: UiSettingsState;

  beforeEach(() => {
    mockState = Object.assign({}, MOCK_UI_STATE);
  });

  describe('undefined action', () => {
    it('should return the default state', () => {
      const exp = INITIAL_UI_STATE;
      const res = uiSettingsReducer(undefined, { type: '' });
      expect(res).toEqual(exp);
    });
  });

  describe('routerNavigationAction', () => {
    it('should hide sidebar on router navigation', () => {
      // arrange
      const state: UiSettingsState = {
        ...mockState,
        showSidebar: true,
      };

      // act
      const act = routerNavigationAction({ payload: {} as RouterNavigationPayload });
      const res = uiSettingsReducer(state, act);

      // assert
      expect(res.showSidebar).toBeFalse();
    });
  });

  describe('toggleDarkMode', () => {
    it('should set dark mode to true when false', () => {
      // arrange
      const state: UiSettingsState = {
        ...mockState,
        darkMode: false,
      };

      // act
      const action = toggleDarkMode({ dark: true });
      const res = uiSettingsReducer(state, action);

      // assert
      expect(res.darkMode).toBeTrue();
    });

    it('should set dark mode to false when true', () => {
      // arrange
      const state: UiSettingsState = {
        ...mockState,
        darkMode: true,
      };

      // act
      const action = toggleDarkMode({ dark: false });
      const res = uiSettingsReducer(state, action);

      // assert
      expect(res.darkMode).toBeFalse();
    });
  });

  describe('toggleSidebar', () => {
    it('should set sidebar to true when false', () => {
      // arrange
      const state: UiSettingsState = {
        ...mockState,
        showSidebar: false,
      };

      // act
      const action = toggleSidebar();
      const res = uiSettingsReducer(state, action);

      // assert
      expect(res.showSidebar).toBeTrue();
    });

    it('should set sidebar to false when true', () => {
      // arrange
      const state: UiSettingsState = {
        ...mockState,
        showSidebar: true,
      };

      // act
      const action = toggleSidebar();
      const res = uiSettingsReducer(state, action);

      // assert
      expect(res.showSidebar).toBeFalse();
    });
  });

  describe('apiConnectSuccess', () => {
    it('should update connected to true', () => {
      // arrange
      const state: UiSettingsState = {
        ...mockState,
        connected: false,
      };

      // act
      const action = apiConnectSuccess();
      const res = uiSettingsReducer(state, action);

      // assert
      expect(res.connected).toBeTrue();
    });
  });

  describe('apiDisconnected', () => {
    it('should update connected to false', () => {
      // arrange
      const state: UiSettingsState = {
        ...mockState,
        connected: true,
      };

      // act
      const action = apiDisconnected({ e: {} as ICloseEvent });
      const res = uiSettingsReducer(state, action);

      // assert
      expect(res.connected).toBeFalse();
    });
  });
});
