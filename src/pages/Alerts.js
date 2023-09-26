import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TextField, NoSsr } from "@material-ui/core";

import axios from "axios";
import CustomTable from "../components/Alerts/CustomTable";
import Input from "@material-ui/core/Input";
import { AppState } from "../AppContext";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { SERVER_URL } from "../constants/constants";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
// import MultiDropdownSingle from "../components/UI/MultiDropdownSingle";
import AlertsDropdown from "../components/UI/AlertsDropdown";
// import { red } from "@material-ui/core/colors";

const StyledKeyboardDatePicker = styled(KeyboardDatePicker)`
  label {
    margin-top: -0.4rem;
    background-color: transparent;
    color: #21618c;

    padding: 4px;

    // font-size: 15px;
  }
  .MuiSvgIcon-root {
    padding-left: 1px;
    padding-right: 1px;
    margin-left: -15px;
    margin-right: -15px;
  }
`;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 80,
    maxWidth: 140,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  inputlabel: {
    marginTop: "-0.4rem",
    backgroundColor: "transparent",
    color: "#21618C",
    padding: "4px",
  },
  date: {
    // marginTop: "-0.4rem",
    // backgroundColor: "white",
    // fontSize: "15px",
    // padding: "4px",
    maxWidth: 130,
  },
}));

const alertsValue = ["Open", "Pending", "Resolved"];
const issueValue = ["Network", "Service", "INV SCB"];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};

