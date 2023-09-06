import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, checkLogin } from "../js/actions";
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
}));

function Header({ type, matches }) {
  const { t, i18n } = useTranslation(["user"]);
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const login = useSelector((state) => state.login);
  const sideBar = useSelector((state) => state.sidebar);
  const [select, setSelect] = useState("none");
  const [openViewUser, setOpenViewUser] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    dispatch(checkLogin());
  }, [login]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const hideOccModal = (e) => {
    setSelect(e.target.value);
  };

  // view user //
  const handleClickOpenView = () => {
    setOpenViewUser(true);
  };

  const handleCloseView = () => {
    setOpenViewUser(false);
  };

  const handleLogout = () => {
    MySwal.fire({
      icon: "warning",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
      showCancelButton: true,
      text: "คุณต้องการออกจากระบบ",
    }).then(() => {
      dispatch(logout(false));
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
                      value={select}
                      onChange={(e) => hideOccModal(e)}
                    >
                      <MenuItem value={"none"}>
                        {user?.building[0]?.name}
                      </MenuItem>
                      {/* <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
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

export default Header;
