import { PluginFunction } from "@graphql-codegen/plugin-helpers";

export const plugin: PluginFunction = (schema, documents) => {
  console.log("Plugin executing!");
  console.log("Documents:", documents);

  // 単純な文字列を返す
  return `
    // This is a test output
    console.log('Generated by subscription-iterator plugin');
  `;
};
