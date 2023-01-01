import { useAtom } from "jotai";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Store from "../../../store/store";
import SchemaTypeCard from "./SchemaTypeCard/SchemaTypeCard";
import { GraphQLObjectType } from "graphql";

function SchemaUi(props) {
  const [graphQlSchema] = useAtom(Store.graphQlSchemaAtom);
  if (!graphQlSchema) return <div />;
  const typeMap = graphQlSchema.getTypeMap();
  return (
    <Typography
      style={{ overflow: "scroll", height: "75vh" }}
    >
      {graphQlSchema &&
        Object.keys(typeMap)
          .filter((type) => typeMap[type] instanceof GraphQLObjectType)
          .map((type, key) => (
            <SchemaTypeCard key={key} object={typeMap[type]} />
          ))}
    </Typography>
  );
}

export default SchemaUi;
