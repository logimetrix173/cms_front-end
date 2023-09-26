import React, { useState } from "react";
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

export default function LossChart({ data, alignY = { leftY: 1, rightY: 1 } }) {
  console.log("Biaxial line data", data);

  const getLinesForOpacity = () => {
    const objArray = Object.entries(data[0]);
    let obj = {};
    objArray.forEach((element) => {
      obj = { ...obj, [element[0]]: 1 };
    });
    return obj;
  };

  const CustomizedDot = (props) => {
    const { cx, cy, stroke, payload, value, customIndex } = props;

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
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        {payload.map(({ dataKey, color }) => {
          return (
            <strong
              key={dataKey}
              style={{
                fontSize: "1rem",
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

  const getLineColor = (isLeftY, index) => {
    // left Y colors
    const leftYColors = ["#2196f3", "#3f51b5", "#00bcd4", "#673ab7"];
    // right Y colors
    const rightYColors = ["#4caf50", "#ff9800", "#009688", "#cddc39"];

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
          // dot={false}
          dot={<CustomizedDot customIndex={colorIndex} />}
        />
      );
      colorIndex += 1;
    }
    return lines;
  };

  const getRightYItems = () => {
    let objArray = Object.entries(data[0]);
    // console.log("objArrayRight", objArray);
    let lines = [];
    let colorIndex = 0;
    for (let i = alignY.leftY + 1; i <= alignY.leftY + alignY.rightY; i++) {
      // console.log("right", alignY, i);
      if (objArray[i] !== undefined) {
        lines.push(
          <Line
            name={objArray[i][0]}
            yAxisId="right"
            type="monotone"
            dataKey={objArray[i][0]}
            stroke={getLineColor(false, colorIndex)}
            strokeWidth={2}
            strokeOpacity={opacity[objArray[i][0]]}
            // activeDot={{ fill: getLineColor(false, colorIndex) }}
            // dot={false}
            dot={<CustomizedDot customIndex={colorIndex} />}
          />
        );
        colorIndex += 1;
      }
    }
    return lines;
  };

  return (
    <ResponsiveContainer width="100%" height="90%">
      <LineChart
        data={data}
        margin={{
          left: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis
          yAxisId="left"
          domain={[0, (dataMax) => Math.round(dataMax * 1.1)]}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          domain={[0, (dataMax) => Math.round(dataMax * 1.1)]}
        />
        <Tooltip />
        <Legend content={renderLegend} />
        {getLeftYItems().map((element) => element)}
        {getRightYItems().map((element) => element)}
      </LineChart>
    </ResponsiveContainer>
  );
}
