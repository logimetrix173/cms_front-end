import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Checkbox, ListItemIcon, ListItemText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  // styles
  formControl: {
    margin: theme.spacing(1),
    // minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  inputlabel: {
    marginTop: "-0.4rem",
    backgroundColor: "transparent",
    color: "#21618C",
    // fontSize: "15px",
    padding: "4px",
  },
}));

export default function AlertsDropdown({
  label,
  items = [],
  selectedItems = [],
  handleChange,
}) {
  const classes = useStyles();

  const isAllSelected =
    items.length > 0 && selectedItems.length === items.length;

  // items = selectedItems, item = currennt selected item
  const isChecked = (items, item) => {
    let isChecked = false;
    items.forEach((element) => {
      if (element === item) {
        isChecked = true;
      }
    });
    return isChecked;
  };

  return (
    <FormControl
      variant="outlined"
      className={classes.formControl}
      style={{ maxWidth: "100px", marginTop: "0.5rem" }}
      size="small"
    >
      <InputLabel id={`${label}-select-label`} className={classes.inputlabel}>
        {label}
      </InputLabel>
      <Select
        // style={{ fontSize: ".8rem" }}
        labelId={`${label}-select-label`}
        id={`${label}-select`}
        style={{ fontSize: 14, height: "4vh" }}
        value={selectedItems}
        onChange={handleChange}
        multiple
        renderValue={(data) => data.join(", ")}
        MenuProps={{
          classes: { paper: classes.menuPaper },
          getContentAnchorEl: () => null,
        }}
      >
        <MenuItem
          value="all"
          classes={{
            root: isAllSelected ? classes.selectedAll : "",
          }}
          style={{ paddingBlock: 0 }}
        >
          <ListItemIcon>
            <Checkbox
              style={{ paddingBlock: 0 }}
              size="small"
              color="primary"
              classes={{ indeterminate: classes.indeterminateColor }}
              checked={isAllSelected || items.length === 0}
              indeterminate={
                selectedItems.length > 0 && selectedItems.length < items.length
              }
            />
          </ListItemIcon>
          <ListItemText
            // classes={{ primary: classes.selectAllText }}
            classes={{ primary: classes.listItemText }}
            primary="Select All"
            style={{ paddingTop: ".05rem" }}
          />
        </MenuItem>
        {items.map((element, index) => {
          return (
            <MenuItem key={index} value={element} style={{ paddingBlock: 0 }}>
              <ListItemIcon>
                <Checkbox
                  style={{ paddingBlock: 0 }}
                  checked={isChecked(selectedItems, element)}
                  size="small"
                  color="primary"
                />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary={element}
                style={{ paddingTop: ".05rem" }}
              />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
