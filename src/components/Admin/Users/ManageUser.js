import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { SERVER_URL } from "../../../constants/constants";
import {
  locations,
  menu,
  notifications,
  alerts,
  profiles,
} from "../../../constants/UserAccess/options";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/styles";
// import Pagination from "@material-ui/lab/Pagination";
import Alert from "@material-ui/lab/Alert";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
// import PropTypes from "prop-types";
// import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
// import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
// import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
// import FirstPageIcon from "@material-ui/icons/FirstPage";
// import LastPageIcon from "@material-ui/icons/LastPage";

import { AppState } from "../../../AppContext";

const useStyles = makeStyles((theme) => ({
  menuPaper: {
    maxHeight: 400,
  },
  deleteButton: {
    // to make a red delete button
    borderColor: theme.palette.error.main,
    // background: theme.palette.error.main,
    color: theme.palette.error.main,
  },
  table: {
    minWidth: 500,
  },
  paginationicon: {
    "& .MuiIconButton-root.Mui-disabled": {
      color: "#9BD3DD",
    },
  },

  // tablePaginationCaption: {
  //   fontSize: "13px",
  //   color: "red",
  // },
  // tablePaginationSelectIcon: {
  //   color: "green",
  // },pga
  // tablePaginationSelect: {
  //   fontSize: "13px",
  //   color: "blue",
  // },
  tablePaginationActions: {
    color: "#19ABFF",
    // fill: "red",
    // "&:after": { color: "green" },
    // "&:before": {
    //   color: "green",
    // },
  },

  // selectDropdown: {
  // fontSize: "1px",
  // color: "green",
  // backgroundColor: "blue",
  // },
  menuItem: {
    fontSize: "12px",
    // backgroundColor: "red",
    // "&:before": {
    //   borderColor: "white",
    //   borderRadius: 5,
    //   content: "''",
    // },
    // "&:after": {
    //   borderColor: "rgba(255, 255, 255, 0.7)",
    //   borderRadius: 5,
    // },
    // "&:not(.Mui-disabled):hover::before": {
    //   borderColor: "white",
    //   borderRadius: 5,
    // },
    "&:focus": {
      backgroundColor: "lightblue",
    },
    // "&:hover": {
    // backgroundColor: "red",
    // color: "yellow",
    // },
  },
}));

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

// function TablePaginationActions(props) {
//   // const classes = useStyles();
//   const theme = useTheme();
//   const { count, page, rowsPerPage, onChangePage } = props;

//   const handleFirstPageButtonClick = (event) => {
//     onChangePage(event, 0);
//   };

//   const handleBackButtonClick = (event) => {
//     onChangePage(event, page - 1);
//   };

//   const handleNextButtonClick = (event) => {
//     onChangePage(event, page + 1);
//   };

//   const handleLastPageButtonClick = (event) => {
//     onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
//   };

//   return (
//     <div className={classes.root}>
//       <IconButton
//         onClick={handleFirstPageButtonClick}
//         disabled={page === 0}
//         aria-label="first page"
//       >
//         {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
//       </IconButton>
//       <IconButton
//         onClick={handleBackButtonClick}
//         disabled={page === 0}
//         aria-label="previous page"
//       >
//         {theme.direction === "rtl" ? (
//           <KeyboardArrowRight />
//         ) : (
//           <KeyboardArrowLeft />
//         )}
//       </IconButton>
//       <IconButton
//         onClick={handleNextButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="next page"
//       >
//         {theme.direction === "rtl" ? (
//           <KeyboardArrowLeft />
//         ) : (
//           <KeyboardArrowRight />
//         )}
//       </IconButton>
//       <IconButton
//         onClick={handleLastPageButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="last page"
//       >
//         {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
//       </IconButton>
//     </div>
//   );
// }

// TablePaginationActions.propTypes = {
//   count: PropTypes.number.isRequired,
//   onChangePage: PropTypes.func.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
// };

// function createData(name, calories, fat) {
//   return { name, calories, fat };
// }

// const rows = [
//   createData("Cupcake", 305, 3.7),
//   createData("Donut", 452, 25.0),
//   createData("Eclair", 262, 16.0),
//   createData("Frozen yoghurt", 159, 6.0),
//   createData("Gingerbread", 356, 16.0),
//   createData("Honeycomb", 408, 3.2),
//   createData("Ice cream sandwich", 237, 9.0),
//   createData("Jelly Bean", 375, 0.0),
//   createData("KitKat", 518, 26.0),
//   createData("Lollipop", 392, 0.2),
//   createData("Marshmallow", 318, 0),
//   createData("Nougat", 360, 19.0),
//   createData("Oreo", 437, 18.0),
// ].sort((a, b) => (a.calories < b.calories ? -1 : 1));

// const useStyles2 = makeStyles({
//   table: {
//     minWidth: 500,
//   },
//   selectDropdown: { color: "#fff", backgroundColor: "#1b1f38" },
//   menuItem: {
//     "&:hover": {
//       backgroundColor: "#3b3f58",
//     },
//   },
// });

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#ffffbf",

    color: theme.palette.common.black,
    fontSize: "13px",
  },
  body: {
    fontSize: "12px",
  },
}))(TableCell);

