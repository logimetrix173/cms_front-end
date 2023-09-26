import { Grid, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { SERVER_URL } from "../../../constants/constants";
import MultiDropdownSingle from "../../UI/MultiDropdownSingle";
import SingleDropdown from "../../Performance/TrendLine/SingleDropdown";
import CustomDropdown from "../../UI/CustomDropdown";
import Button from "@material-ui/core/Button";
import AlertadminTable from "./AlertadminTable";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      //   margin: theme.spacing(1),
      width: "6rem",
      fontSize: 13,
    },
    button: {
      margin: theme.spacing(1),
    },

    // inputRoot: {
    //   fontSize: 13,
    // },
    // labelRoot: {
    //   fontSize: "5px",
    //   color: "red",
    //   "&$labelFocused": {
    //     color: "purple",
    //     fontSize: "5px",
    //   },
    // },
    // labelFocused: { fontSize: "5px", color: "red" },
  },
  textField: {
    width: 120,
  },
}));

const smsService = ["Network", "Service", "Scb"];
const emailField = ["To", "CC", "BCC"];

export default function Alertadmin() {
  const classes = useStyles();

  const siteNamesAndBlocks = JSON.parse(
    localStorage.getItem("siteNamesAndBlocks")
  );

  const getSingleSites = (sites = siteNamesAndBlocks) => {
    const singleSite = sites.map((site) => site.name);
    return singleSite[0];
  };
  const getSites = (sites = siteNamesAndBlocks) => {
    return sites.map((site) => site.name);
  };

  const [selectedSites, setSelectedSites] = useState([getSingleSites()]);

  const [siteOptions, setSiteOptions] = useState(getSites());

  const [siteUniqueId, setSiteUniqueId] = useState();
  const [smsNotification, setSmsNotification] = useState(smsService);
  const [emailNotification, setEmailNotification] = useState(smsService);
  const [itMob, setItMob] = useState([]);
  const [hoMob, setHoMob] = useState([]);
  const [siteMob, setSiteMob] = useState([]);
  const [itEmail, setItEmail] = useState([]);
  const [itEmailField, setItEmailField] = useState([emailField[0]]);
  const [hoEmail, setHoEmail] = useState([]);
  const [hoEmailField, setHoEmailField] = useState(emailField[0]);
  const [siteEmail, setSiteEmail] = useState([]);
  const [siteEmailField, setSiteEmailField] = useState(emailField[0]);
  const [tableData, setTableData] = useState();

  //   console.log(smsNotification, itMob);

  const handleSitesChange = (event) => {
    const value = event.target.value;

    // if (value[value.length - 1] === "all") {
    //   setSelectedSites(
    //     selectedSites.length === siteOptions.length ? [] : siteOptions
    //   );
    //   return;
    // }

    setSelectedSites(value);
  };

  const handleSmsService = (event) => {
    const value = event.target.value;

    if (value[value.length - 1] === "all") {
      setSmsNotification(
        smsNotification.length === smsService.length ? [] : smsService
      );
      return;
    }

    setSmsNotification(value);
  };
  const handleEmailService = (event) => {
    const value = event.target.value;

    if (value[value.length - 1] === "all") {
      setEmailNotification(
        emailNotification.length === smsService.length ? [] : smsService
      );
      return;
    }

    setEmailNotification(value);
  };

  const handleitMob = (event, key) => {
    let value = event.target.value;
    setItMob(value.split(","));
    // console.log("value", value);
    // if (key === "emails" || key === "mob_no") {
    //   setSelectedSite((prevState) => ({
    //     ...prevState,
    //     [key]: String(value).split(","),
    //   }));
    // } else {
    //   setSelectedSite((prevState) => ({ ...prevState, [key]: value }));
    // }
  };

  const handlehoMob = (event, key) => {
    let value = event.target.value;
    setHoMob(value.split(","));
  };
  const handlesiteMob = (event, key) => {
    let value = event.target.value;
    setSiteMob(value.split(","));
  };
  const handleitEmail = (event, key) => {
    let value = event.target.value;
    setItEmail(value.split(","));
  };
  const handleitEmailField = (event, key) => {
    let value = event.target.value;
    setItEmailField(value);
  };
  const handlehoEmail = (event, key) => {
    let value = event.target.value;
    setHoEmail(value.split(","));
  };
  const handlehoEmailField = (event, key) => {
    let value = event.target.value;
    setHoEmailField(value);
  };
  const handlesiteEmail = (event, key) => {
    let value = event.target.value;
    setSiteEmail(value.split(","));
  };
  const handlesiteEmailField = (event, key) => {
    let value = event.target.value;
    setSiteEmailField(value);
  };

  const getAlert = () => {
    //   setEnabledLinearProgress(true);
    // Todo: Make it more secure by using token.
    console.log("Get Alert");
    axios
      .post(SERVER_URL + "/alert/inserts", {
        sites: selectedSites,
        mobileNotification: smsNotification,
        emailNotification: emailNotification,
        itMob: itMob,
        hoMob: hoMob,
        siteMob: siteMob,
        itEmail: itEmail,
        itEmailField: [itEmailField],
        hoEmail: hoEmail,
        hoEmailField: [hoEmailField],
        siteEmail: siteEmail,
        siteEmailField: [siteEmailField],
      })
      .then((response) => {
        console.log("getAlert", response);
        // setTableData(response.data);
        //   setEnabledLinearProgress(false);
      })
      .catch((err) => {
        console.log(err);
        //   setEnabledLinearProgress(false);
      });
  };
  const getUpdate = () => {
    //   setEnabledLinearProgress(true);
    // Todo: Make it more secure by using token.
    console.log("Get Update");
    axios
      .post(SERVER_URL + "/alert/update", {
        uniqueId: siteUniqueId,
        sites: selectedSites,
        mobileNotification: smsNotification,
        emailNotification: emailNotification,
        itMob: itMob,
        hoMob: hoMob,
        siteMob: siteMob,
        itEmail: itEmail,
        itEmailField: [itEmailField],
        hoEmail: hoEmail,
        hoEmailField: [hoEmailField],
        siteEmail: siteEmail,
        siteEmailField: [siteEmailField],
      })
      .then((response) => {
        console.log("getUpdate", response);
        // setTableData(response.data);
        //   setEnabledLinearProgress(false);
      })
      .catch((err) => {
        console.log(err);
        //   setEnabledLinearProgress(false);
      });
  };
  const getAlertTabledata = () => {
    //   setEnabledLinearProgress(true);
    // Todo: Make it more secure by using token.
    console.log("Get Alert Table");
    axios
      .get(SERVER_URL + "/alert")
      .then((response) => {
        console.log("getAlert", response.data);
        let sortedData = response.data.sort((a, b) =>
          a.sitename > b.sitename ? 1 : a.sitename < b.sitename ? -1 : 0
        );
        setTableData(sortedData);
        //   setEnabledLinearProgress(false);
      })
      .catch((err) => {
        console.log(err);
        //   setEnabledLinearProgress(false);
      });
  };

  useEffect(() => {
    getAlertTabledata();
  }, [selectedSites]);

  const handleEditClick = (row) => {
    console.log(row);
    setSiteUniqueId(row.unique_id);
    setSelectedSites(row.sitename);
    setSmsNotification(row.mobile_notification);
    setEmailNotification(row.email_notification);
    setItMob(row.it_mob);
    setHoMob(row.ho_om_mob);
    setSiteMob(row.site_mob);
    setItEmail(row.it_email);
    setItEmailField(row.email_field_it);
    setHoEmail(row.ho_om_email);
    setHoEmailField(row.ho_om_email_field);
    setSiteEmail(row.site_email);
    setSiteEmailField(row.site_email_field);

    // setEditedbyEmail(emaileditedby);
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={1}
      >
        <Grid item xs={2} sm={1} md>
          <CustomDropdown
            label="Sites"
            handleChange={handleSitesChange}
            items={siteOptions}
            selectedItem={selectedSites}
          />
        </Grid>
        <Grid item xs={2} sm={1} md>
          <MultiDropdownSingle
            label="SMS Notification"
            items={smsService}
            selectedItems={smsNotification}
            handleChange={handleSmsService}
          />
        </Grid>
        <Grid item xs={2} sm={1} md>
          <MultiDropdownSingle
            label="Email Notification"
            items={smsService}
            selectedItems={emailNotification}
            handleChange={handleEmailService}
          />
        </Grid>
        <Grid item xs={2} sm={1} md>
          <TextField
            className={classes.root}
            inputProps={{
              // style: { fontSize: 13 },
              classes: { root: classes.inputRoot },
            }}
            InputLabelProps={{
              classes: {
                root: classes.labelRoot,
                focused: classes.labelFocused,
              },
            }}
            label="IT Mob"
            // inputProps={{ style: { fontSize: 13 } }}
            // style={{
            //   maxWidth: "6rem",
            //   // marginRight: "0rem",
            // }}
            id="it mob"
            value={itMob}
            onChange={handleitMob}
          />
        </Grid>
        <Grid item xs={2} sm={1} md>
          <TextField
            className={classes.root}
            inputProps={{
              // style: { fontSize: 13 },
              classes: { root: classes.inputRoot },
            }}
            InputLabelProps={{
              classes: {
                root: classes.labelRoot,
                focused: classes.labelFocused,
              },
            }}
            label="HO O&M Mob"
            id="ho mob"
            value={hoMob}
            onChange={handlehoMob}
          />
        </Grid>
        <Grid item xs={2} sm={1} md>
          <TextField
            className={classes.root}
            inputProps={{
              // style: { fontSize: 13 },
              classes: { root: classes.inputRoot },
            }}
            InputLabelProps={{
              classes: {
                root: classes.labelRoot,
                focused: classes.labelFocused,
              },
            }}
            label="Site Mob"
            id="site mob"
            value={siteMob}
            onChange={handlesiteMob}
          />
        </Grid>
        <Grid item xs={2} sm={1} md>
          <TextField
            className={classes.root}
            inputProps={{
              // style: { fontSize: 13 },
              classes: { root: classes.inputRoot },
            }}
            InputLabelProps={{
              classes: {
                root: classes.labelRoot,
                focused: classes.labelFocused,
              },
            }}
            label="IT Email"
            id="it email"
            value={itEmail}
            onChange={handleitEmail}
          />
        </Grid>
        <Grid item xs={2} sm={1} md>
          <CustomDropdown
            label="IT Email Field"
            items={emailField}
            handleChange={handleitEmailField}
            selectedItem={itEmailField}
          />
        </Grid>
        <Grid item xs sm md>
          <TextField
            className={classes.root}
            inputProps={{
              // style: { fontSize: 13 },
              classes: { root: classes.inputRoot },
            }}
            InputLabelProps={{
              classes: {
                root: classes.labelRoot,
                focused: classes.labelFocused,
              },
            }}
            label="HO O&M Email"
            id="ho email"
            value={hoEmail}
            onChange={handlehoEmail}
          />
        </Grid>
        <Grid item xs sm md>
          <CustomDropdown
            label="HO O&M Email Field"
            items={emailField}
            handleChange={handlehoEmailField}
            selectedItem={hoEmailField}
          />
        </Grid>
        <Grid item>
          <TextField
            className={classes.root}
            inputProps={{
              // style: { fontSize: 13 },
              classes: { root: classes.inputRoot },
            }}
            InputLabelProps={{
              classes: {
                root: classes.labelRoot,
                focused: classes.labelFocused,
              },
            }}
            label="Site Email"
            id="site email"
            value={siteEmail}
            onChange={handlesiteEmail}
          />
        </Grid>
        <Grid item>
          <CustomDropdown
            label="Site Email Field"
            items={emailField}
            handleChange={handlesiteEmailField}
            selectedItem={siteEmailField}
          />
        </Grid>
        <Grid item style={{ marginTop: "1rem" }}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            style={{ fontSize: "11px" }}
            onClick={getAlert}
            className={classes.button}
            // endIcon={<SendRoundedIcon />}
          >
            Create
          </Button>
        </Grid>
        <Grid item style={{ marginTop: "1rem" }}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            style={{ fontSize: "11px" }}
            onClick={getUpdate}
            className={classes.button}
            // endIcon={<SendRoundedIcon />}
          >
            Update
          </Button>
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: ".5rem", paddingRight: "1rem" }}>
        <AlertadminTable data={tableData} updateSite={handleEditClick} />
      </Grid>
    </>
  );
}
