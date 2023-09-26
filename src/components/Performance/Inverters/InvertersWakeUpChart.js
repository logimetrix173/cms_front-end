
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

const renderLegend = (props) => {
  const { payload } = props;

  return (
    <div style={{textAlign: 'center', marginTop: '5px', paddingLeft: '70px'}}>
      {
        payload.map((entry, index) => {
          
          return (<span key={`item-${index}`} style={{color: '#48C9B0'}}>&#9679;&ensp;Rank</span>)
          
          
        })
      }
    </div>
  )
}

const getCustomTime = (value) => {
  let date = new Date(value * 1000);
  return String(date.getHours()).padStart(2, 0) + ":" + String(date.getMinutes()).padStart(2, 0); 
}



export default function InvertersWakeUpChart({ chartData, enableScroll }) {

  const getDataForScroll = () => {
    let cells = [];

    // console.log(chartData);
    
    if (chartData && chartData.length > 0) {
      let fillIndex = chartData.length > 13 ? 13 : chartData.length - 1;
      // console.log(fillIndex)
      for (let i = brushStartIndex; i <= brushStartIndex + fillIndex; i++) {
        cells.push(<Cell key={`cell-${i}`}  fill={chartData[i].color} />)
      }
    }
    
    return cells;
  }

  // console.log(chartData);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload) {
      return (
        <div>
          {/* <span>{`Rank: ${payload[0].payload.rank}
          , Time: ${new Date(payload[0].payload.Timestamp * 1000).toLocaleTimeString()}`}</span> */}
          <span>{`Rank: ${payload[0].payload.rank}`}&ensp;{payload[0].payload.timestamp !== '-1' ? `Time: ${getCustomTime(payload[0].payload.timestamp)}` : ''}</span>
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
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="inverter" fontSize={10} interval={0} stroke='black' />
        <YAxis domain={[0, data => Math.ceil(data)]} />
        <Tooltip content={<CustomTooltip />} />
        {/* <ReferenceLine y={0} stroke="#000" /> */}
        
        <Brush
          endIndex={13}
          onChange={(obj) => setBrushStartIndex(obj.startIndex)}
          dataKey="inverter"
          height={18}
          stroke="#A6ACAF"
          tickFormatter={() => ''}
          
        />
        <Legend wrapperStyle={{
        paddingTop: "10px"
        }}
        // formatter={(value, entry, index) => value === 'plantPr' ? 'Actual PR' : 'Budget'}
        content={renderLegend}

        align='left'
         />

        
        <Bar isAnimationActive={false} dataKey="rank">
          <LabelList
            dataKey="rank"
            position="center"
            fill="#fff"
            angle='270'
            // formatter={(value) => getCustomTime(value)}
          />
          {getDataForScroll()}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  ) : (
    <ResponsiveContainer >
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 0,
          bottom: 5,
        }}
        barCategoryGap={1.25}
        barGap={1}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="inverter"
          angle={270}
          tickMargin={32} fontSize={10} interval={0} stroke='black' />
        <YAxis domain={[0, data => Math.ceil(data)]}  />
        <Tooltip content={<CustomTooltip />} />
        {/* <ReferenceLine y={0} stroke="#000" /> */}
        {/* <Tooltip /> */}
        <Legend wrapperStyle={{
        paddingTop: "45px"
        }} 
        // formatter={(value, entry, index) => value === 'plantPr' ? 'Actual PR' : 'Budget'}
        content={renderLegend} />
        <Bar isAnimationActive={false} dataKey="rank" >
          <LabelList
            dataKey="rank"
            position="center"
            fill="#000"
            angle='270'
            fontSize={10}
            // formatter={(value) => getCustomTime(value)}
          />
          {chartData.map((datum, index) => {
            //   if (Number(datum.Percentage) >= Number(datum.prBudget)) {
            //     return <Cell key={`cell-${index}`} fill='#48C9B0' />;
            //   } else {
            //     return <Cell key={`cell-${index}`} fill='#EC7063' />;
            //   }             
              return <Cell key={`cell-${index}`} fill={datum.color} />;
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
