import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import fromAuth, * as authSlice from './auth.slice';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  constructor(
    private readonly store: Store<typeof fromAuth>,
  ) { }

  initAuthState() {
    this.store.dispatch(authSlice.initAuthState({}));
  }

  currentAuthenticatedSession$ = this.store.select(
    createSelector(authSlice.selectFeature, (state) => state.currentAuthenticatedSession)
  );

  loginSuccess$ = this.store.select(
    createSelector(authSlice.selectFeature, (state) => state.loginSuccess)
  );

  isAuthenticated$ = this.currentAuthenticatedSession$.pipe(
    map(user => {
      if (user instanceof User) {
        return true;
      } else {
        return false;
      }
    })
  )

  challenge$ = this.store.select(
    createSelector(authSlice.selectFeature, (state) => state.challenge)
  )

  waitCodeAndNewPassword$ = this.store.select(
    createSelector(authSlice.selectFeature, (state) => state.waitCodeAndNewPassword)
  )
  
  waitForConfirmSignUp$ = this.store.select(
    createSelector(authSlice.selectFeature, (state) => state.waitForConfirmSignUp)
  )

  completeNewPassword(password: string) {
    this.store.dispatch(authSlice.completeNewPassword(password));
  }

  login(authentication): void {
    console.log('login clicked');
    this.store.dispatch(authSlice.login(authentication));
  }

  logout(): void {
    this.store.dispatch(authSlice.logout({}));
  }

  forgotPasswordRequest(username: string): void {
    this.store.dispatch(authSlice.forgotPasswordRequest(username))
  }

  forgotPasswordSubmit(username: string, code: string, newPassword: string): void {
    this.store.dispatch(authSlice.forgotPasswordSubmit({
      username,
      code,
      newPassword,
    }));
  }

  requestSignUp(username: string, password: string): void {
    this.store.dispatch(authSlice.requestSignUp({
      username,
      password,
    }));
  }

  confirmSignUp(username: string, code: string): void {
    console.log('confirm sign up facade');
    this.store.dispatch(authSlice.confirmSignUp({
      username,
      code,
    }))
  }

  goToConfirmPhase() {
    this.store.dispatch(authSlice.requestSignUpSuccess({}))
  }

}
