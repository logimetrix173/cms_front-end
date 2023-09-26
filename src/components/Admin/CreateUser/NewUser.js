import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
// import Footer from "../components/Footer";
import Alert from "@material-ui/lab/Alert";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SERVER_URL } from "../../../constants/constants";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
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
}));

export default function NewUser() {
  const classes = useStyles();

  const history = useHistory();

  const textRef = useRef(null);
  const footerRef = useRef(null);

  const userToken = localStorage.getItem("userToken");

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassowrd, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [alertPasswordMatch, setAlertPasswordMatch] = useState(false);
  const [signupError, setSignupError] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const [footerPosition, setFooterPosition] = useState("absolute");
  const [footerBottomPosition, setFooterBottomPosition] = useState("0");

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

  const replaceWithLogin = (e) => {
    e.preventDefault();
    history.replace("/login");
  };

  const submitHandler = (e) => {
    // console.log("function hitt user", firstname, lastname, email, password);
    e.preventDefault();
    setAlertPasswordMatch(false);
    setUserExist(false);
    if (password !== confirmPassowrd) {
      setAlertPasswordMatch(true);
      return;
    }
    setOpenBackdrop(true);

    axios
      .post(SERVER_URL + "/api/users", {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      })
      .then((response) => {
        // console.log(response.data);
        // localStorage.setItem("userToken", response.data.jwtToken);
        // localStorage.setItem(
        //   "username",
        //   response.data.userDetails.firstname +
        //     " " +
        //     response.data.userDetails.lastname
        // );
        // localStorage.setItem("userId", response.data.userDetails.id);
        setSignupError(false);
        setOpenBackdrop(false);
        alert(
          `User: ${firstname} ${lastname} with email: ${email} created successfully!`
        );
        // history.replace("/");
      })
      .catch((error) => {
        // console.log(error.response.status);
        // console.log(error.response.data);
        if (error.response && error.response.status === 401) {
          setUserExist(true);
          setSignupError(true);
        }
        setSignupError(true);
        setOpenBackdrop(false);
      });
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar> */}

          {alertPasswordMatch && (
            <Alert severity="warning" className={classes.alertStyle}>
              Passwords do not match.
            </Alert>
          )}
          {userExist && (
            <Alert severity="error" className={classes.alertStyle}>
              User already exists.
            </Alert>
          )}
          {/* <Alert severity='error' className={classes.alertStyle}>
            Wrong email or password is entered.
          </Alert> */}
          <form className={classes.form} onSubmit={submitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={confirmPassowrd}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="confirm-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={localStorage.getItem("username") !== "Veer Pratap"}
            >
              CREATE USER
            </Button>
          </form>
        </div>
      </Container>
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
