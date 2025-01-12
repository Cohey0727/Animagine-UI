import { RouterProvider } from "@tanstack/react-router";
import "./App.css";
import { buildRouter } from "./utils/router";
import route from "./route";

const router = buildRouter(route);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
