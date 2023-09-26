import axios from "axios";
import DateFnsUtils from "@date-io/date-fns";
import { Button, Grid, ListItemText, OutlinedInput } from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// import Accordion from "@material-ui/core/Accordion";
// import AccordionSummary from "@material-ui/core/AccordionSummary";
// import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React, { useEffect, useState } from "react";
import {
  common,
  uncheckedCommon,
  inverters,
  uncheckedInverters,
  inverterSlots,
  uncheckedInverterSlots,
  inverterStrings,
  uncheckedInverterStrings,
} from "../constants/csvParameters";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { SERVER_URL } from "../constants/constants";
import { siteNamesAndBlocks } from "../constants/SiteNamesY";
import { AppState } from "../AppContext";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  dateStyle: {
    width: 140,
  },
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  formControlLabelStyle: {
    margin: 0,
    // padding: 0,
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "#ffbf80",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    // minHeight: 56,
    minHeight: 1,
    maxHeight: 44,
    "&$expanded": {
      //   minHeight: 56,
      minHeight: 1,
      maxHeight: 44,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
}))(MuiAccordionDetails);

const getSiteNames = () => {
  let siteNames = localStorage.getItem("siteNames");
  if (siteNames !== null) {
    let siteNamesArray = siteNames.split(",");
    return siteNamesArray;
  }
};

const getFromDate = (date) => {
  let newDate = new Date(date.getTime());
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

const getToDate = (date) => {
  let newDate = new Date(date.getTime());
  newDate.setHours(23, 59, 59, 999);
  return newDate;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const BlockMenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 130,
    },
  },
};

