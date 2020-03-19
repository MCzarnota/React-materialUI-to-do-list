import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { CustomizedToolTip } from "../index";
import FiberManualRecordTwoToneIcon from "@material-ui/icons/FiberManualRecordTwoTone";
import { CustomizedPopper } from "../index";
import ScheduleIcon from "@material-ui/icons/Schedule";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import { TIMELINE_OPTIONS } from "../../constants";
import DoneTwoToneIcon from "@material-ui/icons/DoneTwoTone";
import moment from "moment";
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    zIndex: 99,
    width: 250
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between"
  },
  iconWrapper: {
    display: "flex"
  },
  icon: {
    minWidth: 30,
    Width: 30
  },
  disableFlex: {
    flex: "initial"
  }
}));

const TimeLineWindow = props => {
  const { show, handleSelectTaskDate, taskDate, setTaskDate } = props;
  const classes = useStyles(props);

  const calculateDate = dateType => {
    let date = "";
    switch (dateType) {
      case "Tomorrow":
        date = moment().add(1, "days");

        break;
      case "Next week":
        date = moment().add(7, "days");

        break;
      default:
        date = moment();
        break;
    }
    return date;
  };
  return (
    <>
      <CustomizedToolTip title="Schedule the task">
        <IconButton onClick={show} aria-label="change-time">
          <ScheduleIcon />
        </IconButton>
      </CustomizedToolTip>
      <CustomizedPopper {...props}>
        <div className={classes.root}>
          <List>
            {TIMELINE_OPTIONS.map((timeline, index) => (
              <>
                <ListItem
                  className={classes.listItem}
                  classes={{
                    selected: classes.selected
                  }}
                  onClick={() =>
                    handleSelectTaskDate(
                      moment(calculateDate(timeline.label)).format("DD/MM/YYYY")
                    )
                  }
                  button
                >
                  <div className={classes.iconWrapper}>
                    <ListItemIcon
                      style={{ color: timeline.color }}
                      className={classes.icon}
                    >
                      <timeline.icon />
                    </ListItemIcon>
                    <ListItemText primary={timeline.label} />
                  </div>
                  <ListItemText
                    classes={{ root: classes.disableFlex }}
                    secondary={moment(calculateDate(timeline.label)).format(
                      "dddd DD"
                    )}
                  />
                </ListItem>
              </>
            ))}
          </List>
        </div>
      </CustomizedPopper>
    </>
  );
};
export default TimeLineWindow;
