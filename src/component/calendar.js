import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import PropTypes, { array } from "prop-types";
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
import * as ExcelJS from "exceljs";
import testData from "../component/dataTest.json";
// import ReactExport from "react-export-excel";

// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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
      point &&
        point.length > 0 &&
        point.map((item) => {
          const data = {
            deviceID: deviceId,
            deviceName: deviceName,
            pointName: item.pointName,
            pointID: item.pointId,
          };
          body.push(data);
        });
      let startDate = value ? value.format("YYYY-MM-DD HH:mm") : "";
      let endDate = valueEnd ? valueEnd.format("YYYY-MM-DD HH:mm") : "";

      console.log("## ===valueEnd", valueEnd);
      await API.connectTokenAPI(token);
      await API.historicaldata(clickDate, startDate, endDate, body).then(
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

  const handleClickNavbar = (text) => {
    setClickDate(text);
  };

  console.log("# ==dataSearch", dataSearch);
  const handleDataSet = (array) => {
    return array.map((item) => {
      if (item[0]?.data instanceof Array) {
        // Remove null values from the data array
        const filteredData = item[0].data.filter((value) => value !== null);
        const filteredTimestamp = item[0].timestamp.filter(
          (value) => value !== null
        );
        return {
          name: item[0]?.point,
          data: filteredData.length > 0 ? filteredData : [0],
          timestamp: filteredTimestamp.length > 0 ? filteredTimestamp : [0],
          device: item[0]?.device,
        };
      } else {
        return item;
      }
    });
  };
  const dataSet = handleDataSet(dataSearch);

  // const exportToExcel = async () => {
  //   const workbook = new ExcelJS.Workbook();
  //   const worksheet = workbook.addWorksheet("Sheet1");

  //   const uniqePoint = Array.from(new Set(testData.flatMap((arr) => arr.map((obj) => obj.point))));
  //   // let timestamp = [];
  //   // let dataSearchArray = [];
  //   // let poinName = [];

  //   worksheet.columns = uniqePoint.map((item) => ({header: item, key: item}));
  //   testData.forEach((data) => {
  //     const obj = {};
  //     data.forEach((a) => {
  //       obj[a.point] = a.point;
  //     })
  //     worksheet.addRow(obj);
  //   })
  // worksheet.addRows([{id: 1, name: 'John Doe', dob: '2023-01-01'}]);

  // Add data to the worksheet
  // dataSearch.forEach((row, index) => {
  //   const labelId = `enhanced-table-checkbox-${index}`;

  //   row.length > 0 &&
  //     row.forEach((item, rowIndex) => {
  //       // Handle Timestamp
  //       item.timestamp.length > 0 &&
  //         item.timestamp.forEach((data) => {
  //           timestamp.push(data);
  //         });

  //       // Handle Data
  //       item.data.length > 0 &&
  //         item.data.forEach((dataItem) => {
  //           dataSearchArray.push(dataItem);
  //         });

  //       // Handle PointName
  //       poinName.push({
  //         id: labelId,
  //         pointName: item.point,
  //       });
  //     });
  // });

  // Add header row
  // worksheet.addRow([
  //   "Timestamp",
  //   "",
  //   ...poinName.map((point) => point.pointName),
  // ]);

  // Add data rows
  // timestamp.forEach((row, timestampIndex) => {
  //   const rowValues = [row, ""]; // Add a blank cell for the second column

  //   // Add data from dataSearchArray
  //   dataSearchArray.forEach((data) => {
  //     const dataValue = data[timestampIndex] || "";
  //     rowValues.push(dataValue);
  //   });

  //   // Add the row to the worksheet
  //   worksheet.addRow(rowValues);
  // });

  // Create a buffer with the Excel file
  // const buffer = await workbook.xlsx.writeBuffer();

  // Create a Blob from the buffer
  // const blob = new Blob([buffer], {
  //   type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  // });

  // Create a download link and trigger a click event to download the file
  //   const link = document.createElement("a");
  //   link.href = URL.createObjectURL(blob);
  //   link.download = "exportedData.xlsx";
  //   link.click();
  // };

  const createTransformedData = () => {
    return dataSearch.flatMap((entry) => {
      return entry.flatMap((item) => [
        { column: `timestamp-${item.point}`, rows: item.timestamp },
        { column: item.point, rows: item.data },
      ]);
    });
  };

  const exportToExcel = () => {
    const transformedData = createTransformedData();

    // console.log("### ======,", transformedData);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    const headers = transformedData.map((columnData) => columnData.column);
    worksheet.addRow(headers);

    // console.log("### ======,headers", headers);
    const firstColumn = worksheet.getColumn(1);
    firstColumn.width = 20; // Set the desired width

    const maxRows = Math.max(
      ...transformedData.map((columnData) => columnData.rows.length)
    );

    const rowsData = Array.from({ length: maxRows }, (_, i) =>
      transformedData.map((columnData) => columnData.rows[i] || "")
    );

    worksheet.addRows(rowsData);

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "exportedData.xls";
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
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
                      format="YYYY-MM-DD HH:mm"
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
                      format="YYYY-MM-DD HH:mm"
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
                    disabled={
                      point && point.length > 0 && deviceName ? false : true
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
                  {/* <ExcelFile
                    element={
                      <img
                        src={process.env.PUBLIC_URL + "/img/excel.png"}
                        alt="img-logo-excel"
                      />
                    }
                  >
                    <ExcelSheet data={dataSet1} name={deviceName}>
                      <ExcelColumn label="Name" value="name" />
                      <ExcelColumn label="Device" value="device" />
                      <ExcelColumn label="Data" value="data" />
                      <ExcelColumn label="Timestamp" value="timestamp" />
                    </ExcelSheet>
                  </ExcelFile> */}
                  <img
                    src={process.env.PUBLIC_URL + "/img/excel.png"}
                    alt="img-logo-excel"
                    onClick={() => exportToExcel()}
                    className={classes.cursorPointer}
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
