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

function QueryResolver(props) {
  const { queryResolver, restMappings, updateResolverMappings, deleteHandler } =
    props;
  const [query, setQuery] = React.useState(queryResolver.query);
  const [restName, setRestName] = React.useState(
    queryResolver.resolver.restName
  );
  const [collapsed, setCollapsed] = React.useState(false);
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
      <Card
        variant="outlined"
        style={{ width: "100%", margin: "0rem 1rem" }}
      >
        <React.Fragment>
          <CardHeader
            title={query}
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
QueryResolver.propTypes = {
  queryResolver: PropTypes.object.isRequired,
  restMappings: PropTypes.array.isRequired,
  updateResolverMappings: PropTypes.func,
  deleteHandler: PropTypes.func,
};

function QueryResolvers(props) {
  const { queryResolvers, updateResolverMappings } = props;
  const [restMappings] = useAtom(Store.restMappingsAtom);
  const [collapsed, setCollapsed] = React.useState(false);
  const queryResolverDeleteHandler = (query) => {
    const index = queryResolvers.findIndex((e) => e.query === query);
    if (index > -1) {
      queryResolvers.splice(index, 1);
      updateResolverMappings();
    }
  };
  if (queryResolvers.length === 0) return null;
  return (
    <Box sx={{ minWidth: 275, display: "flex", width: "100%" }} mt={1}>
      <Card style={{ width: "100%" }}>
        <CardHeader
          title="Query Resolvers"
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
          {queryResolvers.map((resolver) => (
            <QueryResolver
              restMappings={restMappings}
              queryResolver={resolver}
              key={resolver.query}
              updateResolverMappings={updateResolverMappings}
              deleteHandler={queryResolverDeleteHandler}
            />
          ))}
          <div style={{ height: "1rem" }}></div>
        </Collapse>
      </Card>
    </Box>
  );
}
QueryResolvers.propTypes = {
  queryResolvers: PropTypes.array.isRequired,
  updateResolverMappings: PropTypes.func,
};

export default QueryResolvers;
