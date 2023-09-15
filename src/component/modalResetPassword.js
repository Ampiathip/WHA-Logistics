import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { addLogin } from "../js/actions";
import {
  Grid,
  Typography,
  Button,
  makeStyles,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";
import clsx from "clsx";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import apis from "../js/apis";
import Validate from "./validate";

const API = apis.getAPI();
const MySwal = withReactContent(Swal);

const useStyles = makeStyles((theme) => ({
  contentHight: {
    height: "100vh",
    alignItems: "center",
  },
  flexRow: {
    display: "flex",
    justifyContent: "space-around",
  },
  boxImage: {
    width: "-webkit-fill-available",
  },
  textCenter: {
    textAlign: "center",
  },
  marginTop: {
    marginTop: 25,
  },
  backGround: {
    backgroundColor: "#f5f5f5",
    color: "#000",
    "&:hover": {
      backgroundColor: "#f5f5f5",
      boxShadow: `none`,
    },
  },
  cuserPoint: {
    cursor: "pointer",
    paddingTop: 15,
  },
  backGroundReset: {
    backgroundColor: "#03257D",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#03257D",
      boxShadow: `none`,
    },
  },
  widthInput: {
    width: "100%",
  },
  paddingFoot: {
    padding: "24px !important",
  },
}));

const ModalResetPassword = ({
  open,
  close,
  handleNewPassChange,
  newPassWord,
  confrimPassword,
  handleConfrimChange,
  handleReset,
  isValidateForget,
  messageForget,
}) => {
  //   const user = useSelector((state) => state.user);
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t, i18n } = useTranslation(["home", "footer", "login"]);

  //   const [email, setEmail] = useState("");
  //   const [passWord, setPassWord] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confrimShowPassword, setConfrimShowPassword] = useState(false);
  //   const [newPassWord, setNewPassWord] = useState("");
  //   const [confrimPassword, setConfrimPassword] = useState("");

  // modal //
  const theme = useTheme();
  //   const [open, setOpen] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // useEffect(() => {

  // },[login])

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfrimPassword = () =>
    setConfrimShowPassword((show) => !show);

  const handleMouseDownConfrimPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {/* Modal */}
      <Dialog
        fullScreen={fullScreen}
        // className={classes.modalWidth}
        open={open}
        onClose={close}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <Typography variant="h5">{t("login:resetPass")}</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">{t("login:subtitlePass")}</Typography>
          <Grid item md={12} className={classes.marginTop}>
            <Typography variant="subtitle1">{t("login:newPass")}</Typography>
            <FormControl
              variant="outlined"
              className={clsx(classes.marginTop)}
              fullWidth
              size="small"
            >
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={newPassWord}
                onChange={handleNewPassChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                // label="Password"
              />
            </FormControl>
          </Grid>

          {/* comfrim Pass */}
          <Grid item md={12} className={classes.marginTop}>
            <Typography variant="subtitle1">
              {t("login:comfrimPass")}
            </Typography>
            <FormControl
              variant="outlined"
              className={clsx(classes.marginTop)}
              fullWidth
              size="small"
            >
              <OutlinedInput
                id="outlined-adornment-password"
                type={confrimShowPassword ? "text" : "password"}
                value={confrimPassword}
                onChange={handleConfrimChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfrimPassword}
                      onMouseDown={handleMouseDownConfrimPassword}
                      edge="end"
                    >
                      {confrimShowPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                error={isValidateForget}
              />
              {isValidateForget && <Validate errorText={messageForget}/>}
            </FormControl>
          </Grid>
        </DialogContent>
        <DialogActions className={classes.paddingFoot}>
          {/* <Button autoFocus onClick={handleClose}>
            Disagree
          </Button> */}
          <Button
            onClick={handleReset}
            disabled={isValidateForget}
            autoFocus
            className={isValidateForget ? classes.backGround : classes.backGroundReset}
          >
            {t("login:btnReset")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

ModalResetPassword.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  handleNewPassChange: PropTypes.func,
  newPassWord: PropTypes.string,
  confrimShowPassword: PropTypes.bool,
  handleConfrimChange: PropTypes.func,
  handleReset: PropTypes.func,
};

export default ModalResetPassword;
