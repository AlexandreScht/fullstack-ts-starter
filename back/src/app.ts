import { Routes } from '@/interfaces/routes';
import config from '@config';
import { dbConnection } from '@database';
import type { NextFunction, Request, Response } from '@interfaces/request';
import { ErrorMiddleware } from '@middlewares/error';
import { logger, stream } from '@utils/logger';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import 'reflect-metadata';
const { log } = config;
export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes) {
    this.app = express();
    this.env = config.NODE_ENV || 'development';
    this.port = config.PORT || 3005;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
    this.defaultError();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`======= Version: ${this.env} =======
        🚀 App listening on the port: ${this.port} 🚀`);
    });
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    await dbConnection();
  }

  private initializeMiddlewares() {
    this.app.use(morgan(log.FORMAT, { stream }));
    this.app.use(cors({ origin: config.ORIGIN, credentials: config.CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.initializeBodyContent();
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeBodyContent() {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      //  for stripe webhook
      if (req.url === '/api/webhook') {
        express.raw({ type: 'application/json' })(req, res, next);
      } else {
        express.json()(req, res, next);
      }
    });
  }

  private initializeRoutes(routes: Routes) {
    this.app.use('/api', routes.router);
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }

  private defaultError() {
    this.app.use((req: Request, res: Response) => {
      res.status(404).send({ error: `Cannot find or << ${req.method} >> at ${req.url}` });
    });
  }
}
