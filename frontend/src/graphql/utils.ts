import { Client, cacheExchange, fetchExchange, subscriptionExchange } from "urql";
import { createClient as createWSClient } from "graphql-ws";
import { useMemo } from "react";
import { GraphQLClient } from "graphql-request";
import { getSdk } from "./generated";

const httpUrl = import.meta.env.VITE_GRAPHQL_API_URL;
const wsUrl = httpUrl.replace(/^http/, "ws");

function createGraphQLClient(token?: string) {
  return new GraphQLClient(httpUrl, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}

const useGraphQLSdk = (token?: string) => {
  const sdk = useMemo(() => getSdk(createGraphQLClient(token)), [token]);
  return sdk;
};

const createWsClient = (token?: string) => {
  return createWSClient({
    url: wsUrl,
    connectionParams: () => {
      if (!token) return {};
      return { headers: { Authorization: `Bearer ${token}` } };
    },
  });
};

const createUrqlClient = (token?: string) => {
  const wsClient = createWsClient(token);
  return new Client({
    url: httpUrl,
    suspense: true,
    exchanges: [
      cacheExchange,
      fetchExchange,
      subscriptionExchange({
        forwardSubscription(fetchBody) {
          const input = { ...fetchBody, query: fetchBody.query ?? "" };
          return {
            subscribe(sink) {
              const unsubscribe = wsClient.subscribe(input, sink);
              return { unsubscribe };
            },
          };
        },
      }),
    ],
    fetchOptions: {
      headers: { Authorization: `Bearer ${token}` },
    },
  });
};

const useCreateUrqlClient = (token?: string) => {
  const client = useMemo(() => createUrqlClient(token), [token]);
  return client;
};

export {
  createGraphQLClient,
  useGraphQLSdk as useGraphQLClient,
  createWsClient,
  createUrqlClient,
  useCreateUrqlClient,
};
