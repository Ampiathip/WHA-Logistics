import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
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
  CircularProgress,
} from "@material-ui/core";
import Link from "@mui/material/Link";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import StackedLineChartOutlinedIcon from "@mui/icons-material/StackedLineChartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Charts from "../component/charts";
import DataTable from "../component/table";
import clsx from "clsx";
import _, { stubFalse } from "lodash";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import apis from "../js/apis";
import { useTheme } from "@mui/material/styles";
import {
  checkAuthen,
  checkLogin,
  loading,
  checkToken,
  logout,
} from "../js/actions";

const API = apis.getAPI();
const MySwal = withReactContent(Swal);

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
    backgroundColor: "#27963C",
    color: "#fff",
  },
  btnIconWidth: {
    width: "-webkit-fill-available",
    backgroundColor: "#D9D9D9",
    color: "#fff",
  },
  activeBar: {
    borderBottom: "3px solid #27963C",
  },
  cursorPointer: {
    cursor: "pointer",
  },
  flexWrap: {
    flexWrap: "wrap",
  },
}));

const Calendar = ({ t, deviceId, deviceName, point }) => {
  const classes = useStyles();
  const [value, setValue] = useState(null);
  const [valueEnd, setValueEnd] = useState(null);

  const dispatch = useDispatch();
  const sideBar = useSelector((state) => state.sidebar);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const theme = useTheme();

  const [clickBtn, setClickBtn] = useState("graph");
  const [clickDate, setClickDate] = useState("past24");
  // const [table, setTable] = useState("");
  // const [graph, setGraph] = useState("");
  // const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dataSearch, setDataSearch] = useState([]);
  // const [dataSearch, setDataSearch] = useState();
  // const [timestampSearch, setTimestamp] = useState();

  const swalFire = (msg) => {
    MySwal.fire({
      icon: "error",
      confirmButtonText: "ตกลง",
      text: msg,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout(false));
      } else if (result.isDismissed) {
        setIsLoading(false);
      }
    });
  };

  const handleClickTable = () => {
    setClickBtn("table");
  };

  const handleClickGraph = () => {
    setClickBtn("graph");
  };

  const handleClickSearch = async () => {
    setIsLoading(true);
    try {
      let body = [];
      point && point.length > 0 && point.map((item) => {
          const data = {
            deviceID: deviceId,
            deviceName: deviceName,
            data: item,
          }
          body.push(data);
      })
      let startDate = value ? value.format("YYYY-MM-DD HH:mm") : ''
      let endDate = valueEnd ? valueEnd.format("YYYY-MM-DD HH:mm"): ''
      await API.connectTokenAPI(token);
      await API.historicaldata(clickDate, startDate, endDate, body).then((response) => {
        const dataPayload = response.data;
        console.log("dataPayloadmyDevice", dataPayload);
        setDataSearch(dataPayload);
        // dataPayload.map((item) => {
        //   item.map((data) => {
        //     setDataSearch(data);
        //     // setTimestamp(data.timestamp);
        //     console.log('99999999999', data);
        //   })
        // })
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      const response = error.response;
      if (response.status >= 500) {
        swalFire(response.data);
      } else {
        MySwal.fire({
          icon: "error",
          confirmButtonText: "ตกลง",
          cancelButtonText: "ยกเลิก",
          showCancelButton: true,
          text: response.data,
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(logout(false));
          } else if (result.isDismissed) {
            setIsLoading(false);
          }
        });
      }
      setIsLoading(false);
    }
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
              className={clsx(
                classes.FlexIconHead,
                classes.alignCenter,
                classes.flexWrap
              )}
            >
              {/* <Grid item>
                <Typography variant="body2">
                  {t("historicalData:startDate")}
                </Typography>
              </Grid> */}
              <Grid item className="marginRight">
                <Typography variant="body2">
                  {t("historicalData:startDate")}
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                        setClickDate("");
                      }}
                      format="DD-MM-YYYY HH:mm"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              {/* <Grid item md={1}>
                <Typography variant="body2" className="marginRight">
                  {t("historicalData:endDate")}
                </Typography>
              </Grid> */}
              <Grid item className="marginRight">
                <Typography variant="body2" className="marginRight">
                  {t("historicalData:endDate")}
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      value={valueEnd}
                      onChange={(newValue) => setValueEnd(newValue)}
                      format="DD-MM-YYYY HH:mm"
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
                    disabled={point && point.length > 0 && deviceName ? false : true}
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
                classes.marginTop,
                classes.flexWrap
              )}
            >
              <Grid className={classes.disPlayFlexRow}>
                {/* <Link href="#" underline="always"> */}
                <Typography
                  variant="body2"
                  className={`${
                    clickDate === "past24"
                      ? classes.activeBar
                      : classes.cursorPointer
                  }`}
                  onClick={() => {
                    handleClickNavbar("past24");
                    setValue(null);
                    setValueEnd(null);
                  }}
                >
                  {t("historicalData:hr")}
                </Typography>

                {/* </Link> */}
                {/* <Link href="#" underline="hover" className="colorTextLink"> */}
                <Typography
                  variant="body2"
                  className={`${
                    clickDate === "past7"
                      ? classes.activeBar
                      : classes.cursorPointer
                  }`}
                  onClick={() => {
                    handleClickNavbar("past7");
                    setValue(null);
                    setValueEnd(null);
                  }}
                >
                  {t("historicalData:date")}
                </Typography>
                {/* </Link> */}
                {/* <Link href="#" underline="hover" className="colorTextLink"> */}
                <Typography
                  variant="body2"
                  className={`${
                    clickDate === "past30"
                      ? classes.activeBar
                      : classes.cursorPointer
                  }`}
                  onClick={() => {
                    handleClickNavbar("past30");
                    setValue(null);
                    setValueEnd(null);
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
            <Charts isLoading={isLoading} dataSearch={dataSearch} />
          </Grid>
        ) : (
          <Grid item className="mt-4">
            <DataTable isLoading={isLoading} dataSearch={dataSearch} />
          </Grid>
        )}
      </Container>
    </>
  );
};

Calendar.propTypes = {
  t: PropTypes.func,
  deviceId: PropTypes.string,
  deviceName: PropTypes.string,
  point: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
    token: state.token,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    loading: (value) => dispatch(loading(value)),
    checkAuthen: () => dispatch(checkAuthen()),
    checkLogin: () => dispatch(checkLogin()),
    // checkToken: () => dispatch(checkToken()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
