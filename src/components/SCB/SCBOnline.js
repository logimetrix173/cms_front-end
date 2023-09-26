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

export default function SCBOnline({ handleSessionExpire }) {
  const classes = useStyles();

  let source = axios.CancelToken.source();

  const userToken = localStorage.getItem("userToken");

  const { setEnabledLinearProgress } = AppState();
  const [disabledViewBtn, setDisabledViewBtn] = useState(false);

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
  const [selectedSite, setSelectedSite] = useState("gadarpur");

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

  let [currentDataForTable, setCurrentDataForTable] = useState([]);

  const handleLeftYMinChange = (event) => {
    setLeftYMin(Number(event.target.value));
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

  useEffect(() => {
    return () => {
      setEnabledLinearProgress(false);
    };
  }, []);

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
        headers: {
          cancelToken: source.token,
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
          handleSessionExpire();
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
    setDisabledViewBtn(true);
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
        setDisabledViewBtn(false);
        setEnabledLinearProgress(false);
      })
      .catch((error) => {
        // console.log(error);
        if (error?.response?.status === 401) {
          handleSessionExpire();
        }
        // handleSessionExpire();
        setDisabledViewBtn(false);
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
    setEnabledLinearProgress(true);
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
        setEnabledLinearProgress(false);
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
        setEnabledLinearProgress(false);
        setEnableExcelBtn(true);
      });
  };

  const getEnergyCSV = () => {
    setEnabledLinearProgress(true);
    setEnableEnergyCSVBtn(false);

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
        SERVER_URL + "/" + selectedSite + "/scb/energy",
        {
          fromDate: startTime,
          endTime: newEndTime,
          block: "b0" + block,
          inverter: inverter,
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
        setEnabledLinearProgress(false);
        const downloadUrl = window.URL.createObjectURL(
          new Blob([response.data])
        );
        const link = document.createElement("a");
        link.href = downloadUrl;
        let endDate = new Date(mainTime);
        let filename = `Energy_export_${block}_${inverter}__${endDate.getDate()}_${
          endDate.getMonth() + 1
        }_${endDate.getFullYear()}.csv`;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        setEnableEnergyCSVBtn(true);
      })
      .catch((error) => {
        setEnabledLinearProgress(false);
        setEnableEnergyCSVBtn(true);
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
                  <MenuItem value={"gadarpur"}>
                    <span>Hukkeri&ensp;</span>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item style={{ marginRight: "1rem" }}>
              <FormControl className={classes.formControl}>
                <InputLabel id="block-select-label">Block</InputLabel>
                <Select
                  labelId="block-select-label"
                  id="block-select"
                  value={block}
                  onChange={handleBlockChange}
                >
                  {Array.from({ length: totalBlocks }, (_, i) => i + 1).map(
                    (element, index) => {
                      return (
                        <MenuItem key={index} value={element}>
                          <span>{element}&ensp;</span>
                        </MenuItem>
                      );
                    }
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item style={{ marginRight: "1rem" }}>
              <FormControl>
                <InputLabel id="inverter-select-label">Inverter</InputLabel>
                <Select
                  labelId="inverter-select-label"
                  id="inverter-select"
                  value={inverter}
                  onChange={handleInverterChange}
                >
                  {Array.from({ length: totalInverters }, (_, i) => i + 1).map(
                    (element, index) => {
                      return (
                        <MenuItem key={index} value={element}>
                          <span variant="h6">{element}&ensp;</span>
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
                          <span variant="h6">{element}&ensp;</span>
                        </MenuItem>
                      );
                    }
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item style={{ marginRight: ".5rem" }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleViewBtnClick}
                disabled={disabledViewBtn}
              >
                {disabledViewBtn ? "Loading" : "View"}
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
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                onClick={getEnergyCSV}
                disabled={!enableEnergyCSVBtn}
              >
                Energy CSV
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container alignItems="center">
            <Grid item style={{ marginRight: "2rem" }}>
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
            <Grid item style={{ paddingRight: "0rem", marginRight: "1rem" }}>
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
      <div style={{ marginBlock: "1.5rem" }}></div>
      {selectedSite && (
        <div>
          <Paper
            style={{
              paddingTop: "1rem",
              paddingBottom: ".5rem",
            }}
          >
            {/* <div
              style={{
                textAlign: "right",
                marginRight: "2rem",
                marginBottom: ".5rem",
              }}
            >
              <label htmlFor="min">Scale Min: </label>
              <input
                type="number"
                onChange={handleLeftYMinChange}
                id="min"
                name="min"
                placeholder="0"
                step="1"
                min="0"
                max="12"
                style={{
                  width: "3rem",
                }}
              />
            </div> */}
            <div style={{ height: "400px" }}>
              <CustomizedLineChart
                data={customizedLineChartData}
                lines={12}
                interval={12}
                leftAxisY={[leftYMin, 18]}
                rightAxisY={[0, 64]}
              />
            </div>
          </Paper>
          <div style={{ marginBlock: "1.75rem" }}></div>
          <CustomizedTable data={customizedTableData} />
        </div>
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
      <div style={{ marginBottom: "1.5rem" }}></div>
    </div>
  );
}
