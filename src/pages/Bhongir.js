import DateFnsUtils from "@date-io/date-fns";
import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import NoteAddRoundedIcon from "@material-ui/icons/NoteAddRounded";

import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import EventIcon from "@material-ui/icons/Event";
import UpdateIcon from "@material-ui/icons/Update";
import MuiAlert from "@material-ui/lab/Alert";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import axios from "axios";
import "date-fns";
import React, { useEffect, useLayoutEffect, useState } from "react";
import AmbientModuleTemp from "../components/AmbientModuleTemp";
import BiaxialLineChart from "../components/BiaxialLineChart";
import BlockTable from "../components/Bhongir/BlockTable";
import CustomCards from "../components/CustomCards";
import PowerGenerationGauge from "../components/PowerGenerationGauge";
import Wind from "../components/Wind";
import { SERVER_URL } from "../constants/constants";
import customStyle from "./Site.css";
import SiteCalendar from "../components/UI/SiteCalendar";
import { AppState } from "../../src/AppContext";
import SitestatusBar from "../components/UI/SitestatusBar";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  gaugeChartStyle: {
    marginTop: theme.spacing(12),
  },
  formControl: {
    minWidth: 120,
  },
  modalCardStyle: {
    width: 340,
    height: "fit-content",
  },
  gridBreakpoint: {
    [theme.breakpoints.up("md")]: {},
  },
}));

