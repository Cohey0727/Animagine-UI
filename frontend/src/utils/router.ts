import { AnyRoute, createRootRoute, createRoute, createRouter } from "@tanstack/react-router";

type RouteDefinition = {
  path: string;
  component: () => React.ReactNode;
  children?: RouteDefinition[];
};

const createRouteTree = (routes: RouteDefinition[], parentRoute?: AnyRoute) => {
  return routes.map(({ path, component, children }) => {
    const route = parentRoute
      ? createRoute({ getParentRoute: () => parentRoute, path, component })
      : createRootRoute({ component });

    if (children) {
      route.addChildren(createRouteTree(children, route));
    }

    return route;
  });
};

const buildRouter = (route: RouteDefinition) => {
  const [routeTree] = createRouteTree([route]);
  return createRouter({ routeTree });
};

export type { RouteDefinition };
export { buildRouter };
