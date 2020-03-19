import PropTypes from "prop-types";
import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import CircleChecked from "@material-ui/icons/CheckCircleOutline";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import ListSubheader from "@material-ui/core/ListSubheader";
import CommentIcon from "@material-ui/icons/Comment";
import { AddTask } from "../../../commonComponents";
import { SnackbarContext } from "../../../context";
import { COMBINED_TASKS } from "../../../constants";
import {
  combinedTasksExist,
  getTitle,
  getCombinedTitle
} from "../../../helpers";
import { firebase } from "../../../firebase";
import { useTasks } from "../../../hooks";
import { useSelectedProjectValue, useProjectsValue } from "../../../context";

const useStyles = makeStyles(theme => ({
  task: {
    borderBottom: `1px solid ${theme.palette.secondary.dark}`,
    color: theme.palette.primary.contrastText
  },
  checkBox: {
    color: "black !important",
    "&:hover": {
      color: "green !important"
    }
  },
  checkBoxIcon: {
    "&:hover": {
      fill: "black !important"
    }
  },
  listSubHeader: {
    color: theme.palette.primary.contrastText,
    fontSize: "2.2em",
    fontWeight: "bold"
  }
}));

function Tasks(props) {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject);
  const classes = useStyles();
  const [snackBarConfig, setSnackBarConfig] = useContext(SnackbarContext);

  let projectName = "";

  if (combinedTasksExist(selectedProject) && selectedProject) {
    projectName = getCombinedTitle(COMBINED_TASKS, selectedProject).label;
  }

  if (
    projects &&
    projects.length > 0 &&
    selectedProject &&
    !combinedTasksExist(selectedProject)
  ) {
    projectName = getTitle(projects, selectedProject).name;
  }

  useEffect(() => {
    document.title = `${projectName}: Todoist`;
  });

  const handleSelectedTask = (event, taskId) => {
    console.log(taskId);
    const archiveTask = () => {
      firebase
        .firestore()
        .collection("tasks")
        .doc(taskId)
        .update({
          archived: true
        })
        .then(() => {
          setSnackBarConfig({
            ...snackBarConfig,
            text: `The task has been completed`,
            severity: "success",
            shouldOpen: true
          });
        });
    };
    archiveTask();
  };

  return (
    <>
      <List
        className={classes.root}
        data-testid="tasks"
        subheader={
          <ListSubheader
            disableGutters
            className={classes.listSubHeader}
            component="div"
            data-testid="project-name"
            id="nested-list-subheader"
          >
            {projectName}
          </ListSubheader>
        }
      >
        {tasks.map(task => {
          const labelId = `checkbox-list-label-${0}`;

          return (
            <ListItem
              disableGutters
              className={classes.task}
              key={task}
              role={undefined}
              dense
              disableRipple
            >
              <ListItemIcon>
                <Checkbox
                  className={classes.checkBox}
                  icon={<CircleUnchecked />}
                  checkedIcon={<CircleChecked />}
                  edge="start"
                  checked={true}
                  tabIndex={-1}
                  value={task.task}
                  inputProps={{ "aria-labelledby": task.task }}
                  iconStyle={{ color: "black" }}
                  onClick={event => {
                    event.stopPropagation();
                    handleSelectedTask(event, task.id);
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={task.task} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments">
                  <CommentIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <AddTask />
    </>
  );
}

Tasks.propTypes = {};

export default Tasks;
