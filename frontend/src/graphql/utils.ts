import { Client, cacheExchange, fetchExchange, subscriptionExchange } from "urql";
import { createClient as createWSClient } from "graphql-ws";
import { useMemo } from "react";

const httpUrl = import.meta.env.VITE_GRAPHQL_API_URL;
const wsUrl = httpUrl.replace(/^http/, "ws");

const createWsClient = (token?: string) => {
  return createWSClient({
    url: wsUrl,
    connectionParams: () => {
      if (!token) return {};
      return { headers: { Authorization: `Bearer ${token}` } };
    },
  });
};

const createClient = (token?: string) => {
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

const useCreateClient = (token?: string) => {
  const client = useMemo(() => createClient(token), [token]);
  return client;
};

export { createWsClient, createClient, useCreateClient };
