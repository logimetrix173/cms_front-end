import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import MultiDropdown from "../components/UI/MultiDropdown";
import MultiDropdownSingle from "../components/UI/MultiDropdownSingle";
import Dates from "../components/Performance/InvPerformance/Dates";
import { AppState } from "../AppContext";
import axios from "axios";
import { SMS_URL } from "../constants/constants";
import { Card, Typography } from "@material-ui/core";

import Badisidd from "./Badisidd";
import Mltable from "../components/mlPredictions/Mltable";
import SingleDropdown from "../components/Performance/TrendLine/SingleDropdown";
import LineChartMl from "../components/mlPredictions/LineChartMl";

export default function Ml() {
  const siteNamesAndBlocks = JSON.parse(
    localStorage.getItem("siteNamesAndBlocks")
  );
  const { enabledLinearProgress, setEnabledLinearProgress } = AppState();

  const getSites = (sites = siteNamesAndBlocks) => {
    //this is for onlyd demo purpose 
    return sites.filter((site) => site.name === "Hukkeri").map((site) => site.name);
  };
   // return sites.map((site) => site.name);
  

  const getSitessingle = (sites = siteNamesAndBlocks) => {
    let a = sites.map((site) => site.name);
    return a[1];
  };
  const [data, setData] = useState();

  const [selectedSites, setSelectedSites] = useState(getSitessingle());

  const [siteOptions, setSiteOptions] = useState(getSites());

  const [disabledViewBtn, setDisabledViewBtn] = useState(false);
  const [testData, settestData] = useState(false);

  // useEffect(() => {
  //   settestData(true);
  //   handleView();
  // }, [selectedSites]);

  //    const [disabledTableViewBtn, setDisabledTableViewBtn] = useState(false);

  // const [fromDate, setFromDate] = useState(new Date(1657500309000));
  const [disable, setDisable] = useState(false);
  const [fromDate, setFromDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    date.setHours(6, 0, 0, 0);
    return date;
  });
  const [toDate, setToDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    date.setHours(20, 0, 0, 0);
    return date;
  });

  const handleSitesChange = (event) => {
    const value = event.target.value;

    // if (value[value.length - 1] === "all") {
    //   setSelectedSites(
    //     selectedSites.length === siteOptions.length ? [] : siteOptions
    //   );
    //   setDisable(true);
    //   return;
    // }
    setDisable(false);
    setSelectedSites(value);
  };

  const handleView = () => {
    console.log(selectedSites, [fromDate.getTime(), toDate.getTime()], "***");
    setEnabledLinearProgress(true);
    setDisabledViewBtn(true);
    // get cards data
    axios
      .post(SMS_URL + "/powergen", {
        sitename: [
          selectedSites.includes("Chittuguppa") ? "Chittaguppa" : selectedSites,
        ],
        Timestamp: [fromDate.getTime(), toDate.getTime()],
        // startTime: fromDate.getTime(),
        // endTime: toDate.getTime(),
      })
      .then((response) => {
        console.log("ML", response.data[0], "***");
        setEnabledLinearProgress(false);
        setDisabledViewBtn(false);
        setDisable(false);
        const data = response.data[0];

        // setMax(max);
        setData(data);
      })
      .catch((err) => {
        setEnabledLinearProgress(false);
        setDisable(false);
        setDisabledViewBtn(false);
        // console.log("invPerformance", err);
      });
  };

  // useEffect(() => {
  //   handleView();
  // }, []);

  return (
    <>
      <Grid
        container
        justifyContent="flex-start"
        style={{ marginTop: "0.5rem" }}
      >
        <Grid item>
          <SingleDropdown
            label={"Site"}
            // items={sitesBlocksInverters.map((site) => site.name)}
            items={siteOptions}
            handleChange={handleSitesChange}
            selectedItem={selectedSites}
          />
        </Grid>
        <Grid item>
          <Dates
            disable={disable}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
          />
        </Grid>
        <Grid item style={{ marginLeft: "0.5rem", marginTop: "0.8rem" }}>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={handleView}
            // disabled={enabledLinearProgress}
            disabled={disabledViewBtn}
          >
            {/* {enabledLinearProgress ? "Loading" : "View"} */}
            {disabledViewBtn ? "Loading" : "View"}
          </Button>
        </Grid>
      </Grid>
      {data && (
        <Card
          elevation={1}
          style={{
            height: "450px",
            marginTop: "1rem",
            paddingTop: "2rem",
          }}
        >
          <div style={{ height: "115%" }}>
            <LineChartMl data={data} />
          </div>
        </Card>
      )}
      {data && (
        <Grid container style={{ marginTop: "1rem" }}>
          <Grid item>
            <Mltable data={data} />
          </Grid>
        </Grid>
      )}
    </>
  );
}
