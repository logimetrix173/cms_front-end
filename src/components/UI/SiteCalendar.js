import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import EventIcon from "@material-ui/icons/Event";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

export default function SiteCalendar({
  setOpenDateTimePicker,
  setIsNextCount,
}) {
  return (
    <React.Fragment>
      <Grid item>
        <IconButton
          onClick={() =>
            setIsNextCount((prevState) => {
              let num = 0;
              if (prevState >= 0) {
                num = -1;
              } else {
                num = prevState - 1;
              }
              return num;
            })
          }
        >
          <ArrowLeftIcon color="action" fontSize="large" />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton
          onClick={() => {
            setIsNextCount(0);
            setOpenDateTimePicker(true);
          }}
        >
          <EventIcon color="action" fontSize="large" />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton
          onClick={() =>
            setIsNextCount((prevState) => {
              let num = 0;
              if (prevState <= 0) {
                num = 1;
              } else {
                num = prevState + 1;
              }
              return num;
            })
          }
        >
          <ArrowRightIcon color="action" fontSize="large" />
        </IconButton>
      </Grid>
    </React.Fragment>
  );
}
