import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import * as React from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ScbSnackbar({ open, severity, message, handleToggle }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    handleToggle(false);
  };

  return (
    <Snackbar
      open={open}
      // autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
