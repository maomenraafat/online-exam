import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, RouterLink, NgClass],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {
  menuVisible: boolean = false;
  toggleNav(): void {
    this.menuVisible = !this.menuVisible;
  }
}
