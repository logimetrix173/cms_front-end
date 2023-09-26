import "date-fns";
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function CustomSingleDate({ date, setDate }) {
  const handleDateChange = (date) => {
    setDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        id="date-picker-inline"
        label="Date"
        value={date}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
        InputProps={{
          style: {
            fontSize: ".8rem",
          },
        }}
        style={{ width: 140, padding: 0, margin: 0 }}
      />
    </MuiPickersUtilsProvider>
  );
}
