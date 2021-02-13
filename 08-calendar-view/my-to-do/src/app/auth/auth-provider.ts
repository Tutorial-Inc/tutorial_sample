import { Observable } from "rxjs";

export interface AuthProvider { 
  currentAuthenticatedSession$: Observable<{}>;
  isAuthenticated$: Observable<boolean>;
  login(authentication: {}): void;
  logout(): void;
}