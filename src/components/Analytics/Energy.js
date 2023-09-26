import React, { useState, useEffect } from "react";
// import "./SCB.css";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Card, Grid, Typography, Button } from "@material-ui/core";

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
// import CustomDiagram from "./CustomDiagram";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  textField: {
    width: 140,
  },
}));

const EquipmentOptions = ({
  equipment,
  handleEquipmentChange,
  equipmentKey,
}) => {
  return (
    <Select
      labelId="equipment-select-label"
      id="equipment-select"
      value={equipment}
      onChange={(event) => handleEquipmentChange(event, equipmentKey)}
    >
      {/* <MenuItem value={"energy_meter"}>
      <span>Energy Meter&ensp;</span>
    </MenuItem> */}
      <MenuItem value={"none"}>
        <span>Select&ensp;</span>
      </MenuItem>
      <MenuItem value={"icogem"}>
        <span>ICOG EM&ensp;</span>
      </MenuItem>
      <MenuItem value={"invTotal"}>
        <span>Inverter&ensp;</span>
      </MenuItem>
      <MenuItem value={"invStringTotal"}>
        <span>Inverter String&ensp;</span>
      </MenuItem>
      <MenuItem value={"mcrem"}>
        <span>MCR EM&ensp;</span>
      </MenuItem>
      <MenuItem value={"scbTotal"}>
        <span>SCB&ensp;</span>
      </MenuItem>
      <MenuItem value={"stringTotal"}>
        <span>String&ensp;</span>
      </MenuItem>
    </Select>
  );
};

const getTitle = (value1, value2) => {
  let title1 = "";
  let title2 = "";
  switch (value1) {
    case "icogem":
      title1 = "ICOG EM";
      break;
    case "invTotal":
      title1 = "Inverter";
      break;
    case "invStringTotal":
      title1 = "Inverter String";
      break;
    case "mcrem":
      title1 = "MCR EM";
      break;
    case "scbTotal":
      title1 = "SCB";
      break;
    case "stringTotal":
      title1 = "String";
      break;
    default:
      title1 = "";
  }

  switch (value2) {
    case "icogem":
      title2 = "ICOG EM";
      break;
    case "invTotal":
      title2 = "Inverter";
      break;
    case "invStringTotal":
      title2 = "Inverter String";
      break;
    case "mcrem":
      title2 = "MCR EM";
      break;
    case "scbTotal":
      title2 = "SCB";
      break;
    case "stringTotal":
      title2 = "String";
      break;
    default:
      title2 = "";
  }

  return `Difference between ${title1} and ${title2}`;
};

