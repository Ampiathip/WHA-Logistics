import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { CircularProgress } from "@material-ui/core";
import { forEach } from "lodash";

const Charts = ({ isLoading, dataSearch }) => {
  // Create the echarts instance
  // const [dataCheck, setDataCheck] = useState();
  // const [timestampCheck, setTimestampCheck] = useState();

  // const uData = [null, 3000, 2000, 2780, 1890, 2390, 3490];
  // const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  // const xLabels = [
  //   "Page A",
  //   "Page B",
  //   "Page C",
  //   "Page D",
  //   "Page E",
  //   "Page F",
  //   "Page G",
  // ];

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

        return {
          data: filteredData.length > 0 ? filteredData : [0],
          label: item[0]?.point,
          yAxisKey: "leftAxisId",
          valueFormatter: (value) =>
            Number.isInteger(value) ? value : parseInt(value) ?? 0,
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
      const [dd, mm, yyyy, HH, mins, ss] = timestamp.match(/\d+/g); // Extract date and time components
      // Create a Date object
      const dateObject = new Date(yyyy, mm - 1, dd, HH, mins, ss); // Note: Months are 0-based in JavaScript
      timestampArray.push(new Date(dateObject));
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
                  <LineChart
                    width={830}
                    height={300}
                    series={dataSeries}
                    xAxis={[{ scaleType: "time", data: dataXLabels }]}
                    yAxis={[{ id: "leftAxisId" }, { id: "rightAxisId" }]}
                    rightAxis="rightAxisId"
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
