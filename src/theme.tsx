import { createTheme, responsiveFontSizes } from "@mui/material";

const baseTheme = createTheme();
const theme = responsiveFontSizes(baseTheme);

export default theme;