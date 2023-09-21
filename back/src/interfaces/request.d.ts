import type { TokenUser } from '@/interfaces/auth';
import { NextFunction as ExpressNextFunction, Request as ExpressRequest, Response as ExpressResponse } from 'express';
import type Stripe from 'stripe';
import * as yup from 'yup';

export type NextFunction = ExpressNextFunction;
export type Request = ExpressRequest;
export type Response = ExpressResponse;

export type mwHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;
export type handler = (req: Request, res: Response, next: NextFunction) => Promise<void | NodeJS.Timeout>;

export type validatorsProps = Record<string, yup.Schema<any, any, any, any>>;
type queryDataProps = Record<string, any>;

export interface validators {
  body?: validatorsProps;
  params?: validatorsProps;
  query?: validatorsProps;
}
export interface queryData {
  body?: queryDataProps;
  params?: queryDataProps;
  query?: queryDataProps;
}

export interface RequestWithValidator extends Request {
  data?: validators;
}
export interface RequestWithData extends Request {
  data?: queryData;
}
export interface RequestWithAuth extends Request {
  session?: TokenUser;
}
export interface RequestWithWebhook extends Request {
  event?: Stripe.Event;
}
