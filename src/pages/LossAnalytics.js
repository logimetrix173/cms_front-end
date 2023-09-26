import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MultiDropdownSingle from "../components/UI/MultiDropdownSingle";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Grid, Button, Card } from "@material-ui/core";
import LossTable from "../components/LossAnalytics/LossTable";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";
import { SERVER_URL } from "../constants/constants";
import { AppState } from "../AppContext";
import LossChart from "../components/LossAnalytics/LossChart";

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

export default function SimpleTabs() {
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
  

  const fetchSitesOptions = async () => {
    try {
      const response = await axios.post(
        SERVER_URL + "/lossanalysis/losssitesDropdown",
        { email: localStorage.getItem("userEmail") }
      );
      const data = response.data;
      // console.log(response);
      setSiteOptions(data);
    } catch (error) {
      setSiteOptions(["Hukkeri"]);
    }
  };

  const [siteOptions, setSiteOptions] = useState(["Hukkeri"]);
  const [selectedSites, setSelectedSites] = useState(["Hukkeri"]);
  const [selectedSitesForChart, setSelectedSitesForChart] = useState([
    "Hukkeri",
  ]);

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

  const handleSiteChangeForChart = (event) => {
    let value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelectedSitesForChart(
        selectedSitesForChart.length === siteOptions.length ? [] : siteOptions
      );
      return;
    }
    setSelectedSitesForChart(value);
  };

  const getInitialFromDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    date.setHours(0, 1, 0, 0);
    return date;
  };

  const getInitialToDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    date.setHours(23, 59, 59, 0);
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

  const handleChartFromDateChange = (date) => {
    setChartFromDate(date);
  };

  const handleChartToDateChange = (date) => {
    setChartToDate(date);
  };

  const [frequency, setFrequency] = useState("daily");

  const handleFrequencyChange = (event) => {
    let value = event.target.value;
    setFrequency(value);
  };

  //   const handleChange = (event, newValue) => {
  //     setValue(newValue);
  //   };

  const [disabledTableViewBtn, setDisabledTableViewBtn] = useState(false);
  const [disabledCSVBtn, setDisabledCSVBtn] = useState(false);
  const [disabledChartViewBtn, setDisabledChartViewBtn] = useState(false);

  const [charts, setCharts] = useState([]);
  const [chartYAlign, setChartYAlign] = useState({});

  const fetchRows = async () => {
    setDisabledTableViewBtn(true);
    setEnabledLinearProgress(true);
    // console.log(fromDate, toDate);
    try {
      const response = await axios.post(
        SERVER_URL + "/lossanalysis",
        {
          sites: selectedSites,
          startTime: fromDate.getTime(),
          endTime: toDate.getTime(),
          frequency: frequency,
        },
        {
          jwtToken: jwtToken,
        }
      );
      const data = response.data;
      // console.log(response);
      setRows(data);
      setEnabledLinearProgress(false);
      setDisabledTableViewBtn(false);
    } catch (error) {
      setRows([]);
      setEnabledLinearProgress(false);
      setDisabledTableViewBtn(false);
    }
  };

  const [parameter1, setParameter1] = useState("pa");
  const [parameter2, setParameter2] = useState("none");

  const handleParameter1Change = (event) => {
    const value = event.target.value;
    if (value === parameter2) {
      return;
    }
    setParameter1(value);
  };

  const handleParameter2Change = (event) => {
    const value = event.target.value;
    if (value === parameter1) {
      return;
    }
    setParameter2(value);
  };

  const fetchCSV = async () => {
    setDisabledCSVBtn(true);
    setEnabledLinearProgress(true);
    try {
      const response = await axios.post(
        SERVER_URL + "/lossanalysis/csv",
        {
          sites: selectedSites,
          startTime: fromDate.getTime(),
          endTime: toDate.getTime(),
          frequency: frequency,
        },
        {
          jwtToken: jwtToken,
          responseType: "blob",
        }
      );
      // console.log("csvxxx", response);
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

  const fetchChartData = async () => {
    // const fetchedData = {
    //   charts: [
    //     {
    //       site: "Balanagar",
    //       data: [
    //         {
    //           timestamp: new Date().toLocaleTimeString(),
    //           a: 100,
    //           b: 200,
    //           c: 150,
    //         },
    //       ],
    //     },
    //     {
    //       site: "Bazpur",
    //       data: [
    //         {
    //           timestamp: new Date().toLocaleTimeString(),
    //           a: 120,
    //           b: 180,
    //           c: 130,
    //         },
    //       ],
    //     },
    //   ],
    //   align: {
    //     leftY: 2,
    //     rightY: 1,
    //   },
    // };

    setDisabledChartViewBtn(true);
    setEnabledLinearProgress(true);

    try {
      // console.log(
      //   selectedSitesForChart,
      //   chartFromDate.getTime(),
      //   chartToDate.getTime(),
      //   parameter1,
      //   parameter2
      // );
      const response = await axios.post(
        SERVER_URL + "/lossanalysis/linegraph",
        {
          sites: selectedSitesForChart,
          startTime: chartFromDate.getTime(),
          endTime: chartToDate.getTime(),
          parameter1: parameter1,
          parameter2: parameter2,
        },
        {
          jwtToken: jwtToken,
        }
      );
      const data = response.data;
      console.log(data);
      const newCharts = data.charts;
      setCharts(newCharts);
      const align = data.align;
      // console.log(align);
      setChartYAlign(align);
      setEnabledLinearProgress(false);
      setDisabledChartViewBtn(false);
    } catch (error) {
      setCharts([]);
      setEnabledLinearProgress(false);
      setDisabledChartViewBtn(false);
    }
  };

  useEffect(() => {
    fetchSitesOptions();
    // Todo: run after sites have been fetched
    // fetchRows();
    // fetchChartData();
  }, []);

  return (
    <div className={classes.root}>
      {/* <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
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
          <FormControl>
            <InputLabel id="frequency-simple-select-label">
              Frequency
            </InputLabel>
            <Select
              labelId="frequency-simple-select-label"
              id="frequency-simple-select"
              value={frequency}
              onChange={handleFrequencyChange}
              style={{ fontSize: ".8rem" }}
            >
              <MenuItem value={"daily"}>Daily</MenuItem>
              <MenuItem value={"mtd"}>MTD</MenuItem>
              <MenuItem value={"ytd"}>YTD</MenuItem>
            </Select>
          </FormControl>
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
      <LossTable rows={rows} setRows={setRows} />
      <Grid container alignItems="flex-end" style={{ marginTop: "2rem" }}>
        <Grid item>
          <MultiDropdownSingle
            label="Sites"
            items={siteOptions}
            selectedItems={selectedSitesForChart}
            handleChange={handleSiteChangeForChart}
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
                value={chartFromDate}
                onChange={handleChartFromDateChange}
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
                value={chartToDate}
                onChange={handleChartToDateChange}
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
          <FormControl>
            <InputLabel id="parameter1-select-label">Y1</InputLabel>
            <Select
              labelId="parameter1-select-label"
              id="parameter-select"
              value={parameter1}
              onChange={handleParameter1Change}
              style={{ fontSize: ".8rem" }}
            >
              {parameters1.map((element) => (
                <MenuItem value={element.value}>{element.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item style={{ marginLeft: "1rem" }}>
          <FormControl>
            <InputLabel id="parameter2-select-label">Y2</InputLabel>
            <Select
              labelId="parameter2-select-label"
              id="parameter2-select"
              value={parameter2}
              onChange={handleParameter2Change}
              style={{ fontSize: ".8rem" }}
            >
              {parameters2.map((element) => (
                <MenuItem value={element.value}>{element.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item style={{ marginLeft: "1rem" }}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={fetchChartData}
            disabled={disabledChartViewBtn}
          >
            {disabledChartViewBtn ? "Loading" : "View"}
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        style={{
          marginBottom: "1rem",
        }}
      >
        {charts.map((chart, index) => (
          <Grid container key={index}>
            <Card
              style={{
                width: "100%",
                height: "420px",
                marginTop: "1rem",
                paddingTop: ".75rem",
                paddingInline: ".5rem",
              }}
            >
              <Typography
                style={{ marginLeft: "1rem", marginBottom: ".75rem" }}
              >
                {chart.site}
              </Typography>
              <LossChart data={chart.data} alignY={chartYAlign} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
