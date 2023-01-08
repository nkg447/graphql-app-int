import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { useAtom } from "jotai";
import Store from "../../../../store/store";
import { Autocomplete } from "@mui/material";
import TextField from "../../../../component/TextField/TextField";
import CollapsableCard from "../../../../component/CollapsableCard/CollapsableCard";

function MutationResolver(props) {
  const { mutationResolver, restMappings, updateResolverMappings } = props;
  const mutation = mutationResolver.mutation;
  const [restName, setRestName] = React.useState(
    mutationResolver.resolver.restName
  );
  React.useEffect(() => {
    if (restName !== mutationResolver.resolver.restName) {
      onBlurHandler();
    }
  }, [restName]);
  const onBlurHandler = () => {
    mutationResolver.resolver.restName = restName;
    updateResolverMappings();
  };
  return (
    <Box sx={{ minWidth: 275, display: "flex", width: "100%" }} mt={1}>
      <CollapsableCard title={mutation} variant={"outlined"}>
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
MutationResolver.propTypes = {
  mutationResolver: PropTypes.object.isRequired,
  restMappings: PropTypes.array.isRequired,
  updateResolverMappings: PropTypes.func,
};

function MutationResolvers(props) {
  const { mutationResolvers, updateResolverMappings } = props;
  const [restMappings] = useAtom(Store.restMappingsAtom);
  if (mutationResolvers.length === 0) return null;
  return (
    <Box sx={{ minWidth: 275, display: "flex", width: "100%" }} mt={1}>
      <CollapsableCard
        title="Mutation Resolvers"
        titleTypographyProps={{ variant: "h6" }}
      >
        {mutationResolvers.map((resolver) => (
          <MutationResolver
            restMappings={restMappings}
            mutationResolver={resolver}
            key={resolver.mutation}
            updateResolverMappings={updateResolverMappings}
          />
        ))}
      </CollapsableCard>
    </Box>
  );
}
MutationResolvers.propTypes = {
  mutationResolvers: PropTypes.array.isRequired,
  updateResolverMappings: PropTypes.func,
};

export default MutationResolvers;
