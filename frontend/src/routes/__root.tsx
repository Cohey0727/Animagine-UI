import { Outlet } from "@tanstack/react-router";
import { Provider as GqlProvider } from "urql";
import { useCreateClient } from "../graphql/utils";

const Root = () => {
  const client = useCreateClient();
  return <GqlProvider value={client}>{<Outlet />}</GqlProvider>;
};

export default Root;
