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

const Charts = () => {
  const uData = [80, 60, 40, 100, 20, 0, 60];
  const pData = [80, 20, 100, 40, 0, 60, 100];
  const xLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  return (
    <>
      <div className="MarginCard marginCardCalendar">
        <Card>
          <CardContent>
            <LineChart
            //   width={500}
              height={300}
              series={[
                { data: pData, label: "Dataset 1" },
                { data: uData, label: "Dataset 2" },
              ]}
              xAxis={[{ scaleType: "point", data: xLabels }]}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

Charts.propTypes = {};

export default Charts;
