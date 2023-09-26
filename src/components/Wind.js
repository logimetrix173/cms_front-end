import React from "react";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import Compass from "./Compass";

export default function Wind({ windDirection, windSpeed, rain }) {
  return (
    <Card
      elevation={6}
      style={{
        padding: ".5rem 1rem",
        height: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Typography align="center" variant="h6">
        Wind <span style={{ color: "#4caf50" }}>Direction</span>
        {" & "}
        <span style={{ color: "#2196f3" }}>Speed</span>
      </Typography>
      <div style={{ textAlign: "center", padding: ".5rem" }}>
        <Compass
          size={Number.isNaN(rain) === true ? 170 : 150}
          rotate={windDirection}
        />
      </div>
      <div>
        <Typography align="center" variant="h6">
          <span
            style={{
              color: "#4caf50",
            }}
          >
            {Number(windDirection) === -111 ? (
              "x"
            ) : (
              <span>{windDirection} °</span>
            )}
          </span>
          <span
            style={{
              marginLeft: "1rem",
              color: "#2196f3",
            }}
          >
            {Number(windSpeed) === -111 ? "x" : <span>{windSpeed} m/s</span>}
          </span>
        </Typography>
        {!Number.isNaN(rain) && (
          <Typography
            // variant="h6"
            color="textSecondary"
            align="center"
            style={{ marginTop: ".25rem", marginBottom: ".25rem" }}
          >
            Rain: {Number(rain) === -111 ? "x" : <span>{rain} mm</span>}
          </Typography>
        )}
      </div>
    </Card>
  );
}