function getStyles(name, alertsValue, theme) {
  return {
    fontWeight:
      alertsValue.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function metStyles(name, issueValue, theme) {
  return {
    fontWeight:
      issueValue.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Alerts({
  handleTicketModal,
  handleNotificationClick,
  handleSessionExpire,
}) {
  const { enabledLinearProgress, setEnabledLinearProgress, setSnackbar } =
    AppState();
  let source = axios.CancelToken.source();

  const classes = useStyles();
  const theme = useTheme();

  const [alertsData, setAlertsData] = useState([]);

  const siteNamesAndBlocks = JSON.parse(
    localStorage.getItem("siteNamesAndBlocks")
  );

  const getSites = (sites = siteNamesAndBlocks) => {
    return sites.map((site) => site.name);
  };

  // const getSites = (sites = siteNamesAndBlocks) => {
  //   return sites.map((site) => {
  //     localStorage.setItem("selected2");
  //     return site.name;
  //   });
  // };

  // const [selectedSite, setSelectedSite] = useState(["All"]);
  // const [selectedSite, setSelectedSite] = useState(getSites());
  const [selectedSite, setSelectedSite] = useState(
    !localStorage.getItem("siteslocally")
      ? getSites()
      : localStorage.getItem("siteslocally").split(",")
  );
  // const [selected2, setSelected2] = useState(null);
  const [siteOptions, setSiteOptions] = useState(getSites());

  const isAllSelected =
    JSON.parse(localStorage.getItem("siteNamesCaps")).length > 0 &&
    selectedSite.length ===
      JSON.parse(localStorage.getItem("siteNamesCaps")).length;

  // const AllSelected =
  //   alertsValue.length > 0 && status.length === alertsValue.length;

  const [site, setSite] = useState();
  // const [issue, setIssue] = useState();
  const [category, setCategory] = useState();
  // const [status, setStatus] = useState((prevState) =>
  //   localStorage.getItem("alertsStatus")
  //     ? localStorage.getItem("alertsStatus")
  //     : "Open"
  // );

  const [status, setStatus] = React.useState(["Open", "Pending"]);
  // const [issue, setIssue] = React.useState(["Network", "Service", "INV SCB"]);
  const [issue, setIssue] = React.useState(
    !localStorage.getItem("issueStatus")
      ? ["Network", "Service", "INV SCB"]
      : localStorage.getItem("issueStatus").split(",")
  );

  // const [flag, setFlag] = React.useState(false);

  useEffect(() => {
    setSite("%");
    // setIssue("%");
    setCategory("%");
    // setStatus("%")
  }, []);

  const [disabledViewBtn, setDisabledViewBtn] = useState(false);
  const [disabledCSVBtn, setDisabledCSVBtn] = useState(false);

  const getFromDate = (date) => {
    let newDate = new Date(date.getTime());
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };

  const getToDate = (date) => {
    let newDate = new Date(date.getTime());
    newDate.setHours(23, 59, 59, 999);
    return newDate;
  };

  const [fromDate, setFromDate] = useState(() => {
    // Tuesday, June 1, 2021 12:01:00 AM
    let date = new Date(1622505660000);
    return getFromDate(date);
  });

  const [toDate, setToDate] = useState(() => {
    let date = new Date();
    return getToDate(date);
  });

  const handleStatus = (event, key) => {
    localStorage.setItem("alertsStatus", event.target.value);
    // setStatus(localStorage.getItem("alertsStatus"));
    // let value = event.target.value;
    // setStatus((prevState) => ({ ...prevState, [key]: value }));
    // setStatus(value);

    let value = event.target.value;
    if (value[value.length - 1] === "all") {
      setStatus(status.length === alertsValue.length ? [] : alertsValue);
      return;
    }
    setStatus(value);
    // console.log(value, "156");
    // if (value === ["Open,Pending"]) {
    //   // setFlag(true);
    //   setStatus(["false"]);
    // }
  };
  const handleIssue = (event, key) => {
    localStorage.setItem("issueStatus", event.target.value);
    // setStatus(localStorage.getItem("alertsStatus"));
    // let value = event.target.value;
    // setStatus((prevState) => ({ ...prevState, [key]: value }));
    // setStatus(value);

    let value = event.target.value;
    localStorage.setItem(
      "issueStatus",
      value[value.length - 1] === "all"
        ? ["Network", "Service", "INV SCB"]
        : value
    );
    if (value[value.length - 1] === "all") {
      setIssue(issue.length === issueValue.length ? [] : issueValue);
      return;
    }
    setIssue(value);
    // console.log(value, "156");
    // if (value === ["Open,Pending"]) {
    //   // setFlag(true);
    //   setStatus(["false"]);
    // }
  };

  const handleSiteChange = (event) => {
    // const value = event.target.value;

    // if (value[value.length - 1] === "All") {
    //   setSelectedSite(
    //     selectedSite.length ===
    //       JSON.parse(localStorage.getItem("siteNamesCaps")).length
    //       ? []
    //       : JSON.parse(localStorage.getItem("siteNamesCaps"))
    //   );
    //   return;
    // }

    // setSelectedSite(value);

    // fetchPerformance(fromDate.getTime(), toDate.getTime(), event.target.value);

    let value = event.target.value;
    localStorage.setItem(
      "siteslocally",
      value[value.length - 1] === "all" ? siteOptions : value
    );

    if (value[value.length - 1] === "all") {
      setSelectedSite(
        selectedSite.length === siteOptions.length ? [] : siteOptions
      );
      return;
    }
    setSelectedSite(value);
    // setSelected2(value);
  };

  const fetchAlertsData = () => {
    // console.log("Fetch alerts data using useEffect...");
    // console.log(
    //   // selectedSite,
    //   issue,
    //   category,
    //   localStorage.getItem("siteslocally")
    // );

    let jwtToken = localStorage.getItem("userToken");
    // let t = localStorage.getItem("selected2");
    setEnabledLinearProgress(true);
    // console.log(status);

    setAlertsData([]);

    axios
      .post(
        SERVER_URL + "/notification/alerts",
        {
          // site: !selectedSite ? "%" : selectedSite,
          // if(t === "null"){
          //   sele
          // }
          // selectedSite: selectedSite,
          selectedSite: !localStorage.getItem("siteslocally")
            ? selectedSite
            : localStorage.getItem("siteslocally").split(","),

          // issue: !issue ? "%" : issue,
          issue: !localStorage.getItem("issueStatus")
            ? issue
            : localStorage.getItem("issueStatus").split(","),
          // category: !category ? "%" : category,
          category,
          // status: ["Open", "Pending"]
          //   ? false
          //   : status === !status
          //   ? "Open"
          //   : status,
          // status: !status ? "Open" : status,
          // status: ["Open", "Pending"]
          //   ? false
          //   : (status === status.length) == 3
          //   ? "%"
          //   : status === !status
          //   ? "open"
          //   : status,

          // status: !status ? "Open" : status,
          status,
          fromDate: fromDate.getTime(),
          toDate: toDate.getTime(),
          email: localStorage.getItem("userEmail"),
        },
        {
          cancelToken: source.token,
          headers: { jwtToken: jwtToken },
        }
      )
      .then((response) => {
        setEnabledLinearProgress(false);
        // console.log("alerts table data auto", response.data);
        if (String(response.data[0].ticket).includes("No")) {
          // console.log(response.data[0].ticket);
          setAlertsData([
            {
              ticket: "No data found!",
              status: "-",
              site: "-",
              alarm: "-",
              state: "-",
              remarks: "No data found!",
            },
          ]);
        } else {
          setAlertsData([...response.data]);
        }
      })
      .catch((error) => {
        setEnabledLinearProgress(false);
        if (error?.response?.status === 401) {
          handleSessionExpire();
        }
      });
  };

  const fetchAlertsDataWithDisableBtn = () => {
    // console.log("Fetch alerts data using view btn...");
    // console.log(
    // selectedSite,
    // issue,
    // category,
    // localStorage.getItem("siteslocally")
    // );
    // localStorage.setItem("selected2", selectedSite);
    setEnabledLinearProgress(true);
    setDisabledViewBtn(true);

    let jwtToken = localStorage.getItem("userToken");

    // console.log(typeof status, status);

    setAlertsData([]);

    axios
      .post(
        SERVER_URL + "/notification/alerts",
        {
          // selectedSite: selectedSite,
          selectedSite: !localStorage.getItem("siteslocally")
            ? selectedSite
            : localStorage.getItem("siteslocally").split(","),

          issue: !localStorage.getItem("issueStatus")
            ? issue
            : localStorage.getItem("issueStatus").split(","),
          category: category,
          // status: status,
          // status: ["Open", "Pending"]
          //   ? false
          //   : (status === status.length) <= 3
          //   ? "%"
          //   : status === !status
          //   ? "open"
          //   : status,

          // status: !status ? "Open" : status,
          status: status,

          fromDate: fromDate.getTime(),
          toDate: toDate.getTime(),
          email: localStorage.getItem("userEmail"),
        },
        {
          cancelToken: source.token,
          headers: { jwtToken: jwtToken },
        }
      )
      .then((response) => {
        // console.log('alerts table data', response.data);
        setEnabledLinearProgress(false);
        if (String(response.data[0].ticket).includes("No")) {
          // console.log(response.data[0].ticket);
          setAlertsData([
            {
              ticket: "No data found!",
              status: "-",
              site: "-",
              alarm: "-",
              state: "-",
              remarks: "No data found!",
            },
          ]);
        } else {
          setAlertsData([...response.data]);
        }
        setDisabledViewBtn(false);
      })
      .catch((error) => {
        setEnabledLinearProgress(false);
        setDisabledViewBtn(false);
        if (error?.response?.status === 401) {
          handleSessionExpire();
        }
      });
  };
  // const stateUpdate = () => {
  //   setStatus(["Open", "Pending"]);
  // };

  const fetchCSV = async () => {
    // console.log("hitt csv-->");
    let jwtToken = localStorage.getItem("userToken");
    setDisabledCSVBtn(true);
    setEnabledLinearProgress(true);
    try {
      const response = await axios.post(
        SERVER_URL + "/notification/alerts/csv",
        {
          selectedSite: !localStorage.getItem("siteslocally")
            ? selectedSite
            : localStorage.getItem("siteslocally").split(","),

          issue: !localStorage.getItem("issueStatus")
            ? issue
            : localStorage.getItem("issueStatus").split(","),
          category: category,
          status: status,

          fromDate: fromDate.getTime(),
          toDate: toDate.getTime(),
          email: localStorage.getItem("userEmail"),
          // sites: selectedSites,
          // startTime: fromDate.getTime(),
          // endTime: toDate.getTime(),
          // frequency: frequency,
        },
        {
          cancelToken: source.token,
          headers: { jwtToken: jwtToken },
        }
      );
      console.log(response.data);
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
      // console.log(error);
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

  const issueUpdate = () => {
    setIssue(["All"]);
  };
  useEffect(() => {
    fetchAlertsData();
    // fetchAlertsDataWithDisableBtn();

    let alertsInterval = setInterval(fetchAlertsData, 100000);
    // let alertsInterval = setInterval(fetchAlertsDataWithDisableBtn, 60000);

    // let updateAlertState = setInterval(stateUpdate, 60000);

    return () => {
      clearInterval(alertsInterval);
      source.cancel();
    };
  }, []);

  const handleFromDateChange = (date) => {
    setFromDate(getFromDate(date));
  };

  const handleToDateChange = (date) => {
    setToDate(getToDate(date));
  };

  const ticketForModal = (row) => {
    handleTicketModal(row);
  };

  const handleView = () => {
    fetchAlertsDataWithDisableBtn();
  };

  return (
    <div style={{ marginTop: ".25rem" }}>
      <Grid
        container
        // alignItems="center"
        // style={{ marginBottom: ".25rem" }}
        // spacing={4}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        {/* <Grid item>
          <Grid container alignItems="center">
            <Typography
              style={{ fontSize: "1rem", marginRight: ".5rem" }}
              color="textSecondary"
            >
              Site
            </Typography>
            {site && (
              <FormControl>
                <Select
                  id="site-simple-select"
                  value={site}
                  label="Site"
                  onChange={(event) => setSite(event.target.value)}
                >
                  <MenuItem value={"%"}>All&ensp;</MenuItem>
                  <MenuItem value={"Byagwat"}>Byagwat&ensp;</MenuItem>
                </Select>
              </FormControl>
            )}
          </Grid>
        </Grid> */}
        <Grid item>
          {/* <Grid container alignItems="center"> */}
          {/* <Typography style={{ fontSize: "0.9rem" }} color="textSecondary">
              Site
            </Typography> */}

          {/* <Grid item style={{ marginLeft: "0.4rem" }}> */}
          <AlertsDropdown
            label="Sites"
            items={siteOptions}
            selectedItems={selectedSite}
            handleChange={handleSiteChange}
          />
          {/* </Grid> */}
          {/* </Grid> */}
        </Grid>
        <Grid item>
          {/* <Grid container alignItems="center"> */}
          {/* <Typography
              style={{ fontSize: "0.9rem", marginRight: ".5rem" }}
              color="textSecondary"
            >
              Issue
            </Typography> */}
          {/* {issue && (
              <FormControl>
                <Select
                  id="site-simple-select"
                  value={issue}
                  label="Issue"
                  onChange={(event) => setIssue(event.target.value)}
                >
                  <MenuItem value={"%"}>All&ensp;</MenuItem>
                  <MenuItem value={"Network"}>Network&ensp;</MenuItem>
                  <AlertsDropdown
                    // label="Sites"
                    items={issueValue}
                    selectedItems={issue}
                    handleChange={handleIssue}
                  />
                </Select>
              </FormControl>
            )} */}
          <AlertsDropdown
            label="Issue"
            items={issueValue}
            selectedItems={issue}
            handleChange={handleIssue}
          />
          {/* </Grid> */}
        </Grid>
        <Grid item style={{ marginTop: "" }}>
          {/* <Grid container alignItems="center"> */}
          {/* <Typography
              style={{ fontSize: "0.9rem", marginRight: ".5rem" }}
              color="textSecondary"
            >
              Category
            </Typography> */}
          {category && (
            <FormControl
              className={classes.formControl}
              variant="outlined"
              size="small"
            >
              <InputLabel
                id={`Category-select-label`}
                className={classes.inputlabel}
              >
                Category
              </InputLabel>
              <Select
                id="site-simple-select"
                value={category}
                style={{ fontSize: 14, height: "4vh" }}
                // label="Category"
                onChange={(event) => setCategory(event.target.value)}
              >
                <MenuItem value={"%"}>All&ensp;</MenuItem>
                <MenuItem value={"critical"}>Critical&ensp;</MenuItem>
              </Select>
            </FormControl>
          )}
          {/* </Grid> */}
        </Grid>
        {/* <Grid item>
          <Grid container alignItems="center">
            <Typography
              style={{ fontSize: "1rem", marginRight: ".5rem" }}
              color="textSecondary"
            >
              Status
            </Typography>
            {status && (
              <FormControl>
                <Select
                  id="site-simple-select"
                  value={status}
                  label="Status"
                  onChange={(event) => {
                    localStorage.setItem("alertsStatus", event.target.value);
                    setStatus(localStorage.getItem("alertsStatus"));
                  }}
                >
                  <MenuItem value={"%"}>All&ensp;</MenuItem>
                  <MenuItem value={"Open"}>Open&ensp;</MenuItem>
                  <MenuItem value={"Pending"}>Pending&ensp;</MenuItem>
                  <MenuItem value={"Resolved"}>Resolved&ensp;</MenuItem>
                </Select>
              </FormControl>
            )}
          </Grid>
        </Grid> */}

        {/* <Grid item>
          <Grid container alignItems="center">
            <Typography
              style={{ fontSize: "1rem", marginRight: ".5rem" }}
              color="textSecondary"
            >
              Status
            </Typography>
            {status && (
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-mutiple-name-label"
                  id="demo-mutiple-name"
                  multiple
                  value={status}
                  style={{ maxWidth: "10rem" }}
                  // onChange={(event) => handleStatus(event, "status")}
                  onChange={handleStatus}
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                  <MenuItem value={"%"}>All&ensp;</MenuItem>
                  <MenuItem value={"Open"}>Open&ensp;</MenuItem>
                  <MenuItem value={"Pending"}>Pending&ensp;</MenuItem>
                  <MenuItem value={"Resolved"}>Resolved&ensp;</MenuItem>
                  {/* {alertsValue.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, alertsValue, theme)}
                  >
                    {name}
                  </MenuItem>
                ))} 
                </Select>
              </FormControl>
            )}
          </Grid>
        </Grid> */}
        <Grid item>
          {/* <Grid container alignItems="center"> */}
          {/* <Typography
              style={{ fontSize: "0.9rem", marginRight: ".5rem" }}
              color="textSecondary"
            >
              Status
            </Typography> */}
          {/* <Grid item> */}
          <AlertsDropdown
            label="Alert"
            items={alertsValue}
            selectedItems={status}
            handleChange={handleStatus}
          />
          {/* </Grid> */}
          {/* </Grid> */}
        </Grid>
        <Grid item>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid
              container
              spacing={2}
              style={{ marginTop: "0rem", marginLeft: "0rem" }}
            >
              <Grid item>
                <NoSsr>
                  <StyledKeyboardDatePicker
                    className={classes.date}
                    size="small"
                    views={["year", "month", "date"]}
                    inputVariant="outlined"
                    autoOk={true}
                    // disableToolbar
                    // variant="inline"
                    format="MM/dd/yyyy"
                    id="from-date-picker-inline"
                    label="From"
                    inputProps={{
                      style: { fontSize: 14, height: "0.4rem" },
                    }}
                    value={fromDate}
                    onChange={handleFromDateChange}
                    KeyboardButtonProps={{
                      "aria-labelte": "from date",
                    }}
                    style={{ width: "140px" }}
                  />
                </NoSsr>
              </Grid>
              <Grid item>
                <NoSsr>
                  <StyledKeyboardDatePicker
                    className={classes.date}
                    size="small"
                    autoOk={true}
                    views={["year", "month", "date"]}
                    // disableToolbar
                    // variant="inline"
                    // variant="outlined"
                    inputVariant="outlined"
                    format="MM/dd/yyyy"
                    id="to-date-picker-inline"
                    label="To"
                    value={toDate}
                    inputProps={{ style: { fontSize: 14, height: "0.4rem" } }}
                    onChange={handleToDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "to date",
                    }}
                    style={{ width: "150px" }}
                  />
                </NoSsr>
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
        {/* <Grid item>
          <form className={classes.container} noValidate>
            <TextField
              className={classes.date}
              size="small"
              inputVariant="outlined"
              id="date"
              defaultValue={fromDate}
              label="From"
              type="date"
              // defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
        </Grid> */}
        <Grid item style={{ marginLeft: "1rem", marginTop: "0.2rem" }}>
          <Button
            variant="outlined"
            size="small"
            style={{
              // paddingInline: "1.5rem",
              // marginTop: "-0.6rem",
              fontSize: "14px",
              height: "2rem",
            }}
            color="primary"
            onClick={handleView}
            disabled={disabledViewBtn}
          >
            {disabledViewBtn ? "Loading" : "View"}
          </Button>
        </Grid>
        <Grid item style={{ marginLeft: "1rem", marginTop: "0.2rem" }}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            style={{
              // paddingInline: "1.5rem",
              // marginTop: "-0.6rem",
              fontSize: "14px",
              height: "2rem",
            }}
            onClick={fetchCSV}
            disabled={disabledCSVBtn}
          >
            {disabledCSVBtn ? "Downloading" : "CSV"}
          </Button>
        </Grid>
      </Grid>
      <CustomTable
        data={alertsData}
        ticketForModal={ticketForModal}
        handleNotificationClick={handleNotificationClick}
      />
    </div>
  );
}

export default Alerts;
