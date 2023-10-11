import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = createTheme({
  components: {
    'MuiTablePagination' : {
      'styleOverrides': {
        'selectLabel': {
          fontSize: 14,
          marginBottom: 10,
        },
        'displayedRows': {
          fontSize: 14,
          marginBottom: 0,
        },
      }
    },
    'MuiSvgIcon': {
      'styleOverrides': {
        'root': {
          fontSize: 20,
        }
      }
    }
  },

  palette: {
    primary: {
      main: "#007bff",
    },
    secondary: {
      main: "#ff6f00",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif !important",
    h1: {
      fontSize: 26,
      fontWeight: 'bold',
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold',
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
      fontSize: 14,
    },
    overline: {
      fontSize: 15,
      lineHeight: 0,
    },
    caption: {
      fontSize: 12,
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
