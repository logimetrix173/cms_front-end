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
import { ML_URL, SERVER_URL } from "../../constants/constants";
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
import { AppState } from "../../AppContext";

import DataAvailabilityBarChart from "./DataAvailabilityBarChart";

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

export default function DataAvailability({ handleSessionExpire }) {
  const { setEnabledLinearProgress } = AppState();

  const [disabledViewBtn, setDisabledViewBtn] = useState(false);

  const classes = useStyles();

  const userToken = localStorage.getItem("userToken");

  const [parameter, setParameter] = useState("pr");

  const [sort, setSort] = useState("asc");

  const [filter, setFilter] = useState("none");

  const [enableBarChartScroll, setEnableBarChartScroll] = useState(true);

  const [barChartDataOG, setBarChartDataOG] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  const [timePeriod, setTimePeriod] = useState("14");

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  const fetchPerformance = (fromDate, toDate) => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    // console.log('site ranking', fromDate.toLocaleString(), toDate.toLocaleString(), today.toLocaleString());

    let fromDateTime = fromDate.getTime();
    let toDateTime = toDate.getTime();

    if (timePeriod === "14") {
      let newFromDate = new Date(fromDate.getTime());
      newFromDate.setHours(6, 0, 0, 0);
      fromDateTime = newFromDate.getTime();

      let newToDate = new Date(toDate.getTime());
      newToDate.setHours(20, 0, 0, 0);
      toDateTime = newToDate.getTime();
    } else {
      let newToDate = new Date();
      newToDate.setDate(toDate.getDate());
      toDateTime = newToDate.getTime();
    }
    setEnabledLinearProgress(true);
    setDisabledViewBtn(true);
    // console.log(new Date(toDateTime).toLocaleTimeString());

    axios
      .post(
        SERVER_URL + "/dataavail",
        {
          fromDate: fromDateTime,
          endDate: toDateTime,
          timePeriod: Number(timePeriod),
        },
        {
          headers: { jwtToken: localStorage.getItem("userToken") },
        }
      )
      .then((response) => {
        // console.log("data availability", response);

        let sortedByName = response.data.sort((a, b) => {
          return a.siteName < b.siteName ? -1 : 1;
        });

        let dataWithColors = sortedByName.map((element) => {
          return {
            ...element,
            color: Number(element.Percentage) < 95 ? "#EC7063" : "#48C9B0",
          };
        });

        setBarChartDataOG(dataWithColors);

        setBarChartData(dataWithColors);
        setEnabledLinearProgress(false);
        setDisabledViewBtn(false);
        // if (sort === 'desc') {
        //   setBarChartData(response.data.sort((a, b) => {
        //     return parseFloat(b.Percentage) - parseFloat(a.Percentage);
        //   }));
        // } else {
        //   setBarChartData(response.data.sort((a, b) => {
        //     return parseFloat(a.Percentage) - parseFloat(b.Percentage);
        //   }));
        // }
      })
      .catch((error) => {
        // console.log(error);
        if (error?.response?.status === 401) {
          handleSessionExpire();

          // setLogoutMsg(true);
        }
        setEnabledLinearProgress(false);
        setDisabledViewBtn(false);
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
          prevState.sort(
            (a, b) => parseFloat(b.Percentage) - parseFloat(a.Percentage)
          )
        );
        break;
      case "asc":
        setBarChartData((prevState) =>
          prevState.sort(
            (a, b) => parseFloat(a.Percentage) - parseFloat(b.Percentage)
          )
        );
        break;
      default:
        setBarChartData((prevState) =>
          prevState.sort(
            (a, b) => parseFloat(b.Percentage) - parseFloat(a.Percentage)
          )
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

  useEffect(() => {
    fetchPerformance(fromDate, toDate);
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
    fetchPerformance(fromDate, toDate);
  };

  return (
    <div style={{ marginTop: ".5rem", width: "90vw" }}>
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <Grid container alignItems="flex-end">
            <Grid item style={{ marginRight: "1rem" }}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
              <FormControl
                className={classes.formControlStyle}
                style={{ marginLeft: "1rem" }}
              >
                <InputLabel id="time-select-label">Time</InputLabel>
                <Select
                  labelId="time-select-label"
                  id="time-select"
                  value={timePeriod}
                  onChange={handleTimePeriodChange}
                  style={{ fontSize: ".8rem" }}
                >
                  <MenuItem value={"14"}>
                    <span>06:00 - 20:00&ensp;</span>
                  </MenuItem>
                  <MenuItem value={"24"}>
                    <span>24 hrs&ensp;</span>
                  </MenuItem>
                </Select>
              </FormControl>
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
          </Grid>
        </Grid>
        <Grid item style={{ marginRight: "1rem" }}>
          <FormControl className={classes.formControlStyle}>
            <InputLabel id="sort-select-label">Sort</InputLabel>
            <Select
              labelId="sort-select-label"
              id="sort-select"
              value={sort}
              onChange={handleSortChange}
              style={{ fontSize: ".8rem" }}
            >
              <MenuItem value={"desc"}>
                <span>Desc&ensp;</span>
              </MenuItem>
              <MenuItem value={"asc"}>
                <span>Asc&ensp;</span>
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

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
        <Card
          elevation={6}
          style={{
            width: "100%",
            height: "410px",
            marginTop: "1rem",
            paddingTop: ".5rem",
            paddingBottom: "3.5rem",
          }}
        >
          <Grid
            container
            justify="flex-end"
            alignItems="center"
            style={{ paddingInline: "2rem", marginBottom: ".5rem" }}
          >
            <Grid item>
              <span>Scroll:</span>
              <Switch
                checked={enableBarChartScroll}
                onChange={() =>
                  setEnableBarChartScroll((prevState) => !prevState)
                }
                color="primary"
                name="scrollSwitch"
              />
            </Grid>
          </Grid>
          <DataAvailabilityBarChart
            chartData={barChartData}
            enableScroll={enableBarChartScroll}
          />
        </Card>
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
      <div style={{ marginBottom: "1.5rem" }}></div>
    </div>
  );
}
