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

export default function HighTempTable({ rows = [], setRows }) {
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

  const [tableAsc, setTableAsc] = useState(true);

  const toggleTableSort = (event, propertyName) => {
    let sortedRows = [];
    if (tableAsc) {
      sortedRows = rows.sort((a, b) =>
        a[propertyName] !== b[propertyName]
          ? a[propertyName] < b[propertyName]
            ? -1
            : 1
          : 0
      );
    } else {
      sortedRows = rows.sort((a, b) =>
        a[propertyName] !== b[propertyName]
          ? a[propertyName] < b[propertyName]
            ? 1
            : -1
          : 0
      );
    }
    setRows(sortedRows);
    setTableAsc((prevState) => !prevState);
  };

  const getTime = (timestamp) => {
    let date = new Date(timestamp * 1000);
    return `${String(date.getDate()).padStart(2, 0)}/${String(
      date.getMonth() + 1
    ).padStart(2, 0)} ${String(date.getHours()).padStart(2, 0)}:${String(
      date.getMinutes()
    ).padStart(2, 0)}`;
  };

  const getRowTextColor = (row) => {
    if (row.percentageDifference > 5) {
      return "red";
    }
    return "black";
  };

  return (
    <Grid container style={{ maxWidth: "90vw", marginTop: "1rem" }}>
      <TableContainer component={Paper}>
        <Table
          aria-label="simple table"
          size="small"
          style={{ overflowX: "auto" }}
        >
          <TableHead>
            <TableRow style={{ backgroundColor: "#ffffbf" }}>
              <TableCell
                align="left"
                style={{
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  color: "#000",
                }}
                onClick={(event) => toggleTableSort(event, "time")}
              >
                Time
              </TableCell>
              <TableCell
                align="center"
                style={{
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  color: "#000",
                }}
                onClick={(event) => toggleTableSort(event, "site")}
              >
                Site
              </TableCell>
              <TableCell
                align="center"
                style={{
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  color: "#000",
                }}
                onClick={(event) => toggleTableSort(event, "blockName")}
              >
                Block
              </TableCell>
              <TableCell
                align="center"
                style={{
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  color: "#000",
                }}
                onClick={(event) => toggleTableSort(event, "inverterName")}
              >
                Inverter
              </TableCell>
              <TableCell
                align="center"
                style={{
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  color: "#000",
                }}
                onClick={(event) =>
                  toggleTableSort(event, "percentageDifference")
                }
              >
                Percentage Difference
              </TableCell>
              <TableCell
                align="center"
                style={{
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  color: "#000",
                }}
                onClick={(event) => toggleTableSort(event, "ambienttemp")}
              >
                Ambient Temp
              </TableCell>
              <TableCell
                align="center"
                style={{
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  color: "#000",
                }}
                onClick={(event) => toggleTableSort(event, "cabTemp")}
              >
                Cabinet Temp
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
              rows
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell
                      align="left"
                      style={{
                        whiteSpace: "nowrap",
                        color: getRowTextColor(row),
                      }}
                    >
                      {getTime(row.time)}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        whiteSpace: "nowrap",
                        color: getRowTextColor(row),
                      }}
                    >
                      {row.site}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        whiteSpace: "nowrap",
                        color: getRowTextColor(row),
                      }}
                    >
                      {row.blockName}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        whiteSpace: "nowrap",
                        color: getRowTextColor(row),
                      }}
                    >
                      {row.inverterName}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        whiteSpace: "nowrap",
                        color: getRowTextColor(row),
                      }}
                    >
                      {row.percentageDifference}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        whiteSpace: "nowrap",
                        color: getRowTextColor(row),
                      }}
                    >
                      {row.ambTemp}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        whiteSpace: "nowrap",
                        color: getRowTextColor(row),
                      }}
                    >
                      {row.cabtemp}
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
