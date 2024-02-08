import { createTheme } from "@mui/material/styles";

//Colores principales
const columbia = "#CBDFEA";
const celeste = "#A3C6D0";
const cerulean = "#2E7195";

const theme = createTheme({
  palette: {
    primary: {
      main: columbia,
    },
    secondary: {
      main: cerulean,
    },
    backgroundk: {
      default: celeste,
    },
  },
  fontFamily: '"Satisfy"',
});

export default theme;
