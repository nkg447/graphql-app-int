import { atom } from "jotai";
import { printSchema, schemaComposer } from "graphql-compose";

function generateGraphQlSchema(){
  schemaComposer.Query.addFields({
    myFirstQuery: {type: "String"}
  })
  schemaComposer.Mutation.addFields({
    myFirstMutation: {type: "String"}
  })
  return schemaComposer.buildSchema()
}

const graphQlSchemaAtom = atom(generateGraphQlSchema());
const graphQlSchemaTextAtom = atom((get) =>
  printSchema(get(graphQlSchemaAtom))
);

const restMappingsAtom = atom([]);
const restMappingsTextAtom = atom((get) =>
  JSON.stringify(get(restMappingsAtom), null, 2)
);

const resolverMappingsAtom = atom({
  queryResolvers: [],
  mutationResolvers: [],
  typeResolvers: [],
});
const resolverMappingsTextAtom = atom((get) =>
  JSON.stringify(get(resolverMappingsAtom), null, 2)
);

const Store = {
  graphQlSchemaAtom: graphQlSchemaAtom,
  graphQlSchemaTextAtom: graphQlSchemaTextAtom,
  restMappingsAtom: restMappingsAtom,
  restMappingsTextAtom: restMappingsTextAtom,
  resolverMappingsAtom: resolverMappingsAtom,
  resolverMappingsTextAtom: resolverMappingsTextAtom,
};

export default Store;
