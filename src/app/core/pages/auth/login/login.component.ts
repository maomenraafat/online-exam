import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthApiService } from 'auth-api';
import { Store } from '@ngrx/store';
import { saveUser } from '../../../../store/auth.actions';
import { Observable, Subject, takeUntil } from 'rxjs';
import { authSelector } from '../../../../store/auth.selector';
import { TokenData } from '../../../interfaces/tokenData';
import { SocialIconsComponent } from '../components/ui/social-icons/social-icons.component';
import { CustomInputComponent } from '../components/ui/custom-input/custom-input.component';
import { jwtDecode } from 'jwt-decode';
import { AsyncPipe } from '@angular/common';
import { CustomBtnComponent } from '../../../../shared/components/ui/custom-btn/custom-btn.component';
@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    SocialIconsComponent,
    CustomInputComponent,
    ReactiveFormsModule,
    CustomBtnComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  toggleInput: boolean = true;
  loginForm!: FormGroup;
  isLoading: boolean = false;
  private readonly destroy$ = new Subject<void>();
  private readonly _authApiService = inject(AuthApiService);
  private readonly store = inject(Store<{ auth: TokenData }>);
  private readonly _router = inject(Router);
  // userData$!: Observable<TokenData>;

  constructor() {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
      ]),
    });
  }

  login() {
    if (this.loginForm.invalid || this.isLoading) {
      this.loginForm.markAllAsTouched();
    } else {
      this.isLoading = true;
      console.log(this.loginForm.value);
      this._authApiService
        .login(this.loginForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            console.log(res);
            localStorage.setItem('userToken', res.token);
            this.store.dispatch(saveUser({ value: jwtDecode(res.token) }));
            // this.userData$ = this.store.select(authSelector);
            // console.log(this.userData$);
            this.isLoading = false;
            this._router.navigate(['/home']);
          },
          error: (err) => {
            console.log(err);
            this.isLoading = false;
          },
        });
    }
  }

  togglePassword() {
    this.toggleInput = !this.toggleInput;
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
