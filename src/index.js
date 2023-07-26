import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "@mui/material/styles";
// import './css/bootstrap.min.css';
// import "./css/style.css";
import theme from "./theme";
import Router from "./js/Route";
import store from "./js/store";
import i18n from "./i18n";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </I18nextProvider>
  </Provider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
