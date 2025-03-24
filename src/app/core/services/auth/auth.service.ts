import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  constructor() {}

  saveUser() {
    if (localStorage.getItem('userToken')) {
      this.userData = jwtDecode(localStorage.getItem('userToken')!);
      console.log(this.userData);
    }
  }
}
