export interface User {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterAccountPayload {
  name: string;
  email: string;
  language: string;
  passwordHash: string;
}

export interface VerifyEmailPayload {
  email: string;
  code: string;
}
