import config from '@config';
import type { DataStoredInToken } from '@interfaces/auth';
import type { NextFunction, Request, RequestWithAuth, Response, handler } from '@interfaces/request';
import { verify } from 'jsonwebtoken';

const {
  security: { jwt },
} = config;

const getAuthorization = (req: Request) => {
  const coockie = req.cookies['Authorization'];
  if (coockie) return coockie;

  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];

  return null;
};

const mw =
  (handle: handler) =>
  async (req: RequestWithAuth, res: Response, next: NextFunction): Promise<void> => {
    try {
      const Authorization = getAuthorization(req);

      if (!Authorization) {
        req.session = null;
      } else {
        const { User } = verify(Authorization, jwt.JWT_SECRET) as DataStoredInToken;

        req.session = User;
      }

      await handle(req, res, next);
    } catch (err) {
      next(err);
    }
  };

export default mw;
