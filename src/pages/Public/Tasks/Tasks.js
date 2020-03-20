import PropTypes from "prop-types";
import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CircleChecked from "@material-ui/icons/CheckCircleOutline";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import Checkbox from "@material-ui/core/Checkbox";
import ListSubheader from "@material-ui/core/ListSubheader";
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
    "&:hover": {
      "& span": {
        "& svg": {
          "& path": {
            d:
              "path('M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z')"
          }
        }
      }
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
            data-testid="project-name"
            id="nested-list-subheader"
          >
            {projectName}
          </ListSubheader>
        }
      >
        {tasks.map(task => {
          const labelId = `checkbox-list-label-${task.id}`;

          return (
            <ListItem
              disableGutters
              className={classes.task}
              key={task.id}
              role={undefined}
              dense
              disableRipple
            >
              <Checkbox
                className={classes.checkBox}
                icon={<CircleUnchecked />}
                edge="start"
                tabIndex={-1}
                value={task.task}
                inputProps={{ "aria-label": labelId }}
                onClick={event => {
                  event.stopPropagation();
                  handleSelectedTask(event, task.id);
                }}
              />

              <ListItemText
                id={`List item text ${task.id}`}
                primary={task.task}
              />
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
