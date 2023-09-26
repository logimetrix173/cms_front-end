import React, { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LabelList,
  Legend,
  Brush,
} from "recharts";

export default function CustomBarChart({ data, enableScroll }) {
  const {
    lowestValue,
    lowestValueIndex,
    highestValue,
    highestValueIndex,
    chartData,
  } = data;

  // console.log(chartData);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload) {
      return (
        <div>
          <div>{`Block: ${payload[0].payload.blockName}`}</div>
          <div>{`Inv ${label}: ${payload[0].value / 1000}`}</div>
        </div>
      );
    }

    return null;
  };

  const toDecimal = (value, index) => {
    return value / 1000;
  };

  const [brushStartIndex, setBrushStartIndex] = useState(0);

  useEffect(() => {
    if (enableScroll === false) {
      setBrushStartIndex(0);
    }
  }, [enableScroll]);

  return enableScroll === true ? (
    <ResponsiveContainer style={{ height: "100%" }}>
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          // left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis domain={["auto", "auto"]} tickFormatter={toDecimal} />
        <Tooltip content={<CustomTooltip />} />
        {/* <ReferenceLine y={0} stroke="#000" /> */}

        <Brush
          endIndex={11}
          onChange={(obj) => setBrushStartIndex(obj.startIndex)}
          dataKey="label"
          height={25}
          stroke="lightgreen"
        />

        <Bar barSize={60} isAnimationActive={false} dataKey="value">
          <LabelList
            dataKey="value"
            position="insideTop"
            fill="#fff"
            formatter={(value) => value / 1000}
          />
          {chartData.map((datum, index) => {

          //the change is for onl;y demo purpose  
          //if (index === highestValueIndex - brushStartIndex) {
         if (datum.blockName === "Hukkeri")   {
            
              return <Cell key={`cell-${index}`} fill={"#66bb6a"} />;
            } else if (index === lowestValueIndex - brushStartIndex) {
              return <Cell key={`cell-${index}`} fill={"#F1948A"} />;
            } else {
              return <Cell key={`cell-${index}`} fill={"#29b6f6"} />;
            }
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  ) : (
    <ResponsiveContainer style={{ height: "100%" }}>
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          // left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis domain={["auto", "auto"]} tickFormatter={toDecimal} />
        <Tooltip content={<CustomTooltip />} />
        {/* <ReferenceLine y={0} stroke="#000" /> */}

        <Bar barSize={60} isAnimationActive={false} dataKey="value">
          <LabelList
            dataKey="value"
            position="insideTop"
            fill="#fff"
            formatter={(value) => value / 1000}
          />
          {chartData.map((datum, index) => {
            if (index === highestValueIndex) {
              return <Cell key={`cell-${index}`} fill={"#66bb6a"} />;
            } else if (index === lowestValueIndex) {
              return <Cell key={`cell-${index}`} fill={"#F1948A"} />;
            } else {
              return <Cell key={`cell-${index}`} fill={"#29b6f6"} />;
            }
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
