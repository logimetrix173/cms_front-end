import DateFnsUtils from "@date-io/date-fns";
import { Checkbox, Grid, ListItemText } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { CheckBox } from "@material-ui/icons";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import axios from "axios";
import "date-fns";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { SERVER_URL } from "../../constants/constants";
import { siteNamesAndBlocks } from "../../constants/SiteNamesY";
import { AppState } from "../../AppContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const BlockMenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 130,
    },
  },
};

export default function QuickCSV({ handleSessionExpire }) {
  const classes = useStyles();
  const theme = useTheme();

  const history = useHistory();
  const username = localStorage.getItem("username", "Admin");
  const userToken = localStorage.getItem("userToken");
  // const userId = localStorage.getItem('userId');

  const { setEnabledLinearProgress } = AppState();

  const [frequency, setFrequency] = useState("full");

  const handleFrequency = (event) => {
    let value = event.target.value;
    setFrequency(value);
  };

  // useEffect to check if user is logged in
  useEffect(() => {
    // console.log("useEffect for authorization");

    if (!userToken || userToken === "") {
      history.push("/login");
    }

    return () => {
      setEnabledLinearProgress(false);
    };
  }, []);

  // Selected site states
  const [selectedSite, setSelectedSite] = useState("Hukkeri");

  const getBlockNames = (siteName = selectedSite) => {
    if (siteName === "Banka N") {
      return [3, 4, 5, 6];
    }

    if (siteName === "Banka M") {
      return [1, 2, "MCR"];
    }

    let element = JSON.parse(localStorage.getItem("siteNamesAndBlocks")).find(
      (site) => {
        return site.name === siteName;
      }
    );

    return Array.from({ length: element.blocks[0] }, (v, i) => i + 1);
  };

  const [selectedBlock, setSelectedBlock] = useState(getBlockNames());
  const [isSiteSelected, setIsSiteSelected] = useState(true);

  const [displayDownloadExcelAlert, setDisplayDownloadExcelAlert] =
    useState(false);
  const [noDataFound, setNoDataFound] = useState(false);
  const [disabledDownloadExcelButton, setDisabledDownloadExcelButton] =
    useState(false);

  // From and To dates states for Excel
  const [excelFromDate, setExcelFromDate] = useState(() => {
    let prevDay = new Date();
    prevDay.setDate(new Date().getDate() - 1);
    prevDay.setHours(0, 0, 0, 0);
    return prevDay.getTime();
  });

  const [excelToDate, setExcelToDate] = useState(() => {
    let day = new Date();
    day.setHours(23, 59, 59, 999);
    return day.getTime();
  });

  const handleExcelFromDate = (date) => {
    let fromDate = new Date(date);
    let fromDateTime = fromDate.getTime();
    // console.log("From date by picker", fromDate);
    setExcelFromDate(fromDateTime);
  };

  const handleExcelToDate = (date) => {
    let toDate = new Date(date);
    toDate.setHours(23, 59, 59, 999);
    let toDateTime = toDate.getTime();
    // console.log("To date by picker", toDate);
    setExcelToDate(toDateTime);
  };

  const handleSiteChange = (event) => {
    setIsSiteSelected(true);
    setSelectedSite(event.target.value);
    // getBlockNames(event.target.value);
    setSelectedBlock(getBlockNames(event.target.value));
  };

  // const handleBlockChange = (event) => {
  //   setSelectedBlock(event.target.value);
  // };

  const handleBlockChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelectedBlock(
        selectedBlock.length === getBlockNames().length ? [] : getBlockNames()
      );
      return;
    }
    setSelectedBlock(value);
  };

  const handleDownloadExcelButtonClick = () => {
    if (selectedSite === "none") {
      try {
        setIsSiteSelected(false);
      } finally {
        return;
      }
    }

    // Reset alerts
    try {
      setIsSiteSelected(true);
      setDisabledDownloadExcelButton(true);
      setDisplayDownloadExcelAlert(false);
      setNoDataFound(false);
    } finally {
      let isDifferenceNegative = compareExcelDates(excelFromDate, excelToDate);

      if (isDifferenceNegative) {
        setDisplayDownloadExcelAlert(isDifferenceNegative);
        setDisabledDownloadExcelButton(false);
      } else {
        getCSV();
      }
    }
  };

  const getCSV = () => {
    // let blockNames = selectedBlock === 'all' ? getAllBlockNames() : selectedBlock !== 'mcr' ? ['B' + String(selectedBlock).padStart(2, 0)] : [selectedBlock];

    setEnabledLinearProgress(true);

    let blockNames = [];

    selectedBlock.forEach((element) => {
      if (element !== "MCR") {
        blockNames.push("B" + String(element).padStart(2, 0));
      } else {
        blockNames.push(element);
      }
    });

    axios
      .post(
        SERVER_URL + "/dumpcsv",
        {
          site: selectedSite,
          fromDate: new Date(excelFromDate).getTime(),
          toDate: new Date(excelToDate).getTime(),
          block: blockNames,
          frequency: frequency,
        },
        {
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
        let fromDate = new Date(excelFromDate);
        let toDate = new Date(excelToDate);
        let filename = `${selectedSite}_${selectedBlock}_${fromDate.getDate()}_${
          fromDate.getMonth() + 1
        }_${fromDate.getFullYear()}_${toDate.getDate()}_${
          toDate.getMonth() + 1
        }_${toDate.getFullYear()}.csv`;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        setDisabledDownloadExcelButton(false);
      })
      .catch((error) => {
        console.log(error);
        setEnabledLinearProgress(false);
        setNoDataFound(true);
        setDisabledDownloadExcelButton(false);
      });
  };

  const compareExcelDates = (from, to) => {
    let fromDate = new Date(from).getTime();
    let toDate = new Date(to).getTime();

    let differenceInTime = toDate - fromDate;

    // console.log(differenceInTime);

    if (differenceInTime >= 0) {
      return false;
    } else {
      return true;
    }
  };

  const getSiteNames = () => {
    let siteNames = localStorage.getItem("siteNames");
    // console.log("siteNames", siteNames);
    if (siteNames !== null) {
      let siteNamesArray = siteNames.split(",");
      // console.log(siteNamesArray);
      return siteNamesArray;
    }
  };

  const getAllBlockNames = (siteName = selectedSite) => {
    let element = JSON.parse(localStorage.getItem("siteNamesAndBlocks")).find(
      (site) => {
        return site.name === siteName;
      }
    );

    let blockNumbers = Array.from(
      { length: element.blocks[0] },
      (v, i) => i + 1
    );

    let blockNames = [];

    blockNumbers.forEach((element) => {
      blockNames.push("B" + String(element).padStart(2, 0));
    });

    return blockNames;
  };

  return (
    <div style={{ paddingTop: ".5rem" }}>
      <Grid container alignItems="center">
        <Grid item style={{ marginRight: "1rem" }}>
          <FormControl
            style={{
              width: "120px",
              textAlign: "left",
            }}
          >
            <InputLabel id="site-select-helper-label">Site</InputLabel>
            <Select
              labelId="site-select-helper-label"
              id="site-select-helper"
              value={selectedSite}
              onChange={handleSiteChange}
            >
              {/* <MenuItem value='none'>
                <em style={{ color: '#9e9e9e' }}>None</em>
              </MenuItem> */}
              {JSON.parse(localStorage.getItem("siteNamesAndBlocks")).map(
                (site) => (
                  <MenuItem key={site.name} value={site.name}>
                    {site.name}
                  </MenuItem>
                )
              )}
            </Select>
            {!isSiteSelected && (
              <FormHelperText>
                <span style={{ color: "red" }}>Select a site</span>
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item style={{ marginRight: "1rem" }}>
          <FormControl
            style={{
              maxWidth: "110px",
              // textAlign: 'left',
            }}
          >
            {/* <InputLabel id='site-select-helper-label'>Block</InputLabel>
            <Select
              labelId='site-select-helper-label'
              id='site-select-helper'
              value={selectedBlock}
              onChange={handleBlockChange}
            >
              {<MenuItem value={'all'} key={1}>All</MenuItem>}
              {getBlockNames().map((element, index) => {
                return (
                  <MenuItem key={index + 2} value={element}>{element}</MenuItem>
                )
              })}
            </Select> */}
            <InputLabel id="block-multiple-checkbox-label">Block</InputLabel>
            <Select
              labelId="block-multiple-checkbox-label"
              id="block-multiple-checkbox"
              multiple
              value={selectedBlock}
              onChange={handleBlockChange}
              // input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              // MenuProps={BlockMenuProps}
              MenuProps={{
                classes: { paper: classes.menuPaper },
                getContentAnchorEl: () => null,
              }}
            >
              <MenuItem key={"all"} value={"all"} style={{ paddingBlock: 0 }}>
                <Checkbox
                  size="small"
                  color="primary"
                  checked={
                    getBlockNames().length > 0 &&
                    selectedBlock.length === getBlockNames().length
                  }
                  indeterminate={
                    selectedBlock.length > 0 &&
                    selectedBlock.length < getBlockNames().length
                  }
                />
                <ListItemText primary={"All"} />
              </MenuItem>

              {getBlockNames().map((name) => (
                <MenuItem key={name} value={name} style={{ paddingBlock: 0 }}>
                  <Checkbox
                    size="small"
                    color="primary"
                    checked={selectedBlock.indexOf(name) > -1}
                  />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
            {!isSiteSelected && (
              <FormHelperText>
                <span style={{ color: "red" }}>Select a site</span>
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item style={{ marginRight: "1rem" }}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              style={{ width: "140px", marginRight: "1rem" }}
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              // margin='normal'
              id="from-date-picker-inline"
              label="From"
              value={excelFromDate}
              onChange={handleExcelFromDate}
              autoOk={true}
            />
            <KeyboardDatePicker
              style={{ width: "140px" }}
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              // margin='normal'
              id="to-date-picker-inline"
              label="To"
              value={excelToDate}
              onChange={handleExcelToDate}
              autoOk={true}
            />
          </MuiPickersUtilsProvider>
          <FormControl style={{ marginLeft: "1rem", maxWidth: "110px" }}>
            <InputLabel id="frequency-checkbox-label">Frequency</InputLabel>
            <Select
              labelId="frequency-checkbox-label"
              id="frequency-checkbox"
              value={frequency}
              onChange={handleFrequency}
            >
              <MenuItem key={"full"} value={"full"}>
                Full
              </MenuItem>
              <MenuItem key={"hourly"} value={"hourly"}>
                HR Avg
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleDownloadExcelButtonClick}
            disabled={disabledDownloadExcelButton}
            style={{ marginTop: ".75rem" }}
          >
            Download
          </Button>
        </Grid>
      </Grid>

      {displayDownloadExcelAlert && (
        <div
          style={{
            marginTop: "1rem",
          }}
        >
          <span style={{ color: "#ff9800", fontSize: "1rem" }}>
            Select larger 'To' date.
          </span>
        </div>
      )}
      {noDataFound && (
        <div
          style={{
            marginTop: "1rem",
          }}
        >
          <span style={{ color: "#ff9800", fontSize: "1rem" }}>
            No data found!
            <br />
            Try selecting different dates.
          </span>
        </div>
      )}
    </div>
  );
}
