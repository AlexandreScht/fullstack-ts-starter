import { RequestWithData } from '@interfaces/request';
import { stringValidator } from '@libs/validate';
import mw from '@middlewares/mw';
import validate from '@middlewares/validator';
import UsersServiceFiles from '@services/users';
import { Container } from 'typedi';

const UsersController = ({ app }) => {
  const UserServices = Container.get(UsersServiceFiles);
  app.patch(
    '/validate-account',
    validate({
      body: {
        accessToken: stringValidator.required(),
      },
    }),
    mw(async (req: RequestWithData, res, next) => {
      try {
        const { accessToken } = req.data.body as Record<'accessToken', string>;

        await UserServices.ValidateUserAccount(accessToken);

        res.status(201).send({ message: 'Your account has been successfully validated' });
      } catch (error) {
        next(error);
      }
    }),
  );
};

export default UsersController;
