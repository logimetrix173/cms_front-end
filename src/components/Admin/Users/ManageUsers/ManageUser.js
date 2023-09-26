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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { SERVER_URL } from "../../../../constants/constants";
import { locations, menu } from "../../../../constants/UserAccess/options";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  menuPaper: {
    maxHeight: 400,
  },
}));

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
    fontSize: 14,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function ManageUser() {
  const classes = useStyles();

  const [users, setUsers] = useState([]);
console.log(user,"------------")
  const [user, setUser] = React.useState({
    email: localStorage.getItem("userEmail"),
  });
  const [role, setRole] = React.useState("user");

  const [newPassword, setNewPassword] = useState("");

  const [selectedLocations, setSelectedLocations] = useState([...locations]);

  const areAllLocationsSelected =
    locations.length > 0 && selectedLocations.length === locations.length;

  const [selectedMenu, setSelectedMenu] = useState([...menu]);

  const areAllMenuSelected =
    menu.length > 0 && selectedMenu.length === menu.length;

  const handleLocationsChange = (event) => {
    const value = event.target.value;

    if (value[value.length - 1] === "All") {
      setSelectedLocations(
        selectedLocations.length === locations.length ? [] : locations
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
    let user = users.find((element) => element.email === email);
    setUser(user);
    setRole(user.role);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleUserFirstNameChange = (event) => {
    setUser((prevState) => {
      return { ...prevState, firstname: event.target.value };
    });
  };

  const handleUserLastNameChange = (event) => {
    setUser((prevState) => {
      return { ...prevState, lastname: event.target.value };
    });
  };

  const getUsers = async() => {
    // Todo: Make it more secure by using token.
    try {
     await axios.post(SERVER_URL + //'/api/roles',
        { email: localStorage.getItem("userEmail") },
        { headers: { jwtToken: localStorage.getItem("userToken") } }
      )
      .then((response) => {
        console.log(response.data,"aman")
        setUsers(response?.data);
        let currentUser = response?.data.find(
          (element) => element?.email === localStorage.getItem("userEmail")
        );
        setUser(currentUser);
        setRole(currentUser?.role);
        setSelectedLocations(currentUser?.locations);
        setSelectedMenu(currentUser?.menu);
      })
      .catch((error) => {
        console.log("aman--------",error);
      });
    } catch (error) {
      console.log(error)
    }
   
  };

  useEffect(() => {
    getUsers();
    return ()=>{
      
    }
  }, []);

  const [disabledUpdateBtn, setDisabledUpdateBtn] = useState(false);

  const handleUserUpdate = () => {
    // console.log(role);
    setDisabledUpdateBtn(true);
    axios
      .post(
        SERVER_URL + "/user/manage",
        {
          email: user.email,
          role: role,
          locations: selectedLocations,
          menu: selectedMenu,
        },
        { headers: { jwtToken: localStorage.getItem("userToken") } }
      )
      .then((response) => {
        // console.log(response.data);
        window.alert(
          `User: ${user.firstname} ${user.lastname} with email: ${user.email} updated successfully!`
        );
        setDisabledUpdateBtn(false);
      })
      .catch(() => {
        window.alert(`Update failed! Try again.`);
        setDisabledUpdateBtn(false);
      });
  };

  const handleUserDelete = () => {
    setDisabledUpdateBtn(true);
    axios
      .post(
        SERVER_URL + "/user/delete",
        { email: user.email },
        { headers: { jwtToken: localStorage.getItem("userToken") } }
      )
      .then((response) => {
        window.alert(
          `User: ${user.firstname} ${user.lastname} with email: ${user.email} deleted successfully!`
        );
        getUsers();
        setDisabledUpdateBtn(false);
      })
      .catch(() => {
        window.alert(`Update failed! Try again.`);
        setDisabledUpdateBtn(false);
      });
  };

  return (
    <div style={{ marginTop: ".5rem" }}>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        style={{ paddingRight: "2rem" }}
      >
        <Grid item>
          <TextField
            required
            id="first-name"
            label="First name"
            defaultValue="Loading"
            value={user.firstname}
            onChange={handleUserFirstNameChange}
            style={{ maxWidth: "8rem" }}
          />
        </Grid>
        <Grid item>
          <TextField
            required
            id="last-name"
            label="Last name"
            defaultValue="Loading"
            value={user.lastname}
            onChange={handleUserLastNameChange}
            style={{ maxWidth: "8rem" }}
          />
        </Grid>

        <Grid item>
          <TextField
            fullWidth
            required
            id="email"
            label="Email"
            defaultValue="loading"
            value={user.email}
            disabled
          />
        </Grid>
        <Grid item>
          <TextField
            required
            id="password"
            label="New Password"
            type="password"
            placeholder="Enter here"
            onChange={handleNewPasswordChange}
            style={{ maxWidth: "8.5rem" }}
          />
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel id="role-simple-select-label">Select Role</InputLabel>
            <Select
              labelId="role-simple-select-label"
              id="role-simple-select"
              value={role}
              label="Select Role"
              onChange={handleRoleChange}
            >
              <MenuItem value={"user"}>User&emsp;</MenuItem>
              <MenuItem value={"admin"}>Admin&emsp;</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl style={{ maxWidth: "8.5rem" }}>
            <InputLabel id="locations-simple-select-label">
              Locations
            </InputLabel>
            <Select
              labelId="locations-simple-select-label"
              id="locations-simple-select"
              value={selectedLocations}
              label="Select Locations"
              onChange={handleLocationsChange}
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
                      selectedLocations.length < locations.length
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.listItemText }}
                  primary="Select All"
                  style={{ paddingTop: ".05rem" }}
                />
              </MenuItem>
              {locations?.map((element) => {
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
          <FormControl style={{ maxWidth: "8.5rem" }}>
            <InputLabel id="menu-simple-select-label">Menu</InputLabel>
            <Select
              labelId="menu-simple-select-label"
              id="menu-simple-select"
              value={selectedMenu}
              label="Select Menu"
              onChange={handleMenuChange}
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
                  classes={{ primary: classes.listItemText }}
                  primary="Select All"
                  style={{ paddingTop: ".05rem" }}
                />
              </MenuItem>
              {menu?.map((element) => {
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
      </Grid>
      <Grid
        container
        spacing={3}
        style={{ marginTop: ".75rem", paddingRight: "2rem" }}
        justifyContent="flex-end"
      >
        <Grid item>
          <Button variant="outlined" color="primary" onClick={handleUserUpdate}>
            Update
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="error" onClick={handleUserDelete}>
            Delete
          </Button>
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: "1.5rem" }}>
        <Grid item xs={12} style={{ paddingRight: "1rem" }}>
          <TableContainer component={Paper} style={{ maxHeight: 300 }}>
            <Table stickyHeader size="small" aria-label="simple table">
              <TableHead>
                <TableRow >
                  <StyledTableCell>Sr. No.</StyledTableCell>
                  <StyledTableCell>Test Email</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>User Type</StyledTableCell>
                  <StyledTableCell>Sites</StyledTableCell>
                  <StyledTableCell>Edit</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={{
                      backgroundColor:
                        row?.email === user?.email ? "lightblue" : "white",
                    }}
                  >
                  
                    <TableCell>
                      <Grid container>{index + 1}</Grid>
                    </TableCell>
                    <TableCell>
                      <Grid container>{row?.email}</Grid>
                    </TableCell>
                    <TableCell>
                      {row?.firstname}&nbsp;{row?.lastname}
                    </TableCell>
                    <TableCell>{row?.role}</TableCell>
                    <TableCell >{row?.locations?.length}</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleUserChange(row?.email)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}

export default ManageUser;
