import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Card, Grid, Typography, Button } from "@material-ui/core";
import CustomBarChart from "../components/InverterEfficiency/CustomBarChart";
import CustomLineChart from "../components/InverterEfficiency/CustomLineChart";
import axios from "axios";
import { ML_URL, SERVER_URL } from "../constants/constants";
import DateFnsUtils from "@date-io/date-fns";
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import IconButton from "@material-ui/core/IconButton";
import UpdateIcon from "@material-ui/icons/Update";
import EventIcon from "@material-ui/icons/Event";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { CircularProgress } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import BiaxialLineChart from "../components/mlPredictions/BiaxialLineChart";
import { AppState } from "../AppContext";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    // marginTop: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
}));

export default function InverterEfficiency({ handleSessionExpire }) {
  const classes = useStyles();

  const { setEnabledLinearProgress } = AppState();

  let source = axios.CancelToken.source();

  const userToken = localStorage.getItem("userToken");

  const [selectedSite, setSelectedSite] = useState("mahoba");

  const [generationData, setGenerationData] = useState([
    {
      time: "00:00",
      predicted: 0,
      actual: 0,
    },
  ]);

  const [generationInterval, setGenerationInterval] = useState(12);
  const [generationLeftYDomain, setGenerationLeftYDomain] = useState([0, 30]);

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
      // Aug 5, 2021 12:00:00 PM
      startTime.setTime(1628164800000);
    } else if (selectedSite === "mahoba") {
      /*|| selectedSite === "yemmiganur"*/
    }
    {
      // Aug 6, 2021 12:00:00 PM
      startTime.setTime(1628251200000);
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

  /**
   * END of functions related to time component
   */

  const handleSiteChange = (event) => {
    setSelectedSite(event.target.value);
  };

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
    setEnabledLinearProgress(true);
    axios
      .get(SERVER_URL + "/" + selectedSite + "/site", {
        cancelToken: source.token,
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
        setEnabledLinearProgress(false);
      })
      .catch((error) => {
        // console.log("------------------> ERROR  :", error);
        // if (error.response && error.response.status === 401) {
        //   handleSessionExpire();
        // }
        if (error?.response?.status === 401) {
          handleSessionExpire();

          // setLogoutMsg(true);
        }
        setEnabledLinearProgress(false);
      });
  };

  const formatGenerationData = (data) => {
    let formattedData = [];
    let max = 0;
    let predictedMax = 0;
    let actualMax = 0;
    for (let i = 0; i < data.length; i++) {
      let time = new Date(data[i].timestamp);
      let timeStr =
        String(time.getHours()).padStart(2, 0) +
        ":" +
        String(time.getMinutes()).padStart(2, 0);
      formattedData.push({
        time: timeStr,
        actual: Number(data[i].actual).toFixed(3),
        predicted: Number(data[i].predicted).toFixed(3),
      });
      predictedMax =
        predictedMax < data[i].predicted ? data[i].predicted : predictedMax;
      actualMax = actualMax < data[i].actual ? data[i].actual : actualMax;
    }
    max = predictedMax > actualMax ? predictedMax : actualMax;
    setGenerationLeftYDomain([0, Math.ceil(max) + Math.ceil(max / 10)]);
    return formattedData;
  };

  const fetchData = (endTime, selectedSite) => {
    // console.log("Fetching data...", selectedSite);
    const startTime = 1623696973 * 1000;
    let newEndTime = endTime;

    let fiveAM = new Date(newEndTime);
    fiveAM.setHours(5, 0, 0, 0);
    let beginTime = fiveAM.getTime();

    if (isTimeReset) {
      newEndTime = Date.now();
      // console.log(
      //   "TIME TO FETCH 'newEndTime':",
      //   startTime,
      //   newEndTime,
      //   new Date(newEndTime).toLocaleString(),
      //   "beginTime",
      //   new Date(beginTime).toLocaleString()
      // );
    } else {
      newEndTime = endTime;
      // console.log(
      //   "TIME TO FETCH:",
      //   startTime,
      //   newEndTime,
      //   new Date(newEndTime).toLocaleString(),
      //   "beginTime",
      //   new Date(beginTime).toLocaleString()
      // );
    }

    // Status and time
    getStatusAndTime(startTime, newEndTime, selectedSite);

    // console.log(beginTime, endTime);

    // Fetch biaxial line chart data
    axios
      .post(
        ML_URL + "/generation",
        {
          startTime: beginTime,
          endTime: newEndTime,
          siteName: selectedSite,
        }
        // ,
        // {
        //   cancelToken: source.token,
        //   headers: {
        //     jwtToken: userToken,
        //   },
        // }
      )
      .then((response) => {
        // console.log("Data: ", response.data);
        setGenerationData(formatGenerationData(response.data));
      })
      .catch((error) => {
        // console.log(error);
        // handleSessionExpire();
      });
  };

  useEffect(() => {
    // console.log(userToken);
    fetchData(mainTime, selectedSite);

    // Fetch data every 5 minutes
    const interval = setInterval(() => {
      fetchData(mainTime, selectedSite);
    }, 300000);

    return () => {
      clearInterval(interval);
      source.cancel();
    };
  }, [selectedSite, mainTime]);

  return (
    <React.Fragment>
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <Typography variant="h6">ML Predictions</Typography>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              {status === 0 ? (
                // <span style={{ fontSize: "1.25rem", color: "#f44336" }}>
                //   Offline
                // </span>
                <Typography variant="h6" style={{ color: "#f44336" }}>
                  Offline
                </Typography>
              ) : (
                // <span style={{ fontSize: "1.25rem", color: "#4caf50" }}>
                //   Online
                // </span>
                <Typography variant="h6" style={{ color: "#4caf50" }}>
                  Online
                </Typography>
              )}
            </Grid>
            <Grid item style={{ margin: "0 1rem" }}></Grid>
            <Grid item>
              {timestamp === undefined ? (
                <CircularProgress
                  size="1.25rem"
                  // style={{ marginRight: '.5rem' }}
                />
              ) : (
                <Typography variant="h6">
                  {getFormattedDateAndTimeString(timestamp)}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container>
            <Grid item style={{ marginRight: "1.5rem" }}>
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedSite}
                  onChange={handleSiteChange}
                >
                  <MenuItem value={"mahoba"}>
                    <Typography variant="h6">Hukkeri</Typography>
                  </MenuItem>
                  {/* <MenuItem value={"yemmiganur"}>
                    <Typography variant="h6">Yemmiganur</Typography>
                  </MenuItem> */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  style={{ width: 1, visibility: "hidden" }}
                  value={selectedDate}
                  open={openDateTimePicker}
                  onClose={() => setOpenDateTimePicker(false)}
                  onChange={handleDateChange}
                  format="dd/MM/yyyy hh:mm a"
                  minDate={getMinDateForPicker()}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item>
              <IconButton onClick={() => setOpenDateTimePicker(true)}>
                <EventIcon color="action" fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                // variant="outlined"
                // color="primary"
                onClick={handleTimeReset}
              >
                <UpdateIcon color="primary" fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div style={{ marginBlock: "1rem" }}></div>
      {selectedSite && (
        <Card
          elevation={6}
          style={{
            height: "500px",
            paddingTop: "1rem",
          }}
        >
          <Typography
            variant="h6"
            color="textSecondary"
            style={{ paddingLeft: "1.5rem" }}
          >
            Power Generation
          </Typography>
          <div style={{ height: "94%" }}>
            <BiaxialLineChart
              interval={generationInterval}
              leftAxisY={generationLeftYDomain}
              // rightAxisY={generationRightYDomain}
              data={generationData}
            />
          </div>
        </Card>
      )}
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
      <div style={{ marginBottom: "2rem" }}></div>
    </React.Fragment>
  );
}
