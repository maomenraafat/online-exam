import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SocialIconsComponent } from '../components/ui/social-icons/social-icons.component';
import { CustomInputComponent } from '../components/ui/custom-input/custom-input.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthApiService } from 'auth-api';
import { ErrorMessageComponent } from '../components/ui/error-message/error-message.component';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    SocialIconsComponent,
    CustomInputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  toggleInput: boolean = true;
  loginForm!: FormGroup;

  constructor(private _authApiService: AuthApiService) {}

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
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      console.log(this.loginForm.value);
      this._authApiService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  togglePassword() {
    this.toggleInput = !this.toggleInput;
  }
}
