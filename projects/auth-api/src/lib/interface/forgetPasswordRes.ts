export interface ForgetPasswordRes {
  message: string;
  info?: string;
  code?: string;
}

export interface VerifyCodeRes {
  status: string;
}

export interface ResetPasswordRes {
  message: string;
  token: string;
}
