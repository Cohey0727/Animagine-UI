import { AnyRoute, createRootRoute, createRoute, createRouter } from "@tanstack/react-router";

type RouteDefinition<Root extends boolean = true> = {
  path?: Root extends true ? undefined : string;
  component: () => React.ReactNode;
  children?: RouteDefinition<false>[];
};

const createRouteTree = <Root extends boolean>(
  routes: RouteDefinition<Root>[],
  parentRoute?: AnyRoute,
) => {
  return routes.map(({ path = "/", component, children }) => {
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
