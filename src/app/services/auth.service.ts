import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private validUser = {
    username: 'admin',
    password: 'admin'
  };

  constructor() { }

  login(username: string, password: string) {
    if (username === this.validUser.username && password === this.validUser.password) {
      return of({ id: 1, username: 'admin', firstName: 'John', lastName: 'Doe' }).pipe(delay(1000));
    } else {
      return throwError(new Error('Invalid credentials')).pipe(delay(1000));
    }
  }
}
