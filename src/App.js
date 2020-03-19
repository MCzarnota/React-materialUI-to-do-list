import React, { Component } from "react";
import Routes from "./Routes";
//MaterialUI
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "./context/app-config-context";
import {
  ProjectProvider,
  SelectedProjectProvider,
  SnackBarProvider
} from "./context";

class App extends Component {
  render() {
    return (
      <ThemeProvider>
        <CssBaseline />
        <SelectedProjectProvider>
          <ProjectProvider>
            <SnackBarProvider>
              <Routes />
            </SnackBarProvider>
          </ProjectProvider>
        </SelectedProjectProvider>
      </ThemeProvider>
    );
  }
}

export default App;
