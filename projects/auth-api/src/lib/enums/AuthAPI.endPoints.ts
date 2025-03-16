export class AuthEndPoint {
  static LOGIN = '/api/v1/auth/signin';
  static REGISTER = '/api/v1/auth/signup';
  static CHANGE_PASSWORD = '/api/v1/auth/changePassword';
  static DELETE_ACCOUNT = '/api/v1/auth/deleteMe';
  static EDIT_PROFILE = '/api/v1/auth/editProfile';
  static LOGOUT = '/api/v1/auth/logout';
  static LOGIN_USER = '/api/v1/auth/profileData';
  static FORGET_PASSWORD = '/api/v1/auth/forgotPassword';
  static VERIFY_CODE = '/api/v1/auth/verifyResetCode';
  static RESET_PASSWORD = '/api/v1/auth/resetPassword';
}
