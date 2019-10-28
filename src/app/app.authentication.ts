import * as passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { config } from '../app/app.config';
import { Request } from 'express';
import { userController } from '../user/user.controller';

const localStrategy = new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await userController.findOne(email);
      const validPassword = await user;
      if (!user) {
        return done(null, false, {
          message: 'Aucun compte correspondant. Veuillez vous inscrire.'
        });
      }
      if (!validPassword) {
        return done(null, false, { message: 'Mot de passe invalide' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);

const extractTokenFromParams = (req: Request) =>
  (req.params && req.params.token) || null;

const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: config.jwt.secretKey,
    jwtFromRequest: ExtractJwt.fromExtractors([
      extractTokenFromParams, // Extract token for WebSocket
      ExtractJwt.fromAuthHeaderAsBearerToken() // Extract token for Http
    ])
  },
  async (jwtPayload, done) => {
    try {
      const user = await userController.findById(jwtPayload._id);

      return user ? done(null, user) : done(null, false);
    } catch (error) {
      return done(error);
    }
  }
);

passport.use(localStrategy);
passport.use(jwtStrategy);

export default passport;
