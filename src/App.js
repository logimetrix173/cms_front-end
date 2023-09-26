// import 'fontsource-roboto'
import { Box, LinearProgress } from "@material-ui/core";
import { teal, blue, deepOrange } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import CustomDrawer from "./layout/CustomDrawer.js";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";

import CustomSnackbar from "./utils/CustomSnackbar";
import { AppState } from "./AppContext";

function App() {
  const { enableDarkTheme } = AppState();
  const userToken = localStorage.getItem("userToken");
  const theme = createTheme({
    palette: enableDarkTheme
      ? {
          type: "dark",
        }
      : {
          primary: blue,
          secondary: deepOrange,
          action: {
            disabledBackground: "#ffcf33",
            disabled: "#ffcf33",
          },
        },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/signup">
          <SignupPage />
        </Route>
        {/* used for SSO */}
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/">
          <CustomDrawer />
        </Route>
        <Route path="*" render={() => "404 NOT FOUND"} />
      </Switch>
      <CustomSnackbar />
    </ThemeProvider>
  );
}

export default App;
