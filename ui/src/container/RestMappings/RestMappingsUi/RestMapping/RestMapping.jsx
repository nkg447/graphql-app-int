import * as React from "react";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import TextField from "../../../../component/TextField/TextField";
import { useAtom } from "jotai";
import Store from "../../../../store/store";
import { cloneDeep } from "lodash";
import CollapsableCard from "../../../../component/CollapsableCard/CollapsableCard";
import Editor from "../../../../component/Editor/Editor";

const methods = ["GET", "POST", "PATCH", "PUT"];

function RestMapping(props) {
  const { mapping, updateRestMappings } = props;
  const [name, setName] = React.useState(mapping.name);
  const [endpoint, setEndpoint] = React.useState(mapping.endpoint);
  const [method, setMethod] = React.useState(mapping.method);
  const [requestBody, setRequestBody] = React.useState(mapping.requestBody);
  const [headers, setHeaders] = React.useState(
    JSON.stringify(mapping.headers, null, 2)
  );
  const [queryParams, setQueryParams] = React.useState(
    JSON.stringify(mapping.queryParams, null, 2)
  );
  const [restMappings] = useAtom(Store.restMappingsAtom);
  const [resolverMappings, setResolverMappings] = useAtom(
    Store.resolverMappingsAtom
  );

  const updateRestNameInResolverMappings = (oldName, newName) => {
    resolverMappings.queryResolvers
      .filter((qr) => qr.resolver.restName === oldName)
      .forEach((qr) => (qr.resolver.restName = newName));
    resolverMappings.mutationResolvers
      .filter((mr) => mr.resolver.restName === oldName)
      .forEach((mr) => (mr.resolver.restName = newName));
    resolverMappings.typeResolvers.forEach((tr) => {
      tr.keyResolvers
        .filter((kr) => kr.restName === oldName)
        .forEach((kr) => (kr.restName = newName));
    });
    setResolverMappings(cloneDeep(resolverMappings));
  };

  const onBlurHandler = () => {
    if (name !== mapping.name) {
      updateRestNameInResolverMappings(mapping.name, name);
      mapping.name = name;
    }
    mapping.endpoint = endpoint;
    mapping.method = method;
    mapping.headers = JSON.parse(headers?headers:"{}");
    mapping.queryParams = JSON.parse(queryParams?queryParams:"[]");
    mapping.requestBody = requestBody;
    updateRestMappings(restMappings);
  };

  const deleteHandler = () => {
    const index = restMappings.findIndex((e) => e.name === name);
    if (index > -1) {
      restMappings.splice(index, 1);
    }
    updateRestMappings(restMappings);
  };
  return (
    <Box sx={{ minWidth: 275, display: "flex", width: "100%" }} mt={1}>
      <CollapsableCard
        title={name}
        variant={"outlined"}
        onTitleChanged={(name) => {
          setName(name);
          onBlurHandler();
        }}
        deletable
        onDelete={deleteHandler}
      >
        <Typography variant="span" style={{ display: "flex" }}>
          <TextField
            label="Method"
            value={method}
            select
            SelectProps={{
              native: true,
            }}
            setTo={setMethod}
            onBlur={onBlurHandler}
            style={{ maxWidth: "100px" }}
          >
            {methods.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </TextField>
          <TextField
            label="Endpoint"
            value={endpoint}
            setTo={setEndpoint}
            onBlur={onBlurHandler}
          />
        </Typography>
        <Typography variant="span" style={{ display: "flex" }}>
          <TextField
            label="Headers JSON"
            value={headers}
            setTo={setHeaders}
            onBlur={onBlurHandler}
            multiline
          />
          <TextField
            label="Query Params JSON"
            value={queryParams}
            setTo={setQueryParams}
            onBlur={onBlurHandler}
            multiline
          />
        </Typography>
        {method !== "GET" && (
          <>
            <Typography>Request Body</Typography>
            <Editor
              mode="json"
              value={requestBody}
              changeHandler={onBlurHandler}
              setTo={setRequestBody}
              style={{ height: "100px", width: "100%" }}
            />
          </>
        )}
      </CollapsableCard>
    </Box>
  );
}
RestMapping.propTypes = {
  mapping: PropTypes.object.isRequired,
  updateRestMappings: PropTypes.func,
};

export default RestMapping;
