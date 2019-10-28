import * as appRoot from 'app-root-path';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import { Server } from 'http';

import passport from './app.authentication';
import { logger } from './app.logger';
import { appRoutes } from './app.routes';

export class App {
  private app: express.Application;

  constructor() {
    this.app = express();
  }

  public init(port: number): Server {
    this.initMiddlewares();
    this.initRoutes();
    this.initStatics();

    return this.app.listen(port, () => {
      logger.info(`app started, listening on port ${port}`);
    });
  }

  private initMiddlewares() {
    this.app.use(cors());
    this.app.use(passport.initialize());
    this.app.use(helmet());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private initRoutes() {
    this.app.use('/api/v1', appRoutes);
  }

  private initStatics() {
    this.app.use(express.static(`${appRoot}/medias`));
    this.app.use(express.static(`${appRoot}/public`));
  }
}

export const app = new App();
