import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AssignmentIndTwoToneIcon from "@material-ui/icons/AssignmentIndTwoTone";
import FormatColorFillTwoToneIcon from "@material-ui/icons/FormatColorFillTwoTone";
import FiberManualRecordTwoToneIcon from "@material-ui/icons/FiberManualRecordTwoTone";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { makeStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { PROJECT_COLOR_NAMES } from "../../constants";
import { firebase } from "../../firebase";
import { generateId } from "../../helpers";
import { useProjectsValue } from "../../context";

const useStyles = makeStyles(theme => ({
  cancelButtonTextColor: {
    color: theme.palette.common.black
  },
  projectNameBold: {
    fontWeight: "bold"
  },
  colorIcon: {
    minWidth: `30px !important`
  },
  wrapper: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "column",
    width: 250,
    height: 200
  },
  gridWidth: {
    flexBasis: 190
  },
  fullWidth: {
    width: "100%"
  },
  input: {
    height: 50
  }
}));

const AddProjectDialog = props => {
  const { show, close, handleDeleteProject, docId } = props;
  const classes = useStyles(props);
  const { setProjects } = useProjectsValue();
  const [projectColor, setProjectColor] = useState("Orange");
  const [projectName, setProjectName] = useState("");
  const projectId = generateId();

  const handleProjectNameInputChange = event => {
    setProjectName(event.target.value);
  };

  const handleProjectColorInputChange = event => {
    setProjectColor(event.target.value);
  };

  const focusUsernameInputField = input => {
    if (input) {
      setTimeout(() => {
        input.focus();
      }, 100);
    }
  };

  const handleAddProject = () => {
    projectName &&
      firebase
        .firestore()
        .collection("projects")
        .add({
          name: projectName,
          color: projectColor,
          projectId,
          userId: "12" //ToDO to automate this
        })
        .then(() => {
          setProjects([]);
          setProjectName("");
          setProjectColor("");
          close();
        });
  };

  return (
    <Dialog
      open={show}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Add Project"}</DialogTitle>
      <Divider />
      <DialogContent>
        <div className={classes.wrapper}>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <AssignmentIndTwoToneIcon />
            </Grid>
            <Grid className={classes.gridWidth} item>
              <TextField
                onChange={handleProjectNameInputChange}
                autoFocus
                InputProps={{
                  className: classes.input
                }}
                variant="outlined"
                id="input-with-icon-grid"
                label="Provide project name"
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <FormatColorFillTwoToneIcon />
            </Grid>
            <Grid className={classes.gridWidth} item>
              <TextField
                InputProps={{
                  className: classes.input
                }}
                className={classes.fullWidth}
                id="standard-select-currency-native"
                select
                label="Select project color"
                variant="outlined"
                value={projectColor}
                onChange={handleProjectColorInputChange}
              >
                {PROJECT_COLOR_NAMES.map(color => (
                  <MenuItem key={color} value={color}>
                    <ListItemIcon>
                      <FiberManualRecordTwoToneIcon style={{ color: color }} />
                    </ListItemIcon>
                    {color}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </div>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          data-testId="add-project-cancel"
          className={classes.cancelButtonTextColor}
          onClick={close}
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          data-testId="add-project-submit"
          onClick={() => {
            handleAddProject();
          }}
          color="primary"
          autoFocus
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default AddProjectDialog;
