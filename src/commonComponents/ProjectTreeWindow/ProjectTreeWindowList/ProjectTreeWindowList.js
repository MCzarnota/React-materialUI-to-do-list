import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useProjectsValue, useSelectedProjectValue } from "../../../context";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import FiberManualRecordTwoToneIcon from "@material-ui/icons/FiberManualRecordTwoTone";
import DoneTwoToneIcon from "@material-ui/icons/DoneTwoTone";
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    zIndex: 99
  },
  selected: {
    "& $child": {
      visibility: "visible !important"
    }
  },
  child: {
    visibility: "hidden"
  },
  listItemIcon: {
    minWidth: 30
  },
  successIcon: {
    color: theme.palette.primary.main
  },
  iconWrapper: {
    width: 30,
    minWidth: "initial !important"
  }
}));

const ProjectTreeWindowList = props => {
  const classes = useStyles(props);
  const { handleSelectProject, active } = props;
  const { projects } = useProjectsValue();

  return (
    <div className={classes.root}>
      <List>
        {projects &&
          projects.map((project, index) => (
            <ListItem
              classes={{
                listItem: classes.root,
                selected: classes.selected
              }}
              onClick={() =>
                handleSelectProject(project.projectId, project.name)
              }
              selected={active === project.projectId}
              button
            >
              <ListItemIcon
                className={classes.listItemIcon}
                style={{ color: project.color }}
              >
                <FiberManualRecordTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary={project.name} />
              <ListItemIcon className={classes.iconWrapper}>
                <DoneTwoToneIcon
                  className={`${classes.listItemIcon} ${classes.successIcon} ${classes.child}`}
                />
              </ListItemIcon>
            </ListItem>
          ))}
      </List>
    </div>
  );
};
export default ProjectTreeWindowList;
