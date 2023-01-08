import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { useAtom } from "jotai";
import Store from "../../../../store/store";
import { Autocomplete } from "@mui/material";
import TextField from "../../../../component/TextField/TextField";
import CollapsableCard from "../../../../component/CollapsableCard/CollapsableCard";

function QueryResolver(props) {
  const { queryResolver, restMappings, updateResolverMappings } = props;
  const query = queryResolver.query;
  const [restName, setRestName] = React.useState(
    queryResolver.resolver.restName
  );
  React.useEffect(() => {
    if (restName !== queryResolver.resolver.restName) {
      onBlurHandler();
    }
  }, [restName]);
  const onBlurHandler = () => {
    queryResolver.resolver.restName = restName;
    updateResolverMappings();
  };
  return (
    <Box sx={{ minWidth: 275, display: "flex", width: "100%" }} mt={1}>
      <CollapsableCard title={query} variant={"outlined"}>
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
QueryResolver.propTypes = {
  queryResolver: PropTypes.object.isRequired,
  restMappings: PropTypes.array.isRequired,
  updateResolverMappings: PropTypes.func,
};

function QueryResolvers(props) {
  const { queryResolvers, updateResolverMappings } = props;
  const [restMappings] = useAtom(Store.restMappingsAtom);
  if (queryResolvers.length === 0) return null;
  return (
    <Box sx={{ minWidth: 275, display: "flex", width: "100%" }} mt={1}>
      <CollapsableCard
        title="Query Resolvers"
        titleTypographyProps={{ variant: "h6", color: "primary.main" }}
      >
        {queryResolvers.map((resolver) => (
          <QueryResolver
            restMappings={restMappings}
            queryResolver={resolver}
            key={resolver.query}
            updateResolverMappings={updateResolverMappings}
          />
        ))}
      </CollapsableCard>
    </Box>
  );
}
QueryResolvers.propTypes = {
  queryResolvers: PropTypes.array.isRequired,
  updateResolverMappings: PropTypes.func,
};

export default QueryResolvers;
