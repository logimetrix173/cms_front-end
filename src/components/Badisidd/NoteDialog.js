import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import TextField from "@material-ui/core/TextField";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/Close";

import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import { withStyles } from "@material-ui/core/styles";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  IconButton,
} from "@material-ui/core";

const emails = ["username@gmail.com", "user02@gmail.com"];

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0.5),
      width: "54ch",
    },
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  heading: {
    fontSize: theme.typography.pxToRem(11),
    fontWeight: theme.typography.fontWeightRegular,
  },
  msg: {
    fontSize: theme.typography.pxToRem(11),
    fontWeight: theme.typography.fontWeightRegular,
    color: "#2196f3",
  },
}));

export default function NoteDialog({
  handleClose,
  open,
  sendNotemsg,
  getNotemsg,
  notemsg,
  showNotemsg,
  setNotemsg,
  setOpen,
  setMsgid,
  deleteNotemsg,
  setAlertopen,
  alertopen,
}) {
  const classes = useStyles();

  const [expandedId, setExpandedId] = useState("0");

  const handlealertClickOpen = (data) => {
    // console.log(data);
    setAlertopen(true);
    setMsgid(data);
  };

  const handlealertClose = () => {
    setAlertopen(false);
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        {/* <IconButton
          // edge="end"
          style={{ justifyContent: "end" }}
          // color="inherit"
          onClick={handleClose}
          aria-label="close"
        > */}
        <Grid
          container
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            // marginTop: "0.5rem",
            // paddingRight: "0.5rem",
          }}
        >
          <Grid item>
            <DialogTitle style={{ color: "#2196f3" }} id="simple-dialog-title">
              Site Notes
            </DialogTitle>
          </Grid>
          <Grid item style={{ paddingRight: "0.5rem" }}>
            <CloseIcon
              style={{ color: "#EC7063" }}
              onClick={handleClose}
              aria-label="close"
            />
          </Grid>
        </Grid>
        {/* </IconButton> */}

        <Container style={{ width: "30rem", marginTop: "-1rem" }}>
          <Grid
            container
            style={{
              marginTop: "0.5rem",
              paddingLeft: "0.4rem",
              // maxHeight: "20rem",
            }}
          >
            {showNotemsg.map((data) => (
              <Grid item>
                <Accordion
                  key={data.id}
                  style={{ width: "13rem" }}
                  expanded={expandedId === data.id}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon
                        color={expandedId === data.id ? "primary" : "inherit"}
                        onClick={() =>
                          setExpandedId((prev) =>
                            prev === data.id ? "0" : data.id
                          )
                        }
                      />
                    }
                    ariaControls={`${data.id}_panel1a-content`}
                    id={`${data.id}_panel1a-id`}
                  >
                    <Typography className={classes.heading}>
                      {new Date(Number(data.timestamp)).toLocaleString()}
                    </Typography>
                    {/* <IconButton
                      size="small"
                      onClick={() => handlealertClickOpen(data)}
                      style={{
                        paddingInline: ".5rem",
                        paddingLeft: "0.5rem",
                      }}
                    >
                      <DeleteRoundedIcon
                        style={{ fontSize: "1rem" }}
                        color="error"
                      />
                    </IconButton> */}
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      className={classes.msg}
                      // style={{ color: "blue", fontSize: "0.8rem" }}
                    >
                      {data.notes}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ))}
          </Grid>
          <br />
        </Container>
      </Dialog>
      <div>
        <Dialog
          open={alertopen}
          onClose={handlealertClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {/* <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle> */}
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are You Sure Want To Delete?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={deleteNotemsg} color="primary" autoFocus>
              Ok
            </Button>
            <Button onClick={handlealertClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
