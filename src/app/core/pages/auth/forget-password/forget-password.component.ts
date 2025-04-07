import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SocialIconsComponent } from '../components/ui/social-icons/social-icons.component';
import { CustomInputComponent } from '../components/ui/custom-input/custom-input.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthApiService } from 'auth-api';
import { Subject, takeUntil } from 'rxjs';
import { CustomBtnComponent } from '../../../../shared/components/ui/custom-btn/custom-btn.component';
import { VerifyCodeComponent } from '../verify-code/verify-code.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-forget-password',
  imports: [
    RouterLink,
    SocialIconsComponent,
    CustomInputComponent,
    ReactiveFormsModule,
    CustomBtnComponent,
    VerifyCodeComponent,
    ResetPasswordComponent,
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {
  forgetPasswordForm!: FormGroup;
  isLoading: boolean = false;
  isEmailSend: boolean = false;
  isCodeSend: boolean = false;

  private readonly destroy$ = new Subject<void>();
  private readonly _authApiService = inject(AuthApiService);
  private readonly _router = inject(Router);
  constructor() {}
  ngOnInit(): void {
    this.initForm();
    console.log(this.isCodeSend);
  }

  initForm(): void {
    this.forgetPasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  sendEmail() {
    if (this.forgetPasswordForm.invalid || this.isLoading) {
      this.forgetPasswordForm.markAllAsTouched();
    } else {
      this.isLoading = true;

      console.log(this.forgetPasswordForm.value);
      this._authApiService
        .forgetPassword(this.forgetPasswordForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            console.log(res);
            this.isLoading = false;
            this.isEmailSend = true;
            // this._router.navigate(['/auth/verify-code']);
          },
          error: (err) => {
            console.log(err);
            this.isLoading = false;
          },
        });
    }
  }
  onCodeVerified(success: boolean) {
    this.isEmailSend = !success;
    this.isCodeSend = success;
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
