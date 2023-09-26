import { Card, Grid, Typography } from "@material-ui/core";
import React from "react";

export default function CustomCard2({
  firstTitle,
  secondTitle,
  firstValue,
  ghi2,
  gti2,
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
          padding: ".5rem 2rem 0rem 1rem",
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
              <Typography color="primary" variant="body2">
                {firstValue}
              </Typography>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={5} style={{ paddingLeft: ".25rem" }}>
              <Typography color="primary" variant="body2">
                {secondValue}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={5}>
              <Typography color="primary" variant="body2">
                {ghi2}
              </Typography>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={5} style={{ paddingLeft: ".25rem" }}>
              <Typography color="primary" variant="body2">
                {gti2}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
