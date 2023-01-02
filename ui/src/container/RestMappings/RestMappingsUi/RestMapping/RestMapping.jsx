import * as React from "react";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Collapse,
} from "@mui/material";
import TextField from "../../../../component/TextField/TextField";
import { useAtom } from "jotai";
import Store from "../../../../store/store";

const methods = ["GET", "POST", "PATCH", "PUT"];

function RestMapping(props) {
  const { mapping } = props;
  const [collapsed, setCollapsed] = React.useState(false);
  const [endpoint, setEndpoint] = React.useState(mapping.endpoint);
  const [method, setMethod] = React.useState(mapping.method);
  const [headers, setHeaders] = React.useState(JSON.stringify(mapping.headers));
  const [queryParams, setQueryParams] = React.useState(
    JSON.stringify(mapping.queryParams)
  );
  const [restMappings, setRestMappings] = useAtom(Store.restMappingsAtom);

  const onBlurHandler = () => {
    mapping.endpoint = endpoint;
    mapping.method = method;
    setRestMappings([...restMappings]);
  };
  return (
    <Box sx={{ minWidth: 275 }} mt={2} maxWidth={"90%"}>
      <Card variant="outlined">
        <React.Fragment>
          <CardHeader
            titleTypographyProps={{ variant: "h8" }}
            title={mapping.name}
            onClick={() => setCollapsed(!collapsed)}
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
            </CardContent>
          </Collapse>
        </React.Fragment>
      </Card>
    </Box>
  );
}
RestMapping.propTypes = {
  mapping: PropTypes.object.isRequired,
};

export default RestMapping;
