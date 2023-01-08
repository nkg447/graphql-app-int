import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { useAtom } from "jotai";
import Store from "../../../../store/store";
import { Autocomplete, IconButton } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import TextField from "../../../../component/TextField/TextField";
import CollapsableCard from "../../../../component/CollapsableCard/CollapsableCard";
import { GraphQLObjectType } from "graphql";

function KeyResolver(props) {
  const {
    keyResolver,
    restMappings,
    updateStore,
    deleteHandler,
    fieldOptions,
  } = props;
  const [key, setKey] = React.useState(keyResolver.key);
  const [restName, setRestName] = React.useState(keyResolver.restName);
  React.useEffect(() => {
    if (restName !== keyResolver.restName || key !== keyResolver.key) {
      onBlurHandler();
    }
  }, [restName, key]);
  const onBlurHandler = () => {
    keyResolver.key = key;
    keyResolver.restName = restName;
    updateStore();
  };
  return (
    <Box sx={{ minWidth: 275, display: "flex", width: "100%" }} mt={1}>
      <CollapsableCard
        title={key}
        setTitle={setKey}
        deleteable
        onDelete={() => deleteHandler(key)}
        titleOptions={fieldOptions}
      >
        <Autocomplete
          disablePortal
          options={restMappings.map((e) => e.name)}
          onChange={(e, value) => setRestName(value)}
          value={restName}
          renderInput={(params) => (
            <TextField label="Rest Mapping" {...params} />
          )}
        />
      </CollapsableCard>
    </Box>
  );
}
KeyResolver.propTypes = {
  keyResolver: PropTypes.object.isRequired,
  restMappings: PropTypes.array.isRequired,
  updateStore: PropTypes.func,
  deleteHandler: PropTypes.func,
  fieldOptions: PropTypes.arrayOf(PropTypes.string),
};

function TypeResolver(props) {
  const {
    typeResolver,
    restMappings,
    updateResolverMappings,
    deleteHandler,
    typeOptions,
  } = props;
  const [type, setType] = React.useState(typeResolver.type);
  const { keyResolvers } = typeResolver;
  const onBlurHandler = () => {
    typeResolver.type = type;
    updateResolverMappings();
  };
  const onNewKeyResolverHandler = () => {
    keyResolvers.push({
      key: "",
      restName: "",
    });
    updateResolverMappings();
  };
  const keyDeleteHandler = (keyName) => {
    const index = keyResolvers.findIndex((e) => e.key === keyName);
    if (index > -1) {
      keyResolvers.splice(index, 1);
    }
    updateResolverMappings();
  };

  const gqlType = useAtom(Store.graphQlSchemaAtom)[0].getType(type);
  const gqlTypeFieldOptions = Object.keys(gqlType ? gqlType.getFields() : {});
  return (
    <Box sx={{ minWidth: 275, display: "flex", width: "100%" }} mt={1}>
      <CollapsableCard
        title={type}
        variant={"outlined"}
        setTitle={onBlurHandler}
        setTitleTo={setType}
        deleteable
        onDelete={deleteHandler}
        titleOptions={typeOptions}
      >
        {keyResolvers.map((keyResolver) => (
          <KeyResolver
            keyResolver={keyResolver}
            restMappings={restMappings}
            updateStore={onBlurHandler}
            key={keyResolver.key}
            deleteHandler={keyDeleteHandler}
            fieldOptions={gqlTypeFieldOptions}
          />
        ))}
        <IconButton
          style={{ float: "right", marginRight: "1rem" }}
          size="small"
          onClick={onNewKeyResolverHandler}
        >
          <AddOutlinedIcon />
        </IconButton>
      </CollapsableCard>
    </Box>
  );
}

TypeResolver.propTypes = {
  typeResolver: PropTypes.object.isRequired,
  restMappings: PropTypes.array.isRequired,
  updateResolverMappings: PropTypes.func,
  deleteHandler: PropTypes.func,
  typeOptions: PropTypes.arrayOf(PropTypes.string),
};

function TypeResolvers(props) {
  const { typeResolvers, updateResolverMappings } = props;
  const [restMappings] = useAtom(Store.restMappingsAtom);
  const typeResolverDeleteHandler = (type) => {
    const index = typeResolvers.findIndex((e) => e.type === type);
    if (index > -1) {
      typeResolvers.splice(index, 1);
      updateResolverMappings();
    }
  };
  const newTypeResolverHandler = () => {
    typeResolvers.push({
      type: "",
      keyResolvers: [],
    });
    updateResolverMappings();
  };
  const typeMap = useAtom(Store.graphQlSchemaAtom)[0].getTypeMap();
  const graphQlObjectTypes = Object.keys(typeMap)
    .filter((type) => typeMap[type] instanceof GraphQLObjectType)
    .filter((type) => !["Query", "Mutation"].includes(type))
    .filter((type) => !type.startsWith("__"));
  return (
    <Box sx={{ minWidth: 275, display: "flex", width: "100%" }} mt={1}>
      <CollapsableCard
        title="Type Resolvers"
        titleTypographyProps={{ variant: "h6", color: "primary.main" }}
      >
        {typeResolvers.map((resolver) => (
          <TypeResolver
            restMappings={restMappings}
            typeResolver={resolver}
            key={resolver.type}
            updateResolverMappings={updateResolverMappings}
            deleteHandler={typeResolverDeleteHandler}
            typeOptions={graphQlObjectTypes}
          />
        ))}
        <IconButton
          style={{ float: "right", marginRight: "1rem" }}
          size="small"
          onClick={newTypeResolverHandler}
        >
          <AddOutlinedIcon />
        </IconButton>
      </CollapsableCard>
    </Box>
  );
}
TypeResolvers.propTypes = {
  typeResolvers: PropTypes.array.isRequired,
  updateResolverMappings: PropTypes.func,
};

export default TypeResolvers;
