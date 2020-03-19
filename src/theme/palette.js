import { red, blue, lightBlue, yellow, green } from "@material-ui/core/colors";
const white = "#FFF";
const black = "#000";

export default {
  primary: {
    main: "#db4c3f",
    contrastText: black
  },
  secondary: {
    main: "#ffffff",
    contrastText: black
  },
  success: {
    light: green[300],
    main: green[500],
    dark: green[700],
    contrastText: white
  },
  info: {
    light: blue[300],
    main: blue[500],
    dark: blue[700],
    contrastText: white
  },
  warning: {
    light: yellow[300],
    main: yellow[500],
    dark: yellow[700],
    contrastText: white
  },
  error: {
    light: red[300],
    main: red[500],
    dark: red[700],
    contrastText: white
  },
  background: {
    paper: "#f1f1f1",
    default: "#fafafa"
  },
  taskColors: {
    inbox: "#246fe0",
    today: "#058527",
    next7: "#692fc2"
  },
  timelineOptionColors: {
    tomorrow: "#eb8909",
    today: "#058527",
    next7: "#692fc2"
  },
  border: "#fafafa",
  divider: "#DFE3E8",
  isabelline: "rgba(238, 244, 237, 1)"
};
