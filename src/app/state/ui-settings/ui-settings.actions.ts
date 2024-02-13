import { createAction, props } from '@ngrx/store';

const actionKey = '[UI SETTINGS]';

export const toggleDarkMode = createAction(
  `${actionKey} Toggle Dark Mode`,
  props<{ dark: boolean }>(),
);

export const toggleSidebar = createAction(`${actionKey} Toggle Sidebar`);
