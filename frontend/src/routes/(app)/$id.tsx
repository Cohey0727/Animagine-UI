import { useParams } from "@tanstack/react-router";

const AppId = () => {
  const params = useParams({ from: "/$id" });
  return <div>{JSON.stringify(params)}</div>;
};

export default AppId;
