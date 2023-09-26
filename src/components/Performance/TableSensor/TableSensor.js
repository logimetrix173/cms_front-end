import { Button, Grid, Modal } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MultiDropdownSingle from "../../UI/MultiDropdownSingle";
import Dates from "./Dates";
import Gallary from "./Gallary";
import Ideal from "./Ideal";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Https } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  //   formControl: {
  //     margin: theme.spacing(1),
  //     minWidth: 120,
  //   },
  //   selectEmpty: {
  //     marginTop: theme.spacing(2),
  //   },
}));

function TableSensor() {
  const classes = useStyles();

  const serverUrl = "https://apps.acme.in:3002";

  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageInfo, setSelectedImageInfo] = useState("");

  const [fromDate, setFromDate] = useState(new Date(1656633660000));
  const [toDate, setToDate] = useState(new Date());

  const [tableId, setTableId] = React.useState(1);

  const handleTableIdChange = (event) => {
    setTableId(event.target.value);
  };

  const [sensorId, setSensorId] = React.useState(1);

  const handleSensorIdChange = (event) => {
    setSensorId(event.target.value);
  };

  const siteNamesAndBlocks = JSON.parse(
    localStorage.getItem("siteNamesAndBlocks")
  );

  // if not from server
  const getSites = (sites = siteNamesAndBlocks) => {
      //this is for onlyd demo purpose 
      return sites.filter((site) => site.name === "Hukkeri").map((site) => site.name);
    };
    //return sites.map((site) => site.name);
  

  const [siteOptions, setSiteOptions] = useState(getSites());
  const [selectedSites, setSelectedSites] = useState(["Hukkeri"]);

  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);

  const handleSiteChange = (event) => {
    let value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelectedSites(
        selectedSites.length === siteOptions.length ? [] : siteOptions
      );
      return;
    }
    setSelectedSites(value);
  };

  const getIdealImages = async () => {
    try {
      const response = await axios.post(serverUrl + "/getimageideal", {
        sitename: "balanagar",
        startTime: fromDate.getTime(),
        endTime: toDate.getTime(),
      });
      // console.log("getIdealImages", response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getImages = async () => {
    // const serverUrl = "https://apps.acme.in:3002";
    // const serverUrl = "https://10.10.0.38:3002";
    try {
      const response = await axios.post(serverUrl + "/getimagesarray", {
        sitename: "balanagar",
        startTime: fromDate.getTime(),
        endTime: toDate.getTime(),
      });
      // console.log("getImages", response.data);
      setImages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleView = () => {
    getIdealImages();
    getImages();
  };

  const handleImageClick = (url, info) => {
    // console.log(url, info);
    setOpenImageModal(true);
    setSelectedImage(url);
    setSelectedImageInfo(info);
  };

  const handleImageModalClose = () => {
    setOpenImageModal(false);
  };

  return (
    <div>
      <Grid container alignItems="flex-end">
        <Grid item>
          <MultiDropdownSingle
            label="Sites"
            items={siteOptions}
            selectedItems={selectedSites}
            handleChange={handleSiteChange}
          />
        </Grid>
        <Grid item style={{ marginLeft: "1rem" }}>
          <FormControl style={{ width: 80 }}>
            <InputLabel id="table-id-select-label">Table Id</InputLabel>
            <Select
              labelId="table-id-select-label"
              id="table-id-select"
              value={tableId}
              onChange={handleTableIdChange}
              style={{ fontSize: ".8rem" }}
            >
              <MenuItem value={1}>1</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item style={{ marginLeft: "1rem" }}>
          <FormControl style={{ width: 80 }}>
            <InputLabel id="sensor-id-select-label">Sensor Id</InputLabel>
            <Select
              labelId="sensor-id-select-label"
              id="sensor-id-select"
              value={sensorId}
              onChange={handleSensorIdChange}
              style={{ fontSize: ".8rem" }}
            >
              <MenuItem value={1}>1</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item style={{ marginLeft: "1rem" }}>
          <Dates
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
          />
        </Grid>
        <Grid item style={{ marginLeft: "1rem" }}>
          <Button variant="outlined" onClick={handleView}>
            View
          </Button>
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: "1rem" }}>
        <Ideal
          data={data}
          serverUrl={serverUrl}
          handleImageClick={handleImageClick}
        />
      </Grid>
      <Grid container style={{ marginTop: "1.5rem" }}>
        <Gallary
          itemData={images}
          serverUrl={serverUrl}
          handleImageClick={handleImageClick}
        />
      </Grid>
      <Modal
        open={openImageModal}
        onClose={handleImageModalClose}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {selectedImage && (
          <div>
            <div style={{ color: "#fff" }}>{selectedImageInfo}</div>
            <img src={selectedImage} alt={selectedImageInfo} width={800} />
          </div>
        )}
      </Modal>
    </div>
  );
}

export default TableSensor;
