// import "./styles.css";
import { Grid, Paper } from "@material-ui/core";
import autoprefixer from "autoprefixer";
import React from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// export default function TrendlineBiaxialLineChart({ data }) {
//   console.log("Bixel data ", data);
//   return (
//     <ResponsiveContainer width="100%" height="100%">
//       <LineChart
//         width={500}
//         height={450}
//         // data={data}
//         // margin={{
//         //   top: 20,
//         //   right: 30,
//         //   left: 20,
//         //   bottom: 5,
//         // }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         {/* <XAxis
//           dataKey="timestamp"
//           type="timestamp"
//           allowDuplicatedCategory={false}
//         /> */}
//         {/* <YAxis yAxisId="left" /> */}

//         {/* {data.map((v) => (
//           <YAxis dataKey={Object.keys(v)} />
//         ))} */}
//         <XAxis
//           dataKey="category"
//           type="category"
//           allowDuplicatedCategory={false}
//         />
//         <YAxis dataKey="value" />
//         {/* <YAxis dataKey="values" /> */}
//         {/* <YAxis yAxisId="right" orientation="right" /> */}
//         <Tooltip />
//         <Legend />
//         {/* <Line
//         yAxisId="left"
//         type="monotone"
//         dataKey="Wind Dir Instant"
//         stroke="#8884d8"
//         activeDot={{ r: 8 }}
//       /> */}
//         {data.map((s) => (
//           <Line dataKey="value" data={s.data} name={s.name} key={s.name} />
//         ))}
//       </LineChart>
//     </ResponsiveContainer>
//   );
// }

