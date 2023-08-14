import React, { useState, useEffect, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { makeStyles, Grid,} from "@material-ui/core";
import clsx from "clsx";
import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles((theme) => ({
  FlexCard: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function ModalProcess({ t, open, close, data }) {
  const classes = useStyles();
  //   const sideBar = useSelector((state) => state.sidebar);
  //   const user = useSelector((state) => state.user);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {/* Modal */}
      <Dialog
        fullScreen={fullScreen}
        // className={classes.modalWidth}
        open={open}
        onClose={close}
        aria-labelledby="responsive-dialog-title-view"
      >
        <DialogTitle id="responsive-dialog-title-view"></DialogTitle>
        <DialogContent>
          <Grid item md={12}>
            <Grid item>
              <Typography variant="subtitle2">Processing Process</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">{data.detail?.title}</Typography>
            </Grid>
            <Grid item className={classes.FlexCard}>
              <Typography variant="body1">Power</Typography>
              <Typography variant="body1">2 kWh</Typography>
            </Grid>
            <Grid item className={classes.FlexCard}>
              <Typography variant="body1">Energy day</Typography>
              <Typography variant="body1">11 kWh</Typography>
            </Grid>
            <Grid item className={classes.FlexCard}>
              <Typography variant="body1">Total Energy</Typography>
              <Typography variant="body1">1,111,111 kWh</Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
