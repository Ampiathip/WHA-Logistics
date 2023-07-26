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
  AppBar,
  Toolbar,
} from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  backGrourdHead: {
    backgroundColor: '#283fea',
  },
  FlexIconHead: {
    display: 'flex',
    justifyContent: 'end',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignSelf: {
    alignSelf: 'center',
  },
  backGrourdSelect: {
    backgroundColor: '#fff',
  },
}));

function Header({ type }) {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const sideBar = useSelector((state) => state.sidebar);
  const [select, setSelect] = useState("none");

  const hideOccModal = (e) => {
    setSelect(e.target.value);
  };

  return (
    <AppBar position="static" className={classes.backGrourdHead}>
      <Toolbar>
        <Grid container spacing={2} className={classes.backGrourdHead}>
          <Grid item md={2}></Grid>
          <Grid item md={2} className={clsx(classes.FlexIconHead, classes.alignCenter)}>
            <CheckBoxOutlineBlankIcon sx={{ mr: 3, ml: 3 }} />
            <Typography variant="h6" component="div">
              {sideBar ? sideBar : "Dashboard"}
            </Typography>
          </Grid>
          <Grid item md={4} className={classes.alignSelf}>
            <FormControl variant="outlined" size="small" fullWidth className={classes.backGrourdSelect}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={select}
                onChange={(e) => hideOccModal(e)}
              >
                <MenuItem value={"none"}>
                  WHA Mega Logistics Center เทพารักษ์ กม. 21
                </MenuItem>
                {/* <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={4} className={clsx(classes.FlexIconHead, classes.alignCenter)}>
            <AccountCircleOutlinedIcon sx={{ mr: 3 }} />
            <Typography variant="h5">{user}</Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ ml: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
