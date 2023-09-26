import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#ffffbf",
    color: theme.palette.common.black,
    fontSize: 16,
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  customTableContainer: {
    // overflowX: "initial",
  },
  table: {
    // minWidth: 700
  },
});

export default function InverterTable({ values }) {
  const classes = useStyles();

  return (
    <TableContainer
      component={Paper}
      elevation={6}
      className={classes.customTableContainer}
    >
      <Table
        // stickyHeader={true}
        className={classes.table}
        aria-label="customized table"
        size="small"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell
              style={{
                paddingLeft: "1.75rem",
                paddingTop: ".7rem",
                paddingBottom: ".7rem",
              }}
            >
              <strong>Parameters</strong>
            </StyledTableCell>
            <StyledTableCell align="center">
              <strong>Inv 1</strong>
            </StyledTableCell>
            <StyledTableCell align="center">
              <strong>Inv 2</strong>
            </StyledTableCell>
            <StyledTableCell align="center">
              <strong>Inv 3</strong>
            </StyledTableCell>
            <StyledTableCell align="center">
              <strong>Inv 4</strong>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {values.map((value) => (
            <StyledTableRow key={value.heading}>
              <StyledTableCell
                component="th"
                scope="row"
                style={{ paddingTop: ".6rem", paddingBottom: ".6rem" }}
              >
                <strong style={{ paddingLeft: "1rem" }}>{value.heading}</strong>
              </StyledTableCell>
              <StyledTableCell align="center">
                {Number(value.inv1).toFixed(2)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {Number(value.inv2).toFixed(2)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {Number(value.inv3).toFixed(2)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {Number(value.inv4).toFixed(2)}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
