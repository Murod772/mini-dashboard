import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { login, loginSuccess, loginFailure } from './auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(action => {
        console.log('Login effect triggered:', action);
        return this.authService.login(action.username, action.password).pipe(
          map(user => {
            console.log('Login success:', user);
            this.router.navigate(['/tickets']);
            return loginSuccess({ user });
          }),
          catchError(error => {
            console.log('Login failure:', error);
            return of(loginFailure({ error: error.message }));
          })
        );
      })
    )
  );
}
