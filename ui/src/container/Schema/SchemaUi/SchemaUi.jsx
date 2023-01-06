import { useAtom } from "jotai";
import * as React from "react";
import Store from "../../../store/store";
import SchemaTypeCard from "./SchemaTypeCard/SchemaTypeCard";
import { GraphQLObjectType } from "graphql";

function SchemaUi(props) {
  const [graphQlSchema] = useAtom(Store.graphQlSchemaAtom);
  if (!graphQlSchema) return <div />;
  const typeMap = graphQlSchema.getTypeMap();
  return (
    <div style={{ overflow: "scroll", height: "75vh" }}>
      {graphQlSchema &&
        Object.keys(typeMap)
          .filter((type) => typeMap[type] instanceof GraphQLObjectType)
          .filter((type) => !["Query", "Mutation"].includes(type))
          .filter((type) => !type.startsWith("__"))
          .map((type) => <SchemaTypeCard key={type} object={typeMap[type]} />)}
    </div>
  );
}

export default SchemaUi;
