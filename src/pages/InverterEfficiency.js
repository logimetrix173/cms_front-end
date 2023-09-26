import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Card, Grid, Typography, Button, Menu } from "@material-ui/core";
import CustomBarChart from "../components/InverterEfficiency/CustomBarChart";
import CustomLineChart from "../components/InverterEfficiency/CustomLineChart";
import axios from "axios";
import { SERVER_URL } from "../constants/constants";
import { AppState } from "../AppContext";
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
import { siteNamesCaps } from "../constants/SiteNamesY";

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
  menuPaper: {
    maxHeight: 400,
  },
}));

export default function InverterEfficiency({ handleSessionExpire }) {
  const classes = useStyles();
  const { setEnabledLinearProgress } = AppState();

  let source = axios.CancelToken.source();

  const serverUrl = SERVER_URL;
  const userToken = localStorage.getItem("userToken");

  // const { logoutMsg, setLogoutMsg } = AppState();

  const [selectedSite, setSelectedSite] = useState("Hukkeri");

  const [lineChartMin, setLineChartMin] = useState(0);

  /**
   * Functions related to time component
   */

  // Main time state
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
    if (selectedSite === "Hukkeri") {
      startTime.setTime(1623696973 * 1000);
      startTime.setDate(startTime.getDate() + 1);
    } else if (selectedSite === "hindupur") {
      startTime.setTime(1625823000000);
    } else if (selectedSite === "kherakhurd") {
      startTime.setTime(1623696973 * 1000);
    } else if (selectedSite === "jhandekalan") {
      // July 27, 2021 12:00:00 AM
      startTime.setTime(1627344000000);
    } else if (selectedSite === "bhadlal2") {
      // July 26, 2021 6:00:00 PM
      startTime.setTime(1627322400000);
    } else if (selectedSite === "bhadlal3") {
      // July 30, 2021 6:00:00 PM
      startTime = new Date(1627668000000);
    } else if (selectedSite === "jhunir") {
      // Aug 31, 2021 6:00:00 PM
      startTime = new Date(1630432800000);
    } else if (selectedSite === "bhongir") {
      // Sep 01, 2021 5:00:00 PM
      startTime = new Date(1630515600000);
    } else if (selectedSite === "padmajiwadi") {
      // Sep 02, 2021 2:00:00 PM
      startTime = new Date(1630591200000);
    } else if (selectedSite === "mothkur") {
      // Sep 03, 2021 12:00:00 PM
      startTime = new Date(1630670400000);
    } else if (selectedSite === "mankhera") {
      // Aug 30, 2021 12:00:00 PM
      startTime = new Date(1630324800000);
    } else if (selectedSite === "rayachoti") {
      // Sep 09, 2021 12:00:00 PM
      startTime = new Date(1631188800000);
    } else if (selectedSite === "bikaner") {
      // Sep 10, 2021 12:00:00 PM
      startTime = new Date(1631275200000);
    } else if (selectedSite === "santhipuram") {
      // Sep 15, 2021 12:00:00 PM
      startTime = new Date(1631707200000);
    } else if (selectedSite === "chittorgarh") {
      // Sep 24, 2021 12:00:00 PM
      startTime = new Date(1632484800000);
    } else if (selectedSite === "chattisgarh") {
      // Sep 27, 2021 12:00:00 PM
      startTime = new Date(1632744000000);
    } else if (selectedSite === "balanagar") {
      // Sep 28, 2021 12:00:00 PM
      startTime = new Date(1632830400000);
    } else if (selectedSite === "kosigi") {
      // Sep 29, 2021 12:00:00 PM
      startTime = new Date(1632916800000);
    } else if (selectedSite === "sandur" || selectedSite === "kudligi") {
      // Sep 30, 2021 12:00:00 PM
      startTime = new Date(1633003200000);
    } else if (selectedSite === "gulelgudda" || selectedSite === "hukkeri") {
      // Oct 01, 2021 06:00:00 PM
      startTime = new Date(1633111200000);
    } else if (selectedSite === "kittur") {
      // Oct 07, 2021 12:00:00 AM
      startTime = new Date(1633564800000);
    } else if (selectedSite === "bazpur") {
      // Oct 08, 2021 12:00:00 PM
      startTime = new Date(1633694400000);
    } else if (selectedSite === "sidlaghatta") {
      // Oct 11, 2021 12:00:00 PM
      startTime = new Date(1633953600000);
    } else if (selectedSite === "khilchipur") {
      // Oct 12, 2021 12:00:00 PM
      startTime = new Date(1634040000000);
    } else if (selectedSite === "khambhat") {
      // Oct 13, 2021 12:00:00 PM
      startTime = new Date(1634126400000);
    } else if (selectedSite === "bidar") {
      // Oct 20, 2021 12:00:00 PM
      startTime = new Date(1634731200000);
    } else if (selectedSite === "chittuguppa") {
      // Oct 22, 2021 12:00:00 PM
      startTime = new Date(1634904000000);
    } else if (selectedSite === "farhatabad") {
      // Oct 25, 2021 12:00:00 PM
      startTime = new Date(1635163200000);
    } else if (selectedSite === "godhur") {
      // Oct 29, 2021 12:00:00 PM
      startTime = new Date(1635508800000);
    } else if (selectedSite === "bankaM") {
      // Oct 30, 2021 12:00:00 PM
      startTime = new Date(1635595200000);
    } else if (selectedSite === "bankaN") {
      // Oct 30, 2021 12:00:00 PM
      startTime = new Date(1635595200000);
    } else if (selectedSite === "maddur") {
      // Nov 12, 2021 12:00:00 PM
      startTime = new Date(1636718400000);
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

  // Function to get AP and DP array
  const getAPDP = (data) => {
    let entries = Object.entries(data);

    let arrayAP = [];
    let arrayDP = [];

    for (let i = 0; i < entries.length; i++) {
      let key = entries[i][0];
      let value = entries[i][1];
      if (key.startsWith("ap")) {
        let objectAP = { [key]: value };
        arrayAP.push(objectAP);
      } else if (key.startsWith("dp")) {
        let objectDP = { [key]: value };
        arrayDP.push(objectDP);
      } else {
        // Leave createdon_client key
      }
    }

    return { arrayAP, arrayDP };
  };

  const generateBlockNames = (siteName, length) => {
    // console.log(siteName, length);
    let blocks = [];
    let inverters = 0;
    if (
      siteName === "Hukkeri" ||
      siteName === "bhadlal2" ||
      siteName === "bhadlal3" ||
      siteName === "sadashivpet"
    ) {
      inverters = 2;
    } else if (
      siteName === "hindupur" ||
      siteName === "sircilla" ||
      siteName === "gadarpur" ||
      siteName === "yemmiganur" ||
      siteName === "jhandekalan" ||
      siteName === "bhongir" ||
      siteName === "padmajiwadi" ||
      siteName === "mothkur" ||
      siteName === "mankhera" ||
      siteName === "pattikonda" ||
      siteName === "rayachoti" ||
      siteName === "santhipuram"
    ) {
      inverters = 4;
    } else if (siteName === "kherakhurd") {
      inverters = 6;
    } else if (siteName === "mahoba") {
      inverters = 8;
    } else if (siteName === "balangir") {
      inverters = 5;
    } else if (siteName === "nangla" || siteName === "jhunir") {
      inverters = 12;
    } else if (siteName === "bikaner") {
      inverters = 1;
    } else if (siteName === "kosigi" || siteName === "bazpur") {
      inverters = 4;
    }

    if (siteName === "mahoba") {
      for (let i = 1; i <= Math.ceil(length / inverters); i++) {
        if (i === 1) {
          for (let j = 1; j <= inverters - 2; j++) {
            blocks.push(i);
          }
        } else {
          for (let j = 1; j <= inverters; j++) {
            blocks.push(i);
          }
        }
      }
    } else if (siteName === "balangir") {
      for (let i = 1; i <= 9; i++) {
        if (i === 1) {
          for (let j = 1; j <= inverters; j++) {
            blocks.push(i);
          }
        } else {
          for (let j = 1; j <= inverters - 1; j++) {
            blocks.push(i);
          }
        }
      }
    } else if (siteName === "bhadlal3") {
      blocks = [
        1, 1, 2, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13,
        13, 14, 14,
      ];
    } else if (siteName === "nangla") {
      blocks = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3];
    } else if (siteName === "jhunir") {
      blocks = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3];
    } else if (siteName === "padmajiwadi" || siteName === "mothkur") {
      blocks = [1, 1, 1, 1, 2, 2, 2, 2];
    } else if (siteName === "bhongir") {
      blocks = [
        1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6,
        7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10,
      ];
    } else if (siteName === "mankhera") {
      blocks = [
        1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4,
        5, 5, 5, 5, 5,
      ];
    } else if (siteName === "sadashivpet") {
      blocks = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
    } else if (siteName === "pattikonda") {
      blocks = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5];
    } else if (siteName === "rayachoti") {
      blocks = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5];
    } else if (siteName === "bikaner") {
      blocks = [1];
    } else if (siteName === "santhipuram") {
      blocks = [
        1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6,
        7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10,
      ];
    } else if (siteName === "chattisgarh") {
      blocks = [
        1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6,
        7, 7, 7, 7,
      ];
    } else if (siteName === "balanagar") {
      blocks = [
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        2,
        2,
        3,
        3,
        3,
        3,
        3,
        3,
        4,
        4,
        4,
        4,
        4,
        4,
        5,
        5,
        5,
        5,
        5,
        5,
        6,
        6,
        6,
        6,
        6,
        6,
        7,
        7,
        7,
        7,
        7,
        7,
        8,
        8,
        8,
        8,
        8,
        8,
        "mcr",
        "mcr",
      ];
    } else if (siteName === "kosigi") {
      blocks = [1, 1, 1, 1, 2, 2, 2, 2];
    } else if (
      siteName === "sandur" ||
      siteName === "kudligi" ||
      siteName === "sidlaghatta"
    ) {
      blocks = [1, 1, 2, 2, 3];
    } else if (
      siteName === "gulelgudda" ||
      siteName === "hukkeri" ||
      siteName === "kittur"
    ) {
      blocks = [1, 1, 2, 2];
    } else if (siteName === "bazpur") {
      blocks = [
        1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6,
      ];
    } else if (siteName === "chittorgarh") {
      blocks = [selectedBarBlock];
    } else if (siteName === "khilchipur") {
      blocks = [
        1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6,
        7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10,
      ];
    } else if (siteName === "khambhat") {
      blocks = [
        1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11,
        12, 12, 13, 13, 14, 14, 15, 15,
      ];
    } else if (siteName === "bidar") {
      blocks = [
        1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6,
        7, 7, 7, 7, 8, 8, 8, 8,
      ];
    } else if (siteName === "chittuguppa") {
      blocks = [
        1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6,
        7, 7, 7, 7, 8, 8, 8, 8,
      ];
    } else if (siteName === "farhatabad") {
      blocks = [
        1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6,
        7, 7, 7, 7, 8, 8, 8, 8,
      ];
    } else if (siteName === "godhur") {
      blocks = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4];
    } else if (siteName === "manthani") {
      blocks = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4];
    } else if (siteName === "bankaM") {
      blocks = [1, 1, 1, 1, 2, 2, 2, 2, "mcr", "mcr"];
    } else if (siteName === "bankaN") {
      blocks = [3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6];
    } else if (siteName === "maddur") {
      blocks = [
        1,
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        3,
        3,
        3,
        3,
        4,
        4,
        4,
        4,
        5,
        5,
        5,
        5,
        6,
        6,
        6,
        6,
        7,
        7,
        "mcr",
        "mcr",
      ];
    } else {
      for (let i = 1; i <= Math.ceil(length / inverters); i++) {
        for (let j = 1; j <= inverters; j++) {
          blocks.push(i);
        }
      }
    }

    return [...blocks];
  };

  const formattedBarChartData = (data, barBlock) => {
    // Todo: check for empty object or array
    // console.log("Inverter Efficiency, Bar chart data from server", data);
    // Min and max values to set the Y axis domain
    // let min = 0;
    // let max = 0;

    let chartData = [];

    let { arrayAP, arrayDP } = getAPDP(data);

    // console.log(arrayAP, arrayDP);

    let arrayInv = [];

    for (let i = 0, j = 1; i < arrayAP.length; i++, j++) {
      if (
        Number(arrayAP[i]["ap" + j]) === 0 ||
        Number(arrayDP[i]["dp" + j]) === 0
      ) {
        arrayInv.push({ label: "Inv " + j, value: 0 });
      } else {
        let invValue =
          Number(arrayAP[i]["ap" + j]) / Number(arrayDP[i]["dp" + j]);
        arrayInv.push({ label: "Inv " + j, value: invValue });
      }
    }

    let lowestValue = null;
    let lowestValueIndex = null;
    let highestValue = null;
    let highestValueIndex = null;
    for (let i = 0, j = 1; i < arrayInv.length; i++, j++) {
      if (lowestValue === null) {
        lowestValue = Number(arrayInv[i]["value"]);
        lowestValueIndex = i;
      }
      if (highestValue === null) {
        highestValue = Number(arrayInv[i]["value"]);
        highestValueIndex = i;
      }
      if (Number(arrayInv[i]["value"]) < lowestValue) {
        lowestValue = Number(arrayInv[i]["value"]);
        lowestValueIndex = i;
      }
      if (Number(arrayInv[i]["value"]) > highestValue) {
        highestValue = Number(arrayInv[i]["value"]);
        highestValueIndex = i;
      }
    }

    let truncatedInv = [];
    let blockNames = generateBlockNames(selectedSite, arrayInv.length);
    for (let i = 0, j = 1; i < arrayInv.length; i++, j++) {
      let invValue = Number(arrayInv[i]["value"]).toFixed(3) * 1000;
      truncatedInv.push({
        label: j,
        value: invValue,
        blockName: selectedSite === "chittorgarh" ? barBlock : blockNames[i],
      });
    }

    // if (lowestValue === 0) {
    //   min = -1;
    // } else {
    //   min = lowestValue + lowestValue;
    //   min = Math.ceil(min);
    // }

    // if (highestValue === 0) {
    //   max = 1;
    // } else {
    //   max = highestValue + highestValue / 2;
    //   max = Math.ceil(max);
    // }

    // console.log(
    //   "lowestValue, lowestValueIndex, highestValues, highestValueIndex, and array of inverters",
    //   lowestValue,
    //   lowestValueIndex,
    //   highestValue,
    //   highestValueIndex,
    //   truncatedInv
    // );

    return {
      lowestValue,
      lowestValueIndex,
      highestValue,
      highestValueIndex,
      chartData: truncatedInv,
    };
  };

  const formattedLineChartData = (data) => {
    // console.log("Line chart data before formating", data);

    let chartData = [];

    let interval = 1;
    if (data.length > 12) {
      interval = 12;
    }
    // Min and max value for Y axis domain
    // let min = 0;
    // let max = 0;

    // Set min and max domain, and format data
    for (let i = 0; i < data.length; i++) {
      // console.log(Object.entries(data[i]).length);
      let date = new Date(data[i]["createdon_client"] * 1000);
      let dateStr =
        String(date.getHours()).padStart(2, 0) +
        ":" +
        String(date.getMinutes()).padStart(2, 0);
      let obj = {};
      obj["createdon_client"] = dateStr;
      let { arrayAP, arrayDP } = getAPDP(data[i]);
      // console.log("arrayAP", arrayAP);
      // console.log("arrayDP", arrayDP);
      for (let i = 0, j = 1; i < arrayAP.length; i++, j++) {
        if (
          Number(arrayAP[i]["ap" + j]) === 0 ||
          Number(arrayDP[i]["dp" + j]) === 0
        ) {
          obj["Inv " + j] = 0;
        } else {
          let invValue =
            Number(arrayAP[i]["ap" + j]) / Number(arrayDP[i]["dp" + j]);
          obj["Inv " + j] = invValue;
          if (isNaN(invValue)) {
            // console.log(invValue);
          }
        }
        // Find min and max
        // if (obj["Inv " + j] < min) {
        //   min = obj["Inv " + j];
        // }
        // if (obj["Inv " + j] > max) {
        //   max = obj["Inv " + j];
        // }
      }
      chartData.push(obj);
    }

    // console.log(chartData);

    // Get the aggregated values
    let aggregatedLines = [];

    let firstObjectLength = Object.keys(chartData[0]).length;
    // console.log(firstObjectLength);

    for (let i = 1; i < firstObjectLength; i++) {
      let value = null;
      for (let j = 0; j < chartData.length; j++) {
        value += chartData[j]["Inv " + i];
      }
      aggregatedLines.push({ label: "Inv " + i, value: value });
    }

    // console.log("aggregatedLines", aggregatedLines);

    let sortable = aggregatedLines.sort((a, b) => {
      if (a.value < b.value) {
        return -1;
      }
      if (a.value > b.value) {
        return 1;
      }
      return 0;
    });

    // console.log(sortable);

    // Array of lines
    let lines = [];
    let red = 0;
    // let redColors = ["#c62828", "#d32f2f", "#e53935", "#f44336", "#ef5350"];
    let redColors = ["#E74C3C", "#EC7063", "#F1948A"];
    let blue = 3;
    // Depends on minimum number of inverters
    let blueColors = [
      // "#29b6f6",
      // "#03a9f4",
      // "#039be5",
      // "#0288d1",
      "#0277bd",
      "#42a5f5",
      "#2196f3",
      "#1e88e5",
      "#1976d2",
      "#1565c0",
    ];
    let green = sortable.length - 3;
    let greenColors = ["#43a047", "#388e3c", "#2e7d32"];
    let allColors = [...redColors, ...blueColors, ...greenColors];
    // console.log(allColors);
    let j = 0;
    for (let i = 0; i < sortable.length; i++) {
      if (red < 4) {
        let index = String(sortable[i].label).split(" ")[1];
        lines[index - 1] = {
          label: sortable[i].label,
          value: sortable[i].value,
          color: allColors[j],
        };
        red += 1;
        j += 1;
      } else if (blue < sortable.length - 3) {
        let index = String(sortable[i].label).split(" ")[1];
        lines[index - 1] = {
          label: sortable[i].label,
          value: sortable[i].value,
          color: allColors[j],
        };
        blue += 1;
        j += 1;
      } else {
        let index = String(sortable[i].label).split(" ")[1];
        lines[index - 1] = {
          label: sortable[i].label,
          value: sortable[i].value,
          color: allColors[j],
        };
        green += 1;
        j += 1;
      }
    }

    // console.log("Line chart formatted data", chartData, lines, interval);

    // console.log(lines);

    return { chartData, lines, interval, min: lineChartMin };
  };

  // Set initial state to prevent crash and unwanted animation
  const [barChartData, setBarChartData] = useState({
    min: -1,
    max: 1,
    highestValue: 0,
    highestValueIndex: 0,
    chartData: [
      {
        label: "Inv 1",
        value: 0,
      },
    ],
  });
  const [lineChartData, setLineChartData] = useState({
    min: -1,
    max: 1,
    chartData: [
      {
        createdon_client: "0",
        inv1: 0,
      },
    ],
    lines: [],
  });

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
      .get(serverUrl + "/" + selectedSite + "/site", {
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
        // console.log(error);
        if (error?.response?.status === 401) {
          // console.log(error.response, "401");
          handleSessionExpire();

          // setLogoutMsg(true);
          setEnabledLinearProgress(false);
        }
      });
  };

  const [selectedBarBlock, setSelectedBarBlock] = useState(1);
  const [selectedLineBlock, setSelectedLineBlock] = useState(1);

  const handleBarBlockChange = (event) => {
    try {
      setSelectedBarBlock(() => event.target.value);
    } finally {
      fetchData(mainTime, selectedSite, event.target.value, selectedLineBlock);
    }
  };

  const handleLineBlockChange = (event) => {
    try {
      setSelectedLineBlock(() => event.target.value);
    } finally {
      fetchData(mainTime, selectedSite, selectedBarBlock, event.target.value);
    }
  };

  const fetchData = (endTime, selectedSite, barBlock, lineBlock) => {
    // console.log("Fetching data...", selectedSite);
    // console.log(barBlock, lineBlock);
    // setLogoutMsg(false);
    setEnabledLinearProgress(true);

    const startTime = 1623696973 * 1000;
    let newEndTime = endTime;

    let fiveAM = new Date(newEndTime);
    fiveAM.setHours(5, 0, 0, 0);
    let beginTime = fiveAM.getTime();

    if (isTimeReset) {
      newEndTime = Date.now();
    } else {
      newEndTime = endTime;
    }

    // Status and time
    getStatusAndTime(startTime, newEndTime, selectedSite);

    let barBlockStr = "B" + String(barBlock).padStart(2, "0");
    let lineBlockStr = "B" + String(lineBlock).padStart(2, "0");

    // console.log(barBlockStr, lineBlockStr);

    let modifiedSite = String(selectedSite).includes("banka")
      ? selectedSite.replace(/ +/g, "")
      : selectedSite;

    modifiedSite = String(modifiedSite).toLocaleLowerCase();

    // console.log('site for chart', modifiedSite);

    // Fetch bar chart data
    axios
      .post(
        serverUrl + "/efficiency/barchart",
        {
          // blockId: "B" + String(selectedBarBlock).padStart(2, 0),
          blockId: barBlockStr,
          startTime: selectedSite !== "chittorgarh" ? startTime : 1632182400000,
          endTime: newEndTime,
          beginTime: selectedSite !== "chittorgarh" ? beginTime : 1632182400000,
          site: modifiedSite,
        },
        {
          cancelToken: source.token,
          headers: {
            jwtToken: userToken,
          },
        }
      )
      .then((response) => {
        // console.log("inverter efficiency", response.data);
        setBarChartData(formattedBarChartData(response.data, barBlock));
        // setLogoutMsg(false);
        setEnabledLinearProgress(false);
      })
      .catch((error) => {
        setBarChartData({
          min: -1,
          max: 1,
          highestValue: 0,
          highestValueIndex: 0,
          chartData: [
            {
              label: "Inv 1",
              value: 0,
            },
          ],
        });
        console.log(error);
        // if (error.response.status === 401) {
        // setLogoutMsg(true);
        // console.log(error.response.status);
        // }

        // handleSessionExpire();
        setEnabledLinearProgress(false);
      });

    // Fetch line chart data
    // let modifiedSelectedSite = String(selectedSite).includes('banka') ? selectedSite.replace(/ +/g, "") : selectedSite
    axios
      .post(
        serverUrl + "/efficiency/graph/" + modifiedSite,
        {
          blockId: lineBlockStr,
        },
        {
          cancelToken: source.token,
          headers: {
            jwtToken: userToken,
            startTime:
              selectedSite !== "chittorgarh" ? startTime : 1632182400000,
            endTime: newEndTime,
            beginTime:
              selectedSite !== "chittorgarh" ? beginTime : 1632182400000,
          },
        }
      )
      .then((response) => {
        // console.log("inverter efficiency graph", response.data);
        setLineChartData(formattedLineChartData(response.data));
      })
      .catch((error) => {
        setLineChartData({
          min: -1,
          max: 1,
          chartData: [
            {
              createdon_client: "0",
              inv1: 0,
            },
          ],
          lines: [],
        });
        // if (error.response.status === 401) {
        // setLogoutMsg(true);
        // console.log(error.response.status);
        // }
        // console.log(error);
        // handleSessionExpire();
      });
  };

  useEffect(() => {
    // console.log(userToken);
    fetchData(mainTime, selectedSite, selectedBarBlock, selectedLineBlock);

    // Fetch data every 5 minutes
    const interval = setInterval(() => {
      fetchData(mainTime, selectedSite, selectedBarBlock, selectedLineBlock);
    }, 300000);

    return () => {
      clearInterval(interval);
      source.cancel();
    };
  }, [selectedSite, mainTime]);

  const handleMinChange = (event) => {
    // console.log(event.target.value);
    setLineChartData((prevState) => ({
      ...prevState,
      min: event.target.value,
    }));
  };

  const [enableBarChartScroll, setEnableBarChartScroll] = useState(false);

  return (
    <React.Fragment>
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <Typography variant="h6">Inverter Efficiency</Typography>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              {status === 0 ? (
                // <span style={{ fontSize: "1.25rem", color: "#f44336" }}>
                //   Offline
                // </span>
                <Typography variant="h6" style={{ color: "green" }}>
                  Online
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
                  labelId="site-select-label"
                  id="site-select"
                  value={selectedSite}
                  onChange={handleSiteChange}
                  MenuProps={{
                    classes: { paper: classes.menuPaper },
                    getContentAnchorEl: () => null,
                  }}
                >
                  {/* <MenuItem value={"balanagar"}>
                    <Typography variant="h6">Balanagar</Typography>
                  </MenuItem>
                  <MenuItem value={"balangir"}>
                    <Typography variant="h6">Balangir</Typography>
                  </MenuItem>
                  <MenuItem value={"bankaM"}>
                    <Typography variant="h6">Banka M</Typography>
                  </MenuItem>
                  <MenuItem value={"bankaN"}>
                    <Typography variant="h6">Banka N</Typography>
                  </MenuItem>
                  <MenuItem value={"bazpur"}>
                    <Typography variant="h6">Bazpur</Typography>
                  </MenuItem>
                  <MenuItem value={"bidar"}>
                    <Typography variant="h6">Bidar</Typography>
                  </MenuItem>
                  <MenuItem value={"bhadlal2"}>
                    <Typography variant="h6">Bhadla L2</Typography>
                  </MenuItem>
                  <MenuItem value={"bhadlal3"}>
                    <Typography variant="h6">Bhadla L3</Typography>
                  </MenuItem>
                  <MenuItem value={"bhongir"}>
                    <Typography variant="h6">Bhongir</Typography>
                  </MenuItem>
                  <MenuItem value={"bikaner"}>
                    <Typography variant="h6">Bikaner</Typography>
                  </MenuItem>
                  <MenuItem value={"byagwat"}>
                    <Typography variant="h6">Byagwat</Typography>
                  </MenuItem>
                  <MenuItem value={"chattisgarh"}>
                    <Typography variant="h6">Chattisgarh</Typography>
                  </MenuItem>
                  <MenuItem value={"chittuguppa"}>
                    <Typography variant="h6">Chittuguppa</Typography>
                  </MenuItem>
                  <MenuItem value={"chittorgarh"}>
                    <Typography variant="h6">Chittorgarh</Typography>
                  </MenuItem>
                  <MenuItem value={"farhatabad"}>
                    <Typography variant="h6">Farhatabad</Typography>
                  </MenuItem>
                  <MenuItem value={"gadarpur"}>
                    <Typography variant="h6">Gadarpur</Typography>
                  </MenuItem>
                  <MenuItem value={"godhur"}>
                    <Typography variant="h6">Godhur</Typography>
                  </MenuItem>
                  <MenuItem value={"gulelgudda"}>
                    <Typography variant="h6">Gulelgudda</Typography>
                  </MenuItem>
                  <MenuItem value={"hindupur"}>
                    <Typography variant="h6">Hindupur</Typography>
                  </MenuItem>
               
                  <MenuItem value={"jhandekalan"}>
                    <Typography variant="h6">Jhandekalan</Typography>
                  </MenuItem>
                  <MenuItem value={"jhunir"}>
                    <Typography variant="h6">Jhunir</Typography>
                  </MenuItem>
                  <MenuItem value={"khambhat"}>
                    <Typography variant="h6">Khambhat</Typography>
                  </MenuItem>
                  <MenuItem value={"kherakhurd"}>
                    <Typography variant="h6">Kherakhurd</Typography>
                  </MenuItem>
                  <MenuItem value={"khilchipur"}>
                    <Typography variant="h6">Khilchipur</Typography>
                  </MenuItem>
                  <MenuItem value={"kittur"}>
                    <Typography variant="h6">Kittur</Typography>
                  </MenuItem>
                  <MenuItem value={"kosigi"}>
                    <Typography variant="h6">Kosigi</Typography>
                  </MenuItem>
                  <MenuItem value={"kudligi"}>
                    <Typography variant="h6">Kudligi</Typography>
                  </MenuItem>
                  <MenuItem value={"maddur"}>
                    <Typography variant="h6">Maddur</Typography>
                  </MenuItem>
                  <MenuItem value={"mahoba"}>
                    <Typography variant="h6">Mahoba</Typography>
                  </MenuItem>
                  <MenuItem value={"mankhera"}>
                    <Typography variant="h6">Mankhera</Typography>
                  </MenuItem>
                  <MenuItem value={"manthani"}>
                    <Typography variant="h6">Manthani</Typography>
                  </MenuItem>
                  <MenuItem value={"mothkur"}>
                    <Typography variant="h6">Mothkur</Typography>
                  </MenuItem>
                  <MenuItem value={"nangla"}>
                    <Typography variant="h6">Nangla</Typography>
                  </MenuItem>
                  <MenuItem value={"padmajiwadi"}>
                    <Typography variant="h6">Padmajiwadi</Typography>
                  </MenuItem>
                  <MenuItem value={"pattikonda"}>
                    <Typography variant="h6">Pattikonda</Typography>
                  </MenuItem>
                  <MenuItem value={"sadashivpet"}>
                    <Typography variant="h6">Sadashivpet</Typography>
                  </MenuItem>
                  <MenuItem value={"sandur"}>
                    <Typography variant="h6">Sandur</Typography>
                  </MenuItem>
                  <MenuItem value={"santhipuram"}>
                    <Typography variant="h6">Santhipuram</Typography>
                  </MenuItem>
                  <MenuItem value={"sidlaghatta"}>
                    <Typography variant="h6">Sidlaghatta</Typography>
                  </MenuItem>
                  <MenuItem value={"rayachoti"}>
                    <Typography variant="h6">Rayachoti</Typography>
                  </MenuItem> */}
                  {/* <MenuItem value={"sircilla"}>
                    <Typography variant="h6">Sircilla</Typography>
                  </MenuItem> */}
                  {/* <MenuItem value={"yemmiganur"}>
                    <Typography variant="h6">Yemmiganur</Typography>
                  </MenuItem> */}
                     <MenuItem value={"hukkeri"}>
                    <Typography variant="h6">Hukkeri</Typography>
                  </MenuItem>
                  {/* {JSON.parse(localStorage.getItem("siteNamesCaps")).map(
                    (site) => (
                      <MenuItem value={String(site).toLowerCase()}>
                        <Typography variant="h6">{site}</Typography>
                      </MenuItem>
                    )
                  )} */}
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
      {selectedSite && (
        <>
          <Card
            elevation={6}
            style={{
              width: "100%",
              height: "500px",
              marginTop: "1rem",
              paddingTop: ".5rem",
              paddingBottom: "3.5rem",
            }}
          >
            <Grid
              container
              justify="space-between"
              alignItems="flex-end"
              style={{ paddingInline: "2rem", marginBottom: ".5rem" }}
            >
              <Grid
                item
                style={{
                  visibility:
                    selectedSite !== "chittorgarh" ? "hidden" : "visible",
                }}
              >
                <Grid container alignItems="center">
                  <span>Selected block:&ensp;</span>
                  <FormControl style={{ minWidth: 20 }}>
                    <Select
                      labelId="block-bar-simple-select-label"
                      id="block-bar-simple-select"
                      value={selectedBarBlock}
                      label="Block"
                      onChange={handleBarBlockChange}
                      MenuProps={{ classes: { paper: classes.menuPaper } }}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      {Array.from(Array(33).keys()).map((element, index) => {
                        return (
                          <MenuItem key={index} value={Number(index + 2)}>
                            {Number(index + 2)}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

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
            <CustomBarChart
              data={barChartData}
              enableScroll={enableBarChartScroll}
              siteName={selectedSite}
            />
          </Card>

          <Card
            elevation={6}
            style={{
              width: "100%",
              height: "520px",
              marginTop: "2rem",
              paddingTop: ".5rem",
              paddingBottom: "3.5rem",
            }}
          >
            <Grid
              container
              justify="space-between"
              alignItems="flex-end"
              style={{ paddingInline: "2rem", marginBottom: ".5rem" }}
            >
              <Grid
                item
                style={{
                  visibility:
                    selectedSite !== "chittorgarh" ? "hidden" : "visible",
                }}
              >
                <Grid container justify="space-between" alignItems="center">
                  <span>Selected block:&ensp;</span>
                  <FormControl style={{ minWidth: 30 }}>
                    <Select
                      // labelId="block-line-simple-select-label"
                      id="block-line-simple-select"
                      value={selectedLineBlock}
                      label="Block"
                      onChange={handleLineBlockChange}
                      MenuProps={{ classes: { paper: classes.menuPaper } }}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      {Array.from(Array(33).keys()).map((element, index) => {
                        return (
                          <MenuItem key={index} value={Number(index + 2)}>
                            {Number(index + 2)}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid item>
                <label htmlFor="min">Scale Min: </label>
                <input
                  type="number"
                  onChange={handleMinChange}
                  id="min"
                  name="min"
                  placeholder="0.0"
                  step="0.1"
                  min="0.0"
                  max="0.9"
                  style={{
                    width: "3.5rem",
                    marginRight: ".25rem",
                  }}
                />
              </Grid>
            </Grid>
            <CustomLineChart data={lineChartData} />
          </Card>
        </>
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
