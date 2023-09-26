import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SiteRanking from "../components/Performance/SiteRanking";
import InvertersWakeUp from "../components/Performance/Inverters/InvertersWakeUp";
import PeakPower from "../components/Performance/PeakPower/PeakPower";
import PRRanking from "../components/Performance/PRRanking/PRRanking";
import LossAnalytics from "./LossAnalytics";
import HighTemp from "../components/Performance/HighTemp/HighTemp";
import TableSensor from "../components/Performance/TableSensor/TableSensor";
import InvPerformance from "../components/Performance/InvPerformance/InvPerformance";
import ScbPerformance from "../components/Performance/ScbPerformance/ScbPerformance";
import TrendLine from "../components/Performance/TrendLine/TrendLine";
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

export default function Analytics({ handleSessionExpire }) {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box style={{ width: 1200 }}>
      <Tabs
        style={{ color: "#000000", marginLeft: "-1rem" }}
        className={classes.tabs}
        value={value}
        onChange={handleChange}
        aria-label="analytics tabs"
        // indicatorColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Actual PR" {...a11yProps(0)} />
        <Tab label="Inverters - Wake Up" {...a11yProps(1)} />
        <Tab label="Peak Power" {...a11yProps(2)} />
        <Tab label="Calculated PR" {...a11yProps(3)} />
        <Tab label="Loss Analytics" {...a11yProps(4)} />
        <Tab label="CAB / AMB" {...a11yProps(5)} />

        <Tab label="Inv / Kw Gen" {...a11yProps(6)} />
        <Tab label="INV SCB" {...a11yProps(7)} />
        <Tab label="Trend Line" {...a11yProps(8)} />
        <Tab label="Table Sensor" {...a11yProps(9)} />
      </Tabs>

      <TabPanel value={value} index={0} style={{ paddingTop: "0.5rem" }}>
        <SiteRanking handleSessionExpire={handleSessionExpire} />
      </TabPanel>
      <TabPanel value={value} index={1} style={{ paddingTop: "0.5rem" }}>
        <InvertersWakeUp handleSessionExpire={handleSessionExpire} />
      </TabPanel>
      <TabPanel value={value} index={2} style={{ paddingTop: "0.5rem" }}>
        <PeakPower />
      </TabPanel>
      <TabPanel value={value} index={3} style={{ paddingTop: "0.5rem" }}>
        <PRRanking />
      </TabPanel>
      <TabPanel value={value} index={4} style={{ paddingTop: "0.5rem" }}>
        <LossAnalytics />
      </TabPanel>
      <TabPanel value={value} index={5} style={{ paddingTop: "0.5rem" }}>
        <HighTemp />
      </TabPanel>

      <TabPanel value={value} index={6} style={{ paddingTop: "0.5rem" }}>
        <InvPerformance />
      </TabPanel>
      <TabPanel value={value} index={7} style={{ paddingTop: "0.5rem" }}>
        <ScbPerformance />
      </TabPanel>
      <TabPanel value={value} index={8} style={{ paddingTop: "0.5rem" }}>
        <TrendLine />
      </TabPanel>
      <TabPanel value={value} index={9} style={{ paddingTop: "0.5rem" }}>
        <TableSensor />
      </TabPanel>
    </Box>
  );
}
