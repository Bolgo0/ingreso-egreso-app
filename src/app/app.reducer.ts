import { ActionReducerMap } from '@ngrx/store';

import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';


export interface AppState {
  ui: fromUI.UIState;
  auth: fromAuth.AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer
};
