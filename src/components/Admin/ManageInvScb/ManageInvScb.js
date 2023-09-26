import { Button, Grid, TextField } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { tempSitesBlocksInverters } from "../../../constants/SiteNames";
import MultiDropdown from "../../UI/MultiDropdown";
import { SERVER_URL } from "../../../constants/constants";
import InvertersScbTable from "./InvertersScbTable";
import { inverters } from "../../../constants/csvParameters";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import CustomDropdown from "../../UI/CustomDropdown";
import MultiDropdownSingle from "../../UI/MultiDropdownSingle";
import { AppState } from "../../../AppContext";

export default function ManageInvScb({
  updateInverterScb,
  refreshInverterTable,
}) {
  const { setEnabledLinearProgress } = AppState();

  const [disabledViewBtn, setDisabledViewBtn] = useState(false);
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
   
    // return sites.map((site) => site.name);
    //this is for onlyd demo purpose 
    return sites.filter((site) => site.name === "Hukkeri").map((site) => site.name);
  };

  const [siteOptions, setSiteOptions] = useState(getSites());

  const [selectedBlocks, setSelectedBlocks] = useState(
    sitesBlocksInverters[0].blocks.map((block) => block.name)
  );

  // const [selectedInverters, setSelectedInverters] = useState(
  //   sitesBlocksInverters[0].blocks[0].inverters
  // );
  const [selectedInverters, setSelectedInverters] = useState(["I01"]);

  // if multiple sites, all blocks; if single site and multiple blocks, all inverters
  // const siteNamesAndBlocks = JSON.parse(
  //   localStorage.getItem("siteNamesAndBlocks")
  // );

  // const [sitesBlocksInverters, setSitesBlocksInverters] = useState(
  //   tempSitesBlocksInverters
  // );
  // // const [selectedSites, setSelectedSites] = useState([sitesBlocksInverters[0]]);

  // const [selectedSites, setSelectedSites] = useState(
  //   sitesBlocksInverters[0].name
  // );

  // const getSites = (sites = siteNamesAndBlocks) => {
  //   return sites.map((site) => site.name);
  // };

  // const [siteOptions, setSiteOptions] = useState(getSites());

  // // const [selectedBlocks, setSelectedBlocks] = useState([
  // //   sitesBlocksInverters[0].blocks[0],
  // // ]);
  // const [selectedBlocks, setSelectedBlocks] = useState(
  //   sitesBlocksInverters[0].blocks.map((block) => block.name)
  // );
  // const [selectedInverters, setSelectedInverters] = useState([
  //   sitesBlocksInverters[0].blocks[0].inverters[0],
  // ]);
  const [tableData, setTableData] = useState([]);
  const [tableDataCopy, setTableDataCopy] = useState([]);

  const [searchField, setSearchField] = useState("");

  const handleSearchFieldChange = (event) => {
    let value = event.target.value;
    setSearchField(value);
  };

  // const fetchDropdownValues = () => {
  //   axios.post(SERVER_URL + "/manageinverters/inverters").then((response) => {
  //     let sites = response.data.sort((a, b) =>
  //       a.name > b.name ? 1 : b.name > a.name ? -1 : 0
  //     );
  //     setSitesBlocksInverters(sites);
  //     setSelectedSites(sites[0].name);
  //     setSelectedBlocks([sites[0].blocks[0]]);
  //     setSelectedInverters([sites[0].blocks[0].inverters[0]]);
  //   });
  // };

  // useEffect(() => {
  //   fetchDropdownValues();
  // }, []);
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
      //  setSelectedSiteForTable(sites[19].name);
      //  setSelectedBlocksForTable(sites[19].blocks.map((block) => block.name));
      // setSelectedInverters(sites[19].blocks.map((block) => block.inverters));
    });
  };

  useEffect(() => {
    fetchDropdownValues();
  }, []);

  // console.log(
  //   "site",
  //   selectedSites,
  //   "block",
  //   selectedBlocks,
  //   "Inverter",
  //   selectedInverters
  // );
  // const handleSitesChange = (event) => {
  //   let value = event.target.value;
  //   console.log(value);
  //   console.log(selectedSites);

  //   if (value[value.length - 1] === "All") {
  //     setSelectedSites(
  //       selectedSites.length === sitesBlocksInverters.length
  //         ? []
  //         : sitesBlocksInverters
  //     );
  //     return;
  //   }

  //   setSelectedSites((prevState) => {
  //     let filteredValues = [];
  //     sitesBlocksInverters.forEach((element) => {
  //       value.forEach((innerEl) => {
  //         if (element.name === innerEl) {
  //           filteredValues.push(element);
  //         }
  //       });
  //     });
  //     return filteredValues;
  //   });
  // };

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

  // const handleBlocksChange = (event) => {
  //   let value = event.target.value;
  //   console.log(value);
  //   console.log(selectedBlocks);
  //   if (value[value.length - 1] === "All") {
  //     setSelectedBlocks(
  //       selectedBlocks.length === sitesBlocksInverters[0].blocks.length
  //         ? []
  //         : sitesBlocksInverters[0].blocks
  //     );
  //     return;
  //   }

  //   setSelectedBlocks(value.map((element) => ({ name: element })));
  // };
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

  // const handleInvertersChange = (event) => {
  //   let value = event.target.value;

  //   if (value[value.length - 1] === "All") {
  //     setSelectedInverters(
  //       selectedInverters.length ===
  //         sitesBlocksInverters[0].blocks[0].inverters.length
  //         ? []
  //         : sitesBlocksInverters[0].blocks[0].inverters
  //     );
  //     return;
  //   }

  //   setSelectedInverters(value.map((element) => ({ name: element })));
  // };
  const handleInvertersChange = (event) => {
    let value = event.target.value.sort();

    if (value[value.length - 1] === "all") {
      // console.log("abc");

      if (selectedInverters.length === 0) {
        setSelectedInverters(getInverterOptions());
      } else {
        setSelectedInverters([]);
      }

      return;
    }
    setSelectedInverters(value);
    // setSelectedInverter(value.map((element) => ({ name: element })));
  };
  const getInverterOptions = () => {
    let inverters = [];
    try {
      const site = sitesBlocksInverters.find(
        (site) => site.name === selectedSites
      );
      // console.log("261", site);
      let block = site["blocks"].find(
        (block) => block.name === selectedBlocks[0]
      );

      // console.log("265", block);
      const foundInveters =
        selectedBlocks.length > 1
          ? ["All"]
          : block?.inverters.map((inv) => inv.name);

      inverters = foundInveters.length > 0 ? foundInveters.sort() : [];
      // console.log("268", foundInveters, inverters);
    } catch (error) {
      inverters = [];
    }
    return inverters;
  };

  const handleView = () => {
    setEnabledLinearProgress(true);
    setDisabledViewBtn(true);
    // console.log(selectedSites, selectedBlocks, selectedInverters);
    axios
      .post(SERVER_URL + "/scbUpdate", {
        sites: selectedSites,
        blocks: selectedBlocks,
        // inverters: selectedInverters,
        // sites: selectedSites.map((element) => element.name),
        // blocks:
        //   selectedSites.length > 1
        //     ? ["all"]
        //     : selectedBlocks.map((element) => element.name),
        inverters: selectedBlocks.length > 1 ? ["all"] : selectedInverters,
      })
      .then((response) => {
        console.log("124--scb data", response.data);
        // const data = response.data.map((block) => block.block);
        // console.log("data", data);
        setTableData(response.data);
        setTableDataCopy(response.data);
        setEnabledLinearProgress(false);
        setDisabledViewBtn(false);
      })
      .catch((err) => {
        console.log(err);
        setEnabledLinearProgress(false);
        setDisabledViewBtn(false);
      });
  };

  // useEffect(() => {
  //   handleView();
  // }, [refreshInverterTable]);

  const handleSearch = () => {
    if (searchField === "") {
      setTableData(tableDataCopy);
      return;
    }
    let searchedInverter = tableData.filter(
      (element) =>
        String(element.inverter).toLowerCase() ===
        String(searchField).toLowerCase()
    );
    setTableData(searchedInverter);
  };

  const setAndGetAll = (dropdown) => {
    // if (dropdown === 'inverters') {
    //     setSelectedInverters([])
    // } else {
    //     setSelectedBlocks([]);
    // }

    return ["All"];
  };

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        style={{ paddingRight: "10rem" }}
        alignItems="flex-end"
      >
        <Grid item>
          <Grid container spacing={2} alignItems="flex-end">
            {/* <Grid item>
              <MultiDropdown
                label={"Site"}
                // items={sitesBlocksInverters}
                items={siteNamesAndBlocks}
                handleChange={handleSitesChange}
                selectedItems={selectedSites}
              />
            </Grid> */}
            <Grid item>
              <CustomDropdown
                label={"Site"}
                // items={sitesBlocksInverters.map((site) => site.name)}
                items={siteOptions}
                handleChange={handleSitesChange}
                selectedItem={selectedSites}
              />
            </Grid>
            <Grid item>
              {/* <MultiDropdown
                label={"Block"}
                // items={selectedSites.length <= 0 ? [] : selectedSites[0].blocks}
                items={
                  sitesBlocksInverters.find(
                    (site) => site.name === selectedSites
                  )
                    ? getBlocks()
                    : []
                }
                handleChange={handleBlocksChange}
                // selectedItems={
                //   selectedSites.length > 1
                //     ? setAndGetAll("blocks")
                //     : selectedBlocks
                // }
                selectedItems={selectedBlocks}
              /> */}
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
            <Grid item>
              {/* <MultiDropdown
                label={"Inverter"}
                items={
                  selectedSites.length <= 0 || selectedBlocks.length <= 0
                    ? []
                    : sitesBlocksInverters.blocks[0].inverters
                }
                handleChange={handleInvertersChange}
                selectedItems={
                  selectedSites.length > 1 || selectedBlocks.length > 1
                    ? setAndGetAll("inverters")
                    : selectedInverters
                }
              /> */}
              <MultiDropdownSingle
                label={"Inverter"}
                items={getInverterOptions()}
                handleChange={handleInvertersChange}
                selectedItems={
                  selectedBlocks.length > 1
                    ? setAndGetAll("inverters")
                    : selectedInverters
                }
              />
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={handleView}
              >
                View
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <TextField
            id="search"
            placeholder="Enter inverter"
            value={searchField}
            onChange={handleSearchFieldChange}
            style={{ maxWidth: "8rem", marginRight: ".5rem" }}
          />
          <Button variant="outlined" size="small" onClick={handleSearch}>
            Search
          </Button>
        </Grid>
      </Grid>

      <Grid
        container
        style={{
          marginTop: ".5rem",
          // paddingRight: "5rem",
          marginRight: "10rem",
        }}
      >
        <InvertersScbTable
          data={tableData}
          updateInverterScb={updateInverterScb}
        />
      </Grid>
    </>
  );
}
