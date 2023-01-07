import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { useAtom } from "jotai";
import Store from "../../../../store/store";
import { Autocomplete } from "@mui/material";
import TextField from "../../../../component/TextField/TextField";
import CollapsableCard from "../../../../component/CollapsableCard/CollapsableCard";

function KeyResolver(props) {
  const { keyResolver, restMappings, updateStore } = props;
  const [key, setKey] = React.useState(keyResolver.key);
  const [restName, setRestName] = React.useState(keyResolver.restName);
  React.useEffect(() => {
    if (restName !== keyResolver.restName) {
      onBlurHandler();
    }
  }, [restName]);
  const onBlurHandler = () => {
    keyResolver.key = key;
    keyResolver.restName = restName;
    updateStore();
  };
  return (
    <Box sx={{ minWidth: 275, display: "flex", width: "100%" }} mt={1}>
      <CollapsableCard
        title={key}
        setTitle={(title) => {
          setKey(title);
          onBlurHandler();
        }}
        deleteable
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
};

function TypeResolver(props) {
  const { typeResolver, restMappings, updateResolverMappings, deleteHandler } =
    props;
  const [type, setType] = React.useState(typeResolver.type);
  const { keyResolvers } = typeResolver;
  const onBlurHandler = () => {
    typeResolver.type = type;
    updateResolverMappings();
  };
  return (
    <Box sx={{ minWidth: 275, display: "flex", width: "100%" }} mt={1}>
      <CollapsableCard
        title={type}
        variant={"outlined"}
        setTitle={(title) => {
          setType(title);
          onBlurHandler();
        }}
        deleteable
        onDelete={deleteHandler}
      >
        {keyResolvers.map((keyResolver) => (
          <KeyResolver
            keyResolver={keyResolver}
            restMappings={restMappings}
            updateStore={onBlurHandler}
            key={keyResolver.key}
          />
        ))}
      </CollapsableCard>
    </Box>
  );
}

TypeResolver.propTypes = {
  typeResolver: PropTypes.object.isRequired,
  restMappings: PropTypes.array.isRequired,
  updateResolverMappings: PropTypes.func,
  deleteHandler: PropTypes.func,
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
  if (typeResolvers.length === 0) return null;
  return (
    <Box sx={{ minWidth: 275, display: "flex", width: "100%" }} mt={1}>
      <CollapsableCard
        title="Type Resolvers"
        titleTypographyProps={{ variant: "h6" }}
      >
        {typeResolvers.map((resolver) => (
          <TypeResolver
            restMappings={restMappings}
            typeResolver={resolver}
            key={resolver.type}
            updateResolverMappings={updateResolverMappings}
            deleteHandler={typeResolverDeleteHandler}
          />
        ))}
      </CollapsableCard>
    </Box>
  );
}
TypeResolvers.propTypes = {
  typeResolvers: PropTypes.array.isRequired,
  updateResolverMappings: PropTypes.func,
};

export default TypeResolvers;
