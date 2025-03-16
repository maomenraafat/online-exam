export interface RegisterAPIData {
  message: string;
  token: string;
  user: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    isVerified: string;
    createdAt: string;
  };
}

export interface RegisterRes {
  message: string;
  token: string;
  userEmail: string;
}
