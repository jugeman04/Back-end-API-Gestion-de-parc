import { Router } from 'express';
import { gerantController } from './gerant.controller';

class GerantRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.route('/').get(gerantController.getList);
    this.router.route('/:id').get(gerantController.getById);
    this.router.route('/').post(gerantController.create);
    this.router.route('/').put(gerantController.update);
    this.router.route('/:id').delete(gerantController.delete);
  }
}

const gerantRouter = new GerantRouter();

export const gerantRoutes = gerantRouter.router;
