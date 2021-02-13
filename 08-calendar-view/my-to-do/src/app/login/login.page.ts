import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  isAuthenticated$ = this.authService.isAuthenticated$;
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  // subscription を止めるための Subject
  destroy$ = new Subject<void>();

  readonly errorMessages = {
    email: [
      { type: 'required', message: 'Emailは、必須です。' },
      { type: 'email', message: 'Email形式で入力してください。' }
    ],
    password: [
      { type: 'required', message: 'パスワードを入力してください。' }
    ]
  };
  constructor(
    private authService: AuthFacade,
    private router: Router,
    private fb: FormBuilder,
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
    if (!this.loginForm.valid) return;

    this.authService.login({
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    })
  }

}
