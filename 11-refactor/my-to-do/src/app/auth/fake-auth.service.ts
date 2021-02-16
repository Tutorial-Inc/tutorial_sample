import { Injectable } from '@angular/core';
import { AuthProvider } from './auth-provider';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { createSelector } from '@reduxjs/toolkit';
import { from, Observable, of } from 'rxjs';
import * as authSlice from "./auth.slice";
import { User } from './user.model';
import { Router } from '@angular/router';


const EMAIL = 'john@example.com';
const PASSWORD = 'validpassword';

@Injectable({
  providedIn: "root",
})
export class FakeAuthService implements AuthProvider {
  constructor(private router: Router, private store: Store) {}

  forgotPasswordRequest(username: string): Observable<any> {
    throw new Error("Method not implemented.");
  }

  forgotPasswordSubmit(username: string, code: string, newPassword: string): Observable<void> {
    throw new Error("Method not implemented.");
  }

  requestSignUp(username: string, password: string): Observable<any> {
    throw new Error("Method not implemented.");
  }

  confirmSignUp(username: string, code: string): Observable<any> {
    throw new Error("Method not implemented.");
  }

  completeNewPassword(password: string): Observable<User> {
    throw new Error("Method not implemented.");
  }

  confirmSignIn(code: string): Observable<User> {
    throw new Error("Method not implemented.");
  }

  private fakeUser: User | null = null;

  login(authentication: { email: string; password: string }): Observable<User> {
    console.log(authentication);
    if (authentication.email === EMAIL &&authentication.password === PASSWORD)
    {
      this.fakeUser = new User(EMAIL);
      return from([this.fakeUser]);
    } else {
      throw new Error("Could not authenticate.");
    }
  }

  logout(): Observable<{}> {
    this.fakeUser = null;
    return of({});
  }

  currentAuthenticatedSession$: Observable<User | any> = from([this.fakeUser]);

  isAuthenticated$: Observable<boolean> = this.currentAuthenticatedSession$.pipe(
    map((session) => (session ? true : false))
  );
}
