import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import {
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import EditIcon from "@material-ui/icons/Edit";

const rowsPerPage = 10;

export default function ConfigTable({ rows = [], handleRowSelect }) {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    if (rows.length > 0) {
      let count = Math.ceil(rows.length / rowsPerPage);
      setPageCount(count);
    }
  }, [rows]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Grid container style={{ maxWidth: "90vw" }}>
      <TableContainer component={Paper}>
        <Table
          aria-label="simple table"
          size="small"
          style={{ overflowX: "auto" }}
        >
          <TableHead>
            <TableRow style={{ backgroundColor: "#ffbf80" }}>
              <TableCell
                align="left"
                style={{ whiteSpace: "nowrap", color: "#000" }}
              >
                Actions
              </TableCell>
              <TableCell
                align="left"
                style={{ whiteSpace: "nowrap", color: "#000" }}
              >
                System Name
              </TableCell>
              <TableCell
                align="right"
                style={{ whiteSpace: "nowrap", color: "#000" }}
              >
                CSV Name
              </TableCell>
              <TableCell
                align="right"
                style={{ whiteSpace: "nowrap", color: "#000" }}
              >
                Frequncy Day
              </TableCell>
              <TableCell
                align="right"
                style={{ whiteSpace: "nowrap", color: "#000" }}
              >
                Frequency Night
              </TableCell>
              <TableCell
                align="right"
                style={{ whiteSpace: "nowrap", color: "#000" }}
              >
                Frequency Time Range
              </TableCell>
              <TableCell
                align="right"
                style={{ whiteSpace: "nowrap", color: "#000" }}
              >
                Log CSV
              </TableCell>
              <TableCell
                align="right"
                style={{ whiteSpace: "nowrap", color: "#000" }}
              >
                None
              </TableCell>
              <TableCell
                align="right"
                style={{ whiteSpace: "nowrap", color: "#000" }}
              >
                OPC Host
              </TableCell>
              <TableCell
                align="right"
                style={{ whiteSpace: "nowrap", color: "#000" }}
              >
                OPC Interval
              </TableCell>
              <TableCell
                align="right"
                style={{ whiteSpace: "nowrap", color: "#000" }}
              >
                OPC Server
              </TableCell>
              <TableCell
                align="right"
                style={{ whiteSpace: "nowrap", color: "#000" }}
              >
                RB Host
              </TableCell>
              <TableCell
                align="right"
                style={{ whiteSpace: "nowrap", color: "#000" }}
              >
                RB Log queue
              </TableCell>
              <TableCell
                align="right"
                style={{ whiteSpace: "nowrap", color: "#000" }}
              >
                RB Password
              </TableCell>
              <TableCell
                align="right"
                style={{ whiteSpace: "nowrap", color: "#000" }}
              >
                RB Port
              </TableCell>
              <TableCell
                align="right"
                style={{ whiteSpace: "nowrap", color: "#000" }}
              >
                RB Queue
              </TableCell>
              <TableCell
                align="right"
                style={{ whiteSpace: "nowrap", color: "#000" }}
              >
                RB Username
              </TableCell>
              <TableCell
                align="right"
                style={{ whiteSpace: "nowrap", color: "#000" }}
              >
                Insertion Time
              </TableCell>
              <TableCell
                align="right"
                style={{ whiteSpace: "nowrap", color: "#000" }}
              >
                Updation Time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 && (
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ whiteSpace: "nowrap" }}
                >
                  No records found.
                </TableCell>
              </TableRow>
            )}
            {rows.length > 0 &&
              rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="left" style={{ whiteSpace: "nowrap" }}>
                    <IconButton
                      size="small"
                      onClick={() => handleRowSelect(row)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                  <TableCell align="left" style={{ whiteSpace: "nowrap" }}>
                    {row.system_name}
                  </TableCell>
                  <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
                    {row.csv_filename_date}
                  </TableCell>
                  <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
                    {row.data_frequency_day}
                  </TableCell>
                  <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
                    {row.data_frequency_night}
                  </TableCell>
                  <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
                    {row.data_frequency_time_range}
                  </TableCell>
                  <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
                    {row.logfile_csv}
                  </TableCell>
                  <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
                    {row.none_value}
                  </TableCell>
                  <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
                    {row.opc_host}
                  </TableCell>
                  <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
                    {row.opc_reconnection_interval}
                  </TableCell>
                  <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
                    {row.opc_server}
                  </TableCell>
                  <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
                    {row.rabbit_host}
                  </TableCell>
                  <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
                    {row.rabbit_log_queue}
                  </TableCell>
                  <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
                    {row.rabbit_password}
                  </TableCell>
                  <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
                    {row.rabbit_port}
                  </TableCell>
                  <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
                    {row.rabbit_queue}
                  </TableCell>
                  <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
                    {row.rabbit_username}
                  </TableCell>
                  <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
                    {new Date(
                      Number(row.insertion_timestamp) * 1000
                    ).toLocaleString()}
                  </TableCell>
                  <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
                    {row.updation_timestamp
                      ? new Date(
                          Number(row.updation_timestamp) * 1000
                        ).toLocaleString()
                      : "-"}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid
        container
        style={{
          marginTop: ".5rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          size="small"
        />
      </Grid>
    </Grid>
  );
}
