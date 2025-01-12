import { Outlet } from "@tanstack/react-router";

const Root = () => {
  return (
    <div>
      <h1>APP</h1>
      <Outlet />
    </div>
  );
};

export default Root;
