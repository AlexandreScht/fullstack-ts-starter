type ResponseType<T> = [null, T] | string[];

type ServicesProvider = Record<string, (values?: object) => Promise<ResponseType<any>>>;

export type ContextValues = {
  services: ServicesProvider;
  action: Record<string, (values: object) => void>;
  state: Record<string, (values: object) => object | any[]>;
} | null;

export interface AppContextProviderProps {
  children: React.ReactNode;
}
