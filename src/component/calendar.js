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
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

const Calendar = () => {
  const [value, setValue] = useState(null);
  const [valueEnd, setValueEnd] = useState(null);


  return (
    <>
      <div className="MarginCard marginCardCalendar">
        <Card>
          <CardContent>
            <Grid item md={12} className="FlexIconHead">
              <Grid item md={1}>
                <Typography variant="body2">Start Date</Typography>
              </Grid>
              <Grid item md={3} className="marginRight">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      value={value}
                      onChange={(newValue) => setValue(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item md={1}>
                <Typography variant="body2" className="marginRight">
                  End Date
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
                    color="inherit"
                    className="btnIconWidth"
                    startIcon={<CalendarMonthOutlinedIcon />}
                  ></Button>
                </div>
                <div className="marginBtn">
                  <Button
                    variant="contained"
                    color="secondary"
                    className="btnIconWidth"
                    startIcon={<StackedLineChartOutlinedIcon />}
                  ></Button>
                </div>
                <div className="marginBtn">
                  <Button
                    variant="contained"
                    color="secondary"
                    className="btnIconWidth"
                    endIcon={<SearchOutlinedIcon />}
                  >
                    <Typography className="frontSizeBtn">Search</Typography>
                  </Button>
                </div>
              </div>
            </Grid>

            <Grid item md={12} className="FlexIconHead MarginCard">
              <Grid item md={4} className="FlexCard ">
                <Link href="#" underline="always">
                  <Typography variant="body2" className="activeBar">
                    Past 24Hr
                  </Typography>
                </Link>
                <Link href="#" underline="hover" className="colorTextLink">
                  <Typography variant="body2">Past 7 Davs</Typography>
                </Link>
                <Link href="#" underline="hover" className="colorTextLink">
                  <Typography variant="body2">Past 30 Davs</Typography>
                </Link>
              </Grid>
              <Grid item md={6} className="FlexIconHead FlexRowCard">
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
              </Grid>
              <Grid item md={2} className="textEnd">
                <AssignmentOutlinedIcon />
                <PrintOutlinedIcon />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

Calendar.propTypes = {};

export default Calendar;
