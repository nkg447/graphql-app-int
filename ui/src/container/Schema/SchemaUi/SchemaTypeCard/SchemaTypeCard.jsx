import * as React from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Box from "@mui/material/Box";
import { schemaComposer } from "graphql-compose";
import { GraphQLString } from "graphql";
import { useAtom } from "jotai";
import Store from "../../../../store/store";
import SingleFieldModal from "../../../../component/Modal/SingleFieldModal/SingleFieldModal";
import TextField from "../../../../component/TextField/TextField";
import CollapsableCard from "../../../../component/CollapsableCard/CollapsableCard";
import SchemaTypeField from "./SchemaTypeField/SchemaTypeField";

function SchemaTypeCard(props) {
  const { object } = props;
  const setGraphQlSchema = useAtom(Store.graphQlSchemaAtom)[1];
  const [description, setDescription] = React.useState(object.description);
  const [openNewFieldModal, setOpenNewFieldModal] = React.useState(false);

  const fields = object.getFields();
  const objectType = schemaComposer.getAnyTC(object.name);
  const onDeleteHandler = (fieldName) => {
    objectType.removeField(fieldName);
    setGraphQlSchema(schemaComposer.clone().buildSchema());
  };

  const onBlurHandler = () => {
    objectType.setDescription(description.length > 0 ? description : undefined);
    setGraphQlSchema(schemaComposer.clone().buildSchema());
  };

  const onNewFieldHandler = (name) => {
    const fieldData = {};
    fieldData[name] = {
      type: GraphQLString,
    };
    objectType.addFields(fieldData);
    setGraphQlSchema(schemaComposer.clone().buildSchema());
  };
  return (
    <Box sx={{ minWidth: 275 }} mt={1} style={{ width: "100%" }}>
      <CollapsableCard title={object.name} variant="outlined">
        <TextField
          label="Description"
          value={description}
          setTo={setDescription}
          onBlur={onBlurHandler}
          multiline
        />
        {Object.keys(fields).map((field) => (
          <SchemaTypeField
            key={field}
            field={fields[field]}
            onDelete={onDeleteHandler}
            objectName={object.name}
          />
        ))}
        <IconButton
          onClick={() => setOpenNewFieldModal(true)}
          style={{ float: "right" }}
          aria-label="add"
        >
          <AddOutlinedIcon />
        </IconButton>
      </CollapsableCard>
      {openNewFieldModal && (
        <SingleFieldModal
          title="Field Name"
          closeHandler={() => setOpenNewFieldModal(false)}
          onOk={onNewFieldHandler}
        />
      )}
    </Box>
  );
}

SchemaTypeCard.propTypes = {
  object: PropTypes.object.isRequired,
};

export default SchemaTypeCard;
