import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { fade, makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import MenuItems from "./components/MenuItems/";
import logo from "./../../../../assets/logo.png";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    borderBottomColor: theme.palette.primary.dark,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    color: theme.palette.common.white,
    width: "100vw",
    height: 44,
    top: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed"
  },
  logo: {
    width: 25,
    height: 25
  },
  innerBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    width: 922,
    paddingLeft: 13,
    position: "relative",
    [theme.breakpoints.down("md")]: {
      paddingLeft: 48
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.primary.dark,
    zIndex: 120
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    "&:focus": {
      width: 500,
      backgroundColor: theme.palette.secondary.main,
      color: "black"
    },
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  }
}));

const NavBar = props => {
  const classes = useStyles(props);
  return (
    <>
      <AppBar id="back-to-top-anchor" className={classes.root} position="fixed">
        <Toolbar className={classes.innerBar}>
          <img src={logo} className={classes.logo} alt="logo"></img>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search… ( not yet implemented )"
              classes={{
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <MenuItems />
        </Toolbar>
      </AppBar>
    </>
  );
};

NavBar.propTypes = {};

export default NavBar;
