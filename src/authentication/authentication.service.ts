import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';

import { config } from '../app/app.config';
import { IAuthenticationResponse } from './authentication.interface';

class AuthenticationService {
  public logIn(req: Request, res: Response): Promise<IAuthenticationResponse> {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        'local',
        { session: false },
        (err, retUser, info) => {
          if (err || !retUser) {
            reject(err || info);
          } else {
            const user = {
              id: retUser._id,
              email: retUser.email,
              username: retUser.username
            };
            const token = jwt.sign(user, config.jwt.secretKey, {
              expiresIn: config.jwt.expiration
            });
            resolve({ user, token });
          }
        }
      )(req, res);
    });
  }
}

export const authenticationService = new AuthenticationService();
