import { Card, Grid } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import { SERVER_URL } from "../../constants/constants";

// const calculateSum = (array) => {
//     let capacity = 0;
//     let powerGeneration = 0;

//     array.forEach(element => {
//         capacity += Math.round(Number(element.capacity));
//         powerGeneration += Math.round(Number(element.powerGeneration));
//     })

//     return {capacity: capacity, powerGeneration: powerGeneration};
// }

const getStartTime = () => {
  let date = new Date();
  date.setHours(0, 1, 0, 0);
  return date.getTime();
};

const getPeakTime = (timestamp) => {
  let date = new Date(timestamp);
  return date.toLocaleTimeString();
};

const getMaxNow = (max, generation) => {
  let maxNum = Number(max);
  let generationNum = Number(generation);
  let result = maxNum - generationNum;

  if (generationNum > maxNum) {
    return 0;
  } else {
    return result;
  }
};

const getMaxLabel = (max, generation) => {
  let maxNum = Number(max);
  let generationNum = Number(generation);

  if (generationNum > maxNum) {
    return generationNum;
  } else {
    return maxNum;
  }
};

function Comparison({ data, handleSessionExpire }) {
  const [comparisonData, setComparisonData] = useState({
    capacity: 1714,
    powerGeneration: 0,
    max: 0,
    maxTime: Date.now(),
  });

  const fetchData = () => {
    axios
      .post(
        SERVER_URL + "/dashboard/sites/peakgeneration",
        {
          startTime: getStartTime(),
          endTime: Date.now(),
          email: localStorage.getItem("userEmail"),
          // sites: [localStorage.getItem("siteNames")],
        },
        {
          headers: {
            jwtToken: localStorage.getItem("userToken"),
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
        let value = response.data;

        setComparisonData({
          capacity: Math.round(value.totalCapacity),
          powerGeneration: Math.round(value.currentCapacity),
          max: Math.round(value.peakReached),
          maxTime: value.peakReachedTime,
        });
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          // console.log(error.response, "401");
          handleSessionExpire();

          // setLogoutMsg(true);
        }
        // empty
      });
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  return (
    // <div style={{width: '90vw', marginBlock: '1rem'}}>
    //     <ProgressBar animated label={comparisonData.powerGeneration} now={comparisonData.powerGeneration} max={comparisonData.capacity} />&nbsp;{comparisonData.capacity}
    // </div>
    <Grid container style={{ marginTop: "0rem" }} alignItems="center">
      <Grid item xs style={{ marginRight: "1rem" }}>
        {/* <ProgressBar variant='success' animated label={`${comparisonData.powerGeneration} MW`} now={comparisonData.powerGeneration} max={comparisonData.capacity} /> */}
        <ProgressBar>
          <ProgressBar
            animated
            label={`${comparisonData.powerGeneration} MW`}
            max={comparisonData.capacity}
            variant="success"
            now={comparisonData.powerGeneration}
            key={1}
          />
          <ProgressBar
            animated
            data-toggle="tooltip"
            data-placement="bottom"
            title={`Max Time: ${getPeakTime(comparisonData.maxTime * 1000)}`}
            //   label={`${comparisonData.max} MW`}
            max={comparisonData.capacity}
            variant="info"
            now={getMaxNow(comparisonData.max, comparisonData.powerGeneration)}
            key={2}
          />
          {
            <span style={{ color: "#000" }}>
              &ensp;
              {`Max: ${getMaxLabel(
                comparisonData.max,
                comparisonData.powerGeneration
              )} MW`}
            </span>
          }
        </ProgressBar>
      </Grid>
      <Grid item>
        Capacity:{" "}
        <span style={{ color: "#008f56" }}>
          {comparisonData.capacity} <small>MW</small>
        </span>
      </Grid>
    </Grid>
  );
}

export default Comparison;
