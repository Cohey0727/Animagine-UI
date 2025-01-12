import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./schema.graphql",
  documents: ["src/**/*.graphql"],
  generates: {
    "src/graphql/generated.ts": {
      plugins: [
        { add: { content: "/* eslint-disable @typescript-eslint/no-explicit-any */" } },
        { add: { content: "/* eslint-disable @typescript-eslint/no-unused-vars */" } },
        "typescript",
        "typescript-operations",
        "typescript-urql",
        "typescript-graphql-request",
        { add: { content: "export type ISODateString = string & { __brandISODateString: any };" } },
        { add: { content: "export type ISOTimeString = string & { __brandISOTimeString: any };" } },
        {
          add: {
            content: "export type ISODateTimeString = string & { __brandISODateTimeString: any };",
          },
        },
      ],
      config: {
        // Where句の型(Input)の型はOptional
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: true,
          defaultValue: false,
        },
        defaultScalarType: "unknown",
        enumsAsConst: true,
        scalars: {
          ID: "string",
          uuid: "string",
          bigint: "number",
          numeric: "number",
          smallint: "number",
          jsonb: "any",
          date: "ISODateString",
          timestamptz: "ISODateTimeString",
          timetz: "ISOTimeString",
        },
      },
      hooks: { afterOneFileWrite: ["prettier --write"] },
    },
  },
};

export default config;
