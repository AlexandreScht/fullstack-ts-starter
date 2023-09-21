export type role = 'admin' | 'user';

export interface User {
  id: number;
  email: string;
  role: 'admin' | 'user';
  password: string;
  validate: boolean;
  accessToken: string;
}
