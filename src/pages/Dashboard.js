import React, { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { SERVER_URL } from "../constants/constants";

export default function Dashboard() {
  const history = useHistory();

  // useEffect to check if user is logged in
  useEffect(() => {
    let token = window.location.href.split("token=")[1];

    // Find user in one login
    axios
      .post(SERVER_URL + "/sso/callback", {
        token: token,
      })
      .then((response) => {
        // // console.log(response.data);
        // localStorage.setItem("userToken", response.data.jwtToken);
        // localStorage.setItem(
        //   "userDetails",
        //   JSON.stringify(response.data.userDetails)
        // );
        // localStorage.setItem(
        //   "username",
        //   response.data.userDetails.firstname +
        //     " " +
        //     response.data.userDetails.lastname
        // );
        // localStorage.setItem("userId", response.data.userDetails.id);
        // localStorage.setItem("userEmail", response.data.userDetails.email);
        history.replace("/");
      })
      .catch((err) => {
        // console.log(err);
        history.replace("/");
      });
  }, []);

  return <div>Please wait, login through OneLogin...</div>;
}
