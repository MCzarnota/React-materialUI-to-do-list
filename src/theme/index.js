import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import palette from "./palette";
import paletteDark from "./paletteDark";
import typography from "./typography";

// read more at https://material-ui.com/customization/themes
let theme = createMuiTheme({
  palette: palette,
  typography
});
theme = responsiveFontSizes(theme);

let darkTheme = createMuiTheme({
  palette: paletteDark,
  typography
});
darkTheme = responsiveFontSizes(darkTheme);
export { darkTheme };
export default theme;
