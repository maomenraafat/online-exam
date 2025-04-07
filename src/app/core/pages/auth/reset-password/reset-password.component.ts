import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SocialIconsComponent } from '../components/ui/social-icons/social-icons.component';
import { CustomInputComponent } from '../components/ui/custom-input/custom-input.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from 'auth-api';
import { Subject, takeUntil } from 'rxjs';
import { CustomBtnComponent } from '../../../../shared/components/ui/custom-btn/custom-btn.component';

@Component({
  selector: 'app-reset-password',
  imports: [
    SocialIconsComponent,
    CustomInputComponent,
    ReactiveFormsModule,
    CustomBtnComponent,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  resetPasswordForm!: FormGroup;
  togglePasswordInput: boolean = true;
  toggleRePasswordInput: boolean = true;
  isLoading: boolean = false;
  private readonly destroy$ = new Subject<void>();
  private readonly _authApiService = inject(AuthApiService);
  private readonly _router = inject(Router);
  constructor() {}
  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
      ]),
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
      ]),
    });
  }

  setNewPassword() {
    console.log(this.resetPasswordForm.value);
    if (this.resetPasswordForm.invalid || this.isLoading) {
      this.resetPasswordForm.markAllAsTouched();
    } else {
      this.isLoading = true;
      console.log(this.resetPasswordForm.value);
      this._authApiService
        .resetPassword(this.resetPasswordForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            console.log(res);
            this.isLoading = false;
            this._router.navigate(['/auth/login']);
          },
          error: (err) => {
            console.log(err);
            this.isLoading = false;
          },
        });
    }
  }

  togglePassword() {
    this.togglePasswordInput = !this.togglePasswordInput;
  }

  toggleRePassword() {
    this.toggleRePasswordInput = !this.toggleRePasswordInput;
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
