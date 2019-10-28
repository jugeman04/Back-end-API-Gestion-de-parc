import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import { IAuthenticationResponse } from './authentication.interface';
import { config } from '../app/app.config';
import { authenticationService } from './authentication.service';

class AuthenticationController {
  public logIn(req: Request, res: Response): void {
    authenticationService
      .logIn(req, res)
      .then((response: IAuthenticationResponse) =>
        res.status(200).json(response)
      )
      .catch((err: any) => res.status(500).json(err));
  }
}

export const authenticationController = new AuthenticationController();
