import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../../../constants/constants";
import {
  Button,
  Card,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import ConfigTable from "./ConfigTable";
import MultiDropdown from "../../UI/MultiDropdown";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { AppState } from "../../../AppContext";
import AlertsDropdown from "../../UI/AlertsDropdown";
import CustomDropdown from "../../UI/CustomDropdown";
import MultiDropdownSingle from "../../UI/MultiDropdownSingle";

const modalStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalContentStyle = {
  paddingTop: "1rem",
  paddingInline: "1rem",
  paddingBottom: "1rem",
};

export default function RemoteConfig() {
  let jwtToken = localStorage.getItem("userToken");

  const { setSnackbar } = AppState();

  const siteNamesAndBlocks = JSON.parse(
    localStorage.getItem("siteNamesAndBlocks")
  );

  const getSites = (sites = siteNamesAndBlocks) => {
    // return sites.map((site) => site.name);
    return sites.filter((site) => site.name === "Hukkeri").map((site) => site.name);

  };

  const [selectedSites, setSelectedSites] = useState(getSites());

  const [siteOptions, setSiteOptions] = useState(getSites());
  const [tableRows, setTableRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});

  const [openModal, setOpenModal] = useState(false);

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

  const handleSitesChange = (event) => {
    const value = event.target.value;

    if (value[value.length - 1] === "all") {
      setSelectedSites(
        selectedSites.length === siteOptions.length ? [] : siteOptions
      );
      return;
    }

    setSelectedSites(value);
  };

  const fetchConfig = async () => {
    try {
      let response = await axios.post(
        SERVER_URL + "/opcConfig/yamlConfig",
        {},
        { headers: { jwtToken: jwtToken } }
      );
      let data = response.data;
      // console.log(data);
      setTableRows(data);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const handleRowSelect = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  const handleUpdate = async () => {
    try {
      let response = await axios.post(
        SERVER_URL + "/opcConfig/edityaml",
        { ...selectedRow },
        { headers: { jwtToken: jwtToken } }
      );
      let data = response.data;
      // console.log(data);
      setSnackbar((prevState) => ({
        ...prevState,
        open: true,
        severity: "success",
        message: "Updated successfully!",
      }));
      setOpenModal(false);
      fetchConfig();
    } catch (error) {
      // console.log(error);
      setSnackbar((prevState) => ({
        ...prevState,
        open: true,
        severity: "error",
        message: "Update failed!",
      }));
      setOpenModal(false);
    }
  };

  const handleRowValueChange = (key, event) => {
    let value = event.target.value;
    setSelectedRow((prevState) => ({ ...selectedRow, [key]: value }));
  };

  const handleCancelUpdate = () => {
    setOpenModal(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container alignItems="flex-end">
          <MultiDropdownSingle
            label="Sites"
            handleChange={handleSitesChange}
            items={siteOptions}
            selectedItems={selectedSites}
          />
          <Button
            variant="outlined"
            color="primary"
            size="small"
            style={{ marginLeft: "1rem" }}
          >
            View
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <ConfigTable rows={tableRows} handleRowSelect={handleRowSelect} />
      </Grid>
      <Modal open={openModal} style={modalStyle}>
        <Card style={modalContentStyle}>
          <Typography variant="h6">Edit: {selectedRow.system_name}</Typography>

          <Grid container style={{ marginTop: "1rem" }}>
            <TextField
              label="CSV Name"
              value={selectedRow.csv_filename_date}
              onChange={(event) => {
                handleRowValueChange("csv_filename_date", event);
              }}
            />
            <TextField
              label="Frequency Day"
              value={selectedRow.data_frequency_day}
              onChange={(event) => {
                handleRowValueChange("data_frequency_day", event);
              }}
              style={{ marginLeft: "1rem" }}
            />
            <TextField
              label="Frequency Night"
              value={selectedRow.data_frequency_night}
              onChange={(event) => {
                handleRowValueChange("data_frequency_night", event);
              }}
              style={{ marginLeft: "1rem" }}
            />
          </Grid>

          <Grid container style={{ marginTop: "1rem" }}>
            <TextField
              label="Frequency Range"
              value={selectedRow.data_frequency_time_range}
              onChange={(event) => {
                handleRowValueChange("data_frequency_time_range", event);
              }}
            />
            <TextField
              label="Log CSV"
              value={selectedRow.logfile_csv}
              onChange={(event) => {
                handleRowValueChange("logfile_csv", event);
              }}
              style={{ marginLeft: "1rem" }}
            />
            <TextField
              label="None Value"
              value={selectedRow.none_value}
              onChange={(event) => {
                handleRowValueChange("none_value", event);
              }}
              style={{ marginLeft: "1rem" }}
            />
          </Grid>

          <Grid container style={{ marginTop: "1rem" }}>
            <TextField
              label="OPC Host"
              value={selectedRow.opc_host}
              onChange={(event) => {
                handleRowValueChange("opc_host", event);
              }}
            />
            <TextField
              label="OPC Interval"
              value={selectedRow.opc_reconnection_interval}
              onChange={(event) => {
                handleRowValueChange("opc_reconnection_interval", event);
              }}
              style={{ marginLeft: "1rem" }}
            />
            <TextField
              label="OPC Server"
              value={selectedRow.opc_server}
              onChange={(event) => {
                handleRowValueChange("opc_server", event);
              }}
              style={{ marginLeft: "1rem" }}
            />
          </Grid>

          <Grid container style={{ marginTop: "1rem" }}>
            <TextField
              label="RB Host"
              value={selectedRow.rabbit_host}
              onChange={(event) => {
                handleRowValueChange("rabbit_host", event);
              }}
            />
            <TextField
              label="RB Log Queue"
              value={selectedRow.rabbit_log_queue}
              onChange={(event) => {
                handleRowValueChange("rabbit_log_queue", event);
              }}
              style={{ marginLeft: "1rem" }}
            />
            <TextField
              label="RB Password"
              value={selectedRow.rabbit_password}
              onChange={(event) => {
                handleRowValueChange("rabbit_password", event);
              }}
              style={{ marginLeft: "1rem" }}
            />
          </Grid>

          <Grid container style={{ marginTop: "1rem" }}>
            <TextField
              label="RB Port"
              value={selectedRow.rabbit_port}
              onChange={(event) => {
                handleRowValueChange("rabbit_port", event);
              }}
            />
            <TextField
              label="RB Queue"
              value={selectedRow.rabbit_queue}
              onChange={(event) => {
                handleRowValueChange("rabbit_queue", event);
              }}
              style={{ marginLeft: "1rem" }}
            />
            <TextField
              label="RB Username"
              value={selectedRow.rabbit_username}
              onChange={(event) => {
                handleRowValueChange("rabbit_username", event);
              }}
              style={{ marginLeft: "1rem" }}
            />
          </Grid>

          <Grid container style={{ marginTop: "1rem" }}>
            <Typography>Tag List (Read Only)</Typography>
            {/* <TextareaAutosize
              label="Tag List"
              aria-label="Tag List"
              maxRows={4}
              value={selectedRow.taglist}
              style={{ width: "100%" }}
            /> */}
            <textarea
              name="taglist"
              rows="4"
              value={selectedRow.taglist}
              style={{ width: "100%" }}
            />
          </Grid>

          <Grid
            container
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "right",
            }}
          >
            <Button
              variant="outlined"
              onClick={handleCancelUpdate}
              size="small"
            >
              Cancel
            </Button>
            <Button
              size="small"
              color="primary"
              variant="outlined"
              style={{ marginLeft: "1rem" }}
              onClick={handleUpdate}
            >
              Update
            </Button>
          </Grid>
        </Card>
      </Modal>
    </Grid>
  );
}
