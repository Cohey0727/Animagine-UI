/* eslint-disable @typescript-eslint/no-explicit-any */
import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
export type ISODateString = string & { __brandISODateString: any };
export type ISODateTimeString = string & { __brandISODateTimeString: any };
export type ISOTimeString = string & { __brandISOTimeString: any };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type GenerateImageInput = {
  readonly guidanceScale?: Scalars["Float"]["input"];
  readonly height?: Scalars["Int"]["input"];
  readonly negativePrompt?: InputMaybe<Scalars["String"]["input"]>;
  readonly numInferenceSteps?: Scalars["Int"]["input"];
  readonly prompt: Scalars["String"]["input"];
  readonly width?: Scalars["Int"]["input"];
};

export type GenerateImagePayload = {
  readonly __typename?: "GenerateImagePayload";
  readonly errorMessage: Maybe<Scalars["String"]["output"]>;
  readonly filePath: Maybe<Scalars["String"]["output"]>;
  readonly id: Scalars["String"]["output"];
  readonly status: GenerationStatus;
};

export const GenerationStatus = {
  Completed: "COMPLETED",
  Failed: "FAILED",
  Processing: "PROCESSING",
  Waiting: "WAITING",
} as const;

export type GenerationStatus = (typeof GenerationStatus)[keyof typeof GenerationStatus];
export type Query = {
  readonly __typename?: "Query";
  readonly hello: Scalars["String"]["output"];
};

export type Subscription = {
  readonly __typename?: "Subscription";
  readonly generateImage: GenerateImagePayload;
};

export type SubscriptionGenerateImageArgs = {
  input: GenerateImageInput;
};

export type GenerateImageSubscriptionVariables = Exact<{
  input: GenerateImageInput;
}>;

export type GenerateImageSubscription = {
  readonly __typename?: "Subscription";
  readonly generateImage: {
    readonly __typename?: "GenerateImagePayload";
    readonly errorMessage: string | null;
    readonly filePath: string | null;
    readonly id: string;
    readonly status: GenerationStatus;
  };
};

export type HelloQueryVariables = Exact<{ [key: string]: never }>;

export type HelloQuery = { readonly __typename?: "Query"; readonly hello: string };

export const GenerateImageDocument = gql`
  subscription GenerateImage($input: GenerateImageInput!) {
    generateImage(input: $input) {
      errorMessage
      filePath
      id
      status
    }
  }
`;

export function useGenerateImageSubscription<TData = GenerateImageSubscription>(
  options: Omit<Urql.UseSubscriptionArgs<GenerateImageSubscriptionVariables>, "query">,
  handler?: Urql.SubscriptionHandler<GenerateImageSubscription, TData>,
) {
  return Urql.useSubscription<GenerateImageSubscription, TData, GenerateImageSubscriptionVariables>(
    { query: GenerateImageDocument, ...options },
    handler,
  );
}
export const HelloDocument = gql`
  query Hello {
    hello
  }
`;

export function useHelloQuery(options?: Omit<Urql.UseQueryArgs<HelloQueryVariables>, "query">) {
  return Urql.useQuery<HelloQuery, HelloQueryVariables>({ query: HelloDocument, ...options });
}
