import type { AxiosInstance } from 'axios';

import { googleLoginService, loginService, registerService } from './auth';
import { confirmAccountService } from './users';

const PrepareServices = ({ api }: { api: AxiosInstance }) => {
  return {
    //* authenticate
    register: registerService({ api }),
    GoogleLogin: googleLoginService({ api }),
    login: loginService({ api }),
    //* users
    confirmAccount: confirmAccountService({ api }),
  };
};

export default PrepareServices;
