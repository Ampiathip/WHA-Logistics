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
  FormControl,
  Select,
  MenuItem,
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
import Charts from "./charts";
import DataTable from "./table";
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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import * as ExcelJS from "exceljs";
import { saveAs } from 'file-saver';
// import ReactExport from "react-export-excel";

// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const API = apis.getAPI();
const MySwal = withReactContent(Swal);

const useStyles = makeStyles((theme) => ({
  FlexIconHead: {
    display: "flex",
    justifyContent: "space-around",
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
  paddingCard: {
    paddingBottom: 10,
  },
  disPlayFlexRowEnd: {
    display: "flex",
    justifyContent: "end",
  },
  marginRight: {
    marginRight: 15,
  },
  fontSizeData: {
    fontSize: "16px !important",
  },
}));

const CalendarUnit = ({ t, deviceId, deviceName, point }) => {
  const classes = useStyles();
  const [value, setValue] = useState(null);
  const [valueEnd, setValueEnd] = useState(null);

  const dispatch = useDispatch();
  const sideBar = useSelector((state) => state.sidebar);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const theme = useTheme();

  const [clickBtn, setClickBtn] = useState("table");
  // const [clickDate, setClickDate] = useState("past24");
  // const [table, setTable] = useState("");
  // const [graph, setGraph] = useState("");
  // const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dataSearch, setDataSearch] = useState([]);
  // const [dataSearch, setDataSearch] = useState();
  // const [timestampSearch, setTimestamp] = useState();
  const [buildingList, setBuildingList] = useState([]);
  const [buildingSelect, setBuildingSelect] = useState("none");

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

  useEffect(() => {
    dispatch(checkToken());
    if (!_.isEmpty(token)) {
      getBuilding();
    }
    console.log("token", token);
  }, [token]);

  const handleClickTable = () => {
    setClickBtn("table");
  };

  const getBuilding = async () => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getBuildingData().then((response) => {
        const dataPayload = response.data;
        setBuildingList(dataPayload);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      const response = error.response;
      swalFire(response.data);
      setIsLoading(false);
    }
  };

  const handleSelectBuilding = (event) => {
    const buildingId = event.target.value;
    setBuildingSelect(buildingId);
  };

  // const handleClickGraph = () => {
  //   setClickBtn("graph");
  // };

  const handleClickSearch = async () => {
    setIsLoading(true);
    try {
      let startDate = value ? value.format("YYYY-MM-DD") : "";
      await API.connectTokenAPI(token);
      await API.getHistoricaldataReport(buildingSelect, startDate).then(
        (response) => {
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
        }
      );
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

  // const handleClickNavbar = (text) => {
  //   setClickDate(text);
  // };

  const exportToExcel = async (groupedData, dataSearch) => {
    // console.log("# 3333333333", groupedData, dataSearch);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    // เพิ่มหัวข้อตาราง
    worksheet.addRow(['Timestamp', '', ...dataSearch.map(device => device.deviceName)]);
  
    // เพิ่มข้อมูลจาก groupedData
    groupedData.forEach((group, timestampIndex) => {
      const rowValues = [group.timestamp, '']; // ใส่ค่าว่างใน column 2
      
      dataSearch.forEach(device => {
        const dataValue = device.data[timestampIndex]?.data || '';
        rowValues.push(dataValue);
      });
  
      worksheet.addRow(rowValues);
    });

    // Create a buffer with the Excel file
    const buffer = await workbook.xlsx.writeBuffer();

    // Create a Blob from the buffer
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a download link and trigger a click event to download the file
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "exportedData.xlsx";
    link.click();
  };

  const groupedData = dataSearch.reduce((result, item) => {
    item.data.forEach((time, timestampIndex) => {
      if (!result[timestampIndex]) {
        result[timestampIndex] = {
          timestamp: time.timestamp,
          devices: [],
        };
      }
      result[timestampIndex].devices.push(item.data[timestampIndex]?.data);
    });
    return result;
  }, []);

  // console.log("##### ======>>>groupedData", groupedData);

  return (
    <>
      <Container>
        <Box className={clsx(classes.marginTop)}>
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

                <Grid item md={3}>
                  <FormControl variant="outlined" size="small" fullWidth>
                    <Grid item className={classes.paddingCard}>
                      <Typography variant="body2">
                        {t("building:buildingName")}
                      </Typography>
                    </Grid>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={buildingSelect}
                      placeholder={t("floor:filterBuild")}
                      onChange={handleSelectBuilding}
                    >
                      <MenuItem value="none" disabled>
                        {t("floor:filterBuild")}
                      </MenuItem>
                      {buildingList.length > 0 &&
                        buildingList.map((item) => {
                          return (
                            <MenuItem
                              id={"selectbillingType-" + item.id}
                              key={item.id}
                              value={item.id}
                            >
                              {item.name}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item className="marginRight">
                  <Typography variant="body2">
                    {t("historicalData:startDate")}
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        value={value}
                        onChange={(newValue) => {
                          setValue(newValue);
                          // setClickDate("");
                        }}
                        format="YYYY-MM-DD"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                {/* <Grid item md={1}>
                <Typography variant="body2" className="marginRight">
                  {t("historicalData:endDate")}
                </Typography>
              </Grid> */}
                {/* <Grid item className="marginRight">
                <Typography variant="body2" className="marginRight">
                  {t("historicalData:endDate")}
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      value={valueEnd}
                      onChange={(newValue) => setValueEnd(newValue)}
                      format="YYYY-MM-DD HH:mm"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid> */}
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
                  {/* <div className="marginBtn">
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
                </div> */}
                  <div className="marginBtn">
                    <Button
                      variant="contained"
                      className={classes.activeBtn}
                      onClick={handleClickSearch}
                      disabled={
                        buildingSelect !== "none" && value ? false : true
                      }
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
                  // classes.disPlayFlexRowEnd,
                  classes.alignCenter,
                  classes.marginTop,
                  classes.flexWrap
                )}
              >
                {/* <Grid className={classes.disPlayFlexRow}>
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
              </Grid> */}
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
                {/* <Grid item md={2}></Grid> */}
                <Grid item md={12} className={classes.disPlayFlexRowEnd}>
                  <div>
                    <img
                      src={process.env.PUBLIC_URL + "/img/excel.png"}
                      alt="img-logo-excel"
                      className={clsx(
                        classes.marginRight,
                        classes.cursorPointer
                      )}
                      onClick={() => exportToExcel(groupedData, dataSearch)}
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

          {isLoading ? (
            <Box mt={4} width={1} display="flex" justifyContent="center">
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <Grid item className={classes.marginTop}>
              {dataSearch.length > 0 && (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead className={classes.FlexIconHead}>
                      <TableRow>
                        <TableCell align="center">Timestamp</TableCell>
                        {dataSearch.map((device, index) => (
                          <TableCell key={index} align="center">
                            {device.deviceName}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {groupedData.map((group, timestampIndex) => (
                        <TableRow key={timestampIndex}>
                          <TableCell
                            className={classes.fontSizeData}
                            align="center"
                          >
                            {group.timestamp}
                          </TableCell>
                          {dataSearch.map((device, deviceIndex) => (
                            <TableCell
                              className={classes.fontSizeData}
                              key={deviceIndex}
                              align="center"
                            >
                              {device.data[timestampIndex] &&
                                device.data[timestampIndex].data}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                      {/* {dataSearch.length > 0 &&
                        dataSearch?.data.length > 0 &&
                        dataSearch.map((item, dataSearchIndex) => {
                          return item.data.map((time, timestampIndex) => {
                            return (
                              <TableRow key={dataSearchIndex}>
                                <TableCell className={classes.fontSizeData} align="center">
                                  {time.timestamp}
                                </TableCell>
                                {dataSearch.map((device, deviceIndex) => (
                                  <TableCell
                                    className={classes.fontSizeData}
                                    key={deviceIndex}
                                    align="center"
                                  >
                                    Assuming data is an array of objects with a 'timestamp' and 'data' property
                                    {device.data[timestampIndex] &&
                                      device.data[timestampIndex].data}
                                  </TableCell>
                                ))}
                              </TableRow>
                            );
                          });
                        })} */}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Grid>
          )}

          {/* {clickBtn === "graph" ? (
          <Grid item className="mt-4">
            <Charts isLoading={isLoading} dataSearch={dataSearch} />
          </Grid>
        ) : (
          <Grid item className="mt-4">
            <DataTable isLoading={isLoading} dataSearch={dataSearch} />
          </Grid>
        )} */}
        </Box>
      </Container>
    </>
  );
};

CalendarUnit.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(CalendarUnit);
