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
    <div style={{textAlign: 'center', marginTop: '5px'}}>
      {
        payload.map((entry, index) => {
          if (entry.value === 'prBudget') {
            return (<span key={`item-${index}`} style={{color: '#5DADE2'}}>&#9679;&nbsp;Budget&emsp;</span>) 
          } else {
            return (<span key={`item-${index}`}><span style={{color: '#48C9B0'}}>&#9679;</span>&nbsp;<span style={{color: '#EC7063'}}>&#9679;</span>&nbsp;Actual</span>)
          }
          
        })
      }
    </div>
  )
}

export default function CustomBarChart({ chartData, enableScroll }) {

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
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="site" />
        <YAxis domain={[0, data => 110]} />
        {/* <Tooltip content={<CustomTooltip />} /> */}
        {/* <ReferenceLine y={0} stroke="#000" /> */}
        
        <Brush
          endIndex={11}
          onChange={(obj) => setBrushStartIndex(obj.startIndex)}
          dataKey="site"
          height={18}
          stroke="#A6ACAF"
          tickFormatter={() => ''}
          
        />

        <Legend wrapperStyle={{
        paddingTop: "5px"
        }} 
        // formatter={(value, entry, index) => value === 'plantPr' ? 'Actual PR' : 'Budget'}
        content={renderLegend}
         />

        <Bar isAnimationActive={false} dataKey="prBudget" fill="#5DADE2">
          <LabelList
            dataKey="prBudget"
            position="center"
            fill="#fff"
            angle='270'
          />
          {/* {chartData.map((datum, index) => {
            
              return <Cell key={`cell-${index}`} />;
            
          })} */}
        </Bar>
        <Bar isAnimationActive={false} dataKey="plantPr">
          <LabelList
            dataKey="plantPr"
            position="center"
            fill="#fff"
            angle='270'
          />
          {chartData.map((datum, index) => {
              if (Number(datum.plantPr) >= Number(datum.prBudget)) {
                return <Cell key={`cell-${index}`} fill='#48C9B0' />;
              } else {
                return <Cell key={`cell-${index}`} fill='#EC7063' />;
              }             
          })}
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
        <XAxis dataKey="site"
          angle={270}
          tickMargin={32} fontSize={10} interval={0} />
        <YAxis domain={[0, data => 110]}  />
        {/* <Tooltip content={<CustomTooltip />} /> */}
        {/* <ReferenceLine y={0} stroke="#000" /> */}

        <Legend wrapperStyle={{
        paddingTop: "45px"
        }} 
        formatter={(value, entry, index) => value === 'plantPr' ? 'Actual PR' : 'Budget'}
        content={renderLegend} />

        <Bar isAnimationActive={false} dataKey="prBudget" fill="#5DADE2">
          <LabelList
            dataKey="prBudget"
            position="center"
            fill="#000"
            angle='270'
            fontSize={8}
            
          />
          {/* {chartData.map((datum, index) => {
            
              return <Cell key={`cell-${index}`} fill={"#29b6f6"} />;
            
          })} */}
        </Bar>
        <Bar isAnimationActive={false} dataKey="plantPr" >
          <LabelList
            dataKey="plantPr"
            position="center"
            fill="#000"
            angle='270'
            fontSize={8}
          />
          {chartData.map((datum, index) => {
              if (Number(datum.plantPr) >= Number(datum.prBudget)) {
                return <Cell key={`cell-${index}`} fill='#48C9B0' />;
              } else {
                return <Cell key={`cell-${index}`} fill='#EC7063' />;
              }             
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