export default function TrendlineBiaxialLineChart({
  data,
  alignY = { leftY: 1, rightY: 1 },
}) {
  // console.log("Bixel Data", data);

  const getLinesForOpacity = () => {
    const objArray = Object.entries(data);
    let obj = {};
    objArray.forEach((element) => {
      obj = { ...obj, [element[0]]: 1 };
    });
    return obj;
  };

  const CustomizedDot = (props) => {
    const { cx, cy, stroke, payload, value, customIndex } = props;

    // console.log(payload);
    // console.log("customIndex", customIndex);

    switch (customIndex) {
      case 1:
        return (
          <rect
            x={cx - 2.5}
            y={cy - 2.5}
            width="5"
            height="5"
            stroke={stroke}
            fill="#fff"
          />
        );
      case 2:
        return (
          <polygon
            points={String(
              `${cx},${cy - 2.5} ${cx + 2.5},${cy + 2.5} ${cx - 2.5},${
                cy + 2.5
              }`
            )}
            stroke={stroke}
            fill="#fff"
          />
        );
      default:
        return <circle cx={cx} cy={cy} r="3" stroke={stroke} fill="#fff" />;
    }
  };

  const [opacity, setOpacity] = useState(getLinesForOpacity());

  const selectLine = (dataKey) => {
    setOpacity((prevState) => {
      return { ...prevState, [dataKey]: prevState[dataKey] === 0 ? 1 : 0 };
    });
  };

  const renderLegend = ({ payload }) => {
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        {payload.map(({ dataKey, color }) => {
          return (
            <strong
              key={dataKey}
              style={{
                fontSize: "0.8rem",
                color: color,
                cursor: "pointer",
                opacity: opacity[dataKey] === 0 ? 0.5 : 1,
              }}
              onClick={() => selectLine(dataKey)}
            >
              {String(dataKey).toUpperCase()}
            </strong>
          );
        })}
      </div>
    );
  };

  const renderTooltip = ({ payload }) => {
    // let pay = [
    //   {
    //     chartType: undefined,
    //     color: "#2196f3",
    //     dataKey: "Humidity_Instant_y1",
    //     fill: "#fff",
    //     formatter: undefined,
    //     name: "Humidity_Instant_y1",
    //     payload: {
    //       Humidity_Instant_y1: 74,
    //       Humidity_Instant_y2: 74,
    //       timestamp: "24/10 21:7",
    //     },
    //     points: [],
    //     stroke: "#2196f3",
    //     strokeOpacity: undefined,
    //     strokeWidth: 2,
    //     type: undefined,
    //     unit: undefined,
    //     value: 74,
    //   },
    // ];
    // pay.push(payload[0]);
    // console.log("157", pay);
    return (
      <Paper
        style={{
          backgroundColor: "white",
          maxHeight: "20rem",
          maxWidth: "1000rem",
          minWidth: "10rem",
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          fontSize: "0.6rem",
        }}
      >
        <div>{payload[0]?.payload?.timestamp}</div>
        {payload.map(({ dataKey, value, color }) => {
          return (
            <div
              style={{
                marginRight: "0.2rem",
                // gap: "1rem",
                color: color,
                backgroundColor: "white",
              }}
            >{`${String(dataKey).toUpperCase()}: ${value}`}</div>
          );
        })}
      </Paper>
    );
  };

  const getLineColor = (isLeftY, index) => {
    // left Y colors -blue-shadeblue-cyan-purple-reddish-
    const leftYColors = [
      "#3B71CA",
      "#DC4C64",
      "#14A44D",
      "#E4A11B",
      "#54B4D3",
      "#CC004C",
      "#6460AA",
      "#0DB14B",
      "#0089D0",
      "#81BF97",
      "#4FA9D2",
      "#DF6756",
      "#4A154B",
      "#E3B34C",
      "#CE375C",
      "#ED642B",
      "#F26C7D",
      "#3F8F8B",
      "#225675",
      "#6460AA",
      "#8FD974",
      "#83D1C4",
      "#4DAAA7",
      "#F26764",
      "#54AFBC",
      "#F9B117",
      "#5BB462",
      "#072F54",
      "#D5DF37",
      "#58B1CE",
      "#76C065",
      "#19C0FF",
      "#7894FF",
    ];
    // right Y colors -green-lightorange-tealblue-lightgreen
    const rightYColors = [
      "#4caf50",
      "#ff9800",
      "#009688",
      "#cddc39",
      "#0d86bf",
      "#a432d1",
      "#ce466f",
      "#bf010e",
      "#a52812",
      "#edca4e",
      "#FF4F2D",
      "#FF8B74",
      "#CFB08D",
      "#1C4481",
      "#60688D",
      "#5B8BA1",
      "#F28D18",
      "#1DCDFE",
      "#21D0B2",
      "#2F455C",
      "#265B94",
      "#EE9142",
      "#007D98",
      "#F5B4A7",
      "#FFCD2E",
      "#5630FF",
      "#191035",
    ];

    if (isLeftY) {
      return leftYColors[index];
    }

    return rightYColors[index];
  };

  const getLeftYItems = () => {
    let objArray = Object.entries(data[0]);
    // console.log("objArrayLeft", objArray);
    let lines = [];
    let colorIndex = 0;
    for (let i = 1; i <= alignY.leftY; i++) {
      if (objArray[i] !== undefined) {
        lines.push(
          <Line
            name={objArray[i][0]}
            yAxisId="left"
            type="monotone"
            dataKey={objArray[i][0]}
            stroke={getLineColor(true, colorIndex)}
            strokeWidth={2}
            strokeOpacity={opacity[objArray[i][0]]}
            // activeDot={{ fill: getLineColor(true, colorIndex) }}
            dot={false}
            // dot={<CustomizedDot customIndex={colorIndex} />}
          />
        );
        colorIndex += 1;
      }
    }
    return lines;
  };

  const getRightYItems = () => {
    let objArray = Object.entries(data[0]);
    // console.log("objArrayRight", objArray);
    let lines = [];
    let colorIndex = 0;
    for (let i = alignY.leftY + 1; i <= alignY.leftY + alignY.rightY; i++) {
      // for (let i = 1; i <= alignY.rightY; i++) {
      // console.log("right", alignY, i);
      if (objArray[i] !== undefined) {
        lines.push(
          <Line
            name={objArray[i][0]}
            yAxisId="right"
            type="monotone"
            dataKey={objArray[i][0]}
            stroke={getLineColor(false, colorIndex)}
            strokeWidth={1}
            strokeOpacity={opacity[objArray[i][0]]}
            // activeDot={{ fill: getLineColor(false, colorIndex) }}
            dot={false}
            // dot={<CustomizedDot customIndex={colorIndex} />}
          />
        );
        colorIndex += 1;
      }
    }
    return lines;
  };

  return (
    <ResponsiveContainer width="100%" height="98%">
      <LineChart
        data={data}
        style={{ marginTop: "0.5rem" }}
        // margin={
        //   {
        //     // left: -2,
        //     // right: -60,
        //   }
        // }

        padding={
          {
            // left: 50,
            // right: 20,
          }
        }
        margin={
          {
            // right: 150,
          }
        }
      >
        {/* <CartesianGrid /> */}
        <XAxis dataKey="timestamp" angle={-7} tick={{ fontSize: 12 }} />

        <YAxis
          yAxisId="left"
          orientation="left"
          // domain={[0, (dataMax) => Math.round(dataMax * 1.1)]}
          // domain={["auto", "auto"]}
          // allowDataOverflow={true}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          // domain={[0, (dataMax) => Math.round(dataMax * 1.1)]}
        />

        {/* <Tooltip
          wrapperStyle={{
            display: "grid",
            // gridAutoColumns: "50px",
            gridTemplateColumns: "auto",
            // backgroundColor: "blue",
            // minHeight: "300px",
            // width: "500px",
            // display: "flex",
            // flexDirection: "row",
            // flexWrap: "wrap",
            // fontSize: "10px",
          }}
        /> */}

        <Tooltip content={renderTooltip} />

        <Legend content={renderLegend} />
        {getLeftYItems().map((element) => element)}
        {getRightYItems().map((element) => element)}
      </LineChart>
    </ResponsiveContainer>
  );
}
