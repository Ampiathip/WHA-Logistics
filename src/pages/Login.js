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
} from "@mui/material";

function Login(props) {
  const user = useSelector((state) => state.user);
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation(["home", "footer", "login"]);

  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const navigate = useNavigate();
  //   const [data, setDdata] = useState("user");

  //   useEffect(() => {
  //     document.title = `You clicked ${data} times`;
  //   });

  const display = (value) => {
    console.log(value);
    dispatch(addLogin(value));
  };

  const handleLogIn = () => {
    if (email === 'TEST' && passWord === '1234') {
        navigate("/dashboard");
    }
    console.log('66666666', email, passWord);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <Grid item md={12} className="boxLogin backGrourdLog">
        <Grid item md={6} className="imageCenter maginImage">
          <Card className="backGrourdLog">
            <img
              src={process.env.PUBLIC_URL + "/img/imageLogin.png"}
              alt="img-logo-logIn"
              className="boxImage"
            />
          </Card>
        </Grid>

        <Grid item md={6} className="hightBox">
          <Card>
            <CardContent>
              <Grid item md={12} className="boxInputLog">
                <img
                  src={process.env.PUBLIC_URL + "/img/Group.png"}
                  alt="img-logo"
                />
              </Grid>
              <Grid item md={12} className="boxInputLog">
                <Typography variant="body1" className="pt-3">
                  {t("login:header")}
                </Typography>
                <Typography variant="h6" className="pt-3">
                  {t("login:subHead")}
                </Typography>
              </Grid>
              <Grid item md={12} className="pt-4">
                <Grid item xs={12} md={4}>
                  <Typography variant="body2">{t("login:email")}</Typography>
                  <Typography variant="subtitle2">
                    <TextField
                      data-testid="input-email"
                      variant="outlined"
                      size="small"
                      placeholder={t("login:email")}
                      value={email}
                      inputProps={{ maxLength: 70 }}
                      onChange={(e) => {
                        setEmail(e.target.value.toUpperCase());
                      }}
                      fullWidth
                    ></TextField>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item md={12} className="pt-4">
                <Grid item xs={12} md={4}>
                  <Typography variant="body2">{t("login:password")}</Typography>
                  <Typography variant="subtitle2">
                    <TextField
                      data-testid="input-email"
                      variant="outlined"
                      size="small"
                      placeholder={t("login:password")}
                      value={passWord}
                      onChange={(e) => {
                        setPassWord(e.target.value);
                      }}
                      fullWidth
                    ></TextField>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item md={12}>
                <Typography variant="body1" className="pt-3">
                  {t("login:forgot")}
                </Typography>
              </Grid>
              <Grid item md={12} className="boxInputLog pt-5">
                <Button variant="contained" className="btnLogColor" onClick={handleLogIn}>
                  {t("login:btnLog")}
                </Button>
              </Grid>
              <Grid item md={12} className="boxInputLog pt-5">
                <Typography variant="body2">{t("login:webFooter")}</Typography>
                <Typography variant="h6">{t("login:footer")}</Typography>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
