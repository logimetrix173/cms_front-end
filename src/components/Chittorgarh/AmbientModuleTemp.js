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
      fontSize="10"
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
  ambientTemp2,
  moduleTemp2,
  humidity2,
}) {
  const data = [
    {
      name: "Amb 1",
      value: Number(ambientTemp) && Number(ambientTemp) !== -111 ? Number(ambientTemp) : 0,
    },
    {
      name: "Amb 2",
      value: Number(ambientTemp2) && Number(ambientTemp2) !== -111 ? Number(ambientTemp2) : 0,
    },
    {
      name: "Mod 1",
      value: Number(moduleTemp) && Number(moduleTemp) !== -111 ? Number(moduleTemp) : 0,
    },
    {
      name: "Mod 2",
      value: Number(moduleTemp2) && Number(moduleTemp2) !== -111 ? Number(moduleTemp2) : 0,
    },
    {
      name: "Hum 1",
      value: Number(humidity) && Number(humidity) !== -111 ? Number(humidity) : 0,
    },
    {
      name: "Hum 2",
      value: Number(humidity2) && Number(humidity2) !== -111 ? Number(humidity2) : 0,
    },
  ];
  return (
    <Card
      elevation={6}
      style={{
        // height: '310px',
        paddingTop: ".5rem",
        paddingBottom: ".5rem",
        paddingLeft: "0rem",
        paddingRight: "0rem",
        height: 255,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        // justifyContent: "center",
      }}
    >
      <Typography>Temperatures {" and "} Humidity</Typography>
      <BarChart
        width={370}
        height={200}
        data={data}
        margin={{
          //   top: 5,
          right: 50,
          //   left: 1,
          bottom: 15,
        }}
        barSize={20}
      >
        <XAxis
          dataKey="name"
          scale="point"
          padding={{ left: 20 }}
          angle={315}
          tickMargin={15}
          // tick={{ fontSize: 10 }}
        />
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
          {data.map((entry, index) => {
            if (index === 1 || index === 3) {
              return (
                <Cell
                  cursor="pointer"
                  fill={
                    index === 0 || index === 1
                      ? "#42a5f5"
                      : index === 2 || index == 3
                      ? "#82ca9d"
                      : "#8884d8"
                  }
                  key={`cell-${index}`}
                />
              );
            } else {
              return (
                <Cell
                  cursor="pointer"
                  fill={
                    index === 0 || index === 1
                      ? "#42a5f5"
                      : index === 2 || index == 3
                      ? "#82ca9d"
                      : "#8884d8"
                  }
                  key={`cell-${index}`}
                />
              );
            }
          })}
        </Bar>
      </BarChart>
    </Card>
  );
}
