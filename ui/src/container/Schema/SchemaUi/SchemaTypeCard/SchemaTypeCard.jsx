import * as React from "react";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {
  GraphQLObjectType,
  typeFromAST,
  parseType,
  buildSchema,
  printSchema,
  GraphQLInt,
} from "graphql";
import { useAtom } from "jotai";
import Store from "../../../../store/store";

function SchemaTypeField(props) {
  const { field, onDelete } = props;
  const name = field.name;
  const [type, setType] = React.useState(field.type.toString());
  const [description, setDescription] = React.useState(field.description);
  const [graphQlSchema, setGraphQlSchema] = useAtom(Store.graphQlSchemaAtom);

  const onBlurHandler = () => {
    field.type = typeFromAST(graphQlSchema, parseType(type));
    field.description = description;
    setGraphQlSchema(graphQlSchema);
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
      <TextField
        id="outlined-basic"
        label="Field Name"
        variant="outlined"
        value={name}
        style={{ width: "30%" }}
        disabled
      />
      <TextField
        id="outlined-basic"
        label="GraphQl Type"
        variant="outlined"
        value={type}
        onChange={(e) => setType(e.target.value)}
        style={{ width: "30%" }}
        onBlur={onBlurHandler}
      />
      <TextField
        id="outlined-basic"
        label="Description"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: "30%" }}
        onBlur={onBlurHandler}
      />
      <IconButton onClick={() => onDelete(field.name)} aria-label="delete">
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </Typography>
  );
}
SchemaTypeField.propTypes = {
  field: PropTypes.object,
  onDelete: PropTypes.func,
};

function SchemaTypeCard(props) {
  const { object } = props;
  const [graphQlSchema, setGraphQlSchema] = useAtom(Store.graphQlSchemaAtom);
  const [description, setDescription] = React.useState(object.description);
  const fields = object.getFields();
  const onDeleteHandler = (fieldName) => {
    delete object.getFields()[fieldName];
    setGraphQlSchema(graphQlSchema);
  };
  const onBlurHandler = () => {
    object.description = description.length > 0 ? description : undefined;
    setGraphQlSchema(graphQlSchema);
  };
  const onNewFieldHandler = () => {
    // const config = object.toConfig();
    // const modifiedType = new GraphQLObjectType({
    //   ...config,
    //   fields: {
    //     ...config.fields,
    //     untitled: { type: GraphQLInt },
    //   },
    // });
    // setGraphQlSchema(buildSchema(printSchema(graphQlSchema)));
  };
  return (
    <Box sx={{ minWidth: 275 }} mt={4} maxWidth={"90%"}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.primary">
              {object.name}
            </Typography>
            <Typography mt={2}>
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                onBlur={onBlurHandler}
                style={{ width: "100%" }}
                multiline
                rows={3}
              />
            </Typography>
            {Object.keys(fields).map((field, key) => (
              <SchemaTypeField
                key={key}
                field={fields[field]}
                onDelete={onDeleteHandler}
              />
            ))}
          </CardContent>
          <CardActions>
            <IconButton
              onClick={onNewFieldHandler}
              style={{ float: "right" }}
              aria-label="add"
            >
              <AddOutlinedIcon />
            </IconButton>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}

SchemaTypeCard.propTypes = {
  object: PropTypes.instanceOf(GraphQLObjectType),
};

export default SchemaTypeCard;
