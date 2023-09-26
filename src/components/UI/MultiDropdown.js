import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Checkbox, ListItemIcon, ListItemText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  // styles
}));

export default function MultiDropdown({
  label,
  items = [],
  handleChange,
  selectedItems = [],
}) {
  const classes = useStyles();

  const getNames = (selectedItems) => {
    if (selectedItems.length === 0) {
      return ["All"];
    }
    return selectedItems.map((element) => element.name);
  };

  const isAllSelected =
    items.length > 0 && selectedItems.length === items.length;

  const isChecked = (items, name) => {
    let isChecked = false;
    items.forEach((element) => {
      if (element.name === name) {
        isChecked = true;
      }
    });
    return isChecked;
  };

  return (
    <FormControl style={{ maxWidth: "200px" }}>
      <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
      <Select
        style={{ fontSize: ".8rem" }}
        labelId={`${label}-select-label`}
        id={`${label}-select`}
        value={getNames(selectedItems)}
        onChange={handleChange}
        multiple
        renderValue={(data) => data.join(", ")}
        MenuProps={{
          classes: { paper: classes.menuPaper },
          getContentAnchorEl: () => null,
        }}
      >
        <MenuItem
          value="All"
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
        {items.map((element) => {
          return (
            <MenuItem
              key={element.name}
              value={element.name}
              style={{ paddingBlock: 0 }}
            >
              <ListItemIcon>
                <Checkbox
                  style={{ paddingBlock: 0 }}
                  checked={isChecked(selectedItems, element.name)}
                  size="small"
                  color="primary"
                />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary={element.name}
                style={{ paddingTop: ".05rem" }}
              />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
