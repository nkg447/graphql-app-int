import { atom } from "jotai";
import { printSchema, schemaComposer } from "graphql-compose";

const graphQlSchemaAtom = atom(schemaComposer.buildSchema());

const graphQlSchemaTextAtom = atom((get) =>
  printSchema(get(graphQlSchemaAtom))
);

const restMappingsAtom = atom([]);
const restMappingsTextAtom = atom((get) =>
  JSON.stringify(get(restMappingsAtom), null, 2)
);

const Store = {
  graphQlSchemaAtom: graphQlSchemaAtom,
  graphQlSchemaTextAtom: graphQlSchemaTextAtom,
  restMappingsAtom: restMappingsAtom,
  restMappingsTextAtom: restMappingsTextAtom,
};

export default Store;
