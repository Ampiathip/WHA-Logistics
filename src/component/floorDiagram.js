import React, { useState, useEffect } from "react";
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

const rows = [
  createData(
    "RM10012",
    "RM10012",
    "2022-03-10",
    "2022-03-17",
    "2022-03-17",
    2900,
    1800,
    1100,
    6.5,
    7150
  ),
  createData(
    "RM10012",
    "RM10012",
    "2022-03-10",
    "2022-03-17",
    "2022-03-17",
    2900,
    1800,
    1100,
    6.5,
    7150
  ),
  createData(
    "RM10012",
    "RM10012",
    "2022-03-10",
    "2022-03-17",
    "2022-03-17",
    2900,
    1800,
    1100,
    6.5,
    7150
  ),
  createData(
    "RM10012",
    "RM10012",
    "2022-03-10",
    "2022-03-17",
    "2022-03-17",
    2900,
    1800,
    1100,
    6.5,
    7150
  ),
  createData(
    "RM10012",
    "RM10012",
    "2022-03-10",
    "2022-03-17",
    "2022-03-17",
    2900,
    1800,
    1100,
    6.5,
    7150
  ),
];

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
  const [valueDateStart, setValueDateStart] = useState(null);
  const [valueDateEnd, setValueDateEnd] = useState(null);

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
    }
    console.log("token", token, login);
  }, [token]);

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
    getFloorList(buildingId);
  };

  const handleSelectFloor = (event) => {
    const floorId = event.target.value;
    setFloorSelect(floorId);
  };

  const handleSelectUnitType = (event) => {
    const unitId = event.target.value;
    setUnitTypeSelect(unitId);
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

  const renderCard = () => {
    const listBox = [
      {
        id: 0,
        name: t("floorDiagram:NoData"),
        color: "#C4C4C4",
        data: [0],
      },
      {
        id: 1,
        name: t("floorDiagram:20kWh"),
        color: "#FFF1F0",
        data: [2, 2],
      },
      {
        id: 2,
        name: t("floorDiagram:40kWh"),
        color: "#FFCCC7",
        data: [21, 29],
      },
      {
        id: 3,
        name: t("floorDiagram:60kWh"),
        color: "#FF7875",
        data: [51, 67],
      },
      {
        id: 4,
        name: t("floorDiagram:70kWh"),
        color: "#F5222D",
        data: [61, 71],
      },
      {
        id: 5,
        name: t("floorDiagram:70kWh"),
        color: "#F5222D",
        data: [61, 71],
      },
    ];

    return listBox.map((box) => {
      return (
        <Grid item>
          {box.data.map((card) => {
            if (card > 0 && card < 20) {
              return (
                <Card
                  className={clsx(classes.marginRow, classes.cursor)}
                  onClick={() => handleModalFloor()}
                >
                  <CardContent
                    style={{ backgroundColor: box.color }}
                  ></CardContent>
                  <CardActions className={classes.displayNone}>
                    <Grid item className={clsx(classes.flexRow)}>
                      <Typography variant="caption">RM10020</Typography>
                      <Typography
                        variant="caption"
                        className={classes.marginLeft}
                      >
                        2 kWh
                      </Typography>
                    </Grid>
                    <Typography
                      variant="subtitle1"
                      className={classes.textAling}
                    >
                      Shop 20
                    </Typography>
                  </CardActions>
                </Card>
              );
            } else if (card > 20 && card < 40) {
              return (
                <Card
                  className={clsx(classes.marginRow, classes.cursor)}
                  onClick={() => handleModalFloor()}
                >
                  <CardContent
                    style={{ backgroundColor: box.color }}
                  ></CardContent>
                  <CardActions className={classes.displayNone}>
                    <Grid item className={clsx(classes.flexRow)}>
                      <Typography variant="caption">RM10020</Typography>
                      <Typography
                        variant="caption"
                        className={classes.marginLeft}
                      >
                        2 kWh
                      </Typography>
                    </Grid>
                    <Typography
                      variant="subtitle1"
                      className={classes.textAling}
                    >
                      Shop 20
                    </Typography>
                  </CardActions>
                </Card>
              );
            } else if (card > 40 && card < 60) {
              return (
                <Card
                  className={clsx(classes.marginRow, classes.cursor)}
                  onClick={() => handleModalFloor()}
                >
                  <CardContent
                    style={{ backgroundColor: box.color }}
                  ></CardContent>
                  <CardActions className={classes.displayNone}>
                    <Grid item className={clsx(classes.flexRow)}>
                      <Typography variant="caption">RM10020</Typography>
                      <Typography
                        variant="caption"
                        className={classes.marginLeft}
                      >
                        2 kWh
                      </Typography>
                    </Grid>
                    <Typography
                      variant="subtitle1"
                      className={classes.textAling}
                    >
                      Shop 20
                    </Typography>
                  </CardActions>
                </Card>
              );
            } else if (card > 60) {
              return (
                <Card
                  className={clsx(classes.marginRow, classes.cursor)}
                  onClick={() => handleModalFloor()}
                >
                  <CardContent
                    style={{ backgroundColor: box.color }}
                  ></CardContent>
                  <CardActions className={classes.displayNone}>
                    <Grid item className={clsx(classes.flexRow)}>
                      <Typography variant="caption">RM10020</Typography>
                      <Typography
                        variant="caption"
                        className={classes.marginLeft}
                      >
                        2 kWh
                      </Typography>
                    </Grid>
                    <Typography
                      variant="subtitle1"
                      className={classes.textAling}
                    >
                      Shop 20
                    </Typography>
                  </CardActions>
                </Card>
              );
            }
          })}
        </Grid>
      );
    });
  };

  const handleModalFloor = () => {
    setModalViewFloor(true);
  };

  const handleCloseView = () => {
    setModalViewFloor(false);
  };

  const handleChangeValueTab = (event, newValue) => {
    setValueTab(newValue);
  };

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
              <Grid item className={clsx(classes.flexRow)}>
                <Grid item md={6}>
                  <Card>
                    <CardContent className={classes.textAling}>
                      <Typography variant="subtitle1">
                        {t("floorDiagram:monthly")}
                      </Typography>
                      <Typography variant="h6">2165.39 kWh</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item md={6}>
                  <Card>
                    <CardContent className={classes.textAling}>
                      <Typography variant="subtitle1">
                        {t("floorDiagram:cO2")}
                      </Typography>
                      <Typography variant="h6">1082.70 kg</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Grid item className={clsx(classes.flexRow, classes.marginRow)}>
                {renderBoxColor()}
              </Grid>

              <Grid item className={clsx(classes.marginRow)}>
                <Typography variant="h5">{`Type : ${
                  unitType.find((f) => f.id === unitTypeSelect)?.type
                } `}</Typography>
              </Grid>
              <Grid item className={clsx(classes.flexRow, classes.marginRow)}>
                <Grid item md={6}>
                  <Card>
                    <CardContent className={classes.textAling}>
                      <Typography variant="subtitle1">
                        {t("floorDiagram:monthly")}
                      </Typography>
                      <Typography variant="h6">2165.39 kWh</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item md={6}>
                  <Card>
                    <CardContent className={classes.textAling}>
                      <Typography variant="subtitle1">
                        {t("floorDiagram:cO2")}
                      </Typography>
                      <Typography variant="h6">1082.70 kg</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Grid
                item
                className={clsx(classes.flexRow, classes.justifyBetween)}
              >
                {renderCard()}
              </Grid>
            </Grid>
          </Grid>

          {/* Image */}
          <Grid
            item
            md={12}
            className={clsx(
              classes.flexRow,
              classes.positonRa,
              classes.marginRow
            )}
          >
            <Grid item md={4} className={classes.positonAbs}>
              <Card>
                <CardMedia
                  component="img"
                  image={process.env.PUBLIC_URL + `img/floor2.png`}
                  alt="image Floor"
                  className={clsx(classes.imgWidth, classes.imageBox)}
                />
              </Card>
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
                          <Typography variant="h5">Name : A4.1</Typography>
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
                            <Typography variant="h6">: RM10012</Typography>
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
                            <Typography variant="h6">: Shop Floor1</Typography>
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
                            <Typography variant="h6">: 1st floor</Typography>
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
                            <Typography variant="h6">: JCA BUILDING</Typography>
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
                          <Typography variant="h6">2165.39 kWh</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item md={6}>
                      <Card className={classes.boxColor}>
                        <CardContent className={classes.textAling}>
                          <Typography variant="subtitle1">
                            {t("floorDiagram:cO2")}
                          </Typography>
                          <Typography variant="h6">1082.70 kg</Typography>
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
                {console.log("### valuetab", valuetab)}
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
                        onChange={(newValue) => setValueDateStart(newValue)}
                        format="DD-MM-YYYY"
                      />
                      <DatePicker
                        className={classes.width}
                        value={valueDateEnd}
                        onChange={(newValue) => setValueDateEnd(newValue)}
                        format="DD-MM-YYYY"
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
                    <Typography variant="h5">
                      {t("floorDiagram:electrical", { name: valuetab })}
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
                            {row.name}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSizeCol}
                          >
                            {row.calories}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSizeCol}
                          >
                            {row.fat}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSizeCol}
                          >
                            {row.carbs}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSizeCol}
                          >
                            {row.protein}
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
                            {row.previous}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSizeCol}
                          >
                            {row.total}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSizeCol}
                          >
                            {row.rate}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSizeCol}
                          >
                            {row.totalCharge}
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
