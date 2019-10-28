import { Router } from 'express';
// import * as passport from 'passport';
import { authenticationRoutes } from '../authentication/authentication.router';
import { userRoutes } from '../user/user.routes';
import { uploadRoutes } from '../upload/upload.routes';
import { nationaliteRoutes } from '../nationalite/nationalite.routes';
import { visiteurRoutes } from '../visiteur/visiteur.routes';
import { visiteRoutes } from '../visite/visite.routes';

class AppRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.init();
  }

  public init() {
    this.router.get('/api-status', (req, res) =>
      res.json({ status: 'API is OK' })
    );

    this.router.use('/authentication', authenticationRoutes);
    this.router.use('/user', userRoutes);
    this.router.use('/upload', uploadRoutes);
    this.router.use('/nationalite', nationaliteRoutes);
    this.router.use('/visiteur', visiteurRoutes);
    this.router.use('/visite', visiteRoutes);
    // this.router.use('/sendEmail', mailingRoutes);
    // this.router.use('/createToken', () => {
    //   var crypto = require('crypto');
    //   var jwt = require('jsonwebtoken');

    //   crypto.randomBytes(256, (ex: any, buf: any) => {
    //     if (ex) throw ex;
    //     var token = jwt.sign({ foo: 'bar' }, buf);
    //     var decoded = jwt.verify(token, buf);
    //     logger.info(token);
    //   });
    // }); UNCOMMENT THIS TO GENERATE TOKEN
  }
}

const appRouter = new AppRouter();
export const appRoutes = appRouter.router;
