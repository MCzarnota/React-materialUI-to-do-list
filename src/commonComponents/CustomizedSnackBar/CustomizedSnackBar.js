import React, { useState, useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { SnackbarContext } from "../../context";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

export default function CustomizedSnackbar() {
  const [snackBarConfig, setSnackBarConfig] = useContext(SnackbarContext);

  const classes = useStyles();

  const handeClose = () => {
    setSnackBarConfig({
      ...snackBarConfig,
      text: "",
      severity: "success",
      shouldOpen: false
    });
  };

  return (
    <>
      {snackBarConfig.shouldOpen && (
        <div className={classes.root}>
          <Snackbar
            open={snackBarConfig.shouldOpen}
            autoHideDuration={3000}
            onClose={handeClose}
          >
            <Alert
              variant="filled"
              icon={<CheckIcon fontSize="inherit" />}
              onClose={handeClose}
              severity={snackBarConfig.severity}
            >
              {snackBarConfig.text}
            </Alert>
          </Snackbar>
        </div>
      )}
    </>
  );
}
