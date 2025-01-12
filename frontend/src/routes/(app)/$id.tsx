import { useParams } from "@tanstack/react-router";

const AppId = () => {
  const params = useParams({ from: "/$id" });
  // const [{ data }] = useGenerateImageSubscription({
  //   variables: {
  //     input: {
  //       prompt: "Very cool girl",
  //     },
  //   },
  // });
  // console.log(data);
  return <div>{JSON.stringify(params)}</div>;
};

export default AppId;
