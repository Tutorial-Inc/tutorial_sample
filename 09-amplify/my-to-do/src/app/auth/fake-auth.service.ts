import { Injectable } from '@angular/core';
import { AuthProvider } from './auth-provider';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import fromAuth, * as authSlice from './auth.slice';
import { createSelector } from '@reduxjs/toolkit';


const EMAIL = 'john@example.com';
const PASSWORD = 'validpassword';

@Injectable({
  providedIn: 'root'
})
export class FakeAuthService implements AuthProvider {

  currentAuthenticatedSession$ = this.store.select(
    createSelector(authSlice.selectFeature, (state) => state.currentAuthenticatedSession)
  );

  isAuthenticated$ = this.currentAuthenticatedSession$.pipe(
    map(session => session ? true : false)
  )

  constructor(private store: Store<typeof fromAuth>) { }

  completeNewPassword(password: string): void {
    throw new Error('Method not implemented.');
  }
  confirmSignIn(code: string): void {
    throw new Error('Method not implemented.');
  }

  login(authentication: { email: string, password: string }): void {
    console.log(authentication);
    if (authentication.email === EMAIL && authentication.password === PASSWORD) {
      console.log('password is valid')
      this.store.dispatch(authSlice.setLoginStatus({ email: authentication.email }));
      this.store.dispatch(authSlice.setLoginSuccess(true));
    } else {
      this.store.dispatch(authSlice.setLoginStatus(null));
      this.store.dispatch(authSlice.setLoginSuccess(false));
    }
  }

  logout(): void {
    this.store.dispatch(authSlice.setLoginStatus(null));
    this.store.dispatch(authSlice.setLoginSuccess(false));
  }
}
