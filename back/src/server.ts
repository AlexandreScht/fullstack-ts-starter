import { App } from '@/app';
import { ApiRouter } from '@routes/prepareRoutes';
import { ValidateDefaultEnv } from '@utils/validateEnv';

ValidateDefaultEnv();

const app = new App(new ApiRouter());

app.listen();
