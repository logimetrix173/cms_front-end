import { Card, Grid, Typography } from "@material-ui/core";
import React from "react";

export default function GhiGtiCard({ elements, imagePath, imageHeight }) {
  return (
    <Card
      elevation={4}
      style={{
        width: "100%",
        paddingInline: "1rem",
        paddingBlock: ".7rem",
      }}
    >
      <Grid
        container
        alignItems="center"
        style={{ height: "100%", width: "100%" }}
      >
        <Grid item>
          <img
            src={imagePath}
            alt={imagePath}
            style={{ height: imageHeight }}
          />
        </Grid>
        <Grid item xs style={{ marginLeft: "1.5rem" }}>
          <Grid container justifyContent="space-between">
            {elements.map((element) => {
              const ghiTitle = element["ghiTitle"];
              const gtiTitle = element["gtiTitle"];
              const ghiValue = element["ghiValue"];
              const gtiValue = element["gtiValue"];
              const ghiLocation = element["ghiLocation"];
              const gtiLocation = element["gtiLocation"];
              return (
                <Grid item>
                  <Grid container style={{ textAlign: "center" }}>
                    <Grid item xs={6}>
                      <Typography variant="body2">{ghiTitle}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{gtiTitle}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography color="primary" variant="body2">
                        {ghiValue}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography color="primary" variant="body2">
                        {gtiValue}
                      </Typography>
                    </Grid>
                    {/* <Grid item xs={12}>
                      <Typography variant="body2" color="textSecondary">
                        {ghiLocation}
                      </Typography>
                    </Grid> */}
                    <Grid item xs={12}>
                      <Typography variant="body2" color="textSecondary">
                        {gtiLocation}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
