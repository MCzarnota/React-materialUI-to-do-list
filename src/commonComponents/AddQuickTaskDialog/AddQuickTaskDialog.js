import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import ListAltTwoToneIcon from "@material-ui/icons/ListAltTwoTone";
import DialogActions from "@material-ui/core/DialogActions";
import moment from "moment";
import { SnackbarContext } from "../../context";
import { firebase } from "../../firebase";
import { ProjectTreeWindow, TimeLineWindow } from "../index";

const useStyles = makeStyles(theme => ({
  addTaskButton: {
    marginTop: 10
  },
  projectTag: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: " 0 4px",
    cursor: "pointer",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main
  },
  input: {
    position: "relative"
  },
  hidden: {
    display: "none"
  },
  dialog: {
    width: "40%",
    maxHeight: 435
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  controlsWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  controlsIconsWrapper: {
    display: "flex"
  }
}));

const AddQuickTaskDialog = props => {
  const classes = useStyles(props);
  const { open, close } = props;
  const [quickTaskDescription, setQuickTaskDescription] = useState("");
  const [selectedProject, setSelectedProject] = useState("Inbox");
  const [textInputRef, setTextInputRef] = useState(null);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [showTimeLineWindow, setshowTimeLineWindow] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [timeLineAnchorEl, settimeLineAnchorEl] = useState(null);
  const [active, setActive] = useState(null);
  const [taskDate, setTaskDate] = useState("");
  const [snackBarConfig, setSnackBarConfig] = useContext(SnackbarContext);

  const handleChangeQuickTaskDescription = event => {
    setQuickTaskDescription(event.target.value);
  };
  const handleShowTimeLineWindow = event => {
    setshowTimeLineWindow(!showTimeLineWindow);
    settimeLineAnchorEl(timeLineAnchorEl ? null : event.currentTarget);
  };

  const handleCloseTimeLineWindow = event => {
    setshowTimeLineWindow(false);
    settimeLineAnchorEl(null);
  };

  const handleSelectTaskDate = taskDateValue => {
    setTaskDate(taskDateValue);
    handleShowTimeLineWindow();
  };

  const handleAddQuickTaskSubmit = () => {
    let calculatedDate = "";
    switch (selectedProject) {
      case "Today":
        calculatedDate = moment.format("DD/MM/YYYY");
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
        projectId: active,
        task: quickTaskDescription,
        userId: "12",
        date: calculatedDate || taskDate
      })
      .then(() => {
        //reset input values
        textInputRef.value = "";
        setAnchorEl(null);
        settimeLineAnchorEl(null);
        setQuickTaskDescription("");
        setSelectedProject(null);
        setTaskDate("");
        close(textInputRef);
        setSnackBarConfig({
          ...snackBarConfig,
          text: `The task has been added to ${selectedProject}`,
          severity: "success",
          shouldOpen: true
        });
      });
  };

  const handleShowProjectOverlay = event => {
    setShowProjectOverlay(!showProjectOverlay);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleCloseProjectOverlay = event => {
    setShowProjectOverlay(false);
    setAnchorEl(null);
    setSelectedProject(null);
    setTaskDate("");
  };
  const handleSelectProject = (projectId, projectName) => {
    setSelectedProject(projectName);
    setActive(projectId);
    handleShowProjectOverlay();
  };

  return (
    <Dialog
      data-testid="add-task-quick"
      classes={{
        paper: classes.dialog
      }}
      maxWidth="lg"
      open={open}
      keepMounted
      onClose={() => {
        close(textInputRef);
        handleCloseProjectOverlay();
        handleCloseTimeLineWindow();
      }}
      aria-labelledby="quick-task-dialog"
      aria-describedby="quick-task-dialog-description"
    >
      <DialogTitle id="quick-task-dialog-title">
        <Typography variant="h6">Quick Add Task</Typography>
        {close ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={() => {
              close(textInputRef);
              handleCloseProjectOverlay();
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent>
        <div className={classes.wrapper}>
          <OutlinedInput
            endAdornment={
              <InputAdornment
                className={taskDate ? classes.projectTag : classes.hidden}
                position="end"
              >
                {taskDate}
              </InputAdornment>
            }
            startAdornment={
              <InputAdornment position="start">
                <div
                  className={
                    selectedProject !== "Inbox" && selectedProject
                      ? classes.projectTag
                      : classes.hidden
                  }
                >
                  <ListAltTwoToneIcon />
                  {selectedProject}
                </div>
              </InputAdornment>
            }
            onChange={handleChangeQuickTaskDescription}
            inputRef={input => {
              setTextInputRef(input);
              return input && input.focus();
            }}
            fullWidth
            placeholder="e.g. Take the dog out for a walk"
            inputProps={{ "aria-label": "add task" }}
          />
          <div className={classes.controlsWrapper}>
            <Button
              className={classes.addTaskButton}
              disabled={quickTaskDescription.length === 0}
              data-testId="quick-add-task-submit"
              color="primary"
              onClick={handleAddQuickTaskSubmit}
            >
              Add Task
            </Button>
            <div className={classes.controlsIconsWrapper}>
              <ProjectTreeWindow
                active={active}
                handleSelectProject={handleSelectProject}
                anchor={anchorEl}
                show={handleShowProjectOverlay}
                shouldShow={showProjectOverlay}
              />
              <TimeLineWindow
                handleSelectTaskDate={handleSelectTaskDate}
                anchor={timeLineAnchorEl}
                show={handleShowTimeLineWindow}
                shouldShow={showTimeLineWindow}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default AddQuickTaskDialog;
