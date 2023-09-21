import type { role } from '@interfaces/users';
import type { TokenPayload } from 'google-auth-library';

export interface TokenData {
  token: string;
  expiresIn: number;
  email: string;
}

export interface TokenUser {
  id: number;
}

export interface DataStoredInToken {
  User?: TokenUser;
}

export type OAuthToken = [boolean, TokenPayload?];

export interface AuthLogin {
  email: string;
  password?: string;
  token?: string;
}

export interface OAuthLogin {
  at_hash: string;
  id_token: string;
}

export interface AuthRegister extends AuthLogin {
  role?: role;
}
