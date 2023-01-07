import * as React from "react";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { useAtom } from "jotai";
import Store from "../../../../store/store";
import {
  Autocomplete,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TextField from "../../../../component/TextField/TextField";

function MutationResolver(props) {
  const {
    mutationResolver,
    restMappings,
    updateResolverMappings,
    deleteHandler,
  } = props;
  const [mutation, setMutation] = React.useState(mutationResolver.mutation);
  const [restName, setRestName] = React.useState(
    mutationResolver.resolver.restName
  );
  const [collapsed, setCollapsed] = React.useState(false);
  React.useEffect(() => {
    if (restName !== mutationResolver.resolver.restName) {
      onBlurHandler();
    }
  }, [restName]);
  const onBlurHandler = () => {
    mutationResolver.mutation = mutation;
    mutationResolver.resolver.restName = restName;
    updateResolverMappings();
  };
  return (
    <Box sx={{ minWidth: 275, display: "flex", width: "100%" }} mt={1}>
      <Card variant="outlined" style={{ width: "100%", margin: "0rem 1rem" }}>
        <React.Fragment>
          <CardHeader
            title={mutation}
            titleTypographyProps={{ variant: "h8" }}
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
              <Autocomplete
                disablePortal
                options={restMappings.map((e) => e.name)}
                onChange={(e, value) => setRestName(value)}
                value={restName}
                renderInput={(params) => (
                  <TextField label="Rest Mapping" {...params} />
                )}
              />
            </CardContent>
          </Collapse>
        </React.Fragment>
      </Card>
    </Box>
  );
}
MutationResolver.propTypes = {
  mutationResolver: PropTypes.object.isRequired,
  restMappings: PropTypes.array.isRequired,
  updateResolverMappings: PropTypes.func,
  deleteHandler: PropTypes.func,
};

function MutationResolvers(props) {
  const { mutationResolvers, updateResolverMappings } = props;
  const [restMappings] = useAtom(Store.restMappingsAtom);
  const [collapsed, setCollapsed] = React.useState(false);
  const mutationResolverDeleteHandler = (mutation) => {
    const index = mutationResolvers.findIndex((e) => e.mutation === mutation);
    if (index > -1) {
      mutationResolvers.splice(index, 1);
      updateResolverMappings();
    }
  };
  if (mutationResolvers.length === 0) return null;
  return (
    <Box sx={{ minWidth: 275, display: "flex", width: "100%" }} mt={1}>
      <Card style={{ width: "100%" }}>
        <CardHeader
          title="Mutation Resolvers"
          titleTypographyProps={{ variant: "h6" }}
          action={
            <IconButton
              onClick={() => setCollapsed(!collapsed)}
              aria-label="expand"
              size="small"
            >
              {collapsed ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          }
        />
        <Collapse in={collapsed} timeout="auto" unmountOnExit>
          {mutationResolvers.map((resolver) => (
            <MutationResolver
              restMappings={restMappings}
              mutationResolver={resolver}
              key={resolver.mutation}
              updateResolverMappings={updateResolverMappings}
              deleteHandler={mutationResolverDeleteHandler}
            />
          ))}
          <div style={{ height: "1rem" }}></div>
        </Collapse>
      </Card>
    </Box>
  );
}
MutationResolvers.propTypes = {
  mutationResolvers: PropTypes.array.isRequired,
  updateResolverMappings: PropTypes.func,
};

export default MutationResolvers;
