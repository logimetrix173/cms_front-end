import React, { useState, useEffect } from "react";
// import "./SCB.css";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  Card,
  Grid,
  Typography,
  Button,
  OutlinedInput,
  ListItemIcon,
  Checkbox,
  ListItemText,
  RadioGroup,
  Radio,
  FormLabel,
  FormControlLabel,
} from "@material-ui/core";

import axios from "axios";
import { ML_URL, SERVER_URL } from "../../../constants/constants";
import DateFnsUtils from "@date-io/date-fns";
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import IconButton from "@material-ui/core/IconButton";
import UpdateIcon from "@material-ui/icons/Update";
import EventIcon from "@material-ui/icons/Event";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { CircularProgress } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";

import { siteNamesCaps } from "../../../constants/SiteNamesY";
import PeakPowerChartCard from "./PeakPowerChartCard";
import { AppState } from "../../../AppContext";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  textField: {
    width: 120,
  },
  menuPaper: {
    maxHeight: 400,
  },
  formControlStyle: {},
  listItemText: {
    fontSize: ".9rem",
  },
}));

export default function PeakPower({ handleSessionExpire }) {
  const classes = useStyles();

  const { setEnabledLinearProgress } = AppState();

  const userToken = localStorage.getItem("userToken");

  const [selectedSite, setSelectedSite] = useState(["Hukkeri"]);

  const isAllSelected =
    JSON.parse(localStorage.getItem("siteNamesCaps")).length > 0 &&
    selectedSite.length ===
      JSON.parse(localStorage.getItem("siteNamesCaps")).length;

  const [parameter, setParameter] = useState("pr");

  const [sort, setSort] = useState("asc");

  const [filter, setFilter] = useState("none");

  const [enableBarChartScroll, setEnableBarChartScroll] = useState(true);

  const [barChartDataOG, setBarChartDataOG] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  const [timePeriod, setTimePeriod] = useState("14");

  const handleSiteChange = (event) => {
    const value = event.target.value;

    if (value[value.length - 1] === "All") {
      setSelectedSite(
        selectedSite.length ===
          JSON.parse(localStorage.getItem("siteNamesCaps")).length
          ? []
          : JSON.parse(localStorage.getItem("siteNamesCaps"))
      );
      return;
    }

    setSelectedSite(value);

    // fetchPerformance(fromDate.getTime(), toDate.getTime(), event.target.value);
  };

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  const applyColors = (data) => {
    let highestRankIndex = 0;
    let highestRank = null;
    data.forEach((element, index) => {
      if (index === 0) {
        highestRank = element.Rank;
      }
      if (element.Rank < highestRank) {
        highestRank = element.Rank;
        highestRankIndex = index;
      }
    });

    let lowestRankIndex = 0;
    let lowestRank = null;
    data.forEach((element, index) => {
      if (index === 0) {
        lowestRank = element.Rank;
      }
      if (element.Rank > lowestRank) {
        lowestRank = element.Rank;
        lowestRankIndex = index;
      }
    });

    let dataWithColors = data.map((element, index) => {
      if (index === highestRankIndex) {
        return { ...element, color: "#48C9B0" };
      } else if (index === lowestRankIndex) {
        return { ...element, color: "#E74C3C" };
      } else {
        return { ...element, color: "#5DADE2" };
      }
    });

    return dataWithColors;
  };

  const [isSingleDay, setIsSingleDay] = useState(true);

  const fetchPerformance = (fromDate, toDate) => {
    // console.log('site ranking', fromDate.toLocaleString(), toDate.toLocaleString(), today.toLocaleString());
    setEnabledLinearProgress(true);

    setDisabledViewBtn(true);

    let fromDateTime = fromDate.getTime();
    let toDateTime = toDate.getTime();

    let day = toDate.getDate() - fromDate.getDate();
    setIsSingleDay((prevState) => day === 1);

    // console.log(selectedSite);

    axios
      .post(
        SERVER_URL + "/peakap/",
        {
          startTime: fromDateTime,
          endTime: toDateTime,
          site: selectedSite,
        },
        {
          headers: { jwtToken: localStorage.getItem("userToken") },
        }
      )
      .then((response) => {
        // console.log("peak power", response.data);

        setBarChartDataOG(response.data);

        let dataWithColors = applyColors(response.data);

        setBarChartDataOG(dataWithColors);

        if (sort === "desc") {
          setBarChartData(
            dataWithColors.sort((a, b) => {
              return parseFloat(b.Rank) - parseFloat(a.Rank);
            })
          );
        } else {
          setBarChartData(
            dataWithColors.sort((a, b) => {
              return parseFloat(a.Rank) - parseFloat(b.Rank);
            })
          );
        }

        setDisabledViewBtn(false);
        setEnabledLinearProgress(false);
      })
      .catch(() => {
        setDisabledViewBtn(false);
        setEnabledLinearProgress(true);
      });
  };

  const handleParameterChange = (event) => {
    setParameter(event.target.value);
    // fetchPerformance(fromDate.getTime(), toDate.getTime(), selectedSite);
  };

  const sortElements = (value) => {
    switch (value) {
      case "desc":
        setBarChartData((prevState) =>
          prevState.sort((a, b) => parseFloat(b.Rank) - parseFloat(a.Rank))
        );
        break;
      case "asc":
        setBarChartData((prevState) =>
          prevState.sort((a, b) => parseFloat(a.Rank) - parseFloat(b.Rank))
        );
        break;
      default:
        setBarChartData((prevState) =>
          prevState.sort((a, b) => parseFloat(b.Rank) - parseFloat(a.Rank))
        );
    }
  };

  const handleSortChange = (event) => {
    let value = event.target.value;
    sortElements(value);
    setSort(value);
  };

  const handleFilterChange = (event) => {
    let value = event.target.value;

    switch (value) {
      case "low":
        // console.log('low')
        setBarChartData((prevState) => {
          return barChartDataOG.filter(
            (element) => Number(element.plantPr) < Number(element.prBudget)
          );
        });
        break;
      case "high":
        // console.log("high");
        setBarChartData((prevState) => {
          return barChartDataOG.filter(
            (element) => Number(element.plantPr) >= Number(element.prBudget)
          );
        });
        break;
      default:
        fetchPerformance(fromDate, toDate);
    }

    sortElements(value);

    setFilter(value);
  };

  /**
   * Functions related to time component
   */

  const [mainTime, setMainTime] = useState(new Date().getTime());

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openDateTimePicker, setOpenDateTimePicker] = useState(false);
  const [openTimeSliderSuccessAlert, setOpenTimeSliderSuccessAlert] =
    useState(false);

  const [isTimeReset, setIsTimeReset] = useState(true);

  const handleDateChange = (date) => {
    try {
      setIsTimeReset(false);
    } finally {
      setSelectedDate(date);
      setOpenDateTimePicker(false);
    }
  };

  const getMinDateForPicker = () => {
    let startTime = new Date();
    if (selectedSite === "gadarpur") {
      // Aug 19, 2021 6:00:00 PM
      startTime.setTime(1629396000000);
    }

    return startTime;
  };

  const handleTimeSliderToggleClose = () => {
    setOpenTimeSliderSuccessAlert(false);
  };

  const handleTimeReset = () => {
    let now = new Date();
    setSelectedDate(now);
    setMainTime(now.getTime());
    setOpenTimeSliderSuccessAlert(true);
    setIsTimeReset(true);
  };

  useEffect(() => {
    setMainTime(selectedDate.getTime());
  }, [selectedDate]);

  const getFromDate = (date) => {
    let newDate = new Date(date.getTime());
    newDate.setHours(0, 1, 0, 0);
    return newDate;
  };

  const getToDate = (date) => {
    let newDate = new Date(date.getTime());
    newDate.setHours(23, 59, 59, 999);
    return newDate;
  };

  const [fromDate, setFromDate] = useState(() => {
    let date = new Date();
    return getFromDate(date);
  });

  const [toDate, setToDate] = useState(() => {
    let date = new Date();
    return getToDate(date);
  });

  const handleFromDateChange = (date) => {
    setFromDate(getFromDate(date));
    // fetchPerformance(date.getTime(), toDate.getTime(), selectedSite);
  };

  const handleToDateChange = (date) => {
    setToDate(getToDate(date));
    // fetchPerformance(fromDate.getTime(), date.getTime(), selectedSite);
  };

  /**
   * END of functions related to time component
   */

  // Status and time states
  const [status, setStatus] = useState(0);
  const [timestamp, setTimestamp] = useState(undefined);

  const getFormattedDateAndTimeString = (timestamp) => {
    const date = new Date(timestamp);
    return (
      <span>
        {String(date.getDate()).padStart(2, "0")}/
        {String(date.getMonth() + 1).padStart(2, "0")}/{date.getFullYear()}
        <span>&emsp;</span>
        {date
          .toLocaleString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
          .toUpperCase()}
      </span>
    );
  };

  const getStatusAndTime = (startTime, endTime, selectedSite) => {
    // console.log("getStatusAndTime function called", selectedSite);
    axios
      .get(SERVER_URL + "/" + selectedSite + "/site", {
        headers: {
          jwtToken: userToken,
          startTime: startTime,
          endTime: endTime,
        },
      })
      .then((response) => {
        // console.log("status: ", response.data.status);
        // console.log("time: ", response.data.time);
        setStatus(response.data.status);
        setTimestamp(response.data.time * 1000);
      })
      .catch((error) => {
        // console.log(error);
        if (error.response.status === 401) {
          // handleSessionExpire();
        }
      });
  };

  useEffect(() => {
    // fetchPerformance(fromDate, toDate, selectedSite);
  }, []);

  const calculateDifference = (value1, value2) => {
    let value1Num = Number(value1);
    let value2Num = Number(value2);

    let difference = value2Num - value1Num;

    return Math.abs(
      Number(difference)
        .toFixed(2)
        .replace(/[.,]00$/, "")
    );
  };

  const handleViewBtnClick = () => {
    fetchPerformance(fromDate, toDate, selectedSite);
  };

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "Downloaded successfully!",
  });

  const handleSnackbarClose = () => {
    setSnackbar((prevState) => {
      return { ...prevState, open: false };
    });
  };

  const [disabledViewBtn, setDisabledViewBtn] = useState(false);
  const [disabledDownload, setDisabledDownload] = useState(false);

  const downloadReport = () => {
    setEnabledLinearProgress(true);

    setDisabledDownload(true);

    axios
      .post(
        SERVER_URL + "/peakap/report",
        {
          startTime: fromDate.getTime(),
          endTime: toDate.getTime(),
          site: selectedSite,
        },
        {
          headers: {
            jwtToken: localStorage.getItem("userToken"),
            responseType: "blob",
          },
        }
      )
      .then((response) => {
        const downloadUrl = window.URL.createObjectURL(
          new Blob([response.data])
        );
        const link = document.createElement("a");
        link.href = downloadUrl;

        let filename = `Analytics_${fromDate.getDate()}_${
          fromDate.getMonth() + 1
        }_${fromDate.getFullYear()}-${toDate.getDate()}_${
          toDate.getMonth() + 1
        }_${toDate.getFullYear()}.csv`;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        // setSnackbar(prevState => {return {...prevState, open: true, message: 'Downloaded successfully!'}})
        setDisabledDownload(false);
        setEnabledLinearProgress(false);
      })
      .catch((error) => {
        setSnackbar((prevState) => {
          return {
            ...prevState,
            open: true,
            severity: "error",
            message: "Download failed!",
          };
        });
        setDisabledDownload(false);
        setEnabledLinearProgress(false);
      });
  };

  return (
    <div style={{ marginTop: ".5rem", width: "90vw" }}>
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <Grid container alignItems="flex-end">
            <Grid item style={{ marginRight: "1rem" }}>
              <FormControl
                className={classes.formControlStyle}
                style={{
                  minWidth: "120px",
                  maxWidth: "200px",
                  marginRight: "1rem",
                }}
              >
                <InputLabel id="site-select-label">Sites</InputLabel>
                <Select
                  style={{ fontSize: ".8rem" }}
                  labelId="site-select-label"
                  id="site-select"
                  value={selectedSite}
                  onChange={handleSiteChange}
                  multiple
                  renderValue={(data) => data.join(", ")}
                  MenuProps={{
                    classes: { paper: classes.menuPaper },
                    getContentAnchorEl: () => null,
                  }}
                >
                  <MenuItem
                    value="All"
                    classes={{
                      root: isAllSelected ? classes.selectedAll : "",
                    }}
                    style={{ paddingBlock: 0 }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        style={{ paddingBlock: 0 }}
                        size="small"
                        color="primary"
                        classes={{ indeterminate: classes.indeterminateColor }}
                        checked={isAllSelected}
                        indeterminate={
                          selectedSite.length > 0 &&
                          selectedSite.length <
                            JSON.parse(localStorage.getItem("siteNamesCaps"))
                              .length
                        }
                      />
                    </ListItemIcon>
                    <ListItemText
                      // classes={{ primary: classes.selectAllText }}
                      classes={{ primary: classes.listItemText }}
                      primary="Select All"
                      style={{ paddingTop: ".05rem" }}
                    />
                  </MenuItem>
                  {JSON.parse(localStorage.getItem("siteNamesCaps")).map(
                    (element) => {
                      return (
                        <MenuItem
                          key={element}
                          value={element}
                          style={{ paddingBlock: 0 }}
                        >
                          <ListItemIcon>
                            <Checkbox
                              style={{ paddingBlock: 0 }}
                              checked={selectedSite.indexOf(element) > -1}
                              size="small"
                              color="primary"
                            />
                          </ListItemIcon>
                          <ListItemText
                            classes={{ primary: classes.listItemText }}
                            primary={element}
                            style={{ paddingTop: ".05rem" }}
                          />
                        </MenuItem>
                      );
                    }
                  )}
                </Select>
              </FormControl>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                {/* <FormControl className={classes.formControlStyle} style={{marginRight: '1rem'}}>
                <InputLabel id='site-select-label'>Site</InputLabel>
                <Select
                  labelId='site-select-label'
                  id='site-select'
                  value={selectedSite}
                  onChange={handleSiteChange}
                  style={{fontSize: '.8rem'}}
                >
                  {JSON.parse(localStorage.getItem("siteNamesCaps")).map(element => (
                      <MenuItem key={element} value={element}>{element}</MenuItem>
                  ))}
                </Select>
              </FormControl> */}
                <KeyboardDatePicker
                  autoOk={true}
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  id="from-date-picker-inline"
                  label="From"
                  value={fromDate}
                  onChange={handleFromDateChange}
                  KeyboardButtonProps={{
                    "aria-labelte": "from date",
                  }}
                  style={{ marginRight: "1rem" }}
                  className={classes.textField}
                  InputProps={{
                    style: {
                      fontSize: ".8rem",
                    },
                  }}
                />

                <KeyboardDatePicker
                  autoOk={true}
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  id="to-date-picker-inline"
                  label="To"
                  value={toDate}
                  onChange={handleToDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "to date",
                  }}
                  className={classes.textField}
                  InputProps={{
                    style: {
                      fontSize: ".8rem",
                    },
                  }}
                />
              </MuiPickersUtilsProvider>
              {/* <FormControl component="fieldset" style={{marginLeft: '1rem'}}>
                    <FormLabel component="legend" style={{fontSize: '.8rem'}}>Time Period</FormLabel>
                    <RadioGroup value={timePeriod} onChange={handleTimePeriodChange} row aria-label="time-period" name="time-period-row-radio-buttons-group">
                        <FormControlLabel value='24' control={<Radio color='primary' size='small' />} label="24 hrs" />
                        <FormControlLabel  value='14' control={<Radio color='primary' size='small' />} label="06:00 - 20:00" />
                    </RadioGroup>
                </FormControl> */}
            </Grid>
            <Grid item>
              <Button
                size="small"
                color="primary"
                variant="outlined"
                onClick={handleViewBtnClick}
                disabled={disabledViewBtn}
              >
                {disabledViewBtn ? "Loading" : "View"}
              </Button>
            </Grid>
            <Grid item style={{ marginLeft: "1rem" }}>
              <Button
                size="small"
                color="primary"
                variant="outlined"
                onClick={downloadReport}
                disabled={disabledDownload}
              >
                {disabledDownload ? "Downloading" : "Download"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item style={{marginRight: '1rem'}}>
              <FormControl className={classes.formControlStyle}>
                <InputLabel id='sort-select-label'>Sort</InputLabel>
                <Select
                  labelId='sort-select-label'
                  id='sort-select'
                  value={sort}
                  onChange={handleSortChange}
                  style={{fontSize: '.8rem'}}
                >
                  <MenuItem value={'desc'}>
                    <span>Desc&ensp;</span>
                  </MenuItem>
                  <MenuItem value={'asc'}>
                    <span>Asc&ensp;</span>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid> */}

        {/* <Grid item>
          <Grid container alignItems='center'>
            <Grid item style={{ marginRight: '2rem' }}>
              <Grid container>
                <Grid item>
                  {status === 0 ? (
                    // <span style={{ fontSize: "1.25rem", color: "#f44336" }}>
                    //   Offline
                    // </span>
                    <Typography variant='h6' style={{ color: '#f44336' }}>
                      Offline
                    </Typography>
                  ) : (
                    // <span style={{ fontSize: "1.25rem", color: "#4caf50" }}>
                    //   Online
                    // </span>
                    <Typography variant='h6' style={{ color: '#4caf50' }}>
                      Online
                    </Typography>
                  )}
                </Grid>
                <Grid item style={{ margin: '0 1rem' }}></Grid>
                <Grid item>
                  {timestamp === undefined ? (
                    <CircularProgress
                      size='1.25rem'
                      // style={{ marginRight: '.5rem' }}
                    />
                  ) : (
                    <Typography variant='h6'>
                      {getFormattedDateAndTimeString(timestamp)}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  style={{ width: 1, visibility: 'hidden' }}
                  value={selectedDate}
                  open={openDateTimePicker}
                  onClose={() => setOpenDateTimePicker(false)}
                  onChange={handleDateChange}
                  format='dd/MM/yyyy hh:mm a'
                  minDate={getMinDateForPicker()}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item>
              <IconButton onClick={() => setOpenDateTimePicker(true)}>
                <EventIcon color='action' fontSize='large' />
              </IconButton>
            </Grid>
            <Grid item style={{ paddingRight: '0rem', marginRight: '1rem' }}>
              <IconButton
                // variant="outlined"
                // color="primary"
                onClick={handleTimeReset}
              >
                <UpdateIcon color='primary' fontSize='large' />
              </IconButton>
            </Grid>
          </Grid>
        </Grid> */}
      </Grid>

      <Grid container style={{ marginTop: ".25rem" }}>
        {barChartDataOG.map((element) => (
          <PeakPowerChartCard
            siteName={element.site}
            barChartDataParent={element.inverters}
            isSingleDay={isSingleDay}
          />
        ))}
      </Grid>

      <div style={{ marginBlock: "1.5rem" }}></div>
      {/* {selectedSite && <CustomDiagram />} */}
      <Snackbar
        open={openTimeSliderSuccessAlert}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        autoHideDuration={4000}
        onClose={handleTimeSliderToggleClose}
      >
        <Alert onClose={handleTimeSliderToggleClose} severity="success">
          {/* Time is reset to {getFormattedTimeString(new Date())} */}
          Time is reset!
        </Alert>
      </Snackbar>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <div style={{ marginBottom: "1.5rem" }}></div>
    </div>
  );
}
