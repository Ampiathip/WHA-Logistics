import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import { Typography, Grid } from "@material-ui/core";

const Device = [
  {id: 1, title: "Device1", year: 1994 },
  {id: 2, title: "Device2", year: 1972 },
  {id: 3, title: "Device3", year: 1974 },
];

const Point = [
  {id: 1, title: "Current", year: 1994 },
  {id: 2, title: "Voltage", year: 1972 },
  {id: 3, title: "Power", year: 1974 },
];

const Tags = ({ t }) => {
  const [nameDevice, setIsnameDevice] = useState([]);
  const [pointDevice, setIspointDevice] = useState([]);

  // useEffect (() => {

  // }, [nameDevice])

  const handleDevice = (event, value) => {
    if (value) {
      setIsnameDevice(value);
    }
  };

  const handlePoint = (event, value) => {
    if (value) {
      setIspointDevice(value);
    }
  };

  console.log("mmmmmm=====", nameDevice, pointDevice);

  return (
    <>
      <Stack spacing={3}>
        <Typography variant="h6">{t("historicalData:devicelist")}</Typography>
        <Autocomplete
          multiple
          id="tags-standard"
          options={Device.map((option) => option.title)}
          value={nameDevice}
          onChange={handleDevice}
          className="autoPadding"
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              margin="normal"
              variant="outlined"
              // label={t('historicalData:devicelist')}
              placeholder={t("historicalData:devicelist")}
            />
          )}
        />

        {/* Point */}
        <Typography variant="h6" className="autoPadding">
          {t("historicalData:poin")}
        </Typography>
        <Autocomplete
          multiple
          id="tags-standard"
          options={Point.map((option) => option.title)}
          value={pointDevice}
          onChange={handlePoint}
          className="autoPadding"
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              margin="normal"
              variant="outlined"
              // label={t('historicalData:devicelist')}
              placeholder={t("historicalData:poin")}
            />
          )}
        />
        {/* <Grid item className="mt-3"> */}
          <Typography variant="h6">{t("historicalData:select")}</Typography>
          {nameDevice.length > 0 && pointDevice.length > 0 && (
            <>
              <div className="boxTextPoint">
                {nameDevice.map((item) => {
                  return pointDevice.map((point) => {
                    return (
                      <Typography variant="body1">
                        {" "}
                        {item + " / " + point}{" "}
                      </Typography>
                    );
                  });
                })}
              </div>
            </>
          )}
        {/* </Grid> */}
      </Stack>
    </>
  );
};

Tags.propTypes = {
  t: PropTypes.func,
};

export default Tags;
