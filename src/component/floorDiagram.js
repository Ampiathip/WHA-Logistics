import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import PropTypes from "prop-types";
import {
  checkAuthen,
  checkLogin,
  loading,
  checkToken,
  logout,
} from "../js/actions";
import {
  makeStyles,
  Grid,
  Container,
  Typography,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  Card,
  CardContent,
} from "@material-ui/core";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useTheme } from "@mui/material/styles";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import _, { stubFalse } from "lodash";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import apis from "../js/apis";

import IconDelete from "../images/icon/Vectorbin.svg";
import IconEdit from "../images/icon/EditFloor.svg";

const API = apis.getAPI();
const MySwal = withReactContent(Swal);

const useStyles = makeStyles((theme) => ({
  flexRow: {
    display: "flex",
  },
  disPlayFlexRow: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  imageCenter: {
    alignSelf: "center",
  },
  marginRow: {
    marginTop: 20,
  },
  imageBox: {
    objectFit: "scale-down",
    objectPosition: "center",
  },
  justifyAround: {
    justifyContent: "space-around",
  },
  borderBottom: {
    borderBottom: "1px solid #D9D9D9",
    paddingBottom: 10,
  },
  marginTopCol: {
    marginTop: 10,
  },
  textAling: {
    textAlign: "center",
  },
  marginRowBox: {
    marginTop: 40,
  },
  borderboxIcon: {
    borderBottom: "1px solid #2196F3",
    color: "#2196F3",
  },
  cursor: {
    cursor: "pointer",
  },
  paddingCard: {
    paddingBottom: 10,
  },
  marginLeft: {
    marginLeft: 10,
  },
  borderText: {
    borderBottom: "3px solid #F7CD46",
  },
  justifyBetween: {
    justifyContent: "space-between",
  },
  justifyEnd: {
    justifyContent: "end",
  },
  positonRa: {
    position: "relative",
  },
  positonAbs: {
    position: "absolute",
    top: "-300px",
    left: 30,
  },
  box: {
    width: "25px",
    height: "25px",
    // backgroundColor: "#3498db",
    // transform: "rotate(45deg)",
    // margin: 50,
  },
  boxColor: {
    backgroundColor: "#D9D9D9",
  },
  displayNone: {
    display: "grid",
  },
  modalWidth: {
    width: "90% !important",
    height: "90% !important",
    maxWidth: "none !important",
  },
  imgWidth: {
    width: "-webkit-fill-available",
  },
  borderRadius: {
    borderRadius: "50%",
    overflow: "hidden",
  },
  width: {
    width: "100%",
  },
  boxHead: {
    border: "1px solid #D9D9D9",
    padding: 10,
    alignSelf: "end",
    width: "100%",
    textAlign: "center",
  },
  boxHeadSelect: {
    border: "1px solid #1890FF",
    padding: 10,
    alignSelf: "end",
    width: "100%",
    textAlign: "center",
    backgroundColor: "#1890FF",
    color: "#fff",
  },
  fontSizeHead: {
    fontSize: "14px !important",
  },
  fontSizeCol: {
    fontSize: "12px !important",
  },
}));

function createData(
  name,
  calories,
  fat,
  carbs,
  protein,
  recent,
  previous,
  total,
  rate,
  totalCharge
) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    recent,
    previous,
    total,
    rate,
    totalCharge,
  };
}

