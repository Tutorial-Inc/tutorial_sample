import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, tap } from 'rxjs/operators';
import { AuthFacade } from '../auth/auth.facade';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authService: AuthFacade,
  ) { }

  signUpForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    code: [''],
  });

  waitForConfirmSignUp$ = this.authService.waitForConfirmSignUp$.pipe(
    filter(required => required),
    tap(() => {
      this.signUpForm.get('password').clearValidators();
      this.signUpForm.get('password').setErrors(null);
      this.signUpForm.get('code').setValidators([Validators.required]);
      this.signUpForm.setErrors(null);
    })
  );

  ngOnInit() {
  }

  onConfirmSignUp() {
    console.log('confirm signup')
    this.authService.confirmSignUp(
      this.signUpForm.get('email').value,
      this.signUpForm.get('code').value,
    )
  }
  
  onRequestSignUp() {
    this.authService.requestSignUp(
      this.signUpForm.get('email').value,
      this.signUpForm.get('password').value,
    )
  }

  goToConfirmPhase() {
    this.authService.goToConfirmPhase();
  }

}
