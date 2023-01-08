import * as React from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Box from "@mui/material/Box";
import { schemaComposer } from "graphql-compose";
import { useAtom } from "jotai";
import Store from "../../../../../store/store";
import TextField from "../../../../../component/TextField/TextField";
import { Typography } from "@mui/material";
import SingleFieldModal from "../../../../../component/Modal/SingleFieldModal/SingleFieldModal";

function ArgType(props) {
  const { arg, objectName, fieldName } = props;
  const [name, setName] = React.useState(arg.name);
  const [description, setDescription] = React.useState(arg.description);
  const [type, setType] = React.useState(arg.type.toString());
  const setGraphQlSchema = useAtom(Store.graphQlSchemaAtom)[1];
  const objectType = schemaComposer.getAnyTC(objectName);
  const field = objectType.getField(fieldName);
  const onBlurHandler = () => {
    field.args[arg.name].type =
      schemaComposer.typeMapper.convertSDLWrappedTypeName(type);
    field.args[arg.name].description = description;
    setGraphQlSchema(schemaComposer.clone().buildSchema());
  };
  const onDeleteHandler = () => {
    delete field.args[arg.name];
    setGraphQlSchema(schemaComposer.clone().buildSchema());
  };
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <TextField label="Argument Name" value={name} setTo={setName} disabled />
      <TextField
        label="Argument Type"
        value={type}
        setTo={setType}
        onBlur={onBlurHandler}
      />
      <TextField
        label="Argument Description"
        value={description}
        setTo={setDescription}
        onBlur={onBlurHandler}
      />
      <IconButton onClick={onDeleteHandler}>
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </div>
  );
}
ArgType.propTypes = {
  arg: PropTypes.object.isRequired,
  objectName: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
};

function SchemaTypeField(props) {
  const { field, onDelete, objectName } = props;
  const name = field.name;
  const [openNewArgModal, setOpenNewArgModal] = React.useState(false);
  const [type, setType] = React.useState(field.type.toString());
  const [description, setDescription] = React.useState(field.description);
  const setGraphQlSchema = useAtom(Store.graphQlSchemaAtom)[1];
  const args = field.args ? field.args : [];
  const objectType = schemaComposer.getAnyTC(objectName);

  const onBlurHandler = () => {
    objectType.extendField(name, {
      description: description,
      type: type,
    });
    setGraphQlSchema(schemaComposer.clone().buildSchema());
  };
  const onNewArgumentAddHandler = (argName) => {
    const field = objectType.getField(name);
    field.args[argName] = {
      type: schemaComposer.typeMapper.convertSDLWrappedTypeName("String"),
    };
    setGraphQlSchema(schemaComposer.clone().buildSchema());
  };
  return (
    <Box
      sx={{
        border: 1,
        borderColor: "info.dark",
        borderRadius: "5px",
        padding: "0.2rem",
        margin: "0.3rem",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <TextField
          label="Field Name"
          value={name}
          InputProps={{
            readOnly: true,
          }}
          tooltip="Field Name cannot be changed. You can delete and create a new field with the modified name. Or you can change it from the schema text editor"
        />
        <TextField
          label="GraphQl Type"
          value={type}
          setTo={setType}
          onBlur={onBlurHandler}
        />
        <TextField
          label="Description"
          value={description}
          setTo={setDescription}
          onBlur={onBlurHandler}
        />
        <IconButton onClick={() => onDelete(field.name)}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </div>
      {["Query", "Mutation"].includes(objectName) && (
        <div style={{ marginLeft: "2rem" }}>
          <Typography fontSize="12px">
            Arguments
            <IconButton onClick={() => setOpenNewArgModal(true)} size="small">
              <AddOutlinedIcon />
            </IconButton>
          </Typography>
          {args.map((arg) => (
            <ArgType
              key={arg.name}
              arg={arg}
              objectName={objectName}
              fieldName={field.name}
            />
          ))}
        </div>
      )}
      {openNewArgModal && (
        <SingleFieldModal
          title="Argument Name"
          closeHandler={() => setOpenNewArgModal(false)}
          onOk={onNewArgumentAddHandler}
        />
      )}
    </Box>
  );
}
SchemaTypeField.propTypes = {
  field: PropTypes.object,
  onDelete: PropTypes.func,
  objectName: PropTypes.string,
};

export default SchemaTypeField;
