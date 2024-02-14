import { createAction, props } from '@ngrx/store';
import { ICloseEvent } from 'websocket';

const actionKey = '[UI SETTINGS]';

export const apiConnect = createAction(`${actionKey} API Connect`);
export const apiConnectSuccess = createAction(`${actionKey} API Connect Success`);
export const apiDisconnected = createAction(
  `${actionKey} API Disconnected`,
  props<{ e: ICloseEvent }>(),
);
export const toggleSidebar = createAction(`${actionKey} Toggle Sidebar`);
export const toggleDarkMode = createAction(
  `${actionKey} Toggle Dark Mode`,
  props<{ dark: boolean }>(),
);
