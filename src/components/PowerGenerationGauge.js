import { Card, Grid, Typography } from "@material-ui/core";
import C3Chart from "react-c3js";
import "../c3.css";
import React, { useState, useLayoutEffect, useEffect } from "react";
import { max } from "date-fns";

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

  // const [gauge, setGauge]= useState(null);

  // const [gaugeHeight, setGaugeHeight] = useState(240);

  // useLayoutEffect(() => {
  //   console.log('gaugeHeight', gaugeHeight);
  //   setGauge(new JustGage({
  //     id: "gauge", // the id of the html element
  //     value: 0,
  //     min: 0,
  //     padding: 0,
  //     margin: 0,
  //     max: maxValue,

  //     decimals: 0,
  //     gaugeWidthScale: 0.6,
  //     levelColors: ['#4caf50'],
  //     pointer: true,
  //     pointerOptions: {
  //       color: '#0973a8'
  //     },
  //     valueFontColor: '#0973a8',
  //     textRenderer: (value) => value + ' MW',
  //     gaugeWidthScale: .8
  //   }));
  // }, []);

  // useEffect(() => {
  //   console.log('totalExport', totalExport);
  //   if (gauge && Number(totalExport) > 0) {
  //     console.log('totalExport', totalExport);
  //     gauge.refresh(Number(totalExport))
  //   }
  // }, [gauge, totalExport]);

  return (
    <Card elevation={6} style={{ height: 300, width: 400 }}>
      <Typography
        style={{ marginLeft: "1rem", marginTop: ".5rem" }}
        variant="h6"
      >
        Power Generation
      </Typography>
      <Grid container justify="center">
        <Grid item>
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
              width: 55,
            }}
            color={{
              pattern: ["#4caf50"],
            }}
            size={{
              height: 240,
            }}
            options={{
              animation: {
                duration: 0,
              },
            }}
          />
          {/* <GaugeChart percent={.3} id="gauge-chart1" nrOfLevels={1} animate={false} colors={['#4caf50']} textColor={'#0074b7'} style={{width: 450, paddingTop: 20}} /> */}
          {/* <div id="gauge" style={{marginTop: 10, backgroundColor: 'red'}}></div> */}
          {/* <Typography>Current Export</Typography> */}
        </Grid>
      </Grid>
    </Card>
  );
}
