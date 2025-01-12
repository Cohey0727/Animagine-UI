import { useParams } from "@tanstack/react-router";
import { GenerateImageDocument, useGenerateImageSubscription } from "../../graphql/generated";
import { useEffect } from "react";
import { useGraphQLClient } from "../../graphql/utils";
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
  const sdk = useGraphQLClient();
  useEffect(() => {
    sdk
      .GenerateImage({ input: { prompt: "HELLO" } })
      .then((a) => {
        console.log({ a });
      })
      .catch((e) => {
        console.error(e);
      });

    // client.subscribe(
    //   { query: GenerateImageDocument },
    //   {
    //     complete: () => {},
    //     next: (data) => {},
    //     error: (error) => {},
    //   },
    // );
  }, [sdk]);
  return <div>{JSON.stringify(params)}</div>;
};

export default AppId;
