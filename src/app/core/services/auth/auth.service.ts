import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  private _PLATFORM_ID = inject(PLATFORM_ID);
  constructor() {}

  saveUser() {
    if (localStorage.getItem('userToken')) {
      this.userData = jwtDecode(localStorage.getItem('userToken')!);
      console.log(this.userData);
    }
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      return !!localStorage.getItem('userToken');
    }
    return false;
  }

  getToken(): string | null {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      return localStorage.getItem('userToken');
    }
    return null;
  }
}
