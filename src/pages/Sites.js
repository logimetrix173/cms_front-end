import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import SignalCellularConnectedNoInternet0BarIcon from "@material-ui/icons/SignalCellularConnectedNoInternet0Bar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../constants/constants";
import Link from "@material-ui/core/Link";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  TableSortLabel,
} from "@material-ui/core";
import Comparison from "../components/Comparison/Comparison";
import NoteDialog from "../components/Badisidd/NoteDialog";
import { AppState } from "../AppContext";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#ffbf80",
    color: theme.palette.common.black,
    fontSize: 16,
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  tableContainer: { maxHeight: "83vh" },
});

export default function Sites({
  handleSiteClickInParent,
  handleSessionExpire,
  setOpen,
  setShowNotemsg,
  open,
}) {
  const classes = useStyles();
  const { setEnabledLinearProgress } = AppState();

  let source = axios.CancelToken.source();
  //Show note features
  // const [notesite, setNotesite] = useState("Badisidd");

  // const [open, setOpen] = React.useState(false);
  // const [alertopen, setAlertopen] = React.useState(false);

  const serverUrl = SERVER_URL + "/dashboard/sites";

  const [sortBy, setSortBy] = useState({ header: "name", order: "asc" });

  // Sites details state
  const [sitesArray, setSitesArray] = useState([
    {
      name: "Loading...",
      ip: "None",
      capacity: "0",
      status: 0,
      time: 0,
      powerGeneration: 0,
      GHI: "0.00",
      GTI: "0.00",
      moduleTemp: "0.00",
      network: false,
    },
  ]);

  const sortValues = (data, header, order) => {
    let sortedSitesArray = [];
    if (order === "asc") {
      sortedSitesArray = data.sort((a, b) => {
        if (header !== "name") {
          return Number(a[header]) > Number(b[header])
            ? 1
            : Number(b[header]) > Number(a[header])
            ? -1
            : 0;
        } else {
          return a[header] > b[header] ? 1 : b[header] > a[header] ? -1 : 0;
        }
      });
    } else {
      sortedSitesArray = data.sort((a, b) => {
        if (header !== "name") {
          return Number(a[header]) < Number(b[header])
            ? 1
            : Number(b[header]) < Number(a[header])
            ? -1
            : 0;
        } else {
          return a[header] < b[header] ? 1 : b[header] < a[header] ? -1 : 0;
        }
      });
    }

    return sortedSitesArray;
  };

  const getSitesData = () => {
    // console.log("getSitesData function called");
    const userToken = localStorage.getItem("userToken");

    axios
      .post(
        serverUrl,
        { email: localStorage.getItem("userEmail") },
        {
          cancelToken: source.token,
          headers: {
            jwtToken: userToken,
          },
        }
      )
      .then((response) => {
        // console.log("sites", response.data);
        // response.data.push({
        //   id: "badisidd",
        //   name: "Badisidd",
        // });
        // const tempResponse = response.data;
        // console.log(tempResponse);
        let sortedSitesArray = sortValues(
          response.data,
          sortBy.header,
          sortBy.order
        );
        setSitesArray(sortedSitesArray);

        // const sortedSitesArray = response.data.sort((a, b) =>
        //   a.name < b.name ? 1 : b.name < a.name ? -1 : 0
        // );

        localStorage.setItem("sitesArray", JSON.stringify(sortedSitesArray));

        // Sites side panel
        let totalSites = sortedSitesArray.length;
        let totalCapacity = 0;
        let online = 0;
        let offline = 0;
        sortedSitesArray.forEach((element) => {
          totalCapacity += Number(element.capacity);
          if (element.status === 1) {
            online += 1;
          }
          if (element.status === 0) {
            offline += 1;
          }
        });

        localStorage.setItem(
          "sitesSidePanelLocalStorage",
          JSON.stringify({
            totalSites: totalSites,
            totalCapacity: totalCapacity,
            online: online,
            offline: offline,
          })
        );

        if (localStorage.getItem("siteNames") !== null) {
          let siteNamesCount = localStorage
            .getItem("siteNames")
            .split(",").length;
          if (sortedSitesArray.length > siteNamesCount) {
            let siteNames = sortedSitesArray.map((obj) => obj.name);
            // console.log("SITE NAMES v1", siteNames);
            localStorage.setItem("siteNames", siteNames);
          }
        } else {
          let siteNames = sortedSitesArray.map((obj) => obj.name);
          // console.log("SITE NAMES v2", siteNames);
          localStorage.setItem("siteNames", siteNames);
        }
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          handleSessionExpire();
        }
        // handleSessionExpire();
      });
  };

  // useEffect to get sites details every 1 minute
  useEffect(() => {
    if (localStorage.getItem("sitesArray")) {
      let sitesJSON = JSON.parse(localStorage.getItem("sitesArray"));
      setSitesArray(sitesJSON);
    }
    getSitesData();

    const interval = setInterval(getSitesData, 60000);

    return () => {
      clearInterval(interval);
      // source.cancel();
    };
  }, []);

  const getFormattedDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}, ${date.toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })}`;
  };

  const handleSiteClick = (event, row) => {
    event.preventDefault();
    // console.log(row, "--234");
    // setNotesite(siteName);
    // getNotemsg();
    handleSiteClickInParent(row);
  };

  const [headersOrder, setHeadersOrder] = useState({
    name: "asc",
    capacity: "desc",
    network: "desc",
    status: "desc",
    time: "desc",
    powerGeneration: "desc",
    GHI: "desc",
    GTI: "desc",
    moduleTemp: "desc",
  });

  const handleOrderChange = (event, header, id) => {
    // console.log(event, header);
    setHeadersOrder((prevState) => {
      const headerOrder = prevState[header] === "asc" ? "desc" : "asc";
      const headerOrderRev = headerOrder === "asc" ? "desc" : "asc";
      const newHeadersOrder = {
        name: headerOrderRev,
        capacity: headerOrderRev,
        network: headerOrderRev,
        status: headerOrderRev,
        time: headerOrderRev,
        powerGeneration: headerOrderRev,
        GHI: headerOrderRev,
        GTI: headerOrderRev,
        moduleTemp: headerOrderRev,
      };
      newHeadersOrder[header] = headerOrder;
      sortValues(sitesArray, header, headerOrder);
      setSortBy({ header: header, order: headerOrder });
      let headerId = document.getElementById(id);
      let headers = document.querySelectorAll(".header");
      if (headers) {
        headers.forEach((element) => {
          element.style.color = "black";
        });
      }
      if (headerId && headerOrder === "asc") {
        headerId.style.color = "#1A5276";
      } else {
        headerId.style.color = "green";
      }
      return newHeadersOrder;
    });
  };

  // const handleClickOpen = (row) => {
  //   // console.log("sites data", row);
  //   // setNotesite(row);
  //   setOpen(true);
  //   // getNotemsg();
  // };
  // const handleClose = (value) => {
  //   setOpen(false);
  //   // setSelectedValue(value);
  // };
  const sitedata = [
    {
      site:"Hukkeri",
      Capacity:"15",
      Network:"",
      Status:"Online",
      LastEvent:"08/06, 10.10",
      PowerGeneration:"12.76",
      GHI:"832.83",
      GTI:"807.91",
      ModuleTemp:"48.92"
    },
    {
      site:"Badisidd",
      Capacity:"300 ",
      Network:"",
      Status:"Online",
      LastEvent:"08/06, 14:09",
      PowerGeneration:"252.00",
      GHI:"912.29",
      GTI:"875.07",
      ModuleTemp:"60.90"
    },
    {
      site:"Kittur",
      Capacity:"25",
      Network:"",
      Status:"Online",
      LastEvent:"08/06, 14:17",
      PowerGeneration:"13.75",
      GHI:"705.65",
      GTI:"704.75",
      ModuleTemp:"57.81"
    },
    {
      site:"Bidar",
      Capacity:"15",
      Network:"",
      Status:"Online",
      LastEvent:"08/06, 10.10",
      PowerGeneration:"12.76",
      GHI:"832.83",
      GTI:"807.91",
      ModuleTemp:"48.92"
    },
    {
      site:"Bikaner",
      Capacity:"5 ",
      Network:"",
      Status:"Online",
      LastEvent:"08/06, 17:50",
      PowerGeneration:"252.00",
      GHI:"135.61",
      GTI:"130.44",
      ModuleTemp:"51.86"
    },
    {
      site:"Byagwat",
      Capacity:"40",
      Network:"",
      Status:"Online",
      LastEvent:"08/06, 17:45",
      PowerGeneration:"1.34",
      GHI:"31.84",
      GTI:"33.07",
      ModuleTemp:"34.67"
    },
    {
      site:"Chittuguppa",
      Capacity:"40",
      Network:"",
      Status:"Offline",
      LastEvent:"08/06, 17:41",
      PowerGeneration:"7.40",
      GHI:"170.28",
      GTI:"170.16",
      ModuleTemp:"38.25"
    },
    {
      site:"Farhatabad",
      Capacity:"40 ",
      Network:"",
      Status:"Online",
      LastEvent:"08/06, 17:39",
      PowerGeneration:"5.90 ",
      GHI:"183.65",
      GTI:"184.48",
      ModuleTemp:"42.70"
    },
    {
      site:"Balangir",
      Capacity:"25",
      Network:"",
      Status:"Online",
      LastEvent:"08/06, 14:17",
      PowerGeneration:"13.75",
      GHI:"705.65",
      GTI:"704.75",
      ModuleTemp:"57.81"
    },
    {
      site:"Godhur",
      Capacity:"10",
      Network:"",
      Status:"Online",
      LastEvent:"08/06, 17:03",
      PowerGeneration:"1.77",
      GHI:"159.92",
      GTI:"175.26",
      ModuleTemp:"42.92"
    },
    {
      site:"Gulelgudda",
      Capacity:"15 ",
      Network:"",
      Status:"Online",
      LastEvent:"08/06, 17:11",
      PowerGeneration:"4.09",
      GHI:"243.31",
      GTI:"242.20",
      ModuleTemp:"43.15"
    },
    {
      site:"Hindupur",
      Capacity:"50",
      Network:"",
      Status:"Online",
      LastEvent:"08/06, 16:53",
      PowerGeneration:"11.445",
      GHI:"323.64",
      GTI:"325.23",
      ModuleTemp:"46.07"
    },
  ]






  

  return (
    <>
      <Comparison data={sitesArray} handleSessionExpire={handleSessionExpire} />
      <TableContainer
        component={Paper}
        elevation={6}
        className={classes.tableContainer}
        style={{ marginTop: "0.25rem" }}
      >
        {/* <Grid container justify="space-between" alignItems="flex-end">
        <Grid item>
          <FormControl>
            <InputLabel id="sort-by-select-label">Sort by</InputLabel>
            <Select
              labelId="sort-by-select-label"
              id="sort-by-simple-select"
              value={sortBy}
              onChange={onSortHeaderChange}
            >
              <MenuItem value={"name"}>Site name&ensp;</MenuItem>
              <MenuItem value={"capacity"}>Capacity&ensp;</MenuItem>
              <MenuItem value={"time"}>Last Event&ensp;</MenuItem>
              <MenuItem value={"powerGeneration"}>
                Power Generation&ensp;
              </MenuItem>
              <MenuItem value={"GHI"}>GHI&ensp;</MenuItem>
              <MenuItem value={"GTI"}>GTI&ensp;</MenuItem>
              <MenuItem value={"moduleTemp"}>Module Temp&ensp;</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={enableDesc}
                onChange={handleOrderChange}
                name="checkedASC"
                color="primary"
              />
            }
            label="DESC"
          />
        </Grid>
      </Grid> */}
        <Table
          className={classes.table}
          size="small"
          aria-label="customized table"
          stickyHeader={true}
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <span
                  onClick={(event) =>
                    handleOrderChange(event, "name", "siteNameHeader")
                  }
                  id="siteNameHeader"
                  className="header"
                >
                  Site
                </span>
                {/* <TableSortLabel
                active
                direction={headersOrder.name}
                onClick={(event) => handleOrderChange(event, "name")}
              /> */}
              </StyledTableCell>
              <StyledTableCell
                align="left"
                style={{ paddingTop: ".6rem", paddingBottom: ".5rem" }}
              >
                <span
                  onClick={(event) =>
                    handleOrderChange(event, "capacity", "capacityHeader")
                  }
                  id="capacityHeader"
                  className="header"
                >
                  Capacity
                </span>
                {/* <TableSortLabel
                active
                direction={headersOrder.capacity}
                onClick={(event) => handleOrderChange(event, "capacity")}
              /> */}
              </StyledTableCell>
              <StyledTableCell align="center">
                <span
                  onClick={(event) =>
                    handleOrderChange(event, "network", "networkHeader")
                  }
                  id="networkHeader"
                  className="header"
                >
                  Network
                </span>
              </StyledTableCell>
              <StyledTableCell align="center">
                <span
                  onClick={(event) =>
                    handleOrderChange(event, "status", "statusHeader")
                  }
                  id="statusHeader"
                  className="header"
                >
                  Status
                </span>
                {/* <TableSortLabel
                active
                direction={headersOrder.status}
                onClick={(event) => handleOrderChange(event, "status")}
              /> */}
              </StyledTableCell>
              <StyledTableCell align="center">
                <span
                  onClick={(event) =>
                    handleOrderChange(event, "time", "timeHeader")
                  }
                  id="timeHeader"
                  className="header"
                >
                  Last Event
                </span>
                {/* Last Event
              <TableSortLabel
                active
                direction={headersOrder.time}
                onClick={(event) => handleOrderChange(event, "time")}
              /> */}
              </StyledTableCell>
              <StyledTableCell align="center">
                <span
                  onClick={(event) =>
                    handleOrderChange(
                      event,
                      "powerGeneration",
                      "powerGenerationHeader"
                    )
                  }
                  id="powerGenerationHeader"
                  className="header"
                >
                  Power Generation
                </span>
                {/* Power Gen
              <TableSortLabel
                active
                direction={headersOrder.powerGeneration}
                onClick={(event) => handleOrderChange(event, "powerGeneration")}
              /> */}
              </StyledTableCell>
              <StyledTableCell align="center">
                <span
                  onClick={(event) =>
                    handleOrderChange(event, "GHI", "ghiHeader")
                  }
                  id="ghiHeader"
                  className="header"
                >
                  GHI
                </span>
                {/* GHI
              <TableSortLabel
                active
                direction={headersOrder.GHI}
                onClick={(event) => handleOrderChange(event, "GHI")}
              /> */}
              </StyledTableCell>
              <StyledTableCell align="center">
                <span
                  onClick={(event) =>
                    handleOrderChange(event, "GTI", "gtiHeader")
                  }
                  id="gtiHeader"
                  className="header"
                >
                  GTI
                </span>
                {/* GTI
              <TableSortLabel
                active
                direction={headersOrder.GTI}
                onClick={(event) => handleOrderChange(event, "GTI")}
              /> */}
              </StyledTableCell>
              <StyledTableCell align="center">
                <span
                  onClick={(event) =>
                    handleOrderChange(event, "moduleTemp", "moduleTempHeader")
                  }
                  id="moduleTempHeader"
                  className="header"
                >
                  Module Temp
                </span>
                {/* Mod Temp
              <TableSortLabel
                active
                direction={headersOrder.moduleTemp}
                onClick={(event) => handleOrderChange(event, "moduleTemp")}
              /> */}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sitedata.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  <a
                    href="#"
                    onClick={(event) => handleSiteClick(event, row)}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                  {row.site}
                  </a>
                </StyledTableCell>
                <StyledTableCell >
              {row.Capacity} <small>MW</small>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {/* {row.network === true ? (
                    <Tooltip title={row.ip} placement="right"> */}
                      <SignalCellularAltIcon />
                    {/* </Tooltip>
                  ) : (-
                    <Tooltip title={row.ip} placement="right">
                      <SignalCellularConnectedNoInternet0BarIcon />
                    </Tooltip>
                  )} */}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {/* {row.status === 1 ? (
                    ""
                  ) : (
                    <span style={{ color: "red" }}>Offline</span>
                  )} */}
                    <span style={{ color: "green" }}>{row.Status}</span>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {/* {getFormattedDate(row.time * 1000)} */}
                {row.LastEvent}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {/* {Number(row.powerGeneration) === -111 ? (
                    "x"
                  ) : ( */}
                    <span>
                  {row.PowerGeneration}<small>MW</small>
                    </span>
                  {/* )} */}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {/* {Number(row.GHI) === -111 ? (
                    "x"
                  ) : ( */}
                    <span>{row.GHI}</span>
                  {/* )} */}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {/* {Number(row.GTI) === -111 ? (
                    "x"
                  ) : ( */}
                    <span>{row.GTI}</span>
                  {/* )} */}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {/* {Number(row.moduleTemp) === -111 ? (
                    "x"
                  ) : ( */}
                    <span>{row.ModuleTemp}°C</span>
                  {/* )} */}
                </StyledTableCell>
                

              </StyledTableRow>
              
              
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
