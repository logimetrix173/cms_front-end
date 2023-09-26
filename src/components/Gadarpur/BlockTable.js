import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import React, { useEffect, useState } from "react";

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
  tableContainer: {
    maxHeight: "80vh",
  },
});

const CustomizedSubRow = ({ value }) => {
  let rowBackgroundColor = null;
  return (
    <StyledTableRow>
      <StyledTableCell
        component="th"
        scope="row"
        style={{
          paddingTop: ".6rem",
          paddingBottom: ".6rem",
          backgroundColor: rowBackgroundColor,
        }}
      >
        <strong
          style={{
            paddingLeft: "2.5rem",
          }}
        >
          {value.heading}
        </strong>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        style={{ backgroundColor: rowBackgroundColor }}
      >
        <span>
          {isNaN(Number(value.inv1))
            ? "-"
            : Number(value.inv1) === -111
            ? "x"
            : Number(value.inv1).toFixed(2)}
        </span>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        style={{ backgroundColor: rowBackgroundColor }}
      >
        <span>
          {isNaN(Number(value.inv2))
            ? "-"
            : Number(value.inv2) === -111
            ? "x"
            : Number(value.inv2).toFixed(2)}
        </span>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        style={{ backgroundColor: rowBackgroundColor }}
      >
        <span>
          {isNaN(Number(value.inv3))
            ? "-"
            : Number(value.inv3) === -111
            ? "x"
            : Number(value.inv3).toFixed(2)}
        </span>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        style={{ backgroundColor: rowBackgroundColor }}
      >
        <span>
          {isNaN(Number(value.inv4))
            ? "-"
            : Number(value.inv4) === -111
            ? "x"
            : Number(value.inv4).toFixed(2)}
        </span>
      </StyledTableCell>
      {/* <StyledTableCell
        align="center"
        style={{ backgroundColor: rowBackgroundColor }}
      >
        <span>
          {isNaN(Number(value.inv5)) ? "-" : Number(value.inv5).toFixed(2)}
        </span>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        style={{ backgroundColor: rowBackgroundColor }}
      >
        <span>
          {isNaN(Number(value.inv6)) ? "-" : Number(value.inv6).toFixed(2)}
        </span>
      </StyledTableCell> */}
    </StyledTableRow>
  );
};

const CustomizedRow = ({ value }) => {
  return (
    <StyledTableRow>
      <StyledTableCell
        component="th"
        scope="row"
        style={{ paddingTop: ".6rem", paddingBottom: ".6rem" }}
      >
        <strong style={{ paddingLeft: "1rem" }}>{value.heading}</strong>
      </StyledTableCell>
      <StyledTableCell align="center">
        {isNaN(Number(value.inv1))
          ? "-"
          : Number(value.inv1) === -111
          ? "x"
          : Number(value.inv1).toFixed(2)}
      </StyledTableCell>
      <StyledTableCell align="center">
        {isNaN(Number(value.inv2))
          ? "-"
          : Number(value.inv2) === -111
          ? "x"
          : Number(value.inv2).toFixed(2)}
      </StyledTableCell>
      <StyledTableCell align="center">
        {isNaN(Number(value.inv3))
          ? "-"
          : Number(value.inv3) === -111
          ? "x"
          : Number(value.inv3).toFixed(2)}
      </StyledTableCell>
      <StyledTableCell align="center">
        {isNaN(Number(value.inv4))
          ? "-"
          : Number(value.inv4) === -111
          ? "x"
          : Number(value.inv4).toFixed(2)}
      </StyledTableCell>
      {/* <StyledTableCell align="center">
        {isNaN(Number(value.inv5)) ? "-" : Number(value.inv5).toFixed(2)}
      </StyledTableCell>
      <StyledTableCell align="center">
        {isNaN(Number(value.inv6)) ? "-" : Number(value.inv6).toFixed(2)}
      </StyledTableCell> */}
    </StyledTableRow>
  );
};

