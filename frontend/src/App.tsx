import { RouterProvider } from "@tanstack/react-router";
import { buildRouter } from "./utils/router.utils";
import route from "./route";

import "./App.css";

const router = buildRouter(route);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
