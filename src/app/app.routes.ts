import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { HomeComponent } from './features/pages/home/home.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedUserGuard } from './core/guards/auth/logged-user.guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        canActivate: [loggedUserGuard],
        loadComponent: () =>
          import('./core/pages/auth/register/register.component').then(
            (c) => c.RegisterComponent
          ),
      },
      {
        path: 'login',
        canActivate: [loggedUserGuard],

        loadComponent: () =>
          import('./core/pages/auth/login/login.component').then(
            (c) => c.LoginComponent
          ),
      },
      {
        path: 'forget-password',
        canActivate: [loggedUserGuard],
        loadComponent: () =>
          import(
            './core/pages/auth/forget-password/forget-password.component'
          ).then((c) => c.ForgetPasswordComponent),
      },
    ],
  },
  {
    path: 'home',
    canActivate: [authGuard],
    component: HomeComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './features/pages/home/components/quiz-container/quiz-container.component'
          ).then((c) => c.QuizContainerComponent),
      },
      {
        path: 'exams/:id',
        loadComponent: () =>
          import(
            './features/pages/home/components/exams-container/exams-container.component'
          ).then((c) => c.ExamsContainerComponent),
      },
    ],
    // loadComponent: () =>
    //   import('./features/pages/home/home.component').then(
    //     (c) => c.HomeComponent
    //   ),
  },
];
