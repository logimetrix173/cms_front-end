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
  // console.log("Biaxial line data", data);
  const [opacity, setOpacity] = useState({
    actual: 1,
    predicted: 1,
  });

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
          justifyContent: "center",
          gap: "24px",
          marginTop: ".5rem",
        }}
      >
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
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        // width={width}
        // height={height}
        data={data}
        margin={{ top: 25, right: 40, bottom: 20, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" interval={interval} />
        <YAxis domain={leftAxisY} />
        {/* <YAxis yAxisId="right" domain={rightAxisY} orientation="right" /> */}
        <Tooltip />
        <Legend content={renderLegend} />
        <Line
          name="Predicted"
          // yAxisId="right"
          type="monotone"
          dataKey="predicted"
          stroke="#EC7063"
          strokeWidth={2}
          strokeOpacity={opacity.predicted}
          activeDot={{ r: 6 }}
          dot={false}
        />
        <Line
          name="Actual"
          // yAxisId="left"
          type="monotone"
          dataKey="actual"
          stroke="#82ca9d"
          strokeWidth={2}
          strokeOpacity={opacity.actual}
          activeDot={{ r: 6 }}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
