import React from "react";
import CustomDropdown from "../../UI/CustomDropdown";
import { Grid, Button, Typography, Card } from "@material-ui/core";
import { useEffect, useState } from "react";
import axios from "axios";
import Dates from "./Dates";
import MenuItem from "@material-ui/core/MenuItem";
import { AppState } from "../../../AppContext";

import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { tempSitesBlocksInverters } from "../../../constants/SiteNames";

import { SERVER_URL } from "../../../constants/constants";
import MultiDropdownSingle from "../../UI/MultiDropdownSingle";
import { el } from "date-fns/locale";
import SingleDropdown from "./SingleDropdown";
import MultiDropdown from "./MultiDropdown";
import TrendlineBiaxialLineChart from "./TrendlineBiaxialLineChart";
// import { SERVER_URL } from "../constants/constants";

const y1CategoryParameters = [
  {
    category: "WMS",
    parameters: [
      "Humidity Instant",
      "Wind Speed Instant",
      "Wind Dir Instant",
      "Rain",
      "GHI Instant",
      "GHI Instant2",
      "GTI Instant",
      "GTI Instant2",
      "Mod. Temp Instant",
      "Mod. Temp Instant2",
      "Mod. Temp 2 Instant",
      "Amb. Temp Instant",
    ],
  },
  {
    category: "Plant",
    parameters: [
      "PA Instant",
      "GA Instant",
      "Plant PR Instant",
      "Day Generation Cumulative (KWH)",
      "Power Generation Instant (MW)",
      "Peak Power",
      "Revenue",
    ],
  },
  {
    category: "Inverter",
    parameters: [
      "L1 I",
      "L2 I",
      "L3 I",
      "L1 V",
      "L2 V",
      "L3 V",
      "Frequency",
      "DC I",
      "DC V",
      "Active Power",
      "DC Power",
      "Reactive Power",
      "PF",
      "Cab Temp",
      "IGBT Temp",
      "DC Energy",
    ],
  },
  {
    category: "Inv Scb",
    parameters: [
      "S1",
      "S2",
      "S3",
      "S4",
      "S5",
      "S6",
      "S7",
      "S8",
      "S9",
      "S10",
      "S11",
      "S12",
      "S12",
      "S13",
      "S14",
      "S15",
      "S16",
      "S17",
      "S18",
      "S19",
      "S20",
      "S21",
      "S22",
      "S23",
      "S24",
      "S25",
      "S26",
      "S27",
      "S28",
      "S29",
      "S30",
      "S31",
      "S32",
    ],
  },
  {
    category: "Inv Slots",
    parameters: [
      "S1 L1 I",
      "S1 L3 I",
      "S1 L1 V",
      "S1 L2 V",
      "S1 L3 V",
      "S1 DC I",
      "S1 DC V",
      "S1 Active Power",
      "S1 PF",
      "S1 DC Power",
      "S1 IGBT Temp",
      "S1 CAB Temp",
      "S2 L1 I",
      "S2 L2 I",
      "S2 L3 I",
      "S2 L1 V",
      "S2 L2 V",
      "S2 L3 V",
      "S2 DC I",
      "S2 DC V",
      "S2 Active Power",
      "S2 DC Power",
      "S2 PF",
      "S2 IGBT Temp",
      "S2 CAB Temp",
      "S3 L1 I",
      "S3 L2 I",
      "S3 L3 I",
      "S3 L1 V",
      "S3 L2 V",
      "S3 L3 V",
      "S3 DC I",
      "S3 DC V",
      "S3 Active Power",
      "S3 DC Power",
      "S3 PF",
      "S3 IGBT Temp",
      "S3 CAB Temp",
      "S4 L1 I",
      "S4 L2 I",
      "S4 L3 I",
      "S4 L1 V",
      "S4 L2 V",
      "S4 L3 V",
      "S4 DC I",
      "S4 DC V",
      "S4 Active Power",
      "S4 DC Power",
      "S4 IGBT Temp",
      "S4 CAB Temp",
      "S1 + S2 Peak Active Power",
      "S3 + S4 Peak Active Power",
    ],
  },
  {
    category: "Calculated",
    parameters: ["Inv Efficiency", "Calculated PR"],
  },
];

