import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React from "react";
import { AppState } from "../AppContext";

export default function CustomSnackbar() {
  const { snackbar, setSnackbar } = AppState();

  const handleSnackbarClose = () => {
    setSnackbar((prevState) => ({ ...prevState, open: false }));
  };

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
}
