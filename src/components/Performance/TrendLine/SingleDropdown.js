import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 60,
    // width: "40px",
  },
  selectEmpty: {},
}));

export default function SingleDropdown({
  label,
  items,
  handleChange,
  selectedItem,
}) {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="simple-select-label">{label}</InputLabel>
      <Select
        labelId="simple-select-label"
        id="simple-select"
        value={selectedItem}
        onChange={handleChange}
        style={{ fontSize: ".8rem" }}
      >
        {items.map((item) => (
          <MenuItem value={item}>{item}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
