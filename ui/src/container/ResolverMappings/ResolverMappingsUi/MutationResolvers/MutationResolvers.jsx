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
  const onBlurHandler = () => {
    debugger;
    mutationResolver.mutation = mutation;
    mutationResolver.resolver.restName = restName;
    updateResolverMappings();
  };
  return (
    <Box sx={{ minWidth: 275, display: "flex", width: "100%" }} mt={1}>
      <Card variant="outlined" style={{ width: "100%", marginRight: "1rem" }}>
        <React.Fragment>
          <CardHeader
            title={!collapsed && mutation}
            titleTypographyProps={{ variant: "h8" }}
            avatar={
              collapsed && (
                <TextField
                  label="Mutation Name"
                  setTo={setMutation}
                  value={mutation}
                  onBlur={onBlurHandler}
                />
              )
            }
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
                onChange={(e, value) => {
                  setRestName(value);
                }}
                value={restName}
                renderInput={(params) => (
                  <TextField label="Rest Mapping" {...params} />
                )}
              />
            </CardContent>
          </Collapse>
        </React.Fragment>
      </Card>
      <div>
        <IconButton onClick={() => deleteHandler(mutation)} size="medium">
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </div>
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
  return (
    <div>
      <Typography color="text.primary">
        Mutation Resolvers
        <IconButton
          onClick={() => setCollapsed(!collapsed)}
          aria-label="expand"
          size="small"
        >
          {collapsed ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </Typography>

      <Collapse in={collapsed} timeout="auto" unmountOnExit>
        {mutationResolvers.map((e, k) => (
          <MutationResolver
            restMappings={restMappings}
            mutationResolver={e}
            key={k}
            updateResolverMappings={updateResolverMappings}
            deleteHandler={mutationResolverDeleteHandler}
          />
        ))}
      </Collapse>
    </div>
  );
}
MutationResolvers.propTypes = {
  mutationResolvers: PropTypes.array.isRequired,
  updateResolverMappings: PropTypes.func,
};

export default MutationResolvers;