function ManageUser() {
  const { setEnabledLinearProgress } = AppState();
  const [show, setShow] = useState(false);

  // const [disabledViewBtn, setDisabledViewBtn] = useState(false);

  const classes = useStyles();
  // const classes = useStyles2();
  const [users, setUsers] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, paginatedData.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const [users, setUsers] = useState([]);

  const [user, setUser] = React.useState({
    email: localStorage.getItem("userEmail"),
  });

  // const [user, setUser] = useState({});

  const [role, setRole] = React.useState("user");

  const [selectedProfile, setSelectedProfile] = React.useState("Engineer");
  const [selectedNotifications, setSelectedNotifications] = useState(
    notifications.slice()
  );
  const [selectedAlerts, setSelectedAlerts] = useState(alerts.slice());

  const [userStatus, setUserStatus] = React.useState("active");

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "warning",
    message: "All the fields are mendatory!",
  });

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar((prevState) => {
      return { ...prevState, open: false };
    });
  };

  const handleUserStatusChange = (event, user) => {
    let value = event.target.checked;
    let userStatus = value ? "active" : "inactive";
    handleUserStatusUpdate(user.email, userStatus);
  };

  const [email, setEmail] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const siteNamesAndBlocks = JSON.parse(
    localStorage.getItem("siteNamesAndBlocks")
  );

  const getSites = (sites = siteNamesAndBlocks) => {
 
  //this is for onlyd demo purpose 
  return sites.filter((site) => site.name === "Hukkeri").map((site) => site.name);
};     //   return sites.map((site) => site.name);
  // };

  const [siteOptions, setSiteOptions] = useState(getSites());
  const [selectedLocations, setSelectedLocations] = useState(
    siteOptions.slice()
  );
  // const [selectedLocations, setSelectedLocations] = useState(locations.slice());

  // const areAllLocationsSelected =
  //   getSites.length > 0 && selectedLocations.length === getSites.length;

  const areAllLocationsSelected =
    JSON.parse(localStorage.getItem("siteNamesCaps")).length > 0 &&
    selectedLocations.length ===
      JSON.parse(localStorage.getItem("siteNamesCaps")).length;

  const isAllNotificationsSelected =
    notifications.length > 0 &&
    selectedNotifications.length === notifications.length;

  const isAllAlertsSelected =
    alerts.length > 0 && selectedAlerts.length === alerts.length;

  const [selectedMenu, setSelectedMenu] = useState([...menu]);

  const areAllMenuSelected =
    menu.length > 0 && selectedMenu.length === menu.length;

  // const [page, setPage] = useState(0);

  // const [pageCount, setPageCount] = useState(0);

  // const [paginatedData, setPaginatedData] = useState([]);

  useEffect(() => {
    if (users) {
      // setPage(() => (users.length > 0 ? 1 : 0));
      // setPageCount(() => (users.length > 0 ? Math.ceil(users.length / 30) : 0));
      // setPaginatedData(() => (users.length > 0 ? users.slice(0, 30) : []));
      setPaginatedData(users);
    }
  }, [users]);

  // const handlePageChange = (event, value) => {
  //   let paginatedData = users.slice(7 * (value - 1), 7 * value);
  //   setPaginatedData(paginatedData);
  //   setPage(value);
  // };

  const handleLocationsChange = (event) => {
    const value = event.target.value;

    if (value[value.length - 1] === "All") {
      // console.log("inside all");
      setSelectedLocations(
        selectedLocations.length === siteOptions.length ? [] : siteOptions
      );
      return;
    }

    setSelectedLocations(value);
  };

  const handleMenuChange = (event) => {
    const value = event.target.value;

    if (value[value.length - 1] === "All") {
      setSelectedMenu(selectedMenu.length === menu.length ? [] : menu);
      return;
    }

    setSelectedMenu(value);
  };

  const handleUserChange = (email) => {
    // console.log(email);
    setShow(true);
    let clickedUser = users.find((element) => element.email === email);
    // console.log(clickedUser);
    setPreviousEmail(clickedUser?.email);
    // console.log(clickedUser.email);
    setUser(clickedUser);
    setRole(clickedUser?.role);
    // console.log(clickedUser.role);
    setSelectedProfile(clickedUser?.employeerole);
    // console.log(clickedUser.employeerole);
    setUserStatus(String(clickedUser?.status).toLowerCase());
    // console.log(clickedUser.status);
    setSelectedLocations(clickedUser?.locations);
    // console.log(clickedUser.locations);
    setSelectedMenu(clickedUser?.menu);
    // console.log(clickedUser.menu);
    // setSelectedNotifications(clickedUser?.notificationtype);
    // console.log(clickedUser.notificationtype);
    // setSelectedAlerts(clickedUser?.alerttype);
    // console.log(clickedUser.alerttype);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  // console.log(selectedLocations);

  const handleProfileChange = (event) => {
    setSelectedProfile(event.target.value);
  };

  const handleNotificationsChange = (event) => {
    setSelectedNotifications(event.target.value);
  };

  const handleAlertsChange = (event) => {
    setSelectedAlerts(event.target.value);
  };

  const [previousEmail, setPreviousEmail] = useState();

  const handleEmailChange = (event, key) => {
    // let value = event.target.value;
    setEmail(event.target.value);
    // console.log(event.target.value);
    // setUser((prevState) => ({ ...prevState, [key]: value }));
    setUser((prevState) => {
      return { ...prevState, email: event.target.value };
    });
  };

  // const handleAllFields = (event, key) => {
  //   let value = event.target.value;
  //   // setEmail(event.target.value);
  //   // console.log(event.target.value);
  //   setUser((prevState) => ({ ...prevState, [key]: value }));
  //   // setUser((prevState) => {
  //   //   return { ...prevState, email: event.target.value };
  //   if (value[value.length - 1] === "All") {
  //     // console.log("inside all");
  //     setSelectedLocations(
  //       selectedLocations.length === locations.length ? [] : locations
  //     );
  //     return;
  //   }
  //   // });
  // };

  // console.log(user);

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleUserFirstNameChange = (event, key) => {
    let value = event.target.value;
    setUser((prevState) => ({ ...prevState, [key]: value }));
    // setUser((prevState) => {
    //   return { ...prevState, firstname: event.target.value };
    // });
  };

  const handleUserLastNameChange = (event) => {
    setUser((prevState) => {
      return { ...prevState, lastname: event.target.value };
    });
  };

  const getUsers = () => {
    setEnabledLinearProgress(true);
    setShow(false);
    // Todo: Make it more secure by using token.
    axios
      .post(
        SERVER_URL + "/api/roles",
        { email: localStorage.getItem("userEmail") },
        { headers: { jwtToken: localStorage.getItem("userToken") } }
      )
      .then((response) => {
        // console.log("Users", response.data);
        let sortedUser = sortValues(response.data, sortBy.header, sortBy.order);
        setUsers(sortedUser);
        // setUsers(response.data);
        let currentUser = response.data.find(
          (element) => element.email === localStorage.getItem("userEmail")
        );
        setShow(false);
        setUser(currentUser);
        setRole(currentUser.role);
        setSelectedLocations(currentUser.locations);
        setSelectedMenu(currentUser.menu);
        //again empty state
        setUser((prevState) => {
          let object = {};
          Object.keys(prevState).forEach((key) => {
            object = { ...object, [key]: "" };
          });
          return object;
        });
        setNewPassword("");
        setEmail("");
        setEnabledLinearProgress(false);
      })
      .catch(() => {
        setShow(false);
        setEnabledLinearProgress(false);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const [disabledCreateBtn, setDisabledCreateBtn] = useState(false);
  const [disabledUpdateBtn, setDisabledUpdateBtn] = useState(false);

  const handleUserUpdate = () => {
    // console.log(selectedProfile, user.firstname);
    setDisabledUpdateBtn(true);
    setShow(false);
    // console.log(userStatus);

    if (
      !user ||
      user.firstname === "" ||
      user.lastname === "" ||
      user.email === ""
    ) {
      setSnackbar((prevState) => {
        return {
          ...prevState,
          open: true,
          message: "All the fields are mendatory except password!",
        };
      });
      setDisabledUpdateBtn(false);
      return;
    }

    // console.log(user.email, previousEmail);
    // console.log(
    // "update Api",
    // user.firstname
    // user.lastname,
    // user.email,
    // newPassword,
    // role,
    // selectedLocations,
    // selectedMenu,
    // userStatus
    // );
    // console.log(
    // "338",
    // previousEmail
    // selectedProfile,
    // selectedNotifications,
    // selectedAlerts
    // );
    axios
      .post(
        SERVER_URL + "/user/manage",
        {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          password: newPassword,
          role: role,
          locations: selectedLocations,
          menu: selectedMenu,
          status: userStatus,
          previousEmail: previousEmail,
          employeerole: selectedProfile,
          notificationtype: selectedNotifications,
          alerttype: selectedAlerts,
        },
        { headers: { jwtToken: localStorage.getItem("userToken") } }
      )
      .then((response) => {
        // console.log("394", response);
        setSnackbar((prevState) => {
          return {
            ...prevState,
            open: true,
            message: `User: ${user.firstname} ${user.lastname} with email: ${user.email} updated successfully!`,
            severity: "success",
          };
        });
        setUser((prevState) => {
          let object = {};
          Object.keys(prevState).forEach((key) => {
            object = { ...object, [key]: "" };
          });
          return object;
        });
        // setUser("");
        setShow(false);
        setDisabledUpdateBtn(false);
        getUsers();
      })
      .catch(() => {
        setSnackbar((prevState) => {
          return {
            ...prevState,
            open: true,
            message: `Update failed! Try again.`,
            severity: "error",
          };
        });
        setShow(false);
        setDisabledUpdateBtn(false);
      });
  };
  const [sortBy, setSortBy] = useState({ header: "email", order: "asc" });

  const [headersOrder, setHeadersOrder] = useState({
    email: "asc",
    name: "desc",
    role: "desc",
    locations: "desc",
    timestamp: "desc",
  });

  const handleOrderChange = (event, header, id) => {
    // console.log(event, header);
    setHeadersOrder((prevState) => {
      const headerOrder = prevState[header] === "asc" ? "desc" : "asc";
      const headerOrderRev = headerOrder === "asc" ? "desc" : "asc";
      const newHeadersOrder = {
        email: headerOrderRev,
        name: headerOrderRev,
        role: headerOrderRev,
        locations: headerOrderRev,
        timestamp: headerOrderRev,
      };
      newHeadersOrder[header] = headerOrder;
      sortValues(paginatedData, header, headerOrder);
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

  const sortValues = (data, header, order) => {
    let sortedSitesArray = [];
    if (order === "asc") {
      sortedSitesArray = data.sort((a, b) => {
        if (header !== "email") {
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
        if (header !== "email") {
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

  const handleUserStatusUpdate = (email, status) => {
    axios
      .post(
        SERVER_URL + "/user/manage/status",
        {
          email: email,
          status: status,
        },
        { headers: { jwtToken: localStorage.getItem("userToken") } }
      )
      .then((response) => {
        setSnackbar((prevState) => {
          return {
            ...prevState,
            open: true,
            message: `User with email: ${email} status updated successfully!`,
            severity: "success",
          };
        });

        getUsers();
      })
      .catch(() => {
        setSnackbar((prevState) => {
          return {
            ...prevState,
            open: true,
            message: `Status update failed! Try again.`,
            severity: "error",
          };
        });
      });
  };

  const handleUserCreate = () => {
    setDisabledCreateBtn(true);

    if (
      !user ||
      user.firstname === "" ||
      user.lastname === "" ||
      user.email === "" ||
      newPassword === ""
    ) {
      setSnackbar((prevState) => {
        return { ...prevState, open: true };
      });
      setDisabledCreateBtn(false);
      return;
    }
    // console.log(user.firstname);
    // console.log(user.lastname);
    // console.log(user.selectedProfile, "479");
    axios
      .post(
        SERVER_URL + "/user/manage/create",
        {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          password: newPassword,
          role: role,
          locations: selectedLocations,
          menu: selectedMenu,
          status: "active",
          previousEmail: previousEmail,
          employeerole: selectedProfile,
          notificationtype: selectedNotifications,
          alerttype: selectedAlerts,
        },
        { headers: { jwtToken: localStorage.getItem("userToken") } }
      )
      .then((response) => {
        // console.log(response);
        setSnackbar((prevState) => {
          return {
            ...prevState,
            open: true,
            message: `User: ${user.firstname} ${user.lastname} with email: ${user.email} created successfully!`,
            severity: "success",
          };
        });
        // setUser((prevState) => {
        //   let object = {};
        //   Object.keys(prevState).forEach((key) => {
        //     object = { ...object, [key]: "" };
        //   });
        //   return object;
        // });
        // setNewPassword("");
        // setEmail("");
        // setUser("");

        setDisabledCreateBtn(false);
        getUsers();
      })
      .catch(() => {
        setSnackbar((prevState) => {
          return {
            ...prevState,
            open: true,
            message: `Insert failed! Try again.`,
            severity: "error",
          };
        });
        setDisabledCreateBtn(false);
      });
  };

  const handleUserDelete = (user) => {
    setDisabledUpdateBtn(true);

    if (window.confirm(`Delete user: ${user.email}, are you sure?`)) {
      axios
        .post(
          SERVER_URL + "/user/delete",
          { email: user.email },
          { headers: { jwtToken: localStorage.getItem("userToken") } }
        )
        .then((response) => {
          setSnackbar((prevState) => {
            return {
              ...prevState,
              open: true,
              message: `User: ${user.firstname} ${user.lastname} with email: ${user.email} deleted successfully!`,
              severity: "success",
            };
          });
          setUser("");
          getUsers();
          setDisabledUpdateBtn(false);
        })
        .catch(() => {
          setSnackbar((prevState) => {
            return {
              ...prevState,
              open: true,
              message: `Delete failed!`,
              severity: "error",
            };
          });
          setDisabledUpdateBtn(false);
        });
    } else {
      setDisabledUpdateBtn(false);
    }
  };

  // const clearFields = () => {
  //   setUser("");
  //   setNewPassword("");
  // };

  // useEffect(() => {
  //   clearFields();
  // });

  const [searchField, setSearchField] = useState("");

  const handleSearchFieldChange = (event) => {
    setSearchField(event.target.value);
  };

  const handleSearch = () => {
    if (searchField === "") {
      if (users) {
        setPage(() => (users.length > 0 ? 0 : 0));
        // setPageCount(() =>
        //   users.length > 0 ? Math.ceil(users.length / 5) : 0
        // );
        // setPaginatedData(() => (users.length > 0 ? users.slice(0, 5) : []));
        setPaginatedData(users);
        return;
      }
    }

    let searchedData = paginatedData.filter((element) => {
      let firstname = String(element.firstname).toLowerCase().trim();
      let searchInput = String(searchField).toLowerCase().trim();
      return String(firstname).includes(searchInput);
    });
    setPaginatedData(searchedData);
    setPage(() => (searchedData.length > 0 ? 0 : 0));
    // setPageCount(() =>
    //   searchedData.length > 0 ? Math.ceil(searchedData.length / 1) : 0
    // );
  };

  return (
    <div style={{ marginTop: "0rem" }}>
      <Grid
        // container
        spacing={2}
        // justify="space-between"
        // style={{ paddingRight: "2rem" }}
        // alignItems="flex-end"
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="baseline"
      >
        <Grid item>
          <TextField
            required
            id="first-name"
            // label='First name'
            placeholder="First name"
            inputProps={{ style: { fontSize: 13 } }}
            value={user && user.firstname}
            // value={user.firstname}
            // onChange={handleUserFirstNameChange}
            onChange={(event) => handleUserFirstNameChange(event, "firstname")}
            style={{
              maxWidth: "5rem",
              marginTop: "1rem",
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            required
            id="last-name"
            // label='Last name'
            placeholder="Last name"
            inputProps={{ style: { fontSize: 13 } }}
            value={user && user.lastname}
            // value={user.lastname}
            onChange={handleUserLastNameChange}
            // onChange={(event) => handleAllFields(event, "lastname")}
            style={{ maxWidth: "5rem", marginTop: "1rem" }}
          />
        </Grid>

        <Grid item>
          <TextField
            fullWidth
            required
            id="email"
            // label='Email'
            placeholder="Email"
            inputProps={{ style: { fontSize: 13 } }}
            value={user && user.email}
            // value={user.email}
            onChange={handleEmailChange}
            // onChange={(event) => handleAllFields(event, "email")}
            style={{ maxWidth: "10rem", marginTop: "1rem" }}
            // disabled={user}
          />
        </Grid>

        <Grid item>
          <TextField
            // required
            id="password"
            // label="Password"
            placeholder="Password"
            value={newPassword}
            type="password"
            inputProps={{ style: { fontSize: 13 } }}
            onChange={handleNewPasswordChange}
            // onChange={(event) => handleNewPasswordChange(event, "password")}
            style={{ maxWidth: "5rem", marginTop: "1rem" }}
          />
        </Grid>

        <Grid item>
          <FormControl style={{ maxWidth: "12rem" }}>
            <InputLabel
              id="locations-simple-select-label"
              style={{ fontSize: 13 }}
            >
              Locations
            </InputLabel>
            <Select
              labelId="locations-simple-select-label"
              id="locations-simple-select"
              value={selectedLocations}
              style={{ fontSize: 13, maxWidth: "15rem" }}
              label="Select Locations"
              onChange={handleLocationsChange}
              // onChange={(event) => handleAllFields(event, "location")}
              multiple
              renderValue={(data) => data.join(", ")}
            >
              <MenuItem
                value="All"
                classes={{
                  root: areAllLocationsSelected
                    ? classes.areAllLocationsSelected
                    : "",
                }}
                style={{ paddingBlock: 0 }}
              >
                <ListItemIcon>
                  <Checkbox
                    style={{ paddingBlock: 0 }}
                    size="small"
                    color="primary"
                    classes={{ indeterminate: classes.indeterminateColor }}
                    checked={areAllLocationsSelected}
                    indeterminate={
                      selectedLocations.length > 0 &&
                      selectedLocations.length <
                        JSON.parse(localStorage.getItem("siteNamesCaps")).length
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  // classes={{ primary: classes.selectAllText }}
                  classes={{ primary: classes.listItemText }}
                  primary="Select All"
                  style={{ paddingTop: ".05rem" }}
                />
              </MenuItem>
              {siteOptions.map((element) => {
                return (
                  <MenuItem
                    key={element}
                    value={element}
                    style={{ paddingBlock: 0 }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        style={{ paddingBlock: 0 }}
                        checked={selectedLocations.indexOf(element) > -1}
                        // checked={user.locations && user.locations.indexOf(element) > -1}
                        size="small"
                        color="primary"
                      />
                    </ListItemIcon>
                    <ListItemText
                      classes={{ primary: classes.listItemText }}
                      primary={element}
                      style={{ paddingTop: ".05rem" }}
                    />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl style={{ maxWidth: "8rem" }}>
            <InputLabel id="menu-simple-select-label" style={{ fontSize: 13 }}>
              Menu
            </InputLabel>
            <Select
              labelId="menu-simple-select-label"
              id="menu-simple-select"
              value={selectedMenu}
              label="Select Menu"
              onChange={handleMenuChange}
              // onChange={(event) => handleAllFields(event, "menu")}
              style={{ fontSize: 13 }}
              multiple
              renderValue={(data) => data.join(", ")}
            >
              <MenuItem
                value="All"
                classes={{
                  root: areAllMenuSelected ? classes.areAllMenuSelected : "",
                }}
                style={{ paddingBlock: 0 }}
              >
                <ListItemIcon>
                  <Checkbox
                    style={{ paddingBlock: 0 }}
                    size="small"
                    color="primary"
                    classes={{ indeterminate: classes.indeterminateColor }}
                    checked={areAllMenuSelected}
                    indeterminate={
                      selectedMenu.length > 0 &&
                      selectedMenu.length < menu.length
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  // classes={{ primary: classes.selectAllText }}
                  classes={{ primary: classes.listItemText }}
                  primary="Select All"
                  style={{ paddingTop: ".05rem" }}
                />
              </MenuItem>
              {menu.map((element) => {
                return (
                  <MenuItem
                    key={element}
                    value={element}
                    style={{ paddingBlock: 0 }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        style={{ paddingBlock: 0 }}
                        checked={selectedMenu.indexOf(element) > -1}
                        // checked={user.menu && user.menu.indexOf(element) > -1}
                        size="small"
                        color="primary"
                      />
                    </ListItemIcon>
                    <ListItemText
                      classes={{ primary: classes.listItemText }}
                      primary={element}
                      style={{ paddingTop: ".05rem" }}
                    />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          {/* <FormControl fullWidth>
                            <InputLabel id="role-simple-select-label">Menu</InputLabel>
                            <Select
                            labelId="role-simple-select-label"
                            id="role-simple-select"
                            value={role}
                            label="Select Role"
                            onChange={handleRoleChange}
                            >
                            
                            <MenuItem value={'user'}>User&emsp;</MenuItem>
                            <MenuItem value={'admin'}>Admin&emsp;</MenuItem>
                            </Select>
                        </FormControl> */}
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel
              id="profile-simple-select-label"
              style={{ fontSize: 13 }}
            >
              Profile
            </InputLabel>
            <Select
              labelId="profile-simple-select-label"
              style={{ fontSize: 13 }}
              id="profile-simple-select"
              value={selectedProfile}
              label="Select Profile"
              onChange={handleProfileChange}
              // onChange={(event) => handleAllFields(event, "profile")}
            >
              <MenuItem value={"National Head"}>National Head&emsp;</MenuItem>
              <MenuItem value={"Zonal Head"}>Zonal Head&emsp;</MenuItem>
              <MenuItem value={"Cluster Head"}>Cluster Head&emsp;</MenuItem>
              <MenuItem value={"Plant Head"}>Plant Head&emsp;</MenuItem>
              <MenuItem value={"Engineer"}>Engineer&emsp;</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel id="role-simple-select-label" style={{ fontSize: 13 }}>
              Role
            </InputLabel>
            <Select
              labelId="role-simple-select-label"
              id="role-simple-select"
              value={role}
              label="Select Role"
              style={{ fontSize: 13 }}
              onChange={handleRoleChange}
              // onChange={(event) => handleAllFields(event, "role")}
            >
              <MenuItem value={"user"}>User&emsp;</MenuItem>
              <MenuItem value={"admin"}>Admin&emsp;</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl style={{ maxWidth: "12rem" }}>
            <InputLabel
              id="notifications-simple-select-label"
              style={{ fontSize: 13 }}
            >
              Notifications
            </InputLabel>
            <Select
              labelId="notifications-simple-select-label"
              id="notifications-simple-select"
              value={selectedNotifications}
              style={{ fontSize: 13 }}
              label="Select Notifications"
              onChange={handleNotificationsChange}
              // onChange={(event) => handleAllFields(event, "notification")}
              multiple
              renderValue={(data) => data.join(", ")}
            >
              <MenuItem
                value="All"
                classes={{
                  root: isAllNotificationsSelected
                    ? classes.isAllNotificationsSelected
                    : "",
                }}
                style={{ paddingBlock: 0 }}
              >
                <ListItemIcon>
                  <Checkbox
                    style={{ paddingBlock: 0 }}
                    size="small"
                    color="primary"
                    classes={{ indeterminate: classes.indeterminateColor }}
                    checked={isAllNotificationsSelected}
                    indeterminate={
                      selectedNotifications.length > 0 &&
                      selectedNotifications.length < notifications.length
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  // classes={{ primary: classes.selectAllText }}
                  classes={{ primary: classes.listItemText }}
                  primary="Select All"
                  style={{ paddingTop: ".05rem" }}
                />
              </MenuItem>
              {notifications.map((element) => {
                return (
                  <MenuItem
                    key={element}
                    value={element}
                    style={{ paddingBlock: 0 }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        style={{ paddingBlock: 0 }}
                        checked={selectedNotifications.indexOf(element) > -1}
                        // checked={user.locations && user.locations.indexOf(element) > -1}
                        size="small"
                        color="primary"
                      />
                    </ListItemIcon>
                    <ListItemText
                      classes={{ primary: classes.listItemText }}
                      primary={element}
                      style={{ paddingTop: ".05rem" }}
                    />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>

        {/* <Grid item>
        <FormControl>
            <InputLabel id='status-simple-select-label'>Status</InputLabel>
            <Select
              labelId='status-simple-select-label'
              id='status-simple-select'
              value={userStatus}
              label='Select Status'
              onChange={handleUserStatusChange}
            >
              <MenuItem value={'active'}>Active&emsp;</MenuItem>
              <MenuItem value={'inactive'}>Inactive&emsp;</MenuItem>
            </Select>
          </FormControl>
          
        </Grid> */}
      </Grid>
      <Grid
        // container
        // justify="space-between"
        // style={{
        //   marginTop: ".75rem",
        //   marginBottom: ".5rem",
        //   paddingRight: ".5rem",
        // }}
        // alignItems="flex-end"
        spacing={2}
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        {/* <Grid item> */}
        {/* <Grid container spacing={2}> */}
        <Grid item>
          <FormControl style={{ maxWidth: "12rem" }}>
            <InputLabel
              id="alerts-simple-select-label"
              style={{ fontSize: 13 }}
            >
              Alerts
            </InputLabel>
            <Select
              labelId="alerts-simple-select-label"
              id="alerts-simple-select"
              value={selectedAlerts}
              style={{ fontSize: 13 }}
              label="Select Alerts"
              onChange={handleAlertsChange}
              // onChange={(event) => handleAllFields(event, "alerts")}
              multiple
              renderValue={(data) => data.join(", ")}
            >
              <MenuItem
                value="All"
                classes={{
                  root: isAllAlertsSelected ? classes.isAllAlertsSelected : "",
                }}
                style={{ paddingBlock: 0 }}
              >
                <ListItemIcon>
                  <Checkbox
                    style={{ paddingBlock: 0 }}
                    size="small"
                    color="primary"
                    classes={{ indeterminate: classes.indeterminateColor }}
                    checked={isAllAlertsSelected}
                    indeterminate={
                      selectedAlerts.length > 0 &&
                      selectedAlerts.length < alerts.length
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  // classes={{ primary: classes.selectAllText }}
                  classes={{ primary: classes.listItemText }}
                  primary="Select All"
                  style={{ paddingTop: ".05rem" }}
                />
              </MenuItem>
              {alerts.map((element) => {
                return (
                  <MenuItem
                    key={element}
                    value={element}
                    style={{ paddingBlock: 0 }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        style={{ paddingBlock: 0 }}
                        checked={selectedAlerts.indexOf(element) > -1}
                        // checked={user.locations && user.locations.indexOf(element) > -1}
                        size="small"
                        color="primary"
                      />
                    </ListItemIcon>
                    <ListItemText
                      classes={{ primary: classes.listItemText }}
                      primary={element}
                      style={{ paddingTop: ".05rem" }}
                    />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        {/* </Grid> */}
        {/* </Grid> */}
        {/* <Grid item> */}
        {/* <Grid container alignItems="flex-end" spacing={2}> */}

        <Grid item>
          {!show && (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleUserCreate}
              disabled={disabledCreateBtn}
              style={{ fontSize: "11px", marginTop: "1rem" }}
            >
              Create
            </Button>
          )}
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleUserUpdate}
            disabled={disabledUpdateBtn}
            style={{ fontSize: "11px", marginTop: "1rem" }}
          >
            Update
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={getUsers}
            // disabled={disabledUpdateBtn}
            style={{ fontSize: "11px", marginTop: "1rem" }}
          >
            Clear
          </Button>
        </Grid>
        <Grid item style={{ marginLeft: "30rem" }}>
          <TextField
            id="search"
            placeholder="Enter first name"
            inputProps={{ style: { fontSize: 13 } }}
            value={searchField}
            onChange={handleSearchFieldChange}
            style={{ maxWidth: "8rem", marginTop: "1rem" }}
          />
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            size="small"
            onClick={handleSearch}
            style={{ fontSize: "11px", marginTop: "1rem" }}
          >
            Search
          </Button>
        </Grid>
        {/* </Grid> */}
        {/* </Grid> */}
      </Grid>

      {/* <Grid container style={{ marginTop: ".25rem" }}> */}

      {/* <Grid item xs={12} style={{ paddingRight: "1rem" }}> */}
      {/* <FormControl style={{maxWidth: '17rem'}}>
                    <InputLabel id="user-simple-select-label">Select User</InputLabel>
                    <Select
                    labelId="user-simple-select-label"
                    id="user-simple-select"
                    value={user.email}
                    label="Select User"
                    onChange={handleUserChange}
                    >
                    {users.map((element) => {
                        return (
                            <MenuItem value={element.email}>{element.firstname}&nbsp;
                            {element.lastname}, {element.email}</MenuItem>
                        )
                    })}
                    </Select>
                </FormControl> */}
      <Grid container>
        <TableContainer
          component={Paper}
          style={{ maxWidth: "91vw", marginTop: "0.8rem" }}
        >
          <Table stickyHeader size="small" aria-label="simple table">
            <TableHead>
              <TableRow style={{ backgroundColor: "#ffffbf" }}>
                {/* <TableCell>Name</TableCell> */}
                <StyledTableCell>Sr. No.</StyledTableCell>
                <StyledTableCell>
                  <span
                    onClick={(event) =>
                      handleOrderChange(event, "email", "emailHeader")
                    }
                    id="emailHeader"
                    className="header"
                  >
                    Email
                  </span>
                </StyledTableCell>
                <StyledTableCell>
                  <span
                    onClick={(event) =>
                      handleOrderChange(event, "name", "nameHeader")
                    }
                    id="nameHeader"
                    className="header"
                  >
                    Name
                  </span>
                </StyledTableCell>
                <StyledTableCell>
                  <span
                    onClick={(event) =>
                      handleOrderChange(event, "role", "roleHeader")
                    }
                    id="roleHeader"
                    className="header"
                  >
                    User Type
                  </span>
                </StyledTableCell>
                <StyledTableCell>
                  <span
                    onClick={(event) =>
                      handleOrderChange(event, "locations", "locationsHeader")
                    }
                    id="locationsHeader"
                    className="header"
                  >
                    Sites
                  </span>
                </StyledTableCell>
                <StyledTableCell>
                  <span
                    onClick={(event) =>
                      handleOrderChange(event, "timestamp", "timestampHeader")
                    }
                    id="timestampHeader"
                    className="header"
                  >
                    Login Date/Time
                  </span>
                </StyledTableCell>
                <StyledTableCell>
                  <span style={{ paddingLeft: "2rem" }}>Action</span>
                </StyledTableCell>
                <StyledTableCell>
                  <span style={{ paddingLeft: "2rem" }}>Status</span>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {paginatedData.map((element, ind) => {
                console.log(element, "984", ind);
              })} */}
              {/* {paginatedData.map((row, index) => ( */}
              {(rowsPerPage > 0
                ? paginatedData.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : paginatedData
              ).map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  style={{
                    backgroundColor:
                      user && row.email === user.email ? "lightblue" : "white",
                  }}
                >
                  {/* <TableCell component="th" scope="row">
            {row.firstname}&nbsp;{row.lastname}
          </TableCell> */}
                  <StyledTableCell style={{ color: "#000" }}>
                    <Grid container>{page * 10 + index + 1}</Grid>
                    {/* <Grid container>{page}</Grid> */}
                  </StyledTableCell>
                  <StyledTableCell style={{ color: "#000" }}>
                    <Grid container>{row.email}</Grid>
                  </StyledTableCell>
                  <StyledTableCell style={{ color: "#000" }}>
                    {row.firstname}&nbsp;{row.lastname}
                  </StyledTableCell>
                  <StyledTableCell style={{ color: "#000" }}>
                    {String(row.role).charAt(0).toUpperCase()}
                    {String(row.role).slice(1)}
                  </StyledTableCell>
                  {/* <TableCell><span style={{color: 'green'}}>{!row.status && 'Active'}{row.status && 
                    // String(row.status).charAt(0).toUpperCase()}{row.status && String(row.status).slice(1)
                    }</span></TableCell> */}
                  <StyledTableCell style={{ color: "#000" }}>
                    {row.locations.length}
                  </StyledTableCell>
                  <StyledTableCell style={{ color: "#000" }}>
                    {/* {row.timestamp} */}
                    {row.timestamp === null
                      ? `x`
                      : new Date(Number(row.timestamp * 1000)).toLocaleString()}
                  </StyledTableCell>
                  <StyledTableCell style={{ color: "#000" }}>
                    <Tooltip title="Enable/Disable" placement="bottom">
                      <Switch
                        key={index}
                        checked={row.status === "active" ? true : false}
                        onChange={(event) => handleUserStatusChange(event, row)}
                        color="primary"
                        name="statusSwitch"
                        size="small"
                      />
                    </Tooltip>
                    <Tooltip title="Edit" placement="bottom">
                      <IconButton
                        size="small"
                        onClick={() => handleUserChange(row.email)}
                        style={{ paddingInline: ".5rem" }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" placement="bottom">
                      <IconButton
                        size="small"
                        onClick={() => handleUserDelete(row)}
                        color="secondary"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </StyledTableCell>
                  <StyledTableCell style={{ color: "#000" }}>
                    {row.action_by}
                  </StyledTableCell>
                  {/* <TableCell align='left' style={{paddingLeft: '1.5rem'}}>
                      
                    </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
            {/* <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 20, 30, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={paginatedData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    MenuProps: { classes: { paper: classes.selectDropdown } },
                  }}
                  classes={{ menuItem: classes.menuItem }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  // ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter> */}
          </Table>
        </TableContainer>
        <Grid
          container
          justify="flex-end"
          style={{ marginTop: "0rem", marginRight: "0.5rem" }}
        >
          <Grid item>
            <div className={classes.paginationicon}>
              <TablePagination
                rowsPerPageOptions={[10, 20, 30, { label: "All", value: -1 }]}
                colSpan={3}
                count={paginatedData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                // SelectProps={{
                //   inputProps: { "aria-label": "rows per page" },
                //   MenuProps: { classes: { paper: classes.selectDropdown } },
                // }}
                // classes={{ menuItem: classes.menuItem }}

                classes={{
                  menuItem: classes.menuItem,
                  selectBack: classes.selectDropdown,
                  sp: classes.tablePagination,
                  caption: classes.tablePaginationCaption,
                  selectIcon: classes.tablePaginationSelectIcon,
                  select: classes.tablePaginationSelect,
                  actions: classes.tablePaginationActions,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                // ActionsComponent={TablePaginationActions}
              />
            </div>
          </Grid>
        </Grid>
        {/* <Grid
          container
          justify="flex-end"
          style={{ marginTop: ".25rem", marginRight: "2.4rem" }}
        >
          <Grid item>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              shape="rounded"
            />
          </Grid>
        </Grid> */}
        {/* </Grid> */}
      </Grid>
      <Grid container style={{ marginTop: "1rem" }}>
        {/* <Grid item>
        <Button variant='outlined' onClick={clearFields}>
            Clear Fields
          </Button>
        </Grid> */}

        <Grid item xs="11">
          <Grid container justify="center"></Grid>
        </Grid>
        <Grid item xs={1}>
          <Grid
            container
            justify="flex-end"
            style={{ paddingRight: "1rem" }}
          ></Grid>
        </Grid>
        {/* <Grid item >
          <Button className={classes.deleteButton} variant='outlined' color='error' onClick={handleUserDelete} style={{outlineColor: 'red'}}>
            Delete
          </Button>
        </Grid> */}
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ManageUser;
