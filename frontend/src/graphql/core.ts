/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { Client, cacheExchange, fetchExchange, subscriptionExchange } from "urql";
import { createClient as createWSClient } from "graphql-ws";

const apiUrl = import.meta.env.VITE_API_URL;
const graphqlUrl = `${apiUrl}/graphql`;
const wsUrl = graphqlUrl.replace(/^http/, "ws");

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
    url: graphqlUrl,
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

export { createWsClient, createUrqlClient, useCreateUrqlClient };
