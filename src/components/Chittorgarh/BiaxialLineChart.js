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
    ghi: 1,
    ghi2: 1,
    gti: 1,
    gti2: 1,
    pg: 1,
  });

  const selectLine = (dataKey) => {
    setOpacity((prevState) => {
      return { ...prevState, [dataKey]: prevState[dataKey] === 0 ? 1 : 0 };
    });
  };

  const renderLegend = (props) => {
    const { payload } = props;

    return (
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        {payload.map((entry, index) => {
          // <li key={`item-${index}`}>{entry.value}</li>

          return (
            <strong
              key={entry.value}
              style={{
                fontSize: "1rem",
                color: entry.color,
                cursor: "pointer",
                opacity: opacity[entry.dataKey] === 0 ? 0.5 : 1,
              }}
              onClick={() => selectLine(entry.dataKey)}
            >
              {String(entry.value).toUpperCase()}
            </strong>
          );
        })}
      </div>
    );
  };

  // const renderLegend = ({ payload }) => {
  //   return (
  //     <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
  //       {payload.map(({ dataKey, color }) => {
  //         return (
  //           <strong
  //             key={dataKey}
  //             style={{
  //               fontSize: "1rem",
  //               color: color,
  //               cursor: "pointer",
  //               opacity: opacity[dataKey] === 0 ? 0.5 : 1,
  //             }}
  //             onClick={() => selectLine(dataKey)}
  //           >
  //             {String(dataKey.value).toUpperCase()}
  //           </strong>
  //         );
  //       })}
  //     </div>
  //   );
  // };

  return (
    <ResponsiveContainer width="100%" height="83%">
      <LineChart
        // width={width}
        // height={height}
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" interval={interval} />
        <YAxis yAxisId="left" domain={leftAxisY} />
        <YAxis yAxisId="right" domain={rightAxisY} orientation="right" />
        <Tooltip />
        <Legend content={renderLegend} />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="ghi"
          // stroke="#3498DB"
          stroke="#5499C7"
          strokeWidth={2}
          strokeOpacity={opacity.ghi}
          activeDot={{ r: 6 }}
          dot={false}
          name="GHI 1"
        />
        <Line
          name="GHI 2"
          yAxisId="left"
          type="monotone"
          dataKey="ghi2"
          // stroke="#F5B041"
          stroke="#AF7AC5"
          strokeWidth={2}
          strokeOpacity={opacity.ghi2}
          activeDot={{ r: 6 }}
          dot={false}
        />
        <Line
          name="GTI 1"
          yAxisId="left"
          type="monotone"
          dataKey="gti"
          // stroke="#AF7AC5"
          stroke="#F5B041"
          strokeWidth={2}
          strokeOpacity={opacity.gti}
          activeDot={{ r: 6 }}
          dot={false}
        />
        <Line
          name="GTI 2"
          yAxisId="left"
          type="monotone"
          dataKey="gti2"
          stroke="#E67E22"
          strokeWidth={2}
          strokeOpacity={opacity.gti2}
          activeDot={{ r: 6 }}
          dot={false}
        />
        <Line
          name="PG"
          yAxisId="right"
          type="monotone"
          dataKey="pg"
          stroke="#82ca9d"
          strokeWidth={2}
          strokeOpacity={opacity.pg}
          activeDot={{ r: 6 }}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
