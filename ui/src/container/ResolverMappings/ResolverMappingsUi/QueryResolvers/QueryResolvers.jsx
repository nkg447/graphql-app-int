import * as React from "react";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { useAtom } from "jotai";
import Store from "../../../../store/store";
import {
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
  const onBlurHandler = () => {
    queryResolver.query = query;
    queryResolver.resolver.restName = restName;
    updateResolverMappings();
  };
  return (
    <Box sx={{ minWidth: 275, display: "flex", width: "100%" }} mt={1}>
      <Card variant="outlined" style={{ width: "100%", marginRight: "1rem" }}>
        <React.Fragment>
          <CardHeader
            title={!collapsed && query}
            titleTypographyProps={{ variant: "h8" }}
            avatar={
              collapsed && (
                <TextField
                  label="Query Name"
                  setTo={setQuery}
                  value={query}
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
              <TextField
                label="Rest Mapping"
                value={restName}
                select
                SelectProps={{
                  native: true,
                }}
                setTo={setRestName}
                onBlur={onBlurHandler}
              >
                {restMappings.map((e) => (
                  <option key={e.name} value={e.name}>
                    {e.name}
                  </option>
                ))}
              </TextField>
            </CardContent>
          </Collapse>
        </React.Fragment>
      </Card>
      <div>
        <IconButton onClick={() => deleteHandler(query)} size="medium">
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </div>
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
  const queryResolverDeleteHandler = (query) => {
    const index = queryResolvers.findIndex((e) => e.query === query);
    if (index > -1) {
      queryResolvers.splice(index, 1);
      updateResolverMappings();
    }
  };
  return (
    <div>
      <Typography color="text.primary">Query Resolvers</Typography>
      {queryResolvers.map((e, k) => (
        <QueryResolver
          restMappings={restMappings}
          queryResolver={e}
          key={k}
          updateResolverMappings={updateResolverMappings}
          deleteHandler={queryResolverDeleteHandler}
        />
      ))}
    </div>
  );
}
QueryResolvers.propTypes = {
  queryResolvers: PropTypes.array.isRequired,
  updateResolverMappings: PropTypes.func,
};

export default QueryResolvers;
