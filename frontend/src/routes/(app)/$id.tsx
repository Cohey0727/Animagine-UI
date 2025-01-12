import { useParams } from "@tanstack/react-router";
import { useHelloQuery } from "../../graphql/generated";

const AppId = () => {
  const params = useParams({ from: "/$id" });
  const [{ data }] = useHelloQuery({});
  console.log(data);
  return <div>{JSON.stringify(params)}</div>;
};

export default AppId;
