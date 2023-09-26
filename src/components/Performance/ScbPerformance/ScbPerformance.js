import React from "react";
import { Grid, Button, Tooltip, Card, Typography } from "@material-ui/core";
// import CustomDropdown from "../../UI/CustomDropdown";
import { tempSitesBlocksInverters } from "../../../constants/SiteNames";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { AppState } from "../../../AppContext";
import ScbSnackbar from "./ScbSnackbar";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import DateFnsUtils from "@date-io/date-fns";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import axios from "axios";
import { SERVER_URL } from "../../../constants/constants";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Dates from "./Dates";
import MultiDropdown from "../../UI/MultiDropdown";
import MultiDropdownSingle from "../../UI/MultiDropdownSingle";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  indeterminateColor: {
    color: "blue",
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
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 25,
    },
  },
};

// const tempSitesBlocksInverters = [
//   {
//     name: "Badisidd",
//     blocks: [{ name: "B01", inverters: [{ name: "I01" }] }],
//   },
// ];

const invertervalue = ["I01", "I02", "I03", "I04"];
// const names = [
//   "Oliver Hansen",
//   "Van Henry",
//   "April Tucker",
//   "Ralph Hubbard",
//   "Omar Alexander",
//   "Carlos Abbott",
//   "Miriam Wagner",
//   "Bradley Wilkerson",
//   "Virginia Andrews",
//   "Kelly Snyder",
// ];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function ScbPerformance() {
  const { enabledLinearProgress, setEnabledLinearProgress } = AppState();

  const [disabledViewBtn, setDisabledViewBtn] = useState(false);

  const classes = useStyles();

  const theme = useTheme();
  // const [personName, setPersonName] = React.useState(["Oliver Hansen"]);
  const [checked, setChecked] = useState(false);

  // const [fromDate, setFromDate] = useState(new Date(1657500309000));
  const [fromDate, setFromDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 4);
    date.setHours(0, 0, 1, 0);
    return date;
  });
  const [toDate, setToDate] = useState(() => {
    const date = new Date();
    date.setHours(23, 59, 59, 0);
    return date;
  });

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  // console.log(checked);

  const [data, setData] = useState([]);
  // const [siteError, setSiteError] = useState("");

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    severity: "info",
    message: "snackbar",
  });

  const handleToggle = (bool) => {
    setSnackbarState((prevState) => ({ ...prevState, open: bool }));
  };

  const [allSiteInverter, setAllSiteInverter] = useState(
    tempSitesBlocksInverters
  );

  const [selectedSite, setSelectedSite] = useState([allSiteInverter[0].name]);

  const siteNamesAndBlocks = JSON.parse(
    localStorage.getItem("siteNamesAndBlocks")
  );

  const getSites = (sites = siteNamesAndBlocks) => {
  
    //this is for onlyd demo purpose 
    return sites.filter((site) => site.name === "Hukkeri").map((site) => site.name);
  };  //   return sites.map((site) => site.name);
  // };

  const [siteOptions, setSiteOptions] = useState(getSites());

  const [selectedBlock, setSelectedBlock] = useState(
    allSiteInverter[0].blocks.map((block) => block.name)
  );

  // const [selectedInverter, setSelectedInverter] = useState([
  //   allSiteInverter[0].blocks[0].inverters[0],
  // ]);
  const [selectedInverter, setSelectedInverter] = useState(["I01"]);

  const [selected, setSelected] = useState([]);

  const fetchDropdownValues = () => {
    // console.log("fetch drop down values");
    // console.log("Hitting: ", SERVER_URL + "/manageinverters/inverters");
    axios.post(SERVER_URL + "/manageinverters/inverters").then((response) => {
      // console.log("======>", response.data);
      let sites = response.data.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      );
      // console.log("fetched sites", sites);

      setAllSiteInverter(sites);
      setSelectedSite(sites[0].name);
      setSelectedBlock(sites[0].blocks[0].name);
      // setSelectedInverter([sites[0].blocks[0].inverters[0]]);
      // setSelectedSiteForTable(sites[18].name);
      // setSelectedBlocksForTable(sites[18].blocks.map((block) => block.name));
      // setSelectedInverters([sites[18].blocks[0].inverters[0]]);
    });
  };

  // console.log("Allsites", allSiteInverter);
  // console.log("sites", selectedSite);
  // console.log("Block", selectedBlock);
  // console.log("Inverter", selectedInverter);

  useEffect(() => {
    fetchDropdownValues();
  }, []);

  const isAllSelected = allSiteInverter.find(
    (site) => site.name === selectedSite
  )
    ? allSiteInverter
        .find((site) => site.name === selectedSite)
        .blocks.map((block) => block.name)
    : [].length > 0 &&
      selectedInverter.length ===
        allSiteInverter.find((site) => site.name === selectedSite)
    ? allSiteInverter
        .find((site) => site.name === selectedSite)
        .blocks.map((block) => block.name)
    : [].length;

  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };

  const handleSiteChange = (event) => {
    let value = event.target.value;

    // if (value[value.length - 1] === "all") {
    //   setSelectedSites(
    //     selectedSites.length === sitesBlocksInverters.length
    //       ? []
    //       : sitesBlocksInverters.map((site) => site.name)
    //   );
    //   return;
    // }

    setSelectedSite(value);

    // if (value.length > 1) {
    //   setSelectedBlocks(["All"]);
    // } else {
    //   setSelectedBlocks(
    //     sitesBlocksInverters
    //       .find((site) => site.name === value[0])
    //       .blocks.map((block) => block.name)
    //   );
    // }

    let blocks = allSiteInverter
      .find((site) => site.name === value)
      .blocks.map((block) => block.name);
    let singleblock = blocks[0];
    setSelectedBlock(singleblock);
    // setSelectedBlock(
    //   allSiteInverter
    //     .find((site) => site.name === value)
    //     .blocks.map((block) => block.name)
    // );
    // setSelectedInverter(
    //   allSiteInverter
    //     .find((site) => site.name === value)
    //     .blocks.inverters.map((inv) => inv.name)
    // );
  };

  // const [selected, setSelected] = useState([]);
  // items = selectedItems, item = currennt selected item
  const isChecked = (items, item) => {
    let isChecked = false;
    items.forEach((element) => {
      if (element === item) {
        isChecked = true;
      }
    });
    return isChecked;
  };

  const handleBlockChange = (event) => {
    let value = event.target.value;

    // if (value[value.length - 1] === "all") {
    //   setSelectedBlock(
    //     selectedBlock.length ===
    //       allSiteInverter.find((site) => site.name === selectedSite).blocks
    //         .length
    //       ? []
    //       : allSiteInverter
    //           .find((site) => site.name === selectedSite)
    //           .blocks.map((block) => block.name)
    //   );
    //   return;
    // }

    setSelectedBlock(value);
  };

  const handleInverterChange = (event) => {
    let value = event.target.value.sort();

    if (value[value.length - 1] === "all") {
      // console.log("abc");
      if (selectedInverter.length === 0) {
        setSelectedInverter(getInverterOptions());
      } else {
        setSelectedInverter([]);
      }

      return;
    }
    setSelectedInverter(value);
    // setSelectedInverter(value.map((element) => ({ name: element })));
  };

  const setAndGetAll = (dropdown) => {
    // if (dropdown === 'inverters') {
    //     setSelectedInverters([])
    // } else {
    //     setSelectedBlocks([]);
    // }

    return [{ name: "All" }];
  };

  const handleViews = () => {
    // console.log(
    // "handleView"
    // selectedSite,
    // selectedBlock,
    // selectedInverter,
    // fromDate.getTime(),
    // toDate.getTime()
    // );
    // setSiteError("");
    setSnackbarState({ open: false });
    setEnabledLinearProgress(true);
    setDisabledViewBtn(true);

    // get cards data
    axios
      .post(SERVER_URL + "/scbPerformance/", {
        site: [selectedSite],
        block: [selectedBlock],
        // block: selectedSite.length > 1 ? ["all"] : selectedBlock,
        inverter: selectedInverter,
        // inverter:
        //   selectedBlocks.length > 1
        //     ? ["all"]
        //     : selectedInverters,
        startTime: fromDate.getTime(),
        endTime: toDate.getTime(),
      })
      .then((response) => {
        // console.log("scbPerformance", response);
        setEnabledLinearProgress(false);
        setDisabledViewBtn(false);

        // const data = response.data;
        // setMax(max);
        // setData(data);
        if (response.status === 200) {
          setData(response.data);
        } else {
          setSnackbarState({
            open: true,
            severity: "info",
            message: `${response.data}`,
          });
        }
      })
      .catch((err) => {
        setEnabledLinearProgress(false);
        setDisabledViewBtn(false);
        // console.log("error---->", err);
      });
  };
  // console.log(data);
  // const filteredValue = data.value?.filter((x) => x.value == 0);

  // console.log(filteredValue);

  const getColor = (row, max) => {
    // console.log("366", row, max);
    const num = Number(row.value);
    // console.log("368", num);
    // blue
    let color = "#1976d2";

    // red
    if (num < (max * 95) / 100) {
      color = "#d32f2f";
    }

    // green
    if (num === max) {
      color = "#4caf50";
    }

    return color;
  };

  const getInverterOptions = () => {
    let inverters = [];
    try {
      const site = allSiteInverter.find((site) => site.name === selectedSite);
      const block = site["blocks"].find(
        (block) => block.name === selectedBlock
      );
      const foundInveters = block?.inverters.map((inv) => inv.name);
      inverters = foundInveters.length > 0 ? foundInveters.sort() : [];
    } catch (error) {
      inverters = [];
    }
    return inverters;
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        style={{ marginTop: "-1rem" }}
      >
        <Grid item>
          <FormControl className={classes.formControl}>
            {/* <InputLabel id="demo-mutiple-name-label">Sites</InputLabel>
          <Select
            labelId="demo-mutiple-name-label"
            id="demo-mutiple-name"
            // multiple
            value={selectedSite}
            onChange={handleSiteChange}
            // input={<Input />}
            // MenuProps={MenuProps}
          >
            {selectedSite.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select> */}
            <InputLabel id="simple-select-label">Sites</InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={selectedSite}
              onChange={handleSiteChange}
              style={{ fontSize: ".8rem" }}
            >
              {/* {allSiteInverter.map((site) => site.name)} */}
              {siteOptions.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item style={{ marginRight: "0rem" }}>
          <FormControl className={classes.formControl}>
            <InputLabel id="simple-select-label">Blocks</InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={selectedBlock}
              onChange={handleBlockChange}
              style={{ fontSize: ".8rem", maxWidth: "4rem" }}
            >
              {/* {allSiteInverter.map((site) => site.name)} */}
              {(allSiteInverter.find((site) => site.name === selectedSite)
                ? allSiteInverter
                    .find((site) => site.name === selectedSite)
                    .blocks.map((block) => block.name)
                : []
              ).map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id={`Inverters-select-label`}>Inverters</InputLabel>

            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={selectedInverter}
              onChange={handleInverterChange}
              style={{ fontSize: ".8rem" }}
            >
              {/* {allSiteInverter.map((site) => site.name)} 
              {invertervalue.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid> */}
        <Grid
          item
          style={{
            marginLeft: "-3.5rem",
            marginTop: "0.5rem",
            marginRight: "1.8rem",
          }}
        >
          {/* <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-name-label">Inverters</InputLabel>
            <Select
              labelId="demo-mutiple-name-label"
              id="demo-mutiple-name"
              multiple
              value={selectedInverter}
              onChange={handleInverterChange}
              input={<Input />}
              MenuProps={MenuProps}
              style={{
                maxWidth: "6rem",
                fontSize: "0.8rem",
                minWidth: "3rem",
              }}
            >
              {invertervalue.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, personName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <MultiDropdownSingle
            label={"Inverter"}
            items={getInverterOptions()}
            handleChange={handleInverterChange}
            selectedItems={selectedInverter}
          />
        </Grid>
        {/* <Grid item>
          <MultiDropdown
            label={"Inverter"}
            items={
              selectedSite.length > 1 || selectedBlock.length > 1
                ? []
                : selectedSite[0].blocks[0].inverters
            }
            han
            dleChange={handleInverterChange}
            selectedItems={
              selectedSite.length > 1 || selectedBlock.length > 1
                ? setAndGetAll("inverters")
                : selectedInverter
            }
          />
        </Grid> */}
        <Grid
          item
          style={{
            marginLeft: "-2rem",
            marginRight: "1rem",
            marginTop: "0.5rem",
          }}
        >
          <Dates
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
          />
        </Grid>
        {/* <Grid
          item
          style={{
            marginLeft: "-2rem",
            marginRight: "1rem",
            marginTop: "0.5rem",
          }}
        >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Start Date"
              format="MM/dd/yyyy"
              value={fromDate}
              onChange={handleFromDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              InputProps={{
                style: {
                  fontSize: ".8rem",
                },
              }}
              style={{
                width: 140,
                marginBlock: 0,
                marginLeft: "1rem",
                padding: 0,
              }}
            />
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="End Date"
              format="MM/dd/yyyy"
              value={toDate}
              onChange={handleToDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              InputProps={{
                style: {
                  fontSize: ".8rem",
                },
              }}
              style={{
                width: 140,
                marginBlock: 0,
                marginLeft: "1rem",
                padding: 0,
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid> */}
        <Grid item style={{ marginTop: "1.3rem" }}>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={handleViews}
            // disabled={enabledLinearProgress}
            disabled={disabledViewBtn}
          >
            {disabledViewBtn ? "Loading" : "View"}
          </Button>
        </Grid>
        <Grid
          item
          style={{
            marginTop: "1rem",
            // paddingRight: "0rem",
            marginLeft: "auto",
          }}
        >
          <Checkbox
            // defaultChecked
            size="small"
            onClick={handleCheck}
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
          <small style={{ fontSize: "12px" }}>Hide 0 Values</small>
        </Grid>

        {/* <Grid container style={{ paddingRight: "1rem" }}>
        {data.map((day) => {
          let max = 0;
          day.data.forEach((el) => {
            if (Number(el.value) > max) {
              max = Number(el.value);
            }
          });
          return (
            <Grid container style={{ marginTop: "1rem" }} key={day.timestamp}>
              <Grid item style={{ marginRight: "1rem" }}>
                <Grid item>
                  <small style={{ fontSize: ".8rem" }}>{day.site}</small>
                  <br />
                  <small style={{ fontSize: ".8rem" }}>
                    {new Date(day.timestamp * 1000).toLocaleDateString()}
                  </small>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={1}>
                  {day.data.map((datum, index) => {
                    return (
                      <Grid item key={index}>
                        <Tooltip
                          title={
                            <span>
                              <span>{datum.techName}</span>
                              <br />
                              <span>{datum.techMob}</span>
                            </span>
                          }
                          placement="top"
                        >
                        <Card
                          style={{
                            width: 90,
                            padding: ".25rem",
                            borderBottom: "3px solid " + getColor(datum, max),

                            color: "#fff",
                          }}
                        >
                          <Grid container>
                            <Grid item xs={12}>
                              <small style={{ fontSize: ".75rem" }}>
                                Block: {datum.name}
                                SC:
                              </small>
                            </Grid>
                            <Grid item xs={12}>
                                <small style={{ fontSize: ".75rem" }}>
                                  Value: <strong>{datum.value}</strong>
                                </small>
                              </Grid>
                          </Grid>
                        </Card>
                        </Tooltip>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid> */}
      </Grid>
      <Grid container>
        <Grid item>
          {snackbarState.open === true ? (
            <ScbSnackbar
              open={snackbarState.open}
              severity={snackbarState.severity}
              message={snackbarState.message}
              handleToggle={handleToggle}
            />
          ) : (
            data.map((day) => {
              let max = 0;
              day.data.forEach((el) => {
                if (Number(el.value) > max) {
                  max = Number(el.value);
                }
              });
              return (
                <Grid
                  container
                  style={{ marginTop: "1rem" }}
                  key={day.timestamp}
                >
                  <Grid item style={{ marginRight: "1rem" }}>
                    <Grid item>
                      <small style={{ fontSize: ".8rem" }}>
                        {`${day.site} - ${day.inverter} `}
                      </small>
                      {/* <br /> */}
                      <small style={{ fontSize: ".8rem" }}>
                        {new Date(day.timestamp * 1000).toLocaleDateString()}
                      </small>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container spacing={1}>
                      {day.data
                        .filter((element) => {
                          if (element.value !== 0 && checked === true) {
                            //element.value !== 0 && !checked
                            return true;
                          } else if (checked === false) {
                            //checked === true
                            return true;
                          }
                        })
                        .map((datum, index) => {
                          return (
                            <Grid item key={index}>
                              <Card
                                style={{
                                  width: 90,
                                  padding: ".25rem",
                                  borderBottom:
                                    "3px solid " + getColor(datum, max),

                                  // color: "#fff",
                                }}
                              >
                                <Grid container>
                                  <Grid item xs={12}>
                                    <small style={{ fontSize: ".75rem" }}>
                                      INV SCB: {datum.name}
                                    </small>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <small style={{ fontSize: ".75rem" }}>
                                      Value: <strong>{datum.value}</strong>
                                    </small>
                                  </Grid>
                                </Grid>
                              </Card>
                            </Grid>
                          );
                        })}
                    </Grid>
                  </Grid>
                </Grid>
              );
            })
          )}
        </Grid>
      </Grid>
    </>
  );
}
