export interface IConfig {
  env: string;
  port: string;
  mongo: string;
  googleStrategy: string;
  googleClientId: string;
  googleSecretId: string;
  googleCallbackUrl: string;
  jwtStrategy: string;
  jwtSecretKey: string;
}
