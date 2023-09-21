import config from '@/config';
import type { RequestWithValidator } from '@/interfaces/request';
import { InvalidIdentityError } from '@exceptions';
import mw from '@middlewares/mw';
import type { NextFunction, Response } from 'express';
import fetch from 'node-fetch';

const isHumain = () =>
  mw(async (req: RequestWithValidator, res: Response, next: NextFunction) => {
    try {
      const {
        data: {
          body: { token },
        },
      } = req;

      const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${config.reCaptcha}&response=${token}`, {
        method: 'POST',
      });

      const data: { success?: boolean } = await response.json();

      if (!data.success) {
        throw new InvalidIdentityError();
      }

      next();
    } catch (error) {
      next(error);
    }
  });

export default isHumain;
