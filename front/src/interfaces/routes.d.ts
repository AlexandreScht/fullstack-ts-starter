export type QueryType = Record<string, string | number | boolean>;

export type ParamsType = (string | number | boolean)[];

type QueryRoutesType = (value?: queryType) => string;

type ParamsRoutesType = (value?: paramsType) => string;

type RoutesPropsType = (value?: queryType | params) => string;

export interface RoutesType {
  pages: Record<string, RoutesPropsType>;
  api: Record<string, RoutesPropsType>;
  exports: (routes: string) => () => string;
}
