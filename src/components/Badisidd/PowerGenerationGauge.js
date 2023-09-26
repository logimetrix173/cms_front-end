import { Card, Grid, Typography } from "@material-ui/core";
import C3Chart from "react-c3js";
import "../../c3.css";
import React, { useState, useLayoutEffect, useEffect } from "react";

export default function PowerGenerationGauge({ totalExport, maxValue }) {
  const [totalExportNum, setTotalExportNum] = useState(0);

  useEffect(() => {
    let value =
      Number(totalExport) && Number(totalExport) !== -111
        ? Number(totalExport)
        : 0;
    if (value !== totalExport) {
      setTotalExportNum(value);
    }
  }, [totalExport]);

  return (
    <Card elevation={6} style={{ height: 255, width: 350 }}>
      <Typography
        style={{ marginLeft: "1rem", marginTop: ".5rem" }}
        variant="h6"
      >
        Power Generation
      </Typography>
      <Grid container justify="center">
        <Grid item style={{ height: "parent" }}>
          <C3Chart
            data={{
              columns: [["Current Export", totalExportNum]],
              type: "gauge",
            }}
            gauge={{
              label: {
                format: function (value) {
                  return value + " MW";
                },
                show: true,
              },
              min: 0,
              max: maxValue,
              width: 45,
            }}
            color={{
              pattern: ["#4caf50"],
            }}
            size={{
              height: 200,
            }}
          />
        </Grid>
      </Grid>
    </Card>
  );
}