export default function CustomCSV({ handleSessionExpire }) {
  const classes = useStyles();

  let localsite = JSON.parse(localStorage.getItem("siteNamesAndBlocks")).map(
    (el) => el.name
  );

  // const getSites = () => {
  //   let selectedsite = localsite.map((el) => el.name);
  //   return selectedsite;
  // };
  const [site, setSite] = useState("Hukkeri")
//this should be there in place hukkeri only for demo purpose localsite[0]);
  // console.log("selSite", site, localsite);

  const { setEnabledLinearProgress } = AppState();

  const getBlockNames = (siteName = site) => {
    if (siteName === "Banka N") {
      return [3, 4, 5, 6];
    }

    if (siteName === "Banka M") {
      return [1, 2, "MCR"];
    }

    let element = JSON.parse(localStorage.getItem("siteNamesAndBlocks")).find(
      (site) => {
        return site.name === siteName;
      }
    );

    return Array.from({ length: element.blocks[0] }, (v, i) => i + 1);
  };

  const [selectedBlock, setSelectedBlock] = useState(getBlockNames());
  const [fromDate, setFromDate] = useState(() => {
    let date = new Date();
    date.setDate(new Date().getDate() - 1);
    return getFromDate(date);
  });
  const [toDate, setToDate] = useState(() => {
    let date = new Date();
    return getToDate(date);
  });

  const [globalSelectAll, setGlobalSelectAll] = useState(true);
  const [commonSelectAll, setCommmonSelectAll] = useState(true);
  const [invertersSelectAll, setInvertersSelectAll] = useState(true);
  const [inverterSlotsSelectAll, setInverterSlotsSelectAll] = useState(true);
  const [inverterStringsSelectAll, setInverterStringsSelectAll] =
    useState(true);

  const [disableDownload, setDisableDownload] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    severity: "info",
    message: "",
  });

  const [parameters, setParameters] = useState([]);

  const [commonParams, setCommonParams] = useState(
    JSON.parse(JSON.stringify(common))
  );

  const [invertersParams, setInvertersParams] = useState(
    JSON.parse(JSON.stringify(inverters))
  );

  const [inverterSlotsParams, setInverterSlotsParams] = useState(
    JSON.parse(JSON.stringify(inverterSlots))
  );

  const [inverterStringsParams, setInverterStringsParams] = useState(
    JSON.parse(JSON.stringify(inverterStrings))
  );

  const [variants, setVariants] = useState([]);

  const [frequency, setFrequency] = useState("full");

  const handleFrequency = (event) => {
    let value = event.target.value;
    setFrequency(value);
  };

  // const handleBlockChange = (event) => {
  //   setSelectedBlock(event.target.value);
  // };

  const handleBlockChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelectedBlock(
        selectedBlock.length === getBlockNames().length ? [] : getBlockNames()
      );
      return;
    }
    setSelectedBlock(value);
  };

  useEffect(() => {
    let variants = JSON.parse(localStorage.getItem("csvVariants"));

    if (variants) {
      let variantsKies = [];
      variants.forEach((element) => {
        variantsKies.push(element.key);
      });
      setVariants(variantsKies);
    }

    return () => {
      setEnabledLinearProgress(false);
    };
  }, []);

  const handleVariantsSave = () => {
    let variantsLength = variants.length;

    variantsLength += 1;

    // console.log(commonParams)

    let object = {
      key: "v" + variantsLength,
      commonParams: [...commonParams],
      invertersParams: [...invertersParams],
      inverterSlotsParams: [...inverterSlotsParams],
      inverterStringsParams: [...inverterStringsParams],
    };

    let combinedVariants = [];

    let oldVariants = JSON.parse(localStorage.getItem("csvVariants"));

    if (oldVariants) {
      combinedVariants.push(...oldVariants);
    }

    combinedVariants.push(object);

    localStorage.setItem("csvVariants", JSON.stringify(combinedVariants));

    setVariants((prevState) => {
      let newVariants = [];
      newVariants.push(...prevState, "v" + variantsLength);
      // console.log('newVariants', newVariants);
      return newVariants;
    });
  };

  const [selectedVariant, setSelectedVariant] = useState("none");

  const findVariant = (key) => {
    let variants = JSON.parse(localStorage.getItem("csvVariants"));

    if (variants) {
      let variant = {};
      variants.forEach((element) => {
        if (element.key === key) {
          variant = { ...element };
        }
      });
      // console.log('variant', variant);
      setCommonParams(variant.commonParams);
      setInvertersParams(variant.invertersParams);
      setInverterSlotsParams(variant.inverterSlotsParams);
      setInverterStringsParams(variant.inverterStringsParams);
    }
  };

  const handleVariantChange = (event) => {
    setSelectedVariant(event.target.value);
    findVariant(event.target.value);
  };

  const handleVariantClick = (key) => {
    // console.log('handleVariantClick', key)
    findVariant(key);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleCommonParamChange = (label) => {
    let changedParams = [...commonParams];
    for (const element of changedParams) {
      if (element.label === label) {
        element.checked = !element.checked;
        if (element.checked === false) {
          setCommmonSelectAll(false);
          setGlobalSelectAll(false);
        }
      }
    }
    setCommonParams(changedParams);
  };

  const handleInvertersParamChange = (label) => {
    let changedParams = [...invertersParams];
    for (const element of changedParams) {
      if (element.label === label) {
        element.checked = !element.checked;
        if (element.checked === false) {
          setInvertersSelectAll(false);
          setGlobalSelectAll(false);
        }
      }
    }
    setInvertersParams(changedParams);
  };

  const handleInverterSlotsParamChange = (label) => {
    let changedParams = [...inverterSlotsParams];
    for (const element of changedParams) {
      if (element.label === label) {
        element.checked = !element.checked;
        if (element.checked === false) {
          setInverterSlotsSelectAll(false);
          setGlobalSelectAll(false);
        }
      }
    }
    setInverterSlotsParams(changedParams);
  };

  const handleInverterStringsParamChange = (label) => {
    let changedParams = [...inverterStringsParams];
    for (const element of changedParams) {
      if (element.label === label) {
        element.checked = !element.checked;
        if (element.checked === false) {
          setInverterStringsSelectAll(false);
          setGlobalSelectAll(false);
        }
      }
    }
    setInverterStringsParams(changedParams);
  };

  const handleGlobalSelectAllChange = (event) => {
    setGlobalSelectAll((prevState) => !prevState);
    if (event.target.checked === false) {
      setCommmonSelectAll(false);
      setInvertersSelectAll(false);
      setInverterSlotsSelectAll(false);
      setInverterStringsSelectAll(false);
      setCommonParams(JSON.parse(JSON.stringify(uncheckedCommon)));
      setInvertersParams(JSON.parse(JSON.stringify(uncheckedInverters)));
      setInverterSlotsParams(
        JSON.parse(JSON.stringify(uncheckedInverterSlots))
      );
      setInverterStringsParams(
        JSON.parse(JSON.stringify(uncheckedInverterStrings))
      );
    } else {
      setCommmonSelectAll(true);
      setInvertersSelectAll(true);
      setInverterSlotsSelectAll(true);
      setInverterStringsSelectAll(true);
      setCommonParams(JSON.parse(JSON.stringify(common)));
      setInvertersParams(JSON.parse(JSON.stringify(inverters)));
      setInverterSlotsParams(JSON.parse(JSON.stringify(inverterSlots)));
      setInverterStringsParams(JSON.parse(JSON.stringify(inverterStrings)));
    }
  };

  const handleCommonSelectAllChange = (event) => {
    setCommmonSelectAll((prevState) => !prevState);
    if (event.target.checked === false) {
      setGlobalSelectAll(false);
      setCommonParams(JSON.parse(JSON.stringify(uncheckedCommon)));
    }
  };

  const handleInvertersSelectAllChange = (event) => {
    setInvertersSelectAll((prevState) => !prevState);
    if (event.target.checked === false) {
      setGlobalSelectAll(false);
      setInvertersParams(JSON.parse(JSON.stringify(uncheckedInverters)));
    }
  };

  const handleInverterSlotsSelectAllChange = (event) => {
    setInverterSlotsSelectAll((prevState) => !prevState);
    if (event.target.checked === false) {
      setGlobalSelectAll(false);
      setInverterSlotsParams(
        JSON.parse(JSON.stringify(uncheckedInverterSlots))
      );
    }
  };

  const handleInverterStringsSelectAllChange = (event) => {
    setInverterStringsSelectAll((prevState) => !prevState);
    if (event.target.checked === false) {
      setGlobalSelectAll(false);
      setInverterStringsParams(
        JSON.parse(JSON.stringify(uncheckedInverterStrings))
      );
    }
  };

  const handleSiteChange = (event) => {
    let value = event.target.value;
    setSite(value);
    setSelectedBlock(getBlockNames(value));
  };

  const handleFromDateChange = (date) => {
    setFromDate(getFromDate(date));
  };

  const handleToDateChange = (date) => {
    setToDate(getToDate(date));
  };

  const getCustomCSV = (route, fileName, parameters) => {
    // console.log(frequency, blockNames);
    setEnabledLinearProgress(true);

    const userToken = localStorage.getItem("userToken");

    // console.log("customCSV", site, parameters);

    // let blockNames = selectedBlock === 'all' ? getAllBlockNames() : selectedBlock !== 'mcr' ? ['B' + String(selectedBlock).padStart(2, 0)] : [selectedBlock];

    let blockNames = [];

    selectedBlock.forEach((element) => {
      if (element !== "MCR") {
        blockNames.push("B" + String(element).padStart(2, 0));
      } else {
        blockNames.push(element);
      }
    });

    // console.log("blockNames", blockNames);

    axios
      .post(
        route,
        {
          startTime: fromDate.getTime(),
          endTime: toDate.getTime(),
          site: String(site).includes("banka") ? "bankam" : site,
          parameters: parameters,
          block: blockNames,
          frequency: frequency,
        },
        {
          headers: {
            jwtToken: userToken,
            responseType: "blob",
          },
        }
      )
      .then((response) => {
        // console.log(response);
        setEnabledLinearProgress(false);
        const downloadUrl = window.URL.createObjectURL(
          new Blob([response.data])
        );
        const link = document.createElement("a");
        link.href = downloadUrl;

        let filename = `${fileName}_${fromDate.getDate()}_${
          fromDate.getMonth() + 1
        }_${fromDate.getFullYear()}-${toDate.getDate()}_${
          toDate.getMonth() + 1
        }_${toDate.getFullYear()}.csv`;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        setDisableDownload(false);
      })
      .catch((error) => {
        // console.log(error);
        setEnabledLinearProgress(false);
        setAlertMessage({ severity: "error", message: "No data found!" });
        setOpenSnackbar(true);
        setDisableDownload(false);
      });
  };

  const fetchCSV = (parameters) => {
    let filename = site + "_" + selectedBlock;
    let route = SERVER_URL + "/customcsv";
    getCustomCSV(route, filename, parameters);
  };

  const iterateParams = (params) => {
    let aggregatedParameters = [];

    for (const param of params) {
      if (param.checked) {
        aggregatedParameters.push(param.label);
      }
    }

    return aggregatedParameters;
  };

  const aggregateParameters = () => {
    let aggregatedParameters = [];

    aggregatedParameters = [
      ...iterateParams(commonParams),
      ...iterateParams(invertersParams),
      ...iterateParams(inverterSlotsParams),
      ...iterateParams(inverterStringsParams),
    ];

    return aggregatedParameters;
  };

  const handleDownloadBtnClick = () => {
    setDisableDownload(true);

    if (site === "none") {
      setAlertMessage({
        severity: "warning",
        message: "Select a site.",
      });
      setOpenSnackbar(true);
      setDisableDownload(false);
      return;
    }

    const aggregatedParameters = aggregateParameters();

    // console.log(aggregatedParameters);

    if (aggregatedParameters.length === 0) {
      setAlertMessage({
        severity: "warning",
        message: "Select at least one parameter.",
      });
      setOpenSnackbar(true);
      setDisableDownload(false);
      return;
    }

    let fromDateTime = fromDate.getTime();
    let toDateTime = toDate.getTime();

    let difference = toDateTime - fromDateTime;

    if (difference > 0) {
      fetchCSV(aggregatedParameters);
    } else {
      setAlertMessage({
        severity: "info",
        message: "Select a different 'To' date.",
      });
      setOpenSnackbar(true);
      setDisableDownload(false);
    }
  };

  useEffect(() => {
    if (commonSelectAll === true) {
      setCommonParams(JSON.parse(JSON.stringify(common)));
    }
  }, [commonSelectAll]);

  useEffect(() => {
    if (invertersSelectAll === true) {
      setInvertersParams(JSON.parse(JSON.stringify(inverters)));
    }
  }, [invertersSelectAll]);

  useEffect(() => {
    if (inverterSlotsSelectAll === true) {
      setInverterSlotsParams(JSON.parse(JSON.stringify(inverterSlots)));
    }
  }, [inverterSlotsSelectAll]);

  useEffect(() => {
    if (inverterStringsSelectAll === true) {
      setInverterStringsParams(JSON.parse(JSON.stringify(inverterStrings)));
    }
  }, [inverterStringsSelectAll]);

  const getAllBlockNames = (siteName = site) => {
    let element = JSON.parse(localStorage.getItem("siteNamesAndBlocks")).find(
      (site) => {
        return site.name === siteName;
      }
    );

    let blockNumbers = Array.from(
      { length: element.blocks[0] },
      (v, i) => i + 1
    );

    let blockNames = [];

    blockNumbers.forEach((element) => {
      blockNames.push("B" + String(element).padStart(2, 0));
    });

    return blockNames;
  };

  return (
    <div style={{ paddingTop: ".5rem" }}>
      {/* <Typography
        variant="h6"
        color="textSecondary"
        style={{ marginBottom: "1.5rem" }}
      >
        Download CSV
      </Typography> */}

      <Grid container alignItems="flex-end" justify="space-between">
        <Grid item>
          <FormControl
            className={classes.formControl}
            style={{ marginRight: "1rem" }}
          >
            <InputLabel id="demo-simple-select-label">Site</InputLabel>
            <Select
              //   autoWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={site}
              onChange={handleSiteChange}
            >
              {/* <MenuItem value="none">
                <em style={{ color: "#9e9e9e" }}>None</em>
              </MenuItem> */}
              {JSON.parse(localStorage.getItem("siteNamesAndBlocks")).map(
                (site) => (
                  <MenuItem key={site.name} value={site.name}>
                    {site.name}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
          {/* <FormControl
            style={{
              width: '60px',
              textAlign: 'left',
              marginRight: '1rem'
            }}
          >
            <InputLabel id='site-select-helper-label'>Block</InputLabel>
            <Select
              labelId='site-select-helper-label'
              id='site-select-helper'
              value={selectedBlock}
              onChange={handleBlockChange}
            >
              {<MenuItem value={'all'} key={1}>All</MenuItem>}
              {getBlockNames().map((element, index) => {
                return (
                  <MenuItem key={index + 2} value={element}>{element}</MenuItem>
                )
              })}
            </Select>
          </FormControl> */}
          <FormControl style={{ marginRight: "1rem", maxWidth: "110px" }}>
            <InputLabel id="block-multiple-checkbox-label">Block</InputLabel>
            <Select
              labelId="block-multiple-checkbox-label"
              id="block-multiple-checkbox"
              multiple
              value={selectedBlock}
              onChange={handleBlockChange}
              // input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              // MenuProps={BlockMenuProps}
              MenuProps={{
                classes: { paper: classes.menuPaper },
                getContentAnchorEl: () => null,
              }}
            >
              <MenuItem key={"all"} value={"all"} style={{ paddingBlock: 0 }}>
                <Checkbox
                  size="small"
                  color="primary"
                  checked={
                    getBlockNames().length > 0 &&
                    selectedBlock.length === getBlockNames().length
                  }
                  indeterminate={
                    selectedBlock.length > 0 &&
                    selectedBlock.length < getBlockNames().length
                  }
                />
                <ListItemText primary={"All"} />
              </MenuItem>
              {getBlockNames().map((name) => (
                <MenuItem key={name} value={name} style={{ paddingBlock: 0 }}>
                  <Checkbox
                    size="small"
                    color="primary"
                    checked={selectedBlock.indexOf(name) > -1}
                  />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              autoOk={true}
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              id="from-date-picker-inline"
              label="From"
              value={fromDate}
              onChange={handleFromDateChange}
              KeyboardButtonProps={{
                "aria-labelte": "from date",
              }}
              style={{ marginRight: "1rem" }}
              className={classes.dateStyle}
            />

            <KeyboardDatePicker
              autoOk={true}
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              id="to-date-picker-inline"
              label="To"
              value={toDate}
              onChange={handleToDateChange}
              KeyboardButtonProps={{
                "aria-label": "to date",
              }}
              className={classes.dateStyle}
            />
          </MuiPickersUtilsProvider>
          <FormControl style={{ marginLeft: "1rem", maxWidth: "110px" }}>
            <InputLabel id="frequency-checkbox-label">Frequency</InputLabel>
            <Select
              labelId="frequency-checkbox-label"
              id="frequency-checkbox"
              value={frequency}
              onChange={handleFrequency}
            >
              <MenuItem key={"full"} value={"full"}>
                Full
              </MenuItem>
              <MenuItem key={"hourly"} value={"hourly"}>
                Hr Avg
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <FormControl
                className={classes.formControl}
                style={{ marginRight: "1rem" }}
              >
                <InputLabel id="variants-select-label">Variants</InputLabel>
                <Select
                  //   autoWidth
                  labelId="variants-select-label"
                  id="variants-simple-select"
                  value={selectedVariant}
                  onChange={handleVariantChange}
                >
                  <MenuItem value="none">
                    <span style={{ color: "#9e9e9e" }}>Select</span>
                  </MenuItem>
                  {variants.length > 0 &&
                    variants.map((element) => {
                      return (
                        <MenuItem
                          value={element}
                          onClick={() => handleVariantClick(element)}
                        >
                          {element}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item style={{ marginRight: "2rem" }}>
              <Button
                variant="outlined"
                size="small"
                onClick={handleVariantsSave}
              >
                Save
              </Button>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={globalSelectAll}
                    onChange={handleGlobalSelectAllChange}
                    name="checkedA"
                    color="primary"
                  />
                }
                label="Select All"
              />
            </Grid>
            <Grid item style={{ marginLeft: ".5rem", paddingRight: "1.5rem" }}>
              <Button
                color="primary"
                variant="outlined"
                onClick={handleDownloadBtnClick}
                disabled={disableDownload}
              >
                Download
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* <Grid
        container
        alignItems="center"
        style={{ marginTop: "1.5rem", marginBottom: ".5rem" }}
        justify="space-between"
      >
        <Grid item>
          <Typography variant="h6" color="textSecondary">
            Select Parameters
          </Typography>
        </Grid>
      </Grid> */}

      <div className={classes.root} style={{ marginTop: "1.5rem" }}>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ paddingTop: 0, paddingBottom: 0 }}
          >
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Typography style={{ color: "#000" }}>Common</Typography>
              </Grid>
              <Grid item style={{ marginRight: "2rem" }}>
                <FormControlLabel
                  className={classes.formControlLabelStyle}
                  onClick={(event) => event.stopPropagation()}
                  control={
                    <Checkbox
                      checked={commonSelectAll}
                      onChange={handleCommonSelectAllChange}
                      size="small"
                      name="checkedA"
                      color="primary"
                    />
                  }
                  label={<span style={{ fontSize: ".9rem" }}>Select All</span>}
                />
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup row>
              {commonParams.map((element, index) => (
                <FormControlLabel
                  key={element.label}
                  control={
                    <Checkbox
                      checked={element.checked}
                      onChange={(event) =>
                        handleCommonParamChange(element.label)
                      }
                      size="small"
                      name={element.label.replace(/\s/g, "")}
                      color="default"
                    />
                  }
                  label={element.label}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            // style={{ backgroundColor: "#9e9e9e", color: "#fff" }}
          >
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography style={{ color: "#000" }}>Inverters</Typography>
              </Grid>
              <Grid item style={{ marginRight: "1rem" }}>
                <FormControlLabel
                  onClick={(event) => event.stopPropagation()}
                  control={
                    <Checkbox
                      checked={invertersSelectAll}
                      onChange={handleInvertersSelectAllChange}
                      size="small"
                      name="checkedA"
                      color="primary"
                    />
                  }
                  label={<span style={{ fontSize: ".9rem" }}>Select All</span>}
                />
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup row>
              {invertersParams.map((element, index) => (
                <FormControlLabel
                  key={element.label}
                  control={
                    <Checkbox
                      checked={element.checked}
                      onChange={(event) =>
                        handleInvertersParamChange(element.label)
                      }
                      size="small"
                      name={element.label.replace(/\s/g, "")}
                      color="default"
                    />
                  }
                  label={element.label}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            // style={{ backgroundColor: "#9e9e9e", color: "#fff" }}
          >
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Typography style={{ color: "#000" }}>
                  Inverter Slots
                </Typography>
              </Grid>
              <Grid item style={{ marginRight: "1rem" }}>
                <FormControlLabel
                  onClick={(event) => event.stopPropagation()}
                  control={
                    <Checkbox
                      checked={inverterSlotsSelectAll}
                      onChange={handleInverterSlotsSelectAllChange}
                      size="small"
                      name="checkedA"
                      color="primary"
                    />
                  }
                  label={<span style={{ fontSize: ".9rem" }}>Select All</span>}
                />
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup row>
              {inverterSlotsParams.map((element, index) => (
                <FormControlLabel
                  key={element.label}
                  control={
                    <Checkbox
                      checked={element.checked}
                      onChange={(event) =>
                        handleInverterSlotsParamChange(element.label)
                      }
                      size="small"
                      name={element.label.replace(/\s/g, "")}
                      color="default"
                    />
                  }
                  label={element.label}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            // style={{ backgroundColor: "#9e9e9e", color: "#fff" }}
          >
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Typography style={{ color: "#000" }}>
                  Inverter Strings
                </Typography>
              </Grid>
              <Grid item style={{ marginRight: "1rem" }}>
                <FormControlLabel
                  onClick={(event) => event.stopPropagation()}
                  control={
                    <Checkbox
                      checked={inverterStringsSelectAll}
                      onChange={handleInverterStringsSelectAllChange}
                      size="small"
                      name="checkedA"
                      color="primary"
                    />
                  }
                  label={<span style={{ fontSize: ".9rem" }}>Select All</span>}
                />
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup row>
              {inverterStringsParams.map((element, index) => (
                <FormControlLabel
                  key={element.label}
                  control={
                    <Checkbox
                      checked={element.checked}
                      onChange={(event) =>
                        handleInverterStringsParamChange(element.label)
                      }
                      size="small"
                      name={element.label.replace(/\s/g, "")}
                      color="default"
                    />
                  }
                  label={element.label}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </div>
      <Snackbar
        open={openSnackbar}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={alertMessage.severity}>
          {alertMessage.message}
        </Alert>
      </Snackbar>
      <div style={{ marginBottom: "2rem" }}></div>
    </div>
  );
}
