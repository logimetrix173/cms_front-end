import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { SERVER_URL } from "../../../constants/constants";
import { gridColumnsTotalWidthSelector } from "@material-ui/data-grid";
import { Grid } from "@material-ui/core";
import StorageIcon from "@material-ui/icons/Storage";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import IconButton from "@material-ui/core/IconButton";
import SyncIcon from "@material-ui/icons/Sync";
import "./Replication.css";

const useStyles = makeStyles({
  tableContainer: {
    marginTop: "1rem",
  },
});

export default function Replication() {
  const classes = useStyles();

  const jwtToken = localStorage.getItem("jwtToken");

  const [rows, setRows] = useState([]);

  const fetchReplicationStatus = async () => {
    try {
      let response = await axios.get(
        SERVER_URL + "/admin/postgresreplicationstatus",
        { headers: { jwtToken: jwtToken } }
      );
      let data = response.data;
      // console.log(data.ip);
      setRows([{ ...data, tag: "Secondary" }]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReplicationStatus();
  }, []);

  const handleRefresh = () => {
    fetchReplicationStatus();
  };

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item>
        <Grid container direction="column">
          <Grid item style={{ textAlign: "center" }}>
            Primary
          </Grid>
          <Grid item>
            <img src="/static/images/server.png" width="128" height="128" />
          </Grid>
          <Grid item style={{ textAlign: "center" }}>
            10.10.0.38
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        {rows[0]?.status === "Success" ? (
          <ArrowRightAltIcon
            id="success-arrow"
            style={{
              fontSize: "128px",
            }}
          />
        ) : (
          <ArrowRightAltIcon
            style={{
              fontSize: "128px",
              color: "red",
            }}
          />
        )}
      </Grid>
      <Grid item>
        <Grid container direction="column">
          <Grid item style={{ textAlign: "center" }}>
            Secondary
          </Grid>
          <Grid item>
            <img src="/static/images/server.png" width="128" height="128" />
          </Grid>
          <Grid item style={{ textAlign: "center" }}>
            {rows[0]?.ip ? rows[0].ip : "10.10.0.102"}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table
              className={classes.table}
              aria-label="simple table"
              size="small"
            >
              <TableHead>
                <TableRow style={{ backgroundColor: "#ffffbf" }}>
                  <TableCell></TableCell>
                  <TableCell align="center" style={{ color: "#000" }}>
                    IP
                  </TableCell>

                  <TableCell></TableCell>
                  <TableCell align="center" style={{ color: "#000" }}>
                    IP
                  </TableCell>
                  <TableCell align="center" style={{ color: "#000" }}>
                    Status
                  </TableCell>
                  <TableCell align="right" style={{ color: "#000" }}>
                    Last Update
                  </TableCell>
                  <TableCell align="right" style={{ color: "#000" }}>
                    Refresh
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <strong>Primary</strong>
                    </TableCell>
                    <TableCell align="center">10.10.0.38</TableCell>

                    <TableCell align="center">
                      <strong>{row.tag}</strong>
                    </TableCell>
                    <TableCell align="center">{row.ip}</TableCell>
                    <TableCell align="center">
                      {row.status === "Success" ? (
                        <CheckCircleIcon
                          fontSize="small"
                          style={{ color: "green" }}
                        />
                      ) : (
                        <CancelIcon fontSize="small" />
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {new Date(row.timestamp * 1000).toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={handleRefresh}>
                        <SyncIcon fontSize="small" color="primary" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
  );
}
