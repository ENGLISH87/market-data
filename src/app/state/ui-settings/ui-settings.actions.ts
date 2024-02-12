import { createAction, props } from '@ngrx/store';

export const toggleDarkMode = createAction(
  '[UI SETTINGs] Toggle Dark Mode',
  props<{ dark: boolean }>(),
);
