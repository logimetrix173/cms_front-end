import React, { useState, useEffect } from "react";
import "./SCB.css";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Card, Grid, Typography, Button } from "@material-ui/core";
import CustomBarChart from "../InverterEfficiency/CustomBarChart";
import CustomLineChart from "../InverterEfficiency/CustomLineChart";
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
import BiaxialLineChart from "../mlPredictions/BiaxialLineChart";
import CustomizedTable from "./CustomizedTable";
import CustomizedLineChart from "./CustomizedLineChart";
import Paper from "@material-ui/core/Paper";
import { AppState } from "../../AppContext";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  textField: {
    width: 150,
  },
}));

const formatCurrentOrEnergyDataForTable = (data, letter) => {
  // Current or Energy => coe
  let coeData = [];

  let pattern = "";
  if (letter === "i") {
    pattern = /i[1-9]|i[1][0-2]/;
  } else if (letter === "e") {
    pattern = /e[1-9]|e[1][0-2]/;
  }

  data.forEach((element) => {
    let elementArray = Object.entries(element);
    let coeValuesInRow = {};

    // key, value
    let maxCoeInRow = ["", null];

    elementArray.forEach((innerElement) => {
      if (innerElement[0].match(pattern)) {
        let numInnerElement = Number(innerElement[1]);
        if (maxCoeInRow[1] === null) {
          maxCoeInRow[0] = innerElement[0];
          maxCoeInRow[1] = numInnerElement;
        }
        if (maxCoeInRow[1] < innerElement[1]) {
          maxCoeInRow[0] = innerElement[0];
          maxCoeInRow[1] = numInnerElement;
        }
      }
    });

    elementArray.forEach((innerElement) => {
      if (innerElement[0].match(pattern)) {
        let numInnerElement = Number(innerElement[1]);
        if (numInnerElement < maxCoeInRow[1] - maxCoeInRow[1] * (5 / 100)) {
          // Values less than 95 percent of max current value
          coeValuesInRow[innerElement[0]] = [numInnerElement, "red"];
        } else {
          // Values greater than or equal to 95 percent of max current value
          coeValuesInRow[innerElement[0]] = [numInnerElement, "black"];
        }
      }
    });

    coeValuesInRow[maxCoeInRow[0]] = [maxCoeInRow[1], "green"];
    coeData.push(coeValuesInRow);
  });

  return coeData;
};

