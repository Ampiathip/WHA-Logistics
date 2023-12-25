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
import clsx from "clsx";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import _, { stubFalse } from "lodash";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import apis from "../js/apis";

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
    padding: 10,
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
}));

const Dashboard = ({ t, login }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const sideBar = useSelector((state) => state.sidebar);
  const token = useSelector((state) => state.token);
  const buildingId = useSelector((state) => state.building);
  const [isLoading, setIsLoading] = useState(false);
  const [measurementList, setMeasurementList] = useState([]);
  const [measurementSelect, setMeasurementSelect] = useState("");
  const [dashboardList, setDashboardList] = useState([]);
  const [monthly, setMonthly] = useState("monthly");
  const [monthlyTwo, setMonthlyTwo] = useState("monthly");

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
      getMeasurementTypeData();
    }
    // console.log("token", token, login);
  }, [token, buildingId]);

  useEffect(() => {
    dispatch(checkToken());
    if (!_.isEmpty(token) && !_.isEmpty(buildingId)) {
      getDashboardList(buildingId);
    }
    console.log("token", token, login);
  }, [token, buildingId]);

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
          if (index === 0) {
            setMeasurementSelect(item.id);
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

  const getDashboardList = async (buildingId) => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getDashboardList(buildingId).then((response) => {
        const dataPayload = response.data;
        console.log("#### ==== Payyy", dataPayload);
        setDashboardList(dataPayload);
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

  const handleBoxIcon = async (event, name, index) => {
    console.log("#Nan 888888888", name, index);
    setMeasurementSelect(name.id);
  };

  const handleNameMonthly = async (event, name) => {
    setMonthly(name);
  };

  const handleNameMonthlyTwo = async (event, name) => {
    setMonthlyTwo(name);
  };

  const renderViewBox = (item, index) => {
    const listImg = [
      {
        id: 0,
        name: t("home:electric"),
      },
      {
        id: 1,
        name: t("home:cold"),
      },
      {
        id: 2,
        name: t("home:hot"),
      },
      {
        id: 3,
        name: t("home:cool"),
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
          if (index === img.id) {
            return <Typography variant="h6">{img.name}</Typography>;
          }
        })}
      </Grid>
    );
  };

  const renderViewCard = () => {
    const listBox = [
      {
        id: 0,
        name: t("home:bill"),
      },
      {
        id: 1,
        name: t("home:bill"),
      },
      {
        id: 2,
        name: t("home:metric"),
      },
      {
        id: 3,
        name: t("home:treesPlanted"),
      },
    ];

    return listBox.map((img) => {
      return (
        <Grid item md={3}>
          <Card>
            <CardContent className={classes.paddingCard}>
              <Grid item>
                <Typography variant="caption">{img.name}</Typography>
                {img.id === 0 && (
                  <>
                    <Typography
                      variant="caption"
                      className={clsx(classes.borderText, classes.marginLeft)}
                    >
                      {t("home:monthly")}
                    </Typography>
                    <Typography
                      variant="caption"
                      className={classes.marginLeft}
                    >
                      {t("home:last")}
                    </Typography>
                  </>
                )}
                {img.id === 1 && (
                  <>
                    <Typography
                      variant="caption"
                      className={clsx(classes.borderText, classes.marginLeft)}
                    >
                      {t("home:monthly")}
                    </Typography>
                    <Typography
                      variant="caption"
                      className={classes.marginLeft}
                    >
                      {t("home:last")}
                    </Typography>
                  </>
                )}
              </Grid>
              <Grid item>
                {img.id === 0 && (
                  <Grid
                    item
                    className={clsx(classes.flexRow, classes.justifyEnd)}
                  >
                    <Typography variant="h6">20.655</Typography>
                    <Typography variant="h6" className={classes.marginLeft}>
                      {t("home:Baht")}
                    </Typography>
                  </Grid>
                )}
              </Grid>
              <Grid item>
                {img.id === 1 && (
                  <Grid
                    item
                    className={clsx(classes.flexRow, classes.justifyEnd)}
                  >
                    <Typography variant="h6">4,590</Typography>
                    <Typography variant="h6" className={classes.marginLeft}>
                      {t("home:kwh")}
                    </Typography>
                  </Grid>
                )}
              </Grid>
              <Grid item>
                {img.id === 2 && (
                  <Grid
                    item
                    className={clsx(classes.flexRow, classes.justifyEnd)}
                  >
                    <Typography variant="h6">2,295</Typography>
                    <Typography variant="h6" className={classes.marginLeft}>
                      {t("home:metricTon")}
                    </Typography>
                  </Grid>
                )}
              </Grid>
              <Grid item>
                {img.id === 3 && (
                  <Grid
                    item
                    className={clsx(classes.flexRow, classes.justifyEnd)}
                  >
                    <Typography variant="h6">54</Typography>
                    <Typography variant="h6" className={classes.marginLeft}>
                      {t("home:trees")}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      );
    });
  };

  const renderdashboardList = () => {
    if (dashboardList.length > 0) {
      return dashboardList.map((item, index) => {
        // console.log("### item88888888888", item);
        const measurementID = measurementList.find(
          (f) => f.measurement_type === item.measurementType
        )?.id;
        if (measurementID === measurementSelect) {
          return (
            <>
              <Grid item md={3}>
                <Card>
                  <CardContent className={classes.paddingCard}>
                    <Grid item>
                      <Typography variant="caption">
                        {t("home:bill")}
                      </Typography>
                      <Typography
                        variant="caption"
                        className={clsx(
                          monthly === "monthly" ? classes.borderText : "",
                          classes.marginLeft,
                          classes.cursor
                        )}
                        onClick={(e) => handleNameMonthly(e, "monthly")}
                      >
                        {t("home:monthly")}
                      </Typography>
                      <Typography
                        variant="caption"
                        className={clsx(
                          monthly === "last" ? classes.borderText : "",
                          classes.marginLeft,
                          classes.cursor
                        )}
                        onClick={(e) => handleNameMonthly(e, "last")}
                      >
                        {t("home:last")}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      className={clsx(classes.flexRow, classes.justifyEnd)}
                    >
                      <Typography variant="h6">
                        {monthly === "monthly"
                          ? item.useMonthly
                          : item.useLastMonth}
                      </Typography>
                      <Typography variant="h6" className={classes.marginLeft}>
                        {t("home:Baht")}
                      </Typography>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item md={3}>
                <Card>
                  <CardContent className={classes.paddingCard}>
                    <Grid item>
                      <Typography variant="caption">
                        {t("home:bill")}
                      </Typography>
                      <Typography
                        variant="caption"
                        className={clsx(
                          monthlyTwo === "monthly" ? classes.borderText : "",
                          classes.marginLeft,
                          classes.cursor
                        )}
                        onClick={(e) => handleNameMonthlyTwo(e, "monthly")}
                      >
                        {t("home:monthly")}
                      </Typography>
                      <Typography
                        variant="caption"
                        className={clsx(
                          monthlyTwo === "last" ? classes.borderText : "",
                          classes.marginLeft,
                          classes.cursor
                        )}
                        onClick={(e) => handleNameMonthlyTwo(e, "last")}
                      >
                        {t("home:last")}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      className={clsx(classes.flexRow, classes.justifyEnd)}
                    >
                      <Typography variant="h6">
                        {monthlyTwo === "monthly"
                          ? item.useMonthly
                          : item.useLastMonth}
                      </Typography>
                      <Typography variant="h6" className={classes.marginLeft}>
                        {t("home:Baht")}
                      </Typography>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item md={3}>
                <Card>
                  <CardContent className={classes.paddingCard}>
                    <Grid item>
                      <Typography variant="caption">
                        {t("home:metric")}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      className={clsx(classes.flexRow, classes.justifyEnd)}
                    >
                      <Typography variant="h6">{item.CO2}</Typography>
                      <Typography variant="h6" className={classes.marginLeft}>
                        {t("home:trees")}
                      </Typography>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item md={3}>
                <Card>
                  <CardContent className={classes.paddingCard}>
                    <Grid item>
                      <Typography variant="caption">
                        {t("home:treesPlanted")}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      className={clsx(classes.flexRow, classes.justifyEnd)}
                    >
                      <Typography variant="h6">{item.tree}</Typography>
                      <Typography variant="h6" className={classes.marginLeft}>
                        {t("home:trees")}
                      </Typography>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </>
          );
        }
      });
    }
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
            <Grid item md={8}>
              <Card>
                <CardMedia
                  component="img"
                  image={process.env.PUBLIC_URL + `img/Website1.png`}
                  alt="image Dashboard"
                  className={classes.imageBox}
                />
              </Card>
            </Grid>
            <Grid item md={3}>
              <Card>
                <CardContent className={classes.textAling}>
                  <Grid item>
                    <Typography variant="h6" className={classes.borderBottom}>
                      {t("home:buildingName")}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      className={classes.marginTopCol}
                    >
                      Thirty Tree 33
                    </Typography>
                  </Grid>
                  <Grid item className={classes.marginRowBox}>
                    <Typography variant="h6">{t("home:emergy")}</Typography>
                    <Typography
                      variant="subtitle1"
                      className={classes.borderBottom}
                    >
                      {t("home:kwhM")}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      className={classes.marginTopCol}
                    >
                      73.11
                    </Typography>
                  </Grid>
                  <Grid item className={classes.marginRowBox}>
                    <Typography variant="h6">
                      {t("home:consumption")}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      className={classes.borderBottom}
                    >
                      {t("home:kwhL")}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      className={classes.marginTopCol}
                    >
                      4,590
                    </Typography>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Menu */}
          <Grid
            item
            md={12}
            className={clsx(
              classes.flexRow,
              classes.justifyAround,
              classes.marginRow
            )}
          >
            <Grid item md={6}>
              <Typography variant="h5">{t("home:intelligent")}</Typography>
            </Grid>
            <Grid
              item
              md={6}
              className={clsx(classes.flexRow, classes.justifyAround)}
            >
              {measurementList.length > 0 &&
                measurementList.map((item, index) => {
                  return renderViewBox(item, index);
                })}
            </Grid>
          </Grid>

          <Grid
            item
            md={12}
            className={clsx(
              classes.flexRow,
              classes.justifyBetween,
              classes.marginRow
            )}
          >
            {/* {renderViewCard()} */}
            {renderdashboardList()}
          </Grid>
        </>
      )}
    </Box>
  );
};

Dashboard.Prototype = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
