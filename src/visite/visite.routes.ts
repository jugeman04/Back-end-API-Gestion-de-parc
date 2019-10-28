import { Router } from 'express';
import { visiteController } from './visite.controller';

class VisiteRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.route('/').get(visiteController.getList);
    this.router.route('/:id').get(visiteController.getById);
    this.router.route('/').post(visiteController.create);
    this.router.route('/').put(visiteController.update);
    this.router.route('/:id').delete(visiteController.delete);
  }
}

const visiteRouter = new VisiteRouter();

export const visiteRoutes = visiteRouter.router;
