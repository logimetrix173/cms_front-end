import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { tempSitesBlocksInverters } from "../../../constants/SiteNamesY";
import MultiDropdown from "../../UI/MultiDropdown";
import { SERVER_URL } from "../../../constants/constants";
import InvertersTable from "./LogTable";
import SitesTable from "./LogTable";
import CustomSnackbar from "../../UI/CustomSnackbar";
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import SitesDropdown from "../../UI/SitesDropdown";
import { AppState } from "../../../AppContext";

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

export default function Logs({ refreshSiteEditTable }) {
  const classes = useStyles();
  const { setEnabledLinearProgress } = AppState();

  const [disabledViewBtn, setDisabledViewBtn] = useState(false);
  const siteNamesAndBlocks = JSON.parse(
    localStorage.getItem("siteNamesAndBlocks")
  );

  // if multiple sites, all blocks; if single site and multiple blocks, all inverters
  const [tableData, setTableData] = useState([]);
  const [tableDataCopy, setTableDataCopy] = useState([]);

  const [searchField, setSearchField] = useState("");

  const [selectedSites, setSelectedSites] = useState(siteNamesAndBlocks);

  const [disabledUpdateBtn, setDisabledUpdateBtn] = useState(false);

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    severity: "info",
    message: "snackbar",
  });

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

  const getSiteObjects = (names) => {
    return siteNamesAndBlocks.filter((element) => {
      let found = false;
      names.forEach((name) => {
        if (element.name === name) {
          found = true;
        }
      });
      return found;
    });
  };
  // console.log("114", selectedSites, siteNamesAndBlocks);
  const handleSitesChange = (event) => {
    const value = event.target.value;
    // console.log("value", value);

    if (value[value.length - 1] === "All") {
      setSelectedSites(
        selectedSites.length === siteNamesAndBlocks.length
          ? [{}]
          : siteNamesAndBlocks
      );
      return;
    }

    setSelectedSites(getSiteObjects(value));
  };

  const handleViewBtnClick = () => {
    fetchLogs();
  };

  const handleToggle = (bool) => {
    setSnackbarState((prevState) => ({ ...prevState, open: bool }));
  };

  const handleSearchFieldChange = (event) => {
    let value = event.target.value;
    setSearchField(value);
  };

  const getSiteIds = (sites) => {
   // return sites.map((element) => `'${element.id}'`);
     //this is for onlyd demo purpose 
     return sites.filter((site) => site.name === "Hukkeri").map((site) => site.name);
    };
  

  const fetchLogs = () => {
    // console.log(
    //   "date",
    //   selectedSites,
    //   fromDate.toLocaleString(),
    //   toDate.toLocaleString(),
    //   getSiteIds(selectedSites)
    // );
    setEnabledLinearProgress(true);
    setDisabledViewBtn(true);
    axios
      .post(SERVER_URL + "/errorlogs/errorlog", {
        email: localStorage.getItem("userEmail"),
        sites: getSiteIds(selectedSites),
        startTime: fromDate.getTime(),
        endTime: toDate.getTime(),
      })
      .then((response) => {
        // console.log(response.data);
        let isArray = Array.isArray(response.data);
        if (isArray) {
          setTableData(response.data);
          setTableDataCopy(response.data);
        } else {
          setTableData([]);
          setTableDataCopy([]);
        }
        setEnabledLinearProgress(false);
        setDisabledViewBtn(false);
      })
      .catch((err) => {
        console.log(err);
        setEnabledLinearProgress(false);
        setDisabledViewBtn(false);
      });
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleSearch = () => {
    if (searchField === "") {
      setTableData(tableDataCopy);
      return;
    }
    let ids = tableDataCopy.filter((element) =>
      String(element.site_id)
        .toLowerCase()
        .includes(String(searchField).toLowerCase())
    );
    let errorType = tableDataCopy.filter((element) =>
      String(element.error_type)
        .toLowerCase()
        .includes(String(searchField).toLowerCase())
    );
    setTableData([...ids, ...errorType]);
  };

  return (
    <>
      <Grid
        container
        justify="space-between"
        alignItems="flex-end"
        style={{ paddingRight: "1.5rem" }}
      >
        <Grid item>
          <Grid container alignItems="flex-end">
            <Grid item style={{ marginRight: "1rem" }}>
              <MultiDropdown
                label="Sites"
                handleChange={handleSitesChange}
                items={siteNamesAndBlocks}
                selectedItems={selectedSites}
              />
            </Grid>
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
            </Grid>
            <Grid item>
              <Button
                size="small"
                color="primary"
                variant="outlined"
                onClick={handleViewBtnClick}
              >
                View
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <TextField
            id="search"
            placeholder="Enter id or type"
            value={searchField}
            onChange={handleSearchFieldChange}
            style={{ maxWidth: "8rem", marginRight: ".5rem" }}
          />
          <Button variant="outlined" size="small" onClick={handleSearch}>
            Search
          </Button>
        </Grid>
      </Grid>

      <Grid container style={{ marginTop: ".5rem", paddingRight: "1rem" }}>
        <SitesTable data={tableData} />
      </Grid>

      <CustomSnackbar
        open={snackbarState.open}
        severity={snackbarState.severity}
        message={snackbarState.message}
        handleToggle={handleToggle}
      />
    </>
  );
}
