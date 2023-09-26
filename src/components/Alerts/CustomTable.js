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
    backgroundColor: "#ffbf80",
    color: theme.palette.common.black,
    // fontSize: 16,
  },
  body: {
    // fontSize: 16,
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

export default function CustomizedTable({
  data,
  ticketForModal,
  handleNotificationClick,
}) {
  // console.log('Inside alerts table file', data)
  const classes = useStyles();

  const [page, setPage] = useState(0);

  const [pageCount, setPageCount] = useState(0);

  const [paginatedData, setPaginatedData] = useState([]);

  const formatTime = (timestamp) => {
    let date = new Date(timestamp * 1000);
    return (
      String(date.getDate()).padStart(2, 0) +
      "/" +
      String(date.getMonth() + 1).padStart(2, 0) +
      "/" +
      String(date.getFullYear()).slice(2) +
      ", " +
      String(date.getHours()).padStart(2, 0) +
      ":" +
      String(date.getMinutes()).padStart(2, 0)
    );
  };

  useEffect(() => {
    if (data) {
      setPage(() => (data.length > 0 ? 1 : 0));
      setPageCount(() => (data.length > 0 ? Math.ceil(data.length / 13) : 0));
      setPaginatedData(() => (data.length > 0 ? data.slice(0, 13) : []));
    }
  }, [data]);

  const handlePageChange = (event, value) => {
    let paginatedData = data.slice(13 * (value - 1), 13 * value);
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
                style={
                  {
                    // position: "sticky",
                    // left: 0,
                  }
                }
              >
                <strong>Ticket</strong>
              </StyledTableCell>
              <StyledTableCell align="left">
                {" "}
                <strong>Status</strong>
              </StyledTableCell>
              <StyledTableCell align="left">
                {" "}
                <strong>Log Time</strong>
              </StyledTableCell>
              <StyledTableCell align="left">
                {" "}
                <strong>Update Time</strong>
              </StyledTableCell>
              <StyledTableCell align="left">
                {" "}
                <strong>Site</strong>
              </StyledTableCell>
              <StyledTableCell align="left">
                {" "}
                <strong>Issue</strong>
              </StyledTableCell>
              <StyledTableCell align="left">
                {" "}
                <strong>Category</strong>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  style={{
                    cursor: Number(row.ticket) && "pointer",
                    color: "blue",
                  }}
                  onClick={() => {
                    // ticketForModal(row);
                    localStorage.setItem("alertsTable", "notification_close");
                    handleNotificationClick(row);
                  }}
                >
                  {row.ticket}
                </StyledTableCell>

                <StyledTableCell
                  align="left"
                  style={{
                    color:
                      row.status === "Open"
                        ? "red"
                        : row.status === "Pending"
                        ? "orange"
                        : "green",
                  }}
                >
                  {row.status}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {String(row.ticket).includes("No")
                    ? "-"
                    : formatTime(row.timestamp)}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {String(row.ticket).includes("No")
                    ? "-"
                    : formatTime(row.timestamp)}
                </StyledTableCell>
                <StyledTableCell align="left">{row.site}</StyledTableCell>
                <StyledTableCell align="left">{row.alarm}</StyledTableCell>
                <StyledTableCell align="left">
                  {String(row.state).slice(0, 1).toUpperCase()}
                  {String(row.state).slice(1)}
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {paginatedData.length === 0 && (
              <StyledTableRow>
                <StyledTableCell align="left">Loading...</StyledTableCell>
              </StyledTableRow>
            )}
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
