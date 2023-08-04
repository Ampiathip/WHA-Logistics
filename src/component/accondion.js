import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import {
  Typography,
  Grid,
  makeStyles,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import clsx from "clsx";

const Device = [
  { id: 1, title: "Device1", year: 1994 },
  { id: 2, title: "Device2", year: 1972 },
  { id: 3, title: "Device3", year: 1974 },
];

const Point = [
  { id: 1, title: "Current", year: 1994 },
  { id: 2, title: "Voltage", year: 1972 },
  { id: 3, title: "Power", year: 1974 },
];

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: `10px !important`,
  },
  flexRow: {
    display: "flex",
  },
  Table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center",
  },
  border: {
    border: "1px solid #E1E3E5",
  },
  paddingCell: {
    padding: 8,
  },

}));

const Tags = ({ t }) => {
  const classes = useStyles();
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
        {/* <Autocomplete
          // multiple
          id="tags-standard"
          // options={Device.map((option) => option.title)}
          options={Device}
          getOptionLabel={(option) => option.title}
          // defaultValue={[Device]}
          // getOptionLabel={(option) => option.title}
          value={nameDevice}
          onChange={handleDevice}
          className={classes.margin}
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
        /> */}
        <Autocomplete
          // multiple
          id="tags-outlined"
          options={top100Films}
          getOptionLabel={(option) => option.title}
          // defaultValue={nameDevice}
          // filterSelectedOptions
          // value={}
          className={classes.margin}
          onChange={handleDevice}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={t("historicalData:devicelist")}
              size="small"
              margin="normal"
              variant="outlined"
            />
          )}
        />

        {/* Point */}
        <Typography variant="h6" className={classes.margin}>
          {t("historicalData:poin")}
        </Typography>
        <Autocomplete
          multiple
          id="tags-outlined"
          options={top100FilmsPoint}
          getOptionLabel={(option) => option.title}
          value={pointDevice}
          className={classes.margin}
          onChange={handlePoint}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={t("historicalData:poin")}
              size="small"
              margin="normal"
              variant="outlined"
            />
          )}
        />
        {/* <Autocomplete
          multiple
          id="tags-standard"
          // options={Point.map((option) => option.title)}
          options={Point}
          // getOptionLabel={(option) => option.title}
          // value={pointDevice}
          onChange={handlePoint}
          className={classes.margin}
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
        /> */}
        {/* <Grid item className="mt-3"> */}
        <Typography variant="h6">{t("historicalData:select")}</Typography>
        <Box>
          {/* <Grid item className={classes.flexRow}>
            <Typography>{t("historicalData:poiniCheck")}</Typography>
            <Typography>{t("historicalData:Action")}</Typography>
          </Grid> */}
          <Table className={classes.Table}>
            <TableBody>
              <TableRow className={classes.border}>
                <TableCell className={clsx(classes.border, classes.paddingCell)}>
                  <Typography variant="body2">
                    {t("historicalData:poiniCheck")}
                  </Typography>
                </TableCell>
                {/* <TableCell className={clsx(classes.border, classes.paddingCell)}>
                  <Typography variant="body2">
                    {t("historicalData:Action")}
                  </Typography>
                </TableCell> */}
              </TableRow>
              {pointDevice.length > 0 &&
                pointDevice.map((item, index) => {
                  return (
                    <TableRow className={classes.border}>
                      <TableCell className={clsx(classes.border, classes.paddingCell)}>
                        <Typography variant="body2">
                          {nameDevice && nameDevice.title + ' / ' + item.title}
                        </Typography>
                      </TableCell>
                      {/* <TableCell className={clsx(classes.border, classes.paddingCell)}>
                        <HighlightOffOutlinedIcon />
                      </TableCell> */}
                    </TableRow>
                  );
                })}
            </TableBody>
            {/* <tr>
              <td className={classes.border}>
                <Typography variant="body2">test</Typography>
              </td>
              <td className={classes.border}>
                <HighlightOffOutlinedIcon />
              </td>
            </tr> */}
          </Table>
        </Box>
        {/* {nameDevice.length > 0 && pointDevice.length > 0 && (
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
          )} */}
        {/* </Grid> */}
      </Stack>
    </>
  );
};

Tags.propTypes = {
  t: PropTypes.func,
};

export default Tags;

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: "Device1", year: 1994, id: 1 },
  { title: "Device2", year: 1972, id: 2 },
  { title: "Device3", year: 1974, id: 3 },
  { title: "Device4", year: 2008, id: 4 },
  { title: "Device5", year: 1957, id: 5 },
  { title: "Device6", year: 1993, id: 6 },
  // { title: "Pulp Fiction", year: 1994, id: 7 },
  // { title: "One Flew Over the Cuckoo's Nest", year: 1975, id: 8 },
  // { title: "Goodfellas", year: 1990, id: 9 },
  // { title: "The Matrix", year: 1999, id: 10 },
  // { title: "Seven Samurai", year: 1954, id: 11 },
];

const top100FilmsPoint = [
  { title: "Current", year: 1994, id: 1 },
  { title: "Voltage", year: 1972, id: 2 },
  { title: "EnergyL1", year: 1974, id: 3 },
  { title: "EnergyL2", year: 2008, id: 4 },
  { title: "Current", year: 1957, id: 5 },
  { title: "Energy", year: 1993, id: 6 },
  { title: "Power", year: 1994, id: 7 },
];
