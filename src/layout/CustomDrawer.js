import DateFnsUtils from "@date-io/date-fns";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import BarChartIcon from "@material-ui/icons/BarChart";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuIcon from "@material-ui/icons/Menu";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import axios from "axios";
import clsx from "clsx";
import "date-fns";
import moment from "moment";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { SERVER_URL } from "../constants/constants";
import Byagwat from "../pages/Byagwat";
import Kherakhurd from "../pages/Kherakhurd";
import InverterEfficiency from "../pages/InverterEfficiency";
import Predictions from "../pages/Predictions";
import Sites from "../pages/Sites";
import Hindupur from "../pages/Hindupur";
import Sircilla from "../pages/Sircilla";
import Gadarpur from "../pages/Gadarpur";
import ExportData from "../pages/CustomCSV";
import Yemmiganur from "../pages/Yemmiganur";
import BallotIcon from "@material-ui/icons/Ballot";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Mahoba from "../pages/Mahoba";
import Balangir from "../pages/Balangir";
import BhadlaL2 from "../pages/BhadlaL2";
import Jhandekalan from "../pages/Jhandekalan";
import Nangla from "../pages/Nangla";
import BhadlaL3 from "../pages/BhadlaL3";
import SCB from "../pages/SCB";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import {
  Badge,
  Box,
  CircularProgress,
  FormControlLabel,
  FormLabel,
  LinearProgress,
  Paper,
  Radio,
  RadioGroup,
  Tooltip,
} from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import "./CustomDrawer.css";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Mankhera from "../pages/Mankhera";
import Jhunir from "../pages/Jhunir";
import Bhongir from "../pages/Bhongir";
import Padmajiwadi from "../pages/Padmajiwadi";
import Mothkur from "../pages/Mothkur";
import Sadashivpet from "../pages/Sadashivpet";
import Pattikonda from "../pages/Pattikonda";
import Rayachoti from "../pages/Rayachoti";
import InfoIcon from "@material-ui/icons/Info";
import Bikaner from "../pages/Bikaner";
import Santhipuram from "../pages/Santhipuram";
import { SpaRounded } from "@material-ui/icons";
import Chittorgarh from "../pages/Chittorgarh";
import Chattisgarh from "../pages/Chattisgarh";
import Balanagar from "../pages/Balanagar";
import Kosigi from "../pages/Kosigi";
import Sandur from "../pages/Sandur";
import Kudligi from "../pages/Kudligi";
import Gulelgudda from "../pages/Gulelgudda";
import Hukkeri from "../pages/Hukkeri";
import AddSite from "../pages/AddSite";
import Kittur from "../pages/Kittur";
import Bazpur from "../pages/Bazpur";
import Baznagar from "../pages/Bazpur";
import Bidar from "../pages/Bidar";
import Sidlaghatta from "../pages/Sidlaghatta";
import Khilchipur from "../pages/Khilchipur";
import Khambhat from "../pages/Khambhat";
import Alerts from "../pages/Alerts";
import CustomDiagram from "../pages/CustomDiagram";
import Analytics from "../pages/Analytics";
import Performance from "../pages/Performance";
import Chittaguppa from "../pages/Chittuguppa";
import Chittuguppa from "../pages/Chittuguppa";
import Farhatabad from "../pages/Farhatabad";
import Godhur from "../pages/Godhur";
import Manthani from "../pages/Manthani";
import BankaM from "../pages/BankaM";
import BankaN from "../pages/BankaN";
import Maddur from "../pages/Maddur";
import CSV from "../pages/CSV";
import Admin from "../pages/Admin";
import Comparison from "../components/Comparison/Comparison";
import CustomSnackbar from "../components/UI/CustomSnackbar";
import { AppState } from "../AppContext";
import LossAnalytics from "../pages/LossAnalytics";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import Badisidd from "../pages/Badisidd";
import Mlprediction from "../pages/Mlprediction";
import NoteDialog from "../components/Badisidd/NoteDialog";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const drawerWidth = 240;
const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // height: 20,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  sectionDesktop: {
    // display: 'none',
    // [theme.breakpoints.up('md')]: {
    //   display: 'flex',
    // },
    display: "flex",
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  flexContent: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  expandMoreIconButtonStyle: {
    marginLeft: theme.spacing(0.5),
  },
  userNotificationIconButtonStyle: {
    marginRight: theme.spacing(2),
  },
  companyNameStyle: {
    marginRight: "auto",
    marginLeft: theme.spacing(2),
  },
  modalCardStyle: {
    width: 300,
    height: "fit-content",
  },
  notificationAccordionheading: {
    fontSize: theme.typography.pxToRem(11),
    // flexBasis: "45%",
    // flexShrink: 0,
  },
  notificationAccordionSubheading: {
    fontSize: theme.typography.pxToRem(11),
    color: theme.palette.text.secondary,
  },
  customizeToolbar: {
    // maxHeight: 20
  },
  linearProgressPrimaryColor: {
    backgroundColor: "#00695C",
  },
  inputOutlineColor: {
    outlineColor: "#21618C",
  },
}));

const menuListItems = ["SCB"];

// const modal = {
//   openModal: false,
//   modal: 'inverter',
//   data: {}
// }

