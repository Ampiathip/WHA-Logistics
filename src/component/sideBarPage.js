import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {} from "@mui/material";
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
  Card,
  CardContent,
  Box,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CustomizedAccordions from "./accondion";
import clsx from "clsx";
import useMediaQuery from "@mui/material/useMediaQuery";

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

  return (
    <>
      {/* <Grid container> */}
      <Box className={clsx(classes.flexRow, classes.marginRow, classes.justify)}>
        {/* <Grid item md={1}></Grid> */}
        <Grid item md={matches ? 2 : 3}>
          {/* <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
              paperAnchorLeft: classes.sideBarLeft,
              paperAnchorDockedLeft: classes.borderRight,
            }}
          > */}
            <Grid item className={classes.flexRow}>
              <HomeOutlinedIcon className={classes.alignSelf} />
              <Typography variant="h6"> / {sideBar}</Typography>
            </Grid>

            <Card className="mt-3">
              <CardContent>
                {/* <Typography variant="h6">{t('historicalData:devicelist')}</Typography> */}
                <CustomizedAccordions t={t} />
              </CardContent>
            </Card>
          {/* </Drawer> */}
        </Grid>
        <Grid item md={9}>
          {children}
        </Grid>
        {/* <Grid item md={1}></Grid> */}
      </Box>

      {/* {children} */}
      {/* </Box> */}
      {/* </Grid> */}

      {/* Container Device List */}

      {/* <Box> */}
      {/* <Grid item md={12} className="disPlayFlexRow">
          <Grid item md={3} className="MaxWidthSideBar"></Grid>
          <Grid item md={2} className="MarginCard"> */}

      {/* </Grid> */}
      {/* <Box>{children}</Box> */}
      {/* </Grid> */}

      {/* <Grid item md={12} className="disPlayFlexRow">
          <Grid item md={3} className="MaxWidthSideBar"></Grid>
          <Grid item md={2} className="MarginCard">
            <Card>
              <CardContent>
                <Typography variant="h6">Selected Point</Typography>
                <div className="MarginCard backGrourdCard">
                  <Box className="padingText">
                    <Typography variant="body1" className="ColorAccondion">
                      Energy L1
                    </Typography>
                  </Box>
                  <Box className="padingText">
                    <Typography variant="body1" className="ColorAccondion">
                      Energy L3
                    </Typography>
                  </Box>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={7}>{children}</Grid>
        </Grid> */}
      {/* </Box> */}
    </>
  );
};

SideBarPage.propTypes = {
  t: PropTypes.func,
};

export default SideBarPage;
