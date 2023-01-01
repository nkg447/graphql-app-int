import * as React from "react";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { schemaComposer } from "graphql-compose";
import { GraphQLObjectType, GraphQLString } from "graphql";
import { useAtom } from "jotai";
import Store from "../../../../store/store";
import SingleFieldModal from "../../../../component/Modal/SingleFieldModal/SingleFieldModal";
import { CardHeader, Collapse, Tooltip } from "@mui/material";

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
    <Typography
      mt={2}
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <Tooltip title="Field Name cannot be changed. You can delete and create a new field with the modified name. Or you can change it from the schema text editor">
        <TextField
          size="small"
          label="Field Name"
          variant="outlined"
          value={name}
          style={{ width: "30%" }}
          InputProps={{
            readOnly: true,
          }}
        />
      </Tooltip>

      <TextField
        size="small"
        label="GraphQl Type"
        variant="outlined"
        value={type}
        onChange={(e) => setType(e.target.value)}
        style={{ width: "30%" }}
        onBlur={onBlurHandler}
      />
      <TextField
        size="small"
        label="Description"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: "30%" }}
        onBlur={onBlurHandler}
      />
      <IconButton onClick={() => onDelete(field.name)}>
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </Typography>
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
  const onDeleteHandler = (fieldName) => {
    const objectType = schemaComposer.getOTC(object.name);
    objectType.removeField(fieldName);
    setGraphQlSchema(schemaComposer.clone().buildSchema());
  };

  const onBlurHandler = () => {
    const objectType = schemaComposer.getOTC(object.name);
    objectType.setDescription(description.length > 0 ? description : undefined);
    setGraphQlSchema(schemaComposer.clone().buildSchema());
  };

  const onNewFieldHandler = (name) => {
    const objectType = schemaComposer.getOTC(object.name);
    const fieldData = {};
    fieldData[name] = {
      type: GraphQLString,
    };
    objectType.addFields(fieldData);
    setGraphQlSchema(schemaComposer.clone().buildSchema());
  };
  return (
    <Box sx={{ minWidth: 275 }} mt={4} maxWidth={"90%"}>
      <Card variant="outlined">
        <React.Fragment>
          <CardHeader
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
              <Typography mt={2}>
                <TextField
                  size="small"
                  label="Description"
                  variant="outlined"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  onBlur={onBlurHandler}
                  style={{ width: "100%" }}
                  multiline
                />
              </Typography>
              {Object.keys(fields).map((field, key) => (
                <SchemaTypeField
                  key={key}
                  field={fields[field]}
                  onDelete={onDeleteHandler}
                  objectName={object.name}
                />
              ))}
            </CardContent>
            <CardActions>
              <IconButton
                onClick={() => setOpenNewFieldModal(true)}
                style={{ float: "right" }}
                aria-label="add"
              >
                <AddOutlinedIcon />
              </IconButton>
            </CardActions>
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
