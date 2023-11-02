import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {} from "@mui/material";
import {
  makeStyles,
  Grid,
  // Container,
  Typography,
  // FormControl,
  // Select,
  // MenuItem,
  // Drawer,
  // List,
  // ListItem,
  // ListItemIcon,
  // ListItemText,
  Card,
  CardContent,
  Box,
} from "@material-ui/core";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CustomizedAccordions from "./accondion";
import clsx from "clsx";
import useMediaQuery from "@mui/material/useMediaQuery";
import Calendar from "../component/calendar";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  flexRow: {
    display: "flex",
  },
  marginRow: {
    marginTop: 20,
    marginBottom: 20,
  },
  alignSelf: {
    alignSelf: "center",
  },
  sideBarLeft: {
    left: "18%",
    top: 80,
  },
  borderRight: {
    borderRight: 'none',
  },
  justify: {
    justifyContent: 'center',
  },
 
}));

const SideBarPage = ({ children, t }) => {
  const classes = useStyles();
  const sideBar = useSelector((state) => state.sidebar);
  const matches = useMediaQuery("(min-width:1024px)");

  const [deviceId, setDeviceId] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [point, setPoint] = useState();

  const setDataSelectDevice = (value) => {
    if (value) {
      setDeviceId(value.device_id);
      setDeviceName(value.device_name);
    } else {
      setDeviceId(value);
      setDeviceName(value);
    }
  };

  const setDataSelectPoint = (value) => {
    let data = [];
    if (value) {
        value.map((item) => {
          data.push(item.name);
        });
        setPoint(data);
    } else {
      setPoint(value);
    }
  };

  return (
    <>
      {/* <Grid container> */}
      <Box className={clsx(classes.flexRow, classes.marginRow, classes.justify)}>
        {/* <Grid item md={1}></Grid> */}
        <Grid item md={matches ? 3 : 3}>
            <Grid item className={classes.flexRow}>
              <HomeOutlinedIcon className={classes.alignSelf} />
              <Typography variant="h6"> / {sideBar}</Typography>
            </Grid>

            <Card className="mt-3">
              <CardContent>
                {/* <Typography variant="h6">{t('historicalData:devicelist')}</Typography> */}
                <CustomizedAccordions t={t} setDataSelectDevice={setDataSelectDevice} setDataSelectPoint={setDataSelectPoint}/>
              </CardContent>
            </Card>
          {/* </Drawer> */}
        </Grid>
        <Grid item md={11}>
          <Calendar t={t} deviceId={deviceId} deviceName={deviceName} point={point} />
        </Grid>
        {/* <Grid item md={1}></Grid> */}
      </Box>
    </>
  );
};

SideBarPage.propTypes = {
  t: PropTypes.func,
};

export default SideBarPage;