export default function Energy({ handleSessionExpire }) {
  const classes = useStyles();

  const { setEnabledLinearProgress } = AppState();

  const userToken = localStorage.getItem("userToken");

  const [selectedSite, setSelectedSite] = useState("gadarpur");
  const [block, setBlock] = useState(1);

  const [location, setLocation] = useState(1);
  const [equipment, setEquipment] = useState({
    equipment1: "none",
    equipment2: "none",
    equipment3: "none",
    equipment4: "none",
    equipment5: "none",
  });
  const [parameter, setParameter] = useState("a");

  const [energyData, setEnergyData] = useState();

  const fetchEnergyData = (fromDate, toDate, site, location) => {
    // console.log(site, location, new Date(fromDate).toLocaleString(), new Date(toDate).toLocaleString());
    setEnabledLinearProgress(true);
    axios
      .post(
        SERVER_URL + "/scbanalytics/logs",
        {
          site: site,
          location: "b" + String(location).padStart(2, 0),
          fromDate: fromDate,
          toDate: toDate,
        },
        { headers: { jwtToken: localStorage.getItem("userToken") } }
      )
      .then((response) => {
        // console.log('scb analytics', response.data);
        setEnergyData((prevState) => {
          return { ...response.data, none: 0 };
        });
        setEnabledLinearProgress(false);
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          handleSessionExpire();
        }
        setEnabledLinearProgress(false);
      });
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    fetchEnergyData(
      fromDate.getTime(),
      toDate.getTime(),
      selectedSite,
      event.target.value
    );
  };

  const handleBlockChange = (event) => {
    setBlock(event.target.value);
  };

  const handleEquipmentChange = (event, equipmentKey) => {
    setEquipment((prevState) => ({
      ...prevState,
      [equipmentKey]: event.target.value,
    }));
  };

  const handleParameterChange = (event) => {
    setParameter(event.target.value);
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
    fetchEnergyData(date.getTime(), toDate.getTime(), selectedSite, location);
  };

  const handleToDateChange = (date) => {
    setToDate(getToDate(date));
    fetchEnergyData(fromDate.getTime(), date.getTime(), selectedSite, location);
  };

  /**
   * END of functions related to time component
   */

  const handleSiteChange = (event) => {
    setSelectedSite(event.target.value);
    fetchEnergyData(
      fromDate.getTime(),
      toDate.getTime(),
      event.target.value,
      location
    );
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
        if (error.response.status === 401) {
          handleSessionExpire();
        }
        setEnabledLinearProgress(false);
      });
  };

  const fetchData = (endTime, selectedSite) => {
    // console.log("Fetching data for ", selectedSite);

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

    // Fetch customized table data
    axios
      .post(
        SERVER_URL + "/" + selectedSite + "/scb",
        {
          fromDate: beginTime,
          endTime: newEndTime,
          block: "b0" + block,
        },
        {
          headers: {
            jwtToken: userToken,
          },
        }
      )
      .then((response) => {})
      .catch((error) => {
        // console.log(error);
        // handleSessionExpire();
        if (error?.response?.status === 401) {
          handleSessionExpire();
        }
      });

    fetchEnergyData(
      fromDate.getTime(),
      toDate.getTime(),
      selectedSite,
      location
    );
  };

  const handleViewBtnClick = () => {
    fetchData(mainTime, selectedSite);
  };

  useEffect(() => {
    fetchData(mainTime, selectedSite);

    // // Fetch data every 5 minutes
    // const interval = setInterval(() => {
    //   fetchData(mainTime, selectedSite);
    // }, 300000);

    // return () => {
    //   clearInterval(interval);
    // };
  }, [mainTime]);

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

  const EquipmentBox = ({ value, equipmentKey, customId }) => {
    // console.log('analytics energy equipment key', equipmentKey, customId);

    if (!energyData) {
      return (
        <div style={{ height: "250px" }}>
          <div
            style={{
              marginTop: "1.5rem",
              border: "1px solid lightblue",
              borderRadius: "5px",
              padding: ".5rem",
              textAlign: "center",
            }}
            id={customId}
          >
            {Number(value)
              .toFixed(2)
              .replace(/[.,]00$/, "")}
          </div>
        </div>
      );
    }

    let invEnergy = Object.entries(energyData.invEnergy);

    switch (equipmentKey) {
      case "none":
        return (
          <div style={{ height: "250px" }}>
            <div
              style={{
                marginTop: "1.5rem",
                border: "1px solid lightblue",
                borderRadius: "5px",
                padding: ".5rem",
                textAlign: "center",
              }}
              id={customId}
            >
              {value}
            </div>
          </div>
        );
      case "icogem":
        return (
          <div style={{ height: "250px" }}>
            <div
              style={{
                marginTop: "1.5rem",
                border: "1px solid lightblue",
                borderRadius: "5px",
                padding: ".5rem",
                textAlign: "center",
              }}
              id={customId}
            >
              {value}
            </div>
          </div>
        );
      case "mcrem":
        return (
          <div style={{ height: "250px" }}>
            <div
              style={{
                marginTop: "1.5rem",
                border: "1px solid lightblue",
                borderRadius: "5px",
                padding: ".5rem",
                textAlign: "center",
              }}
              id={customId}
            >
              {value}
            </div>
          </div>
        );
      case "invTotal":
        // console.log(invEnergy)
        return (
          <div
            style={{
              marginTop: "1.5rem",
              border: "1px solid lightblue",
              borderRadius: "5px",
              padding: ".5rem",
              textAlign: "left",
              height: "250px",
              overflowY: "scroll",
            }}
            id={customId}
          >
            <div>
              Total: <span style={{ color: "blue" }}>{value}</span>
            </div>
            {invEnergy.map((element) => {
              return (
                <div>
                  {element[0]}:{" "}
                  <span style={{ color: "blue" }}>
                    {Number(element[1]["invEnergy"])
                      .toFixed(2)
                      .replace(/[.,]00$/, "")}
                  </span>
                </div>
              );
            })}
          </div>
        );
      case "invStringTotal":
        return (
          <div
            style={{
              marginTop: "1.5rem",
              border: "1px solid lightblue",
              borderRadius: "5px",
              padding: ".5rem",
              textAlign: "left",
              height: "250px",
              overflowY: "scroll",
            }}
            id={customId}
          >
            <div>
              Total: <span style={{ color: "blue" }}>{value}</span>
            </div>
            {invEnergy.map((element) => {
              let invString = Object.entries(element[1]["invString"]);
              return invString.map((innerEl) => {
                return (
                  <div>
                    {element[0]}, {innerEl[0]}:{" "}
                    <span style={{ color: "blue" }}>
                      {Number(innerEl[1])
                        .toFixed(2)
                        .replace(/[.,]00$/, "")}
                    </span>
                  </div>
                );
              });
            })}
          </div>
        );
      case "scbTotal":
        return (
          <div
            style={{
              marginTop: "1.5rem",
              border: "1px solid lightblue",
              borderRadius: "5px",
              padding: ".5rem",
              textAlign: "left",
              height: "250px",
              overflowY: "scroll",
            }}
            id={customId}
          >
            <div>
              Total: <span style={{ color: "blue" }}>{value}</span>
            </div>
            {invEnergy.map((element) => {
              let scbEnergy = Object.entries(element[1]["scbEnergy"]);
              return scbEnergy.map((innerEl) => {
                return (
                  <div>
                    {element[0]}, {innerEl[0]}:{" "}
                    <span style={{ color: "blue" }}>
                      {Number(innerEl[1]["scbEnergy"])}
                    </span>
                  </div>
                );
              });
            })}
          </div>
        );
      case "stringTotal":
        return (
          <div
            style={{
              marginTop: "1.5rem",
              border: "1px solid lightblue",
              borderRadius: "5px",
              padding: ".5rem",
              textAlign: "left",
              height: "250px",
              overflowY: "scroll",
            }}
            id={customId}
          >
            <div>
              Total: <span style={{ color: "blue" }}>{value}</span>
            </div>
            {invEnergy.map((element) => {
              let scbEnergy = Object.entries(element[1]["scbEnergy"]);
              return scbEnergy.map((innerEl) => {
                // return (<div>{element[0]}, {innerEl[0]}: {innerEl[1]['scbTotalEnergy']}</div>)
                let insideInnerEl = Object.entries(innerEl[1]);
                return insideInnerEl.map((e, i) => {
                  if (e[0].startsWith("e")) {
                    return (
                      <div>
                        {element[0]}, {innerEl[0]}, string {e[0].slice(1)}:{" "}
                        <span style={{ color: "blue" }}>
                          {Number(e[1])
                            .toFixed(2)
                            .replace(/[.,]00$/, "")}
                        </span>
                      </div>
                    );
                  }
                });
              });
            })}
          </div>
        );
      default:
        return (
          <div
            style={{
              marginTop: "1.5rem",
              border: "1px solid lightblue",
              borderRadius: "5px",
              padding: ".5rem",
              textAlign: "center",
              maxHeight: "250px",
            }}
            id={customId}
          >
            <span style={{ color: "blue" }}>{value}</span>
          </div>
        );
    }
  };

  useEffect(() => {
    let equipment1 = document.getElementById("equipment1");
    // console.log('equipment1', equipment1.getBoundingClientRect());
  }, []);

  const getTopPosition = (labelId) => {
    let label = document.getElementById(labelId);
    if (label) {
      let labelRect = label.getBoundingClientRect();
      return Math.round(labelRect.y - 5) + "px";
    } else {
      return "0px";
    }
  };

  const getLeftPosition = (element1Id, element2Id, differenceElId) => {
    let element1 = document.getElementById(element1Id);
    let element2 = document.getElementById(element2Id);
    let differenceEl = document.getElementById(differenceElId);
    if (element1 && element2 && differenceEl) {
      let element1Rect = element1.getBoundingClientRect();
      let element2Rect = element2.getBoundingClientRect();
      let differenceElRect = differenceEl.getBoundingClientRect();
      let leftPosition =
        element1Rect.x +
        element1Rect.width +
        (element2Rect.x - (element1Rect.x + element1Rect.width)) / 2 -
        differenceElRect.width / 2;
      // console.log('leftPosition', leftPosition);
      return Math.round(leftPosition) + "px";
    } else {
      return "0px";
    }
  };

  return (
    <div style={{ marginTop: ".25rem", width: "90vw" }}>
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
            {/* <Grid item style={{ marginRight: "1rem" }}>
              <FormControl className={classes.formControl}>
                <InputLabel id="block-select-label">Block</InputLabel>
                <Select
                  labelId="block-select-label"
                  id="block-select"
                  value={block}
                  onChange={handleBlockChange}
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map(
                    (element) => {
                      return (
                        <MenuItem value={element}>
                          <span>{element}&ensp;</span>
                        </MenuItem>
                      );
                    }
                  )}
                </Select>
              </FormControl>
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
            <Grid item>
              <FormControl className={classes.siteFormControl}>
                <InputLabel id="location-select-label">Location</InputLabel>
                <Select
                  labelId="location-select-label"
                  id="location-select"
                  value={location}
                  onChange={handleLocationChange}
                >
                  <MenuItem value={1}>
                    <span>B01&ensp;</span>
                  </MenuItem>
                  <MenuItem value={2}>
                    <span>B02&ensp;</span>
                  </MenuItem>
                  <MenuItem value={3}>
                    <span>B03&ensp;</span>
                  </MenuItem>
                  <MenuItem value={4}>
                    <span>B04&ensp;</span>
                  </MenuItem>
                  <MenuItem value={5}>
                    <span>B05&ensp;</span>
                  </MenuItem>
                  <MenuItem value={6}>
                    <span>B06&ensp;</span>
                  </MenuItem>
                </Select>
              </FormControl>
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
      <Grid
        container
        style={{ marginTop: ".75rem" }}
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <div>
            <strong>Equipments :</strong>
          </div>

          <div style={{ marginTop: "1.5rem", height: "250px" }}>Values : </div>
        </Grid>

        <Grid item style={{ marginTop: "0rem" }}>
          <FormControl className={classes.siteFormControl}>
            {/* <InputLabel id="equipment-select-label">Equipment</InputLabel> */}
            <EquipmentOptions
              equipmentKey="equipment1"
              equipment={equipment.equipment1}
              handleEquipmentChange={handleEquipmentChange}
            />
          </FormControl>
          <EquipmentBox
            customId="equipment1"
            equipmentKey={equipment.equipment1}
            value={
              energyData
                ? Number(energyData[equipment.equipment1])
                    .toFixed(2)
                    .replace(/[.,]00$/, "")
                : "Loading..."
            }
          />
        </Grid>

        <Grid item style={{ marginTop: "0rem" }}>
          <FormControl className={classes.siteFormControl}>
            {/* <InputLabel id="equipment-select-label">Equipment</InputLabel> */}
            <EquipmentOptions
              equipmentKey="equipment2"
              equipment={equipment.equipment2}
              handleEquipmentChange={handleEquipmentChange}
            />
          </FormControl>
          <EquipmentBox
            customId="equipment2"
            equipmentKey={equipment.equipment2}
            value={
              energyData
                ? Number(energyData[equipment.equipment2])
                    .toFixed(2)
                    .replace(/[.,]00$/, "")
                : "Loading..."
            }
          />
        </Grid>

        <Grid item style={{ marginTop: "0rem" }}>
          <FormControl className={classes.siteFormControl}>
            {/* <InputLabel id="equipment-select-label">Equipment</InputLabel> */}
            <EquipmentOptions
              equipmentKey="equipment3"
              equipment={equipment.equipment3}
              handleEquipmentChange={handleEquipmentChange}
            />
          </FormControl>
          <EquipmentBox
            customId="equipment3"
            equipmentKey={equipment.equipment3}
            value={
              energyData
                ? Number(energyData[equipment.equipment3])
                    .toFixed(2)
                    .replace(/[.,]00$/, "")
                : "Loading..."
            }
          />
        </Grid>

        <Grid item style={{ marginTop: "0rem" }}>
          <FormControl className={classes.siteFormControl}>
            {/* <InputLabel id="equipment-select-label">Equipment</InputLabel> */}
            <EquipmentOptions
              equipmentKey="equipment4"
              equipment={equipment.equipment4}
              handleEquipmentChange={handleEquipmentChange}
            />
          </FormControl>
          <EquipmentBox
            customId="equipment4"
            equipmentKey={equipment.equipment4}
            value={
              energyData
                ? Number(energyData[equipment.equipment4])
                    .toFixed(2)
                    .replace(/[.,]00$/, "")
                : "Loading..."
            }
          />
        </Grid>

        <Grid item style={{ marginTop: "0rem", paddingRight: "2rem" }}>
          <FormControl className={classes.siteFormControl}>
            {/* <InputLabel id="equipment-select-label">Equipment</InputLabel> */}
            <EquipmentOptions
              equipmentKey="equipment5"
              equipment={equipment.equipment5}
              handleEquipmentChange={handleEquipmentChange}
            />
          </FormControl>
          <EquipmentBox
            customId="equipment5"
            equipmentKey={equipment.equipment5}
            value={
              energyData
                ? Number(energyData[equipment.equipment5])
                    .toFixed(2)
                    .replace(/[.,]00$/, "")
                : "Loading..."
            }
          />
        </Grid>
      </Grid>
      <Grid
        container
        style={{ marginTop: "2rem" }}
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <span id="differencesLabel">Differences : </span>
        </Grid>

        <Grid item>
          <div
            id="difference1"
            title={getTitle(equipment.equipment1, equipment.equipment2)}
            style={{
              position: "absolute",
              left: getLeftPosition("equipment1", "equipment2", "difference1"),
              top: getTopPosition("differencesLabel"),
              minWidth: "100px",
              border: "1px solid orange",
              borderRadius: "5px",
              padding: ".5rem",
              textAlign: "center",
            }}
          >
            {energyData
              ? calculateDifference(
                  energyData[equipment.equipment2],
                  energyData[equipment.equipment1]
                )
              : "Loading..."}
          </div>
        </Grid>

        <Grid item>
          <div
            id="difference2"
            title={getTitle(equipment.equipment2, equipment.equipment3)}
            style={{
              position: "absolute",
              left: getLeftPosition("equipment2", "equipment3", "difference2"),
              top: getTopPosition("differencesLabel"),
              minWidth: "100px",
              border: "1px solid orange",
              borderRadius: "5px",
              padding: ".5rem",
              textAlign: "center",
            }}
          >
            {energyData
              ? calculateDifference(
                  energyData[equipment.equipment3],
                  energyData[equipment.equipment2]
                )
              : "Loading..."}
          </div>
        </Grid>
        <Grid item>
          <div
            id="difference3"
            title={getTitle(equipment.equipment3, equipment.equipment4)}
            style={{
              position: "absolute",
              left: getLeftPosition("equipment3", "equipment4", "difference3"),
              top: getTopPosition("differencesLabel"),
              minWidth: "100px",
              border: "1px solid orange",
              borderRadius: "5px",
              padding: ".5rem",
              textAlign: "center",
            }}
          >
            {energyData
              ? calculateDifference(
                  energyData[equipment.equipment4],
                  energyData[equipment.equipment3]
                )
              : "Loading..."}
          </div>
        </Grid>
        <Grid item>
          <div
            title={getTitle(equipment.equipment4, equipment.equipment5)}
            id="difference4"
            style={{
              position: "absolute",
              left: getLeftPosition("equipment4", "equipment5", "difference4"),
              top: getTopPosition("differencesLabel"),
              minWidth: "100px",
              border: "1px solid orange",
              borderRadius: "5px",
              padding: ".5rem",
              textAlign: "center",
            }}
          >
            {energyData
              ? calculateDifference(
                  energyData[equipment.equipment5],
                  energyData[equipment.equipment4]
                )
              : "Loading..."}
          </div>
        </Grid>
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
