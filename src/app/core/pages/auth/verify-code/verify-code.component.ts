import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-verify-code',
  imports: [SocialIconsComponent, CustomInputComponent, ReactiveFormsModule],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.scss',
})
export class VerifyCodeComponent implements OnInit {
  verifyCodeForm!: FormGroup;

  constructor(
    private _authApiService: AuthApiService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.verifyCodeForm = new FormGroup({
      resetCode: new FormControl(null, [Validators.required]),
    });
  }

  verifyCode() {
    if (this.verifyCodeForm.invalid) {
      this.verifyCodeForm.markAllAsTouched();
    } else {
      console.log(this.verifyCodeForm.value);
      this._authApiService.verifyCode(this.verifyCodeForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this._router.navigate(['/auth/reset-password']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
