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

export default function CustomizedLineChart({
  data,
  lines,
  interval,
  width,
  height,
  leftAxisY,
  rightAxisY,
}) {
  const [opacity, setOpacity] = useState({
    i1: 1,
    i2: 1,
    i3: 1,
    i4: 1,
    i5: 1,
    i6: 1,
    i7: 1,
    i8: 1,
    i9: 1,
    i10: 1,
    i11: 1,
    i12: 1,
    temperature: 1,
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
              {String(dataKey).toLowerCase() === "temperature"
                ? "TEMP"
                : String(dataKey).toUpperCase()}
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
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" interval={interval} />
        <YAxis
          yAxisId="left"
          domain={leftAxisY}
          allowDataOverflow={true}
          // unit={" I"}
          label={{ value: "I", position: "insideLeft", offset: 20 }}
        />
        <YAxis
          yAxisId="right"
          domain={rightAxisY}
          orientation="right"
          allowDataOverflow={true}
          // unit={"°C"}
          label={{ value: "°C", position: "insideRight", offset: 20 }}
        />
        <Tooltip />
        <Legend content={renderLegend} />
        {Array.from({ length: lines }, (_, i) => i + 1).map((element) => (
          <Line
            name={"I" + element}
            yAxisId="left"
            type="monotone"
            dataKey={"i" + element}
            stroke="#82ca9d"
            strokeWidth={2}
            strokeOpacity={opacity["i" + element]}
            activeDot={{ r: 6 }}
            dot={false}
          />
        ))}
        <Line
          name="Temperature"
          yAxisId="right"
          type="monotone"
          dataKey="temperature"
          stroke="#EC7063"
          strokeWidth={2}
          strokeOpacity={opacity.temperature}
          activeDot={{ r: 6 }}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
