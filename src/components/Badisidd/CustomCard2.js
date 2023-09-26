import { Card, Grid, Typography } from "@material-ui/core";
import React from "react";

export default function CustomCard2({
  firstTitle,
  secondTitle,
  firstValue,
  secondValue,
  imagePath,
  imageHeight,
}) {
  return (
    <Card elevation={4} style={{ height: "80px" }}>
      <Grid
        container
        alignItems="center"
        style={{
          padding: "1rem 2rem 1rem 1rem",
        }}
      >
        <img
          src={imagePath}
          alt={imagePath}
          style={{ height: imageHeight, marginRight: "1rem" }}
        />
        <Grid item>
          <Grid container>
            <Grid item xs={5}>
              <Typography>{firstTitle}</Typography>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={5} style={{ paddingLeft: ".25rem" }}>
              <Typography>{secondTitle}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={5}>
              <Typography color="primary">{firstValue}</Typography>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={5} style={{ paddingLeft: ".25rem" }}>
              <Typography color="primary">{secondValue}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
