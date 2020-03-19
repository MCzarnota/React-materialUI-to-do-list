import React, { useState, createContext } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { getThemeByName } from "../helpers";

export const ThemeContext = createContext(themeName => {});

export const ThemeProvider = props => {
  // State to hold the selected theme name
  const [themeName, setThemeName] = useState("light");

  // Retrieve the theme object by theme name
  const theme = getThemeByName(themeName);

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName }}>
      <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
