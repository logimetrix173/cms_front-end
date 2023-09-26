import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import NoteAddRoundedIcon from "@material-ui/icons/NoteAddRounded";
import DateFnsUtils from "@date-io/date-fns";

import CircularProgress from "@material-ui/core/CircularProgress";
import UpdateIcon from "@material-ui/icons/Update";
import SiteCalendar from "./SiteCalendar";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

export default function SitestatusBar({
  sitestatusBar,
  status,
  timestamp,
  handleClickOpen,
  handleTimeReset,
  setIsNextCount,
  setOpenDateTimePicker,
  getMinDateForPicker,
  selectedDate,
  getFormattedDateAndTimeString,
  openDateTimePicker,
  handleDateChange,
}) {
  //   console.log(sitestatusBar, "---30");
  return (
    <>
      <Grid item>
        <Grid container alignItems="center">
          <Grid item>
            {/* <span style={{ fontSize: "1.25rem" }}>badisidd</span> */}
            <Typography variant="h6">{sitestatusBar.name}</Typography>
          </Grid>
          <Grid item style={{ margin: "0 1rem" }}></Grid>
          <Grid item>
            {/* <span style={{ fontSize: "1.25rem" }}>40 MW</span> */}
            <Typography variant="h6">{sitestatusBar.capacity} MW</Typography>
          </Grid>
          <Grid item>
            <IconButton
              // size="large"
              color="primary"
              onClick={() => handleClickOpen()}
              style={{ paddingInline: ".5rem" }}
            >
              <NoteAddRoundedIcon fontSize="5rem" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>

      <Grid item style={{ paddingRight: "5rem" }}>
        <Grid container>
          <Grid item>
            {status === 0 ? (
              // <span style={{ fontSize: "1.25rem", color: "#f44336" }}>
              //   Offline
              // </span>
              <Typography variant="h6" style={{ color: "#f44336" }}>
                Offline
              </Typography>
            ) : (
              // <span style={{ fontSize: "1.25rem", color: "#4caf50" }}>
              //   Online
              // </span>
              <Typography variant="h6" style={{ color: "#4caf50" }}>
                Online
              </Typography>
            )}
          </Grid>
          <Grid item style={{ margin: "0 1rem" }}></Grid>
          <Grid item>
            {timestamp === undefined ? (
              <CircularProgress
                size={30}
                // style={{ marginRight: '.5rem' }}
              />
            ) : (
              <Typography variant="h6">
                {getFormattedDateAndTimeString(timestamp)}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container>
          <Grid item>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
                style={{ width: 1, visibility: "hidden" }}
                value={selectedDate}
                open={openDateTimePicker}
                onClose={() => setOpenDateTimePicker(false)}
                onChange={handleDateChange}
                format="dd/MM/yyyy hh:mm a"
                minDate={getMinDateForPicker()}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <SiteCalendar
            setOpenDateTimePicker={setOpenDateTimePicker}
            setIsNextCount={setIsNextCount}
          />
          <Grid item>
            <IconButton
              // variant="outlined"
              // color="primary"
              onClick={handleTimeReset}
            >
              <UpdateIcon color="primary" fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
