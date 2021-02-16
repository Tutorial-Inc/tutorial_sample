import { Injectable } from '@angular/core';
import { from, of } from 'rxjs';
import { mergeMap, map, catchError, tap, concatMap } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as authSlice from './auth.slice';
import { User } from './user.model';
import { Router } from '@angular/router';
// import { FakeAuthService } from './fake-auth.service';
import { CognitoAuthService } from './cognito-auth.service';

type AuthenticationParams = {
  email: string,
  password: string,
}

type ForgotPasswordParams = {
  username: string,
  code: string,
  newPassword: string,
};

type RequestSignUpParams = {
  username: string,
  password: string,
}

type ConfirmSignUpParams = {
  username: string,
  code: string,
}
@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: CognitoAuthService,
    // private authService: FakeAuthService,
    private router: Router,
  ) { }

  login$ = createEffect(
    () => this.actions$.pipe(
      ofType(authSlice.login),
      map(action => <AuthenticationParams>action.payload),
      mergeMap((authentication: AuthenticationParams) => {
        console.log('login');
        console.log(authentication);
        return this.authService.login(authentication).pipe(
          map((user: User) => {
            console.log(user);
            return authSlice.loginSuccess(user);
          }),
          catchError((err) => {
            return of(authSlice.loginFail({}))
          })
        )
      })
    )
  );

  loginSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(authSlice.loginSuccess),
      tap(() => {
        this.router.navigate(['/todo'])
      })
    ),
    { dispatch: false }
  )

  logout$ = createEffect(
    () => this.actions$.pipe(
      ofType(authSlice.logout),
      mergeMap(() => {
        return this.authService.logout().pipe(
          map(() => {
            return authSlice.logoutSuccess({});
          })
        )
      })
    )
  );

  logoutSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(authSlice.logoutSuccess),
      tap(() => {
        this.router.navigate(['/login']);
      })
    ),
    { dispatch: false }
  )

  initAuthState$ = createEffect(
    () => this.actions$.pipe(
      ofType(authSlice.initAuthState),
      mergeMap(() => {
        return this.authService.currentAuthenticatedSession$.pipe(
          map(user => {
            return authSlice.loginSuccess(user);
          }),
          catchError(err => {
            console.error(err);
            return of(authSlice.loginFail({}));
          })
        )
      })
    )
  )

  completeNewPassword$ = createEffect(
    () => this.actions$.pipe(
      ofType(authSlice.completeNewPassword),
      map(action => action.payload),
      mergeMap(password => {
        return this.authService.completeNewPassword(password).pipe(
          map(user => {
            return authSlice.completeNewPasswordSuccess(user);
          }),
          catchError(err => {
            console.error(err);
            return of(authSlice.completeNewPasswordFailure({}));
          })
        )
      })
    )
  )

  forgotPasswordRequest$ = createEffect(
    () => this.actions$.pipe(
      ofType(authSlice.forgotPasswordRequest),
      map(action => action.payload),
      mergeMap(username => {
        return this.authService.forgotPasswordRequest(username).pipe(
          map(() => {
            return authSlice.forgotPasswordRequestSuccess({});
          })
        )
      })
    )
  )

  forgotPasswordSubmit$ = createEffect(
    () => this.actions$.pipe(
      ofType(authSlice.forgotPasswordSubmit),
      map(action => <ForgotPasswordParams>action.payload),
      mergeMap(forgotPasswordParam => {
        return this.authService.forgotPasswordSubmit(
          forgotPasswordParam.username,
          forgotPasswordParam.code,
          forgotPasswordParam.newPassword
        ).pipe(
          map(() => {
            return authSlice.forgotPasswordSuccess({});
          })
        )
      }),
    )
  )

  forgotPasswordSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(authSlice.forgotPasswordSuccess),
      tap(() => {
        this.router.navigate(['/login']);
      })
    ),
    { dispatch: false }
  )

  requestSignUp$ = createEffect(
    () => this.actions$.pipe(
      ofType(authSlice.requestSignUp),
      map(action => <RequestSignUpParams>action.payload),
      mergeMap(requestSignUpParams => {
        return this.authService.requestSignUp(
          requestSignUpParams.username,
          requestSignUpParams.password,
        ).pipe(
          map(() => {
            return authSlice.requestSignUpSuccess({});
          })
        )
      })
    )
  )

  confirmSignUp$ = createEffect(
    () => this.actions$.pipe(
      ofType(authSlice.confirmSignUp),
      map(action => <ConfirmSignUpParams>action.payload),
      mergeMap(confirmSignupParams => {
        console.log('confirm signup effects')
        console.log(confirmSignupParams)
        return this.authService.confirmSignUp(
          confirmSignupParams.username,
          confirmSignupParams.code,
        ).pipe(
          map(() => {
            return authSlice.confirmSignUpSuccess({});
          }),
          catchError(err => {
            console.error(err);
            return of(authSlice.confirmSignUpSuccess({}));
          })
        )
      })

    )
  )

  confirmSignUpSucess$ = createEffect(
    () => this.actions$.pipe(
      ofType(authSlice.confirmSignUpSuccess),
      concatMap(some => {
        console.log(some)
        console.log('confirm signup success')
        return from(this.router.navigate(['/login']));
      })
    ),
    { dispatch: false}
  )

}