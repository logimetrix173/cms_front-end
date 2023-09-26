import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Grid, Button, Card } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";
import { SERVER_URL } from "../../../constants/constants";
import { AppState } from "../../../AppContext";
import MultiDropdownSingle from "../../UI/MultiDropdownSingle";
import HighTempTable from "./HighTempTable";

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
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const parameters1 = [
  { name: "Revenue", value: "revenue" },
  { name: "Energy", value: "energy" },
  { name: "Aux Data", value: "auxdata" },
  { name: "CUF", value: "cuf" },
  { name: "GHI", value: "ghi" },
  { name: "GTI", value: "gti" },
  { name: "PA", value: "pa" },
  { name: "GA", value: "ga" },
  { name: "Mod Temp", value: "modtemp" },
];

const parameters2 = [
  { name: "None", value: "none" },
  { name: "Revenue", value: "revenue" },
  { name: "Energy", value: "energy" },
  { name: "Aux Data", value: "auxdata" },
  { name: "CUF", value: "cuf" },
  { name: "GHI", value: "ghi" },
  { name: "GTI", value: "gti" },
  { name: "PA", value: "pa" },
  { name: "GA", value: "ga" },
  { name: "Mod Temp", value: "modtemp" },
];

export default function HighTemp() {
  const classes = useStyles();
  //   const [value, setValue] = React.useState(0);

  const jwtToken = localStorage.getItem("userToken");

  const { setEnabledLinearProgress, setSnackbar } = AppState();

  const [rows, setRows] = useState([]);

  const siteNamesAndBlocks = JSON.parse(
    localStorage.getItem("siteNamesAndBlocks")
  );

  // if not from server
  const getSites = (sites = siteNamesAndBlocks) => {
   //this is for onlyd demo purpose 
   return sites.filter((site) => site.name === "Hukkeri").map((site) => site.name);
  };  
    //  return sites.map((site) => site.name);
  

  //   const fetchSitesOptions = async () => {
  //     try {
  //       const response = await axios.post(
  //         SERVER_URL + "/lossanalysis/losssitesDropdown",
  //         { email: localStorage.getItem("userEmail") }
  //       );
  //       const data = response.data;
  //       setSiteOptions(data);
  //     } catch (error) {
  //       setSiteOptions(["Balanagar"]);
  //     }
  //   };

  const [siteOptions, setSiteOptions] = useState(getSites());

  const [selectedSites, setSelectedSites] = useState(["Hukkeri"]);

  const handleSiteChange = (event) => {
    let value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelectedSites(
        selectedSites.length === siteOptions.length ? [] : siteOptions
      );
      return;
    }
    setSelectedSites(value);
  };

  const getInitialFromDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    date.setHours(10, 0, 0, 0);
    return date;
  };

  const getInitialToDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    date.setHours(15, 0, 0, 0);
    return date;
  };

  const [fromDate, setFromDate] = useState(getInitialFromDate());
  const [toDate, setToDate] = useState(getInitialToDate());

  const [chartFromDate, setChartFromDate] = useState(getInitialFromDate());
  const [chartToDate, setChartToDate] = useState(getInitialToDate());

  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };

  const [disabledTableViewBtn, setDisabledTableViewBtn] = useState(false);
  const [disabledCSVBtn, setDisabledCSVBtn] = useState(false);

  const fetchRows = async () => {
    setDisabledTableViewBtn(true);
    setEnabledLinearProgress(true);
    // console.log(fromDate, toDate);
    try {
      const response = await axios.post(
        SERVER_URL + "/dashboard/temppercentagediff",
        {
          sites: selectedSites,
          startTime: fromDate.getTime(),
          endTime: toDate.getTime(),
        },

        {
          headers: {
            jwtToken: jwtToken,
          },
        }
      );
      // console.log(response.data, "oooo");
      const data = response.data.sort((a, b) =>
        a.time > b.time ? -1 : a.time < b.time ? 1 : 0
      );
      // console.log("pp", data);
      setRows(data);
      setEnabledLinearProgress(false);
      setDisabledTableViewBtn(false);
    } catch (error) {
      setRows([]);
      setEnabledLinearProgress(false);
      setDisabledTableViewBtn(false);
    }
  };

  const fetchCSV = async () => {
    setDisabledCSVBtn(true);
    setEnabledLinearProgress(true);
    try {
      const response = await axios.post(
        SERVER_URL + "/dashboard/temppercentagediff/csv",
        {
          sites: selectedSites,
          startTime: fromDate.getTime(),
          endTime: toDate.getTime(),
        },

        {
          headers: {
            jwtToken: jwtToken,
            responseType: "blob",
          },
        }
      );
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      let filename = `${fromDate.getDate()}_${
        fromDate.getMonth() + 1
      } to ${toDate.getDate()}_${toDate.getMonth() + 1}.csv`;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setEnabledLinearProgress(false);
      setDisabledCSVBtn(false);
    } catch (error) {
      setSnackbar((prevState) => ({
        ...prevState,
        open: true,
        severity: "error",
        message: "No data found.",
      }));
      setEnabledLinearProgress(false);
      setDisabledCSVBtn(false);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container alignItems="flex-end">
        <Grid item>
          <MultiDropdownSingle
            label="Sites"
            items={siteOptions}
            selectedItems={selectedSites}
            handleChange={handleSiteChange}
          />
        </Grid>
        <Grid item style={{ marginLeft: "1rem" }}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                id="from-date-picker-inline"
                label="From"
                value={fromDate}
                onChange={handleFromDateChange}
                KeyboardButtonProps={{
                  "aria-label": "from date",
                }}
                size="small"
                InputProps={{
                  style: {
                    fontSize: ".8rem",
                  },
                }}
                style={{ width: 120 }}
              />
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                id="to-date-picker-inline"
                label="To"
                value={toDate}
                onChange={handleToDateChange}
                KeyboardButtonProps={{
                  "aria-label": "to date",
                }}
                size="small"
                InputProps={{
                  style: {
                    fontSize: ".8rem",
                  },
                }}
                style={{ width: 120, marginLeft: "1rem" }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item style={{ marginLeft: "1rem" }}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={fetchRows}
            disabled={disabledTableViewBtn}
          >
            {disabledTableViewBtn ? "Loading" : "View"}
          </Button>
        </Grid>
        <Grid item style={{ marginLeft: ".75rem" }}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={fetchCSV}
            disabled={disabledCSVBtn}
          >
            {disabledCSVBtn ? "Downloading" : "CSV"}
          </Button>
        </Grid>
      </Grid>
      <HighTempTable rows={rows} setRows={setRows} />
    </div>
  );
}