export default function CustomDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();

  //Note feat to show message
  const [open, setOpen] = React.useState(false);
  const [showNotemsg, setShowNotemsg] = useState([]);
  const [notesite, setNotesite] = useState("Badisidd");

  const handleClickOpen = (row) => {
    // console.log("sites data", row);
    // setNotesite(row);
    setOpen(true);
    // getNotemsg();
  };
  const handleClosed = (value) => {
    setOpen(false);
    // setSelectedValue(value);
  };

  const history = useHistory();
  const username = localStorage.getItem("username", "Admin");
  const userToken = localStorage.getItem("userToken");
  // const userId = localStorage.getItem('userId');

  const { setEnableDarkTheme, enabledLinearProgress } = AppState();

  // useEffect to check if user is logged in
  useEffect(() => {
    if (!userToken || userToken === "") {
      history.push("/login");
      return;
    }

    axios
      .post(
        SERVER_URL + "/admin/sitesDropdown",
        {
          email: localStorage.getItem("userEmail"),
        },
        {
          headers: {
            jwtToken: localStorage.getItem("userToken"),
            // jwtToken: jwtToken,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        }
      )
      .then((response) => {
        localStorage.setItem(
          "siteNamesCaps",
          JSON.stringify(response.data[0].siteNamesCaps)
        );
        localStorage.setItem(
          "siteNamesAndBlocks",
          JSON.stringify(response.data[0].siteNamesAndBlocks)
        );
      })
      .catch((error) => {
        localStorage.setItem("siteNamesCaps", JSON.stringify([]));
        localStorage.setItem("siteNamesAndBlocks", JSON.stringify([]));
        if (error?.response?.status === 401) {
          handleSessionExpire();
        }
      });

    if (localStorage.getItem("sitesSidePanelLocalStorage")) {
      setSitesSidePanelData(
        JSON.parse(localStorage.getItem("sitesSidePanelLocalStorage"))
      );
    }

    const interval = setInterval(() => {
      if (localStorage.getItem("sitesSidePanelLocalStorage")) {
        setSitesSidePanelData(
          JSON.parse(localStorage.getItem("sitesSidePanelLocalStorage"))
        );
      }
    }, 360000);

    fetchNotificationsData(userToken);

    let notificationInterval = setInterval(() => {
      fetchNotificationsData(userToken);
    }, 360000);

    return () => {
      clearInterval(interval);
      clearInterval(notificationInterval);
    };
  }, []);

  const serverUrl = SERVER_URL;

  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const openNotificationsPopover = Boolean(notificationsAnchorEl);
  const notificationsPopoverId = openNotificationsPopover
    ? "notifications-popover"
    : undefined;

  const openAccountMenu = Boolean(anchorEl);

  const getMenu = () => {
    let userDetails = JSON.parse(localStorage.getItem("userDetails"));
    let kies = userDetails.menu;
    let menu = [];
    kies.forEach((key) => {
      if (key.includes("admin")) {
        menu.push("Admin");
      }
      if (key.includes("sites")) {
        menu.push("Sites");
      }
      if (key.includes("inverterEfficiency")) {
        menu.push("Inverter Efficiency");
      }
      if (key.includes("ml")) {
        menu.push("ML Predictions");
      }
      if (key.includes("scb")) {
        menu.push("SCB");
      }
      if (key.includes("analytics")) {
        menu.push("Analytics");
      }
      if (key.includes("performance")) {
        menu.push("Performance");
      }
      if (key.includes("csv")) {
        menu.push("CSV");
      }
      // menu.push("Loss Analytics");
      if (key.includes("alerts")) {
        menu.push("Alerts");
      }
    });

    return menu;
  };

  // Side menu list item index state
  const [listItemIndex, setListItemIndex] = useState((prevState) => {
    return !userToken || userToken === ""
      ? history.push("/login")
      : getMenu().find((menu) => menu === "Sites")
      ? "Sites"
      : !userToken || userToken === ""
      ? history.push("/login")
      : getMenu()[0];
  });

  // Selected site states
  const [selectedSite, setSelectedSite] = useState("none");
  const [isSiteSelected, setIsSiteSelected] = useState(true);

  /**
   * States and Functions related to Download Excel Modal
   */
  // downloadExcelModal state
  const [toggleDownloadExcelModal, setToggleDownloadExcelModal] =
    useState(false);

  // Show or hide download excel alert
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

  const handleModalClose = () => {
    setModalState((prevState) => {
      return {
        openModal: false,
        openCSVModal: false,
        openTicketModal: false,
        openInverterModal: false,
        openInverterScbModal: false,
        openSiteEditModal: false,
      };
    });
  };

  const handleSiteChange = (event) => {
    setIsSiteSelected(true);
    setSelectedSite(event.target.value);
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
        getExcelFile();
      }
    }
  };

  const getExcelFile = () => {
    // console.log("getExcelFile function called...");

    // console.log("selectedSite", selectedSite);

    // if (
    //   selectedSite === "Chattisgarh" ||
    //   selectedSite === "Byagwat" ||
    //   selectedSite === "Kherakhurd" ||
    //   selectedSite === "Hindupur" ||
    //   selectedSite === "Sircilla" ||
    //   selectedSite === "Gadarpur" ||
    //   selectedSite === "Yemmiganur"
    // ) {
    let selectedSiteCopy = String(selectedSite).includes("Banka")
      ? selectedSite.replace(/ +/g, "")
      : selectedSite;

    if (selectedSiteCopy === "Bhadla L2") {
      selectedSiteCopy = "bhadlal2";
    }
    if (selectedSiteCopy === "Bhadla L3") {
      selectedSiteCopy = "bhadlal3";
    }
    if (selectedSiteCopy !== "Hindpur") {
      let fileName1 = selectedSiteCopy + "_wms_mcr";
      let fileName2 = selectedSiteCopy + "_inverters";
      try {
        getExportData(
          1,
          `${serverUrl}/${selectedSiteCopy.toLowerCase()}/excel${1}`,
          fileName1
        );
      } finally {
        getExportData(
          2,
          `${serverUrl}/${selectedSiteCopy.toLowerCase()}/excel${2}`,
          fileName2
        );
      }
    } else {
      let fileName1 = selectedSiteCopy + "_wms_mcr";
      getExportData(1, `${serverUrl}/reports/${selectedSiteCopy}`, fileName1);
    }
  };

  const getExportData = (number, route, fileName) => {
    // console.log(route);
    // console.log(
    //   "Inside getExortData",
    //   new Date(excelFromDate),
    //   new Date(excelToDate)
    // );
    // console.log(route);
    axios
      .post(
        route,
        {
          fromDate: new Date(excelFromDate).getTime(),
          toDate: new Date(excelToDate).getTime(),
        },
        {
          headers: {
            jwtToken: userToken,
            responseType: "blob",
          },
        }
      )
      .then((response) => {
        // console.log(response);
        // Code to download csv/ excel
        const downloadUrl = window.URL.createObjectURL(
          new Blob([response.data])
        );
        const link = document.createElement("a");
        link.href = downloadUrl;
        let fromDate = new Date(excelFromDate);
        let toDate = new Date(excelToDate);
        let filename = `${fileName}_${fromDate.getDate()}_${
          fromDate.getMonth() + 1
        }_${fromDate.getFullYear()}-${toDate.getDate()}_${
          toDate.getMonth() + 1
        }_${toDate.getFullYear()}.csv`;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        setDisabledDownloadExcelButton(false);
        handleModalClose();
      })
      .catch((error) => {
        // console.log(error);
        setNoDataFound(true);
        setDisabledDownloadExcelButton(false);
        if (error?.response?.status === 401) {
          handleSessionExpire();
        }
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

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleLogout = () => {
    // console.log("logout");
    handletokenlogout();
    setAnchorEl(null);
    localStorage.clear();
    history.replace("/login");
  };

  const handletokenlogout = () => {
    axios
      .post(SERVER_URL + "/user/logout", {})
      .then((response) => {})
      .catch((error) => {});
  };

  const handleSessionExpire = () => {
    localStorage.setItem("isAuthSnackbarOpened", true);
    handleLogout();
    window.location.reload();
  };

  const [modalState, setModalState] = useState({
    openModal: false,
    openCSVModal: false,
  });

  const handleModalStateChange = (key) => {
    // setModalState((prevState) => )
  };

  const [clickedNotificationData, setClickedNotificationData] = useState({});

  const handleNotificationClick = (row) => {
    setClickedNotificationData(row);
    setModalState({ openModal: true, openCSVModal: true });
  };

  const handleListItemMenuClick = (index, text) => {
    switch (text) {
      case "Admin":
        setListItemIndex("Admin");
        setSelectedSiteFromChild("");
        break;
      case "Sites":
        setListItemIndex("Sites");
        setSelectedSiteFromChild("");
        break;
      case "Inverter Efficiency":
        setListItemIndex("Inverter Efficiency");
        setSelectedSiteFromChild("");
        break;
      case "ML Predictions":
        setListItemIndex("ML Predictions");
        setSelectedSiteFromChild("");
        break;
      case "SCB":
        setListItemIndex("SCB");
        setSelectedSiteFromChild("");
        break;
      case "Analytics":
        setListItemIndex("Analytics");
        setSelectedSiteFromChild("");
        break;
      case "Performance":
        setListItemIndex("Performance");
        setSelectedSiteFromChild("");
        break;
      case "CSV":
        setListItemIndex("CSV");
        setSelectedSiteFromChild("");
        break;
      case "Alerts":
        setListItemIndex("Alerts");
        setSelectedSiteFromChild("");
        break;
      // case 9:
      //   setListItemIndex(9);
      //   setSelectedSiteFromChild("");
      //   break;
      default:
        // setToggleDownloadExcelModal(true);
        setModalState((prevState) => {
          return { openModal: true, openCSVModal: false };
        });
        compareExcelDates(excelFromDate, excelToDate);
    }
  };

  /**
   * Functions related to site page/ component change
   */
  const [selectedSiteFromChild, setSelectedSiteFromChild] = useState("");
  const [sitestatusBar, setSitestatusBar] = useState({});

  const handleSiteClick = (row) => {
    // console.log(row, "--745");
    setSitestatusBar(row);
    setSelectedSiteFromChild(row.name);
    setNotesite(row.name);
    getNotemsg();
  };

  /**
   * END of functions related to site page/ component change
   */

  // Side panel for sites
  const [openSitesSidePanel, setOpenSitesSidePanel] = useState(false);
  const [sitesSidePanelData, setSitesSidePanelData] = useState({
    totalSites: 0,
    totalCapacity: 0,
    online: 0,
    offline: 0,
  });

  const handleSitesSidePanelBtnClick = (event) => {
    // console.log(openSitesSidePanel);
    setOpenSitesSidePanel((prevState) => {
      let sidePanel = document.getElementById("sitesSidePanel");
      prevState
        ? (sidePanel.style.right = "-320px")
        : (sidePanel.style.right = "0px");
      return !prevState;
    });
  };

  // Side panel for SCB
  const [openSidePanel, setOpenSidePanel] = useState(false);

  const handleSideNotificationsBtnClick = (event) => {
    // let sitesSidePanel = document.getElementById("sitesSidePanel");
    // if (openSidePanel) {
    //   setOpenSitesSidePanel(false);
    //   sitesSidePanel.style.right = "-320px";
    //   sitesSidePanel.style.display = "block";
    // } else {
    //   sitesSidePanel.style.display = "none";
    // }

    setOpenSidePanel((prevState) => {
      let sidePanel = document.getElementById("sidePanel");
      prevState
        ? (sidePanel.style.right = "-320px")
        : (sidePanel.style.right = "0px");
      return !prevState;
    });
  };

  const [totalNotifications, setTotalNotifications] = useState();

  const [notificationsData, setNotificationsData] = useState([]);

  const getFormattedDateForNotification = (timestamp) => {
    let date = new Date(timestamp);
    let dateString = `${date.getDate()}/${Number(date.getMonth() + 1)}`;

    return <span>{date.toLocaleTimeString()}</span>;
  };

  const getFormattedTitleForNotification = (siteName, alarm, ticket) => {
    let title = `${String(siteName).charAt(0).toUpperCase()}${String(
      siteName
    ).slice(1)} - ${alarm} Down`;
    return title;
  };

  const fetchNotificationsData = (jwtToken) => {
    axios
      .post(
        SERVER_URL + "/notification/logs",
        { email: localStorage.getItem("userEmail") },
        {
          headers: {
            // email: localStorage.getItem("userEmail"),
            jwtToken: jwtToken,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            // "Access-Control-Allow-Credential": true,
          },
        }
      )
      .then((response) => {
        // console.log("notifications", response.data);
        setNotificationsData(response.data);
        setTotalNotifications(response.data.length);
      })
      .catch((error) => {
        // console.log("notifications", error);
        if (error?.response?.status === 401) {
          handleSessionExpire();
        }
      });
  };

  const [notificationNewStatus, setNotificationNewStatus] = useState("");

  const handleNotificationNewStatusChange = (status) => {
    setNotificationNewStatus(status);
  };

  const notificationRemarksRef = useRef();

  const notificationTextAreaInputChange = () => {
    if (notificationRemarksRef.current.value !== "") {
      setDisabledNotificationSubmitBtn(false);
    } else {
      setDisabledNotificationSubmitBtn(true);
    }
  };

  let [disabledNotificationSubmitBtn, setDisabledNotificationSubmitBtn] =
    useState(true);

  const handleNotificationSubmit = (ticketNumber, site, alarm) => {
    let jwtToken = localStorage.getItem("userToken");

    setDisabledNotificationSubmitBtn(true);

    let notificationStatus =
      notificationNewStatus === "" ? "Open" : notificationNewStatus;

    // console.log(
    //   ticketNumber,
    //   site,
    //   alarm,
    //   notificationRemarksRef.current.value,
    //   notificationStatus
    // );

    // console.log(localStorage.getItem("alertsTable"));

    axios
      .post(
        SERVER_URL + "/notification/logs/response",
        {
          ticket: ticketNumber,
          remarks: notificationRemarksRef.current.value,
          status: notificationStatus,
          site: site,
          alarm: alarm,
          table: localStorage.getItem("alertsTable"),
        },
        {
          headers: {
            jwtToken: jwtToken,
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
        setModalState({ openModal: false, openCSVModal: false });
        setDisabledNotificationSubmitBtn(false);
        fetchNotificationsData(localStorage.getItem("userToken"));
      })
      .catch((error) => {
        // console.log(err);
        setModalState({ openModal: false, openCSVModal: false });
        setDisabledNotificationSubmitBtn(false);
        if (error?.response?.status === 401) {
          handleSessionExpire();
        }
      });
  };
  const [alertData, setAlertData] = useState();
  const handleTicketModal = (row) => {
    // console.log(row);
    setAlertData(row);
    setModalState({
      openModal: true,
      openCSVModal: false,
      openTicketModal: true,
    });
  };

  const [selectedInverter, setSelectedInverter] = useState({});
  const [selectedInverterScb, setSelectedInverterScb] = useState({});
  const [checked, setChecked] = React.useState(true);

  const [selectedSiteEdit, setSelectedSiteEdit] = useState({});

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    severity: "info",
    message: "snackbar",
  });

  const handleToggle = (bool) => {
    setSnackbarState((prevState) => ({ ...prevState, open: bool }));
  };

  const [refreshInverterTable, setRefreshInverterTable] = useState({});
  const [refreshSiteEditTable, setRefreshSiteEditTable] = useState({});

  const updateInverter = (row) => {
    // console.log(row);
    setSelectedInverter(row);
    setModalState((prevState) => ({
      ...prevState,
      openModal: true,
      openInverterModal: true,
    }));
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const updateInverterScb = (row) => {
    // console.log(row);
    setSelectedInverterScb(row);
    setModalState((prevState) => ({
      ...prevState,
      openModal: true,
      openInverterScbModal: true,
    }));
  };

  const updateSite = (row) => {
    // console.log(row);
    setSelectedSiteEdit(row);
    setModalState((prevState) => ({
      ...prevState,
      openModal: true,
      openSiteEditModal: true,
    }));
  };

  const handleUpdateInverter = () => {
    axios
      .post(
        SERVER_URL + "/manageinverters/edit",
        { ...selectedInverter },
        {
          jwtToken: localStorage.getItem("userToken"),
        }
      )
      .then((response) => {
        setModalState((prevState) => ({
          ...prevState,
          openModal: false,
          openInverterModal: false,
          openCSVModal: false,
          openTicketModal: false,
        }));
        setSnackbarState((prevState) => ({
          ...prevState,
          open: true,
          severity: "success",
          message: `Inverter: ${selectedInverter.inverter} updated!`,
        }));
        setRefreshInverterTable(response.data);
      })
      .catch((error) => {
        setSnackbarState((prevState) => ({
          ...prevState,
          open: true,
          severity: "error",
          message: "Update failed!",
        }));
        setRefreshInverterTable(error);
        if (error?.response?.status === 401) {
          handleSessionExpire();
        }
      });
  };
  console.log("962---scb", selectedInverterScb);
  const handleUpdateInverterScb = () => {
    axios
      .post(
        SERVER_URL + "/scbUpdate/update",
        { ...selectedInverterScb },
        {
          jwtToken: localStorage.getItem("userToken"),
        }
      )
      .then((response) => {
        console.log("==scb", response);
        setModalState((prevState) => ({
          ...prevState,
          openModal: false,
          openInverterScbModal: false,
          openCSVModal: false,
          openTicketModal: false,
        }));
        setSnackbarState((prevState) => ({
          ...prevState,
          open: true,
          severity: "success",
          message: `Inverter: ${selectedInverterScb.inverter} updated!`,
        }));
        setRefreshInverterTable(response.data);
      })
      .catch((error) => {
        setSnackbarState((prevState) => ({
          ...prevState,
          open: true,
          severity: "error",
          message: "Update failed!",
        }));
        setRefreshInverterTable(error);
        if (error?.response?.status === 401) {
          handleSessionExpire();
        }
      });
  };

  const handleUpdateSite = () => {
    axios
      .post(
        SERVER_URL + "/sitemaster/edit",
        { ...selectedSiteEdit, email: localStorage.getItem("userEmail") },
        {
          jwtToken: localStorage.getItem("userToken"),
        }
      )
      .then((response) => {
        // console.log(response.data);
        setModalState((prevState) => ({
          ...prevState,
          openModal: false,
          openSiteEditModal: false,
          openCSVModal: false,
          openTicketModal: false,
        }));
        setSnackbarState((prevState) => ({
          ...prevState,
          open: true,
          severity: "success",
          message: `Site: ${selectedSiteEdit.sitename} updated!`,
        }));
        setRefreshSiteEditTable(response.data);
      })
      .catch((error) => {
        setSnackbarState((prevState) => ({
          ...prevState,
          open: true,
          severity: "error",
          message: "Update failed!",
        }));
        setRefreshSiteEditTable(error);
        if (error?.response?.status === 401) {
          handleSessionExpire();
        }
      });
  };

  const getNotemsg = () => {
    // console.log("Get Note msg hit", notesite);
    // setEnabledLinearProgress(true);
    axios
      .post(SERVER_URL + "/api/users/get/messages", {
        site: notesite,
        // noteMsg: notemsg,
      })
      .then((response) => {
        // console.log("inside then", response.data);
        const data = response.data;
        setShowNotemsg(data);

        // setSnackbarState((prevState) => ({
        //   ...prevState,
        //   open: true,
        //   severity: "success",
        //   message: `Site: ${selectedSite.sitename} updated!`,
        // }));

        // handleView();
        // setEnabledLinearProgress(false);
      })
      .catch((err) => {
        // setSnackbarState((prevState) => ({
        //   ...prevState,
        //   open: true,
        //   severity: "error",
        //   message: "Update failed!",
        // }));
        // handleView();
        // setEnabledLinearProgress(false);
      });
  };

  useEffect(() => {
    getNotemsg();
  }, [notesite]);

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })}
        style={{ backgroundColor: '#ff7700' }} // Add this line to set the background color
      >
        <Toolbar className={classes.customizeToolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: openDrawer,
            })}
           
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            className={classes.grow}
            style={{ textAlign: "center", paddingLeft: "7.5rem" }}
          >
            Photon Logimetrix
          </Typography>
          <div className={classes.sectionDesktop}>
            <div>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <IconButton
                  color="inherit"
                  style={{ marginRight: ".5rem" }}
                  onClick={() => setEnableDarkTheme((prevState) => !prevState)}
                >
                  <InvertColorsIcon />
                </IconButton>
                <IconButton
                  aria-label="notification count"
                  color="inherit"
                  style={{ marginRight: "1.25rem" }}
                  onClick={() => {
                    setOpenSidePanel((prevState) => {
                      if (totalNotifications > 0) {
                        let sidePanel = document.getElementById("sidePanel");
                        prevState
                          ? (sidePanel.style.right = "-320px")
                          : (sidePanel.style.right = "0px");
                        return !prevState;
                      } else {
                        return prevState;
                      }
                    });
                  }}
                >
                  <Badge badgeContent={totalNotifications} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <Typography>{username}</Typography>
                <IconButton
                  edge="end"
                  aria-label="expand more icon button"
                  color="inherit"
                  onClick={handleMenu}
                  size="small"
                  className={classes.expandMoreIconButtonStyle}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Grid>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={openAccountMenu}
                onClose={handleClose}
              >
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
              </Menu>
              <Popover
                id={notificationsPopoverId}
                open={false}
                anchorEl={notificationsAnchorEl}
                onClose={handleNotificationsClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Paper
                  style={{
                    padding: "1rem",
                    maxWidth: "300px",
                  }}
                >
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography
                        className={classes.notificationAccordionheading}
                      >
                        23/06 10:10
                      </Typography>
                      <Typography
                        className={classes.notificationAccordionSubheading}
                        style={{ color: "orange" }}
                      >
                        SCB
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography
                        className={classes.notificationAccordionheading}
                      >
                        23/06 18:20
                      </Typography>
                      <Typography
                        className={classes.notificationAccordionSubheading}
                        style={{ color: "orange" }}
                      >
                        SCB
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Paper>
              </Popover>
            </div>
          </div>
        </Toolbar>
        {enabledLinearProgress && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress style={{ backgroundColor: "#2874A6 " }} />
          </Box>
        )}
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: openDrawer,
          [classes.drawerClose]: !openDrawer,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: openDrawer,
            [classes.drawerClose]: !openDrawer,
          }),
        }}
      >
        <div className={classes.toolbar}>
          {/* <AppsIcon /> */}
          <Typography
            color="textSecondary"
            className={classes.companyNameStyle}
          >
            {moment(new Date()).format("ll")}
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {username &&
            !username.includes("Gadarpur") &&
            getMenu().map((text, index) => (
              <ListItem
                button
                key={text}
                selected={text === listItemIndex}
                onClick={() => handleListItemMenuClick(index, text)}
              >
                <ListItemIcon
                  key={text + `icon`}
                  style={{ marginLeft: ".4rem" }}
                >
                  {text === "Admin" ? (
                    <img
                      src="/static/images/mainMenu/admin.png"
                      alt="admin"
                      width="28"
                    />
                  ) : text === "Sites" ? (
                    <img
                      src="/static/images/mainMenu/dashboard.png"
                      alt="sites"
                      width="28"
                    />
                  ) : // <DashboardIcon />
                  // ) : index === 1 ? (
                  //   <div
                  //     style={{
                  //       width: "1.4rem",
                  //       height: "1.4rem",
                  //       borderRadius: "4px",
                  //       color: "#fff",
                  //       backgroundColor: "#626262",
                  //       display: "flex",
                  //       justifyContent: "center",
                  //       alignItems: "center",
                  //     }}
                  //   >
                  //     <Typography>B</Typography>
                  //   </div>
                  text === "Inverter Efficiency" ? (
                    <img
                      src="/static/images/mainMenu/efficiency.png"
                      alt="efficiency"
                      width="26"
                    />
                  ) : // <BarChartIcon />
                  text === "ML Predictions" ? (
                    <img
                      src="/static/images/mainMenu/prediction.png"
                      alt="prediction"
                      width="30"
                    />
                  ) : text === "SCB" ? (
                    <img
                      src="/static/images/mainMenu/scb.png"
                      alt="scb"
                      width="25"
                    />
                  ) : text === "Analytics" ? (
                    <img
                      src="/static/images/mainMenu/analytics.png"
                      alt="analytics"
                      width="28"
                    />
                  ) : text === "Performance" ? (
                    <img
                      src="/static/images/mainMenu/performance.png"
                      alt="performance"
                      width="28"
                    />
                  ) : text === "CSV" ? (
                    <img
                      src="/static/images/mainMenu/customCSV.png"
                      alt="custom csv"
                      width="28"
                    />
                  ) : text === "Alerts" ? (
                    <img
                      src="/static/images/mainMenu/alerts.png"
                      alt="alerts"
                      width="28"
                    />
                  ) : text === "Loss Analytics" ? (
                    <img
                      src="/static/images/mainMenu/lossAnalytics.png"
                      alt="loss analytics"
                      width="26"
                    />
                  ) : (
                    <img
                      src="/static/images/mainMenu/quickCSV.png"
                      alt="quick csv"
                      width="28"
                    />
                    // <CloudDownloadIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          {username &&
            username.includes("Gadarpur") &&
            ["SCB"].map((text, index) => (
              <ListItem
                button
                key={text}
                selected={index === listItemIndex}
                onClick={() => handleListItemMenuClick(index)}
              >
                <ListItemIcon key={text}>
                  {index === 0 && (
                    <img
                      src="/static/images/mainMenu/scb.png"
                      alt="scb"
                      width="25"
                    />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
        </List>
      </Drawer>
      <main
        id="sitesSidePanel"
        className={classes.content}
        style={{
          position: "fixed",
          right: "-320px",
          transition: "0.5s",
          top: "21vh",
          padding: 0,
          pointerEvents: "none",
          zIndex: 101,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "360px",
          }}
        >
          <IconButton onClick={handleSitesSidePanelBtnClick} size="small">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // backgroundColor: "#EC7063",
                backgroundColor: "#2874A6",
                paddingBlock: ".5rem",
                paddingInline: ".5rem",
                borderRadius: "5px",
                pointerEvents: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {/* <InfoIcon style={{ color: "white" }} fontSize="small" /> */}
                <em style={{ color: "white", fontWeight: "bold" }}>i</em>
                <DoubleArrowIcon
                  style={{ color: "white" }}
                  className={
                    openSitesSidePanel
                      ? "doubleArrowIconRight"
                      : "doubleArrowIconLeft"
                  }
                  fontSize="small"
                />
              </div>
            </div>
          </IconButton>
          <Paper
            style={{
              margin: ".25rem",
              padding: ".5rem",
              // maxHeight: "200px",
              // overflowY: "scroll",
              width: "335px",
              backgroundColor: "white",
              // display: "flex",
            }}
            // className="notificationsPaperBackgroundDark"
            elevation={1}
          >
            <Typography
              className={classes.notificationAccordionheading}
              style={{ color: "#000" }}
            >
              Total Sites: {sitesSidePanelData.totalSites}&emsp;
            </Typography>
            <Typography
              className={classes.notificationAccordionheading}
              style={{ color: "#000" }}
            >
              Total Capacity:{" "}
              {Number(sitesSidePanelData.totalCapacity).toFixed(0)} {/* 1714 */}
              <small>MW</small>
            </Typography>
            {/* <br /> */}
            <Typography
              style={{ color: "green" }}
              className={classes.notificationAccordionheading}
            >
              Online: {sitesSidePanelData.online}&emsp;
            </Typography>
            <Typography
              style={{ color: "red" }}
              className={classes.notificationAccordionheading}
            >
              Offline: {sitesSidePanelData.offline}
            </Typography>
          </Paper>
        </div>
      </main>
      <main
        id="sidePanel"
        className={classes.content}
        style={{
          position: "fixed",
          right: "-320px",
          transition: "0.5s",
          top: "35vh",
          padding: 0,

          pointerEvents: "auto",
          zIndex: 101,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", width: "360px" }}>
          <IconButton
            onClick={handleSideNotificationsBtnClick}
            disabled={notificationsData.length === 0}
            size="small"
            style={{ pointerEvents: "auto" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#EC7063",
                paddingBlock: ".5rem",
                paddingInline: ".5rem",
                borderRadius: "5px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <NotificationsIcon
                  style={{ color: "white" }}
                  fontSize="small"
                />
                <DoubleArrowIcon
                  style={{ color: "white" }}
                  className={
                    openSidePanel
                      ? "doubleArrowIconRight"
                      : "doubleArrowIconLeft"
                  }
                  fontSize="small"
                />
              </div>
            </div>
          </IconButton>
          <div
            style={{
              width: "320px",
              padding: ".3rem",
              maxHeight: "390px",
              overflowY: "scroll",
            }}
            className="notificationsPaperBackground"
          >
            {notificationsData.length > 0 &&
              notificationsData.map((element, index) => {
                return (
                  <Accordion
                    key={element.timestamp}
                    onClick={(e) => {
                      localStorage.setItem("alertsTable", "notification_open");
                      handleNotificationClick(element);
                    }}
                    expanded={false}
                    style={{ pointerEvents: "auto", marginBottom: "-0.9rem" }}
                  >
                    <AccordionSummary
                      // expandIcon={<ExpandMoreIcon />}

                      aria-controls="alert-content"
                      id="alert-header"
                    >
                      <Typography
                        // variant="body2"
                        className={classes.notificationAccordionheading}
                      >
                        {getFormattedDateForNotification(
                          element.timestamp * 1000
                        )}
                      </Typography>
                      <span style={{ marginInline: ".5rem" }}></span>
                      <Typography
                        // variant="body2"

                        className={classes.notificationAccordionSubheading}
                        style={{ color: "red" }}
                      >
                        <span style={{ color: "black" }}>
                          {element.ticket}
                          &emsp;
                        </span>
                        {getFormattedTitleForNotification(
                          element.site,
                          element.alarm
                        )}
                      </Typography>
                    </AccordionSummary>
                    {/* <AccordionDetails
                      style={{ paddingTop: "0rem", paddingBottom: ".75rem" }}
                    >
                      <Typography
                        style={{ fontSize: ".75rem", cursor: "pointer" }}
                        title="Click to open detail"
                        onClick={() => handleNotificationClick(index)}
                      >
                        {element.issue}
                      </Typography>
                    </AccordionDetails> */}
                  </Accordion>
                );
              })}
          </div>
        </div>
      </main>
      {listItemIndex === "Admin" &&
        selectedSiteFromChild === "" &&
        username &&
        !username.includes("Gadarpur") && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Admin
              updateInverter={updateInverter}
              updateInverterScb={updateInverterScb}
              refreshInverterTable={refreshInverterTable}
              refreshSiteEditTable={refreshSiteEditTable}
              updateSite={updateSite}
              handleSessionExpire={handleSessionExpire}
            />
          </main>
        )}
      {listItemIndex === "Sites" &&
        selectedSiteFromChild === "" &&
        username &&
        !username.includes("Gadarpur") && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {/* <Comparison /> */}
            <Sites
              handleSiteClickInParent={handleSiteClick}
              handleSessionExpire={handleSessionExpire}
              setOpen={setOpen}
              open={open}
              setShowNotemsg={setShowNotemsg}

              // handleClickOpen={handleClickOpen}
            />
          </main>
        )}
      {listItemIndex === "Inverter Efficiency" &&
        username &&
        !username.includes("Gadarpur") && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <InverterEfficiency handleSessionExpire={handleSessionExpire} />
          </main>
        )}
      {listItemIndex === "ML Predictions" &&
        username &&
        !username.includes("Gadarpur") && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Mlprediction handleSessionExpire={handleSessionExpire} />
          </main>
        )}
      {/* {listItemIndex === 'SCB' ||
        (listItemIndex === 0 && username && username.includes("Gadarpur") && (
          <main className={classes.content} style={{ paddingRight: 0 }}>
            <div className={classes.toolbar} />
            <SCB handleSessionExpire={handleSessionExpire} />
          </main>
        ))
      } */}
      {listItemIndex === "SCB" && (
        <main className={classes.content} style={{ paddingRight: 0 }}>
          <div className={classes.toolbar} />
          <SCB handleSessionExpire={handleSessionExpire} />
        </main>
      )}
      {listItemIndex === "Analytics" &&
        username &&
        !username.includes("Gadarpur") && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Analytics handleSessionExpire={handleSessionExpire} />
          </main>
        )}
      {listItemIndex === "Performance" &&
        username &&
        !username.includes("Gadarpur") && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Performance handleSessionExpire={handleSessionExpire} />
          </main>
        )}
      {listItemIndex === "CSV" &&
        username &&
        !username.includes("Gadarpur") && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <CSV handleSessionExpire={handleSessionExpire} />
          </main>
        )}
      {/* {listItemIndex === 8 && username && !username.includes("Gadarpur") && (
        <main className={classes.flexContent}>
          <div className={classes.toolbar} />
          <LossAnalytics />
        </main>
      )} */}
      {listItemIndex === "Alerts" &&
        username &&
        !username.includes("Gadarpur") && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Alerts
              handleSessionExpire={handleSessionExpire}
              handleTicketModal={handleTicketModal}
              handleNotificationClick={handleNotificationClick}
            />
          </main>
        )}

      <noscript>Render site on click</noscript>
      {selectedSiteFromChild !== "" && selectedSiteFromChild === "Byagwat" && (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Byagwat
            handleSessionExpire={handleSessionExpire}
            handleClickOpen={handleClickOpen}
            sitestatusBar={sitestatusBar}
          />
        </main>
      )}
      {selectedSiteFromChild !== "" &&
        selectedSiteFromChild === "Kherakhurd" && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Kherakhurd
              handleSessionExpire={handleSessionExpire}
              handleClickOpen={handleClickOpen}
              sitestatusBar={sitestatusBar}
            />
          </main>
        )}
      {selectedSiteFromChild !== "" && selectedSiteFromChild === "Hindupur" && (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Hindupur
            handleSessionExpire={handleSessionExpire}
            handleClickOpen={handleClickOpen}
            sitestatusBar={sitestatusBar}
          />
        </main>
      )}
      {selectedSiteFromChild !== "" && selectedSiteFromChild === "Sircilla" && (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Sircilla
            handleSessionExpire={handleSessionExpire}
            handleClickOpen={handleClickOpen}
            sitestatusBar={sitestatusBar}
          />
        </main>
      )}
      {selectedSiteFromChild !== "" && selectedSiteFromChild === "Gadarpur" && (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Gadarpur
            handleSessionExpire={handleSessionExpire}
            handleClickOpen={handleClickOpen}
            sitestatusBar={sitestatusBar}
          />
        </main>
      )}
      {selectedSiteFromChild !== "" &&
        selectedSiteFromChild === "Yemmiganur" && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Yemmiganur
              handleSessionExpire={handleSessionExpire}
              handleClickOpen={handleClickOpen}
              sitestatusBar={sitestatusBar}
            />
          </main>
        )}
      {selectedSiteFromChild !== "" && selectedSiteFromChild === "Mahoba" && (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Mahoba
            handleSessionExpire={handleSessionExpire}
            handleClickOpen={handleClickOpen}
            sitestatusBar={sitestatusBar}
          />
        </main>
      )}
      {selectedSiteFromChild !== "" && selectedSiteFromChild === "Balangir" && (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Balangir
            handleSessionExpire={handleSessionExpire}
            handleClickOpen={handleClickOpen}
            sitestatusBar={sitestatusBar}
          />
        </main>
      )}
      {selectedSiteFromChild !== "" &&
        selectedSiteFromChild === "Bhadla L2" && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <BhadlaL2
              handleSessionExpire={handleSessionExpire}
              handleClickOpen={handleClickOpen}
              sitestatusBar={sitestatusBar}
            />
          </main>
        )}
      {selectedSiteFromChild !== "" &&
        selectedSiteFromChild === "Jhandekalan" && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Jhandekalan
              handleSessionExpire={handleSessionExpire}
              handleClickOpen={handleClickOpen}
              sitestatusBar={sitestatusBar}
            />
          </main>
        )}
      {selectedSiteFromChild !== "" &&
        selectedSiteFromChild === "Bhadla L3" && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <BhadlaL3
              handleSessionExpire={handleSessionExpire}
              handleClickOpen={handleClickOpen}
              sitestatusBar={sitestatusBar}
            />
          </main>
        )}
      {selectedSiteFromChild !== "" && selectedSiteFromChild === "Nangla" && (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Nangla
            handleSessionExpire={handleSessionExpire}
            handleClickOpen={handleClickOpen}
            sitestatusBar={sitestatusBar}
          />
        </main>
      )}
      {selectedSiteFromChild !== "" && selectedSiteFromChild === "Mankhera" && (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Mankhera
            handleSessionExpire={handleSessionExpire}
            handleClickOpen={handleClickOpen}
            sitestatusBar={sitestatusBar}
          />
        </main>
      )}
      {selectedSiteFromChild !== "" && selectedSiteFromChild === "Jhunir" && (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Jhunir
            handleSessionExpire={handleSessionExpire}
            handleClickOpen={handleClickOpen}
            sitestatusBar={sitestatusBar}
          />
        </main>
      )}
      {selectedSiteFromChild !== "" && selectedSiteFromChild === "Bhongir" && (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Bhongir
            handleSessionExpire={handleSessionExpire}
            handleClickOpen={handleClickOpen}
            sitestatusBar={sitestatusBar}
          />
        </main>
      )}
      {selectedSiteFromChild !== "" &&
        selectedSiteFromChild === "Padmajiwadi" && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Padmajiwadi
              handleSessionExpire={handleSessionExpire}
              handleClickOpen={handleClickOpen}
              sitestatusBar={sitestatusBar}
            />
          </main>
        )}
      {selectedSiteFromChild !== "" && selectedSiteFromChild === "Mothkur" && (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Mothkur
            handleSessionExpire={handleSessionExpire}
            handleClickOpen={handleClickOpen}
            sitestatusBar={sitestatusBar}
          />
        </main>
      )}
      {selectedSiteFromChild !== "" &&
        selectedSiteFromChild === "Sadashivpet" && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Sadashivpet
              handleSessionExpire={handleSessionExpire}
              handleClickOpen={handleClickOpen}
              sitestatusBar={sitestatusBar}
            />
          </main>
        )}
      {selectedSiteFromChild !== "" &&
        selectedSiteFromChild === "Pattikonda" && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Pattikonda
              handleSessionExpire={handleSessionExpire}
              handleClickOpen={handleClickOpen}
              sitestatusBar={sitestatusBar}
            />
          </main>
        )}
      {selectedSiteFromChild !== "" &&
        selectedSiteFromChild === "Rayachoti" && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Rayachoti
              handleSessionExpire={handleSessionExpire}
              handleClickOpen={handleClickOpen}
              sitestatusBar={sitestatusBar}
            />
          </main>
        )}
      {selectedSiteFromChild !== "" && selectedSiteFromChild === "Bikaner" && (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Bikaner
            handleSessionExpire={handleSessionExpire}
            handleClickOpen={handleClickOpen}
            sitestatusBar={sitestatusBar}
          />
        </main>
      )}
      {selectedSiteFromChild !== "" &&
        selectedSiteFromChild === "Santhipuram" && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Santhipuram
              handleSessionExpire={handleSessionExpire}
              handleClickOpen={handleClickOpen}
              sitestatusBar={sitestatusBar}
            />
          </main>
        )}
      {selectedSiteFromChild !== "" &&
        selectedSiteFromChild === "Chittorgarh" && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Chittorgarh
              handleSessionExpire={handleSessionExpire}
              handleClickOpen={handleClickOpen}
              sitestatusBar={sitestatusBar}
            />
          </main>
        )}
      {selectedSiteFromChild !== "" &&
        selectedSiteFromChild === "Chattisgarh" && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Chattisgarh
              handleSessionExpire={handleSessionExpire}
              handleClickOpen={handleClickOpen}
              sitestatusBar={sitestatusBar}
            />
          </main>
        )}
      {selectedSiteFromChild !== "" &&
        selectedSiteFromChild === "Balanagar" && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Balanagar
              handleSessionExpire={handleSessionExpire}
              handleClickOpen={handleClickOpen}
              sitestatusBar={sitestatusBar}
            />
          </main>
        )}
      {selectedSiteFromChild !== "" && selectedSiteFromChild === "Kosigi" && (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Kosigi
            handleSessionExpire={handleSessionExpire}
            handleClickOpen={handleClickOpen}
            sitestatusBar={sitestatusBar}
          />
        </main>
      )}
      {selectedSiteFromChild !== "" && selectedSiteFromChild === "Sandur" && (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Sandur
            handleSessionExpire={handleSessionExpire}
            handleClickOpen={handleClickOpen}
            sitestatusBar={sitestatusBar}
          />
        </main>
      )}
      {selectedSiteFromChild !== "" && selectedSiteFromChild === "Kudligi" && (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Kudligi
            handleSessionExpire={handleSessionExpire}
            handleClickOpen={handleClickOpen}
            sitestatusBar={sitestatusBar}
          />
        </main>
      )}
      {selectedSiteFromChild !== "" &&
        selectedSiteFromChild === "Gulelgudda" && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Gulelgudda
              handleSessionExpire={handleSessionExpire}
              handleClickOpen={handleClickOpen}
              sitestatusBar={sitestatusBar}
            />
          </main>
        )}
      {selectedSiteFromChild !== "" && selectedSiteFromChild === "Hukkeri" && (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Hukkeri
            handleSessionExpire={handleSessionExpire}
            handleClickOpen={handleClickOpen}
            sitestatusBar={sitestatusBar}
          />
        </main>
      )}
      {selectedSiteFromChild !== "" && selectedSiteFromChild === "Kittur" && (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Kittur
            handleSessionExpire={handleSessionExpire}
            handleClickOpen={handleClickOpen}
            sitestatusBar={sitestatusBar}
          />
        </main>
      )}
      {selectedSiteFromChild !== "" && selectedSiteFromChild === "Bazpur" && (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Bazpur
            handleSessionExpire={handleSessionExpire}
            handleClickOpen={handleClickOpen}
            sitestatusBar={sitestatusBar}
          />
        </main>
      )}
      {selectedSiteFromChild !== "" &&
        selectedSiteFromChild === "Sidlaghatta" && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Sidlaghatta
              handleSessionExpire={handleSessionExpire}
              handleClickOpen={handleClickOpen}
              sitestatusBar={sitestatusBar}
            />
          </main>
        )}
      {selectedSiteFromChild !== "" &&
        selectedSiteFromChild === "Khilchipur" && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Khilchipur
              handleSessionExpire={handleSessionExpire}
              handleClickOpen={handleClickOpen}
              sitestatusBar={sitestatusBar}
            />
          </main>
        )}
      {selectedSiteFromChild !== "" && selectedSiteFromChild === "Khambhat" && (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Khambhat
            handleSessionExpire={handleSessionExpire}
            handleClickOpen={handleClickOpen}
            sitestatusBar={sitestatusBar}
          />
        </main>
      )}
      {selectedSiteFromChild !== "" && selectedSiteFromChild === "Bidar" && (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Bidar
            handleSessionExpire={handleSessionExpire}
            handleClickOpen={handleClickOpen}
            sitestatusBar={sitestatusBar}
          />
        </main>
      )}
      {selectedSiteFromChild !== "" &&
        selectedSiteFromChild === "Chittuguppa" && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Chittuguppa
              handleSessionExpire={handleSessionExpire}
              handleClickOpen={handleClickOpen}
              sitestatusBar={sitestatusBar}
            />
          </main>
        )}
      {selectedSiteFromChild !== "" &&
        selectedSiteFromChild === "Farhatabad" && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Farhatabad
              handleSessionExpire={handleSessionExpire}
              handleClickOpen={handleClickOpen}
              sitestatusBar={sitestatusBar}
            />
          </main>
        )}
      {selectedSiteFromChild !== "" && selectedSiteFromChild === "Godhur" && (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Godhur
            handleSessionExpire={handleSessionExpire}
            handleClickOpen={handleClickOpen}
            sitestatusBar={sitestatusBar}
          />
        </main>
      )}
      {selectedSiteFromChild !== "" && selectedSiteFromChild === "Manthani" && (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Manthani
            handleSessionExpire={handleSessionExpire}
            handleClickOpen={handleClickOpen}
            sitestatusBar={sitestatusBar}
          />
        </main>
      )}
      {selectedSiteFromChild !== "" && selectedSiteFromChild === "Banka M" && (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <BankaM
            handleSessionExpire={handleSessionExpire}
            handleClickOpen={handleClickOpen}
            sitestatusBar={sitestatusBar}
          />
        </main>
      )}
      {selectedSiteFromChild !== "" && selectedSiteFromChild === "Banka N" && (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <BankaN
            handleSessionExpire={handleSessionExpire}
            handleClickOpen={handleClickOpen}
            sitestatusBar={sitestatusBar}
          />
        </main>
      )}
      {selectedSiteFromChild !== "" && selectedSiteFromChild === "Maddur" && (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Maddur
            handleSessionExpire={handleSessionExpire}
            handleClickOpen={handleClickOpen}
            sitestatusBar={sitestatusBar}
          />
        </main>
      )}
      {selectedSiteFromChild !== "" && selectedSiteFromChild === "Badisidd" && (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Badisidd
            handleSessionExpire={handleSessionExpire}
            handleClickOpen={handleClickOpen}
            sitestatusBar={sitestatusBar}
          />
        </main>
      )}

      <noscript>Download Excel File Modal</noscript>
      <Modal
        open={modalState.openModal}
        onClose={handleModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: "flex",
          justifyContent: "center",
          // paddingTop: "10rem",
          alignItems: "center",
        }}
      >
        {modalState.openCSVModal ? (
          <Card
            style={{
              outline: "none",
              paddingInline: "1rem",
              paddingTop: ".8rem",
              paddingBottom: ".9rem",
              width: 350,
            }}
            elevation={4}
          >
            <Grid container spacing={3}>
              <Grid item>
                <Typography>
                  {new Date(
                    clickedNotificationData.timestamp * 1000
                  ).toLocaleTimeString()}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  style={{
                    color:
                      clickedNotificationData.state === "critical"
                        ? "red"
                        : "blue",
                  }}
                >
                  {clickedNotificationData.site[0].toUpperCase()}
                  {clickedNotificationData.site.slice(1)} -{" "}
                  {clickedNotificationData.alarm} Down
                </Typography>
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: ".5rem" }}>
              <Grid item>
                <Typography variant="body2">
                  Ticket: {clickedNotificationData.ticket}
                </Typography>
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: ".5rem" }}>
              <Grid item>
                <Typography variant="body2">
                  State: {clickedNotificationData.state[0].toUpperCase()}
                  {clickedNotificationData.state.slice(1)}
                </Typography>
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: ".75rem" }}>
              <Grid item>
                <Typography variant="body2">
                  Description:&nbsp;
                  {clickedNotificationData.issue}
                </Typography>
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: "1rem" }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Status</FormLabel>
                <RadioGroup
                  row
                  aria-label="notification-status"
                  name="notification-status-radio-group"
                  onChange={(event) =>
                    handleNotificationNewStatusChange(event.target.value)
                  }
                  defaultValue={clickedNotificationData.status}
                >
                  <FormControlLabel
                    value="Open"
                    control={<Radio color="primary" />}
                    label="Open"
                  />
                  <FormControlLabel
                    value="Pending"
                    control={<Radio color="primary" />}
                    label="Pending"
                  />
                  <FormControlLabel
                    value="Resolved"
                    control={<Radio color="primary" />}
                    label="Resolved"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <form onSubmit={(e) => e.preventDefault()}>
              <Grid container style={{ marginTop: ".25rem" }}>
                <Grid item style={{ width: "100%" }}>
                  <textarea
                    placeholder={clickedNotificationData.remarks}
                    rows="4"
                    style={{
                      width: "100%",
                    }}
                    className="textarea"
                    ref={notificationRemarksRef}
                    onChange={notificationTextAreaInputChange}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={1}
                justifyContent="flex-end"
                style={{ marginTop: ".1rem" }}
              >
                <Grid item>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      setModalState({ openModal: false, openCSVModal: false });
                    }}
                  >
                    Close
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => {
                      handleNotificationSubmit(
                        clickedNotificationData.ticket,
                        clickedNotificationData.site,
                        clickedNotificationData.alarm
                      );
                    }}
                    disabled={
                      clickedNotificationData.status === "Resolved"
                        ? true
                        : disabledNotificationSubmitBtn
                    }
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        ) : modalState.openTicketModal ? (
          <Card elevation={1} style={{ padding: ".75rem" }}>
            <div>
              Ticket: <span style={{ color: "blue" }}>{alertData.ticket}</span>
            </div>
            <div style={{ marginBlock: ".2rem" }} />
            <div>Remarks: {alertData.remarks}</div>
          </Card>
        ) : modalState.openInverterModal ? (
          <Card
            style={{
              outline: "none",
              paddingInline: "1rem",
              paddingTop: ".8rem",
              paddingBottom: ".9rem",
              width: 690,
            }}
            elevation={4}
          >
            <Grid container justifyContent="center">
              <Grid item>
                <Typography color="primary" variant="h6">
                  Update Inverter
                </Typography>
              </Grid>
            </Grid>

            <Grid container style={{ marginTop: ".25rem" }} spacing={4}>
              <Grid item>
                <span style={{ color: "#21618C" }}>Id:</span>
                {selectedInverter.id}
              </Grid>
              {/* <Grid item>Id: {selectedInverter.id}</Grid> */}
              <Grid item>
                <span style={{ color: "#21618C" }}>Site:</span>
                {selectedInverter.sitename}
              </Grid>
              <Grid item>
                <span style={{ color: "#21618C" }}>Block:</span>
                {selectedInverter.block}
              </Grid>
              <Grid item>
                <span style={{ color: "#21618C" }}>Inverter:</span>
                {selectedInverter.inverter}
              </Grid>
            </Grid>

            <Grid container spacing={1} style={{ marginTop: ".75rem" }}>
              <Grid item>
                <span style={{ color: "#21618C" }}> Group: </span>
                <input
                  style={{ outlineColor: "#21618C" }}
                  placeholder={selectedInverter.inv_group}
                  onChange={(e) =>
                    setSelectedInverter((prevState) => ({
                      ...prevState,
                      inv_group: e.target.value,
                    }))
                  }
                  size="10"
                />
              </Grid>
              <Grid item>
                <span style={{ color: "#21618C" }}> Make: </span>
                <input
                  style={{ outlineColor: "#21618C" }}
                  placeholder={selectedInverter.inverter_make}
                  onChange={(e) =>
                    setSelectedInverter((prevState) => ({
                      ...prevState,
                      inverter_make: e.target.value,
                    }))
                  }
                  size="10"
                />
              </Grid>
              <Grid item>
                <span style={{ color: "#21618C" }}> Number: </span>
                <input
                  style={{ outlineColor: "#21618C" }}
                  placeholder={selectedInverter.inverter_num}
                  onChange={(e) =>
                    setSelectedInverter((prevState) => ({
                      ...prevState,
                      inverter_num: e.target.value,
                    }))
                  }
                  size="10"
                />
              </Grid>
              <Grid item>
                <span style={{ color: "#21618C" }}> Type: </span>
                <input
                  style={{ outlineColor: "#21618C" }}
                  placeholder={selectedInverter.inverter_type}
                  onChange={(e) =>
                    setSelectedInverter((prevState) => ({
                      ...prevState,
                      inverter_type: e.target.value,
                    }))
                  }
                  size="11"
                />
              </Grid>
            </Grid>

            <Grid container spacing={1} style={{ marginTop: ".5rem" }}>
              <Grid item>
                <span style={{ color: "#21618C" }}> Mod Rating: </span>
                <input
                  style={{ outlineColor: "#21618C" }}
                  placeholder={selectedInverter.module_rating}
                  onChange={(e) =>
                    setSelectedInverter((prevState) => ({
                      ...prevState,
                      module_rating: e.target.value,
                    }))
                  }
                  size="6"
                />
              </Grid>
              <Grid item>
                <span style={{ color: "#21618C" }}> Peak 1: </span>
                <input
                  style={{ outlineColor: "#21618C" }}
                  placeholder={selectedInverter.peak1}
                  onChange={(e) =>
                    setSelectedInverter((prevState) => ({
                      ...prevState,
                      peak1: e.target.value,
                    }))
                  }
                  size="9"
                />
              </Grid>
              <Grid item>
                <span style={{ color: "#21618C" }}>Peak 2: </span>
                <input
                  style={{ outlineColor: "#21618C" }}
                  placeholder={selectedInverter.peak1}
                  onChange={(e) =>
                    setSelectedInverter((prevState) => ({
                      ...prevState,
                      peak2: e.target.value,
                    }))
                  }
                  size="11"
                />
              </Grid>
              <Grid item>
                <span style={{ color: "#21618C" }}> SCB Con: </span>
                <input
                  style={{ outlineColor: "#21618C" }}
                  placeholder={selectedInverter.scb_connected}
                  onChange={(e) =>
                    setSelectedInverter((prevState) => ({
                      ...prevState,
                      scb_connected: e.target.value,
                    }))
                  }
                  size="7"
                />
              </Grid>
            </Grid>

            <Grid container spacing={1} style={{ marginTop: ".5rem" }}>
              <Grid item>
                <span style={{ color: "#21618C" }}>Slots: </span>
                <input
                  style={{ outlineColor: "#21618C" }}
                  placeholder={selectedInverter.slots}
                  onChange={(e) =>
                    setSelectedInverter((prevState) => ({
                      ...prevState,
                      slots: e.target.value,
                    }))
                  }
                  size="11"
                />
              </Grid>
              <Grid item>
                <span style={{ color: "#21618C" }}> Strings Con: </span>
                <input
                  style={{ outlineColor: "#21618C" }}
                  placeholder={selectedInverter.strings_connected}
                  onChange={(e) =>
                    setSelectedInverter((prevState) => ({
                      ...prevState,
                      strings_connected: e.target.value,
                    }))
                  }
                  size="5"
                />
              </Grid>
              <Grid item>
                <span style={{ color: "#21618C" }}> Omega Id: </span>
                <input
                  style={{ outlineColor: "#21618C" }}
                  placeholder={selectedInverter.omegaid}
                  onChange={(e) =>
                    setSelectedInverter((prevState) => ({
                      ...prevState,
                      omegaid: e.target.value,
                    }))
                  }
                  size="9"
                />
              </Grid>
              <Grid item>
                <span style={{ color: "#21618C" }}> Tech Email: </span>
                <input
                  style={{ outlineColor: "#21618C" }}
                  placeholder={selectedInverter.email}
                  onChange={(e) =>
                    setSelectedInverter((prevState) => ({
                      ...prevState,
                      email: e.target.value,
                    }))
                  }
                  size="6"
                />
              </Grid>
            </Grid>

            <Grid container spacing={1} style={{ marginTop: ".5rem" }}>
              <Grid item>
                <span style={{ color: "#21618C" }}> Tech Name: </span>
                <input
                  style={{ outlineColor: "#21618C" }}
                  placeholder={selectedInverter.techname}
                  onChange={(e) =>
                    setSelectedInverter((prevState) => ({
                      ...prevState,
                      techname: e.target.value,
                    }))
                  }
                  size="6"
                />
              </Grid>
              <Grid item>
                <span style={{ color: "#21618C" }}> Clipping Threshold: </span>
                <input
                  style={{ outlineColor: "#21618C" }}
                  placeholder={selectedInverter.clipping_threshold}
                  onChange={(e) =>
                    setSelectedInverter((prevState) => ({
                      ...prevState,
                      clipping_threshold: e.target.value,
                    }))
                  }
                  size="1"
                />
              </Grid>
            </Grid>

            <Grid
              container
              style={{ marginTop: "1rem" }}
              spacing={1}
              justifyContent="center"
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleUpdateInverter}
                >
                  Update
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleModalClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Card>
        ) : modalState.openInverterScbModal ? (
          <Card
            style={{
              outline: "none",
              paddingInline: "1rem",
              paddingTop: ".8rem",
              paddingBottom: ".9rem",
              width: 990,
              pointerEvents: "auto",
              // height: 500,
            }}
            elevation={4}
          >
            <Grid container justifyContent="center">
              <Grid item>
                <Typography color="primary" variant="h6">
                  Update Inverter-Scb
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={4}>
              {/* <Grid item>Id: {selectedInverter.id}</Grid> */}
              <Grid item>
                <span style={{ color: "#21618C" }}>Site:</span>
                {selectedInverterScb.sitename}
              </Grid>
              <Grid item>
                <span style={{ color: "#21618C" }}>Block:</span>{" "}
                {selectedInverterScb.block}
              </Grid>
              <Grid item>
                <span style={{ color: "#21618C" }}>Inverter:</span>{" "}
                {selectedInverterScb.inverter}
              </Grid>
            </Grid>

            {/* <Grid container style={{ marginTop: ".75rem" }} spacing={1}> */}
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              // style={{ marginTop: "1rem" }}
            >
              <Grid
                container
                // spacing={1}
                alignItems="center"
                // style={{ marginLeft: "0.2rem" }}
              >
                <Grid item>
                  <GreenCheckbox
                    checked={selectedInverterScb.s1_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s1_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.4rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S1:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s1}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s1: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.7rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S1-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s1_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s1_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "1rem" }}>
                  <GreenCheckbox
                    checked={selectedInverterScb.s2_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s2_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.4rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S2:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s2}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s2: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "1rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S2-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s2_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s2_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>

                {/* <Grid container style={{ marginTop: ".5rem" }}> */}
                <Grid item style={{ marginLeft: "1rem" }}>
                  <GreenCheckbox
                    checked={selectedInverterScb.s3_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s3_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.4rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S3:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s3}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s3: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.8rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S3-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s3_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s3_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "1rem" }}>
                  <GreenCheckbox
                    checked={selectedInverterScb.s4_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s4_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.5rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S4:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s4}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s4: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.9rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S4-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s4_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s4_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
              </Grid>

              <Grid
                container
                // spacing={1}
                alignItems="center"
                style={{ marginTop: "2px" }}
              >
                <Grid item>
                  <GreenCheckbox
                    checked={selectedInverterScb.s5_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s5_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.4rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S5:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s5}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s5: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.7rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S5-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s5_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s5_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>

                <Grid item style={{ marginLeft: "1rem" }}>
                  <GreenCheckbox
                    checked={selectedInverterScb.s6_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s6_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.5rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S6:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s6}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s6: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                {/* <Grid container style={{ marginTop: ".5rem" }}> */}
                <Grid item style={{ marginLeft: "0.9rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S6-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s6_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s6_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "1rem" }}>
                  <GreenCheckbox
                    checked={selectedInverterScb.s7_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s7_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.4rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S7:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s7}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s7: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.8rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S7-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s7_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s7_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "1rem" }}>
                  <GreenCheckbox
                    checked={selectedInverterScb.s8_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s8_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.5rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S8:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s8}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s8: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.9rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S8-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s8_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s8_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
              </Grid>
              <Grid
                container
                // spacing={1}
                alignItems="center"
                style={{ marginTop: "2px" }}
              >
                <Grid item>
                  <GreenCheckbox
                    checked={selectedInverterScb.s9_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s9_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.3rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S9:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s9}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s9: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.9rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S9-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s9_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s9_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "1rem" }}>
                  <GreenCheckbox
                    checked={selectedInverterScb.s10_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s10_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S10:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s10}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s10: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.5rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S10-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s10_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s10_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "1rem" }}>
                  <GreenCheckbox
                    checked={selectedInverterScb.s11_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s11_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S11:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s11}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s11: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.4rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S11-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s11_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s11_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "1rem" }}>
                  <GreenCheckbox
                    checked={selectedInverterScb.s12_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s12_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S12:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s12}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s12: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.4rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S12-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s12_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s12_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                // spacing={1}
                style={{ marginTop: "2px" }}
              >
                <Grid item>
                  <GreenCheckbox
                    checked={selectedInverterScb.s13_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s13_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>

                <Grid item>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S13:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s13}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s13: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.4rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S13-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s13_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s13_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "1rem" }}>
                  <GreenCheckbox
                    checked={selectedInverterScb.s14_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s14_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S14:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s14}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s14: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.4rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S14-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s14_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s14_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>

                {/* </Grid> */}

                {/* <Grid container style={{ marginTop: ".5rem" }}> */}
                <Grid item style={{ marginLeft: "1rem" }}>
                  <GreenCheckbox
                    checked={selectedInverterScb.s15_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s15_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S15:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s15}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s15: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.4rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S15-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s15_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s15_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "1rem" }}>
                  <GreenCheckbox
                    checked={selectedInverterScb.s16_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s16_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S16:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s16}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s16: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                {/* <Grid container style={{ marginTop: ".5rem" }}> */}
                <Grid item style={{ marginLeft: "0.4rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S16-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s16_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s16_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                // spacing={1}
                style={{ marginTop: "2px" }}
              >
                <Grid item>
                  <GreenCheckbox
                    checked={selectedInverterScb.s17_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s17_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S17:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s17}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s17: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.4rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S17-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s17_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s17_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "1rem" }}>
                  <GreenCheckbox
                    checked={selectedInverterScb.s18_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s18_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S18:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s18}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s18: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.4rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S18-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s18_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s18_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "1rem" }}>
                  <GreenCheckbox
                    checked={selectedInverterScb.s19_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s19_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S19:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s19}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s19: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.4rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S19-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s19_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s19_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "1rem" }}>
                  <GreenCheckbox
                    checked={selectedInverterScb.s20_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s20_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S20:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s20}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s20: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.4rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S20-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s20_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s20_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                // spacing={1}
                style={{ marginTop: "2px" }}
              >
                <Grid item>
                  <GreenCheckbox
                    checked={selectedInverterScb.s21_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s21_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S21:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s21}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s21: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.4rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S21-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s21_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s21_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "1rem" }}>
                  <GreenCheckbox
                    checked={selectedInverterScb.s22_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s22_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S22:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s22}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s22: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.4rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S22-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s22_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s22_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>

                {/* <Grid container style={{ marginTop: ".5rem" }}> */}
                <Grid item style={{ marginLeft: "1rem" }}>
                  <GreenCheckbox
                    checked={selectedInverterScb.s23_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s23_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S23:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s23}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s23: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.4rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S23-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s23_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s23_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "1rem" }}>
                  <GreenCheckbox
                    checked={selectedInverterScb.s24_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s24_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S24:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s24}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s24: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.4rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S24-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s24_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s24_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
              </Grid>

              <Grid
                container
                alignItems="center"
                // spacing={1}
                style={{ marginTop: "2px" }}
              >
                <Grid item>
                  <GreenCheckbox
                    checked={selectedInverterScb.s25_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s25_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S25:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s25}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s25: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.4rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S25-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s25_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s25_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "1rem" }}>
                  <GreenCheckbox
                    checked={selectedInverterScb.s26_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s26_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S26:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s26}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s26: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                {/* <Grid container style={{ marginTop: ".5rem" }}> */}
                <Grid item style={{ marginLeft: "0.4rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S26-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s26_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s26_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "1rem" }}>
                  <GreenCheckbox
                    checked={selectedInverterScb.s27_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s27_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S27:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s27}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s27: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.4rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S27-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s27_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s27_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "1rem" }}>
                  <GreenCheckbox
                    checked={selectedInverterScb.s28_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s28_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S28:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s28}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s28: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.4rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S28-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s28_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s28_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                // spacing={1}
                style={{ marginTop: "2px" }}
              >
                <Grid item>
                  <GreenCheckbox
                    checked={selectedInverterScb.s29_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s29_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S29:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s29}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s29: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.4rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S29-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s29_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s29_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "1rem" }}>
                  <GreenCheckbox
                    checked={selectedInverterScb.s30_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s30_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S30:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s30}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s30: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.4rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S30-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s30_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s30_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "1rem" }}>
                  <GreenCheckbox
                    checked={selectedInverterScb.s31_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s31_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S31:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s31}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s31: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.4rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S31-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s31_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s31_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "1rem" }}>
                  <GreenCheckbox
                    checked={selectedInverterScb.s32_status}
                    color="primary"
                    size="small"
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s32_status: e.target.checked,
                      }))
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S32:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s32}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s32: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.4rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#21618C" }}>
                    S32-Field:{" "}
                  </span>
                  <input
                    style={{ height: "1.5rem", outlineColor: "#21618C" }}
                    placeholder={selectedInverterScb.s32_field}
                    onChange={(e) =>
                      setSelectedInverterScb((prevState) => ({
                        ...prevState,
                        s32_field: e.target.value,
                      }))
                    }
                    size="2"
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid
              container
              style={{ marginTop: "1rem" }}
              spacing={1}
              justifyContent="center"
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleUpdateInverterScb}
                >
                  Update
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleModalClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Card>
        ) : modalState.openSiteEditModal ? (
          <Card
            style={{
              outline: "none",
              paddingInline: "1rem",
              paddingTop: ".8rem",
              paddingBottom: ".9rem",
              width: 550,
            }}
            elevation={4}
          >
            <Grid container justifyContent="center">
              <Grid item>
                <Typography color="primary" variant="h6">
                  Update Site
                </Typography>
              </Grid>
            </Grid>

            <Grid container style={{ marginTop: ".25rem" }} spacing={2}>
              <Grid item>
                <strong>Id: </strong>
                {selectedSiteEdit.id}
              </Grid>
              <Grid item>
                <strong>Site: </strong>
                {selectedSiteEdit.sitename}
              </Grid>
              <Grid item>
                <strong>Capacity: </strong>
                {selectedSiteEdit.capacity} MW
              </Grid>
              <Grid item>
                <strong>Blocks: </strong>
                {selectedSiteEdit.totalblocks}
              </Grid>
              <Grid item>
                <strong>Inverters: </strong>
                {selectedSiteEdit.inverters}
              </Grid>
              <Grid item>
                <strong>Status: </strong>
                {selectedSiteEdit.status}
              </Grid>
              <Grid item>
                <strong>System Id: </strong>
                {selectedSiteEdit.systemid}
              </Grid>
            </Grid>

            <Grid container style={{ marginTop: ".75rem" }} spacing={1}>
              <Grid item>
                Capacity:{" "}
                <input
                  placeholder={selectedSiteEdit.capacity}
                  onChange={(e) =>
                    setSelectedSiteEdit((prevState) => ({
                      ...prevState,
                      capacity: e.target.value,
                    }))
                  }
                  size="5"
                />
              </Grid>
              <Grid item>
                Billing Rate:{" "}
                <input
                  placeholder={selectedSiteEdit.billingrates}
                  onChange={(e) =>
                    setSelectedSiteEdit((prevState) => ({
                      ...prevState,
                      billingrates: e.target.value,
                    }))
                  }
                  size="5"
                />
              </Grid>
              <Grid item>
                System IP:{" "}
                <input
                  placeholder={selectedSiteEdit.systemip}
                  onChange={(e) =>
                    setSelectedSiteEdit((prevState) => ({
                      ...prevState,
                      systemip: e.target.value,
                    }))
                  }
                  size="12"
                />
              </Grid>
            </Grid>

            <Grid
              container
              style={{ marginTop: ".8rem" }}
              spacing={1}
              justifyContent="center"
            >
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={handleUpdateSite}
                >
                  Update
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleModalClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Card>
        ) : (
          // <Card
          //   className={classes.modalCardStyle}
          //   style={{
          //     outline: "none",
          //     textAlign: "center",
          //     paddingBottom: "1rem",
          //   }}
          // >
          //   <CardContent>
          //     <Typography variant="h6" color="primary">
          //       Excel File
          //     </Typography>
          //     <FormControl
          //       style={{
          //         width: "85%",
          //         textAlign: "left",
          //         marginTop: "1rem",
          //         marginBottom: ".5rem",
          //       }}
          //     >
          //       <InputLabel id="site-select-helper-label">Site</InputLabel>
          //       <Select
          //         labelId="site-select-helper-label"
          //         id="site-select-helper"
          //         value={selectedSite}
          //         onChange={handleSiteChange}
          //       >
          //         <MenuItem value="none">
          //           <em style={{ color: "#9e9e9e" }}>None</em>
          //         </MenuItem>
          //         {getSiteNames() &&
          //           getSiteNames().map((siteName) => (
          //             <MenuItem key={siteName} value={siteName}>
          //               {siteName}
          //             </MenuItem>
          //           ))}
          //       </Select>
          //       {!isSiteSelected && (
          //         <FormHelperText>
          //           <span style={{ color: "red" }}>Select a site</span>
          //         </FormHelperText>
          //       )}
          //     </FormControl>
          //     <MuiPickersUtilsProvider utils={DateFnsUtils}>
          //       <KeyboardDatePicker
          //         style={{ width: "85%" }}
          //         disableToolbar
          //         variant="inline"
          //         format="dd/MM/yyyy"
          //         margin="normal"
          //         id="from-date-picker-inline"
          //         label="From"
          //         value={excelFromDate}
          //         onChange={handleExcelFromDate}
          //         autoOk={true}
          //       />
          //       <KeyboardDatePicker
          //         style={{ width: "85%" }}
          //         disableToolbar
          //         variant="inline"
          //         format="dd/MM/yyyy"
          //         margin="normal"
          //         id="to-date-picker-inline"
          //         label="To"
          //         value={excelToDate}
          //         onChange={handleExcelToDate}
          //         autoOk={true}
          //       />
          //     </MuiPickersUtilsProvider>
          //   </CardContent>
          //   <Button
          //     variant="outlined"
          //     color="primary"
          //     onClick={handleDownloadExcelButtonClick}
          //     disabled={disabledDownloadExcelButton}
          //     size="large"
          //     style={{
          //       width: "75%",
          //       marginTop: ".3rem",
          //       marginBottom: ".5rem",
          //     }}
          //     // disabled
          //   >
          //     Download
          //   </Button>
          //   {displayDownloadExcelAlert && (
          //     <div
          //       style={{
          //         marginTop: "1rem",
          //         marginBottom: ".5rem",
          //       }}
          //     >
          //       <span style={{ color: "#ff9800", fontSize: "1rem" }}>
          //         Select larger 'To' date.
          //       </span>
          //     </div>
          //   )}
          //   {noDataFound && (
          //     <div
          //       style={{
          //         marginTop: "1rem",
          //         marginBottom: ".5rem",
          //       }}
          //     >
          //       <span style={{ color: "#ff9800", fontSize: "1rem" }}>
          //         No data found.
          //         <br />
          //         Try selecting different dates.
          //       </span>
          //     </div>
          //   )}
          // </Card>
          <></>
        )}
      </Modal>
      <NoteDialog
        // notemsg={notemsg}
        showNotemsg={showNotemsg}
        // sendNotemsg={sendNotemsg}
        // getNotemsg={getNotemsg}
        // setNotemsg={setNotemsg}
        open={open}
        setOpen={setOpen}
        handleClose={handleClosed}
        handleClickOpen={handleClickOpen}
        // setMsgid={setMsgid}
        // deleteNotemsg={deleteNotemsg}
        // setAlertopen={setAlertopen}
        // alertopen={alertopen}
      />
      {/* <CustomSnackbar
        open={snackbarState.open}
        severity={snackbarState.severity}
        message={snackbarState.message}
        handleToggle={handleToggle}
      /> */}
    </div>
  );
}
