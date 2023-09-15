import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { addLogin, addToken } from "../js/actions";
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
  CircularProgress,
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
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import ModalResetPassword from "../component/modalResetPassword";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import apis from "../js/apis";

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
    padding: "24px !important",
  },
}));

function Login(props) {
  // const user = useSelector((state) => state.user);
  // const login = useSelector((state) => state.login);
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
  const [alertShow, setAlertShow] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

   // validate pass forget //
   const [isValidateForget, setIsValidateForget] = useState(false);
   const [messageForget, setMessageForget] = useState("");

  //   useEffect(() => {
  //     document.title = `You clicked ${data} times`;
  //   });

  // const display = (value) => {
  //   console.log(value);
  //   dispatch(addLogin(value));
  // };

  const swalFire = (msg) => {
    MySwal.fire({
      icon: 'warning',
      confirmButtonText: 'ตกลง',
      text: msg
    });
  }

  const handleLogIn = async () => {
    setIsLoading(true);
    if (email.trim() === "" || passWord.trim() === "") {
      setAlertShow(true);
      setMessage("กรุณากรอกอีเมลหรือรหัสผ่าน");
      setIsLoading(false);
      return;
    }
    // let response;
    try {
      const body = {
        username: email.trim(),
        password: passWord.trim(),
      };
      await API.userLogin(body).then((response) => {
        const dataPayload = response.data;
        console.log('dataPayload', dataPayload);
        dispatch(addLogin(dataPayload?.payload));
        navigate("/dashboard");
        dispatch(addToken(dataPayload?.token))
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      const response = error.response
      swalFire(response.data);
      setIsLoading(false);
    }

    // if (email === "test" && passWord === "1234") {
    //   navigate("/dashboard");
    //   setIsLoading(false);
    // }
    // console.log("66666666", email, passWord);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setAlertShow(false);
  };

  const handlePasswordChange = (event) => {
    setPassWord(event.target.value);
    setAlertShow(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (newPassWord !== confrimPassword) {
      setIsValidateForget(true);
      setMessageForget('กรุณากรอกรหัสผ่านกับยืนยันรหัสผ่านให้ตรงกัน')
    } else {
      setIsValidateForget(false);
      setMessageForget('')
    }
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
      {isLoading ? (
        <Box mt={4} width={1} display="flex" justifyContent="center">
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
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
              {alertShow && (
                <Grid item md={12} className={classes.marginTop}>
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    <Typography variant="body2">{message}</Typography>
                  </Alert>
                </Grid>
              )}

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
        </>
      )}

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
        isValidateForget={isValidateForget}
        messageForget={messageForget}
      />
    </Grid>
  );
}

export default Login;
