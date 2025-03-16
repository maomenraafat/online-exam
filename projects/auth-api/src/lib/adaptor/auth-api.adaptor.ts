import { Injectable } from '@angular/core';
import { Adaptor } from '../interface/adaptor';
import { LoginAPIData, LoginRes } from '../interface/loginRes';

@Injectable({
  providedIn: 'root',
})
export class AuthAPIAdaptorService implements Adaptor {
  constructor() {}

  adapt(data: LoginAPIData): LoginRes {
    return {
      message: data.message,
      token: data.token,
      userEmail: data.user.email,
    };
  }
  adaptError(data: any): any {
    return {
      message: data.error.message,
      code: data.error.code,
    };
  }
}
