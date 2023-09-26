import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import CustomCard from "../CustomCard";
import CustomCard2 from "./CustomCard2";
import CustomCard2b from "./CustomCard2b";
import GhiGtiCard from "./GhiGtiCard";

const useStyles = makeStyles((theme) => ({
  // cardGridContainerStyle: {
  //   marginTop: theme.spacing(3.5),
  // },
}));

const getValue = (value) => {
  if (value === undefined || value === null) {
    return "-";
  }

  if (value === "-111") {
    return "x";
  } else {
    return Number(value).toFixed(2);
  }
};

const getLocationValue = (value) => {
  if (value === undefined || value === null) {
    return "-";
  }

  if (value === "-111") {
    return "x";
  } else {
    return value;
  }
};

export default function CustomCards({
  day_generation = 0,
  revenue = 0,
  peak_power = 0,
  ghi,
  gti,
  ghi2,
  gti2,
  ghi3,
  gti3,
  ghi4,
  gti4,
  ghi5,
  gti5,
  plant_pr = 0,
  grid_availability = 0,
  plant_availability = 0,
  cardsValues,
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
        style={{ marginTop: "0rem" }}
        justifyContent="space-between"
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
        {/* <Grid item>
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
        </Grid> */}
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
                {Number(cardsValues.ga) === -111
                  ? "x"
                  : Number(cardsValues.ga)
                      .toFixed(1)
                      .replace(/[.,]00$/, "")}
                {Number(cardsValues.ga) !== -111 && "%"}
              </span>
            }
            secondValue={
              <span>
                {Number(cardsValues.pa) === -111
                  ? "x"
                  : Number(cardsValues.pa)
                      .toFixed(1)
                      .replace(/[.,]00$/, "")}
                {Number(cardsValues.pa) !== -111 && "%"}
              </span>
            }
          />
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        style={{ marginTop: "1.5rem" }}
      >
        <Grid item xs={12}>
          <GhiGtiCard
            imagePath="/static/images/ray.png"
            imageHeight={50}
            elements={[
              {
                ghiTitle: "GHI 1",
                ghiValue: getValue(ghi),
                ghiLocation: getLocationValue(cardsValues.ghi1location),
                gtiTitle: "GTI 1",
                gtiValue: getValue(gti),
                gtiLocation: getLocationValue(cardsValues.gti1location),
              },

              {
                ghiTitle: "GHI 2",
                ghiValue: getValue(ghi2),
                ghiLocation: getLocationValue(cardsValues.ghi2location),
                gtiTitle: "GTI 2",
                gtiValue: getValue(gti2),
                gtiLocation: getLocationValue(cardsValues.gti2location),
              },

              {
                ghiTitle: "GHI 3",
                ghiValue: getValue(ghi3),
                ghiLocation: getLocationValue(cardsValues.ghi3location),
                gtiTitle: "GTI 3",
                gtiValue: getValue(gti3),
                gtiLocation: getLocationValue(cardsValues.gti3location),
              },

              {
                ghiTitle: "GHI 4",
                ghiValue: getValue(ghi4),
                ghiLocation: getLocationValue(cardsValues.ghi4location),
                gtiTitle: "GTI 4",
                gtiValue: getValue(gti4),
                gtiLocation: getLocationValue(cardsValues.gti4location),
              },

              {
                ghiTitle: "GHI 5",
                ghiValue: getValue(ghi5),
                ghiLocation: getLocationValue(cardsValues.ghi5location),
                gtiTitle: "GTI 5",
                gtiValue: getValue(gti5),
                gtiLocation: getLocationValue(cardsValues.gti5location),
              },
            ]}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
