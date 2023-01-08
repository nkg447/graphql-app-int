import * as React from "react";
import "./App.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Schema from "./container/Schema/Schema";
import TabPanel from "./component/TabPanel/TabPanel";
import RestMappings from "./container/RestMappings/RestMappings";
import TextField from "./component/TextField/TextField";
import { Button, CssBaseline, IconButton, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useAtom } from "jotai";
import Store from "./store/store";
import { schemaComposer } from "graphql-compose";
import { buildSchema } from "graphql";
import Config from "./config";
import ResolverMappings from "./container/ResolverMappings/ResolverMappings";

const darkTheme = createTheme(Config.theme);
const tabIdPrefix = "app";
function a11yProps(index) {
  return {
    id: `${tabIdPrefix}-tab-${index}`,
    "aria-controls": `${tabIdPrefix}-tabpanel-${index}`,
  };
}

function App() {
  const [value, setValue] = React.useState(0);
  const [swaggerUrl, setSwaggerUrl] = React.useState("");
  const [projectId, setProjectId] = React.useState("testProject");
  const setResolverMappings = useAtom(Store.resolverMappingsAtom)[1];
  const setRestMappings = useAtom(Store.restMappingsAtom)[1];
  const setGraphQlSchema = useAtom(Store.graphQlSchemaAtom)[1];
  const [graphQlSchemaText] = useAtom(Store.graphQlSchemaTextAtom);
  const [restMappingsText] = useAtom(Store.restMappingsTextAtom);
  const [resolverMappingsText] = useAtom(Store.resolverMappingsTextAtom);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const updateStore = () => {
    fetch(`${Config.baseUrl}/${projectId}/schema?url=${swaggerUrl}`)
      .then((response) => response.json())
      .then((result) => {
        setResolverMappings(JSON.parse(result.resolverMappings));
        setRestMappings(JSON.parse(result.restMappings));
        schemaComposer.clear();
        setGraphQlSchema(
          schemaComposer.merge(buildSchema(result.schema)).buildSchema()
        );
      })
      .catch((error) => console.log("error", error));
  };

  const submitHandler = () => {
    fetch(`${Config.baseUrl}/${projectId}/storage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        schema: graphQlSchemaText,
        restMappings: restMappingsText,
        resolverMappings: resolverMappingsText,
      }),
    })
      .catch((error) => console.error("error", error));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div style={{ margin: "1rem" }}>
        <div style={{ display: "flex" }}>
          <TextField
            label="Project ID"
            value={projectId}
            setTo={setProjectId}
            style={{ width: "30%" }}
          />
          <TextField
            label="Swagger URL"
            value={swaggerUrl}
            setTo={setSwaggerUrl}
          />
          <IconButton onClick={updateStore}>
            <SendIcon />
          </IconButton>
        </div>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                style={{ textTransform: "none" }}
                label="GraphQL Schema"
                {...a11yProps(0)}
              />
              <Tab
                style={{ textTransform: "none" }}
                label="Rest Mappings"
                {...a11yProps(1)}
              />
              <Tab
                style={{ textTransform: "none" }}
                label="Resolver Mappings"
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>
          <TabPanel idPrefix={tabIdPrefix} value={value} index={0}>
            <Schema />
          </TabPanel>
          <TabPanel idPrefix={tabIdPrefix} value={value} index={1}>
            <RestMappings />
          </TabPanel>
          <TabPanel idPrefix={tabIdPrefix} value={value} index={2}>
            <ResolverMappings />
          </TabPanel>
        </Box>
        <Button
          style={{ float: "right" }}
          onClick={submitHandler}
          variant="outlined"
        >
          Submit
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
