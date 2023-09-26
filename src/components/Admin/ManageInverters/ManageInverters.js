import { Button, Grid, TextField } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { tempSitesBlocksInverters } from "../../../constants/SiteNames";
import MultiDropdown from "../../UI/MultiDropdown";
import { SERVER_URL } from "../../../constants/constants";
import InvertersTable from "./InvertersTable";
import { AppState } from "../../../AppContext";
import CustomDropdown from "../../UI/CustomDropdown";
import MultiDropdownSingle from "../../UI/MultiDropdownSingle";

export default function ManageInverters({
  updateInverter,
  refreshInverterTable,
}) {
  const { setEnabledLinearProgress } = AppState();

  const [disabledViewBtn, setDisabledViewBtn] = useState(false);

  // if multiple sites, all blocks; if single site and multiple blocks, all inverters
  // const siteNamesAndBlocks = JSON.parse(
  //   localStorage.getItem("siteNamesAndBlocks")
  // );

  // const [sitesBlocksInverters, setSitesBlocksInverters] = useState(
  //   tempSitesBlocksInverters
  // );
  // // const [selectedSites, setSelectedSites] = useState([sitesBlocksInverters[0]]);

  // const [selectedSites, setSelectedSites] = useState(siteNamesAndBlocks);

  // const [selectedBlocks, setSelectedBlocks] = useState([
  //   sitesBlocksInverters[0].blocks[0],
  // ]);
  // const [selectedInverters, setSelectedInverters] = useState([
  //   sitesBlocksInverters[0].blocks[0].inverters[0],
  // ]);
  const [sitesBlocksInverters, setSitesBlocksInverters] = useState(
    tempSitesBlocksInverters
  );
  const [selectedSites, setSelectedSites] = useState(
    sitesBlocksInverters[0].name
  );

  const siteNamesAndBlocks = JSON.parse(
    localStorage.getItem("siteNamesAndBlocks")
  );

  const getSites = (sites =siteNamesAndBlocks )=> {
    //sites.map((site) => site.name);

  //filter code is only for demo purpose otherwise we have to map all sites  
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

  const [tableData, setTableData] = useState([]);
  const [tableDataCopy, setTableDataCopy] = useState([]);

  const [searchField, setSearchField] = useState("");

  const handleSearchFieldChange = (event) => {
    let value = event.target.value;
    setSearchField(value);
  };

  const fetchDropdownValues = () => {
    axios.post(SERVER_URL + "/manageinverters/inverters").then((response) => {
      let sites = response.data.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      );
      // setSitesBlocksInverters(sites);
      // setSelectedSites([sites[0]]);
      // setSelectedBlocks([sites[0].blocks[0]]);
      // setSelectedInverters([sites[0].blocks[0].inverters[0]]);
      setSitesBlocksInverters(sites);
      setSelectedSites(sites[0].name);
      setSelectedBlocks(sites[0].blocks.map((block) => block.name));
    });
  };

  useEffect(() => {
    fetchDropdownValues();
  }, []);

  // const handleSitesChange = (event) => {
  //   let value = event.target.value;

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

    setSelectedSites(value);

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

  // const handleBlocksChange = (event) => {
  //   let value = event.target.value;

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

  const handleView = () => {
    setEnabledLinearProgress(true);
    setDisabledViewBtn(true);
    axios
      .post(SERVER_URL + "/manageinverters/view", {
        sites: selectedSites,
        blocks: selectedBlocks,
        inverters: selectedBlocks.length > 1 ? ["all"] : selectedInverters,
        //   sites: selectedSites.map((element) => element.name),
        //   blocks:
        //     selectedSites.length > 1
        //       ? ["all"]
        //       : selectedBlocks.map((element) => element.name),
        //   inverters:
        //     selectedBlocks.length > 1
        //       ? ["all"]
        //       : selectedInverters.map((element) => element.name),
      })
      .then((response) => {
        // console.log(response.data);
        setTableData(response.data);
        setTableDataCopy(response.data);
        setDisabledViewBtn(false);
        setEnabledLinearProgress(false);
      })
      .catch((err) => {
        console.log(err);
        setDisabledViewBtn(false);
        setEnabledLinearProgress(false);
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

  // const setAndGetAll = (dropdown) => {
  //   // if (dropdown === 'inverters') {
  //   //     setSelectedInverters([])
  //   // } else {
  //   //     setSelectedBlocks([]);
  //   // }

  //   return [{ name: "All" }];
  // };
  const setAndGetAll = (dropdown) => {
    return ["All"];
  };

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        style={{ paddingRight: "2rem" }}
        alignItems="flex-end"
      >
        <Grid item>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item>
              <CustomDropdown
                label={"Site"}
                // items={sitesBlocksInverters}
                items={siteOptions}
                handleChange={handleSitesChange}
                selectedItem={selectedSites}
              />
            </Grid>
            <Grid item>
              <MultiDropdownSingle
                // label={"Block"}
                // items={selectedSites.length <= 0 ? [] : selectedSites[0].blocks}
                // handleChange={handleBlocksChange}
                // selectedItems={
                //   selectedSites.length > 1
                //     ? setAndGetAll("blocks")
                //     : selectedBlocks
                // }
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
              <MultiDropdownSingle
                // label={"Inverter"}
                // items={
                //   selectedSites.length <= 0 || selectedBlocks.length <= 0
                //     ? []
                //     : selectedSites[0].blocks[0].inverters
                // }
                // handleChange={handleInvertersChange}
                // selectedItems={
                //   selectedSites.length > 1 || selectedBlocks.length > 1
                //     ? setAndGetAll("inverters")
                //     : selectedInverters
                // }
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
                disabled={disabledViewBtn}
              >
                {disabledViewBtn ? "Loading" : "View"}
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

      <Grid container style={{ marginTop: ".5rem", paddingRight: "1rem" }}>
        <InvertersTable data={tableData} updateInverter={updateInverter} />
      </Grid>
    </>
  );
}
