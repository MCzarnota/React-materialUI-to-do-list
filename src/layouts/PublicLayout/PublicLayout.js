import React from "react";
import { makeStyles } from "@material-ui/core";
import { NavBar } from "./components";
import SlideUp from "./components/NavBar/components/SlideUp";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import SideBar from "./components/SideBar";
import Content from "./components/Content";
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.common.white
  },
  applicationHolder: {
    display: "flex",
    justifyContent: "center",
    minHeight: "100vh",
    marginLeft: "calc( 100vw - 100%)",
    marginRight: 0,
    [theme.breakpoints.down("md")]: {
      marginLeft: 0
    }
  },
  contentWrapper: {
    width: 922,
    [theme.breakpoints.down("md")]: {
      width: "100%"
    }
  }
}));

function PublicLayout(props) {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <NavBar />
      <div className={classes.applicationHolder}>
        <div className={classes.contentWrapper}>
          <SideBar />
          <Content {...props} />
          <SlideUp {...props}>
            <Fab color="secondary" size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </SlideUp>
        </div>
      </div>
    </div>
  );
}

export default PublicLayout;