// const rows = [
//   createData(
//     "RM10012",
//     "RM10012",
//     "2022-03-10",
//     "2022-03-17",
//     "2022-03-17",
//     2900,
//     1800,
//     1100,
//     6.5,
//     7150
//   ),
//   createData(
//     "RM10012",
//     "RM10012",
//     "2022-03-10",
//     "2022-03-17",
//     "2022-03-17",
//     2900,
//     1800,
//     1100,
//     6.5,
//     7150
//   ),
//   createData(
//     "RM10012",
//     "RM10012",
//     "2022-03-10",
//     "2022-03-17",
//     "2022-03-17",
//     2900,
//     1800,
//     1100,
//     6.5,
//     7150
//   ),
//   createData(
//     "RM10012",
//     "RM10012",
//     "2022-03-10",
//     "2022-03-17",
//     "2022-03-17",
//     2900,
//     1800,
//     1100,
//     6.5,
//     7150
//   ),
//   createData(
//     "RM10012",
//     "RM10012",
//     "2022-03-10",
//     "2022-03-17",
//     "2022-03-17",
//     2900,
//     1800,
//     1100,
//     6.5,
//     7150
//   ),
// ];

const FloorDiagram = ({ t, login }) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const sideBar = useSelector((state) => state.sidebar);
  const token = useSelector((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);
  const [buildingList, setBuildingList] = useState([]);
  const [buildingSelect, setBuildingSelect] = useState("none");
  const [floorList, setFloorList] = useState([]);
  const [floorSelect, setFloorSelect] = useState("none");
  const [unitType, setUnitType] = useState([]);
  const [unitTypeSelect, setUnitTypeSelect] = useState("none");
  const [numberSelect, setNumberSelect] = useState("none");
  const [modalViewFloor, setModalViewFloor] = useState(false);

  const fullScreen = useMediaQuery(theme.breakpoints.down("xl"));
  const [valuetab, setValueTab] = useState("Invoice");
  const [valueDateStart, setValueDateStart] = useState(
    dayjs().subtract(30, "day")
  );
  const [valueDateEnd, setValueDateEnd] = useState(dayjs());

  const [emissionsFloor, setEmissionsFloor] = useState(0);
  const [energyConsumtionFloor, setEnergyConsumtionFloor] = useState(0);
  const [emissionsType, setEmissionsType] = useState(0);
  const [energyConsumtionType, setEnergyConsumtionType] = useState(0);
  // const [typeName, setTypeName] = useState("");
  // const [unitData, setUnitData] = useState([]);
  const [floorName, setFloorName] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [measurementList, setMeasurementList] = useState([]);
  const [measurementSelect, setMeasurementSelect] = useState("");
  const [measurementName, setMeasurementName] = useState("");
  const [unitId, setUnitId] = useState("");
  const [unitName, setUnitName] = useState("");
  const [rows, setRows] = useState([]);
  const [unitTypeData, setUnitTypeData] = useState([]);

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
      getUnitTypeList();
      getMeasurementTypeData();
    }
    console.log("token", token, login);
  }, [token]);

  // get getMeasurementTypeData //
  const getMeasurementTypeData = async () => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getMeasurementTypeData().then((response) => {
        const dataPayload = response.data;
        // console.log("#Nan vvvvvv", dataPayload);
        setMeasurementList(dataPayload);
        dataPayload.map((item, index) => {
          if (item.measurement_type === "Electrical") {
            setMeasurementSelect(item.id);
            setMeasurementName(item.measurement_type);
          }
        });
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      const response = error.response;
      swalFire(response.data);
      setIsLoading(false);
    }
  };

  // get Unit Type //
  const getUnitTypeList = async () => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getUnitTypeList().then((response) => {
        const dataPayload = response.data;
        setUnitType(dataPayload);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      const response = error.response;
      swalFire(response.data);
      setIsLoading(false);
    }
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

  const getFloorList = async (id) => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getFloorList(id).then((response) => {
        const dataPayload = response.data;
        setFloorList(dataPayload);
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
    setBuildingName(buildingList.find((f) => f.id === buildingId).name);
    getFloorList(buildingId);
  };

  const handleSelectFloor = (event) => {
    const floorId = event.target.value;
    setFloorSelect(floorId);
    setFloorName(floorList.find((f) => f.id === floorId).floor);
    // if (unitTypeSelect !== "none") {
    //   handleSearch(buildingSelect, floorId, unitTypeSelect);
    // } else {
    //   handleSearch(buildingSelect, floorId);
    // }
  };

  const handleSelectUnitType = (event) => {
    const unitId = event.target.value;
    setUnitTypeSelect(unitId);
    // handleSearch(buildingSelect, floorSelect, unitId);
  };

  const handleSelectNumber = (event) => {
    const number = event.target.value;
    setNumberSelect(number);
  };

  const renderBoxColor = () => {
    const listBox = [
      {
        id: 0,
        name: t("floorDiagram:NoData"),
        color: "#C4C4C4",
        data: null,
      },
      {
        id: 1,
        name: t("floorDiagram:20kWh"),
        color: "#FFF1F0",
        data: 0 - 20,
      },
      {
        id: 2,
        name: t("floorDiagram:40kWh"),
        color: "#FFCCC7",
        data: 20 - 40,
      },
      {
        id: 3,
        name: t("floorDiagram:60kWh"),
        color: "#FF7875",
        data: 40 - 60,
      },
      {
        id: 4,
        name: t("floorDiagram:70kWh"),
        color: "#F5222D",
        data: 60,
      },
    ];

    return listBox.map((box) => {
      return (
        <Grid item md={4} className={clsx(classes.disPlayFlexRow)}>
          <div
            item
            className={clsx(classes.box)}
            style={{ backgroundColor: box.color }}
          ></div>
          <Typography
            variant="subtitle1"
            className={clsx(classes.marginLeft, classes.imageCenter)}
          >
            {box.name}
          </Typography>
        </Grid>
      );
    });
  };

  const renderCard = (unitData, indexRow) => {
    if (unitData.length > 0) {
      return unitData.map((item) => {
        // console.log('####6666666', item, indexRow);
        return (
          <Grid item md={4}>
            <Card
              className={clsx(classes.marginRow, classes.cursor)}
              onClick={() =>
                handleModalFloor(item.unitID, item.unitName, indexRow)
              }
            >
              <CardContent
                style={{ backgroundColor: handleChangeColor(item) }}
              ></CardContent>
              <CardActions className={classes.displayNone}>
                <Grid item className={clsx(classes.flexRow)}>
                  <Typography variant="caption">{item.unitName}</Typography>
                  <Typography variant="caption" className={classes.marginLeft}>
                    {item.energyConsumtionUnit.toFixed(2)} kWh
                  </Typography>
                </Grid>
                {/* <Typography
                  variant="caption"
                  className={clsx(classes.textAling)}
                >
                  {item.energyConsumtionUnit.toFixed(2)} kWh
                </Typography> */}
              </CardActions>
            </Card>
          </Grid>
        );
      });
    } else {
      return <div>No data available</div>;
    }
  };

  const handleChangeColor = (item) => {
    let backgroundColor;
    const formattedNumber = parseInt(item.energyConsumtionUnit.toFixed(0));

    if (formattedNumber === 0) {
      backgroundColor = "#C4C4C4";
    } else if (formattedNumber < 20) {
      backgroundColor = "#FFF1F0";
    } else if (formattedNumber < 40) {
      backgroundColor = "#FFCCC7";
    } else if (formattedNumber < 60) {
      backgroundColor = "#FF7875";
    } else if (formattedNumber > 60) {
      backgroundColor = "#F5222D";
    }

    return backgroundColor;
  };

  const handleModalFloor = (item, name, indexRow) => {
    console.log("7###7777777", item, name, indexRow, unitTypeData);
    setModalViewFloor(true);
    setUnitId(item);
    setUnitName(name);
    unitTypeData && unitTypeData.length > 0 && unitTypeData.map((view, indexRowview) => {
      if (indexRow === indexRowview) {
        setEmissionsType(view.CO2EmissionsType);
        setEnergyConsumtionType(view.energyConsumtionType);
      }
    })
  };

  const handleCloseView = () => {
    setModalViewFloor(false);
  };

  const handleChangeValueTab = (event, newValue) => {
    setValueTab(newValue);
  };

  useEffect(() => {
    // if (buildingSelect !== "none" && floorSelect !== "none") {
    //   handleSearch(buildingSelect, floorSelect);
    // } else if (buildingSelect !== "none" && floorSelect !== "none" && unitTypeSelect !== "none") {
    //   handleSearch(buildingSelect, floorSelect, unitTypeSelect);
    // }
    handleSearch(buildingSelect, floorSelect, unitTypeSelect);
  }, [buildingSelect, floorSelect, unitTypeSelect]);

  const handleSearch = async (buildingId, floorId, unitId) => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getFloorDiagramList(buildingId, floorId, unitId).then(
        (response) => {
          const dataPayload = response.data;
          // console.log("## dataPayloadFloor", dataPayload);
          setEmissionsFloor(dataPayload.CO2EmissionsFloor);
          setEnergyConsumtionFloor(dataPayload.energyConsumtionFloor);
          setUnitTypeData(dataPayload.unitType);
          // if (dataPayload.unitType.length > 0) {
          //   dataPayload.unitType.map((item, indexRow) => {
          //     console.log("## itemmmm====", item, indexRow);
              // setEmissionsType((prevState) => ({
              //   ...prevState,
              //   [indexRow]: item.CO2EmissionsType,
              // }));

              // setEnergyConsumtionType((prevState) => ({
              //   ...prevState,
              //   [indexRow]: item.energyConsumtionType,
              // }));
              // setEmissionsType(item.CO2EmissionsType);
              // setEnergyConsumtionType(item.energyConsumtionType);
              // setTypeName(item.typeName);
              // setUnitData(item.unitData);
          //   });
          // } else {
          //   setEmissionsType(0);
          //   setEnergyConsumtionType(0);
            // setTypeName("");
            // setUnitData([]);
          // }

          setIsLoading(false);
        }
      );
    } catch (error) {
      console.log(error);
      const response = error.response;
      swalFire(response.data);
      setIsLoading(false);
    }
  };

  const handleValue = (newValue) => {
    console.log("###", newValue);
    setValueDateStart(newValue);
  };

  const handleValueEnd = (newValue) => {
    setValueDateEnd(newValue);
  };

  const handleBoxIcon = async (event, name, index) => {
    console.log("#Nan 888888888", name, index);
    setMeasurementSelect(name.id);
  };

  const renderViewBox = (item, index) => {
    const listImg = [
      {
        id: 0,
        name: t("home:electric"),
        type: "Electrical",
      },
      {
        id: 1,
        name: t("home:cold"),
        type: "Air",
      },
      {
        id: 2,
        name: t("home:hot"),
        type: "Hot",
      },
      {
        id: 3,
        name: t("home:cool"),
        type: "Cold",
      },
    ];
    return (
      <Grid
        item
        className={clsx(
          item.id == measurementSelect ? classes.borderboxIcon : "",
          classes.cursor
        )}
        onClick={(e) => handleBoxIcon(e, item, index)}
      >
        {listImg.map((img) => {
          if (img.type === item.measurement_type) {
            return (
              <Typography variant="h6" className={classes.marginLeft}>
                {img.name}
              </Typography>
            );
          }
        })}
      </Grid>
    );
  };

  const handleSearchInvoiceUnit = async (
    unitId,
    dateStart,
    dateEnd,
    measurement
  ) => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getInvoiceUnitList(
        unitId,
        dateStart,
        dateEnd,
        measurement
      ).then((response) => {
        const dataPayload = response.data;
        console.log("## dataPayload", response, dataPayload);
        setRows(dataPayload);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      const response = error.response;
      swalFire(response.data);
      setIsLoading(false);
    }
  };

  // console.log("#### ====unitTypeData", emissionsType, energyConsumtionType);

  return (
    <Box className={classes.marginRow}>
      {isLoading ? (
        <Box mt={4} width={1} display="flex" justifyContent="center">
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
          <Grid
            item
            md={12}
            className={clsx(classes.flexRow, classes.justifyAround)}
          >
            <Grid item md={4}>
              <Card>
                <CardContent>
                  <FormControl variant="outlined" size="small" fullWidth>
                    <Grid item className={classes.paddingCard}>
                      <Typography variant="subtitle1">
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

                  <FormControl variant="outlined" size="small" fullWidth>
                    <Grid item className={classes.paddingCard}>
                      <Typography variant="subtitle1">
                        {t("floor:floorName")}
                      </Typography>
                    </Grid>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={floorSelect}
                      placeholder={t("floor:filterBuild")}
                      onChange={handleSelectFloor}
                    >
                      <MenuItem value="none" disabled>
                        {t("floor:filterFloor")}
                      </MenuItem>
                      {floorList.length > 0 &&
                        floorList.map((item) => {
                          return (
                            <MenuItem
                              id={"selectbillingType-" + item.id}
                              key={item.id}
                              value={item.id}
                            >
                              {item.floor}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>

                  <FormControl variant="outlined" size="small" fullWidth>
                    <Grid item className={classes.paddingCard}>
                      <Typography variant="subtitle1">
                        {t("floor:unitType")}
                      </Typography>
                    </Grid>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={unitTypeSelect}
                      placeholder={t("floor:unitType")}
                      onChange={handleSelectUnitType}
                    >
                      <MenuItem value="none" disabled>
                        {t("floor:unitType")}
                      </MenuItem>
                      {unitType.length > 0 &&
                        unitType.map((item) => {
                          return (
                            <MenuItem
                              id={"selectbillingType-" + item.id}
                              key={item.id}
                              value={item.id}
                            >
                              {item.type}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={7}>
              <Grid item className={clsx(classes.flexRow, classes.justifyEnd)}>
                <Grid item md={2} className={classes.paddingCard}>
                  <Typography variant="subtitle1">
                    {t("floorDiagram:sortBy")}
                  </Typography>
                </Grid>
                <Grid item md={3} className={classes.paddingCard}>
                  <FormControl variant="outlined" size="small" fullWidth>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={numberSelect}
                      placeholder={t("loorDiagram:roomNumber")}
                      onChange={handleSelectNumber}
                    >
                      <MenuItem value="none" disabled>
                        {t("floorDiagram:roomNumber")}
                      </MenuItem>
                      {/* {buildingList.length > 0 &&
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
                        })} */}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item className={clsx(classes.flexRow, classes.marginRow)}>
                <Grid item md={6}>
                  <Card>
                    <CardContent className={classes.textAling}>
                      <Typography variant="subtitle1">
                        {t("floorDiagram:monthly")}
                      </Typography>
                      <Typography variant="h6">
                        {energyConsumtionFloor &&
                          energyConsumtionFloor.toFixed(2)}{" "}
                        kWh
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item md={6}>
                  <Card>
                    <CardContent className={classes.textAling}>
                      <Typography variant="subtitle1">
                        {t("floorDiagram:cO2")}
                      </Typography>
                      <Typography variant="h6">
                        {emissionsFloor && emissionsFloor.toFixed(2)} kg
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Grid item className={clsx(classes.flexRow, classes.marginRow)}>
                {renderBoxColor()}
              </Grid>
            </Grid>
          </Grid>

          {/* Image */}
          <Grid
            item
            md={12}
            className={clsx(
              classes.flexRow,
              classes.justifyAround,
              classes.marginRow
            )}
          >
            <Grid item md={4}>
              <Card>
                <CardMedia
                  component="img"
                  image={process.env.PUBLIC_URL + `img/floor2.png`}
                  alt="image Floor"
                  className={clsx(classes.imgWidth, classes.imageBox)}
                />
              </Card>
            </Grid>
            <Grid item md={7}>
              {unitTypeData &&
                unitTypeData.length > 0 &&
                unitTypeData.map((item, indexRow) => {
                  return (
                    <Grid item key={indexRow}>
                      <Grid item className={indexRow > 0 && classes.marginRow}>
                        <Typography variant="h5">
                          {`Type :`} {item.typeName}
                        </Typography>
                      </Grid>

                      <Grid
                        item
                        className={clsx(classes.flexRow, classes.marginRow)}
                      >
                        <Grid item md={6}>
                          <Card>
                            <CardContent className={classes.textAling}>
                              <Typography variant="subtitle1">
                                {t("floorDiagram:monthly")}
                              </Typography>
                              <Typography variant="h6">
                                {item.energyConsumtionType &&
                                  item.energyConsumtionType.toFixed(2)}{" "}
                                kWh
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                        <Grid item md={6}>
                          <Card>
                            <CardContent className={classes.textAling}>
                              <Typography variant="subtitle1">
                                {t("floorDiagram:cO2")}
                              </Typography>
                              <Typography variant="h6">
                                {item.CO2EmissionsType &&
                                  item.CO2EmissionsType.toFixed(2)}{" "}
                                kg
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      </Grid>
                      <Grid container className={clsx(classes.marginRow)}>
                        {renderCard(item.unitData, indexRow)}
                        {/* {unitData.length > 0 &&
                  unitData.map((data, index) => {
                    console.log('## 9999999999', data);
                    return (
                      <Card
                        className={clsx(classes.marginRow, classes.cursor)}
                        onClick={() => handleModalFloor()}
                      >
                        <CardContent
                          style={{ backgroundColor: handleChangeColor(data) }}
                        ></CardContent>
                        <CardActions className={classes.displayNone}>
                          <Grid item className={clsx(classes.flexRow)}>
                            <Typography variant="caption">
                              {data.unitName}
                            </Typography>
                            <Typography
                              variant="caption"
                              className={classes.marginLeft}
                            >
                              2 kWh
                            </Typography>
                          </Grid>
                          <Typography
                            variant="caption"
                            className={clsx(classes.textAling)}
                          >
                            Shop 20
                          </Typography>
                        </CardActions>
                      </Card>
                    );
                  })} */}
                      </Grid>
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
        </>
      )}

      {/* Modal View */}
      <Dialog
        fullScreen={fullScreen}
        // className={classes.modalWidth}
        open={modalViewFloor}
        onClose={handleCloseView}
        aria-labelledby="responsive-dialog-title-view"
        classes={{
          paper: classes.modalWidth,
        }}
      >
        <DialogTitle id="responsive-dialog-title-view"></DialogTitle>
        <DialogContent>
          {isLoading ? (
            <Box mt={4} width={1} display="flex" justifyContent="center">
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <>
              <Grid
                item
                md={12}
                className={clsx(classes.flexRow, classes.justifyAround)}
              >
                <Grid item md={3}>
                  <img
                    src={process.env.PUBLIC_URL + `img/floor2.png`}
                    alt="img-upload"
                    className={clsx(
                      classes.imgWidth,
                      classes.imageBox,
                      classes.borderRadius
                    )}
                  />
                </Grid>
                <Grid item md={8}>
                  <Card className={classes.boxColor}>
                    <CardContent>
                      <Grid
                        item
                        md={12}
                        className={clsx(classes.flexRow, classes.borderBottom)}
                      >
                        <Grid item md={6}>
                          <Typography variant="h5">
                            Name : {unitName}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          md={6}
                          className={clsx(classes.flexRow, classes.justifyEnd)}
                        >
                          <img src={IconEdit} alt="IconEdit" />
                          <img
                            src={IconDelete}
                            alt="IconDelect"
                            className={classes.marginLeft}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        md={12}
                        className={clsx(classes.flexRow, classes.marginRow)}
                      >
                        <Grid item md={6}>
                          <Grid
                            item
                            className={clsx(
                              classes.flexRow,
                              classes.justifyBetween
                            )}
                          >
                            <Typography variant="subtitle1">
                              {t("floorDiagram:roomNumber")}
                            </Typography>
                            <Typography variant="h6">: </Typography>
                          </Grid>
                          <Grid
                            item
                            className={clsx(
                              classes.flexRow,
                              classes.justifyBetween
                            )}
                          >
                            <Typography variant="subtitle1">
                              {t("floorDiagram:deviceName")}
                            </Typography>
                            <Typography variant="h6">: </Typography>
                          </Grid>
                          <Grid
                            item
                            className={clsx(
                              classes.flexRow,
                              classes.justifyBetween
                            )}
                          >
                            <Typography variant="subtitle1">
                              {t("floorDiagram:subDevice")}
                            </Typography>
                            <Typography variant="h6">: </Typography>
                          </Grid>
                        </Grid>
                        <Grid item md={6}>
                          <Grid
                            item
                            className={clsx(
                              classes.flexRow,
                              classes.justifyAround
                            )}
                          >
                            <Typography variant="subtitle1">
                              {t("floorDiagram:zone")}
                            </Typography>
                            <Typography variant="h6">: </Typography>
                          </Grid>
                          <Grid
                            item
                            className={clsx(
                              classes.flexRow,
                              classes.justifyAround
                            )}
                          >
                            <Typography variant="subtitle1">
                              {t("floorDiagram:floor")}
                            </Typography>
                            <Typography variant="h6">: {floorName}</Typography>
                          </Grid>
                          <Grid
                            item
                            className={clsx(
                              classes.flexRow,
                              classes.justifyAround
                            )}
                          >
                            <Typography variant="subtitle1">
                              {t("floorDiagram:buildingname")}
                            </Typography>
                            <Typography variant="h6">
                              : {buildingName}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  <Grid
                    item
                    className={clsx(classes.flexRow, classes.marginRow)}
                  >
                    <Grid item md={6}>
                      <Card className={classes.boxColor}>
                        <CardContent className={classes.textAling}>
                          <Typography variant="subtitle1">
                            {t("floorDiagram:monthly")}
                          </Typography>
                          <Typography variant="h6">
                            {" "}
                            {energyConsumtionType &&
                              energyConsumtionType.toFixed(2)}{" "}
                            kWh
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item md={6}>
                      <Card className={classes.boxColor}>
                        <CardContent className={classes.textAling}>
                          <Typography variant="subtitle1">
                            {t("floorDiagram:cO2")}
                          </Typography>
                          <Typography variant="h6">
                            {emissionsType && emissionsType.toFixed(2)} kg
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                md={12}
                className={clsx(
                  classes.flexRow,
                  classes.justifyAround,
                  classes.marginRow
                )}
              >
                <Grid
                  item
                  md={6}
                  className={clsx(classes.flexRow, classes.justifyBetween)}
                >
                  <Grid
                    item
                    className={clsx(
                      valuetab === "Invoice"
                        ? classes.boxHeadSelect
                        : classes.boxHead,
                      classes.cursor
                    )}
                    onClick={(e) => handleChangeValueTab(e, "Invoice")}
                  >
                    <Typography variant="subtitle1">
                      {t("floorDiagram:invoice")}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    className={clsx(
                      valuetab === "Device"
                        ? classes.boxHeadSelect
                        : classes.boxHead,
                      classes.cursor
                    )}
                    onClick={(e) => handleChangeValueTab(e, "Device")}
                  >
                    <Typography variant="subtitle1">
                      {t("floorDiagram:device")}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    className={clsx(
                      valuetab === "HistoricalData"
                        ? classes.boxHeadSelect
                        : classes.boxHead,
                      classes.cursor
                    )}
                    onClick={(e) => handleChangeValueTab(e, "HistoricalData")}
                  >
                    <Typography variant="subtitle1">
                      {t("floorDiagram:historicalData")}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item md={5}>
                  <Typography variant="subtitle1">
                    {t("floorDiagram:periodSelection")}
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        className={classes.width}
                        value={valueDateStart}
                        onChange={(newValue) => handleValue(newValue)}
                        format="YYYY-MM-DD"
                      />
                      <DatePicker
                        className={classes.width}
                        value={valueDateEnd}
                        onChange={(newValue) => handleValueEnd(newValue)}
                        format="YYYY-MM-DD"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
              </Grid>

              <Grid
                item
                md={12}
                className={clsx(
                  classes.flexRow,
                  classes.justifyAround,
                  classes.marginRow
                )}
              >
                <Grid
                  item
                  md={6}
                  className={clsx(classes.flexRow, classes.justifyBetween)}
                >
                  <Grid item>
                    <Typography variant="h5" className={classes.flexRow}>
                      {/* {t("floorDiagram:electrical", { name: valuetab })} */}
                      {measurementList.length > 0 &&
                        measurementList
                          .slice()
                          .sort((a, b) => {
                            // If the measurement_type is "Electrical", prioritize it by placing it first
                            if (a.measurement_type === "Electrical") {
                              return -1;
                            } else if (b.measurement_type === "Electrical") {
                              return 1;
                            }
                            // If the measurement_type is "Cold", prioritize it by placing it last
                            if (a.measurement_type === "Cold") {
                              return 1;
                            } else if (b.measurement_type === "Cold") {
                              return -1;
                            }
                            // For other measurement_types, sort in ascending order
                            return a.measurement_type - b.measurement_type;
                          })
                          .map((item, index) => {
                            return renderViewBox(item, index);
                          })}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  md={5}
                  className={clsx(classes.flexRow, classes.justifyEnd)}
                >
                  <Grid item>
                    <img
                      src={process.env.PUBLIC_URL + `img/Search.png`}
                      alt="img-upload"
                      onClick={() =>
                        handleSearchInvoiceUnit(
                          unitId,
                          valueDateStart,
                          valueDateEnd,
                          measurementSelect
                        )
                      }
                      className={classes.cursor}
                    />
                  </Grid>
                  <Grid item className={classes.marginLeft}>
                    <img
                      src={process.env.PUBLIC_URL + `img/Download.png`}
                      alt="img-upload"
                    />
                  </Grid>
                  <Grid item className={classes.marginLeft}>
                    <img
                      src={process.env.PUBLIC_URL + `img/Printer.png`}
                      alt="img-upload"
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                md={12}
                className={clsx(
                  classes.flexRow,
                  classes.justifyAround,
                  classes.marginRow
                )}
              >
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="center"
                          className={classes.fontSizeHead}
                        >
                          Room NO.
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.fontSizeHead}
                        >
                          Meter NO.
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.fontSizeHead}
                        >
                          Issue Date <br />
                          (วันออกบิลค่าไฟฟ้า)
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.fontSizeHead}
                        >
                          Due Date <br />
                          (วันครบกำหนดจ่าย)
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.fontSizeHead}
                        >
                          Payment Date <br />
                          (วันที่ทำการชำระ)
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.fontSizeHead}
                        >
                          Recent
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.fontSizeHead}
                        >
                          Previous
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.fontSizeHead}
                        >
                          Total Use <br />
                          (Unit)
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.fontSizeHead}
                        >
                          Rate <br />( THB/kWh )
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.fontSizeHead}
                        >
                          Total Charge <br />( THB )
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell className={classes.fontSizeCol}>
                            {row.id}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSizeCol}
                          >
                            {row.unit_id}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSizeCol}
                          >
                            {row.issue_date}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSizeCol}
                          >
                            {row.due_date}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSizeCol}
                          >
                            {row.payment_date}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSizeCol}
                          >
                            {row.recent}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSizeCol}
                          >
                            {row.previus}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSizeCol}
                          >
                            {row.total_use}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSizeCol}
                          >
                            {row.currency}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSizeCol}
                          >
                            {row.total_charge}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

FloorDiagram.Prototype = {
  t: PropTypes.string,
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

export default connect(mapStateToProps, mapDispatchToProps)(FloorDiagram);
