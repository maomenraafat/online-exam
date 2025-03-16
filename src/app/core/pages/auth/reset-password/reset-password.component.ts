import { Component, inject, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-reset-password',
  imports: [SocialIconsComponent, CustomInputComponent, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;

  constructor(
    private _authApiService: AuthApiService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.resetPasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
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
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
    } else {
      console.log(this.resetPasswordForm.value);
      this._authApiService
        .resetPassword(this.resetPasswordForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            this._router.navigate(['/auth/login']);
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
}
