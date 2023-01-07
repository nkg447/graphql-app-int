import { useAtom } from "jotai";
import * as React from "react";
import Store from "../../../store/store";
import SchemaTypeCard from "./SchemaTypeCard/SchemaTypeCard";
import { GraphQLInputObjectType, GraphQLObjectType } from "graphql";
import CollapsableCard from "../../../component/CollapsableCard/CollapsableCard";
import { Box } from "@mui/material";

function SchemaUi(props) {
  const [graphQlSchema] = useAtom(Store.graphQlSchemaAtom);
  if (!graphQlSchema) return <div />;
  const typeMap = graphQlSchema.getTypeMap();
  const queryType = graphQlSchema.getQueryType();
  const mutationType = graphQlSchema.getMutationType();
  const types = Object.keys(typeMap)
    .filter((type) => typeMap[type] instanceof GraphQLObjectType)
    .filter((type) => !["Query", "Mutation"].includes(type))
    .filter((type) => !type.startsWith("__"));
  const inputTypes = Object.keys(typeMap)
    .filter((type) => typeMap[type] instanceof GraphQLInputObjectType)
    .filter((type) => !type.startsWith("__"));

  return (
    <div>
      <SchemaTypeCard object={queryType} />
      <SchemaTypeCard object={mutationType} />
      <Box sx={{ minWidth: 275, width: "100%" }} mt={1}>
        <CollapsableCard title="Types" titleTypographyProps={{ variant: "h6", color: "primary.main" }}>
          {graphQlSchema &&
            types.map((type) => (
              <SchemaTypeCard key={type} object={typeMap[type]} />
            ))}
        </CollapsableCard>
      </Box>
      <Box sx={{ minWidth: 275, width: "100%" }} mt={1}>
        <CollapsableCard
          title="Input Types"
          titleTypographyProps={{ variant: "h6", color: "primary.main" }}
        >
          {graphQlSchema &&
            inputTypes.map((type) => (
              <SchemaTypeCard key={type} object={typeMap[type]} />
            ))}
        </CollapsableCard>
      </Box>
    </div>
  );
}

export default SchemaUi;
