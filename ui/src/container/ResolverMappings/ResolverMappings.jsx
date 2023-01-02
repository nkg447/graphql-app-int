import * as React from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TabPanel from "../../component/TabPanel/TabPanel";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import ResolverMappingsEditor from "./ResolverMappingsEditor/ResolverMappingsEditor";

const tabIdPrefix = "resolvermappings";
function a11yProps(index) {
  return {
    id: `${tabIdPrefix}-tab-${index}`,
    "aria-controls": `${tabIdPrefix}-tabpanel-${index}`,
  };
}

function ResolverMappings(props) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
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
          
        </TabPanel>
        <TabPanel idPrefix={tabIdPrefix} value={value} index={1}>
          <ResolverMappingsEditor/>
        </TabPanel>
      </Box>
    </div>
  );
}
ResolverMappings.propTypes = {};

export default ResolverMappings;
