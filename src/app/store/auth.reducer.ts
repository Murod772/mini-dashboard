import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess, loginFailure, updateProfile } from './auth.actions';

export interface AuthState {
  user: any;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(login, state => ({ ...state, error: null })),
  on(loginSuccess, (state, { user }) => {
    localStorage.setItem('user', JSON.stringify(user));
    return { ...state, user };
  }),
  on(loginFailure, (state, { error }) => ({ ...state, error })),
  on(updateProfile, (state, { user }) => {
    localStorage.setItem('user', JSON.stringify(user));
    return { ...state, user };
  })
);
