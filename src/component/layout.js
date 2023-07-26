import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSidebar } from "../js/actions";
import Header from "./header";
import SideBar from "./sideBar";
import PropTypes from "prop-types";
import { Grid, Container } from "@mui/material";

const Layout = ({ children, type }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addSidebar(type));
  }, [type]);

  return (
    // <>
    //   <Header />
    //   <SideBar />
    //   <Grid item md={12}>
    //     <Grid item className="WidthContent"></Grid>
    //     <Grid item md={9}>
    //     {children}
    //     </Grid>
    //   </Grid>
    // </>
    <div>
      <Header />
      {/* {type == "HistoricalData" ? (
        <>
          <Grid container>
            <Grid item xs={2}>
              <SideBar />
            </Grid>
            <Grid item xs={10}>
              {children}
            </Grid>
          </Grid>
        </>
      ) : (
        <> */}
          {/* <Container> */}
            <Grid container>
              <Grid item xs={2}>
                <SideBar />
              </Grid>
              <Grid item xs={10}>
                {children}
              </Grid>
            </Grid>
          {/* </Container> */}
        {/* </>
      )} */}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
