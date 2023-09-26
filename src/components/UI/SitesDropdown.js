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

export default function SitesDropdown({
  label = "Sites",
  items = JSON.parse(localStorage.getItem("siteNamesCaps")),
  handleChange,
  selectedItems,
}) {
  const classes = useStyles();

  // const handleSitesChange = (event) => {
  //   const value = event.target.value;

  //   if (value[value.length - 1] === "All") {
  //     setSelectedSites(
  //       selectedSites.length ===
  //         JSON.parse(localStorage.getItem("siteNamesCaps")).length
  //         ? []
  //         : JSON.parse(localStorage.getItem("siteNamesCaps"))
  //     );
  //     return;
  //   }

  //   setSelectedSites(value);
  // };

  const isAllSelected =
    items.length > 0 && selectedItems.length === items.length;

  const isChecked = (items, name) => {
    let isChecked = false;
    items.forEach((element) => {
      if (element === name) {
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
            <MenuItem key={element} value={element} style={{ paddingBlock: 0 }}>
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