export default function Bhongir({
  handleSessionExpire,
  handleClickOpen,
  sitestatusBar,
}) {
  const classes = useStyles();

  const { intervalTime } = AppState();

  // User details
  const username = localStorage.getItem("username", "Admin");
  const userToken = localStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");

  const serverUrl = SERVER_URL;

  // Main time state
  const [mainTime, setMainTime] = useState(new Date().getTime());

  // Status and Time states
  const [status, setStatus] = useState(0);
  const [timestamp, setTimestamp] = useState(undefined);

  // cards/ boxes states (generation, revenue, peak power, plant pr, and grid availability)
  const [cardsValues, setCardsValues] = useState({});

  // totalExport state
  const [totalExport, setTotalExport] = useState(0);
  const [gaugePercent, setGaugePercent] = useState(0);

  // temperatures states (ambient and module)
  const [ambientTemp, setAmbientTemp] = useState(0);
  const [moduleTemp, setModuleTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);

  // wind direction and speed states
  const [windDirection, setWindDirection] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [rain, setRain] = useState(0);

  // irradiance / generation data
  const [irradianceGenerationData, setIrradianceGenerationData] = useState([
    {
      time: "00:00",
      gti: "0.00",
      ghi: "0.00",
      pg: "0.00",
    },
  ]);

  // block select-button value state
  const [blockTableId, setBlockTableId] = React.useState(1);

  // blockTableObjects from Inverter Values
  const [blockTableObjects, setBlockTableObjects] = useState([]);

  const [isNextCount, setIsNextCount] = useState(0);

  useEffect(() => {
    if (isNextCount !== 0) {
      // console.log("isNextCount", isNextCount);
      getSiteData(mainTime);
    }
  }, [isNextCount]);

  const getEnablePacket = () => {
    if (isNextCount !== 0) {
      return "1";
    } else {
      return "0";
    }
  };

  const getIsNext = () => {
    if (isNextCount > 0) {
      return "1";
    } else {
      return "0";
    }
  };

  // Functions related to header (status and time)
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

  const getStatusAndTime = (startTime, endTime, beginTime) => {
    // console.log("getStatusAndTime function called");
    axios
      .get(serverUrl + "/bhongir/site", {
        headers: {
          jwtToken: userToken,
          startTime: startTime,
          endTime: endTime,
          beginTime: beginTime,
          enablePacket: getEnablePacket(),
          clientPacketTime: timestamp,
          isNext: getIsNext(),
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
        // if (error.response.status === 401) {
        //   handleSessionExpire();
        // }
        if (error?.response?.status === 401) {
          handleSessionExpire();

          // setLogoutMsg(true);
        }
      });
  };

  /**
   * Functions related to time slider
   */
  // let timeSliderLabel = null;
  let timeSliderLabel2 = null;
  // const [timeSliderActivated, setTimeSliderActivated] = useState(false);
  const [openTimeSliderSuccessAlert, setOpenTimeSliderSuccessAlert] =
    useState(false);

  const getFormattedTimeString = (date) => {
    return date
      .toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toUpperCase();
  };

  // const timeSliderLabelFormat = (value) => {
  //   const date = new Date();
  //   date.setHours(0, 0, 0, 0);
  //   date.setMinutes(value);

  //   timeSliderLabel = document.getElementById("timeSliderLabel");

  //   if (timeSliderLabel) {
  //     timeSliderLabel.innerText = getFormattedTimeString(date);
  //   }

  //   return date.toLocaleTimeString();
  // };

  // const handleTimeSliderValueChange = (event, value) => {
  //   console.log(value);
  //   const date = new Date();
  //   date.setHours(0, 0, 0, 0);
  //   date.setMinutes(value);
  //   console.log("Time slider changed value: ", date.toLocaleTimeString());
  //   setMainTime(date.getTime());
  // };

  // const handleTimeSliderToggle = () => {
  //   setTimeSliderActivated((prevState) => !prevState);
  //   if (timeSliderActivated === true) {
  //     setOpenTimeSliderSuccessAlert(true);
  //   }
  // };

  // const getSliderStartDateLabel = () => {
  //   const date = new Date();
  //   date.setHours(0, 1, 0, 0);
  //   return (
  //     <span>
  //       {date
  //         .toLocaleString([], {
  //           hour: "2-digit",
  //           // minute: "2-digit",
  //           hour12: true,
  //         })
  //         .toUpperCase()}
  //       <span>&nbsp;</span>
  //       {String(date.getDate()).padStart(2, "0")}/
  //       {String(date.getMonth() + 1).padStart(2, "0")}
  //     </span>
  //   );
  // };

  // const getSliderEndDateLabel = () => {
  //   const date = new Date();
  //   date.setHours(24, 0, 0, 0);
  //   return (
  //     <span>
  //       {date
  //         .toLocaleString([], {
  //           hour: "2-digit",
  //           // minute: "2-digit",
  //           hour12: true,
  //         })
  //         .toUpperCase()}
  //       <span>&nbsp;</span>
  //       {String(date.getDate()).padStart(2, "0")}/
  //       {String(date.getMonth() + 1).padStart(2, "0")}
  //     </span>
  //   );
  // };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openDateTimePicker, setOpenDateTimePicker] = useState(false);

  const [isTimeReset, setIsTimeReset] = useState(true);

  const handleTimeSliderToggleClose = () => {
    setOpenTimeSliderSuccessAlert(false);
  };

  const handleDateChange = (date) => {
    try {
      setIsTimeReset(false);
    } finally {
      setSelectedDate(date);
      setOpenDateTimePicker(false);
    }
  };

  const handleTimeReset = () => {
    setIsNextCount(0);
    let now = new Date();
    setSelectedDate(now);
    setMainTime(now.getTime());
    setOpenTimeSliderSuccessAlert(true);
    setIsTimeReset(true);
  };

  useEffect(() => {
    setMainTime(selectedDate.getTime());
  }, [selectedDate]);

  const getMinDateForPicker = () => {
    // Sep 01, 2021 5:00:00 PM
    const startTime = new Date(1630515600000);
    return startTime;
  };

  /**
   * END of Functions related to time slider
   */

  // Function relaed to custom cards
  const getCardsValues = (startTime, endTime, beginTime) => {
    // console.log("getCardsValues function called");
    axios
      .get(serverUrl + "/bhongir/boxes", {
        headers: {
          jwtToken: userToken,
          startTime: startTime,
          endTime: endTime,
          beginTime: beginTime,
          enablePacket: getEnablePacket(),
          clientPacketTime: timestamp,
          isNext: getIsNext(),
        },
      })
      .then((response) => {
        // console.log(response.data);
        setCardsValues(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  // Function related to Power Generation Gauge
  const getTotalExport = (startTime, endTime, beginTime) => {
    // console.log("getTotalExport function called");
    axios
      .get(serverUrl + "/bhongir/gauge", {
        headers: {
          jwtToken: userToken,
          startTime: startTime,
          endTime: endTime,
          beginTime: beginTime,
          enablePacket: getEnablePacket(),
          clientPacketTime: timestamp,
          isNext: getIsNext(),
        },
      })
      .then((response) => {
        // console.log("totalExport: ", response.data.value);
        const value = response.data.value;
        setTotalExport(Number(value).toFixed(2));
        // Dividing by 50 because upper limit is 50 MW
        setGaugePercent(Number(value).toFixed(1) / 50);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  // Function related to Ambient and Module Temperatures
  const getTemperatures = (startTime, endTime, beginTime) => {
    // console.log("getTemperatures function called");
    axios
      .get(serverUrl + "/bhongir/temperature", {
        headers: {
          jwtToken: userToken,
          startTime: startTime,
          endTime: endTime,
          beginTime: beginTime,
          enablePacket: getEnablePacket(),
          clientPacketTime: timestamp,
          isNext: getIsNext(),
        },
      })
      .then((response) => {
        // console.log("temperatures: ", response.data);
        const ambientTempStr = response.data.ambientTemp;
        const moduleTempStr = response.data.moduleTemp;
        const humidityStr = response.data.humidity;
        // console.log(ambientTempStr, moduleTempStr, humidityStr);
        setAmbientTemp(Number(ambientTempStr).toFixed(1));
        setModuleTemp(Number(moduleTempStr).toFixed(1));
        setHumidity(Number(humidityStr).toFixed(1));
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  // Function related to wind direction and speed
  const getWindDirectionAndSpeed = (startTime, endTime, beginTime) => {
    // console.log("getWindDirectionAndSpeed function called");
    axios
      .get(serverUrl + "/bhongir/wind", {
        headers: {
          jwtToken: userToken,
          startTime: startTime,
          endTime: endTime,
          beginTime: beginTime,
          enablePacket: getEnablePacket(),
          clientPacketTime: timestamp,
          isNext: getIsNext(),
        },
      })
      .then((response) => {
        // console.log("wind: ", response.data);
        const windDirectionStr = response.data.direction;
        const windSpeedStr = response.data.speed;
        const rainStr = response.data.rain;
        // console.log("Wind: ", windDirectionStr, windSpeedStr, rain);
        setWindDirection(Number(windDirectionStr).toFixed(0));
        setWindSpeed(Number(windSpeedStr).toFixed(1));
        setRain(Number(response.data.rain).toFixed(1));
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  // Function related to BiaxialLineChart
  const getIrradianceGenerationData = (startTime, endTime, beginTime) => {
    // console.log("getIrradianceGenerationData function called");
    axios
      .get(serverUrl + "/bhongir/graph", {
        headers: {
          jwtToken: userToken,
          startTime: startTime,
          endTime: endTime,
          beginTime: beginTime,
          enablePacket: getEnablePacket(),
          clientPacketTime: timestamp,
          isNext: getIsNext(),
        },
      })
      .then((response) => {
        // console.log("i/g data: ", response.data);
        setIrradianceGenerationData(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  // Functions related to Inverter Values block table
  const formatInverterValues = (data) => {
    // console.log("data: ", data);
    let arrayOfObjectsX = [];

    let arrayFromObject = Object.entries(data);
    // console.log("Object entries: ", arrayFromObject);

    const heading = [
      "L1 I",
      "L2 I",
      "L3 I",
      "L1 V",
      "L2 V",
      "L3 V",
      "Frequency",
      "DC I",
      "DC V",
      "Active Power",
      "DC Power",
      "Reactive Power",
      "PF",
      "Cab Temp",
      "IGBT Temp",
      "DC Energy",
      "S1 L1 I",
      "S1 L2 I",
      "S1 L3 I",
      "S1 L1 V",
      "S1 L2 V",
      "S1 L3 V",
      "S1 DC I",
      "S1 DC V",
      "S1 Active Power",
      "S1 DC Power",
      "S1 PF",
      "S1 IGBT Temp",
      "S1 CAB Temp",
      "S2 L1 I",
      "S2 L2 I",
      "S2 L3 I",
      "S2 L1 V",
      "S2 L2 V",
      "S2 L3 V",
      "S2 DC I",
      "S2 DC V",
      "S2 Active Power",
      "S2 DC Power",
      "S2 PF",
      "S2 IGBT Temp",
      "S2 CAB Temp",
      "S3 L1 I",
      "S3 L2 I",
      "S3 L3 I",
      "S3 L1 V",
      "S3 L2 V",
      "S3 L3 V",
      "S3 DC I",
      "S3 DC V",
      "S3 Active Power",
      "S3 DC Power",
      "S3 PF",
      "S3 IGBT Temp",
      "S3 CAB Temp",
      "S4 L1 I",
      "S4 L2 I",
      "S4 L3 I",
      "S4 L1 V",
      "S4 L2 V",
      "S4 L3 V",
      "S4 DC I",
      "S4 DC V",
      "S4 Active Power",
      "S4 DC Power",
      "S4 PF",
      "S4 IGBT Temp",
      "S4 CAB Temp",
      "S1 + S2 Peak Active Power",
      "S3 + S4 Peak Active Power",
      "S1 / S1CB1 I",
      "S2 / S1CB2 I",
      "S3 / S1CB3 I",
      "S4 / S1CB4 I",
      "S5 / S1CB5 I",
      "S6 / S1CB6 I",
      "S7 / S1CB7 I",
      "S8 / S1CB8 I",
      "S9 / S2CB1 I",
      "S10 / S2CB2 I",
      "S11 / S2CB3 I",
      "S12 / S2CB4 I",
      "S13 / S2CB5 I",
      "S14 / S2CB6 I",
      "S15 / S2CB7 I",
      "S16 / S2CB8 I",
      "S17 / S3CB1 I",
      "S18 / S3CB2 I",
      "S19 / S3CB3 I",
      "S20 / S3CB4 I",
      "S21 / S3CB5 I",
      "S22 / S3CB6 I",
      "S23 / S3CB7 I",
      "S24 / S3CB8 I",
      "S25 / S4CB1 I",
      "S26 / S4CB2 I",
      "S27 / S4CB3 I",
      "S28 / S4CB4 I",
      "S29 / S4CB5 I",
      "S30 / S4CB6 I",
      "S31 / S4CB7 I",
      "S32 / S4CB8 I",
    ];

    for (let i = 0; i < heading.length; i++) {
      let inv1Value = NaN;
      let inv2Value = NaN;
      let inv3Value = NaN;
      let inv4Value = NaN;
      let inv5Value = NaN;

      try {
        if (arrayFromObject[i][1]) {
          inv1Value = arrayFromObject[i][1];
        }
        if (arrayFromObject[heading.length + i][1]) {
          inv2Value = arrayFromObject[heading.length + i][1];
        }
        if (arrayFromObject[heading.length * 2 + i][1]) {
          inv3Value = arrayFromObject[heading.length * 2 + i][1];
        }
        if (arrayFromObject[heading.length * 3 + i][1]) {
          inv4Value = arrayFromObject[heading.length * 3 + i][1];
        }
        if (arrayFromObject[heading.length * 4 + i][1]) {
          inv5Value = arrayFromObject[heading.length * 4 + i][1];
        }
      } catch (error) {}

      arrayOfObjectsX.push({
        heading: heading[i],
        inv1: inv1Value,
        inv2: inv2Value,
        inv3: inv3Value,
        inv4: inv4Value,
        inv5: inv5Value,
      });
    }

    // console.log(arrayOfObjectsX);

    setBlockTableObjects([...arrayOfObjectsX]);
    // console.log(blockTableObjects);
  };

  const getInverterValues = (block, startTime, endTime, beginTime) => {
    // console.log("getInverterValues function called", block, startTime, endTime);
    axios
      .get(serverUrl + "/bhongir/grid/B" + String(block).padStart(2, 0), {
        headers: {
          jwtToken: userToken,
          startTime: startTime,
          endTime: endTime,
          beginTime: beginTime,
          enablePacket: getEnablePacket(),
          clientPacketTime: timestamp,
          isNext: getIsNext(),
        },
      })
      .then((response) => {
        // console.log("block ", block, response.data);
        // console.log("Object Entries: ", Object.entries(response.data));
        // format the data
        formatInverterValues(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const handleBlockChange = (event) => {
    setBlockTableId(event.target.value);
    let date = new Date();
    date.setDate(new Date().getDate() - 1);
    date.setHours(23, 50, 0, 0);

    let fiveAM = new Date(mainTime);
    fiveAM.setHours(5, 0, 0, 0);
    let beginTime = fiveAM.getTime();

    getInverterValues(event.target.value, date.getTime(), mainTime, beginTime);
  };

  // Function to call above functions to get data related to bhongir site
  const getSiteData = (endTime) => {
    // const midnight = new Date();
    // // Handle crash by setting startTime to 11:50 pm.
    // midnight.setDate(new Date().getDate() - 1);
    // midnight.setHours(23, 50, 0, 0);
    // const startTime = midnight.getTime();

    const startTime = 1623696973 * 1000;
    let newEndTime = endTime;

    if (isTimeReset) {
      newEndTime = Date.now();
      // console.log("TIME TO FETCH 'newEndTime':", newEndTime);
    } else {
      newEndTime = endTime;
      // console.log("TIME TO FETCH:", newEndTime);
    }

    let fiveAM = new Date(newEndTime);
    fiveAM.setHours(5, 0, 0, 0);
    let beginTime = fiveAM.getTime();

    getStatusAndTime(startTime, newEndTime, beginTime);
    getCardsValues(startTime, newEndTime, beginTime);
    getTotalExport(startTime, newEndTime, beginTime);
    getTemperatures(startTime, newEndTime, beginTime);
    getWindDirectionAndSpeed(startTime, newEndTime, beginTime);
    getIrradianceGenerationData(startTime, newEndTime, beginTime);
    getInverterValues(blockTableId, startTime, newEndTime, beginTime);
  };

  // useEffect to fetch data related to bhongir site
  useEffect(() => {
    // console.log("useEffect to fetch data related to bhongir site");

    timeSliderLabel2 = document.getElementById("timeSliderLabel2");

    if (timeSliderLabel2) {
      timeSliderLabel2.innerText = getFormattedTimeString(new Date());
    }

    getSiteData(mainTime);

    // Fetch data every 2 minutes
    const interval = setInterval(() => {
      getSiteData(mainTime);
    }, intervalTime);

    return () => {
      clearInterval(interval);
    };
  }, [mainTime]);

  const [justifyProp, setJustifyProp] = useState("space-between");
  useLayoutEffect(() => {
    const x = window.matchMedia("(min-width: 1280px)");
    if (x.matches) {
      setJustifyProp("space-between");
    } else {
      setJustifyProp("flex-start");
    }
  }, []);

  return (
    <React.Fragment>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        // spacing={4}
        // style={{ paddingTop: ".5rem" }}
        // style={{ paddingLeft: ".25rem", paddingRight: "2rem" }}
      >
        <SitestatusBar
          sitestatusBar={sitestatusBar}
          status={status}
          timestamp={timestamp}
          handleClickOpen={handleClickOpen}
          handleTimeReset={handleTimeReset}
          setIsNextCount={setIsNextCount}
          setOpenDateTimePicker={setOpenDateTimePicker}
          getMinDateForPicker={getMinDateForPicker}
          selectedDate={selectedDate}
          getFormattedDateAndTimeString={getFormattedDateAndTimeString}
          openDateTimePicker={openDateTimePicker}
          handleDateChange={handleDateChange}
        />
        {/* <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="h6">Bhongir</Typography>
            </Grid>
            <Grid item style={{ margin: "0 1rem" }}></Grid>
            <Grid item>
              <Typography variant="h6">50 MW</Typography>
            </Grid>
            <Grid item>
              <IconButton
                // size="large"
                color="primary"
                onClick={() => handleClickOpen()}
                style={{ paddingInline: ".5rem" }}
              >
                <NoteAddRoundedIcon fontSize="5rem" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid> */}

        {/* <Grid item className={classes.grow} /> */}
        {/* <Grid item style={{ paddingRight: "5rem" }}>
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
                  size={30}
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
            <SiteCalendar
              setOpenDateTimePicker={setOpenDateTimePicker}
              setIsNextCount={setIsNextCount}
            />
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
        </Grid> */}

        {/* <Grid item className={classes.grow} /> */}
        {/* <Grid item> */}
        {/* <Grid container spacing={7}> */}
        {/* <Grid item>
              <ToggleButton
                style={{ margin: "0rem" }}
                value="check"
                size="small"
                selected={timeSliderActivated}
                onChange={handleTimeSliderToggle}
              >
                {timeSliderActivated && (
                  <Typography color="primary" variant="h6" id="timeSliderLabel">
                    00:00 AM
                  </Typography>
                )}
                {!timeSliderActivated && (
                  <Typography
                    style={{ color: "#4caf50" }}
                    variant="h6"
                    id="timeSliderLabel2"
                  >
                    {getFormattedTimeString(new Date())}
                  </Typography>
                )}
              </ToggleButton>
            </Grid> */}

        {/* <Grid item style={{ paddingRight: "3rem" }}>
              <Slider
                style={{ width: 300 }}
                disabled={!timeSliderActivated}
                onChangeCommitted={handleTimeSliderValueChange}
                aria-labelledby="time-slider"
                valueLabelFormat={timeSliderLabelFormat}
                min={0}
                max={1440}
                defaultValue={0}
                marks={[
                  {
                    value: 1,
                    label: getSliderStartDateLabel(),
                  },
                  {
                    value: 1440,
                    label: getSliderEndDateLabel(),
                  },
                ]}
                valueLabelDisplay="off"
              />
            </Grid> */}
        {/* </Grid> */}
        {/* </Grid> */}
      </Grid>
      <div style={{ marginTop: "2rem" }} />
      <CustomCards
        day_generation={cardsValues.day_generation}
        revenue={cardsValues.day_generation * 1000 * 5.59}
        peak_power={cardsValues.peak_power}
        ghi={cardsValues.ghi}
        gti={cardsValues.gti}
        plant_pr={cardsValues.plant_pr}
        grid_availability={cardsValues.grid_availability}
        plant_availability={cardsValues.plant_availability}
      />
      <Grid
        container
        // justify={justifyProp}
        // className={classes.grow}
        spacing={6}
        style={{ marginTop: "1rem" }}
      >
        <Grid item>
          <PowerGenerationGauge totalExport={totalExport} maxValue={75} />
        </Grid>

        <Grid item>
          <AmbientModuleTemp
            ambientTemp={ambientTemp}
            moduleTemp={moduleTemp}
            humidity={humidity}
          />
        </Grid>
        <Grid item>
          <Wind
            windDirection={windDirection}
            windSpeed={windSpeed}
            rain={rain}
          />
        </Grid>
      </Grid>
      <Card
        elevation={6}
        style={{ marginTop: "2.5rem", height: "500px", width: "100%" }}
      >
        <Typography
          variant="h6"
          color="textSecondary"
          style={{
            marginLeft: "1.5rem",
            marginTop: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          Irradiance / Generation
        </Typography>

        <BiaxialLineChart
          data={irradianceGenerationData}
          interval={12}
          leftAxisY={[0, 1500]}
          rightAxisY={[0, 50]}
        />
      </Card>

      <Grid
        container
        style={{
          marginTop: "3rem",
        }}
      >
        <Grid item xs={12}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            style={{ marginBottom: ".5rem" }}
          >
            <Grid item>
              <Typography variant="h6" color="textSecondary">
                Inverter Values
              </Typography>
            </Grid>
            <Grid item className={classes.grow} />
            <Grid item>
              <Typography style={{ marginLeft: ".25rem" }}>
                Selected Block:{" "}
              </Typography>
            </Grid>
            <Grid item>
              <FormControl className={classes.formControl}>
                <Select value={blockTableId} onChange={handleBlockChange}>
                  <MenuItem value={1}>B01</MenuItem>
                  <MenuItem value={2}>B02</MenuItem>
                  <MenuItem value={3}>B03</MenuItem>
                  <MenuItem value={4}>B04</MenuItem>
                  <MenuItem value={5}>B05</MenuItem>
                  <MenuItem value={6}>B06</MenuItem>
                  <MenuItem value={7}>B07</MenuItem>
                  <MenuItem value={8}>B08</MenuItem>
                  <MenuItem value={9}>B09</MenuItem>
                  <MenuItem value={10}>B10</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <BlockTable values={blockTableObjects} />
        </Grid>
      </Grid>
      {/* <Snackbar
        open={timeSliderActivated}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Alert severity="info">Time slider activated!</Alert>
      </Snackbar> */}
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
      <div style={{ marginBottom: "2rem" }} />
    </React.Fragment>
  );
}
