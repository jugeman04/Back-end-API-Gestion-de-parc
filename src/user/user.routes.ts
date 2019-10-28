import { Router } from 'express';
import { userController } from './user.controller';

class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.route('/').get(userController.getList);
    this.router.route('/:id').get(userController.getById);
    this.router.route('/').post(userController.create);
    this.router.route('/sendEmail').post(userController.sendMailInscription);
    this.router.route('/').put(userController.update);
    this.router.route('/:id').delete(userController.delete);
  }
}

const userRouter = new UserRouter();

export const userRoutes = userRouter.router;
