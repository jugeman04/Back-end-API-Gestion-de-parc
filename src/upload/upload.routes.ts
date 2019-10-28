import { Router, Request, Response, NextFunction } from 'express';
import { uploadController } from './upload.controller';
import * as uploadConfig from './upload.config';
import * as passport from 'passport';
import { logger } from '../app/app.logger';

class UploadRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    const uploadVisual = uploadConfig.uploadVisual.single('image');
    this.router.route('/image').post(
      // passport.authenticate('jwt', { session: false }),
      uploadConfig.uploadVisual.single('image'),
      (err: any, req: Request, res: Response, next: NextFunction) => {
        logger.error(`Error on uploading image: ${err.stack}`);
        next();
      },
      uploadController.add
    );
    this.router
      .route('/videos')
      .post(
        passport.authenticate('jwt', { session: false }),
        uploadConfig.uploadVideos.array('videos', 12),
        uploadController.add
      );
    this.router
      .route('/documents')
      .post(
        passport.authenticate('jwt', { session: false }),
        uploadConfig.uploadDocuments.array('documents', 12),
        uploadController.add
      );
  }
}

const uploadRouter = new UploadRouter();

export const uploadRoutes = uploadRouter.router;
