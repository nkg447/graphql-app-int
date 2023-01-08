import * as React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Box from "@mui/material/Box";
import { schemaComposer } from "graphql-compose";
import { GraphQLObjectType, GraphQLString } from "graphql";
import { useAtom } from "jotai";
import Store from "../../../../store/store";
import SingleFieldModal from "../../../../component/Modal/SingleFieldModal/SingleFieldModal";
import { CardHeader, Collapse, Tooltip } from "@mui/material";
import TextField from "../../../../component/TextField/TextField";

function SchemaTypeField(props) {
  const { field, onDelete, objectName } = props;
  const name = field.name;
  const [type, setType] = React.useState(field.type.toString());
  const [description, setDescription] = React.useState(field.description);
  const [_, setGraphQlSchema] = useAtom(Store.graphQlSchemaAtom);

  const onBlurHandler = () => {
    const objectType = schemaComposer.getOTC(objectName);
    objectType.extendField(name, {
      description: description,
      type: type,
    });
    setGraphQlSchema(schemaComposer.clone().buildSchema());
  };
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <Tooltip title="Field Name cannot be changed. You can delete and create a new field with the modified name. Or you can change it from the schema text editor">
        <TextField
          label="Field Name"
          value={name}
          InputProps={{
            readOnly: true,
          }}
        />
      </Tooltip>
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
  );
}
SchemaTypeField.propTypes = {
  field: PropTypes.object,
  onDelete: PropTypes.func,
  objectName: PropTypes.string,
};

function SchemaTypeCard(props) {
  const { object } = props;
  const [_, setGraphQlSchema] = useAtom(Store.graphQlSchemaAtom);
  const [description, setDescription] = React.useState(object.description);
  const [openNewFieldModal, setOpenNewFieldModal] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);

  const fields = object.getFields();
  const objectType = schemaComposer.getOTC(object.name);
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
    <Box sx={{ minWidth: 275 }} mt={1} maxWidth={"90%"}>
      <Card variant="outlined">
        <React.Fragment>
          <CardHeader
            titleTypographyProps={{ variant: "h8" }}
            title={object.name}
            onClick={() => setCollapsed(!collapsed)}
            action={
              <IconButton
                onClick={() => setCollapsed(!collapsed)}
                aria-label="expand"
                size="small"
              >
                {collapsed ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
            }
          />
          <Collapse in={collapsed} timeout="auto" unmountOnExit>
            <CardContent>
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
            </CardContent>
          </Collapse>
        </React.Fragment>
      </Card>
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
  object: PropTypes.instanceOf(GraphQLObjectType),
};

export default SchemaTypeCard;
