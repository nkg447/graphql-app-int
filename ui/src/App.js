import * as React from "react";
import "./App.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Schema from "./container/Schema/Schema";
import TabPanel from "./component/TabPanel/TabPanel";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const tabIdPrefix = "app"
function a11yProps(index) {
  return {
    id: `${tabIdPrefix}-tab-${index}`,
    "aria-controls": `${tabIdPrefix}-tabpanel-${index}`,
  };
}

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel idPrefix={tabIdPrefix} value={value} index={0}>
          <Schema />
        </TabPanel>
        <TabPanel idPrefix={tabIdPrefix} value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel idPrefix={tabIdPrefix} value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </ThemeProvider>
  );
}

export default App;
