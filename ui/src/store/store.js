import { atom } from "jotai";
const { buildSchema, printSchema, GraphQLSchema } = require("graphql");

const graphQlSchemaTextAtom = atom("");

const graphQlSchemaAtom = atom(
  (get) => {
    const gqlText = get(graphQlSchemaTextAtom);
    try {
      return buildSchema(gqlText);
    } catch (e) {}
    return undefined;
  },
  (get, set, newGraphQlSchema) => {
    set(graphQlSchemaTextAtom, printSchema(newGraphQlSchema));
  }
);

const Store = {
  graphQlSchemaAtom: graphQlSchemaAtom,
  graphQlSchemaTextAtom: graphQlSchemaTextAtom,
};

export default Store;
