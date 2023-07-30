import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007bff",
    },
    secondary: {
      main: "#ff6f00",
    },
  },
  typography: {
    fontFamily: "Nunito, sans-serif !important",
    h1: {
      fontSize: 26,
    },
    h2: {
      fontSize: 24,
    },
    h3: {
      fontSize: 22,
    },
    h4: {
      fontSize: 20,
    },
    h5: {
      fontSize: 18,
    },
    h6: {
      fontSize: 17,
    },
    overline: {
      fontSize: 15,
      lineHeight: 0,
    },
    caption: {
      fontSize: 16,
    },
    button: {
      fontSize: 19,
      lineHeight: 1.3,
      textTransform: "none",
    },
    inherit: {},
    subtitle1: {
      fontSize: 24,
    },
    subtitle2: {
      fontSize: 17,
    },
    body1: {
      fontSize: 15,
    },
    body2: {
      fontSize: 20,
    },
  },
});
export default theme;
