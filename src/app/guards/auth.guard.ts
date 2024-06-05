import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AuthState } from '../store/auth.reducer'
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store<{ auth: AuthState }>);

  return store.select('auth').pipe(
    map(authState => {
      if (authState.user || localStorage.getItem('user')) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
