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
import { tempSitesBlocksInverters } from "../../../constants/SiteNames";
import MultiDropdown from "../../UI/MultiDropdown";
import { SERVER_URL } from "../../../constants/constants";
import InvertersTable from "./SitesTable";
import SitesTable from "./SitesTable";
import CustomSnackbar from "../../UI/CustomSnackbar";
import Tooltip from "@material-ui/core/Tooltip";
import { AppState } from "../../../AppContext";
import SimpleDialog from "./SimpleDialog";

export default function ManageSites({ refreshSiteEditTable }) {
  const { setEnabledLinearProgress } = AppState();

  const [open, setOpen] = React.useState(false);
  const [notesite, setNotesite] = useState({
    id: 78,
    sitename: "Badisidd",
    systemid: "badisidd-20220623-00044",
    dbpool: "pool45",
    systemip: "192.168.215.200",
  });
  const [notemsg, setNotemsg] = useState("");
  const [showNotemsg, setShowNotemsg] = useState([]);

  const [msgid, setMsgid] = useState();
  const [alertopen, setAlertopen] = React.useState(false);

  // const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  // if multiple sites, all blocks; if single site and multiple blocks, all inverters
  const [tableData, setTableData] = useState([]);
  const [tableDataCopy, setTableDataCopy] = useState([]);

  const [searchField, setSearchField] = useState("");

  const emaileditedby = localStorage.getItem("userEmail");

  // const [editedbyEmail, setEditedbyEmail] = useState("");

  const [selectedSite, setSelectedSite] = useState({});
  const [disabledUpdateBtn, setDisabledUpdateBtn] = useState(false);

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    severity: "info",
    message: "snackbar",
  });

  const handleToggle = (bool) => {
    setSnackbarState((prevState) => ({ ...prevState, open: bool }));
  };

  const handleSiteValuesChange = (event, key) => {
    let value = event.target.value;
    // console.log("value", value);
    if (key === "emails" || key === "mob_no") {
      setSelectedSite((prevState) => ({
        ...prevState,
        [key]: String(value).split(","),
      }));
    } else {
      setSelectedSite((prevState) => ({ ...prevState, [key]: value }));
    }
  };
  // console.log("SelectedSites -->", selectedSite);
  // const handleeditedbyEmail = (event, key) => {
  //   let value = event.target.value;
  //   setEditedbyEmail(value);
  // };

  const handleSearchFieldChange = (event) => {
    let value = event.target.value;
    setSearchField(value);
  };
  const handleClickOpen = (row) => {
    // console.log("sites data", row);
    setNotesite(row);
    setOpen(true);
    getNotemsg();
  };

  const handleClose = (value) => {
    setOpen(false);
    // setSelectedValue(value);
  };

  //   const handleClose = () => {
  //     onClose(selectedValue);
  //   };

  const handleView = () => {
    setEnabledLinearProgress(true);
    axios
      .post(SERVER_URL + "/sitemaster/sitedetail", {
        email: localStorage.getItem("userEmail"),
      })
      .then((response) => {
        // console.log(response.data);
        let sortedData = response.data.sort((a, b) =>
          a.sitename > b.sitename ? 1 : a.sitename < b.sitename ? -1 : 0
        );
        setTableData(sortedData);
        setTableDataCopy(sortedData);
        setSelectedSite((prevState) => {
          let object = {};
          Object.keys(prevState).forEach((key) => {
            object = { ...object, [key]: "" };
          });
          return object;
        });
        setEnabledLinearProgress(false);
        // setEditedbyEmail("");
      })
      .catch((err) => {
        // console.log(err);
        setEnabledLinearProgress(false);
      });
  };

  useEffect(() => {
    handleView();
  }, [refreshSiteEditTable]);

  const handleSearch = () => {
    if (searchField === "") {
      setTableData(tableDataCopy);
      return;
    }
    let searchedSite = tableDataCopy.filter((element) =>
      String(element.sitename)
        .toLowerCase()
        .includes(String(searchField).toLowerCase())
    );
    setTableData(searchedSite);
  };

  const updateSite = () => {
    // console.log("update site", selectedSite);
    setEnabledLinearProgress(true);
    axios
      .post(
        SERVER_URL + "/sitemaster/edit",
        { ...selectedSite, email: localStorage.getItem("userEmail") },
        {
          jwtToken: localStorage.getItem("userToken"),
        }
      )
      .then((response) => {
        // console.log("inside then", response);
        setSnackbarState((prevState) => ({
          ...prevState,
          open: true,
          severity: "success",
          message: `Site: ${selectedSite.sitename} updated!`,
        }));
        setSelectedSite((prevState) => {
          let object = {};
          Object.keys(prevState).forEach((key) => {
            object = { ...object, [key]: "" };
          });
          return object;
        });
        handleView();
        setEnabledLinearProgress(false);
      })
      .catch((err) => {
        setSnackbarState((prevState) => ({
          ...prevState,
          open: true,
          severity: "error",
          message: "Update failed!",
        }));
        handleView();
        setEnabledLinearProgress(false);
      });
  };

  const handleEditClick = (row) => {
    setSelectedSite(row);
    // setEditedbyEmail(emaileditedby);
  };

  const sendNotemsg = () => {
    // console.log("send Note msg hit");
    setEnabledLinearProgress(true);
    axios
      .post(SERVER_URL + "/api/users/notes/insert", {
        site: notesite,
        noteMsg: notemsg,
      })
      .then((response) => {
        // console.log("inside then", response);
        getNotemsg();
        // setSnackbarState((prevState) => ({
        //   ...prevState,
        //   open: true,
        //   severity: "success",
        //   message: `Site: ${selectedSite.sitename} updated!`,
        // }));
        // setSelectedSite((prevState) => {
        //   let object = {};
        //   Object.keys(prevState).forEach((key) => {
        //     object = { ...object, [key]: "" };
        //   });
        //   return object;
        // });
        // handleView();
        setEnabledLinearProgress(false);
      })
      .catch((err) => {
        // setSnackbarState((prevState) => ({
        //   ...prevState,
        //   open: true,
        //   severity: "error",
        //   message: "Update failed!",
        // }));
        // handleView();
        setEnabledLinearProgress(false);
      });
  };

  const getNotemsg = () => {
    // console.log("Get Note msg hit");
    setEnabledLinearProgress(true);
    axios
      .post(SERVER_URL + "/api/users/notes/get", {
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
        // setSelectedSite((prevState) => {
        //   let object = {};
        //   Object.keys(prevState).forEach((key) => {
        //     object = { ...object, [key]: "" };
        //   });
        //   return object;
        // });
        // handleView();
        setEnabledLinearProgress(false);
      })
      .catch((err) => {
        // setSnackbarState((prevState) => ({
        //   ...prevState,
        //   open: true,
        //   severity: "error",
        //   message: "Update failed!",
        // }));
        // handleView();
        setEnabledLinearProgress(false);
      });
  };

  useEffect(() => {
    getNotemsg();
  }, [notesite]);

  const deleteNotemsg = () => {
    // console.log("Delete Note msg hit");
    setEnabledLinearProgress(true);
    axios
      .post(SERVER_URL + "/api/users/notes/delete", {
        // site: notesite,
        msgid: msgid,
        // noteMsg: notemsg,
      })
      .then((response) => {
        // console.log("inside then", response.data);
        const data = response.data;
        getNotemsg();
        setAlertopen(false);
        // setShowNotemsg(data);

        // setSnackbarState((prevState) => ({
        //   ...prevState,
        //   open: true,
        //   severity: "success",
        //   message: `Site: ${selectedSite.sitename} updated!`,
        // }));
        // setSelectedSite((prevState) => {
        //   let object = {};
        //   Object.keys(prevState).forEach((key) => {
        //     object = { ...object, [key]: "" };
        //   });
        //   return object;
        // });
        // handleView();
        setEnabledLinearProgress(false);
      })
      .catch((err) => {
        // setSnackbarState((prevState) => ({
        //   ...prevState,
        //   open: true,
        //   severity: "error",
        //   message: "Update failed!",
        // }));
        // handleView();
        setEnabledLinearProgress(false);
      });
  };

  return (
    <>
      <Grid
        container
        justify="space-between"
        style={{ paddingRight: "1.5rem" }}
      >
        <Grid item>
          <Grid container>
            <Grid item>
              <Tooltip title="Site name" placement="bottom">
                <TextField
                  id="site"
                  placeholder="Site name"
                  value={selectedSite.sitename}
                  InputProps={{
                    readOnly: true,
                  }}
                  inputProps={{ style: { fontSize: 13 } }}
                  onChange={(event) =>
                    handleSiteValuesChange(event, "sitename")
                  }
                  style={{
                    maxWidth: "4rem",
                    marginRight: ".5rem",
                  }}
                />
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Capacity" placement="bottom">
                <TextField
                  id="capacity"
                  placeholder="Capacity"
                  inputProps={{ style: { fontSize: 13 } }}
                  value={selectedSite.capacity}
                  onChange={(event) =>
                    handleSiteValuesChange(event, "capacity")
                  }
                  style={{ maxWidth: "3.2rem", marginRight: ".5rem" }}
                />
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Billing Rate" placement="bottom">
                <TextField
                  id="billingrate"
                  placeholder="Billing Rate"
                  inputProps={{ style: { fontSize: 13 } }}
                  value={selectedSite.billingrates}
                  onChange={(event) =>
                    handleSiteValuesChange(event, "billingrates")
                  }
                  style={{ maxWidth: "4.2rem", marginRight: ".5rem" }}
                />
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="System IP" placement="bottom">
                <TextField
                  id="systemIP"
                  placeholder="System IP"
                  inputProps={{ style: { fontSize: 13 } }}
                  value={selectedSite.systemip}
                  onChange={(event) =>
                    handleSiteValuesChange(event, "systemip")
                  }
                  style={{ maxWidth: "6.2rem", marginRight: ".5rem" }}
                />
              </Tooltip>
            </Grid>
            <Grid item>
              <FormControl>
                <Select
                  labelId="status-select-label"
                  id="status-select"
                  value={selectedSite.status}
                  onChange={(event) => handleSiteValuesChange(event, "status")}
                  defaultValue="Active"
                  style={{ fontSize: "13px", maxWidth: "3.8rem" }}
                >
                  <MenuItem value={"Active"}>Active</MenuItem>
                  <MenuItem value={"Inactive"}>Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <Tooltip title="National Head" placement="bottom">
                <TextField
                  id="nationalhead_email"
                  placeholder="National Head"
                  inputProps={{ style: { fontSize: 13 } }}
                  value={selectedSite.nationalhead_email}
                  onChange={(event) =>
                    handleSiteValuesChange(event, "nationalhead_email")
                  }
                  style={{
                    maxWidth: "5.5rem",
                    marginRight: ".5rem",
                    marginLeft: ".5rem",
                  }}
                />
              </Tooltip>
            </Grid>

            <Grid item>
              <Tooltip title="Zonal Head" placement="bottom">
                <TextField
                  id="zonalhead_email"
                  placeholder="Zonal Head"
                  inputProps={{ style: { fontSize: 13 } }}
                  value={selectedSite.zonalhead_email}
                  onChange={(event) =>
                    handleSiteValuesChange(event, "zonalhead_email")
                  }
                  style={{
                    maxWidth: "5rem",
                    marginRight: ".5rem",
                  }}
                />
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Plant Head" placement="bottom">
                <TextField
                  id="siteincharge_email"
                  placeholder="Plant Head"
                  inputProps={{ style: { fontSize: 13 } }}
                  value={selectedSite.siteincharge_email}
                  onChange={(event) =>
                    handleSiteValuesChange(event, "siteincharge_email")
                  }
                  style={{
                    maxWidth: "5rem",
                    marginRight: ".5rem",
                  }}
                />
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="MobNo" placement="bottom">
                <TextField
                  id="mob_no"
                  placeholder="MobNo"
                  inputProps={{ style: { fontSize: 13 } }}
                  value={selectedSite.mob_no}
                  onChange={(event) => handleSiteValuesChange(event, "mob_no")}
                  style={{
                    maxWidth: "5rem",
                    marginRight: ".5rem",
                  }}
                />
              </Tooltip>
            </Grid>

            <Grid item>
              <Tooltip title="HO Contacts" placement="bottom">
                <TextField
                  id="ho_Coordinator"
                  placeholder="HO Contacts"
                  inputProps={{ style: { fontSize: 13 } }}
                  value={selectedSite.ho_coordinator}
                  onChange={(event) =>
                    handleSiteValuesChange(event, "ho_coordinator")
                  }
                  style={{
                    maxWidth: "5rem",
                    marginRight: ".5rem",
                  }}
                />
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Addl. Contact" placement="bottom">
                <TextField
                  id="add_contact"
                  placeholder="Addl. Contact"
                  inputProps={{ style: { fontSize: 13 } }}
                  value={selectedSite.emails}
                  onChange={(event) => handleSiteValuesChange(event, "emails")}
                  style={{
                    maxWidth: "6rem",
                    // marginRight: "0rem",
                  }}
                />
              </Tooltip>
            </Grid>

            {/* <Grid item>
              <Tooltip title="Email" placement="bottom">
                <TextField
                  id="editedby"
                  placeholder="Email"
                  inputProps={{ style: { fontSize: 13 } }}
                  // value={selectedSite.editedby}
                  value={editedbyEmail}
                  onChange={(event) =>
                    handleSiteValuesChange(event, "editedby")
                  }
                  // onChange={handleeditedbyEmail}
                  style={{
                    maxWidth: "5rem",
                    marginRight: ".4rem",
                    marginLeft: ".4rem",
                  }}
                />
              </Tooltip>
            </Grid> */}

            <Grid item style={{ marginLeft: ".5rem" }}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={updateSite}
                disable={disabledUpdateBtn}
                style={{ fontSize: "11px" }}
              >
                {disabledUpdateBtn ? "Updating" : "Update"}
              </Button>
            </Grid>
            <Grid item style={{ marginLeft: "0.5rem" }}>
              <Tooltip title="Enter site" placement="bottom">
                <TextField
                  id="search"
                  placeholder="Enter site"
                  inputProps={{ style: { fontSize: 13 } }}
                  value={searchField}
                  onChange={handleSearchFieldChange}
                  style={{ maxWidth: "5rem", marginRight: "0.5rem" }}
                />
              </Tooltip>
              <Button
                variant="outlined"
                style={{ fontSize: "11px", marginRight: "0.5rem" }}
                size="small"
                onClick={handleSearch}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Grid item style={{ marginRight: "7rem", marginTop: "0.5rem" }}>
            <Tooltip title="Enter site" placement="bottom">
              <TextField
                id="search"
                placeholder="Enter site"
                inputProps={{ style: { fontSize: 13 } }}
                value={searchField}
                onChange={handleSearchFieldChange}
                style={{ maxWidth: "6rem", marginRight: "1rem" }}
              />
            </Tooltip>
            <Button
              variant="outlined"
              style={{ fontSize: "11px", marginRight: "1rem" }}
              size="small"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Grid>
        </Grid> */}
      </Grid>

      <Grid container style={{ marginTop: ".5rem", paddingRight: "1rem" }}>
        <SitesTable
          data={tableData}
          updateSite={handleEditClick}
          handleClickOpen={handleClickOpen}
        />
      </Grid>

      <SimpleDialog
        notemsg={notemsg}
        showNotemsg={showNotemsg}
        sendNotemsg={sendNotemsg}
        getNotemsg={getNotemsg}
        setNotemsg={setNotemsg}
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        setMsgid={setMsgid}
        deleteNotemsg={deleteNotemsg}
        setAlertopen={setAlertopen}
        alertopen={alertopen}
      />

      <CustomSnackbar
        open={snackbarState.open}
        severity={snackbarState.severity}
        message={snackbarState.message}
        handleToggle={handleToggle}
      />
    </>
  );
}
