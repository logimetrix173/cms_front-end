import { createContext, useContext, useState, useEffect } from "react";

const CustomContext = createContext();

const AppContext = ({ children }) => {
  const [enabledLinearProgress, setEnabledLinearProgress] = useState(false);
  const [intervalTime, setIntervalTime] = useState(120000);
  // const [intervalTime, setIntervalTime] = useState(1200);

  const [enableDarkTheme, setEnableDarkTheme] = useState(false);
  const [logoutMsg, setLogoutMsg] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "info",
    message: "Snackbar",
  });

  return (
    <CustomContext.Provider
      value={{
        enabledLinearProgress,
        setEnabledLinearProgress,
        snackbar,
        setSnackbar,
        intervalTime,
        setIntervalTime,
        enableDarkTheme,
        setEnableDarkTheme,
        logoutMsg,
        setLogoutMsg,
      }}
    >
      {children}
    </CustomContext.Provider>
  );
};

export default AppContext;

export const AppState = () => {
  return useContext(CustomContext);
};
