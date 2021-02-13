import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import fromAuth, * as authSlice from './auth.slice';
import { FakeAuthService } from './fake-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  constructor(
    private readonly store: Store<typeof fromAuth>, 
    private authProvider: FakeAuthService,
  ) { }

  currentAuthenticatedSession$ = this.store.select(
    createSelector(authSlice.selectFeature, (state) => state.currentAuthenticatedSession)
  );

  loginSuccess$ = this.store.select(
    createSelector(authSlice.selectFeature, (state) => state.loginSuccess)
  )

  isAuthenticated$ = this.authProvider.isAuthenticated$;

  login(authentication): void {
    this.authProvider.login(authentication);
  }

  logout(): void {
    this.authProvider.logout();
  }

}
