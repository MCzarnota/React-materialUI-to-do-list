import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import ListAltTwoToneIcon from "@material-ui/icons/ListAltTwoTone";
import IconButton from "@material-ui/core/IconButton";
import { CustomizedToolTip } from "../index";
import DoneTwoToneIcon from "@material-ui/icons/DoneTwoTone";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import FiberManualRecordTwoToneIcon from "@material-ui/icons/FiberManualRecordTwoTone";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { CustomizedPopper } from "../index";
import ProjectTreeWindowList from "./ProjectTreeWindowList/ProjectTreeWindowList";

const ProjectTreeWindow = props => {
  const { show, handleSelectProject, active } = props;

  return (
    <div>
      <CustomizedToolTip title="Select a project">
        <IconButton onClick={show} aria-label="add-project">
          <ListAltTwoToneIcon />
        </IconButton>
      </CustomizedToolTip>
      <CustomizedPopper {...props}>
        <ProjectTreeWindowList
          active={active}
          handleSelectProject={handleSelectProject}
        />
      </CustomizedPopper>
    </div>
  );
};
export default ProjectTreeWindow;
