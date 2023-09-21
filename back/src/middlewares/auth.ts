import { InvalidAccessError, InvalidSessionError } from '@exceptions';
import type { RequestWithAuth } from '@interfaces/request';
import mw from '@middlewares/mw';
import UsersServiceFiles from '@services/users';
import type { NextFunction, Response } from 'express';
import { Container } from 'typedi';

const auth = (role: string | string[]) =>
  mw(async (req: RequestWithAuth, res: Response, next: NextFunction) => {
    const { session } = req;

    if (session === null || session === undefined) {
      throw new InvalidSessionError();
    }

    const UserServices = Container.get(UsersServiceFiles);

    const [err, findUsers] = await UserServices.findUserById(session.id);

    if (err) {
      throw new InvalidSessionError();
    }

    if (findUsers.role !== role && !role.includes(findUsers.role)) {
      throw new InvalidAccessError();
    }

    next();
  });

export default auth;
