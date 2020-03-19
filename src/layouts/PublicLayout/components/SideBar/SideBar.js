import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  COMBINED_TASKS,
  SIDEBAR_MIDDLE_LABELS
} from "../../../../constants/index";
import Projects from "./Projects";
import { useSelectedProjectValue } from "../../../../context";

const useStyles = makeStyles(theme => ({
  root: {
    overflow: "hidden",
    position: "fixed",
    height: "calc(100vh - 50px)",
    width: 266,
    paddingTop: 74,
    paddingLeft: 32,
    marginLeft: -32,
    overflowX: "hidden",
    borderRight: "1px solid" + " " + theme.palette.secondary.dark,
    zIndex: 10,
    [theme.breakpoints.down("md")]: {
      paddingLeft: 42,
      marginLeft: 0
    },
    [theme.breakpoints.down(750)]: {
      display: "none"
    }
  },
  wrapper: {
    marginTop: 85
  },
  drawerPaper: {
    width: 266,
    left: "initial"
  },

  isBold: {
    fontWeight: "bold"
  },

  listItemIcon: {
    minWidth: 30
  }
}));

const SideBar = props => {
  const classes = useStyles(props);
  const [active, setActive] = useState("Inbox");
  const [showProjects, setShowProjects] = useState(false);
  const [showLabels, setShowLabels] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const { setSelectedProject } = useSelectedProjectValue();

  const showListItems = (event, labelId) => {
    switch (labelId) {
      case "Projects":
        setShowProjects(!showProjects);
        break;
      case "Filters":
        setShowFilters(!showFilters);
        break;
      case "Labels":
        setShowLabels(!showLabels);
        break;
      default:
        break;
    }
  };

  const handleSelectedTimeline = timelineType => {
    setActive(timelineType);
    setSelectedProject(timelineType);
  };

  return (
    <>
      <Drawer
        data-testid={"sidebar"}
        className={classes.root}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <List className={classes.wrapper}>
          {COMBINED_TASKS.map(combinedTask => (
            <ListItem
              onClick={() => handleSelectedTimeline(combinedTask.label)}
              data-testod={combinedTask.label}
              button
              key={combinedTask.key}
            >
              <ListItemIcon
                className={classes.listItemIcon}
                style={{ color: combinedTask.color }}
              >
                <combinedTask.icon />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: active === combinedTask.label ? classes.isBold : ""
                }}
                primary={combinedTask.label}
              />
            </ListItem>
          ))}
        </List>
        <Projects
          label={SIDEBAR_MIDDLE_LABELS[0]}
          onPress={showListItems}
          showProjects={showProjects}
        ></Projects>
      </Drawer>
    </>
  );
};

SideBar.propTypes = {};

export default SideBar;