export default function InverterTable({ values }) {
  const classes = useStyles();

  const [tableRows, setTableRows] = useState([]);

  const [openRowsS, setOpenRowsS] = React.useState(false);
  const [openRowsPV, setopenRowsPV] = React.useState(false);

  const onRowDropDownClick = (tag) => {
    if (tag === "S") {
      setOpenRowsS((prevState) => {
        return !prevState;
      });
    } else {
      setopenRowsPV((prevState) => {
        return !prevState;
      });
    }
  };

  const CustomizedRowGroup = ({ title, tag, openRows }) => {
    let rowBackgroundColor = "#EBF5FB";
    return (
      <StyledTableRow>
        <StyledTableCell
          component="th"
          scope="row"
          colSpan={7}
          style={{
            // paddingTop: ".6rem",
            // paddingBottom: ".6rem",
            backgroundColor: rowBackgroundColor,
          }}
        >
          <strong
            style={{
              paddingLeft: "1rem",
              paddingRight: ".5rem",
              color: "#000",
            }}
          >
            {title}
          </strong>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => onRowDropDownClick(tag)}
            style={{ color: "#000" }}
          >
            {openRows ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
      </StyledTableRow>
    );
  };

  useEffect(() => {
    let subRowsS = [];
    let subRowsPV = [];

    let otherRows = [];

    let firstIndexRowS = null;
    let lastIndexRowS = null;

    let firstIndexRowPV = null;
    let lastIndexRowPV = null;

    for (let i = 0; i < values.length; i++) {
      if (values[i].heading.match(/S[1-4] [^/]/i)) {
        if (!firstIndexRowS) {
          firstIndexRowS = i;
          otherRows.push(
            <CustomizedRowGroup
              key={i}
              title={"Inverter Slots"}
              tag={"S"}
              openRows={openRowsS}
            />
          );
        }
        lastIndexRowS = i;
        subRowsS.push(
          <CustomizedSubRow key={values[i].heading} value={values[i]} />
        );
      } else if (
        values[i].heading.match(/[S]2[0-4]|1[0-9]|[1-9] [/] S[1-4]CB/i)
      ) {
        if (!firstIndexRowPV) {
          firstIndexRowPV = i;
          otherRows.push(
            <CustomizedRowGroup
              key={i}
              title={"Inverter Strings"}
              tag={"PV"}
              openRows={openRowsPV}
            />
          );
        }
        lastIndexRowPV = i;
        subRowsPV.push(
          <CustomizedSubRow key={values[i].heading} value={values[i]} />
        );
      } else {
        otherRows.push(<CustomizedRow key={i} value={values[i]} />);
      }
    }

    let newRows = [...otherRows];

    if (openRowsS && openRowsPV) {
      newRows.splice(firstIndexRowS + 1, 0, ...subRowsS);
      newRows = [...newRows, subRowsPV];
    } else if (openRowsS && !openRowsPV) {
      newRows.splice(firstIndexRowS + 1, 0, ...subRowsS);
    } else if (!openRowsS && openRowsPV) {
      newRows = [...newRows, subRowsPV];
    } else {
      newRows = [...otherRows];
    }

    setTableRows(newRows);
  }, [values, openRowsS, openRowsPV]);

  return (
    <TableContainer
      component={Paper}
      elevation={6}
      className={classes.tableContainer}
    >
      <Table stickyHeader={true} aria-label="customized table" size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell
              style={{
                paddingTop: ".7rem",
                paddingLeft: "1.75rem",
                paddingBottom: ".7rem",
              }}
            >
              <strong>Parameters</strong>
            </StyledTableCell>
            <StyledTableCell
              align="center"
              // style={{ paddingTop: ".5rem", paddingBottom: ".5rem" }}
            >
              <strong>Inv 1</strong>
            </StyledTableCell>
            <StyledTableCell
              align="center"
              // style={{ paddingTop: ".5rem", paddingBottom: ".5rem" }}
            >
              <strong>Inv 2</strong>
            </StyledTableCell>
            <StyledTableCell
              align="center"
              // style={{ paddingTop: ".5rem", paddingBottom: ".5rem" }}
            >
              <strong>Inv 3</strong>
            </StyledTableCell>
            <StyledTableCell
              align="center"
              // style={{ paddingTop: ".5rem", paddingBottom: ".5rem" }}
            >
              <strong>Inv 4</strong>
            </StyledTableCell>
            {/* <StyledTableCell
              align="center"
              // style={{ paddingTop: ".5rem", paddingBottom: ".5rem" }}
            >
              <strong>Inv 5</strong>
            </StyledTableCell>
            <StyledTableCell
              align="center"
              // style={{ paddingTop: ".5rem", paddingBottom: ".5rem" }}
            >
              <strong>Inv 6</strong>
            </StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>{tableRows}</TableBody>
      </Table>
    </TableContainer>
  );
}
