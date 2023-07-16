import Header from "./header";
import SideBar from "./sideBar";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";

const Layout = ({ children, type }) => {
  return (
    <>
      <Header type={type} />
      <SideBar type={type} />
      <Grid item md={12}>
        <Grid item className="WidthContent"></Grid>
        {/* <Grid item md={9}> */}
        {children}
        {/* </Grid> */}
      </Grid>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
