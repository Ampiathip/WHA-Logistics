import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Container,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
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

const SideBar = ({ type }) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation(["sidebar", "footer"]);
  return (
    <>
      {/* <Grid container> */}
      <Grid item md={12} className="positionSideBar">
        <Grid item md={3} className="padingText disPlayFlexRow FlexRowCard">
          <Typography variant="h5" className="imageCenter">{t("sidebar:header")}</Typography>
          <img
            src={process.env.PUBLIC_URL + "/img/Group.png"}
            alt="img-logo"
            width={60}
          />
        </Grid>
        <Grid item md={3} className="padingTextLeft FlexIconHead">
          <Link
            to={"/dashboard"}
            className={`LinkColor ${type == "Dashboard" ? " activeIcon " : ""}`}
          >
            <HomeOutlinedIcon />
            <Typography
              variant="body1"
              className={`MarginSideBar ${
                type == "Dashboard" ? " active " : ""
              }`}
            >
              {t("sidebar:dashboard")}
            </Typography>
          </Link>
        </Grid>
        <Grid item md={3} className="padingTextLeft FlexIconHead">
          <DatasetOutlinedIcon />
          <Typography variant="body1" className="MarginSideBar">
            {t("sidebar:myDevices")}
          </Typography>
        </Grid>
        <Grid item md={3} className="padingTextLeft FlexIconHead">
          <Link
            to={"/historicalData"}
            className={`LinkColor ${
              type == "HistoricalData" ? " activeIcon " : ""
            }`}
          >
            <CookieOutlinedIcon />
            <Typography
              variant="body1"
              className={`MarginSideBar ${
                type == "HistoricalData" ? " active " : ""
              }`}
            >
              {t("sidebar:historicalData")}
            </Typography>
          </Link>
        </Grid>
        <Grid item md={3} className="padingTextLeft FlexIconHead">
          <CalendarViewWeekOutlinedIcon />
          <Typography variant="body1" className="MarginSideBar">
            {t("sidebar:systemOverview")}
          </Typography>
        </Grid>
        <Grid item md={3} className="padingTextLeft FlexIconHead">
          <Typography variant="h6">Settings</Typography>
        </Grid>
        <Grid item md={3} className="padingTextLeft FlexIconHead">
          <UploadFileOutlinedIcon />
          <Typography variant="body1" className="MarginSideBar">
            {t("sidebar:parameter")}
          </Typography>
        </Grid>
        <Grid item md={3} className="padingTextLeft FlexIconHead">
          <PlayCircleOutlinedIcon />
          <Typography variant="body1" className="MarginSideBar">
            {t("sidebar:group")}
          </Typography>
        </Grid>
        <Grid item md={3} className="padingTextLeft FlexIconHead">
          <PermIdentityOutlinedIcon />
          <Typography variant="body1" className="MarginSideBar">
            {t("sidebar:user")}
          </Typography>
        </Grid>
        <Grid item md={3} className="padingTextLeft FlexIconHead">
          <Link
            to={"/"}
            className={`LinkColor ${type == "" ? " activeIcon " : ""}`}
          >
            <LogoutOutlinedIcon />
            <Typography variant="body1" className="MarginSideBar">
              {t("sidebar:logout")}
            </Typography>
          </Link>
        </Grid>
      </Grid>
      {/* </Grid> */}
    </>
  );
};

SideBar.Prototype = {
  type: PropTypes.string,
};

export default SideBar;
