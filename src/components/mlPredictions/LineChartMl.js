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

export default function BiaxialLineChart({
  data,
  interval,
  width,
  height,
  leftAxisY,
  rightAxisY,
}) {
  // console.log(
  //   "Biaxial line data",
  //   data.map((v) => {
  //     return parseInt(Object.values(v));
  //   })
  // );
  const [opacity, setOpacity] = useState({
    ActualPG: 1,
    RefPG: 1,
    PowerDifference: 1,
  });

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

  return (
    <ResponsiveContainer width="100%" height="83%">
      <LineChart
        // width={width}
        // height={height}
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Time" interval={interval} />
        <YAxis yAxisId="left" domain={leftAxisY} />
        <YAxis yAxisId="right" domain={rightAxisY} orientation="right" />
        <Tooltip />
        <Legend content={renderLegend} />
        <Line
          name="ActualPG"
          yAxisId="left"
          type="monotone"
          dataKey="ActualPG"
          stroke="#3498DB"
          strokeWidth={2}
          strokeOpacity={opacity.ActualPG}
          activeDot={{ r: 6 }}
          dot={false}
        />
        <Line
          name="RefPG"
          yAxisId="left"
          type="monotone"
          dataKey="RefPG"
          stroke="#ffc107"
          strokeWidth={2}
          strokeOpacity={opacity.RefPG}
          activeDot={{ r: 6 }}
          dot={false}
        />
        <Line
          name="PowerDifference"
          yAxisId="right"
          type="monotone"
          dataKey="PowerDifference"
          stroke="#82ca9d"
          strokeWidth={2}
          strokeOpacity={opacity.PowerDifference}
          activeDot={{ r: 6 }}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
