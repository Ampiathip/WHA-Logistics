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

const Calendar = ({ t }) => {
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
      <div className="MarginCard marginCardCalendar">
        <Card>
          <CardContent>
            <Grid item md={12} className="FlexIconHead">
              <Grid item md={1}>
                <Typography variant="body2">
                  {t("historicalData:startDate")}
                </Typography>
              </Grid>
              <Grid item md={3} className="marginRight">
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
              <Grid item md={3} className="marginRight">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      value={valueEnd}
                      onChange={(newValue) => setValueEnd(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <div className="disPlayFlexRow">
                <div className="marginBtn">
                  <Button
                    variant="contained"
                    className={`btnIconWidth ${
                      clickBtn === "table" ? "activeBtn" : ""
                    } `}
                    startIcon={<CalendarMonthOutlinedIcon />}
                    onClick={handleClickTable}
                  ></Button>
                </div>
                <div className="marginBtn">
                  <Button
                    variant="contained"
                    className={`btnIconWidth ${
                      clickBtn === "graph" ? "activeBtn" : ""
                    } `}
                    onClick={handleClickGraph}
                    startIcon={<StackedLineChartOutlinedIcon />}
                  ></Button>
                </div>
                <div className="marginBtn">
                  <Button
                    variant="contained"
                    className="btnIconWidth activeBtn"
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

            <Grid item md={12} className="FlexIconHead MarginCard">
              <Grid item md={8} className="FlexCard ">
                {/* <Link href="#" underline="always"> */}
                <Typography
                  variant="body2"
                  className={`${
                    clickDate === "24hr" ? "activeBar" : "cursorPointer"
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
                    clickDate === "7Date" ? "activeBar" : "cursorPointer"
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
                    clickDate === "30Date" ? "activeBar" : "cursorPointer"
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
                    value && valueEnd ? "activeBar" : "cursorPointer"
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
              <Grid item md={2} className="disPlayFlexRow FlexRowCard">
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
      </div>
      {clickBtn === "graph" ? (
        <Grid item className="mt-4">
          <Charts />
        </Grid>
      ) : (
        <Grid item className="mt-4">
          <DataTable />
        </Grid>
      )}
    </>
  );
};

Calendar.propTypes = {
  t: PropTypes.func,
};

export default Calendar;
