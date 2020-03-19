import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AddTwoToneIcon from "@material-ui/icons/AddTwoTone";
import PaletteTwoToneIcon from "@material-ui/icons/PaletteTwoTone";
import PropTypes from "prop-types";
import { ThemeContext } from "../../../../../../context";
import {
  CustomizedToolTip,
  AddQuickTaskDialog
} from "./../../../../../../commonComponents";

const useStyles = makeStyles(theme => ({}));

function MenuItems(props) {
  const classes = useStyles(props);
  const [openQuickTask, setOpenQuickTask] = useState(false);
  const { themeName, setThemeName } = useContext(ThemeContext);
  const nextThemeName = themeName === "light" ? "dark" : "light";
  const handleOpenQuickTaskDialog = () => {
    setOpenQuickTask(true);
  };

  const handleChangeTheme = () => {
    themeName === "light" ? setThemeName("dark") : setThemeName("light");
  };

  const handleCloseQuickTaskDialog = textInputRef => {
    //reset input
    textInputRef.value = "";
    setOpenQuickTask(false);
  };
  return (
    <div className={classes.sectionDesktop}>
      <CustomizedToolTip title="Quick Add Task">
        <IconButton
          color="secondary"
          data-testid="quick-add-task-action"
          aria-label="add task"
          onClick={handleOpenQuickTaskDialog}
        >
          <AddTwoToneIcon />
        </IconButton>
      </CustomizedToolTip>
      <CustomizedToolTip title={`Change theme to ${nextThemeName}`}>
        <IconButton
          onClick={handleChangeTheme}
          color="secondary"
          data-testid="dark-mode-action"
          aria-label="change theme"
        >
          <PaletteTwoToneIcon />
        </IconButton>
      </CustomizedToolTip>
      <AddQuickTaskDialog
        open={openQuickTask}
        close={handleCloseQuickTaskDialog}
      />
    </div>
  );
}

export default MenuItems;
