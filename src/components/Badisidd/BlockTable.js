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
import { inverters } from "../../constants/csvParameters";

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
    maxWidth: "90vw",
  },
});

const CustomizedSubRow = ({ value, inverters }) => {
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
      {Array.from(Array(inverters).keys()).map((element, index) => {
        return (
          <StyledTableCell
            align="center"
            style={{ backgroundColor: rowBackgroundColor }}
          >
            <span>
              {isNaN(Number(value["inv" + Number(index + 1)]))
                ? "-"
                : Number(value["inv" + Number(index + 1)]) === -111
                ? "X"
                : Number(value["inv" + Number(index + 1)]).toFixed(2)}
            </span>
          </StyledTableCell>
        );
      })}
    </StyledTableRow>
  );
};

const CustomizedRow = ({ value, inverters }) => {
  // console.log(inverters);
  return (
    <StyledTableRow>
      <StyledTableCell
        component="th"
        scope="row"
        style={{
          paddingTop: ".6rem",
          paddingBottom: ".6rem",
          position: "sticky",
          left: 0,
          backgroundColor: "white",
          minWidth: "300px",
        }}
      >
        <strong style={{ paddingLeft: "1rem" }}>{value.heading}</strong>
      </StyledTableCell>

      {Array.from(Array(inverters).keys()).map((element, index) => {
        return (
          <StyledTableCell align="center">
            {isNaN(Number(value["inv" + Number(index + 1)]))
              ? "-"
              : Number(value["inv" + Number(index + 1)]) === -111
              ? "X"
              : Number(value["inv" + Number(index + 1)]).toFixed(2)}
          </StyledTableCell>
        );
      })}
    </StyledTableRow>
  );
};

export default function InverterTable({ values, block }) {
  // console.log("Inverter table values", values);
  const classes = useStyles();

  const [tableRows, setTableRows] = useState([]);

  const [openRowsS, setOpenRowsS] = React.useState(false);
  const [openRowsPV, setopenRowsPV] = React.useState(false);

  const [inverters, setInverters] = useState(4);

  // useEffect(() => {
  //   // console.log(inverters);
  //   setInverters(4);
  // }, [block]);

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
          colSpan={37}
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
          <CustomizedSubRow
            key={values[i].heading}
            value={values[i]}
            inverters={inverters}
          />
        );
      } else if (
        values[i].heading.match(/[S]3[0-4]|2[0-9]|1[0-9]|[1-9] [/] S[1-4]CB/i)
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
          <CustomizedSubRow
            key={values[i].heading}
            value={values[i]}
            inverters={inverters}
          />
        );
      } else {
        otherRows.push(
          <CustomizedRow key={i} value={values[i]} inverters={inverters} />
        );
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
          <TableRow
          // style={{
          //   position: "sticky",
          //   left: 0,
          // }}
          >
            <StyledTableCell
              style={{
                paddingTop: ".7rem",
                paddingLeft: "1.75rem",
                paddingBottom: ".7rem",
                zIndex: 101,
              }}
            >
              <strong>Parameters</strong>
            </StyledTableCell>

            {Array.from(Array(inverters).keys()).map((element, index) => {
              return (
                <StyledTableCell
                  align="center"
                  // style={{ paddingTop: ".5rem", paddingBottom: ".5rem" }}
                  style={{ minWidth: "100px" }}
                >
                  <strong>Inv {index + 1}</strong>
                </StyledTableCell>
              );
            })}
            {/* <StyledTableCell
              align="center"
              // style={{ paddingTop: ".5rem", paddingBottom: ".5rem" }}
            >
              <strong>Inv 2</strong>
            </StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>{tableRows}</TableBody>
      </Table>
    </TableContainer>
  );
}
