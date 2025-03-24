import { Component, OnDestroy, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-forget-password',
  imports: [
    RouterLink,
    SocialIconsComponent,
    CustomInputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {
  forgetPasswordForm!: FormGroup;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private _authApiService: AuthApiService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.forgetPasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  sendEmail() {
    if (this.forgetPasswordForm.invalid) {
      this.forgetPasswordForm.markAllAsTouched();
    } else {
      console.log(this.forgetPasswordForm.value);
      this._authApiService
        .forgetPassword(this.forgetPasswordForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            console.log(res);
            this._router.navigate(['/auth/verify-code']);
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
