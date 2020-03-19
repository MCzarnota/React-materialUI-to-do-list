import { createMuiTheme } from "@material-ui/core/styles";
import palette from "./palette";
import paletteDark from "./paletteDark";
import typography from "./typography";

// read more at https://material-ui.com/customization/themes
const theme = createMuiTheme({
  palette: palette,
  typography
});

export const darkTheme = createMuiTheme({
  palette: paletteDark,
  typography
});

export default theme;
