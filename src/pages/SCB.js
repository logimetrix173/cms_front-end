import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SCBOnline from "../components/SCB/SCBOnline";
import SCBCustom from "../components/SCB/SCBCustom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  tabs: {
    "& .MuiTabs-indicator": {
      backgroundColor: "#148F77",
      // height: 3,
    },
    "& .MuiTab-root.Mui-selected": {
      color: "#148F77",
    },
  },
});

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
        <Box>
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

export default function BasicTabs({ handleSessionExpire }) {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs
        style={{ color: "#000000" }}
        className={classes.tabs}
        // TabIndicatorProps={{
        //   style: { background: "#148F77" },
        // }}
        value={value}
        onChange={handleChange}
        aria-label="scb tabs"
        // indicatorColor="primary"
      >
        <Tab label="Online" {...a11yProps(0)} />
        <Tab label="Custom" {...a11yProps(1)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <SCBOnline handleSessionExpire={handleSessionExpire} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SCBCustom handleSessionExpire={handleSessionExpire} />
      </TabPanel>
    </Box>
  );
}
