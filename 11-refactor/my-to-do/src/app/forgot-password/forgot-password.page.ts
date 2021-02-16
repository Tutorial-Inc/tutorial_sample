import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, tap } from 'rxjs/operators';
import { AuthFacade } from '../auth/auth.facade';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authService: AuthFacade,
  ) { }

  forgotPasswordForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    code: '',
    newPassword: '',
  });

  waitCodeAndNewPassword$ = this.authService.waitCodeAndNewPassword$.pipe(
    filter(required => required),
    tap(() => {
      this.forgotPasswordForm.get('code').setValidators([Validators.required])
      this.forgotPasswordForm.get('newPassword').setValidators([Validators.required, Validators.minLength(5)])
    })
  );

  ngOnInit() {
  };

  onForgotPasswordRequest() {
    this.authService.forgotPasswordRequest(
      this.forgotPasswordForm.get('email').value
    );
  }

  onForgotPasswordSubmit() {
    this.authService.forgotPasswordSubmit(
      this.forgotPasswordForm.get('email').value,
      this.forgotPasswordForm.get('code').value,
      this.forgotPasswordForm.get('newPassword').value
    );
  }
}
