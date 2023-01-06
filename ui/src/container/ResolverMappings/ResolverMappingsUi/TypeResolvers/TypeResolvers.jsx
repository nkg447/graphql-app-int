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

function KeyResolver(props) {
  const { keyResolver, restMappings, updateStore } = props;
  const [key, setKey] = React.useState(keyResolver.key);
  const [restName, setRestName] = React.useState(keyResolver.restName);
  const [collapsed, setCollapsed] = React.useState(false);
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
      <Card style={{ width: "100%", marginLeft: "1rem" }}>
        <React.Fragment>
          <CardHeader
            title={!collapsed && key}
            titleTypographyProps={{ variant: "h8" }}
            avatar={
              collapsed && (
                <TextField
                  label="Query Name"
                  setTo={setKey}
                  value={key}
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
      <div style={{ margin: "0rem 1rem" }}>
        <IconButton size="medium">
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </div>
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
  const [collapsed, setCollapsed] = React.useState(false);
  const { keyResolvers } = typeResolver;
  const onBlurHandler = () => {
    typeResolver.type = type;
    updateResolverMappings();
  };
  return (
    <Box sx={{ minWidth: 275, display: "flex", width: "100%" }} mt={1}>
      <Card variant="outlined" style={{ width: "100%", marginLeft: "1rem" }}>
        <React.Fragment>
          <CardHeader
            title={!collapsed && type}
            titleTypographyProps={{ variant: "h8" }}
            avatar={
              collapsed && (
                <TextField
                  label="Type Name"
                  setTo={setType}
                  value={type}
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
              {keyResolvers.map((keyResolver) => (
                <KeyResolver
                  keyResolver={keyResolver}
                  restMappings={restMappings}
                  updateStore={onBlurHandler}
                />
              ))}
            </CardContent>
          </Collapse>
        </React.Fragment>
      </Card>
      <div style={{ margin: "0rem 1rem" }}>
        <IconButton onClick={() => deleteHandler(type)} size="medium">
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </div>
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
  const [collapsed, setCollapsed] = React.useState(false);
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
      <Card style={{ width: "100%" }}>
        <CardHeader
          title="Type Resolvers"
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
          {typeResolvers.map((resolver) => (
            <TypeResolver
              restMappings={restMappings}
              typeResolver={resolver}
              key={resolver.type}
              updateResolverMappings={updateResolverMappings}
              deleteHandler={typeResolverDeleteHandler}
            />
          ))}
          <div style={{ height: "1rem" }}></div>
        </Collapse>
      </Card>
    </Box>
  );
}
TypeResolvers.propTypes = {
  typeResolvers: PropTypes.array.isRequired,
  updateResolverMappings: PropTypes.func,
};

export default TypeResolvers;
