import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import {
  useSelectedProjectValue,
  useProjectsValue
} from "../../../../../../../context";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { getRandomColor } from "../../../../../../../helpers";
import FiberManualRecordTwoToneIcon from "@material-ui/icons/FiberManualRecordTwoTone";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import { AlertDialog } from "../../../../../../../commonComponents";
import { firebase } from "../../../../../../../firebase";

const useStyles = makeStyles(theme => ({
  root: {
    "&:hover $child": {
      visibility: "visible"
    }
  },
  isBold: {
    fontWeight: "bold"
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
  }
}));

function Project(props) {
  const classes = useStyles(props);
  const { project, onPress, active } = props;
  const [showConfirm, setShowConfirm] = useState(false);
  const { projects, setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();

  const handleShowDialog = () => {
    setShowConfirm(true);
  };
  const handleCloseDialog = () => {
    setShowConfirm(false);
  };

  const handleDeleteProject = docId => {
    firebase
      .firestore()
      .collection("projects")
      .doc(docId)
      .delete()
      .then(() => {
        setProjects([...projects]);
        setSelectedProject("Inbox");
      });
    setShowConfirm(false);
  };
  return (
    <>
      <ListItem
        onClick={() => onPress(project.projectId)}
        selected={active === project.projectId}
        button
        classes={{
          root: classes.root,
          selected: classes.selected
        }}
      >
        <ListItemIcon
          className={classes.listItemIcon}
          style={{ color: project.color }}
        >
          <FiberManualRecordTwoToneIcon />
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: active === project.projectId ? classes.isBold : ""
          }}
          primary={project.name}
        />
        <ListItemIcon
          data-testid="delete-project"
          onClick={() => handleShowDialog()}
          className={`${classes.listItemIcon} ${classes.child}`}
        >
          <DeleteTwoToneIcon />
        </ListItemIcon>
      </ListItem>
      <AlertDialog
        projectName={project.name}
        docId={project.docId}
        show={showConfirm}
        handleDeleteProject={handleDeleteProject}
        close={handleCloseDialog}
      />
    </>
  );
}

export default Project;
