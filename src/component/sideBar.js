import {
  Grid,
  Container,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
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

const SideBar =({type}) => {
  return (
    <>
      {/* <Grid container> */}
      <Grid item md={12} className="positionSideBar">
        <Grid item md={3} className="padingText">
          <Typography variant="h5">HYPETEX</Typography>
        </Grid>
        <Grid item md={3} className="padingTextLeft FlexIconHead">
          <Link to={"/"} className={`LinkColor ${type == "Dashboard" ? " activeIcon ":""}`}>
            <HomeOutlinedIcon />
            <Typography variant="body1" className={`MarginSideBar ${type == "Dashboard" ? " active ":""}`}>
              Dashboard
            </Typography>
          </Link>
        </Grid>
        <Grid item md={3} className="padingTextLeft FlexIconHead">
          <DatasetOutlinedIcon />
          <Typography variant="body1" className="MarginSideBar">
            My Devices
          </Typography>
        </Grid>
        <Grid item md={3} className="padingTextLeft FlexIconHead">
          <Link to={"/historicalData"} className={`LinkColor ${type == "HistoricalData" ? " activeIcon ":""}`}>
            <CookieOutlinedIcon />
            <Typography variant="body1" className={`MarginSideBar ${type == "HistoricalData" ? " active ":""}`}>
              Historical Data
            </Typography>
          </Link>
        </Grid>
        <Grid item md={3} className="padingTextLeft FlexIconHead">
          <CalendarViewWeekOutlinedIcon />
          <Typography variant="body1" className="MarginSideBar">
            System Overview
          </Typography>
        </Grid>
        <Grid item md={3} className="padingTextLeft FlexIconHead">
          <Typography variant="h6">Settings</Typography>
        </Grid>
        <Grid item md={3} className="padingTextLeft FlexIconHead">
          <UploadFileOutlinedIcon />
          <Typography variant="body1" className="MarginSideBar">
            Parameter
          </Typography>
        </Grid>
        <Grid item md={3} className="padingTextLeft FlexIconHead">
          <PlayCircleOutlinedIcon />
          <Typography variant="body1" className="MarginSideBar">
            Group
          </Typography>
        </Grid>
        <Grid item md={3} className="padingTextLeft FlexIconHead">
          <PermIdentityOutlinedIcon />
          <Typography variant="body1" className="MarginSideBar">
            User
          </Typography>
        </Grid>
        <Grid item md={3} className="padingTextLeft FlexIconHead">
          <LogoutOutlinedIcon />
          <Typography variant="body1" className="MarginSideBar">
            Logout
          </Typography>
        </Grid>
      </Grid>
      {/* </Grid> */}
    </>
  );
};

SideBar.Prototype = { 
    type : PropTypes.string,
}

export default SideBar;
