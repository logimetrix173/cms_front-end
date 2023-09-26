import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ManageUser from "./ManageUsers/ManageUser";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scb-tab-${index}`,
    "aria-controls": `scb-tabpanel-${index}`,
  };
}

export default function ManageUsers() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="analytics tabs"
        indicatorColor="primary"
      >
        <Tab label="Manage" {...a11yProps(0)} />
        <Tab label="Create" {...a11yProps(1)} />
      </Tabs>

      <TabPanel value={value} index={0} style={{ paddingTop: "0.5rem" }}>
        <ManageUser />
      </TabPanel>
      <TabPanel value={value} index={1} style={{ paddingTop: "0.5rem" }}>
        Create
      </TabPanel>
    </Box>
  );
}
