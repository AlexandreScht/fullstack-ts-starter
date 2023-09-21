import type { AuthFormType, GoogleFormType, ResponseType } from '@/interfaces/services';
import { fullLoginSchemaValidator, fullRegisterSchemaValidator, googleSchemaValidator } from '@/libs/valideModules';
import validator from '@/middlewares/validator';
import routes from '@/routes';
import type { AxiosInstance } from 'axios';
import { AxiosError } from 'axios';
export const loginService =
  ({ api }: { api: AxiosInstance }) =>
  async (values: unknown): Promise<ResponseType> => {
    try {
      validator(fullLoginSchemaValidator, values as AuthFormType);
      const {
        data: { jwt },
      } = await api.post(routes.api.login(), values);

      return [null, jwt];
    } catch (err: unknown) {
      const error = err instanceof AxiosError ? err.response?.data?.error : err instanceof Error ? err.message : 'Something went wrong';
      return Array.isArray(error) ? error : [error];
    }
  };

export const registerService =
  ({ api }: { api: AxiosInstance }) =>
  async (values: unknown): Promise<ResponseType> => {
    try {
      validator(fullRegisterSchemaValidator, values as AuthFormType);
      const {
        data: { result },
      } = await api.post(routes.api.register(), values);

      return [null, result];
    } catch (err: unknown) {
      const error = err instanceof AxiosError ? err.response?.data?.error : err instanceof Error ? err.message : 'Something went wrong';
      return Array.isArray(error) ? error : [error];
    }
  };

export const googleLoginService =
  ({ api }: { api: AxiosInstance }) =>
  async (values: unknown): Promise<ResponseType> => {
    try {
      validator(googleSchemaValidator, values as GoogleFormType);
      const {
        data: { jwt },
      } = await api.post(routes.api.googleLogin(), values);

      return [null, jwt];
    } catch (err: unknown) {
      const error = err instanceof AxiosError ? err.response?.data?.error : err instanceof Error ? err.message : 'Something went wrong';

      return Array.isArray(error) ? error : [error];
    }
  };
