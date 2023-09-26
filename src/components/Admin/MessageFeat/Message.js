import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { Grid, Typography } from "@material-ui/core";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import axios from "axios";
// import { SERVER_URL } from "../../../constants/constants";
import { SMS_URL } from "../../../constants/constants";
import { SMS_URL2 } from "../../../constants/constants";

import Button from "@material-ui/core/Button";
// import { Stack } from "react-bootstrap";
import MessageTable from "./MessageTable";
import { AppState } from "../../../AppContext";
import MultiDropdownSingle from "../../UI/MultiDropdownSingle";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import CustomDropdown from "../../UI/CustomDropdown";
import { red } from "@material-ui/core/colors";

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

const inboxoutboxValue = ["Send", "Received", "Draft"];
const inputTextTypeValue = ["ACE-CMS:"];
const testModemColor = ["OK", "ERROR"];

const FONT_SIZE = 9;
const DEFAULT_INPUT_WIDTH = 95;

export default function Message() {
  const { setEnabledLinearProgress } = AppState();

  const classes = useStyles();
  const CHARACTER_LIMIT = 13;
  const [mobileNo, setMobileNo] = useState("");

  const [inputText, setInputText] = useState("");
  const [inputTextType, setInputTextType] = useState("ACE-CMS:");
  const [status, setStatus] = useState("");
  const [testModem, setTestModem] = useState("AT+CMGF=1");

  const [inboxoutbox, setInboxoutbox] = useState(inboxoutboxValue);

  const [inboxOutboxTable, setInboxOutboxTable] = useState();

  const [waitingStatus, setWaitingStatus] = useState(false);

  const siteNamesAndBlocks = JSON.parse(
    localStorage.getItem("siteNamesAndBlocks")
  );

  const getSites = (sites = siteNamesAndBlocks) => {
     //this is for onlyd demo purpose 
  return sites.filter((site) => site.name === "Hukkeri").map((site) => site.name);
};  
  //  return sites.map((site) => site.name);
 // };

  const [selectedSites, setSelectedSites] = useState(getSites());

  const [siteOptions, setSiteOptions] = useState(getSites());

  const getFromDate = (date) => {
    let newDate = new Date(date.getTime());
    newDate.setHours(0, 1, 0, 0);
    return newDate;
  };

  const getToDate = (date) => {
    let newDate = new Date(date.getTime());
    newDate.setHours(23, 59, 59, 999);
    return newDate;
  };

  const [fromDate, setFromDate] = useState(() => {
    let date = new Date();
    date.setDate(new Date().getDate() - 1);
    return getFromDate(date);
  });

  const [toDate, setToDate] = useState(() => {
    let date = new Date();
    return getToDate(date);
  });
  //   console.log(
  //     "--->",
  //     "sites",
  //     selectedSites,
  //     "timestamp",
  //     [
  //       Number((fromDate.getTime() / 1000).toFixed()),
  //       Number(toDate.getTime() / 1000).toFixed(),
  //     ],
  //     "list",
  //     inboxoutbox
  //   );
  const handleFromDateChange = (date) => {
    setFromDate(getFromDate(date));
    // fetchPerformance(date.getTime(), toDate.getTime(), selectedSite);
  };

  const handleToDateChange = (date) => {
    setToDate(getToDate(date));
    // fetchPerformance(fromDate.getTime(), date.getTime(), selectedSite);
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

  const handleInboxOutbox = (event) => {
    const value = event.target.value;

    if (value[value.length - 1] === "all") {
      setInboxoutbox(
        inboxoutbox.length === inboxoutboxValue.length ? [] : inboxoutboxValue
      );
      return;
    }

    setInboxoutbox(value);
  };

  //  const [textValue, setTextValue] = useState("");
  const [inputWidth, setInputWidth] = useState(DEFAULT_INPUT_WIDTH);

  useEffect(() => {
    if (testModem.length * FONT_SIZE > DEFAULT_INPUT_WIDTH) {
      setInputWidth((testModem.length - 2) * FONT_SIZE);
    } else {
      setInputWidth(DEFAULT_INPUT_WIDTH);
    }
  }, [testModem]);

  // console.log(mobileNo, inputText);

  const handleMoblie = (event, key) => {
    let value = event.target.value;
    setMobileNo(value);
  };
  const handleTextarea = (event, key) => {
    let value = event.target.value;
    setInputText(value);
  };

  const handleinputTextType = (event, key) => {
    let value = event.target.value;
    setInputTextType(value);
  };

  const sendMessage = () => {
    setEnabledLinearProgress(true);
    setWaitingStatus(true);
    // Todo: Make it more secure by using token.
    // console.log("hittttt", mobileNo, inputText, status);
    axios
      .post(SMS_URL + "/sentsms", {
        phone: mobileNo,
        message: inputTextType + inputText,
      })
      .then((response) => {
        // console.log("Send Message Response", response.data, status);
        setStatus(response.data.Status);
        setEnabledLinearProgress(false);
        setWaitingStatus(false);
      })
      .catch((err) => {
        // console.log(err);
        setEnabledLinearProgress(false);
        setWaitingStatus(false);
      });
  };

  // useEffect(() => {
  //   setMobileNo("");
  //   setInputText("");
  //   // setStatus("Status");
  // }, [status]);

  const getOutBoxInbox = () => {
    setEnabledLinearProgress(true);
    // Todo: Make it more secure by using token.
    // console.log("Out Box");
    axios
      .post(SMS_URL2 + "/filter", {
        sites: selectedSites,
        timestamp: [
          Number((fromDate.getTime() / 1000).toFixed()),
          Number((toDate.getTime() / 1000).toFixed()),
        ],
        // timestamp: [1672309353, 1678631874],
        list: inboxoutbox,
      })
      .then((response) => {
        // console.log("get the Outbox", response);
        setInboxOutboxTable(response.data);
        setEnabledLinearProgress(false);
      })
      .catch((err) => {
        // console.log(err);
        setEnabledLinearProgress(false);
      });
  };

  useEffect(() => {
    getOutBoxInbox();
  }, [status]);

  const handleTestmodem = () => {
    setEnabledLinearProgress(true);
    // Todo: Make it more secure by using token.
    // console.log("Test Modem");
    axios
      .post(SMS_URL + "/testmodem", { atcmd: testModem })
      .then((response) => {
        // console.log("Test Modem -->", response);
        setTestModem(response.data.Status[1]);
        setEnabledLinearProgress(false);
      })
      .catch((err) => {
        // console.log(err);
        setEnabledLinearProgress(false);
      });
  };

  // const getColor = (row) => {
  //   const num = row;

  //   // blue
  //   let color = "#1976d2";
  //   // let color = "red";

  //   // red
  //   if (num === Error) {
  //     color = "#d32f2f";
  //   }

  //   // green
  //   if (num === `Ok`) {
  //     color = "#4caf50";
  //   }

  //   return color;
  // };

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item>
          {/* <form className={classes.root} noValidate autoComplete="off"> */}
          <TextField
            className={classes.root}
            inputProps={{
              maxlength: CHARACTER_LIMIT,
              // style: { fontSize: 13 },
              classes: { root: classes.inputRoot },
            }}
            InputLabelProps={{
              classes: {
                root: classes.labelRoot,
                focused: classes.labelFocused,
              },
            }}
            // inputProps={{ style: { fontSize: 13 } }}
            autoComplete="off"
            id="standard-basic"
            value={mobileNo}
            // style={{ fontSize: 13 }}
            label="Mobile No"
            size="small"
            onChange={handleMoblie}
          />
          {/* </form> */}
        </Grid>
        <Grid
          item
          style={{
            marginTop: "-2.8px",
            marginLeft: "0.5rem",
          }}
        >
          <CustomDropdown
            // label="Site Email Field"
            items={inputTextTypeValue}
            handleChange={handleinputTextType}
            selectedItem={inputTextType}
          />
        </Grid>
        <Grid
          item
          style={{
            marginTop: "1rem",
            marginLeft: "0.5rem",
          }}
        >
          {/* <Stack
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          //   spacing={2}
        > */}
          <TextareaAutosize
            maxLength={160}
            data-limit-row-len="true"
            maxRows={4}
            // inputProps={{ style: { fontSize: 13 } }}
            style={{
              fontSize: 13,
              minHeight: "1vh",
              minWidth: "20rem",
              maxWidth: "25rem",
            }}
            value={inputText}
            aria-label="empty textarea"
            placeholder="Type your message here"
            onChange={handleTextarea}
          />
          {/* </Stack> */}
        </Grid>
        <Grid item style={{ marginTop: "1rem", marginLeft: "0.5rem" }}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            style={{ fontSize: "11px" }}
            onClick={sendMessage}
            className={classes.button}
            endIcon={<SendRoundedIcon />}
          >
            Send
          </Button>
        </Grid>
        <Grid item style={{ marginTop: "1.3rem", marginLeft: "0.5rem" }}>
          {/* <Typography>Status:{status}</Typography> */}
          <Typography>
            {waitingStatus ? (
              <Typography style={{ color: "#ffc400" }}>Waiting</Typography>
            ) : (
              status
            )}
          </Typography>
          {/* <TextField
            InputProps={{
              readOnly: true,
            }}
            size="small"
            variant="outlined"
            value={status}
            // style={{ fontSize: "11px" }}
            id="standard-read-only-input"
            // style={{ width: "6rem", minWidth: "10rem" }}
            onChange={(e) => setStatus(e.target.value)}
            inputProps={{
              style: {
                width: `${inputWidth - 15}px`,
                height: "0.2rem",
                fontSize: 13,
              },
            }}
            // inputProps={{
            //   style: {
            //     height: "0.6rem",
            //     // padding: "0 14px",
            //   },
            // }}
            // label="Read Only"
            // defaultValue="Status"
          /> */}
        </Grid>
        <Grid item style={{ marginTop: "1.25rem", marginLeft: "15rem" }}>
          <TextField
            // InputProps={{
            //   readOnly: true,
            // }}
            size="small"
            variant="outlined"
            value={testModem}
            // style={{ fontSize: "11px" }}
            id="standard-read-only-input"
            // style={{ width: "6rem", minWidth: "10rem" }}
            onChange={(e) => setTestModem(e.target.value)}
            inputProps={{
              style: {
                width: `${inputWidth - 15}px`,
                height: "0.2rem",
                fontSize: 13,
                color:
                  testModem === testModemColor[0]
                    ? "#4caf50"
                    : testModem === testModemColor[1]
                    ? "#d32f2f"
                    : "#000",
              },
            }}
            // inputProps={{
            //   style: {
            //     height: "0.6rem",
            //     // padding: "0 14px",
            //   },
            // }}
            // label="Read Only"
            // defaultValue="Status"
          />
        </Grid>
        <Grid item style={{ marginTop: "1rem", marginLeft: "0.5rem" }}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            style={{ fontSize: "11px" }}
            onClick={handleTestmodem}
            className={classes.button}
            // endIcon={<SendRoundedIcon />}
          >
            TestModem
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <MultiDropdownSingle
            label="Sites"
            handleChange={handleSitesChange}
            items={siteOptions}
            selectedItems={selectedSites}
          />
        </Grid>
        <Grid item style={{ marginLeft: "0.5rem" }}>
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
              style={{ marginRight: "0.5rem" }}
              className={classes.textField}
              InputProps={{
                style: {
                  fontSize: ".8rem",
                },
              }}
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
              className={classes.textField}
              InputProps={{
                style: {
                  fontSize: ".8rem",
                },
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item style={{ marginLeft: "0.5rem" }}>
          <MultiDropdownSingle
            label="Send/Receive"
            items={inboxoutboxValue}
            selectedItems={inboxoutbox}
            handleChange={handleInboxOutbox}
          />
        </Grid>
        <Grid item style={{ marginTop: "1rem", marginLeft: "0.5rem" }}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            style={{ fontSize: "11px" }}
            onClick={getOutBoxInbox}
            className={classes.button}
            // endIcon={<SendRoundedIcon />}
          >
            View
          </Button>
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: "0.5rem" }}>
        <MessageTable data={inboxOutboxTable} />
      </Grid>
    </>
  );
}
