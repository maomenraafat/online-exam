import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./core/pages/auth/register/register.component').then(
            (c) => c.RegisterComponent
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./core/pages/auth/login/login.component').then(
            (c) => c.LoginComponent
          ),
      },
      {
        path: 'forget-password',

        loadComponent: () =>
          import(
            './core/pages/auth/forget-password/forget-password.component'
          ).then((c) => c.ForgetPasswordComponent),
      },
      {
        path: 'reset-password',

        loadComponent: () =>
          import(
            './core/pages/auth/reset-password/reset-password.component'
          ).then((c) => c.ResetPasswordComponent),
      },
      {
        path: 'verify-code',

        loadComponent: () =>
          import('./core/pages/auth/verify-code/verify-code.component').then(
            (c) => c.VerifyCodeComponent
          ),
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./core/pages/auth/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
];
