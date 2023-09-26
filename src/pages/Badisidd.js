import DateFnsUtils from "@date-io/date-fns";
import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import NoteAddRoundedIcon from "@material-ui/icons/NoteAddRounded";

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
import { parse } from "date-fns";
import React, { useEffect, useLayoutEffect, useState } from "react";
import AmbientModuleTemp from "../components/Badisidd/AmbientModuleTemp";
import BiaxialLineChart from "../components/Badisidd/BiaxialLineChart";
import BlockTable from "../components/Badisidd/BlockTable";
import CustomCards from "../components/Badisidd/CustomCards";
import PowerGenerationGauge from "../components/Badisidd/PowerGenerationGauge";
import Wind from "../components/Badisidd/Wind";
import Wind2 from "../components/Badisidd/Wind2";
import Wind3 from "../components/Badisidd/Wind3";
import Wind4 from "../components/Badisidd/Wind4";
import Wind5 from "../components/Badisidd/Wind5";
import SiteCalendar from "../components/UI/SiteCalendar";
import { SERVER_URL } from "../constants/constants";
import customStyle from "./Site.css";
import { AppState } from "../../src/AppContext";
import { Button } from "@material-ui/core";
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

export default function Badisidd({
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
  const [ambientTemp2, setAmbientTemp2] = useState(0);
  const [moduleTemp2, setModuleTemp2] = useState(0);
  const [humidity2, setHumidity2] = useState(0);

  // wind direction and speed states
  const [windDirection, setWindDirection] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [rain, setRain] = useState(0);
  const [windDirection2, setWindDirection2] = useState(0);
  const [windSpeed2, setWindSpeed2] = useState(0);
  const [rain2, setRain2] = useState(0);

  // irradiance / generation data
  const [irradianceGenerationData, setIrradianceGenerationData] = useState([
    {
      time: "00:00",
      gti1: "0.00",
      gti2: "0,00",
      gti3: "0.00",
      gti4: "0,00",
      gti5: "0.00",
      ghi1: "0.00",
      ghi2: "0.00",
      ghi3: "0.00",
      ghi4: "0.00",
      ghi5: "0.00",
      pg: "0.00",
    },
  ]);

  // block select-button value state
  const [blockTableId, setBlockTableId] = React.useState(1);

  // blockTableObjects from Inverter Values
  const [blockTableObjects, setBlockTableObjects] = useState([]);

  const [isNextCount, setIsNextCount] = useState(0);
  // console.log(isNextCount);

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
    // console.log(
    //   "getStatusAndTime function called",
    //   startTime,
    //   endTime,
    //   beginTime
    // );
    axios
      .get(serverUrl + "/badisidd/site", {
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
    // Sep 10, 2021 12:00:00 PM
    const startTime = new Date(1631275200000);
    return startTime;
  };

  /**
   * END of Functions related to time slider
   */

  // Function relaed to custom cards
  const getCardsValues = (startTime, endTime, beginTime) => {
    // console.log("getCardsValues function called");
    axios
      .get(serverUrl + "/badisidd/boxes", {
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

  const getStartTime = (time) => {
    let date = new Date(time);
    date.setHours(12, 1, 0, 0);
    return date.getTime();
  };

  const [customGeneration, setCustomGeneration] = useState(0);

  const getGeneration = (startTime, endTime, beginTime) => {
    // console.log("getGeneration");
    axios
      .post(
        serverUrl + "/badisidd/generation",
        { startTime: getStartTime(startTime), endTime: endTime },
        {
          headers: {
            jwtToken: userToken,
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
        setCustomGeneration(Number(response.data));
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  // Function related to Power Generation Gauge
  const getTotalExport = (startTime, endTime, beginTime) => {
    // console.log("getTotalExport function called");
    axios
      .get(serverUrl + "/badisidd/gauge", {
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

  const [temperatureData, setTemperatureData] = useState({});

  // Function related to Ambient and Module Temperatures
  const getTemperatures = (startTime, endTime, beginTime) => {
    // console.log("getTemperatures function called");
    axios
      .get(serverUrl + "/badisidd/temperature", {
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
        // const ambientTempStr = response.data.ambientTemp;
        // const moduleTempStr = response.data.moduleTemp;
        // const humidityStr = response.data.humidity;
        // const ambientTempStr2 = response.data.ambientTemp2;
        // const moduleTempStr2 = response.data.moduleTemp2;
        // const humidityStr2 = response.data.humidity2;
        // // console.log(ambientTempStr, moduleTempStr, humidityStr);
        // setAmbientTemp(Number(ambientTempStr).toFixed(1));
        // setModuleTemp(Number(moduleTempStr).toFixed(1));
        // setHumidity(Number(humidityStr).toFixed(1));
        // setAmbientTemp2(Number(ambientTempStr2).toFixed(1));
        // setModuleTemp2(Number(moduleTempStr2).toFixed(1));
        // setHumidity2(Number(humidityStr2).toFixed(1));
        setTemperatureData(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  // Function related to wind direction and speed
  const getWindDirectionAndSpeed = (startTime, endTime, beginTime) => {
    // console.log("getWindDirectionAndSpeed function called");
    axios
      .get(serverUrl + "/badisidd/wind", {
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
        const windDirectionStr = response.data.winddirection1;
        const windSpeedStr = response.data.windspeed1;
        const rainStr = response.data.rain1;
        const windDirectionStr2 = response.data.winddirection2;
        const windSpeedStr2 = response.data.windspeed2;
        const rainStr2 = response.data.rain2;
        // console.log("Wind: ", windDirectionStr, windSpeedStr, rain);
        setWindDirection(Number(windDirectionStr).toFixed(0));
        setWindSpeed(Number(windSpeedStr).toFixed(1));
        setRain(Number(rainStr).toFixed(1));
        setWindDirection2(Number(windDirectionStr2).toFixed(0));
        setWindSpeed2(Number(windSpeedStr2).toFixed(1));
        setRain2(Number(rainStr2).toFixed(1));
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  // Function related to BiaxialLineChart
  const getIrradianceGenerationData = (startTime, endTime, beginTime) => {
    // console.log("getIrradianceGenerationData function called");
    axios
      .get(serverUrl + "/badisidd/graph", {
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
  const formatInverterValues = (data, block) => {
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

    if (block === 23 || block === 24 || block === 25 || block === 26) {
      let voltageValues = [
        "S1 / S1CB1 V",
        "S2 / S1CB2 V",
        "S3 / S1CB3 V",
        "S4 / S1CB4 V",
        "S5 / S1CB5 V",
        "S6 / S1CB6 V",
        "S7 / S1CB7 V",
        "S8 / S1CB8 V",
        "S9 / S2CB1 V",
        "S10 / S2CB2 V",
        "S11 / S2CB3 V",
        "S12 / S2CB4 V",
        "S13 / S2CB5 V",
        "S14 / S2CB6 V",
        "S15 / S2CB7 V",
        "S16 / S2CB8 V",
        "S17 / S3CB1 V",
        "S18 / S3CB2 V",
        "S19 / S3CB3 V",
        "S20 / S3CB4 V",
        "S21 / S3CB5 V",
        "S22 / S3CB6 V",
        "S23 / S3CB7 V",
        "S24 / S3CB8 V",
        "S25 / S4CB1 V",
        "S26 / S4CB2 V",
        "S27 / S4CB3 V",
        "S28 / S4CB4 V",
        "S29 / S4CB5 V",
        "S30 / S4CB6 V",
        "S31 / S4CB7 V",
        "S32 / S4CB8 V",
      ];

      heading.push(...voltageValues);
    }

    for (let i = 0; i < heading.length; i++) {
      let invArray = [];
      Array.from(Array(36).keys()).map((element, index) => {
        invArray.push({ ["inv" + Number(index + 1)]: NaN });
      });

      try {
        if (arrayFromObject[i][1]) {
          invArray[0]["inv1"] = arrayFromObject[i][1];
        }
        for (let j = 1; j < 36; j++) {
          if (arrayFromObject[heading.length * j + i][1]) {
            invArray[j]["inv" + Number(j + 1)] =
              arrayFromObject[heading.length * j + i][1];
          }
        }
      } catch (error) {}

      const invsObject = {};
      invArray.forEach((value, index) => {
        invsObject["inv" + Number(index + 1)] =
          value["inv" + Number(index + 1)];
      });

      // console.log(invsObject);

      arrayOfObjectsX.push({
        heading: heading[i],
        ...invsObject,
      });
    }

    // console.log("arrayOfObjectsX", arrayOfObjectsX);

    setBlockTableObjects([...arrayOfObjectsX]);
    // console.log(blockTableObjects);
  };

  const getInverterValues = (block, startTime, endTime, beginTime) => {
    // console.log("getInverterValues function called", block, startTime, endTime);
    axios
      .get(serverUrl + "/badisidd/grid/B" + String(block).padStart(2, 0), {
        headers: {
          jwtToken: userToken,
          startTime: new Date(1632225600000).getTime(), // Sep 21, 2021 12:00:00 PM
          endTime: endTime,
          beginTime: beginTime,
          enablePacket: getEnablePacket(),
          clientPacketTime: timestamp,
          isNext: getIsNext(),
        },
      })
      .then((response) => {
        // console.log("block and inverters", block, response.data);
        // console.log("Object Entries: ", Object.entries(response.data));
        // format the data
        formatInverterValues(response.data, block);
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

  // Function to call above functions to get data related to badisidd site
  const getSiteData = (endTime) => {
    // console.log("getSiteData", endTime);
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
    getGeneration(startTime, newEndTime, beginTime);
    getTemperatures(startTime, newEndTime, beginTime);
    getWindDirectionAndSpeed(startTime, newEndTime, beginTime);
    getIrradianceGenerationData(startTime, newEndTime, beginTime);
    getInverterValues(blockTableId, startTime, newEndTime, beginTime);
  };

  // useEffect to fetch data related to badisidd site
  useEffect(() => {
    // console.log("useEffect to fetch data related to badisidd site");

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
        // style={{
        //   position: "fixed",
        //   alignSelf: "flex-start",
        //   top: 0,
        //   overflowY: "auto",
        // }}
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
            <Grid item> */}
        {/* <span style={{ fontSize: "1.25rem" }}>badisidd</span> */}
        {/* <Typography variant="h6">Badisidd</Typography>
            </Grid>
            <Grid item style={{ margin: "0 1rem" }}></Grid>
            <Grid item> */}
        {/* <span style={{ fontSize: "1.25rem" }}>40 MW</span> */}
        {/* <Typography variant="h6">300 MW</Typography>
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
        </Grid> */}

        {/* <Grid item>
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
      <div style={{ marginTop: "1.5rem" }} />
      <CustomCards
        day_generation={cardsValues.day_generation}
        revenue={cardsValues.day_generation * 1000 * 2.74}
        peak_power={cardsValues.peak_power}
        ghi={cardsValues.ghi1}
        gti={cardsValues.gti1}
        ghi2={cardsValues.ghi2}
        gti2={cardsValues.gti2}
        ghi3={cardsValues.ghi3}
        gti3={cardsValues.gti3}
        ghi4={cardsValues.ghi4}
        gti4={cardsValues.gti4}
        ghi5={cardsValues.ghi5}
        gti5={cardsValues.gti5}
        plant_pr={cardsValues.plant_pr}
        grid_availability={cardsValues.grid_availability}
        plant_availability={cardsValues.plant_availability}
        cardsValues={cardsValues}
      />
      <Grid
        container
        // justify={justifyProp}
        // className={classes.grow}
        // spacing={2}
        justifyContent="space-between"
        style={{ marginTop: "1.5rem" }}
      >
        <Grid item>
          <PowerGenerationGauge totalExport={totalExport} maxValue={300} />
        </Grid>

        <Grid item>
          <AmbientModuleTemp
            ambientTemp={ambientTemp}
            moduleTemp={moduleTemp}
            humidity={humidity}
            ambientTemp2={ambientTemp2}
            moduleTemp2={moduleTemp2}
            humidity2={humidity2}
            temperatureData={temperatureData}
          />
        </Grid>
      </Grid>
      <Grid
        container
        style={{ marginTop: "1.5rem" }}
        // justifyContent="space-between"
      >
        <Grid item>
          <Wind
            windDirection={windDirection}
            windSpeed={windSpeed}
            rain={rain}
          />
        </Grid>
        <Grid item style={{ marginLeft: "2rem" }}>
          <Wind2
            windDirection={windDirection2}
            windSpeed={windSpeed2}
            rain={rain2}
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
          rightAxisY={[0, 300]}
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
                  {Array.from(Array(24).keys()).map((element, index) => {
                    return (
                      <MenuItem value={index + 1}>
                        B{String(index + 1).padStart(2, 0)}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <BlockTable values={blockTableObjects} block={blockTableId} />
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
