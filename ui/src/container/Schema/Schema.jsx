import * as React from "react";
import "./Schema.css";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import TabPanel from "../../component/TabPanel/TabPanel";
import SchemaEditor from "./SchemaEditor/SchemaEditor";
import { useAtom } from "jotai";
import Store from "../../store/store";
import SchemaUi from "./SchemaUi/SchemaUi";

const tabIdPrefix = "schema";
function a11yProps(index) {
  return {
    id: `${tabIdPrefix}-tab-${index}`,
    "aria-controls": `${tabIdPrefix}-tabpanel-${index}`,
  };
}

function Schema() {
  const [value, setValue] = React.useState(0);
  const [graphQlSchema] = useAtom(Store.graphQlSchemaAtom);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div id="schema">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="UI" {...a11yProps(0)} />
            <Tab label="TEXT" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel idPrefix={tabIdPrefix} value={value} index={0}>
          <SchemaUi/>
        </TabPanel>
        <TabPanel idPrefix={tabIdPrefix} value={value} index={1}>
          <SchemaEditor />
        </TabPanel>
      </Box>
    </div>
  );
}

export default Schema;
