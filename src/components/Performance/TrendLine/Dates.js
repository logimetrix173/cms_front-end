import "date-fns";
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function MaterialUIPickers({
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}) {
  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {/* <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        id="date-picker-inline"
        label="Start Date"
        value={fromDate}
        onChange={handleFromDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
        InputProps={{
          style: {
            fontSize: ".8rem",
          },
        }}
        style={{ width: 140, padding: 0, margin: 0 }}
      /> */}
      <KeyboardDatePicker
        margin="normal"
        id="date-picker-dialog"
        label="Start Date"
        format="MM/dd/yyyy"
        value={fromDate}
        onChange={handleFromDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
        InputProps={{
          style: {
            fontSize: ".8rem",
          },
        }}
        style={{ width: 120, marginBlock: 0, marginLeft: "1rem", padding: 0 }}
      />
      <KeyboardDatePicker
        margin="normal"
        id="date-picker-dialog"
        label="End Date"
        format="MM/dd/yyyy"
        value={toDate}
        onChange={handleToDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
        InputProps={{
          style: {
            fontSize: ".8rem",
          },
        }}
        style={{ width: 120, marginBlock: 0, marginLeft: "1rem", padding: 0 }}
      />
    </MuiPickersUtilsProvider>
  );
}
