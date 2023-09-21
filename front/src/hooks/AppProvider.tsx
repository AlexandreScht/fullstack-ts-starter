'use client';

import { ClientException } from '@/exceptions';
import type { AppContextProviderProps, ContextValues } from '@/interfaces/providers';
import ServerRequest from '@/routes/serverRequest';
import PrepareServices from '@/services';
import { useSession } from 'next-auth/react';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext<ContextValues>(null);

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [token, setToken] = useState<string | undefined>();
  const { data: session } = useSession();

  useEffect(() => {
    setToken(session?.user?.jwt);
  }, [session?.user?.jwt]);

  const api = ServerRequest({ token });

  const services = PrepareServices({ api });
  const contextValue: ContextValues = {
    action: {},
    services,
    state: {},
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export default function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new ClientException(404, 'useAppContext must be used within an AppContextProvider');
  }
  return context;
}
