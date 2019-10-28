import { Router } from 'express';
import { nationaliteController } from './nationalite.controller';

class NationaliteRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.route('/').get(nationaliteController.getList);
    this.router.route('/:id').get(nationaliteController.getById);
    this.router.route('/').post(nationaliteController.create);
    this.router.route('/').put(nationaliteController.update);
    this.router.route('/:id').delete(nationaliteController.delete);
  }
}

const nationaliteRouter = new NationaliteRouter();

export const nationaliteRoutes = nationaliteRouter.router;
