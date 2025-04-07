import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, NgClass, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  menuVisible: boolean = false;

  _router = inject(Router);
  toggleNav(): void {
    this.menuVisible = !this.menuVisible;
  }
  signOut() {
    localStorage.removeItem('userToken');
    this._router.navigate(['/auth/login']);
  }
}
