import type { ParamsType, QueryType, RoutesType } from '@/interfaces/routes';

//* exemple: { key1: "value1", key2: 15 }
const createRouteWithQueries = (route: string, queries?: QueryType): string => {
  if (!queries) {
    return route;
  }

  const searchParams = new URLSearchParams();

  for (const key in queries) {
    if (queries.hasOwnProperty(key) && queries[key]) {
      searchParams.append(key, queries[key]?.toString());
    }
  }

  const qs = searchParams.toString();

  return qs ? `${route}?${qs}` : route;
};

//* exemple: ["value1", 15]
const createRouteWithParams = (route: string, params?: ParamsType): string => {
  if (!params) {
    return route;
  }
  const ps = params.map(v => encodeURIComponent(v.toString())).join('/');
  return ps ? `${route}/${ps}` : route;
};

const routes: RoutesType = {
  pages: {
    home: () => '/',
    login: (query?: QueryType) => createRouteWithQueries('/login', query),
    register: (query?: QueryType) => createRouteWithQueries('/register', query),
    logout: () => '/logout',
  },
  api: {
    register: () => '/register',
    googleLogin: () => '/OAuth',
    login: () => '/login',
    confirmAccount: () => '/validate-account',
    paramsExemple: (params?: ParamsType) => createRouteWithParams('/roue', params),
  },
  // set key name of routes function to export function
  exports: route => routes.pages[route],
  //? const searchRoute: queryRoutesType = routes.exports('search')
};

export default routes;
