import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { AuthApiService } from 'auth-api';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, NgClass, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  menuVisible: boolean = false;
  private readonly destroy$ = new Subject<void>();
  private readonly _authApiService = inject(AuthApiService);
  _router = inject(Router);
  toggleNav(): void {
    this.menuVisible = !this.menuVisible;
  }
  signOut() {
    this._authApiService
      .logout()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          console.log(res);
          localStorage.removeItem('userToken');
          this._router.navigate(['/auth/login']);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }
}
