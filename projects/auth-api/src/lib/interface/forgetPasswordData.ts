export interface ForgetPasswordData {
  email: string;
}
export interface VerifyCodeData {
  resetCode: string;
}
export interface ResetPasswordData {
  email: string;
  newPassword: string;
}
