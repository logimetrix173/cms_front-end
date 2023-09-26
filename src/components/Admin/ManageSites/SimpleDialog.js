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
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

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

export default function SimpleDialog({
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
  //   const { onClose, selectedValue, open } = props;

  // const [title, setTitle] = useState("");
  // const [notemsg, setNotemsg] = useState("");

  // const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);

  // const [category, setCategory] = useState("todos");
  const [expandedId, setExpandedId] = useState("0");

  const handlealertClickOpen = (data) => {
    // console.log(data);
    setAlertopen(true);
    setMsgid(data);
  };

  const handlealertClose = () => {
    setAlertopen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // setTitleError(false);
    setDetailsError(false);

    // if (title === "") {
    //   setTitleError(true);
    // }

    if (notemsg === "") {
      setDetailsError(true);
    }

    if (notemsg) {
      //havent used a server bc i was developing this with react sandbox
      sendNotemsg();
      // setOpen(false);
    }
  };
  const handleDetails = (event) => {
    let value = event.target.value;
    // console.log(value);
    setNotemsg(value);
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        {/* <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle> */}
        {/* <List>
        {emails.map((email) => (
          <ListItem
            button
            onClick={() => handleListItemClick(email)}
            key={email}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}

        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick("addAccount")}
        >
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem>
      </List> */}
        <Container style={{ width: "30rem" }}>
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
              <Typography
                variant="h6"
                color="primary"
                component="h2"
                gutterBottom
              >
                Create a new note
              </Typography>
            </Grid>
            <Grid item style={{ paddingRight: "0.5rem" }}>
              <CloseIcon
                style={{ color: "#EC7063" }}
                onClick={handleClose}
                aria-label="close"
              />
            </Grid>
          </Grid>
          <form
            noValidate
            className={classes.root}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            {/* <TextField
            onChange={(e) => setTitle(e.target.value)}
            id="outlined-basic"
            label="Note Title"
            variant="outlined"
            color="primary"
            fullWidth
            required
            className={classes.field}
            error={titleError}
            InputLabelProps={{
              margin: "dense",
            }}
          /> */}

            <TextField
              onChange={handleDetails}
              label="Details"
              multiline
              rows={4}
              variant="outlined"
              color="primary"
              fullWidth
              required
              className={classes.field}
              error={detailsError}
              // InputLabelProps={{
              //   style: { marginTop: "-4px" },
              // }}
              InputLabelProps={{
                style: { marginTop: "4px" },
              }}
            />

            {/* <FormControl className={classes.field} color="primary">
            <FormLabel>Note Category</FormLabel>
            <RadioGroup
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <FormControlLabel
                value="money"
                control={<Radio color="primary" />}
                label="Money"
              />
              <FormControlLabel
                value="todos"
                control={<Radio color="primary" />}
                label="Todos"
              />
              <FormControlLabel
                value="reminders"
                control={<Radio color="primary" />}
                label="Reminders"
              />
              <FormControlLabel
                value="work"
                control={<Radio color="primary" />}
                label="Work"
              />
            </RadioGroup>
          </FormControl> */}

            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={{ marginTop: "-0.8rem" }}
              endIcon={<ArrowForwardIosIcon />}
            >
              Submit
            </Button>
          </form>
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
                    <IconButton
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
                    </IconButton>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      className={classes.msg}
                      // style={{ fontSize: "0.8rem" }}
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

// SimpleDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   selectedValue: PropTypes.string.isRequired,
// };
