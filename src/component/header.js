import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Container,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

function Header({ type }) {
  const user = useSelector((state) => state.user);
  const [select, setSelect] = useState("none");

  const hideOccModal = (e) => {
    setSelect(e.target.value);
  };

  return (
    <>
      <Grid container spacing={2} className="backGrourdHead">
        <Grid item md={2} className="FlexIconHead">
          <CheckBoxOutlineBlankIcon sx={{ mr: 3, ml: 3 }} />
          <Typography variant="h6" component="div">
            {type ? type : "Dashboard"}
          </Typography>
        </Grid>
        <Grid item md={4}>
          <FormControl variant="outlined" size="small" fullWidth>
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
        <Grid item md={4} className="FlexIcon">
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
    </>
  );
}

export default Header;
