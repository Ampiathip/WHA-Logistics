import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  makeStyles,
  Grid,
  Container,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import CalendarViewWeekOutlinedIcon from "@mui/icons-material/CalendarViewWeekOutlined";
import CookieOutlinedIcon from "@mui/icons-material/CookieOutlined";
import DatasetOutlinedIcon from "@mui/icons-material/DatasetOutlined";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  disPlayFlexRow: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  imageCenter: {
    alignSelf: "center",
  },
  LinkColor: {
    color: "#000",
    textDecoration: "blink",
  },
  activeIcon: {
    color: "#ae84d3",
    textDecoration: "blink",
    "&:hover": {
      color: "#ae84d3",
    },
  },
  margigLeft: {
    marginLeft: 20,
  },
}));

const SideBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation(["sidebar", "footer"]);
  const sideBar = useSelector((state) => state.sidebar);

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Grid item className={classes.disPlayFlexRow}>
        <Typography variant="h5" className={classes.imageCenter}>
          {t("sidebar:header")}
        </Typography>
        <img
          src={process.env.PUBLIC_URL + "/img/Group.png"}
          alt="img-logo"
          width={60}
        />
      </Grid>
      <List>
        <Link
          to={"/dashboard"}
          className={`${
            sideBar == "Dashboard" ? classes.activeIcon : classes.LinkColor
          }`}
        >
          <ListItem button>
            <ListItemIcon
              className={`${
                sideBar == "Dashboard" ? classes.activeIcon : classes.LinkColor
              }`}
            >
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={t("sidebar:dashboard")} />
          </ListItem>
        </Link>
        <Link
          className={`${
            sideBar == "FloorDiagram" ? classes.activeIcon : classes.LinkColor
          }`}
        >
          <ListItem button>
            <ListItemIcon
              className={`${
                sideBar == "FloorDiagram"
                  ? classes.activeIcon
                  : classes.LinkColor
              }`}
            >
              <DatasetOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={t("sidebar:FloorDiagram")} />
          </ListItem>
        </Link>
        <Link
          to={"/divices"}
          className={`${
            sideBar == "Divices" ? classes.activeIcon : classes.LinkColor
          }`}
        >
          <ListItem button>
            <ListItemIcon
              className={`${
                sideBar == "Divices" ? classes.activeIcon : classes.LinkColor
              }`}
            >
              <CalendarViewWeekOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={t("sidebar:myDevices")} />
          </ListItem>
        </Link>
        <Link
          to={"/historicalData"}
          className={`${
            sideBar == "HistoricalData" ? classes.activeIcon : classes.LinkColor
          }`}
        >
          <ListItem button>
            <ListItemIcon
              className={`${
                sideBar == "HistoricalData"
                  ? classes.activeIcon
                  : classes.LinkColor
              }`}
            >
              <CookieOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={t("sidebar:historicalData")} />
          </ListItem>
        </Link>
        <Grid item className={classes.margigLeft}>
          <Typography variant="h6" className={classes.imageCenter}>
            {t("sidebar:Settings")}
          </Typography>
        </Grid>
        <Link
          to={"/parameter"}
          className={`${
            sideBar == "Parameter" ? classes.activeIcon : classes.LinkColor
          }`}
        >
          <ListItem button>
            <ListItemIcon
              className={`${
                sideBar == "Parameter" ? classes.activeIcon : classes.LinkColor
              }`}
            >
              <UploadFileOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={t("sidebar:parameter")} />
          </ListItem>
        </Link>
        <Link
          to={"/group"}
          className={`${
            sideBar == "group" ? classes.activeIcon : classes.LinkColor
          }`}
        >
          <ListItem button>
            <ListItemIcon
              className={`${
                sideBar == "group" ? classes.activeIcon : classes.LinkColor
              }`}
            >
              <PlayCircleOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={t("sidebar:group")} />
          </ListItem>
        </Link>
        <Link
          to={"/user"}
          className={`${
            sideBar == "user" ? classes.activeIcon : classes.LinkColor
          }`}
        >
          <ListItem button>
            <ListItemIcon
              className={`${
                sideBar == "user" ? classes.activeIcon : classes.LinkColor
              }`}
            >
              <PermIdentityOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={t("sidebar:user")} />
          </ListItem>
        </Link>
        <Link
          to={"/"}
          className={`${
            sideBar == "" ? classes.activeIcon : classes.LinkColor
          }`}
        >
          <ListItem button>
            <ListItemIcon
              className={`${
                sideBar == "" ? classes.activeIcon : classes.LinkColor
              }`}
            >
              <LogoutOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={t("sidebar:Logout")} />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
};

SideBar.Prototype = {};

export default SideBar;
