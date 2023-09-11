import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSidebar } from "../js/actions";
import Header from "./header";
import SideBar from "./sideBar";
import PropTypes from "prop-types";
import { Grid, Container } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Box,
  CircularProgress,
} from "@material-ui/core";

const Layout = ({ children, type }) => {
  const dispatch = useDispatch();
  const matches = useMediaQuery("(min-width:1024px)");
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(addSidebar(type));
  }, [type]);

  console.log("matches", matches, loading);

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
      {loading ? (
        <Box mt={4} width={1} display="flex" justifyContent="center">
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
          <Header matches={matches} />
          {/* <Container> */}
          <Grid container>
            {matches && (
              <Grid item xs={2}>
                <SideBar />
              </Grid>
            )}
            <Grid item xs={matches ? 10 : 12}>
              {children}
            </Grid>
          </Grid>
        </>
      )}
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
