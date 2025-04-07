import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SocialIconsComponent } from '../components/ui/social-icons/social-icons.component';
import { CustomInputComponent } from '../components/ui/custom-input/custom-input.component';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthApiService } from 'auth-api';
import { Subject, takeUntil } from 'rxjs';
import { CustomBtnComponent } from '../../../../shared/components/ui/custom-btn/custom-btn.component';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    SocialIconsComponent,
    CustomInputComponent,
    ReactiveFormsModule,
    CustomBtnComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit, OnDestroy {
  togglePasswordInput: boolean = true;
  toggleRePasswordInput: boolean = true;
  registerForm!: FormGroup;
  isLoading: boolean = false;
  private readonly destroy$ = new Subject<void>();
  private readonly _authApiService = inject(AuthApiService);
  private readonly _router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registerForm = new FormGroup(
      {
        username: new FormControl('', [Validators.required]),
        firstName: new FormControl(null, [Validators.required]),
        lastName: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
          ),
        ]),
        rePassword: new FormControl(null, [
          Validators.required,
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
          ),
        ]),
        phone: new FormControl('01234567890', [
          Validators.required,
          Validators.pattern(/^01[0125][0-9]{8}$/),
        ]),
      },
      this.validatePassword
    );

    this.registerForm.get('firstName')?.valueChanges.subscribe(() => {
      this.updateUsername();
    });

    this.registerForm.get('lastName')?.valueChanges.subscribe(() => {
      this.updateUsername();
    });
  }

  updateUsername(): void {
    const firstName = this.registerForm.get('firstName')?.value || '';
    const lastName = this.registerForm.get('lastName')?.value || '';

    const username = `${firstName}${lastName}`
      .toLowerCase()
      .replace(/\s+/g, '');

    this.registerForm.get('username')?.setValue(username, { emitEvent: false });
  }

  register() {
    console.log(this.registerForm);

    if (this.registerForm.invalid || this.isLoading) {
      this.registerForm.markAllAsTouched();
    } else {
      this.isLoading = true;
      console.log(this.registerForm.value);
      this._authApiService
        .register(this.registerForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res: any) => {
            console.log(res);
            this.isLoading = false;
            this._router.navigate(['/auth/login']);
          },
          error: (err: any) => {
            console.log(err);
            this.isLoading = false;
          },
        });
    }
  }

  validatePassword(form: AbstractControl) {
    const password = form.get('password')?.value;
    const rePassword = form.get('rePassword')?.value;
    if (password == rePassword) {
      return null;
    } else {
      return { misMatch: true };
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
