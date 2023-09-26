import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import CustomCard from "../CustomCard";
import CustomCard2 from "./CustomCard2";
import CustomCard2b from "./CustomCard2b";

const useStyles = makeStyles((theme) => ({
  // cardGridContainerStyle: {
  //   marginTop: theme.spacing(3.5),
  // },
}));

export default function CustomCards({
  day_generation = 0,
  revenue = 0,
  peak_power = 0,
  ghi = 0,
  gti = 0,
  ghi2 = 0,
  gti2 = 0,
  plant_pr = 0,
  grid_availability = 0,
  plant_availability = 0,
}) {
  const classes = useStyles();

  const getFormattedRevenue = (revenue) => {
    if (isNaN(revenue)) {
      return "x";
    }
    const revenueNum = Number(revenue).toFixed(0);
    if (revenueNum < 0) {
      return "0";
    }
    const revenueStr = revenueNum;
    let lastThree = revenueStr.substring(revenueStr.length - 3);
    let otherNumbers = revenueStr.substring(0, revenueStr.length - 3);
    if (otherNumbers !== "") {
      lastThree = "," + lastThree;
    }
    let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  };

  return (
    <React.Fragment>
      <Grid
        container
        // style={{ marginTop: "1.75rem" }}
        justify="space-between"
        // className={customCardsStyle.materialGrid}
        // spacing={3}
      >
        <Grid item>
          <CustomCard
            imagePath="/static/images/powerGeneration.png"
            imageHeight={48}
            title="Generation"
            value={
              Number(day_generation) === -111 ? (
                "x"
              ) : (
                <span>
                  {Number(day_generation).toFixed(2)}&nbsp;<small>MWH</small>
                </span>
              )
            }
          />
        </Grid>
        <Grid item>
          <CustomCard
            imagePath="/static/images/revenue.png"
            imageHeight={42}
            title="Revenue"
            value={<span>{getFormattedRevenue(revenue)}</span>}
          />
        </Grid>
        <Grid item>
          <CustomCard
            imagePath="/static/images/peakPower.png"
            imageHeight={45}
            title="Peak Power"
            value={
              Number(peak_power) === -111 || isNaN(Number(peak_power)) ? (
                "x"
              ) : (
                <span>
                  {Number(peak_power).toFixed(2)}&nbsp;<small>MW</small>
                </span>
              )
            }
          />
        </Grid>
        <Grid item>
          <CustomCard2b
            imagePath="/static/images/ray.png"
            imageHeight={50}
            firstTitle="GHI"
            secondTitle="GTI"
            firstValue={Number(ghi) === -111 ? "x" : Number(ghi).toFixed(2)}
            secondValue={Number(gti) === -111 ? "x" : Number(gti).toFixed(2)}
            ghi2={Number(ghi2) === -111 ? "x" : Number(ghi2).toFixed(2)}
            gti2={Number(gti2) === -111 ? "x" : Number(gti2).toFixed(2)}
          />
        </Grid>
        {/* <Grid item>
          <CustomCard
            imagePath="/static/images/peakPower.png"
            imageHeight={54}
            title="Two"
            value={
              <span>
                {Number(peak_power).toFixed(2)}&nbsp;<small>MW</small>
              </span>
            }
          />
        </Grid>
        <Grid item>
          <CustomCard
            imagePath="/static/images/peakPower.png"
            imageHeight={54}
            title="Three"
            value={
              <span>
                {Number(peak_power).toFixed(2)}&nbsp;<small>MW</small>
              </span>
            }
          />
        </Grid> */}
        <Grid item>
          <CustomCard
            imagePath="/static/images/plantPR.png"
            imageHeight={45}
            title="Plant PR"
            value={
              Number(plant_pr) === -111 ? (
                "x"
              ) : (
                <span>{Number(plant_pr).toFixed(0)}%</span>
              )
            }
          />
        </Grid>
        <Grid item>
          <CustomCard2
            imagePath="/static/images/gridAvailability.png"
            imageHeight={50}
            firstTitle="GA"
            secondTitle="PA"
            firstValue={
              <span>
                {Number(grid_availability) === -111
                  ? "x"
                  : Number(grid_availability)
                      .toFixed(1)
                      .replace(/[.,]00$/, "")}
                {Number(grid_availability) !== -111 && "%"}
              </span>
            }
            secondValue={
              <span>
                {Number(plant_availability) === -111
                  ? "x"
                  : Number(plant_availability)
                      .toFixed(1)
                      .replace(/[.,]00$/, "")}
                {Number(plant_availability) !== -111 && "%"}
              </span>
            }
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
