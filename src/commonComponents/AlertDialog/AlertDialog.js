import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  cancelButtonTextColor: {
    color: theme.palette.common.black
  },
  projectNameBold: {
    fontWeight: "bold"
  }
}));
const AlertDialog = props => {
  const { show, close, handleDeleteProject, projectName, docId } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles(props);

  return (
    <Dialog
      open={show}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Project deletion"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          `Are you sure you want to delete{" "}
          <span className={classes.projectNameBold}>{projectName}</span> ?`
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.cancelButtonTextColor}
          onClick={close}
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleDeleteProject(docId);
          }}
          color="primary"
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default AlertDialog;
