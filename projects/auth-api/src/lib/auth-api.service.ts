import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';

import { AuthAPI } from './base/AuthAPI';
import { AuthAPIAdaptorService } from './adaptor/auth-api.adaptor';
import { LoginData } from './interface/loginData';
import { LoginRes } from './interface/loginRes';
import { RegisterData } from './interface/registerData';
import { RegisterRes } from './interface/registerRes';
import { AuthEndPoint } from './enums/AuthAPI.endPoints';
import {
  ForgetPasswordData,
  ResetPasswordData,
  VerifyCodeData,
} from './interface/forgetPasswordData';
import {
  ForgetPasswordRes,
  ResetPasswordRes,
  VerifyCodeRes,
} from './interface/forgetPasswordRes';
import { BASE_URL_TOKEN } from './core/tokens/base-url-token';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService implements AuthAPI {
  private readonly _baseUrl = inject(BASE_URL_TOKEN);
  constructor(
    private _httpClient: HttpClient,
    private _authAPIAdaptorService: AuthAPIAdaptorService
  ) {}

  login(data: LoginData): Observable<LoginRes> {
    return this._httpClient.post(this._baseUrl + AuthEndPoint.LOGIN, data).pipe(
      map((res: any) => this._authAPIAdaptorService.adapt(res)),
      catchError((err) => {
        return throwError(() => this._authAPIAdaptorService.adaptError(err));
      })
    );
  }
  register(data: RegisterData): Observable<RegisterRes> {
    return this._httpClient
      .post(this._baseUrl + AuthEndPoint.REGISTER, data)
      .pipe(
        map((res: any) => this._authAPIAdaptorService.adapt(res)),
        catchError((err) => {
          return throwError(() => this._authAPIAdaptorService.adaptError(err));
        })
      );
  }

  forgetPassword(data: ForgetPasswordData): Observable<ForgetPasswordRes> {
    return this._httpClient
      .post(this._baseUrl + AuthEndPoint.FORGET_PASSWORD, data)
      .pipe(
        map((res: any) => res),
        catchError((err) => {
          return throwError(() => this._authAPIAdaptorService.adaptError(err));
        })
      );
  }
  verifyCode(data: VerifyCodeData): Observable<VerifyCodeRes> {
    return this._httpClient
      .post(this._baseUrl + AuthEndPoint.VERIFY_CODE, data)
      .pipe(
        map((res: any) => res),
        catchError((err) => {
          return throwError(() => this._authAPIAdaptorService.adaptError(err));
        })
      );
  }
  resetPassword(data: ResetPasswordData): Observable<ResetPasswordRes> {
    return this._httpClient
      .put(this._baseUrl + AuthEndPoint.RESET_PASSWORD, data)
      .pipe(
        map((res: any) => res),
        catchError((err) => {
          return throwError(() => this._authAPIAdaptorService.adaptError(err));
        })
      );
  }
}
