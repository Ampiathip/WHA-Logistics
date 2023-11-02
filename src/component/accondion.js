import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
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
  CircularProgress,
} from "@material-ui/core";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
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

const Tags = ({ t, setDataSelectDevice, setDataSelectPoint,}) => {
  const classes = useStyles();
  const [nameDevice, setIsnameDevice] = useState([]);
  const [pointDevice, setIspointDevice] = useState([]);

  const dispatch = useDispatch();
  const sideBar = useSelector((state) => state.sidebar);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);
  const [deviceList, setDeviceList] = useState([]);
  const [pointList, setPointList] = useState([]);

  const swalFire = (msg) => {
    MySwal.fire({
      icon: "error",
      confirmButtonText: "ตกลง",
      text: msg,
    });
  };

  useEffect(() => {
    dispatch(checkToken());
    if (!_.isEmpty(token)) {
      getDevice();
    }
  }, [token]);

  const getDevice = async () => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.myDevice().then((response) => {
        const dataPayload = response.data;
        console.log("dataPayloadmyDevice", dataPayload);
        setDeviceList(dataPayload);
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

  const handleDevice = (event, value) => {
    // console.log("va=======", value);
    if (value) {
      setIsnameDevice(value);
      getPointData(value.device_id);
      setDataSelectDevice(value);
    }
  };

  const handlePoint = (event, value) => {
    if (value) {
      setIspointDevice(value);
      setDataSelectPoint(value);
    }
  };

  const handleCloseDevice = (event, value) => {
    // console.log("va=======", value);
    // if (value) {
      setIsnameDevice(value);
      setDataSelectDevice(value);
      setIspointDevice([]);
    // }
  };

  const handleClosePoint = (event, value) => {
    // if (value) {
      setIspointDevice([]);
      setDataSelectPoint(value);
    // }
  };

  // get Points //
  const getPointData = async (id) => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getPointData(id).then((response) => {
        const dataPayload = response.data;
        console.log("dataPayload====Point", dataPayload);
        setPointList(dataPayload)
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

  // console.log("mmmmmm=====", nameDevice, pointDevice);

  return (
    <>
      <Stack spacing={3}>
        <Typography variant="h6">{t("historicalData:devicelist")}</Typography>
        <Autocomplete
          // multiple
          id="tags-outlined"
          options={deviceList}
          getOptionLabel={(option) => option.device_name}
          // defaultValue={nameDevice}
          // filterSelectedOptions
          className={classes.margin}
          onChange={handleDevice}
          onInputChange={handleCloseDevice}
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
          options={pointList}
          getOptionLabel={(option) => option.name}
          value={pointDevice}
          className={classes.margin}
          onChange={handlePoint}
          onInputChange={handleClosePoint}
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
      
        <Typography variant="h6">{t("historicalData:select")}</Typography>
        <Box>
          {/* <Grid item className={classes.flexRow}>
            <Typography>{t("historicalData:poiniCheck")}</Typography>
            <Typography>{t("historicalData:Action")}</Typography>
          </Grid> */}
          <Table className={classes.Table}>
            <TableBody>
              <TableRow className={classes.border}>
                <TableCell
                  className={clsx(classes.border, classes.paddingCell)}
                >
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
                      <TableCell
                        className={clsx(classes.border, classes.paddingCell)}
                      >
                        <Typography variant="body2">
                          {nameDevice && nameDevice.device_name + " / " + item.name}
                        </Typography>
                      </TableCell>
                      {/* <TableCell className={clsx(classes.border, classes.paddingCell)}>
                        <HighlightOffOutlinedIcon />
                      </TableCell> */}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </Box>
      </Stack>
    </>
  );
};

Tags.propTypes = {
  t: PropTypes.func,
  setDataSelectDevice: PropTypes.func,
  setDataSelectPoint: PropTypes.func,
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

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
