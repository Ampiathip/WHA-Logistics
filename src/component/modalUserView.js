import React, { useState, useEffect, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { makeStyles, Grid, CircularProgress, Box } from "@material-ui/core";
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
  flexRow: {
    display: "flex",
  },
  marginRow: {
    marginTop: 20,
  },
  alignSelf: {
    alignSelf: "center",
  },
  inputWidth: {
    width: "100%",
  },
  fontSixeHead: {
    fontSize: "16px !important",
  },
  fontSixeCell: {
    fontSize: "14px !important",
  },
  marginIcon: {
    marginRight: 5,
  },
  imgWidth: {
    width: "-webkit-fill-available",
  },
  justContent: {
    justifyContent: "space-between",
  },
  borderImg: {
    border: "1px solid #D9D9D9",
    borderRadius: 10,
    padding: 10,
  },
  alignItem: {
    alignItems: "center",
  },
  modalWidth: {
    width: "60% !important",
    height: "90% !important",
  },
  modalContent: {
    justifyContent: "space-around",
  },
  boxMargin: {
    marginLeft: 20,
  },
  textCenter: {
    textAlign: "center",
  },
  paddingContent: {
    padding: "0px 24px !important",
  },
  borderBottom: {
    borderBottom: "solid #F9F9FA",
  },
  backGroundConfrim: {
    backgroundColor: "#27963C !important",
    color: "#fff !important",
    "&:hover": {
      backgroundColor: "#27963C !important",
      boxShadow: `none`,
    },
  },
  paddingHead: {
    padding: "10px !important",
  },
  paddingFoot: {
    padding: "24px !important",
  },
  backGroundCancel: {
    backgroundColor: "#fff !important",
    color: "#1A1C1D !important",
    border: "1px solid #1A1C1D !important",
    "&:hover": {
      backgroundColor: "#fff !important",
      boxShadow: `none`,
    },
  },
  flexRowBtnModal: {
    display: "flex",
    justifyContent: "flex-end",
  },
  cuserPoint: {
    cursor: "pointer",
  },
  textColor: {
    color: "#3E6DC5",
  },
  paddingTop: {
    paddingTop: 15,
  },
  borderText: {
    border: "1px solid #D9D9D9",
    borderRadius: 25,
    padding: 5,
    textAlign: "center",
  },
}));

export default function UserView({
  t,
  open,
  close,
  userId,
  user,
  emailUser,
  phoneNumber,
  role,
  loading,
  imagePreviewUrl,
}) {
  const classes = useStyles();
  //   const sideBar = useSelector((state) => state.sidebar);
  //   const user = useSelector((state) => state.user);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xl"));

  return (
    <>
      {/* Modal View */}
      <Dialog
        fullScreen={fullScreen}
        // className={classes.modalWidth}
        open={open}
        onClose={close}
        aria-labelledby="responsive-dialog-title-view"
        classes={{
          paper: classes.modalWidth,
        }}
      >
        <DialogTitle
          id="responsive-dialog-title-view"
          className={clsx(
            classes.flexRow,
            classes.justContent,
            classes.borderBottom
          )}
        >
          <Typography variant="h3">{user}</Typography>
          <CloseIcon onClick={close} className={classes.cuserPoint} />
        </DialogTitle>
        <DialogContent>
          {loading ? (
            <Box mt={4} width={1} display="flex" justifyContent="center">
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <>
              <Grid
                item
                md={12}
                className={clsx(
                  classes.alignItem,
                  classes.marginRow,
                  classes.flexRow
                )}
              >
                <Grid item md={3} className={classes.borderImg}>
                  <img
                    src={imagePreviewUrl ? imagePreviewUrl : process.env.PUBLIC_URL + "/img/Group.png"}
                    alt="img-test"
                    className={classes.imgWidth}
                  />
                </Grid>
                <Grid item md={9}>
                  <Grid item className={classes.boxMargin}>
                    <Typography variant="h3">{userId}</Typography>
                  </Grid>
                  <Grid
                    item
                    className={clsx(classes.boxMargin, classes.marginRow)}
                  >
                    <Typography variant="h5">{user ? user : "-"}</Typography>
                  </Grid>
                  <Grid
                    item
                    className={clsx(classes.boxMargin, classes.marginRow)}
                  >
                    <Typography variant="h6">{t("user:mock")}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={12} className={clsx(classes.marginRow)}>
                <Typography variant="h5">{t("user:email")}</Typography>
                <Grid item className="mt-2">
                  <Typography variant="body1">
                    {emailUser ? emailUser : "-"}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item md={12} className={clsx(classes.marginRow)}>
                <Typography variant="h5">{t("user:phone")}</Typography>
                <Grid item className="mt-2">
                  <Typography variant="body1">
                    {phoneNumber ? phoneNumber : "-"}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item md={12} className={clsx(classes.marginRow)}>
                <Typography variant="h5">{t("user:role")}</Typography>
                <Grid item className="mt-2">
                  <Typography variant="body1">{role ? role : "-"}</Typography>
                </Grid>
              </Grid>

              <Grid item md={12} className={clsx(classes.marginRow)}>
                <Typography variant="h5">{t("user:position")}</Typography>
                <Grid item className="mt-2">
                  <Typography variant="body1">{t("user:system")}</Typography>
                </Grid>
              </Grid>

              <Grid item md={12} className={clsx(classes.marginRow)}>
                <Typography variant="h5">{t("user:department")}</Typography>
                <Grid item md={3} className={clsx("mt-2", classes.borderText)}>
                  <Typography variant="body1">
                    {t(`user:department`) + `${" 1"}`}
                  </Typography>
                </Grid>
              </Grid>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
