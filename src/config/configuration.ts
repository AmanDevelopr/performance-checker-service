import { config } from 'dotenv';

import { IConfig } from './IConfig';

config();

export const configurations: IConfig = Object.freeze({
  env: process.env.NODE_ENV,
  mongo: process.env.MONGO_URL,
  port: process.env.PORT,
  googleStrategy: process.env.GOOGLE_STRATEGY,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleSecretId: process.env.GOOGLE_SECRET_ID,
  googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL,
  jwtStrategy: process.env.JWT_STRATEGY,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
}) as IConfig;

export default configurations;
