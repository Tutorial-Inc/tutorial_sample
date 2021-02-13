import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { AuthFacade } from '../auth/auth.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnDestroy, OnInit {

  email: string = '';
  password: string = '';
  isAuthenticated$ = this.authService.isAuthenticated$;

  // subscription を止めるための Subject
  destroy$= new Subject<void>();

  constructor(
    private authService: AuthFacade,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.loginSuccess$.pipe(
      takeUntil(this.destroy$),
      filter(success => success),
      tap(success => this.router.navigate(['/todo']))
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onLoginClicked() {
    this.authService.login({
      email: this.email,
      password: this.password
    })
  }

}
