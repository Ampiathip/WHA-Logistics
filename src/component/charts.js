import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Box,
} from "@mui/material";
// import { LineChart } from "@mui/x-charts/LineChart";
import { CircularProgress } from "@material-ui/core";

import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import moment from "moment";

// Use the required components and charts
echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

const Charts = ({ isLoading, dataSearch }) => {
  const handleDataSeries = (array) => {
    // return array.map((item) => {
    //   return {
    //     data: item[0]?.data,
    //     label: item[0]?.point,
    //     yAxisKey: "leftAxisId",
    //     valueFormatter: (value) => (Number.isInteger(value) ? value : (parseInt(value) ?? 0)),
    //   };
    // });
    return array.map((item) => {
      if (item[0]?.data instanceof Array) {
        // Remove null values from the data array
        const filteredData = item[0].data.filter((value) => value !== null);

        // return {
        //   data: filteredData.length > 0 ? filteredData : [0],
        //   label: item[0]?.point,
        //   yAxisKey: "leftAxisId",
        //   valueFormatter: (value) =>
        //     Number.isInteger(value) ? value : parseInt(value) ?? 0,
        // };
        return {
          name: item[0]?.point,
          type: "line",
          stack: "Total",
          data: filteredData.length > 0 ? filteredData : [0],
        };
      } else {
        return item;
      }
    });
  };

  const handleXLabels = (array) => {
    let dataArray = [];
    let timestampArray = [];
    array.map((item) => {
      dataArray.push(...item[0]?.timestamp);
    });
    // Use a Set to filter out duplicates
    const uniqueTimestamps = new Set(dataArray);

    // Convert the Set back to an array if needed
    const uniqueTimestampArray = [...uniqueTimestamps];

    // const timestamps = item[0]?.timestamp;
    //   if (timestamps) {
    uniqueTimestampArray.forEach((timestamp) => {
      // console.log("#Nan ===========", timestamp);
      // const [dd, mm, yyyy, HH, mins, ss] = timestamp.match(/\d+/g); // Extract date and time components
      // Create a Date object
      // const dateObject = new Date(yyyy, mm - 1, dd, HH, mins, ss); // Note: Months are 0-based in JavaScript

      // console.log('#Nan ===========dateObject', dateObject);
      // timestampArray.push(new Date(dateObject));

      // const timePortion = timestamp.split(" ")[0]; // Assuming the format is "YYYY-MM-DD HH:mm:ss"
      // const timePortion = moment(timestamp).format();
      // const timePortion = moment(timestamp).format("YYYY/MM/DD/HH:mm");

      // console.log('timePortion', timePortion);

      // Check if timestampArray already includes the time portion
      if (!timestampArray.includes(timestamp)) {
        timestampArray.push(timestamp);
      }

      // if (!timestampArray.includes(timestamp)) {
      //   timestampArray.push(timestamp);
      // }

      // console.log("#Nan ===========timestampArray", timestampArray, timePortion);
    });
    // }
    return timestampArray;
  };

  // const handleXLabelsTwo = (array) => {
  //   // if (array) {
  //   let dataArray = [];

  //   const loopTime = 100;

  //   for (let i = 0; i < loopTime; i++) {
  //     dataArray.push(`0000000000 + ${i}`);
  //   }
  //   // await Promise.all (
  //   //   array.map((item) => {
  //   //     dataArray.push(...item[0]?.timestamp);
  //   //  })
  //   // )
  //   return dataArray;
  //   // }
  // };

  const dataSeries = handleDataSeries(dataSearch);
  const dataXLabels = handleXLabels(dataSearch);
  // const dataXLabelsTwo = handleXLabelsTwo();

  console.log("dataSeries===", dataSeries, dataSearch, dataXLabels);

  const option = {
    title: {
      text: "Stacked Line",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: dataSeries,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: dataXLabels,
    },
    yAxis: {
      type: "value",
    },
    series: dataSeries,
    // [
    // {
    //   name: "Email",
    //   type: "line",
    //   stack: "Total",
    //   data: [120, 132, 101, 134, 90, 230, 210],
    // },
    // {
    //   name: "Union Ads",
    //   type: "line",
    //   stack: "Total",
    //   data: [220, 182, 191, 234, 290, 330, 310],
    // },
    // {
    //   name: "Video Ads",
    //   type: "line",
    //   stack: "Total",
    //   data: [150, 232, 201, 154, 190, 330, 410],
    // },
    // {
    //   name: "Direct",
    //   type: "line",
    //   stack: "Total",
    //   data: [320, 332, 301, 334, 390, 330, 320],
    // },
    // {
    //   name: "Search Engine",
    //   type: "line",
    //   stack: "Total",
    //   data: [820, 932, 901, 934, 1290, 1330, 1320],
    // },
    // ],
  };

  return (
    <>
      {isLoading ? (
        <Box mt={4} width={1} display="flex" justifyContent="center">
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <div className="MarginCard marginCardCalendar">
          {dataSearch.length > 0 && (
            <Card>
              <CardContent>
                <div>
                  {/* <LineChart
                    width={830}
                    height={300}
                    series={dataSeries}
                    xAxis={[{ scaleType: "time", data: dataXLabels }]}
                    yAxis={[{ id: "leftAxisId" }, { id: "rightAxisId" }]}
                    rightAxis="rightAxisId"
                  /> */}
                  <ReactECharts
                    echarts={echarts}
                    option={option}
                    style={{ height: "400px", width: "100%" }}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </>
  );
};

Charts.propTypes = {};

export default Charts;
