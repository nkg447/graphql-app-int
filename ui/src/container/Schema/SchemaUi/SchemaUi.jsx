import { useAtom } from "jotai";
import * as React from "react";
import Store from "../../../store/store";
import SchemaTypeCard from "./SchemaTypeCard/SchemaTypeCard";
import { GraphQLInputObjectType, GraphQLObjectType } from "graphql";
import CollapsableCard from "../../../component/CollapsableCard/CollapsableCard";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SingleFieldModal from "../../../component/Modal/SingleFieldModal/SingleFieldModal";
import { schemaComposer } from "graphql-compose";

const dummyMutation={
  getFields: ()=>[],
  name: "Mutation"
}

function SchemaUi(props) {
  const [graphQlSchema, setGraphQlSchema] = useAtom(Store.graphQlSchemaAtom);
  const [openNewTypeModal, setOpenNewTypeModal] = React.useState(false);
  const [openNewInputTypeModal, setOpenNewInputTypeModal] =
    React.useState(false);
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

  const newTypeHandler = (name) => {
    schemaComposer.createObjectTC(`
      type ${name} {
        id: Int!
      }
    `);
    const field = {};
    field[name + "UserQuery"] = { type: name };
    schemaComposer.Query.addFields(field);
    setGraphQlSchema(schemaComposer.clone().buildSchema());
  };

  const newInputTypeHandler = (name) => {
    schemaComposer.createInputTC(`
      input ${name} {
        id: Int!
      }
    `);
    const field = {};
    field[name + "UserMutation"] = {
      type: "String!",
      args: {
        input: { type: name },
      },
    };
    schemaComposer.Mutation.addFields(field);
    setGraphQlSchema(schemaComposer.clone().buildSchema());
  };

  return (
    <div>
      <SchemaTypeCard object={queryType} />
      {mutationType? <SchemaTypeCard object={mutationType} /> :<SchemaTypeCard object={dummyMutation} />}
      <Box sx={{ minWidth: 275, width: "100%" }} mt={1}>
        <CollapsableCard title="Types" titleTypographyProps={{ variant: "h6" }}>
          {graphQlSchema &&
            types.map((type) => (
              <SchemaTypeCard key={type} object={typeMap[type]} />
            ))}
          <IconButton
            onClick={() => setOpenNewTypeModal(true)}
            style={{ float: "right" }}
            aria-label="add"
          >
            <AddOutlinedIcon />
          </IconButton>
        </CollapsableCard>
      </Box>
      <Box sx={{ minWidth: 275, width: "100%" }} mt={1}>
        <CollapsableCard
          title="Input Types"
          titleTypographyProps={{ variant: "h6" }}
        >
          {graphQlSchema &&
            inputTypes.map((type) => (
              <SchemaTypeCard key={type} object={typeMap[type]} />
            ))}
          <IconButton
            onClick={() => setOpenNewInputTypeModal(true)}
            style={{ float: "right" }}
            aria-label="add"
          >
            <AddOutlinedIcon />
          </IconButton>
        </CollapsableCard>
      </Box>
      {openNewTypeModal && (
        <SingleFieldModal
          title="Type Name"
          closeHandler={() => setOpenNewTypeModal(false)}
          onOk={newTypeHandler}
        />
      )}
      {openNewInputTypeModal && (
        <SingleFieldModal
          title="Type Name"
          closeHandler={() => setOpenNewInputTypeModal(false)}
          onOk={newInputTypeHandler}
        />
      )}
    </div>
  );
}

export default SchemaUi;
