import { useParams } from "@tanstack/react-router";
import { GenerateImageDocument, useGenerateImageSubscription } from "../../graphql/generated";
import { useEffect } from "react";
// import { createWsClient } from "../../graphql/utils";

const AppId = () => {
  const params = useParams({ from: "/$id" });
  const [{ data, fetching }] = useGenerateImageSubscription({
    variables: {
      input: { prompt: "Very cool girl" },
    },
    pause: true,
  });
  console.log({ fetching, data, GenerateImageDocument });

  useEffect(() => {
    // const client = createWsClient();
    // client.subscribe(
    //   { query: GenerateImageDocument },
    //   {
    //     complete: () => {},
    //     next: (data) => {},
    //     error: (error) => {},
    //   },
    // );
  }, []);
  return <div>{JSON.stringify(params)}</div>;
};

export default AppId;
