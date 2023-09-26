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
      {index >= 10 ? "%" : "°C"}
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
  temperatureData,
}) {
  const data = [
    {
      name: "Amb 1",
      value:
        Number(temperatureData.ambienttemp1) &&
        Number(temperatureData.ambienttemp1) !== -111
          ? Number(temperatureData.ambienttemp1).toFixed(1)
          : 0,
    },
    {
      name: "Amb 2",
      value:
        Number(temperatureData.ambienttemp2) &&
        Number(temperatureData.ambienttemp2) !== -111
          ? Number(temperatureData.ambienttemp2).toFixed(1)
          : 0,
    },
    {
      name: "Amb 3",
      value:
        Number(temperatureData.ambienttemp3) &&
        Number(temperatureData.ambienttemp3) !== -111
          ? Number(temperatureData.ambienttemp3).toFixed(1)
          : 0,
    },
    {
      name: "Amb 4",
      value:
        Number(temperatureData.ambienttemp4) &&
        Number(temperatureData.ambienttemp4) !== -111
          ? Number(temperatureData.ambienttemp4).toFixed(1)
          : 0,
    },
    {
      name: "Amb 5",
      value:
        Number(temperatureData.ambienttemp5) &&
        Number(temperatureData.ambienttemp5) !== -111
          ? Number(temperatureData.ambienttemp5).toFixed(1)
          : 0,
    },
    {
      name: "Mod 1",
      value:
        Number(temperatureData.moduletemp1) &&
        Number(temperatureData.moduletemp1) !== -111
          ? Number(temperatureData.moduletemp1).toFixed(1)
          : 0,
    },
    {
      name: "Mod 2",
      value:
        Number(temperatureData.moduletemp2) &&
        Number(temperatureData.moduletemp2) !== -111
          ? Number(temperatureData.moduletemp2).toFixed(1)
          : 0,
    },
    {
      name: "Mod 3",
      value:
        Number(temperatureData.moduletemp3) &&
        Number(temperatureData.moduletemp3) !== -111
          ? Number(temperatureData.moduletemp3).toFixed(1)
          : 0,
    },
    {
      name: "Mod 4",
      value:
        Number(temperatureData.moduletemp4) &&
        Number(temperatureData.moduletemp4) !== -111
          ? Number(temperatureData.moduletemp4).toFixed(1)
          : 0,
    },
    {
      name: "Mod 5",
      value:
        Number(temperatureData.moduletemp5) &&
        Number(temperatureData.moduletemp5) !== -111
          ? Number(temperatureData.moduletemp5).toFixed(1)
          : 0,
    },
    {
      name: "Hum 1",
      value:
        Number(temperatureData.humidity1) &&
        Number(temperatureData.humidity) !== -111
          ? Number(temperatureData.humidity1).toFixed(1)
          : 0,
    },
    {
      name: "Hum 2",
      value:
        Number(temperatureData.humidity2) &&
        Number(temperatureData.humidity2) !== -111
          ? Number(temperatureData.humidity2).toFixed(1)
          : 0,
    },
    {
      name: "Hum 3",
      value:
        Number(temperatureData.humidity3) &&
        Number(temperatureData.humidity3) !== -111
          ? Number(temperatureData.humidity3).toFixed(1)
          : 0,
    },
    {
      name: "Hum 4",
      value:
        Number(temperatureData.humidity4) &&
        Number(temperatureData.humidity4) !== -111
          ? Number(temperatureData.humidity4).toFixed(1)
          : 0,
    },
    {
      name: "Hum 5",
      value:
        Number(temperatureData.humidity5) &&
        Number(temperatureData.humidity5) !== -111
          ? Number(temperatureData.humidity5).toFixed(1)
          : 0,
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
        width={800}
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
            if (index < 5) {
              return (
                <Cell cursor="pointer" fill="#42a5f5" key={`cell-${index}`} />
              );
            } else if (index >= 5 && index < 10) {
              return (
                <Cell cursor="pointer" fill="#82ca9d" key={`cell-${index}`} />
              );
            } else {
              return (
                <Cell cursor="pointer" fill="#8884d8" key={`cell-${index}`} />
              );
            }
          })}
        </Bar>
      </BarChart>
    </Card>
  );
}
