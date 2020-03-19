import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddTwoToneIcon from "@material-ui/icons/AddTwoTone";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import { useSelectedProjectValue } from "../../context";
import moment from "moment";
import { firebase } from "../../firebase";

const useStyles = makeStyles(theme => ({
  listItemIcon: {
    minWidth: 30
  },
  addTaskText: {
    color: theme.palette.secondary.dark
  },
  show: {
    display: "flex"
  },
  hide: {
    display: "none"
  },
  cancelButtonTextColor: {
    color: theme.palette.common.black
  },
  wrapper: {
    posistion: "relative"
  }
}));

const AddTask = props => {
  const classes = useStyles(props);
  const [showAddTaskInput, setShowAddTaskInput] = useState(false);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [project, setProject] = useState("");
  const [showProjectTree, setShowProjectTree] = useState(false);
  const [showTaskDateCalendar, setShowTaskDateCalendar] = useState(false);
  const { selectedProject } = useSelectedProjectValue();
  const [textInputRef, setTextInputRef] = useState(null);

  const handleChangeTaskDescription = event => {
    setTaskDescription(event.target.value);
  };

  const handleShowAddTaskInput = () => {
    setShowAddTaskInput(true);
  };

  const handleCloseAddTaskInput = () => {
    setShowAddTaskInput(false);
  };

  const handleAddTaskSubmit = () => {
    const projectId = project || selectedProject;
    let calculatedDate = "";

    switch (projectId) {
      case "Today":
        calculatedDate = moment.format("DD/MM/YYYY");
        break;
      case "Next 7 Days":
        calculatedDate = moment()
          .add(7, "days")
          .format("DD/MM/YYYY");
        break;
    }

    //call firebase
    firebase
      .firestore()
      .collection("tasks")
      .add({
        archived: false,
        projectId,
        task: taskDescription,
        userId: "12",
        date: calculatedDate || taskDate
      })
      .then(() => {
        //reset input values
        textInputRef.value = "";
        setTaskDescription("");
        setProject("");
        setShowAddTaskInput(false);
        setShowProjectTree(false);
      });
  };

  return (
    <div className={classes.wrapper} data-testid="add-task-main">
      <OutlinedInput
        onChange={handleChangeTaskDescription}
        inputRef={input => {
          setTextInputRef(input);
          return input && input.focus();
        }}
        fullWidth
        className={showAddTaskInput ? classes.show : classes.hide}
        placeholder="Provide a task description"
        inputProps={{ "aria-label": "add task" }}
      />
      <div className={showAddTaskInput ? classes.show : classes.hide}>
        <Button
          disabled={taskDescription.length === 0}
          data-testId="add-task-submit"
          onClick={handleAddTaskSubmit}
          color="primary"
        >
          Add Task
        </Button>
        <Button
          data-testId="add-task-cancel"
          className={classes.cancelButtonTextColor}
          onClick={handleCloseAddTaskInput}
          color="secondary"
        >
          Cancel
        </Button>
      </div>

      <ListItem
        className={!showAddTaskInput ? classes.show : classes.hide}
        disableGutters
        button
        onClick={handleShowAddTaskInput}
      >
        <ListItemIcon className={classes.listItemIcon} edge="start">
          {<AddTwoToneIcon color="primary" />}
        </ListItemIcon>
        <ListItemText
          classes={{ primary: classes.addTaskText }}
          primary="Add Task"
        />
      </ListItem>
    </div>
  );
};
export default AddTask;
