import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {"Logimetrix Photon "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    width: "100%",
    textAlign: "center",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(2),
  },
}));

const Footer = React.forwardRef(
  ({ footerPosition, footerBottomPosition }, ref) => {
    const classes = useStyles();

    return (
      <footer
        ref={ref}
        style={{ position: footerPosition, bottom: footerBottomPosition }}
        className={classes.footer}
      >
        <Copyright />
      </footer>
    );
  }
);

export default Footer;
