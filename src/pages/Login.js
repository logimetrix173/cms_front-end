import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import axios from "axios";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import Footer from "../components/Footer";
import { SERVER_URL } from "../constants/constants";
import Snackbar from "@material-ui/core/Snackbar";
// import MuiAlert from "@material-ui/lab/Alert";
// import { CssBaseline, FormControl, Input, InputLabel } from "@material-ui/core";
// import React from 'react';
// import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { AppState } from "../AppContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alertStyle: {
    marginTop: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  // ipAddress: {
  //   textDecoration: "none",
  //   color: "#008CBA",
  // },
}));

export default function LoginPage() {
  const { logoutMsg, setLogoutMsg } = AppState();
  const classes = useStyles();

  const history = useHistory();

  const textRef = useRef(null);
  const footerRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  // const [isAuthSnackbarOpened, setIsAuthSnackBarOpened] = useState(false);
  //creating IP state
  // const [ip, setIP] = useState("");
  const [footerPosition, setFooterPosition] = useState("absolute");
  const [footerBottomPosition, setFooterBottomPosition] = useState("0");
  const [alreadyLogin, setAlreadyLogin] = useState(false);
  // const [ipAddress, setIpAddress] = useState("");

  // const authContext = useContext(AuthContext);
  // const [logoutMsg, setLogoutMsg] = useState(false);

  const userToken = localStorage.getItem("userToken");

  useEffect(() => {
    const isAuthSnackbarOpenedLSItem = localStorage.getItem(
      "isAuthSnackbarOpened"
    );
    if (isAuthSnackbarOpenedLSItem && isAuthSnackbarOpenedLSItem === "true") {
      // console.log("isAuthSnackbarOpenedLSItem value is true.");
      // setIsAuthSnackBarOpened(true);
      localStorage.removeItem("isAuthSnackbarOpened");
    }
  }, []);

  useEffect(() => {
    if (userToken && userToken !== "") {
      history.push("/");
    }
  }, [userToken, history]);

  useLayoutEffect(() => {
    window.onresize = () => {
      if (
        textRef.current.getBoundingClientRect().bottom >
        footerRef.current.offsetTop
      ) {
        setFooterPosition("relative");
        setFooterBottomPosition("auto");
      }

      if (
        window.innerHeight > footerRef.current.getBoundingClientRect().bottom
      ) {
        setFooterPosition("absolute");
        setFooterBottomPosition("0");
      }
    };

    return () => {
      window.onresize = null;
    };
  }, []);

  //creating function to load ip address from the API
  // const getIpData = async () => {
  //   const res = await axios.get("https://api.ipify.org?format=json");
  //   // console.log(res.data);
  //   setIP(res.data.ip);
  // };

  // useEffect(() => {
  //   //passing getData method to the lifecycle method
  //   getIpData();
  // }, []);

  // console.log(ipAddress);
  // hanlde snackbar close
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    // setIsAuthSnackBarOpened(false);
  };

  const submitHandler = (e) => {
    // getIpData();
    // console.log(email, password, ip);
    e.preventDefault();
    setLoginError(false);
    setAlreadyLogin(false);
    setOpenBackdrop(true);
    axios
      .post(
        SERVER_URL + "/api/users/login",
        {
          email: email,
          password: password,
          // ip: ip,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
        localStorage.setItem("userToken", response.data.jwtToken);
        localStorage.setItem(
          "userDetails",
          JSON.stringify(response.data.userDetails)
        );
        localStorage.setItem(
          "username",
          response.data.userDetails.firstname +
            " " +
            response.data.userDetails.lastname
        );
        localStorage.setItem("userId", response.data.userDetails.id);
        localStorage.setItem("userEmail", response.data.userDetails.email);
        setLoginError(false);
        setOpenBackdrop(false);
        setAlreadyLogin(false);

        history.replace("/");
      })
      .catch((error) => {
        console.log(error);
        if (error) {
          setLoginError(true);
          setOpenBackdrop(false);
        }

        if (error.response.status === 403) {
          // console.log(error.response);

          // setIpAddress(error.response.data);

          // console.log(ipAddress.data, "183");
          setAlreadyLogin(true);
          setLoginError(false);
          // setOpenBackdrop(false);
          handleClickOpen();
        }
        if (error.response.status === 401) {
          // setLogoutMsg(true);
          // localStorage.clear();
        }
        // if (error.response.status) {
        //   console.log(error.response.status);
        //   console.log(error.response.data);
        //   setLoginError(true);
        //   setOpenBackdrop(false);
        // }
      });
  };

  const replaceWithSignup = (e) => {
    e.preventDefault();
    history.replace("/signup");
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const continueLogin = (e) => {
    e.preventDefault();
    setLoginError(false);
    setAlreadyLogin(false);
    setOpenBackdrop(true);
    setLogoutMsg(false);
    axios
      .post(
        SERVER_URL + "/api/users/login/continue",
        {
          email: email,
          password: password,
          // ip: ip,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
        localStorage.setItem("userToken", response.data.jwtToken);
        localStorage.setItem(
          "userDetails",
          JSON.stringify(response.data.userDetails)
        );
        localStorage.setItem(
          "username",
          response.data.userDetails.firstname +
            " " +
            response.data.userDetails.lastname
        );
        localStorage.setItem("userId", response.data.userDetails.id);
        localStorage.setItem("userEmail", response.data.userDetails.email);
        // setLogoutMsg(false);
        history.replace("/");
        // console.log(response.status);
      })
      .catch((error) => {
        console.log(error);
        if (error) {
          setLoginError(true);
          setOpenBackdrop(false);
        }
        // if (error.response.status === 401) {
        //   // console.log(error.response.status);
        //   setLogoutMsg(true);
        // }

        // if (error.response.status) {
        //   console.log(error.response.status);
        //   console.log(error.response.data);
        //   setLoginError(true);
        //   setOpenBackdrop(false);
        // }
      });
  };

  // const handleClosed = () => {
  //   setOpen(false);
  // };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar} src='/static/images/acme.png'> */}
          {/* <LockOutlinedIcon /> */}
          {/* </Avatar> */}
          <img
            src="/static/images/logimetrix.png"
            alt="ACME brand logo"
            style={{ width: "12rem", marginBottom: "2rem" }}
          />
          <Typography component="h1" variant="h5">
            Sign in - Logimetrix Photon
          </Typography>
          {loginError && (
            <Alert severity="error" className={classes.alertStyle}>
              Wrong email or password is entered.
            </Alert>
          )}
          {logoutMsg && (
            <Alert severity="error" className={classes.alertStyle}>
              Someone from other system just LoggedIn with this id.
            </Alert>
          )}
          {alreadyLogin && (
            <div>
              {/* <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
              >
                Open alert dialog
              </Button> */}
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {`User with this id is already logged in.`}

                  {/* <div style={{ color: "#008CBA" }}>
                    {`Public IP:`}
                    {ipAddress.redisSavedPublicIp}
                  </div> */}
                  {/* <div style={{ color: "#008CBA" }}>
                    {`Local IP:`}
                    {ipAddress.ip}
                  </div> */}
                </DialogTitle>

                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Do you want to continue with this session?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    cancel
                  </Button>
                  <Button onClick={continueLogin} color="primary" autoFocus>
                    continue
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          )}
          <form className={classes.form} onSubmit={submitHandler}>
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link ref={textRef} variant="body2" onClick={replaceWithSignup}>
                  {"Don't have an account? Sign up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <Snackbar
        // open={isAuthSnackbarOpened}
        autoHideDuration={3000}
        onClose={handleClose}
        style={{ marginBottom: "2rem" }}
      >
        <Alert onClose={handleClose} severity="info">
          Session expired! Login again.
        </Alert>
      </Snackbar>
      <Footer
        ref={footerRef}
        footerPosition={footerPosition}
        footerBottomPosition={footerBottomPosition}
      />
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
