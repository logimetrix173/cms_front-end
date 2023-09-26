import React, { useState, useEffect } from "react";
import "./TableSensor.css";
import axios from "axios";
import { Grid } from "@material-ui/core";

const getCustomDate = (timestampStr) => {
  const date = new Date(Number(timestampStr));
  // const string =
  //   date.getDate() +
  //   "/" +
  //   date.getMonth() +
  //   1 +
  //   ", " +
  //   date.getHours() +
  //   ":" +
  //   date.getMinutes();
  const string = date.getDate() + "/" + date.getMonth() + 1;
  return string;
};

export default function Ideal({ data, serverUrl, handleImageClick }) {
  return (
    <Grid container justifyContent="center">
      {data.map((datum, index) => (
        <Grid item style={{ marginLeft: index === 1 ? ".25rem" : 0 }}>
          <div>
            <small style={{ fontSize: ".8rem" }}>
              {" "}
              Parameter: {datum.parameters}
            </small>
            <br />
            <small style={{ fontSize: ".8rem" }}>
              LDR 1: {datum.ldr1}&ensp;LDR 2: {datum.ldr2}
            </small>
            <br />
            <small style={{ fontSize: ".8rem" }}>
              LDR 3: {datum.ldr3}&ensp;LDR 4: {datum.ldr4}
            </small>

            <div className="image-container">
              <div className="bottom-centered">
                <small style={{ fontSize: ".8rem" }}>{datum.title}</small>
                <small style={{ fontSize: ".8rem", marginLeft: ".5rem" }}>
                  {getCustomDate(datum.timestamp)}
                </small>
              </div>
              <img
                src={serverUrl + datum.filename}
                alt={datum.title}
                width={190}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleImageClick(
                    serverUrl + datum.filename,
                    datum.title + " " + getCustomDate(datum.timestamp)
                  );
                }}
              />
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  );
}
