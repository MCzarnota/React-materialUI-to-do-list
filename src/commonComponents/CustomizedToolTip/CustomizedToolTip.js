import React from "react";
import { makeStyles } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
  toolTip: {}
}));

const CustomizedToolTip = props => {
  const classes = useStyles(props);

  return <Tooltip className={classes.toolTip} arrow {...props} />;
};
export default CustomizedToolTip;
