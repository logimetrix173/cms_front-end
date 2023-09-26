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

export default function LossTable({ rows = [], setRows }) {
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
                onClick={(event) => toggleTableSort(event, "Site")}
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
                onClick={(event) => toggleTableSort(event, "budgetRev")}
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
                onClick={(event) => toggleTableSort(event, "budgetRev")}
              >
                Budget Rev
              </TableCell>
              <TableCell
                align="center"
                style={{
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  color: "#000",
                }}
                onClick={(event) => toggleTableSort(event, "actualRev")}
              >
                Actual Rev
              </TableCell>
              <TableCell
                align="center"
                style={{
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  color: "#000",
                }}
                onClick={(event) => toggleTableSort(event, "GhiCorrRevenue")}
              >
                GHI Core Revenue
              </TableCell>
              <TableCell
                align="center"
                style={{
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  color: "#000",
                }}
                onClick={(event) => toggleTableSort(event, "AbsoluteLoss")}
              >
                Absolute Loss
              </TableCell>
              <TableCell
                align="center"
                style={{
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  color: "#000",
                }}
                onClick={(event) => toggleTableSort(event, "GHIImpact")}
              >
                GHI Impact
              </TableCell>
              <TableCell
                align="center"
                style={{
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  color: "#000",
                }}
                onClick={(event) => toggleTableSort(event, "PALossorGain")}
              >
                PA Loss/Gain
              </TableCell>
              <TableCell
                align="center"
                style={{
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  color: "#000",
                }}
                onClick={(event) => toggleTableSort(event, "GALossorGain")}
              >
                GA Loss/Gain
              </TableCell>
              <TableCell
                align="center"
                style={{
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  color: "#000",
                }}
                onClick={(event) => toggleTableSort(event, "TempLossorGainGHI")}
              >
                Temp. Loss/Gain
              </TableCell>
              <TableCell
                align="center"
                style={{
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  color: "#000",
                }}
                onClick={(event) => toggleTableSort(event, "AuxConsumption")}
              >
                Aux Consumption
              </TableCell>
              <TableCell
                align="center"
                style={{
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  color: "#000",
                }}
                onClick={(event) => toggleTableSort(event, "TotalLoss")}
              >
                Total Loss
              </TableCell>
              <TableCell
                align="center"
                style={{
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  color: "#000",
                }}
                onClick={(event) => toggleTableSort(event, "RemainingLoss")}
              >
                Remaining Loss
              </TableCell>
              <TableCell
                align="center"
                style={{
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  color: "#000",
                }}
                onClick={(event) => toggleTableSort(event, "finalEfficiency")}
              >
                Final Efficiency
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
                // .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="left" style={{ whiteSpace: "nowrap" }}>
                      {getTime(row.Time)}
                    </TableCell>
                    <TableCell align="center" style={{ whiteSpace: "nowrap" }}>
                      {row.Site}
                    </TableCell>
                    <TableCell align="center" style={{ whiteSpace: "nowrap" }}>
                      {row.budgetRev}
                    </TableCell>
                    <TableCell align="center" style={{ whiteSpace: "nowrap" }}>
                      {row.actualRev}
                    </TableCell>
                    <TableCell align="center" style={{ whiteSpace: "nowrap" }}>
                      {row.GhiCorrRevenue}
                    </TableCell>
                    <TableCell align="center" style={{ whiteSpace: "nowrap" }}>
                      {row.AbsoluteLoss}
                    </TableCell>
                    <TableCell align="center" style={{ whiteSpace: "nowrap" }}>
                      {row.GHIImpact}
                    </TableCell>
                    <TableCell align="center" style={{ whiteSpace: "nowrap" }}>
                      {row.PALossorGain}
                    </TableCell>
                    <TableCell align="center" style={{ whiteSpace: "nowrap" }}>
                      {row.GALossorGain}
                    </TableCell>
                    <TableCell align="center" style={{ whiteSpace: "nowrap" }}>
                      {row.TempLossorGainGHI}
                    </TableCell>
                    <TableCell align="center" style={{ whiteSpace: "nowrap" }}>
                      {row.AuxConsumption}
                    </TableCell>
                    <TableCell align="center" style={{ whiteSpace: "nowrap" }}>
                      {row.TotalLoss}
                    </TableCell>
                    <TableCell align="center" style={{ whiteSpace: "nowrap" }}>
                      {row.RemainingLoss}
                    </TableCell>
                    <TableCell align="center" style={{ whiteSpace: "nowrap" }}>
                      {row.finalDataEfficiency}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
