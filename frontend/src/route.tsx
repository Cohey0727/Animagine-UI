import { RouteDefinition } from "./utils/router.utils";
import Root from "./routes/__root";
import AppId from "./routes/(app)/$id";
import AppIndex from "./routes/(app)";

const route: RouteDefinition = {
  component: () => <Root />,
  children: [
    {
      component: () => <AppIndex />,
    },
    {
      path: "/$id",
      component: () => <AppId />,
    },
  ],
};

export default route;
