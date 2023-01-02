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
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useAtom } from "jotai";
import Store from "./store/store";
import { schemaComposer } from "graphql-compose";
import { buildSchema } from "graphql";
import Config from "./config";
import ResolverMappings from "./container/ResolverMappings/ResolverMappings";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const tabIdPrefix = "app";
function a11yProps(index) {
  return {
    id: `${tabIdPrefix}-tab-${index}`,
    "aria-controls": `${tabIdPrefix}-tabpanel-${index}`,
  };
}

function App() {
  const [value, setValue] = React.useState(0);
  const [swaggerUrl, setSwaggerUrl] = React.useState(
    "https://raw.githubusercontent.com/typicode/jsonplaceholder/31e6581ba012d27fd480b052b44001d09e21fdfa/public/swagger.json"
  );
  const [_, setResolverMappings] = useAtom(Store.resolverMappingsAtom);
  const [__, setRestMappings] = useAtom(Store.restMappingsAtom);
  const [___, setGraphQlSchema] = useAtom(Store.graphQlSchemaAtom);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const updateStore = () => {
    fetch(Config.baseUrl + "/tc/schema?url=" + swaggerUrl)
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

  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{ margin: "1rem" }}>
        <div style={{ display: "flex" }}>
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
            <ResolverMappings/>
          </TabPanel>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
