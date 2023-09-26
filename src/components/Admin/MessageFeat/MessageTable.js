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

export default function MessageTable({ data, updateInverterScb }) {
  const rowsConst = 10;

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

  //   const handleInverterUpdate = (row) => {
  // let userDetails = JSON.parse(localStorage.getItem("userDetails"));

  //     if (
  //       (userDetails.role === "admin" &&
  //         (userDetails.email === "akasmishra@datablare.com" ||
  //           userDetails.email === "veerpratap@acme.in" ||
  //           userDetails.email === "sumit.datablare@gmail.com")) ||
  //       userDetails.email === "acmeace@acme.in"
  //     ) {
  //       // window.alert('The update feature is temporarily disabled.');
  //       updateInverterScb(row);
  //     } else {
  //       window.alert("The update is not allowed.");
  //     }
  //   };

  return (
    <Grid container>
      <TableContainer component={Paper} style={{ maxWidth: "89vw" }}>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#ffffbf" }}>
              {/* <TableCell style={{ zIndex: 101, color: "#000" }}>
                Action
              </TableCell> */}
              {/* <TableCell style={{ color: "#000" }}>Id</TableCell> */}
              <TableCell style={{ color: "#000" }}>Site</TableCell>
              <TableCell style={{ color: "#000" }}>From</TableCell>
              <TableCell style={{ color: "#000" }}>To</TableCell>

              <TableCell style={{ color: "#000" }}>Status</TableCell>
              <TableCell style={{ color: "#000" }}>Time</TableCell>
              <TableCell style={{ color: "#000" }}>Send/Receive</TableCell>

              {/* {paginatedData.map((row, index) => {
                return (
                  <TableCell
                    style={{ whiteSpace: "nowrap", color: "#000" }}
                    key={row}
                  >
                    {Object.keys(row)}
                  </TableCell>
                );
              })} */}

              {/* <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                Omega Id
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => {
              // console.log(row);

              return (
                <TableRow
                  key={row.phoneNumber}
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
                    {row.site == null ? `x` : row.site}
                  </TableCell>
                  <TableCell>{row.phonenumber}</TableCell>
                  <TableCell>{row.message}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell style={{ whiteSpace: "nowrap" }}>
                    {/* {row.timestamp} */}
                    {row.timestamp === null
                      ? `x`
                      : new Date(Number(row.timestamp * 1000)).toLocaleString()}
                  </TableCell>

                  <TableCell style={{ whiteSpace: "nowrap" }}>
                    {row.typebox}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid
        container
        justify="flex-end"
        style={{ marginLeft: "-10rem", marginTop: ".25rem" }}
      >
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
