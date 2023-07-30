import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { addLogin } from "../js/actions";
import {
  Grid,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  makeStyles,
  Box,
  FormControl,
  OutlinedInput,
  InputLabel,
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
import ModalResetPassword from "../component/modalResetPassword";

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
    backgroundColor: "#F5F9FF",
  },
  backGroundLogin: {
    backgroundColor: "#ffffff",
    padding: 20,
  },
  btnLogColor: {
    backgroundColor: "#000",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#000",
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
    padding: '24px !important',
  }
}));

function Login(props) {
  const user = useSelector((state) => state.user);
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t, i18n } = useTranslation(["home", "footer", "login"]);

  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  // const [confrimShowPassword, setConfrimShowPassword] = useState(false);
  const [newPassWord, setNewPassWord] = useState("");
  const [confrimPassword, setConfrimPassword] = useState("");
  const navigate = useNavigate();

  // modal //
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
  //   const [data, setDdata] = useState("user");

  //   useEffect(() => {
  //     document.title = `You clicked ${data} times`;
  //   });

  const display = (value) => {
    console.log(value);
    dispatch(addLogin(value));
  };

  const handleLogIn = () => {
    if (email === "test" && passWord === "1234") {
      navigate("/dashboard");
    }
    console.log("66666666", email, passWord);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassWord(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleClickShowPassword = () => setShowPassword((show) => !show);

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

  // const handleClickShowConfrimPassword = () => setConfrimShowPassword((show) => !show);

  // const handleMouseDownConfrimPassword = (event) => {
  //   event.preventDefault();
  // };

  const handleNewPassChange = (event) => {
    setNewPassWord(event.target.value);
  };

  const handleConfrimChange = (event) => {
    setConfrimPassword(event.target.value);
  };


  return (
    <Grid
      container
      component="main"
      className={clsx(
        classes.flexRow,
        classes.contentHight,
        classes.backGround
      )}
    >
      <Grid item md={6}>
        <Box>
          <img
            src={process.env.PUBLIC_URL + "/img/imageLogin.png"}
            alt="img-logo-logIn"
            className={classes.boxImage}
          />
        </Box>
      </Grid>
      <Grid item md={5} className={classes.backGroundLogin}>
        <Box>
          <Grid item md={12} className={classes.flexRow}>
            <img
              src={process.env.PUBLIC_URL + "/img/Group.png"}
              alt="img-logo"
            />
          </Grid>
          <Grid item md={12} className={classes.textCenter}>
            <Typography variant="h6">{t("login:header")}</Typography>
            <Typography variant="h5" className="pt-3">
              {t("login:subHead")}
            </Typography>
          </Grid>
          <Grid item md={12} className="pt-3">
            <Typography variant="h6" className="pb-3">
              {t("login:email")}
            </Typography>
            <Grid item xs={12} md={12}>
              <Typography variant="subtitle2">
                <TextField
                  data-testid="input-email"
                  variant="outlined"
                  size="small"
                  placeholder={t("login:email")}
                  value={email}
                  inputProps={{ maxLength: 70 }}
                  onChange={handleEmailChange}
                  fullWidth
                ></TextField>
              </Typography>
            </Grid>
          </Grid>
          <Grid item md={12} className="pt-4">
            <Typography variant="h6" className="pb-3">
              {t("login:password")}
            </Typography>
            <Grid item xs={12} md={12}>
              <Typography variant="subtitle2">
                <TextField
                  data-testid="input-password"
                  variant="outlined"
                  size="small"
                  placeholder={t("login:password")}
                  value={passWord}
                  inputProps={{ maxLength: 70 }}
                  onChange={handlePasswordChange}
                  fullWidth
                ></TextField>
              </Typography>
            </Grid>
          </Grid>

          <Grid item md={12}>
            <Typography
              variant="body1"
              className={classes.cuserPoint}
              onClick={handleClickOpen}
            >
              {t("login:forgot")}
            </Typography>
          </Grid>
          <Grid
            item
            md={12}
            className={clsx(classes.flexRow, classes.marginTop)}
          >
            <Button
              variant="contained"
              className={classes.btnLogColor}
              onClick={handleLogIn}
            >
              {t("login:btnLog")}
            </Button>
          </Grid>
          <Grid
            item
            md={12}
            className={clsx(classes.textCenter, classes.marginTop)}
          >
            <Typography variant="body2">{t("login:webFooter")}</Typography>
            <Typography variant="h6">{t("login:footer")}</Typography>
          </Grid>
        </Box>
      </Grid>

      {/* Modal */}
      {/* <Dialog
        fullScreen={fullScreen}
        className={classes.modalWidth}
        open={open}
        onClose={handleClose}
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
                label="Password"
              />
            </FormControl>
          </Grid>

          comfrim Pass
          <Grid item md={12} className={classes.marginTop}>
            <Typography variant="subtitle1">{t("login:comfrimPass")}</Typography>
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
              />
            </FormControl>
          </Grid>
        </DialogContent>
        <DialogActions className={classes.paddingFoot}>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button
            onClick={handleClose}
            autoFocus
            className={classes.backGroundReset}
          >
            {t("login:btnReset")}
          </Button>
        </DialogActions>
      </Dialog> */}
      <ModalResetPassword 
        open={open}
        close={handleClose}
        handleNewPassChange={handleNewPassChange}
        newPassWord={newPassWord}
        confrimPassword={confrimPassword}
        handleConfrimChange={handleConfrimChange}
        handleReset={handleClose}
      />
    </Grid>
  );
}

export default Login;