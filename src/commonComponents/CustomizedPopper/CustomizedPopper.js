import React from "react";
import { makeStyles } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import Popper from "@material-ui/core/Popper";

const useStyles = makeStyles(theme => ({
  poperRoot: {
    zIndex: 9999,
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: "-0.9em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "0 1em 1em 1em",
        borderColor: `transparent transparent ${theme.palette.primary.main} transparent`
      }
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: "-0.9em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "1em 1em 0 1em",
        borderColor: `${theme.palette.primary.main} transparent transparent transparent`
      }
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: "-0.9em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 1em 1em 0",
        borderColor: `transparent ${theme.palette.primary.main} transparent transparent`
      }
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: "-0.9em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 0 1em 1em",
        borderColor: `transparent transparent transparent ${theme.palette.primary.main}`
      }
    }
  },
  arrow: {
    position: "absolute",
    fontSize: 7,
    width: "3em",
    height: "3em",
    "&::before": {
      content: '""',
      margin: "auto",
      display: "block",
      width: 0,
      height: 0,
      borderStyle: "solid"
    }
  }
}));

const CustomizedPopper = props => {
  const { anchor, shouldShow, children } = props;
  const classes = useStyles(props);
  const [arrowRef, setArrowRef] = React.useState(null);
  return (
    <Popper
      placement="bottom"
      className={classes.poperRoot}
      open={anchor && shouldShow}
      anchorEl={anchor}
      modifiers={{
        arrow: {
          enabled: true,
          element: arrowRef
        }
      }}
    >
      {shouldShow ? <span className={classes.arrow} ref={setArrowRef} /> : null}
      {children}
    </Popper>
  );
};
export default CustomizedPopper;
