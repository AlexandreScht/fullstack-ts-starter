import type { ServicesProvider } from '@/interfaces/providers';
import ServerRequest from '@/routes/serverRequest';
import PrepareServices from '@/services';
import type { Session } from 'next-auth';

type serverServicesValues = {
  ApiServices: ServicesProvider;
};

const ServerSideServices = (session: Session | void) => {
  const token: string | undefined = session?.user?.jwt ?? undefined;
  const api = ServerRequest({ token });
  const ApiServices = PrepareServices({ api });
  const serverServices: serverServicesValues = {
    ApiServices,
  };
  return serverServices;
};

export default ServerSideServices;
