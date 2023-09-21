import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve('.env.local') });

const config = {
  O2auth: {
    googleToken: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      secretClient: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  reCaptcha: process.env.CAPTCHA_TOKEN,
};
export default config;
