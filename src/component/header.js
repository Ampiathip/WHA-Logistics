import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { logout, checkLogin, checkAuthen, loading } from "../js/actions";
import {
  makeStyles,
  Grid,
  Container,
  Typography,
  FormControl,
  Select,
  MenuItem,
  AppBar,
  Toolbar,
  Menu,
  Box,
  CircularProgress,
} from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import clsx from "clsx";
import UserView from "./modalUserView";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";

const MySwal = withReactContent(Swal);

const useStyles = makeStyles((theme) => ({
  backGrourdHead: {
    backgroundColor: "#283fea",
  },
  FlexIconHead: {
    display: "flex",
    justifyContent: "end",
  },
  alignCenter: {
    alignItems: "center",
  },
  alignSelf: {
    alignSelf: "center",
  },
  backGrourdSelect: {
    backgroundColor: "#fff",
  },
  marginHead: {
    marginRight: 20,
    cursor: "pointer",
  },
  activeIcon: {
    color: "#000",
    textDecoration: "blink",
    "&:hover": {
      color: "#000",
    },
  },
  LinkColor: {
    color: "#000",
    textDecoration: "blink",
  },
}));

function Header({ type, matches }) {
  const { t, i18n } = useTranslation(["user", "sidebar"]);
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const login = useSelector((state) => state.login);
  const sideBar = useSelector((state) => state.sidebar);
  const [selectBuilding, setSelectBuilding] = useState("");
  const [openViewUser, setOpenViewUser] = useState(false);
  const [building, setBuilding] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    dispatch(checkLogin());
  }, [login]);

  useEffect(() => {
    if (user && user?.building) {
      setBuilding(user?.building);
      getBuildingUser();
    }
  }, [user, building]);

  const getBuildingUser = () => {
    if (building.length > 0) {
      building.map((item) => {
        setSelectBuilding(item.id);
      });
    }
    // console.log('building', building, user);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleBuilding = (e) => {
    setSelectBuilding(e.target.value);
  };

  // view user //
  const handleClickOpenView = () => {
    setOpenViewUser(true);
  };

  const handleCloseView = () => {
    setOpenViewUser(false);
  };

  const handleLogout = () => {
    // dispatch(loading(true))
    MySwal.fire({
      icon: "warning",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
      showCancelButton: true,
      text: "คุณต้องการออกจากระบบ",
    }).then((result) => {
      if (result.isConfirmed) {
        // dispatch(loading(false))
        dispatch(logout(false));
      } else if (result.isDismissed) {
        // dispatch(loading(false))
      }
    });
  };

  return (
    <>
      <AppBar position="static" className={classes.backGrourdHead}>
        <Toolbar>
          <Grid
            container
            spacing={2}
            className={matches ? classes.backGrourdHead : classes.FlexIconHead}
          >
            {matches ? (
              <>
                <Grid item md={2}></Grid>
                <Grid
                  item
                  md={2}
                  className={clsx(classes.FlexIconHead, classes.alignCenter)}
                >
                  <CheckBoxOutlineBlankIcon sx={{ mr: 3, ml: 3 }} />
                  <Typography variant="h6" component="div">
                    {sideBar ? sideBar : "Dashboard"}
                  </Typography>
                </Grid>
                <Grid item md={4} className={classes.alignSelf}>
                  <FormControl
                    variant="outlined"
                    size="small"
                    fullWidth
                    className={classes.backGrourdSelect}
                  >
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectBuilding}
                      onChange={(e) => handleBuilding(e)}
                    >
                      <MenuItem value={"none"}>
                        {"Select Building name"}
                      </MenuItem>
                      {building.length > 0 &&
                        building.map((item) => {
                          return (
                            <MenuItem
                              id={"buildingNameSelect-" + item.id}
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
              </>
            ) : null}
            <Grid
              item
              md={4}
              className={clsx(classes.FlexIconHead, classes.alignCenter)}
            >
              <AccountCircleOutlinedIcon
                className={classes.marginHead}
                onClick={handleClickOpenView}
              />
              <Typography variant="h5">{user?.user?.username}</Typography>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ ml: 2 }}
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {matches ? (
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                ) : (
                  <>
                    <Link
                      to={"/dashboard"}
                      className={`${
                        sideBar == "Dashboard"
                          ? classes.activeIcon
                          : classes.LinkColor
                      }`}
                    >
                      <MenuItem>{t("sidebar:dashboard")}</MenuItem>
                    </Link>

                    <Link
                      to={"/floorDiagram"}
                      className={`${
                        sideBar == "Dashboard"
                          ? classes.activeIcon
                          : classes.LinkColor
                      }`}
                    >
                      <MenuItem>{t("sidebar:FloorDiagram")}</MenuItem>
                    </Link>

                    <Link
                      to={"/divices"}
                      className={`${
                        sideBar == "Dashboard"
                          ? classes.activeIcon
                          : classes.LinkColor
                      }`}
                    >
                      <MenuItem>{t("sidebar:myDevices")}</MenuItem>
                    </Link>

                    <Link
                      to={"/historicalData"}
                      className={`${
                        sideBar == "Dashboard"
                          ? classes.activeIcon
                          : classes.LinkColor
                      }`}
                    >
                      <MenuItem>{t("sidebar:historicalData")}</MenuItem>
                    </Link>

                    <Link
                      to={"/systemOverview"}
                      className={`${
                        sideBar == "Dashboard"
                          ? classes.activeIcon
                          : classes.LinkColor
                      }`}
                    >
                      <MenuItem>{t("sidebar:systemOverview")}</MenuItem>
                    </Link>

                    <Link
                      to={"/parameter"}
                      className={`${
                        sideBar == "Dashboard"
                          ? classes.activeIcon
                          : classes.LinkColor
                      }`}
                    >
                      <MenuItem>{t("sidebar:parameter")}</MenuItem>
                    </Link>

                    <Link
                      to={"/user"}
                      className={`${
                        sideBar == "Dashboard"
                          ? classes.activeIcon
                          : classes.LinkColor
                      }`}
                    >
                      <MenuItem>{t("sidebar:user")}</MenuItem>
                    </Link>

                    <Link
                      to={"/building"}
                      className={`${
                        sideBar == "Dashboard"
                          ? classes.activeIcon
                          : classes.LinkColor
                      }`}
                    >
                      <MenuItem>{t("sidebar:Building")}</MenuItem>
                    </Link>

                    <Link
                      to={"/gateway"}
                      className={`${
                        sideBar == "Dashboard"
                          ? classes.activeIcon
                          : classes.LinkColor
                      }`}
                    >
                      <MenuItem>{t("sidebar:Gateway")}</MenuItem>
                    </Link>

                    <Link
                      to={"/zone"}
                      className={`${
                        sideBar == "Dashboard"
                          ? classes.activeIcon
                          : classes.LinkColor
                      }`}
                    >
                      <MenuItem>{t("sidebar:zone")}</MenuItem>
                    </Link>

                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </>
                )}
              </Menu>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <UserView
        open={openViewUser}
        close={handleCloseView}
        userId={user?.user?.id}
        user={user?.user?.username}
        t={t}
        // emailUser={emailUser}
        // phoneNumber={phoneNumber}
        role={user?.user?.role}
      />
    </>
  );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