const series = [
  {
    name: "Series 1",
    data: [
      { category: "A", value: Math.random() },
      { category: "B", value: Math.random() },
      { category: "C", value: Math.random() },
    ],
  },
  {
    name: "Series 2",
    data: [
      { category: "B", value: Math.random() },
      { category: "C", value: Math.random() },
      { category: "D", value: Math.random() },
    ],
  },
  {
    name: "Series 3",
    data: [
      { category: "C", value: Math.random() },
      { category: "D", value: Math.random() },
      { category: "E", value: Math.random() },
    ],
  },
];

export default function TrendLine() {
  const { setEnabledLinearProgress, setSnackbar } = AppState();
  const [disabledCSVBtn, setDisabledCSVBtn] = useState(false);

  const [fromDate, setFromDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    date.setHours(0, 0, 1, 0);
    return date;
  });
  const [toDate, setToDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    date.setHours(23, 59, 59, 0);
    return date;
  });

  const [frequency, setFrequency] = useState("daily");

  const handleFrequencyChange = (event) => {
    let value = event.target.value;
    setFrequency(value);
  };

  const gety1parameters = () => {
    // let valuey1 = y1CategoryParameters.filter(
    //   (val) => val.category === y1Category.join()
    // );
    let newArray = [];
    y1Category.map((ele) => {
      let v = y1CategoryParameters
        .find((site) => site.category === ele)
        .parameters.map((el) => el);

      v.map((value) => newArray.push(value));
    });
    // let selectedparam = newArray.map((element) => element);
    // return setY1ParameterOptions(newArray);
    // console.log(newArray, "173");
    // let y1 = newArray.map((el) => el.parameters[0]);
    return newArray;
  };

  const selectedY1Category = () => {
    let catvalue = y1CategoryParameters.map((val) => val.category);
    let value = [catvalue[0]];
    return value;
    // return catvalue;
  };

  const gety2parameters = () => {
    // let valuey1 = y1CategoryParameters.filter(
    //   (val) => val.category === y2Category
    // );
    // let y1 = valuey1.map((el) => el.parameters[0]);
    // return y1;
    let newArray = [];
    y2Category.map((ele) => {
      let v = y1CategoryParameters
        .find((site) => site.category === ele)
        .parameters.map((el) => el);

      v.map((value) => newArray.push(value));
    });
    // let selectedparam = newArray.map((element) => element);
    // return setY1ParameterOptions(newArray);
    // console.log(newArray, "173");
    // let y1 = newArray.map((el) => el.parameters[0]);
    return newArray;
  };

  const selectedY2Category = () => {
    let catvalue = y1CategoryParameters.map((val) => val.category);
    let value = [catvalue[0]];
    return value;
  };

  const [y1Category, setY1Category] = useState(selectedY1Category());

  const [y1Parameter, setY1Parameter] = useState(gety1parameters());
  const [y1ParameterOptions, setY1ParameterOptions] = useState(
    gety1parameters()
  );

  const [y2Category, setY2Category] = useState(selectedY2Category());

  const [y2Parameter, setY2Parameter] = useState(gety2parameters());
  const [y2ParameterOptions, setY2ParameterOptions] = useState(
    gety2parameters()
  );
  // const [parameter2, setParameter2] = useState("none");
  // console.log("y1cat,y1param", y1Category, y1Category.length, y1Parameter);
  let newParam = [];
  const handleY1items = () => {
    // let newArray = [];
    y1Category.map((ele) => {
      let v = y1CategoryParameters
        .find((site) => site.category === ele)
        .parameters.map((el) => el);

      v.map((value) => newParam.push(value));
      // return newArray;
    });
  };
  const handleMultipleY1Category = () => {
    // gety1parameters();
    let newY1Array = [];
    // setY1ParameterOptions();
    y1Category.map((ele) => {
      let v = y1CategoryParameters
        .find((site) => site.category === ele)
        .parameters.map((el) => el);

      v.map((value) => newY1Array.push(value));
    });
    // setY1ParameterOptions(newArray);
    return setY1ParameterOptions(newY1Array), newY1Array;
  };

  const handleMultipleY2Category = () => {
    // gety1parameters();
    let newY2Array = [];
    // setY1ParameterOptions();
    y2Category.map((ele) => {
      let v = y1CategoryParameters
        .find((site) => site.category === ele)
        .parameters.map((el) => el);

      v.map((value) => newY2Array.push(value));
    });
    // setY1ParameterOptions(newArray);
    return setY2ParameterOptions(newY2Array), newY2Array;
  };

  const handleY1CategoryChange = (event) => {
    // console.log("handleY1Category func");
    let value = event.target.value;

    if (value[value.length - 1] === "all") {
      setY1Category(
        y1Category.length ===
          y1CategoryParameters.map((site) => site.category).length
          ? []
          : y1CategoryParameters.map((block) => block.category)
      );
      return;
    }

    // setY1Category(value);

    setY1Category(value);
    // console.log(
    //   "y1cat,y1param",
    //   "00000",
    //   y1Category,
    //   y1Category.length,
    //   y1Parameter
    // );
    // setY1Parameter([
    //   y1CategoryParameters
    //     .find((site) => site.category === value)
    //     .parameters.map((block) => block)
    //     .splice(0, 1)[0],
    // ]);
  };
  useEffect(() => {
    setY1Parameter(
      // y1Category.length !== 1 && value[value.length - 1] === "all"
      //   ? ["All"]
      // y1Category.length > 1
      //   ? handleMultipleY1Category
      //   : y1CategoryParameters
      //       .find((site) => site.category === y1Category.join())
      //       ?.parameters.map((block) => block)
      handleMultipleY1Category()
    );
  }, [y1Category]);

  const handleY1ParameterChange = (event) => {
    let value = event.target.value;

    if (value[value.length - 1] === "all") {
      setY1Parameter(
        y1Parameter.length === y1ParameterOptions.length ? [] : gety1parameters
        // : y1Category.length > 1
        // ? ["All"]
        // y1Category.length > 1
        // ? handleMultipleY1Category
        // : handleMultipleY1Category
        // : y1CategoryParameters
        //     .find((site) => site.category === y1Category.join())
        //     ?.parameters?.map((block) => block)
      );
      return;
    }

    setY1Parameter(value);
    // console.log("handleY1param", y1Parameter);
  };

  const handleY2CategoryChange = (event) => {
    // let value = event.target.value;

    // setY2Category(value);

    // setY2Parameter([
    //   y1CategoryParameters
    //     .find((site) => site.category === value)
    //     .parameters.map((block) => block)
    //     .splice(0, 1)[0],
    // ]);
    let value = event.target.value;

    if (value[value.length - 1] === "all") {
      setY2Category(
        y2Category.length ===
          y1CategoryParameters.map((site) => site.category).length
          ? []
          : y1CategoryParameters.map((block) => block.category)
      );
      return;
    }

    // setY1Category(value);

    setY2Category(value);
  };
  useEffect(() => {
    setY2Parameter(handleMultipleY2Category());
  }, [y2Category]);

  const handleY2ParameterChange = (event) => {
    // let value = event.target.value;

    // if (value[value.length - 1] === "all") {
    //   setY2Parameter(
    //     y2Parameter.length ===
    //       y1CategoryParameters.find((site) => site.category === y2Category)
    //         .parameters.length
    //       ? []
    //       : y1CategoryParameters
    //           .find((site) => site.category === y2Category)
    //           .parameters.map((block) => block)
    //   );
    //   return;
    let value = event.target.value;

    if (value[value.length - 1] === "all") {
      setY2Parameter(
        y2Parameter.length === y2ParameterOptions.length ? [] : gety2parameters
      );
      return;
    }

    setY2Parameter(value);
  };

  // const handleParameter1Change = (event) => {
  //   const value = event.target.value;
  //   if (value === parameter2) {
  //     return;
  //   }
  //   setParameter1(value);
  // };

  // const handleParameter2Change = (event) => {
  //   const value = event.target.value;
  //   // if (value === parameter1) {
  //   //   return;
  //   // }
  //   setParameter2(value);
  // };
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
    };
  //  return sites.map((site) => site.name);
  

  const [siteOptions, setSiteOptions] = useState(getSites());
  const [selectedBlocks, setSelectedBlocks] = useState(
    sitesBlocksInverters[0].blocks.map((block) => block.name)
  );

  const [selectedInverters, setSelectedInverters] = useState(["I01"]);

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
      setSelectedSites(sites[1].name);
      setSelectedBlocks(sites[1].blocks[0].name);
      // setSelectedBlocks(sites[19].blocks.map((block) => block.name));
      // setSelectedSiteForTable(sites[19].name);
      // setSelectedBlocksForTable(sites[19].blocks.map((block) => block.name));
      // setSelectedInverters([sites[18].blocks[0].inverters[0]]);
    });
  };

  useEffect(() => {
    fetchDropdownValues();
  }, []);

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

    // setSelectedBlocks(
    //   sitesBlocksInverters
    //     .find((site) => site.name === value)
    //     .blocks.map((block) => block.name)
    // );
    let blocks = sitesBlocksInverters
      .find((site) => site.name === value)
      .blocks.map((block) => block.name);
    let singleblock = blocks[0];
    setSelectedBlocks(singleblock);
  };

  const handleBlocksChange = (event) => {
    let value = event.target.value;

    // if (value[value.length - 1] === "all") {
    //   setSelectedBlocks(
    //     selectedBlocks.length ===
    //       sitesBlocksInverters.find((site) => site.name === selectedSites)
    //         .blocks.length
    //       ? []
    //       : sitesBlocksInverters
    //           .find((site) => site.name === selectedSites)
    //           .blocks.map((block) => block.name)
    //   );
    //   return;
    // }

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
      const block = site["blocks"].find(
        (block) => block.name === selectedBlocks
      );
      const foundInveters = block?.inverters.map((inv) => inv.name);
      inverters = foundInveters.length > 0 ? foundInveters.sort() : [];
    } catch (error) {
      inverters = [];
    }
    return inverters;
  };

  // irradiance / generation data
  const [disabledViewBtn, setDisabledViewBtn] = useState(false);

  const [charts, setCharts] = useState([]);
  const [chartYAlign, setChartYAlign] = useState({});

  // Function related to BiaxialLineChart
  const getTrendlineData = (startTime, endTime, beginTime) => {
    // console.log(
    //   "Trend line",
    //   selectedSites,
    //   selectedBlocks,
    //   fromDate.getTime(),
    //   toDate.getTime(),
    //   frequency,
    //   y1Category,
    //   y1Parameter,
    //   y2Category,
    //   y2Parameter
    // );
    setEnabledLinearProgress(true);

    setDisabledViewBtn(true);

    axios
      .post(SERVER_URL + "/trendline/graph", {
        // jwtToken: userToken,
        site: selectedSites,
        block: selectedBlocks,
        inverters: selectedInverters,

        startTime: fromDate.getTime(),
        endTime: toDate.getTime(),
        frequency: frequency,
        y1Category: y1Category,
        y1Parameter: y1Parameter,
        y2Category: y2Category,
        y2Parameter: y2Parameter,
        // beginTime: beginTime,
        // enablePacket: getEnablePacket(),
        // clientPacketTime: timestamp,
        // isNext: getIsNext(),
      })
      .then((response) => {
        // console.log("i/g data: ", response.data);
        const data = response.data;
        // console.log(data);
        const newCharts = data.charts;
        setCharts(newCharts);
        const align = data.align;
        // console.log(align);
        setChartYAlign(align);
        setEnabledLinearProgress(false);

        setDisabledViewBtn(false);
      })
      .catch((error) => {
        // console.log(error);
        setEnabledLinearProgress(false);

        setDisabledViewBtn(false);
      });
  };

  const fetchCSV = async () => {
    // console.log("hitt csv-->");
    let jwtToken = localStorage.getItem("userToken");
    setDisabledCSVBtn(true);
    setEnabledLinearProgress(true);
    try {
      const response = await axios.post(
        SERVER_URL + "/trendline/graph/csv",
        {
          email: localStorage.getItem("userEmail"),
          site: selectedSites,
          block: selectedBlocks,
          inverters: selectedInverters,
          startTime: fromDate.getTime(),
          endTime: toDate.getTime(),
          frequency: frequency,
          y1Category: y1Category,
          y1Parameter: y1Parameter,
          y2Category: y2Category,
          y2Parameter: y2Parameter,
          // sites: selectedSites,
          // startTime: fromDate.getTime(),
          // endTime: toDate.getTime(),
          // frequency: frequency,
        }
        // {
        //   cancelToken: source.token,
        //   headers: { jwtToken: jwtToken },
        // }
      );
      console.log(response.data);
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      let filename = `${fromDate.getDate()}_${
        fromDate.getMonth() + 1
      } to ${toDate.getDate()}_${toDate.getMonth() + 1}.csv`;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setEnabledLinearProgress(false);
      setDisabledCSVBtn(false);
    } catch (error) {
      // console.log(error);
      setSnackbar((prevState) => ({
        ...prevState,
        open: true,
        severity: "error",
        message: "No data found.",
      }));
      setEnabledLinearProgress(false);
      setDisabledCSVBtn(false);
    }
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
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
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
        <Grid item style={{ marginLeft: "1rem" }}>
          <SingleDropdown
            label={"Block"}
            items={
              sitesBlocksInverters.find((site) => site.name === selectedSites)
                ? sitesBlocksInverters
                    .find((site) => site.name === selectedSites)
                    .blocks.map((block) => block.name)
                : []
            }
            handleChange={handleBlocksChange}
            selectedItem={selectedBlocks}
          />
        </Grid>
        <Grid item style={{ marginLeft: "1rem" }}>
          <MultiDropdown
            label={"Inverter"}
            items={getInverterOptions()}
            handleChange={handleInvertersChange}
            selectedItems={selectedInverters}
          />
        </Grid>
        <Grid item>
          <Dates
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
          />
        </Grid>
        <Grid item style={{ marginLeft: "1rem" }}>
          <FormControl>
            <InputLabel id="frequency-simple-select-label">
              Frequency
            </InputLabel>
            <Select
              labelId="frequency-simple-select-label"
              id="frequency-simple-select"
              value={frequency}
              onChange={handleFrequencyChange}
              style={{ fontSize: ".8rem" }}
            >
              <MenuItem value={"daily"}>Daily</MenuItem>
              <MenuItem value={"mtd"}>MTD</MenuItem>
              <MenuItem value={"ytd"}>YTD</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item style={{ marginLeft: "1rem" }}>
          <MultiDropdown
            label={"Y1 Cat"}
            // items={sitesBlocksInverters.map((site) => site.name)}
            items={y1CategoryParameters.map((ele) => ele.category)}
            handleChange={handleY1CategoryChange}
            selectedItems={y1Category}
          />
        </Grid>
        <Grid item style={{ marginLeft: "1rem" }}>
          <MultiDropdown
            label={"Y1 Param"}
            items={y1ParameterOptions}
            // items={newParam}
            handleChange={handleY1ParameterChange}
            selectedItems={y1Parameter}
          />
        </Grid>
        <Grid item style={{ marginLeft: "1rem" }}>
          <MultiDropdown
            label={"Y2 Cat"}
            // items={sitesBlocksInverters.map((site) => site.name)}
            items={y1CategoryParameters.map((ele) => ele.category)}
            handleChange={handleY2CategoryChange}
            selectedItems={y2Category}
          />
        </Grid>
        <Grid item style={{ marginLeft: "1rem" }}>
          <MultiDropdown
            label={"Y2 Param"}
            // items={
            //   y1CategoryParameters.find((cat) => cat.category === y2Category)
            //     ? y1CategoryParameters
            //         .find((cat) => cat.category === y2Category)
            //         .parameters.map((param) => param)
            //     : []
            // }
            items={y2ParameterOptions}
            handleChange={handleY2ParameterChange}
            selectedItems={y2Parameter}
          />
        </Grid>
        <Grid item style={{ marginLeft: "1rem", marginTop: "0.8rem" }}>
          <Button
            variant="outlined"
            size="small"
            style={{
              // paddingInline: "1.5rem",
              // marginTop: "-0.6rem",
              fontSize: "14px",
              height: "2rem",
            }}
            color="primary"
            onClick={getTrendlineData}
            disabled={disabledViewBtn}
          >
            {/* View */}
            {disabledViewBtn ? "Loading" : "View"}
          </Button>
        </Grid>
        <Grid item style={{ marginLeft: "1rem", marginTop: "0.8rem" }}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            style={{
              // paddingInline: "1.5rem",
              // marginTop: "-0.6rem",
              fontSize: "14px",
              height: "2rem",
            }}
            onClick={fetchCSV}
            disabled={disabledCSVBtn}
          >
            {disabledCSVBtn ? "Downloading" : "CSV"}
          </Button>
        </Grid>
        {/* <Grid item style={{ marginLeft: "1rem" }}>
          <FormControl>
            <InputLabel id="parameter1-select-label">Y1</InputLabel>
            <Select
              labelId="parameter1-select-label"
              id="parameter-select"
              value={parameter1}
              onChange={handleParameter1Change}
              style={{ fontSize: ".8rem" }}
            >
              {parameters1.map((element) => (
                <MenuItem value={element.value}>{element.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid> */}
        {/* <Grid item style={{ marginLeft: "1rem" }}>
          <FormControl>
            <InputLabel id="parameter2-select-label">Y2</InputLabel>
            <Select
              labelId="parameter2-select-label"
              id="parameter2-select"
              value={parameter2}
              onChange={handleParameter2Change}
              style={{ fontSize: ".8rem" }}
            >
              {parameters2.map((element) => (
                <MenuItem value={element.value}>{element.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid> */}
      </Grid>
      {/* <Grid container>
        <TrendlineBiaxialLineChart
          // data={[0, 0, 0, 0]}
          data={irradianceGenerationData}
          // interval={12}
          // leftAxisY={[0, 1500]}
          // rightAxisY={[0, 30]}
        />
      </Grid> */}
      {/* {irradianceGenerationData.map((chart, index) =>
        console.log("chart", chart)
      )} */}
      {/* <TrendlineBiaxialLineChart data={irradianceGenerationData} /> */}
      {/* <TrendlineBiaxialLineChart data={series} /> */}
      {charts.map((chart, index) => (
        <Grid container key={index}>
          <Card
            style={{
              width: "100%",
              height: "410px",
              marginTop: "1rem",
              // paddingBottom: "3rem",

              marginLeft: "-1rem",
              // paddingTop: ".5rem",
              paddingInline: ".5rem",
            }}
          >
            {/* <Grid container>
              <Typography
                style={{ marginLeft: "1rem", marginBottom: ".75rem" }}
              >
                {chart.site}
              </Typography>
            </Grid> */}

            <TrendlineBiaxialLineChart data={chart.data} alignY={chartYAlign} />
          </Card>
        </Grid>
      ))}
    </>
  );
}
