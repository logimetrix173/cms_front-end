import { hslToRgb } from "@material-ui/core";
import { StoreMallDirectory, Translate } from "@material-ui/icons";
import { minTime } from "date-fns/fp";
import React, { useState, useEffect } from "react";
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

const hslToHex = (h, s, l) => {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = (x) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    let marginRight = "0px";
    if (payload.length > 17 && payload.length <= 34) {
      marginRight = "90px";
    } else if (payload.length > 34) {
      marginRight = "180px";
    }

    return (
      <div
        style={{
          maxHeight: "350px",
          columnCount: 1,
          marginRight: marginRight,
        }}
      >
        <div>{`Time: ${label}`}</div>
        {payload.map((entry, index) => (
          <div key={index} style={{ color: entry.color }}>
            <small>{`Inv ${index + 1}: ${Number(entry.value).toFixed(
              3
            )}`}</small>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default function CustomLineChart({ data }) {
  const { chartData, lines, interval, min } = data;

  // console.log(chartData);

  const [opacity, setOpacity] = useState(() => {
    let invObj = {};
    for (let i = 0, j = 1; i < lines.length; i++, j++) {
      invObj["Inv " + j] = 1;
    }
    return invObj;
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
          // gap: "20px",
          marginTop: ".25rem",
        }}
      >
        {payload.map(({ dataKey, color }, index) => {
          return (
            <strong
              key={dataKey}
              style={{
                color: color,
                cursor: "pointer",
                marginInline: ".2rem",

                opacity: opacity[dataKey] === 0 ? 0.3 : 1,
              }}
              onClick={() => selectLine(dataKey)}
            >
              {index + 1}
            </strong>
          );
        })}
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        // width={500}
        // height={300}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          //   left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="createdon_client" interval={interval} />
        <YAxis domain={[(dataMin) => min, 1]} allowDataOverflow={true} />
        <Tooltip content={<CustomTooltip />} />
        <Legend content={renderLegend} />
        {lines.map((value, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={value.label}
            strokeWidth={2}
            // stroke={hslToHex(
            //   Number((360 / lines.length) * (index - 1)),
            //   60,
            //   40
            // )}
            stroke={lines.length === 1 ? "blue" : value.color}
            activeDot={{ r: 4 }}
            dot={false}
            strokeOpacity={opacity[value.label]}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
