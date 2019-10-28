import * as dotenv from 'dotenv';
import * as env from 'env-var';

dotenv.config({ path: '.env' });

export const config = {
  environment: env
    .get('NODE_ENV')
    .required()
    .asString(),
  server: {
    port: env
      .get('NODE_PORT')
      .required()
      .asIntPositive()
  },
  database: {
    host: env
      .get('HOSTNAME')
      .required()
      .asString(),
    username: env
      .get('USERNAME')
      .required()
      .asString(),
    password: env
      .get('PASSWORD')
      .required()
      .asString(),
    name: env
      .get('DATABASE')
      .required()
      .asString(),
    port: env
      .get('DATABASE_PORT')
      .required()
      .asInt()
  },
  jwt: {
    secretKey: env
      .get('JWT_SECRET')
      .required()
      .asString(),
    expiration: env
      .get('JWT_EXPIRATION')
      .required()
      .asIntPositive()
  }
};
