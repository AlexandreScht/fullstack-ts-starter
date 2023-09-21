import type { AxiosResponse } from 'axios';

export interface AuthFormType {
  email: string;
  password: string;
  token?: string;
}

export interface GoogleFormType {
  at_hash: string;
  id_token: string;
}
export interface ConfirmAccountType {
  accessToken: string;
}

export interface ServicesRoutesType {
  [key: string]: {
    [key: string]: (value?: object | params) => string;
  };
}

type ResponseType = [null, AxiosResponse<any, any>] | string[];