export default function SCBCustom({ handleSessionExpire }) {
  const classes = useStyles();
  const { setEnabledLinearProgress } = AppState();

  let source = axios.CancelToken.source();

  const userToken = localStorage.getItem("userToken");

  const [customizedTableData, setCustomizedTableData] = useState([]);

  const [customizedLineChartData, setCustomizedLineChartData] = useState([
    {
      time: "00:00",
      i1: 0,
      i2: 0,
      i3: 0,
      i4: 0,
      i5: 0,
      i6: 0,
      i7: 0,
      i8: 0,
      i9: 0,
      i10: 0,
      i11: 0,
      i12: 0,
      intertemp: 0,
    },
  ]);

  // States related to SCB
  const [selectedSite, setSelectedSite] = useState("Hukkeri");

  const [scb, setSCB] = useState(1);
  const [totalSCB, setTotalSCB] = useState(10);

  const [block, setBlock] = useState(1);
  const [totalBlocks, setTotalBlocks] = useState(6);

  const [inverter, setInverter] = useState(1);
  const [totalInverters, setTotalInverters] = useState(4);

  const [smb, setSMB] = useState(1);
  const [totalSMB, setTotalSMB] = useState(10);

  // For line chart
  const [leftYMin, setLeftYMin] = useState(0);

  // CSV
  const [enableExcelBtn, setEnableExcelBtn] = useState(true);

  // Energy CSV
  const [enableEnergyCSVBtn, setEnableEnergyCSVBtn] = useState(true);

  // Day energy csv
  const [enableDayEnergyCSVBtn, setEnableDayEnergyCSVBtn] = useState(true);

  let [currentDataForTable, setCurrentDataForTable] = useState([]);

  const handleLeftYMinChange = (event) => {
    setLeftYMin(Number(event.target.value));
  };

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
    let date = new Date();
    return getFromDate(date);
  });

  const [toDate, setToDate] = useState(() => {
    let date = new Date();
    return getToDate(date);
  });

  const handleFromDateChange = (date) => {
    setFromDate(getFromDate(date));
  };

  const handleToDateChange = (date) => {
    setToDate(getToDate(date));
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
    if (selectedSite === "Hukkeri") {
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

  /**
   * END of functions related to time component
   */

  const handleSiteChange = (event) => {
    setSelectedSite(event.target.value);
  };

  const handleBlockChange = (event) => {
    setBlock(event.target.value);
  };

  const handleInverterChange = (event) => {
    setInverter(event.target.value);
  };

  const handleSCBChange = (event) => {
    setSCB(event.target.value);
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
        console.log(error);
        // if (error.response.status === 401) {
        //   handleSessionExpire();
        // }
        if (error?.response?.status === 401) {
          handleSessionExpire();

          // setLogoutMsg(true);
        }
        setEnabledLinearProgress(false);
      });
  };

  const getCurrentDataForLineChart = (rawData) => {
    let lineChartData = [];
    rawData.forEach((element) => {
      const {
        i1,
        i2,
        i3,
        i4,
        i5,
        i6,
        i7,
        i8,
        i9,
        i10,
        i11,
        i12,
        intertemp,
        time,
      } = {
        ...element,
      };
      lineChartData.push({
        i1,
        i2,
        i3,
        i4,
        i5,
        i6,
        i7,
        i8,
        i9,
        i10,
        i11,
        i12,
        temperature: intertemp,
        time: String(time).split(" ")[1],
      });
    });
    return lineChartData.reverse();
  };

  const fetchData = (endTime, selectedSite) => {
    // console.log("Fetching data for ", selectedSite);
    setEnabledLinearProgress(true);

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
    getStatusAndTime(beginTime, newEndTime, selectedSite);

    // console.log(beginTime, new Date(newEndTime).toLocaleTimeString(), scb);

    // Fetch customized table data
    axios
      .post(
        SERVER_URL + "/" + selectedSite + "/scb",
        {
          fromDate: beginTime,
          endTime: newEndTime,
          block: "b0" + block,
          inverter: String(inverter),
          smb: String(scb),
        },
        {
          cancelToken: source.token,
          headers: {
            jwtToken: userToken,
          },
        }
      )
      .then((response) => {
        setCustomizedLineChartData(getCurrentDataForLineChart(response.data));
        let currentData = formatCurrentOrEnergyDataForTable(response.data, "i");
        // let energyData = formatCurrentOrEnergyDataForTable(response.data, "e");
        let formattedDataForTable = [];
        // Insert modified current data in table
        response.data.forEach((element, index) => {
          let row = { ...element, ...currentData[index] };
          formattedDataForTable.push(row);
        });
        setCustomizedTableData(formattedDataForTable);
        setEnabledLinearProgress(false);
      })
      .catch((error) => {
        console.log(error);
        // handleSessionExpire();
        if (error?.response?.status === 401) {
          // console.log(error.response, "401");
          handleSessionExpire();

          // setLogoutMsg(true);
        }
        setEnabledLinearProgress(false);
      });
  };

  const handleViewBtnClick = () => {
    fetchData(mainTime, selectedSite);
  };

  useEffect(() => {
    fetchData(mainTime, selectedSite);

    // Fetch data every 5 minutes
    const interval = setInterval(() => {
      fetchData(mainTime, selectedSite);
    }, 300000);

    return () => {
      clearInterval(interval);
      source.cancel();
    };
  }, [mainTime]);

  const getExcelFile = () => {
    setEnableExcelBtn(false);

    let fiveAM = new Date(mainTime);
    fiveAM.setHours(5, 0, 0, 0);
    let startTime = fiveAM.getTime();

    let newEndTime = null;
    if (isTimeReset) {
      newEndTime = Date.now();
    } else {
      newEndTime = mainTime;
    }

    axios
      .post(
        SERVER_URL + "/" + selectedSite + "/scb/excel",
        {
          fromDate: startTime,
          endTime: newEndTime,
          block: "b0" + block,
          inverter: inverter,
          smb: scb,
        },
        {
          cancelToken: source.token,
          headers: {
            jwtToken: userToken,
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
        let startDate = new Date(startTime);
        let endDate = new Date(mainTime);
        let filename = `SCB_${endDate.getDate()}_${
          endDate.getMonth() + 1
        }_${endDate.getFullYear()}.csv`;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        setEnableExcelBtn(true);
      })
      .catch((error) => {
        setEnableExcelBtn(true);
        if (error?.response?.status === 401) {
          // console.log(error.response, "401");
          handleSessionExpire();

          // setLogoutMsg(true);
        }
      });
  };

  const getEnergyCSV = () => {
    setEnableEnergyCSVBtn(false);
    setEnabledLinearProgress(true);

    // console.log("Custom Energy CSV");
    // console.log("To date", toDate.toLocaleString());

    axios
      .post(
        SERVER_URL + "/" + selectedSite + "/scb/energy/date",
        {
          fromDate: fromDate.getTime(),
          endDate: toDate.getTime(),
        },
        {
          cancelToken: source.token,
          headers: {
            jwtToken: userToken,
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
        // let endDate = new Date(mainTime);
        // let filename = `${selectedSite}_energy_${block}_${inverter}__${endDate.getDate()}_${
        //   endDate.getMonth() + 1
        // }_${endDate.getFullYear()}.csv`;
        let filename = `${selectedSite}_energy__${fromDate.getDate()}_${
          fromDate.getMonth() + 1
        }__${toDate.getDate()}_${toDate.getMonth() + 1}.csv`;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        setEnableEnergyCSVBtn(true);
        setEnabledLinearProgress(false);
      })
      .catch((error) => {
        setEnableEnergyCSVBtn(true);
        if (error?.response?.status === 401) {
          // console.log(error.response, "401");
          handleSessionExpire();

          // setLogoutMsg(true);
        }
        setEnabledLinearProgress(false);
      });
  };

  const getDayEnergyCSV = () => {
    setEnableDayEnergyCSVBtn(false);
    setEnabledLinearProgress(true);

    // console.log("Custom Day Energy CSV");
    // console.log("To date", toDate.toLocaleString());

    axios
      .post(
        SERVER_URL + "/" + selectedSite + "/scb/energy/datetodate",
        {
          fromDate: fromDate.getTime(),
          endDate: toDate.getTime(),
        },
        {
          cancelToken: source.token,
          headers: {
            jwtToken: userToken,
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
        // let endDate = new Date(mainTime);
        // let filename = `${selectedSite}_energy_${block}_${inverter}__${endDate.getDate()}_${
        //   endDate.getMonth() + 1
        // }_${endDate.getFullYear()}.csv`;
        let filename = `${selectedSite}_energy__${fromDate.getDate()}_${
          fromDate.getMonth() + 1
        }__${toDate.getDate()}_${toDate.getMonth() + 1}.csv`;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        setEnableDayEnergyCSVBtn(true);
        setEnabledLinearProgress(false);
      })
      .catch((error) => {
        setEnableDayEnergyCSVBtn(true);
        if (error?.response?.status === 401) {
          // console.log(error.response, "401");
          handleSessionExpire();

          // setLogoutMsg(true);
        }
        setEnabledLinearProgress(false);
      });
  };

  return (
    <div style={{ paddingTop: ".5rem", width: "90vw" }}>
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <Grid container alignItems="flex-end">
            <Grid item style={{ marginRight: "1rem" }}>
              <FormControl className={classes.siteFormControl}>
                <InputLabel id="site-select-label">Site</InputLabel>
                <Select
                  labelId="site-select-label"
                  id="site-select"
                  value={selectedSite}
                  onChange={handleSiteChange}
                >
                  <MenuItem value={"hukkeri"}>
                    <span>Hukkeri&ensp;</span>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid item style={{ marginRight: "1rem" }}>
              <FormControl className={classes.formControl}>
                <InputLabel id="block-select-label">Block</InputLabel>
                <Select
                  labelId="block-select-label"
                  id="block-select"
                  value={block}
                  onChange={handleBlockChange}
                >
                  {Array.from({ length: totalBlocks }, (_, i) => i + 1).map(
                    (element) => {
                      return (
                        <MenuItem value={element}>
                          <Typography variant="h6">{element}&ensp;</Typography>
                        </MenuItem>
                      );
                    }
                  )}
                </Select>
              </FormControl>
            </Grid> */}
            {/* <Grid item style={{ marginRight: "1rem" }}>
              <FormControl>
                <InputLabel id="inverter-select-label">Inverter</InputLabel>
                <Select
                  labelId="inverter-select-label"
                  id="inverter-select"
                  value={inverter}
                  onChange={handleInverterChange}
                >
                  {Array.from({ length: totalInverters }, (_, i) => i + 1).map(
                    (element) => {
                      return (
                        <MenuItem value={element}>
                          <Typography variant="h6">{element}&ensp;</Typography>
                        </MenuItem>
                      );
                    }
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item style={{ marginRight: "1rem" }}>
              <FormControl>
                <InputLabel id="scb-select-label">SCB</InputLabel>
                <Select
                  labelId="scb-select-label"
                  id="scb-select"
                  value={scb}
                  onChange={handleSCBChange}
                >
                  {Array.from({ length: totalSCB }, (_, i) => i + 1).map(
                    (element) => {
                      return (
                        <MenuItem value={element}>
                          <Typography variant="h6">{element}&ensp;</Typography>
                        </MenuItem>
                      );
                    }
                  )}
                </Select>
              </FormControl>
            </Grid> */}
            {/* <Grid item style={{ marginRight: ".5rem" }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleViewBtnClick}
              >
                View
              </Button>
            </Grid>
            <Grid item style={{ marginRight: ".5rem" }}>
              <Button
                variant="outlined"
                onClick={getExcelFile}
                disabled={!enableExcelBtn}
              >
                CSV
              </Button>
            </Grid> */}
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
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item style={{ marginRight: "1rem" }}>
              <Button
                variant="outlined"
                onClick={getEnergyCSV}
                disabled={!enableEnergyCSVBtn}
              >
                Energy CSV
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                onClick={getDayEnergyCSV}
                disabled={!enableDayEnergyCSVBtn}
              >
                Day Energy CSV
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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
    </div>
  );
}
