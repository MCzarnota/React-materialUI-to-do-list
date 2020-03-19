import React, { createContext, useContext, useState } from "react";
import { useProjects } from "../hooks";

export const SnackbarContext = createContext();
export const SnackBarProvider = ({ children }) => {
  const [snackBarConfig, setSnackBarConfig] = useState({
    text: "",
    severity: "success",
    shouldOpen: false
  });

  return (
    <SnackbarContext.Provider value={[snackBarConfig, setSnackBarConfig]}>
      {children}
    </SnackbarContext.Provider>
  );
};
