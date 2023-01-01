import { atom } from "jotai";
import { printSchema, schemaComposer } from "graphql-compose";

const graphQlSchemaAtom = atom(schemaComposer.buildSchema());

const graphQlSchemaTextAtom = atom((get) =>
  printSchema(get(graphQlSchemaAtom))
);

const Store = {
  graphQlSchemaAtom: graphQlSchemaAtom,
  graphQlSchemaTextAtom: graphQlSchemaTextAtom,
};

export default Store;
