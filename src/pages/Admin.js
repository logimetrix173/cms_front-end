import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SiteRanking from "../components/Performance/SiteRanking";
import DataAvailability from "../components/Admin/DataAvailability";
import NewUser from "../components/Admin/CreateUser/NewUser";
import ManageUsers from "../components/Admin/Users/ManageUsers";
import ManageUser from "../components/Admin/Users/ManageUser";
import ManageInverters from "../components/Admin/ManageInverters/ManageInverters";
import ManageSites from "../components/Admin/ManageSites/ManageSites";
import Logs from "../components/Admin/Logs/Logs";
import SLD from "../components/Admin/SLD/SLD";
import RemoteConfig from "../components/Admin/RemoteConfig/RemoteConfig";
import Replication from "../components/Admin/Replication/Replication";
import ManageInvScb from "../components/Admin/ManageInvScb/ManageInvScb";

import { makeStyles } from "@material-ui/core";
import Message from "../components/Admin/MessageFeat/Message";
import Alertadmin from "../components/Admin/Alertadmin/Alertadmin";

const useStyles = makeStyles({
  tabs: {
    "& .MuiTabs-indicator": {
      // backgroundColor: "orange",
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
        // <Box sx={{ p: 1 }}>
        <Box sx={{ paddingTop: 1 }}>
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

export default function Analytics({
  updateInverter,
  updateInverterScb,
  refreshInverterTable,
  updateSite,
  refreshSiteEditTable,
  handleSessionExpire,
}) {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs
        value={value}
        className={classes.tabs}
        variant="scrollable"
        scrollButtons="auto"
        style={{ color: "#000000", width: "76rem", marginLeft: "-1rem" }}
        TabIndicatorProps={{
          style: { background: "#148F77" },
        }}
        // textColor="#148F77"
        onChange={handleChange}
        aria-label="analytics tabs"
        // indicatorColor="#148F77"
      >
        <Tab label="Sites" {...a11yProps(0)} />
        <Tab label="Inverters" {...a11yProps(1)} />
        <Tab label="Inv-Scb" {...a11yProps(2)} />
        <Tab label="Users" {...a11yProps(3)} />
        <Tab label="Data Availability" {...a11yProps(4)} />

        <Tab label="Logs" {...a11yProps(5)} />
        <Tab label="Remote Config" {...a11yProps(6)} />
        <Tab label="SLD" {...a11yProps(7)} />
        <Tab label="Replication" {...a11yProps(8)} />
        {/* <Tab label="SMS" {...a11yProps(9)} />
        <Tab label="Alert" {...a11yProps(10)} /> */}
      </Tabs>

      <TabPanel value={value} index={0} style={{ paddingTop: "0.5rem" }}>
        <ManageSites
          updateSite={updateSite}
          refreshSiteEditTable={refreshSiteEditTable}
        />
      </TabPanel>
      <TabPanel value={value} index={1} style={{ paddingTop: "0.5rem" }}>
        <ManageInverters
          updateInverter={updateInverter}
          refreshInverterTable={refreshInverterTable}
        />
      </TabPanel>
      <TabPanel value={value} index={2} style={{ paddingTop: "0.5rem" }}>
        <ManageInvScb
          updateInverterScb={updateInverterScb}
          refreshInverterTable={refreshInverterTable}
        />
      </TabPanel>
      <TabPanel value={value} index={3} style={{ paddingTop: "0.5rem" }}>
        <ManageUser />
      </TabPanel>
      <TabPanel value={value} index={4} style={{ paddingTop: "0.5rem" }}>
        <DataAvailability handleSessionExpire={handleSessionExpire} />
      </TabPanel>

      <TabPanel value={value} index={5} style={{ paddingTop: "0.5rem" }}>
        <Logs />
      </TabPanel>
      <TabPanel value={value} index={6} style={{ paddingTop: "0.5rem" }}>
        <RemoteConfig />
      </TabPanel>
      <TabPanel value={value} index={7} style={{ paddingTop: "0.5rem" }}>
        <SLD />
      </TabPanel>
      <TabPanel value={value} index={8} style={{ paddingTop: "0.5rem" }}>
        <Replication />
      </TabPanel>
      {/* <TabPanel value={value} index={9} style={{ paddingTop: "0.5rem" }}>
        <Message />
      </TabPanel>
      <TabPanel value={value} index={10} style={{ paddingTop: "0.5rem" }}>
        <Alertadmin />
      </TabPanel> */}
    </Box>
  );
}
