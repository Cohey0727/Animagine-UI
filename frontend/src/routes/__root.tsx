import { Outlet } from "@tanstack/react-router";
import { Provider as GqlProvider } from "urql";
import { useCreateUrqlClient } from "../graphql/core";

const Root = () => {
  const client = useCreateUrqlClient();
  return <GqlProvider value={client}>{<Outlet />}</GqlProvider>;
};

export default Root;
