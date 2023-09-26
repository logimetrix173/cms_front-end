import React, { useState, useEffect } from "react";
import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import EditIcon from "@material-ui/icons/Edit";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function LogTable({ data, updateSite }) {
  const rowsConst = 12;

  const [page, setPage] = useState(0);

  const [pageCount, setPageCount] = useState(0);

  const [paginatedData, setPaginatedData] = useState([]);

  useEffect(() => {
    if (data) {
      // console.log(data);
      setPage(() => (data.length > 0 ? 1 : 0));
      setPageCount(() =>
        data.length > 0 ? Math.ceil(data.length / rowsConst) : 0
      );
      setPaginatedData(() => (data.length > 0 ? data.slice(0, rowsConst) : []));
    }
  }, [data]);

  const handlePageChange = (event, value) => {
    let paginatedData = data.slice(rowsConst * (value - 1), rowsConst * value);
    setPaginatedData(paginatedData);
    setPage(value);
  };

  const handleInverterUpdate = (row) => {
    let userDetails = JSON.parse(localStorage.getItem("userDetails"));

    if (
      userDetails.role === "admin" &&
      (userDetails.email === "akasmishra@datablare.com" ||
        userDetails.email === "veerpratap@acme.in" ||
        userDetails.email === "aman@datablare.com")
    ) {
      // window.alert('The update feature is temporarily disabled.');
      updateSite(row);
    } else {
      window.alert("The update is not allowed.");
    }
  };

  const formatTime = (timestamp) => {
    let date = new Date(timestamp);
    return `${String(date.getDate()).padStart(2, 0)}/${String(
      date.getMonth() + 1
    ).padStart(2, 0)} ${String(date.getHours()).padStart(2, 0)}:${String(
      date.getMinutes()
    ).padStart(2, 0)}:${String(date.getHours()).padStart(2, 0)}`;
  };

  const getSiteName = (siteId) => {
    let siteName = String(siteId).split("-")[0];
    siteName = siteName.charAt(0).toUpperCase() + siteName.slice(1);
    return siteName;
  };

  return (
    <Grid container>
      <TableContainer component={Paper} style={{ maxWidth: "89vw" }}>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#ffbf80" }}>
              {/* <TableCell style={{ zIndex: 101 }}>Action</TableCell> */}
              <TableCell style={{ color: "#000" }}>Site Id</TableCell>
              <TableCell style={{ color: "#000" }}>Error Type</TableCell>
              <TableCell style={{ color: "#000" }}>Error</TableCell>
              <TableCell style={{ color: "#000" }}>Insertion Time</TableCell>
              <TableCell style={{ color: "#000" }}>Remote Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length === 0 && (
              <TableRow
                key={"none"}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  No Records Found
                </TableCell>
              </TableRow>
            )}
            {paginatedData.length > 0 &&
              paginatedData.map((row, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {/* <TableCell style={{ zIndex: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleInverterUpdate(row)}
                      style={{ paddingInline: ".5rem" }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </TableCell> */}
                    <TableCell component="th" scope="row">
                      {getSiteName(row.site_id)}
                    </TableCell>
                    <TableCell>{row.error_type}</TableCell>
                    <TableCell>{row.errors}</TableCell>
                    <TableCell>
                      {formatTime(Number(row.insertion_time))}
                    </TableCell>
                    <TableCell>{formatTime(row.remote_time * 1000)}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container justify="flex-end" style={{ marginTop: ".25rem" }}>
        <Grid item>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            shape="rounded"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
