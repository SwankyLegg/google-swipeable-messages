import { createTheme, responsiveFontSizes } from "@mui/material";

const baseTheme = createTheme({
  palette: {
    primary: {
      main: '#673AB7'
    }
  }
});
const theme = responsiveFontSizes(baseTheme);

export default theme;