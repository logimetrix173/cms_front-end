import { Card, Typography } from "@material-ui/core";
import React from "react";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const labelStr = String(label);
    return (
      <div style={{ color: "#009688" }}>
        {labelStr.split(" ")[0]}: {payload[0].value}
        {label === "Humidity" ? "%" : "°C"}
      </div>
    );
  }

  return null;
};

const CustomizedLabel = ({ x, y, fill, value, index }) => {
  return (
    <text
      x={x}
      y={y}
      dx="10"
      dy="-10"
      fontFamily="sans-serif"
      fill={fill}
      textAnchor="middle"
    >
      {value}
      {index === 2 ? "%" : "°C"}
    </text>
  );
};

export default function AmbientModuleTemp({
  ambientTemp,
  moduleTemp,
  humidity,
}) {
  const data = [
    {
      name: "Ambient",
      // value: Number(ambientTemp) === -111 ? "x" : ambientTemp,
      value: Number(ambientTemp) && Number(ambientTemp) !== -111 ? Number(ambientTemp) : 0
    },
    {
      name: "Module",
      value: Number(moduleTemp) && Number(moduleTemp) !== -111 ? Number(moduleTemp) : 0
    },
    {
      name: "Humidity",
      value: Number(humidity) && Number(humidity) !== -111 ? Number(humidity) : 0
    },
  ];
  return (
    <Card
      elevation={6}
      style={{
        // height: '310px',
        paddingTop: ".5rem",
        paddingBottom: ".5rem",
        paddingLeft: ".25rem",
        paddingRight: ".25rem",
        height: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        // justifyContent: "center",
      }}
    >
      <Typography variant="h6">Temperatures {" and "} Humidity</Typography>
      <BarChart
        width={300}
        height={240}
        data={data}
        margin={{
          //   top: 5,
          right: 50,
          //   left: 1,
          //   bottom: 5,
        }}
        barSize={20}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 30 }} />
        <YAxis domain={[0, 100]} />
        {/* <Tooltip /> */}

        <CartesianGrid strokeDasharray="3 3" />
        <Bar
          isAnimationActive={false}
          dataKey="value"
          fill="#8884d8"
          background={{ fill: "#eee" }}
          label={<CustomizedLabel />}
          //   label={{ position: "top" }}
        >
          {/* <LabelList dataKey='name' content={renderCustomizedLabel} /> */}
          {data.map((entry, index) => (
            <Cell
              cursor="pointer"
              fill={
                index === 0 ? "#42a5f5" : index === 1 ? "#82ca9d" : "#8884d8"
              }
              key={`cell-${index}`}
            />
          ))}
        </Bar>
      </BarChart>
    </Card>
  );
}
