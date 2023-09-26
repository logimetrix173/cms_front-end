import {
  Button,
  Card,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { tempSitesBlocksInverters } from "../../../constants/SiteNames";
import MultiDropdownSingle from "../../UI/MultiDropdownSingle";
import { SERVER_URL } from "../../../constants/constants";
import InvertersTable from "./InvertersTable";
import Dates from "./Dates";
import { AppState } from "../../../AppContext";
import CustomDropdown from "../../UI/CustomDropdown";
import CustomSingleDate from "../../UI/CustomSingleDate";

export default function InvPerformance({
  updateInverter,
  refreshInverterTable,
}) {
  const { enabledLinearProgress, setEnabledLinearProgress } = AppState();
  const [disabledViewBtn, setDisabledViewBtn] = useState(false);
  const [disabledTableViewBtn, setDisabledTableViewBtn] = useState(false);

  // const [fromDate, setFromDate] = useState(new Date(1657500309000));
  const [fromDate, setFromDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 4);
    date.setHours(0, 0, 1, 0);
    return date;
  });
  const [toDate, setToDate] = useState(() => {
    const date = new Date();
    date.setHours(23, 59, 59, 0);
    return date;
  });

  const [data, setData] = useState([]);
  // const [max, setMax] = useState(0);

  // if multiple sites, all blocks; if single site and multiple blocks, all inverters
  const [sitesBlocksInverters, setSitesBlocksInverters] = useState(
    tempSitesBlocksInverters
  );
  const [selectedSites, setSelectedSites] = useState(
    sitesBlocksInverters[0].name
  );

  const siteNamesAndBlocks = JSON.parse(
    localStorage.getItem("siteNamesAndBlocks")
  );

  const getSites = (sites = siteNamesAndBlocks) => {

  //this is for onlyd demo purpose 
  return sites.filter((site) => site.name === "Hukkeri").map((site) => site.name);
};    //   return sites.map((site) => site.name);
  // };

  const [siteOptions, setSiteOptions] = useState(getSites());

  const [selectedBlocks, setSelectedBlocks] = useState(
    sitesBlocksInverters[0].blocks.map((block) => block.name)
  );
  const [selectedInverters, setSelectedInverters] = useState([
    sitesBlocksInverters[0].blocks[0].inverters[0],
  ]);
  const [tableData, setTableData] = useState(null);
  // const [tableDataCopy, setTableDataCopy] = useState([]);

  const [searchField, setSearchField] = useState("");

  const handleSearchFieldChange = (event) => {
    let value = event.target.value;
    setSearchField(value);
  };

  const fetchDropdownValues = () => {
    // console.log("fetch drop down values");
    // console.log("Hitting: ", SERVER_URL + "/manageinverters/inverters");
    axios.post(SERVER_URL + "/manageinverters/inverters").then((response) => {
      // console.log("======>", response.data);
      let sites = response.data.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      );
      // console.log("fetched sites", sites);
      setSitesBlocksInverters(sites);
      setSelectedSites(sites[0].name);
      setSelectedBlocks(sites[0].blocks.map((block) => block.name));
      setSelectedSiteForTable(sites[0].name);
      setSelectedBlocksForTable(sites[0].blocks.map((block) => block.name));
      // setSelectedInverters([sites[18].blocks[0].inverters[0]]);
    });
  };

  useEffect(() => {
    fetchDropdownValues();
  }, []);

  const [selectedSiteForTable, setSelectedSiteForTable] = useState("Hukkeri");

  const [selectedBlocksForTable, setSelectedBlocksForTable] = useState(
    sitesBlocksInverters[0].blocks.map((block) => block.name)
  );

  const [tableDate, setTableDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 2);
    date.setHours(0, 0, 1, 0);
    return date;
  });

  const getEndTimeForTable = (time) => {
    const date = new Date(time);
    date.setHours(23, 59, 59, 0);
    return date.getTime();
  };

  const handleTableSiteChange = (event) => {
    let value = event.target.value;
    setSelectedSiteForTable(value);

    setSelectedBlocksForTable(
      sitesBlocksInverters
        .find((site) => site.name === value)
        .blocks.map((block) => block.name)
    );
  };

  const handleTableBlocksChange = (event) => {
    let value = event.target.value;

    if (value[value.length - 1] === "all") {
      setSelectedBlocksForTable(
        selectedBlocksForTable.length ===
          sitesBlocksInverters.find(
            (site) => site.name === selectedSiteForTable
          ).blocks.length
          ? []
          : sitesBlocksInverters
              .find((site) => site.name === selectedSiteForTable)
              .blocks.map((block) => block.name)
      );
      return;
    }

    setSelectedBlocksForTable(value);
  };

  const handleSitesChange = (event) => {
    let value = event.target.value;

    // if (value[value.length - 1] === "all") {
    //   setSelectedSites(
    //     selectedSites.length === sitesBlocksInverters.length
    //       ? []
    //       : sitesBlocksInverters.map((site) => site.name)
    //   );
    //   return;
    // }

    setSelectedSites(value);

    // if (value.length > 1) {
    //   setSelectedBlocks(["All"]);
    // } else {
    //   setSelectedBlocks(
    //     sitesBlocksInverters
    //       .find((site) => site.name === value[0])
    //       .blocks.map((block) => block.name)
    //   );
    // }

    setSelectedBlocks(
      sitesBlocksInverters
        .find((site) => site.name === value)
        .blocks.map((block) => block.name)
    );
  };

  const handleBlocksChange = (event) => {
    let value = event.target.value;

    if (value[value.length - 1] === "all") {
      setSelectedBlocks(
        selectedBlocks.length ===
          sitesBlocksInverters.find((site) => site.name === selectedSites)
            .blocks.length
          ? []
          : sitesBlocksInverters
              .find((site) => site.name === selectedSites)
              .blocks.map((block) => block.name)
      );
      return;
    }

    setSelectedBlocks(value);
  };

  const handleInvertersChange = (event) => {
    let value = event.target.value;

    if (value[value.length - 1] === "all") {
      setSelectedInverters(
        selectedInverters.length ===
          sitesBlocksInverters[0].blocks[0].inverters.length
          ? []
          : sitesBlocksInverters[0].blocks[0].inverters
      );
      return;
    }

    setSelectedInverters(value.map((element) => ({ name: element })));
  };

  const getEndTime = (timestamp) => {
    const date = new Date(timestamp);
    date.setHours(23, 59, 0, 0);
    return date.getTime();
  };

  const handleView = () => {
    // console.log(
    //   "handleView",
    //   selectedSites,
    //   selectedBlocks,
    //   fromDate.getTime(),
    //   toDate.getTime()
    // );

    setEnabledLinearProgress(true);
    setDisabledViewBtn(true);
    // get cards data
    axios
      .post(SERVER_URL + "/invPerformance", {
        sites: [selectedSites],

        blocks:
          selectedSites.length > 1
            ? ["all"]
            : selectedBlocks.map((element) => element.name),
        // inverters:
        //   selectedBlocks.length > 1
        //     ? ["all"]
        //     : selectedInverters,
        startTime: fromDate.getTime(),
        endTime: toDate.getTime(),
      })
      .then((response) => {
        // console.log("invPerformance", response.data);
        setEnabledLinearProgress(false);
        setDisabledViewBtn(false);
        const data = response.data;

        // setMax(max);
        setData(data);
      })
      .catch((err) => {
        setEnabledLinearProgress(false);
        setDisabledViewBtn(false);
        console.log("invPerformance", err);
      });
  };

  const handleTableView = () => {
    // console.log(
    //   selectedSiteForTable,
    //   selectedBlocksForTable,
    //   tableDate,
    //   new Date(getEndTimeForTable(tableDate.getTime())).toLocaleString()
    // );

    setEnabledLinearProgress(true);
    setDisabledTableViewBtn(true);

    // get table data
    axios
      .post(SERVER_URL + "/invPerformance/invdetails", {
        sites: [selectedSiteForTable],
        blocks: selectedBlocksForTable,
        startTime: tableDate.getTime(),
        endTime: getEndTimeForTable(tableDate.getTime()),
      })
      .then((response) => {
        // console.log("invPerformanceTable", response.data);
        const data = response.data;
        setTableData(data);
        setEnabledLinearProgress(false);
        setDisabledTableViewBtn(false);
      })
      .catch((err) => {
        console.log("invPerformanceTable", err);
        setEnabledLinearProgress(false);
        setDisabledTableViewBtn(false);
      });
  };

  const setAndGetAll = (dropdown) => {
    // if (dropdown === 'inverters') {
    //     setSelectedInverters([])
    // } else {
    //     setSelectedBlocks([]);
    // }

    return [{ name: "All" }];
  };

  // console.log("Allsite", sitesBlocksInverters);
  // console.log("site", selectedSites);
  // console.log("block", selectedBlocks);

  const getColor = (row, max) => {
    const num = Number(row.value);

    // blue
    let color = "#1976d2";

    // red
    if (num < (max * 97) / 100) {
      color = "#d32f2f";
    }

    // green
    if (num === max) {
      color = "#4caf50";
    }

    return color;
  };

  return (
    <>
      <Grid
        container
        justify="space-between"
        style={{ paddingRight: "2rem" }}
        alignItems="flex-end"
      >
        <Grid item>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item>
              <CustomDropdown
                label={"Site"}
                // items={sitesBlocksInverters.map((site) => site.name)}
                items={siteOptions}
                handleChange={handleSitesChange}
                selectedItem={selectedSites}
              />
              {/* <MultiDropdownSingle
                label={"Site"}
                items={sitesBlocksInverters.map((site) => site.name)}
                handleChange={handleSitesChange}
                selectedItems={selectedSites}
              /> */}
            </Grid>
            <Grid item>
              <MultiDropdownSingle
                label={"Block"}
                items={
                  sitesBlocksInverters.find(
                    (site) => site.name === selectedSites
                  )
                    ? sitesBlocksInverters
                        .find((site) => site.name === selectedSites)
                        .blocks.map((block) => block.name)
                    : []
                }
                handleChange={handleBlocksChange}
                selectedItems={selectedBlocks}
              />
            </Grid>
            {/* <Grid item>
              <MultiDropdownSingle
                label={"Inverter"}
                items={
                  selectedSites.length > 1 || selectedBlocks.length > 1
                    ? []
                    : selectedSites[0].blocks[0].inverters
                }
                handleChange={handleInvertersChange}
                selectedItems={
                  selectedSites.length > 1 || selectedBlocks.length > 1
                    ? setAndGetAll("inverters")
                    : selectedInverters
                }
              />
            </Grid> */}
            <Grid item>
              <Dates
                fromDate={fromDate}
                setFromDate={setFromDate}
                toDate={toDate}
                setToDate={setToDate}
              />
            </Grid>
            <Grid item>
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
        </Grid>
      </Grid>

      <Grid container style={{ paddingRight: "1rem" }}>
        {data.map((day) => {
          let max = 0;
          day.data.forEach((el) => {
            if (Number(el.value) > max) {
              max = Number(el.value);
            }
          });
          return (
            <Grid container style={{ marginTop: "1rem" }} key={day.timestamp}>
              <Grid item style={{ marginRight: "1rem" }}>
                <Grid item>
                  <small style={{ fontSize: ".8rem" }}>{day.site}</small>
                  <br />
                  <small style={{ fontSize: ".8rem" }}>
                    {new Date(day.timestamp * 1000).toLocaleDateString()}
                  </small>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={1}>
                  {day.data.map((datum, index) => {
                    return (
                      <Grid item key={index}>
                        <Tooltip
                          title={
                            <span>
                              <span>{datum.techName}</span>
                              <br />
                              <span>{datum.techMob}</span>
                            </span>
                          }
                          placement="top"
                        >
                          <Card
                            style={{
                              width: 90,
                              padding: ".25rem",
                              borderBottom: "3px solid " + getColor(datum, max),

                              // color: "#fff",
                            }}
                          >
                            <Grid container>
                              <Grid item xs={12}>
                                <small style={{ fontSize: ".75rem" }}>
                                  Block: {datum.name}
                                </small>
                              </Grid>
                              <Grid item xs={12}>
                                <small style={{ fontSize: ".75rem" }}>
                                  Value: <strong>{datum.value}</strong>
                                </small>
                              </Grid>
                            </Grid>
                          </Card>
                        </Tooltip>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>

      <Grid
        container
        style={{ marginTop: "1rem" }}
        alignItems="flex-end"
        spacing={2}
      >
        <Grid item>
          <CustomDropdown
            label={"Site"}
            // items={sitesBlocksInverters.map((site) => site.name)}
            items={siteOptions}
            handleChange={handleTableSiteChange}
            selectedItem={selectedSiteForTable}
          />
        </Grid>
        <Grid item>
          <MultiDropdownSingle
            label={"Blocks"}
            items={
              sitesBlocksInverters.find(
                (site) => site.name === selectedSiteForTable
              )
                ? sitesBlocksInverters
                    .find((site) => site.name === selectedSiteForTable)
                    .blocks.map((block) => block.name)
                : []
            }
            handleChange={handleTableBlocksChange}
            selectedItems={selectedBlocksForTable}
          />
        </Grid>
        <Grid item>
          <CustomSingleDate date={tableDate} setDate={setTableDate} />
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={handleTableView}
            // disabled={enabledLinearProgress}
            disabled={disabledTableViewBtn}
          >
            {disabledTableViewBtn ? "Loading" : "View"}
          </Button>
        </Grid>
      </Grid>

      {tableData && (
        <Grid container style={{ marginTop: "1rem" }}>
          <InvertersTable tableDataObj={tableData} />
        </Grid>
      )}
    </>
  );
}
