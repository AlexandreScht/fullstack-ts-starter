import { InvalidArgumentError, ServerException } from '@exceptions';
import type { NextFunction, RequestWithValidator, Response, mwHandler, validators } from '@interfaces/request';
import mw from '@middlewares/mw';

import * as yup from 'yup';

const validate = (validators: validators): mwHandler =>
  mw(async (req: RequestWithValidator, res: Response, next: NextFunction): Promise<void> => {
    const { body, params, query } = validators;
    try {
      ['body', 'params', 'query'].forEach(key => {
        if (validators[key] && !req[key]) {
          throw new Error(`Missing data: ${key}`);
        }
      });

      req.data = await yup
        .object()
        .shape({
          ...(body ? { body: yup.object().shape(body) } : {}),
          ...(query ? { query: yup.object().shape(query) } : {}),
          ...(params ? { params: yup.object().shape(params) } : {}),
        })
        .validate(
          {
            params: req.params,
            body: req.body,
            query: req.query,
          },
          {
            abortEarly: false,
          },
        );

      next();
    } catch (err: unknown) {
      if (err instanceof yup.ValidationError) {
        throw new InvalidArgumentError(err.errors);
      }

      throw new ServerException();
    }
  });

export default validate;
