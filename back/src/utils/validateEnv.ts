import { bool, cleanEnv, port, str } from 'envalid';

export const ValidateDefaultEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production'], default: 'development' }),
    PORT: port(),
  });
};

export const ValidateEnv = () => {
  cleanEnv(process.env, {
    PORT: port(),
    FRONT_URL: str(),
    DB_USER: str(),
    DB_PASSWORD: str(),
    DB_HOST: str(),
    DB_DATABASE: str(),
    JWT_SECRET: str(),
    RECAPTCHA_SECRET_KEY: str(),
    PASSWORD_PEPPER: str(),
    STRIPE_SECRET_KEY: str(),
    STRIPE_SECRET_WEBHOOK: str(),
    LOG_FORMAT: str({ choices: ['combined', 'dev'], default: 'dev' }),
    LOG_DIR: str({ default: '../logs' }),
    MAILER_DIR: str({ default: '../templates' }),
    ORIGIN: str(),
    CREDENTIALS: bool(),
  });
};
