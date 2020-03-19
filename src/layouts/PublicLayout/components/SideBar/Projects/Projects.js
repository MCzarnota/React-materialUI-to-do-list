import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import Project from "./components/Project";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  AddProjectDialog,
  CustomizedToolTip
} from "../../../../../commonComponents";
import {
  useProjectsValue,
  useSelectedProjectValue
} from "../../../../../context";
import ArrowForwardIosTwoToneIcon from "@material-ui/icons/ArrowForwardIosTwoTone";
import AddTwoToneIcon from "@material-ui/icons/AddTwoTone";
import Divider from "@material-ui/core/Divider";
import Slide from "@material-ui/core/Slide";
import List from "@material-ui/core/List";

const useStyles = makeStyles(theme => ({
  hideAnimation: {
    overflow: "hidden",
    zIndex: 10
  },
  listItemIcon: {
    minWidth: 30
  },
  addProjectText: {
    color: theme.palette.secondary.dark
  },
  icon: {
    transform: null,
    transition: "transform 0.2s ease"
  },
  iconExpand: {
    transform: "rotate(90deg)"
  },
  isBold: {
    fontWeight: "bold"
  }
}));

function Projects(props) {
  const classes = useStyles(props);
  const { projects } = useProjectsValue();
  let { label, showProjects, onPress } = props;
  const [active, setActive] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const { setSelectedProject } = useSelectedProjectValue();

  const handleShowAddProjectDialog = () => {
    setShowDialog(true);
  };

  const handleCloseAddProjectDialog = () => {
    setShowDialog(false);
  };

  const handleSelectProject = projectId => {
    setActive(projectId);
    setSelectedProject(projectId);
  };
  return (
    <>
      <ListItem onClick={event => onPress(event, label)} button key={label}>
        <ListItemIcon className={classes.listItemIcon}>
          <ArrowForwardIosTwoToneIcon
            className={
              showProjects
                ? `${classes.icon} ${classes.iconExpand}`
                : `${classes.icon}`
            }
          />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.isBold }} primary={label} />
        <CustomizedToolTip title="Add Project">
          <ListItemIcon
            onClick={event => {
              event.stopPropagation();
              handleShowAddProjectDialog();
            }}
            className={classes.listItemIcon}
            edge="end"
          >
            {<AddTwoToneIcon />}
          </ListItemIcon>
        </CustomizedToolTip>
      </ListItem>
      <Divider />
      <div className={classes.hideAnimation}>
        {showProjects ? (
          <Slide direction="down" in={showProjects} mountOnEnter unmountOnExit>
            <div>
              <List>
                {projects &&
                  projects.map((project, index) => (
                    <Project
                      active={active}
                      project={project}
                      key={index}
                      onPress={handleSelectProject}
                    />
                  ))}
              </List>
              <ListItem button onClick={() => handleShowAddProjectDialog()}>
                <ListItemIcon className={classes.listItemIcon} edge="start">
                  {<AddTwoToneIcon color="primary" />}
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.addProjectText }}
                  primary="Add Project"
                />
              </ListItem>
            </div>
          </Slide>
        ) : null}
        <AddProjectDialog
          show={showDialog}
          close={handleCloseAddProjectDialog}
        />
      </div>
    </>
  );
}

export default Projects;
