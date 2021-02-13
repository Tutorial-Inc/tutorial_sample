import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Observable, from, of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { AuthProvider } from './auth-provider';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CognitoAuthService implements AuthProvider {

  constructor(
    private router: Router
  ) { }

  forgotPasswordRequest(username: string): Observable<any> {
    return from(Auth.forgotPassword(
      username
    ));
  }

  forgotPasswordSubmit(username: string, code: string, newPassword: string): Observable<void> {
    return from(Auth.forgotPasswordSubmit(
      username,
      code,
      newPassword,
    ));
  }

  requestSignUp(username: string, password: string): Observable<any> {
    return from(Auth.signUp(username, password));
  }

  confirmSignUp(username: string, code: string): Observable<any> {
    return from(Auth.confirmSignUp(username, code));
  }

  private cognitoUser: CognitoUser | null;

  completeNewPassword(password: string): Observable<User> {
    return from(Auth.completeNewPassword(this.cognitoUser, password)).pipe(
      mergeMap(user => {
        return this.getUserAttributesPromise(user)
      }),
      map(userData => new User(userData.email, userData.sub))
    )
  }

  confirmSignIn(code: string): Observable<User> {
    throw new Error('Method not implemented.');
  }

  currentAuthenticatedSession$: Observable<User | any> =
    from(Auth.currentAuthenticatedUser()).pipe(
      mergeMap((user) => {
        return this.getUserAttributesPromise(user);
      }),
      map((userData) => {
        return new User(userData.email, userData.sub);
      }),
      catchError(err => {
        console.error(err);
        return of({});
      })
    )

  isAuthenticated$: Observable<boolean> = this.currentAuthenticatedSession$.pipe(
    map(user => {
      if (user instanceof User) {
        return true;
      }
    })
  );

  login(authentication: { email: string, password: string }): Observable<User> {
    console.log('signin');
    return from(Auth.signIn({
      username: authentication.email,
      password: authentication.password,
    })).pipe(
      mergeMap((cognitoUser: CognitoUser) => {
        return from(this.getUser(cognitoUser))
      })
    );
  }

  logout(): Observable<{}> {
    this.cognitoUser = null;
    return from(Auth.signOut());
  }

  private async getUser(user: CognitoUser): Promise<User> {
    const userData = await this.getUserAttributesPromise(user);
    return new User(userData.email, userData.sub);
  };

  private getUserAttributesPromise(user: CognitoUser): Promise<any> {
    return new Promise((resolve, reject) => {
      user.getUserAttributes((err, result) => {
        if (err) {
          reject(err);
        }
        const userData = {};
        for (let value of result) {
          userData[value.Name] = value.Value;
        }
        resolve(userData);
      })
    })
  }
}
