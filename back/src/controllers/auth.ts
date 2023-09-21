import { InvalidArgumentError, InvalidSessionError, NotFoundError } from '@exceptions';
import type { AuthLogin, AuthRegister, OAuthLogin, OAuthToken } from '@interfaces/auth';
import type { RequestWithData } from '@interfaces/request';
import OAuthTokenCheck from '@libs/OAuthToken';
import { createCookie, createToken } from '@libs/setToken';
import { emailValidator, passwordValidator, roleValidator, stringValidator } from '@libs/validate';
import isHumain from '@middlewares/isHumain';
import mw from '@middlewares/mw';
import slowDown from '@middlewares/slowDown';
import validate from '@middlewares/validator';
import MailerServiceFile from '@services/mailer';
import UsersServiceFiles from '@services/users';
import { transaction } from 'objection';
import { Container } from 'typedi';

const AuthController = ({ app }) => {
  const UserServices = Container.get(UsersServiceFiles);
  const MailerService = Container.get(MailerServiceFile);
  app.post(
    '/register',
    validate({
      body: {
        email: emailValidator.required(),
        password: passwordValidator.required(),
        role: roleValidator,
        token: stringValidator.required(),
      },
    }),
    isHumain(),
    mw(async (req: RequestWithData, res, next) => {
      try {
        const { email, password, role } = req.data.body as AuthRegister;
        const [err] = await UserServices.findUserByEmail(email);

        if (!err) {
          throw new InvalidArgumentError(`this email is already used`);
        }

        await transaction(UserServices.getModel, async trx => {
          const user = await UserServices.register({ email, password, role }, trx);
          await MailerService.Confirmation(user.email, user.accessToken);
          await trx.commit();
        });

        res.status(201).send({ result: 'Confirmation email has been sent' });
      } catch (error) {
        next(error);
      }
    }),
  );
  app.post(
    '/login',
    validate({
      body: {
        email: emailValidator.required(),
        password: stringValidator.required(),
        token: stringValidator.required(),
      },
    }),
    slowDown(500),
    isHumain(),
    mw(async (req: RequestWithData, res, next) => {
      try {
        const { email, password } = req.data.body as AuthLogin;

        const [err, user] = await UserServices.findUserByEmail(email);

        if (err) {
          throw new NotFoundError(`Email or Password is incorrect`);
        }

        if (!user.validate) {
          throw new InvalidSessionError('Please validate your account by mail');
        }

        await UserServices.login(user, password);

        const tokenData = createToken(user);
        const cookie = createCookie(tokenData);

        res.setHeader('Set-Cookie', [cookie]);

        res.status(200).send({ jwt: tokenData });
      } catch (error) {
        next(error);
      }
    }),
  );
  app.post(
    '/OAuth',
    validate({
      body: {
        id_token: stringValidator.required(),
        at_hash: stringValidator.required(),
      },
    }),
    mw(async (req: RequestWithData, res, next) => {
      try {
        const { at_hash, id_token } = req.data.body as OAuthLogin;

        const [error, OAuthUser] = (await OAuthTokenCheck(id_token, at_hash)) as OAuthToken;

        if (error) {
          throw new InvalidSessionError();
        }

        const [userNotFound, user] = await UserServices.findUserOAuth(OAuthUser.email);

        const currentUser = userNotFound ? await UserServices.register({ email: OAuthUser.email }) : user;

        console.log(currentUser);

        const tokenData = createToken(currentUser);
        const cookie = createCookie(tokenData);

        res.setHeader('Set-Cookie', [cookie]);
        res.status(201).send({ jwt: tokenData });
      } catch (error) {
        next(error);
      }
    }),
  );
};

export default AuthController;
