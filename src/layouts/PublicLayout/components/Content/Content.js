import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import CustomizedSnackbar from "../../../../commonComponents/CustomizedSnackBar/CustomizedSnackBar";
const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: 266,
    minHeight: "calc(100vh)",
    margin: "0 auto",
    backgroundColor: theme.palette.secondary.main,
    [theme.breakpoints.down("md")]: {
      width: "calc(100vw - 266px - 42px)",
      marginLeft: 308
    },
    [theme.breakpoints.down(750)]: {
      marginLeft: 0,
      width: "auto !important",
      padding: 0,
      zIndex: 100
    }
  },
  editor: {
    verticalAlign: "top",
    paddingLeft: 44,
    paddingRight: 44,
    paddingTop: 80,
    paddingBottom: 84,
    [theme.breakpoints.down(750)]: {
      padding: "6px 16x 12px 35px",
      paddingTop: 67,
      minWidth: 325
    }
  }
}));

function Content(props) {
  const classes = useStyles();
  const { children } = props;
  const [fadeIn, setfadeIn] = useState(false);

  useEffect(() => {
    setfadeIn(true);
  }, []);
  return (
    <main className={classes.root}>
      <div className={classes.editor}>{children} </div>
      <CustomizedSnackbar />
    </main>
  );
}
export default Content;
