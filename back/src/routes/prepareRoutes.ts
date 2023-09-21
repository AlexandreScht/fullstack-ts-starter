// apiRouter.ts
import AuthController from '@controllers/auth';
import UsersController from '@controllers/users';
import { Routes } from '@interfaces/routes';
import StripeWebhook from '@webhooks/stripe.s';
import { Router } from 'express';

export class ApiRouter implements Routes {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    AuthController({ app: this.router });
    UsersController({ app: this.router });
    StripeWebhook({ app: this.router });
  }
}
