import { ApplicationConfig } from '@angular/core';
import { provideRouter, } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { authReducer } from './store/auth.reducer';
import { AuthEffects } from './store/auth.effects';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync('noop'),
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects]),
    provideHttpClient()
  ],
};
