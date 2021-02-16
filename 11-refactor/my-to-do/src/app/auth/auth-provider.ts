import { Observable } from "rxjs";
import { User } from "./user.model";

export interface AuthProvider { 
  currentAuthenticatedSession$: Observable<User>;
  isAuthenticated$: Observable<boolean>;
  completeNewPassword(password: string): Observable<User>;
  confirmSignIn(code: string): Observable<User>;
  forgotPasswordRequest(username: string): Observable<any>;
  forgotPasswordSubmit(
    username: string, 
    code: string, 
    newPassword: string,
  ): Observable<void>;
  login(authentication: {}): Observable<User>;
  logout(): Observable<any>;
  requestSignUp?(username: string, password: string): Observable<any>;
  confirmSignUp?(uesrname: string, code: string): Observable<any>;
}