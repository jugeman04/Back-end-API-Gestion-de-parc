import { Router } from 'express';
import { visiteurController } from './visiteur.controller';

class VisiteurRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.route('/').get(visiteurController.getList);
    this.router.route('/:id').get(visiteurController.getById);
    this.router.route('/').post(visiteurController.create);
    this.router.route('/').put(visiteurController.update);
    this.router.route('/:id').delete(visiteurController.delete);
  }
}

const visiteurRouter = new VisiteurRouter();

export const visiteurRoutes = visiteurRouter.router;
