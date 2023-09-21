import type { ConfirmAccountType, ResponseType } from '@/interfaces/services';
import { confirmAccountSchemaValidator } from '@/libs/valideModules';
import validator from '@/middlewares/validator';
import routes from '@/routes';
import type { AxiosInstance } from 'axios';
import { AxiosError } from 'axios';

export const confirmAccountService =
  ({ api }: { api: AxiosInstance }) =>
  async (values: unknown): Promise<ResponseType> => {
    try {
      validator(confirmAccountSchemaValidator, values as ConfirmAccountType);
      const {
        data: { res },
      } = await api.patch(routes.api.confirmAccount(), values);

      return [null, res];
    } catch (err: unknown) {
      const error = err instanceof AxiosError ? err.response?.data?.error : err instanceof Error ? err.message : 'Something went wrong';

      return Array.isArray(error) ? error : [error];
    }
  };
