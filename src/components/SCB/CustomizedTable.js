import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Pagination from "@material-ui/lab/Pagination";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#ffffbf",
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
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
  tableContainer: { width: "100%" },
});

export default function CustomizedTable({ data }) {
  const classes = useStyles();

  const [page, setPage] = useState(0);

  const [pageCount, setPageCount] = useState(0);

  const [paginatedData, setPaginatedData] = useState([]);

  const [energyHeaders, setEnergyHeaders] = useState(null);

  const getEnergyDifference = (lastValue, firstValue) => {
    let numLast = Number(lastValue);
    let numFirst = Number(firstValue);
    return numLast - numFirst;
  };

  const formatEnergyHeaders = () => {
    // Set colors on energy headers
    let energyHeaders = {};
    if (data.length > 0) {
      let maxEnergyDifference = null;
      let maxEnergyDifferenceKey = null;
      // Find max difference
      for (let i = 1; i <= 12; i++) {
        let difference = getEnergyDifference(
          data[0]["e" + i],
          data[data.length - 1]["e" + i]
        );
        if (maxEnergyDifference === null) {
          maxEnergyDifference = difference;
          maxEnergyDifferenceKey = "e" + i;
        }
        if (maxEnergyDifference < difference) {
          maxEnergyDifference = difference;
          maxEnergyDifferenceKey = "e" + i;
        }
      }
      // Set colors based on difference
      for (let i = 1; i <= 12; i++) {
        let difference = getEnergyDifference(
          data[0]["e" + i],
          data[data.length - 1]["e" + i]
        );
        if (
          difference <
          maxEnergyDifference - maxEnergyDifference * (5 / 100)
        ) {
          energyHeaders["e" + i] = [difference, "red"];
        } else {
          energyHeaders["e" + i] = [difference, "black"];
        }
      }
      energyHeaders[maxEnergyDifferenceKey] = [maxEnergyDifference, "green"];
      setEnergyHeaders(Object.entries(energyHeaders));
    }
  };

  useEffect(() => {
    setPage(() => (data.length > 0 ? 1 : 0));
    setPageCount(() => (data.length > 0 ? Math.ceil(data.length / 10) : 0));
    setPaginatedData(() => (data.length > 0 ? data.slice(0, 10) : []));
    formatEnergyHeaders();
  }, [data]);

  const handlePageChange = (event, value) => {
    let paginatedData = data.slice(10 * (value - 1), 10 * value);
    setPaginatedData(paginatedData);
    setPage(value);
  };

  return (
    <div>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table aria-label="customized table" size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell
                style={{
                  position: "sticky",
                  left: 0,
                }}
              >
                Time
              </StyledTableCell>
              <StyledTableCell align="right">I1</StyledTableCell>
              <StyledTableCell align="right">I2</StyledTableCell>
              <StyledTableCell align="right">I3</StyledTableCell>
              <StyledTableCell align="right">I4</StyledTableCell>
              <StyledTableCell align="right">I5</StyledTableCell>
              <StyledTableCell align="right">I6</StyledTableCell>
              <StyledTableCell align="right">I7</StyledTableCell>
              <StyledTableCell align="right">I8</StyledTableCell>
              <StyledTableCell align="right">I9</StyledTableCell>
              <StyledTableCell align="right">I10</StyledTableCell>
              <StyledTableCell align="right">I11</StyledTableCell>
              <StyledTableCell align="right">I12</StyledTableCell>
              {energyHeaders &&
                energyHeaders.map((element, index) => {
                  let title = "E" + (index + 1);
                  return (
                    <StyledTableCell align="right">
                      {title}&nbsp;
                      <span style={{ color: element[1][1] }}>
                        ({element[1][0]})
                      </span>
                    </StyledTableCell>
                  );
                })}
              <StyledTableCell align="right">Temp</StyledTableCell>
              <StyledTableCell align="right">VDC</StyledTableCell>
              <StyledTableCell align="right">Total&nbsp;Energy</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <StyledTableRow key={String(row.time).split(" ")[1]}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  style={{
                    position: "sticky",
                    left: 0,
                    backgroundColor: "white",
                  }}
                >
                  {String(row.time).split(" ")[1]}
                </StyledTableCell>
                <StyledTableCell align="right" style={{ color: row.i1[1] }}>
                  {row.i1[0]}
                </StyledTableCell>
                <StyledTableCell align="right" style={{ color: row.i2[1] }}>
                  {row.i2[0]}
                </StyledTableCell>
                <StyledTableCell align="right" style={{ color: row.i3[1] }}>
                  {row.i3[0]}
                </StyledTableCell>
                <StyledTableCell align="right" style={{ color: row.i4[1] }}>
                  {row.i4[0]}
                </StyledTableCell>
                <StyledTableCell align="right" style={{ color: row.i5[1] }}>
                  {row.i5[0]}
                </StyledTableCell>
                <StyledTableCell align="right" style={{ color: row.i6[1] }}>
                  {row.i6[0]}
                </StyledTableCell>
                <StyledTableCell align="right" style={{ color: row.i7[1] }}>
                  {row.i7[0]}
                </StyledTableCell>
                <StyledTableCell align="right" style={{ color: row.i8[1] }}>
                  {row.i8[0]}
                </StyledTableCell>
                <StyledTableCell align="right" style={{ color: row.i9[1] }}>
                  {row.i9[0]}
                </StyledTableCell>
                <StyledTableCell align="right" style={{ color: row.i10[1] }}>
                  {row.i10[0]}
                </StyledTableCell>
                <StyledTableCell align="right" style={{ color: row.i11[1] }}>
                  {row.i11[0]}
                </StyledTableCell>
                <StyledTableCell align="right" style={{ color: row.i12[1] }}>
                  {row.i12[0]}
                </StyledTableCell>
                <StyledTableCell align="right">{row.e1}</StyledTableCell>
                <StyledTableCell align="right">{row.e2}</StyledTableCell>
                <StyledTableCell align="right">{row.e3}</StyledTableCell>
                <StyledTableCell align="right">{row.e4}</StyledTableCell>
                <StyledTableCell align="right">{row.e5}</StyledTableCell>
                <StyledTableCell align="right">{row.e6}</StyledTableCell>
                <StyledTableCell align="right">{row.e7}</StyledTableCell>
                <StyledTableCell align="right">{row.e8}</StyledTableCell>
                <StyledTableCell align="right">{row.e9}</StyledTableCell>
                <StyledTableCell align="right">{row.e10}</StyledTableCell>
                <StyledTableCell align="right">{row.e11}</StyledTableCell>
                <StyledTableCell align="right">{row.e12}</StyledTableCell>
                <StyledTableCell align="right">{row.intertemp}</StyledTableCell>
                <StyledTableCell align="right">{row.vdc}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.totalenergy}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          marginTop: ".5rem",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          shape="rounded"
        />
      </div>
    </div>
  );
}
