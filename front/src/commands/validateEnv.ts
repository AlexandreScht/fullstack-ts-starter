const { cleanEnv, str } = require('envalid');
require('dotenv').config();

try {
  cleanEnv(process.env, {
    NEXTAUTH_URL: str(),
    NEXTAUTH_SECRET: str(),
    GOOGLE_CLIENT_ID: str(),
    GOOGLE_CLIENT_SECRET: str(),
    CAPTCHA_TOKEN: str(),
  });
} catch (error: unknown) {
  process.exit(1);
}
