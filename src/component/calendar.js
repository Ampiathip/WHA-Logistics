import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Grid,
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
} from "@material-ui/core";
import Link from "@mui/material/Link";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import StackedLineChartOutlinedIcon from "@mui/icons-material/StackedLineChartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Charts from "../component/charts";
import DataTable from "../component/table";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  FlexIconHead: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  disPlayFlexRow: {
    display: "contents",
  },
  alignCenter: {
    alignItems: "center",
  },
  marginTop: {
    marginTop: 15,
  },
  activeBtn: {
    backgroundColor: "#EB2F96",
    color: "#fff",
  },
  btnIconWidth: {
    width: "-webkit-fill-available",
    backgroundColor: "#D9D9D9",
    color: "#fff",
  },
  activeBar: {
    borderBottom: "3px solid #03257D",
  },
  cursorPointer: {
    cursor: "pointer",
  },
}));

const Calendar = ({ t }) => {
  const classes = useStyles();
  const [value, setValue] = useState(null);
  const [valueEnd, setValueEnd] = useState(null);

  const [clickBtn, setClickBtn] = useState("graph");
  const [clickDate, setClickDate] = useState("24hr");
  const [table, setTable] = useState("");
  const [graph, setGraph] = useState("");
  const [search, setSearch] = useState("");

  const handleClickTable = () => {
    setClickBtn("table");
  };

  const handleClickGraph = () => {
    setClickBtn("graph");
  };

  const handleClickSearch = () => {
    console.log("88888888");
  };

  const handleClickNavbar = (text) => {
    setClickDate(text);
  };

  return (
    <>
      <Container>
        <Card>
          <CardContent>
            <Grid
              item
              className={clsx(classes.FlexIconHead, classes.alignCenter)}
            >
              <Grid item>
                <Typography variant="body2">
                  {t("historicalData:startDate")}
                </Typography>
              </Grid>
              <Grid item className="marginRight">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                        setClickDate("");
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item md={1}>
                <Typography variant="body2" className="marginRight">
                  {t("historicalData:endDate")}
                </Typography>
              </Grid>
              <Grid item className="marginRight">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      value={valueEnd}
                      onChange={(newValue) => setValueEnd(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <div className={classes.disPlayFlexRow}>
                <div className="marginBtn">
                  <Button
                    variant="contained"
                    className={`${
                      clickBtn === "table"
                        ? classes.activeBtn
                        : classes.btnIconWidth
                    } `}
                    startIcon={<CalendarMonthOutlinedIcon />}
                    onClick={handleClickTable}
                  ></Button>
                </div>
                <div className="marginBtn">
                  <Button
                    variant="contained"
                    className={`${
                      clickBtn === "graph"
                        ? classes.activeBtn
                        : classes.btnIconWidth
                    } `}
                    onClick={handleClickGraph}
                    startIcon={<StackedLineChartOutlinedIcon />}
                  ></Button>
                </div>
                <div className="marginBtn">
                  <Button
                    variant="contained"
                    className={classes.activeBtn}
                    onClick={handleClickSearch}
                    endIcon={<SearchOutlinedIcon />}
                  >
                    <Typography className="frontSizeBtn">
                      {t("historicalData:search")}
                    </Typography>
                  </Button>
                </div>
              </div>
            </Grid>

            <Grid
              className={clsx(
                classes.FlexIconHead,
                classes.alignCenter,
                classes.marginTop
              )}
            >
              <Grid className={classes.disPlayFlexRow}>
                {/* <Link href="#" underline="always"> */}
                <Typography
                  variant="body2"
                  className={`${
                    clickDate === "24hr"
                      ? classes.activeBar
                      : classes.cursorPointer
                  }`}
                  onClick={() => {
                    handleClickNavbar("24hr");
                  }}
                >
                  {t("historicalData:hr")}
                </Typography>

                {/* </Link> */}
                {/* <Link href="#" underline="hover" className="colorTextLink"> */}
                <Typography
                  variant="body2"
                  className={`${
                    clickDate === "7Date"
                      ? classes.activeBar
                      : classes.cursorPointer
                  }`}
                  onClick={() => {
                    handleClickNavbar("7Date");
                  }}
                >
                  {t("historicalData:date")}
                </Typography>
                {/* </Link> */}
                {/* <Link href="#" underline="hover" className="colorTextLink"> */}
                <Typography
                  variant="body2"
                  className={`${
                    clickDate === "30Date"
                      ? classes.activeBar
                      : classes.cursorPointer
                  }`}
                  onClick={() => {
                    handleClickNavbar("30Date");
                  }}
                >
                  {t("historicalData:threeDate")}
                </Typography>
                {/* </Link>
                <Link href="#" underline="hover" className="colorTextLink"> */}
                <Typography
                  variant="body2"
                  className={`${
                    value && valueEnd
                      ? classes.activeBar
                      : classes.cursorPointer
                  }`}
                >
                  {t("historicalData:custom")}
                </Typography>
                {/* </Link> */}
              </Grid>
              {/* <Grid item md={6} className="FlexIconHead FlexRowCard">
                <div className="marginBtn">
                  <Typography variant="body2">Sort</Typography>
                </div>
                <div>
                  <Button variant="contained" color="secondary">
                    Ascending
                  </Button>
                </div>
                <div>
                  <Button variant="contained" color="inherit">
                    Descending
                  </Button>
                </div>
              </Grid> */}
              <Grid item md={2}></Grid>
              <Grid item md={2} className={classes.disPlayFlexRow}>
                <div>
                  <img
                    src={process.env.PUBLIC_URL + "/img/excel.png"}
                    alt="img-logo-excel"
                  />
                </div>
                <div>
                  <img
                    src={process.env.PUBLIC_URL + "/img/print.png"}
                    alt="img-logo-print"
                  />
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {clickBtn === "graph" ? (
          <Grid item className="mt-4">
            <Charts />
          </Grid>
        ) : (
          <Grid item className="mt-4">
            <DataTable />
          </Grid>
        )}
      </Container>
    </>
  );
};

Calendar.propTypes = {
  t: PropTypes.func,
};

export default Calendar;
