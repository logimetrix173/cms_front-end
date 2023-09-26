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

export default function InvertersTable({ data, updateInverter }) {
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

  const handleInverterUpdate = (row) => {
    let userDetails = JSON.parse(localStorage.getItem("userDetails"));

    if (
      (userDetails.role === "admin" &&
        (userDetails.email === "sumit.datablare@gmail.com" ||
          userDetails.email === "veerpratap@acme.in" ||
          userDetails.email === "aman@datablare.com")) ||
      userDetails.email === "acmeace@acme.in"
    ) {
      // window.alert('The update feature is temporarily disabled.');
      updateInverter(row);
    } else {
      window.alert("The update is not allowed.");
    }
  };

  return (
    <Grid container>
      <TableContainer component={Paper} style={{ maxWidth: "89vw" }}>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#ffbf80" }}>
              <TableCell style={{ zIndex: 101, color: "#000" }}>
                Action
              </TableCell>
              <TableCell style={{ color: "#000" }}>Id</TableCell>
              <TableCell style={{ color: "#000" }}>Site</TableCell>
              <TableCell style={{ color: "#000" }}>Block</TableCell>
              <TableCell style={{ color: "#000" }}>Inverter</TableCell>
              <TableCell style={{ color: "#000" }}>Group</TableCell>
              <TableCell style={{ color: "#000" }}>Make</TableCell>
              <TableCell style={{ color: "#000" }}>Number</TableCell>
              <TableCell style={{ color: "#000" }}>Type</TableCell>
              <TableCell style={{ color: "#000" }}>Slots</TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                SCB Connected
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                Strings Connected
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                Module Make
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                Module Rating
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                AC Capacity
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                DC Capacity
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                DA Ratio
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                DC overloading
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                Peak 1
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                Peak 2
              </TableCell>

              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                Omega Id
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                Tech Name
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                Tech Mob
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                Tech Email
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                Clipping Threshold
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => {
              // console.log(row);

              return (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell style={{ zIndex: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleInverterUpdate(row)}
                      style={{ paddingInline: ".5rem" }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.sitename}</TableCell>
                  <TableCell>{row.block}</TableCell>
                  <TableCell>{row.inverter}</TableCell>
                  <TableCell style={{ whiteSpace: "nowrap" }}>
                    {row.inv_group}
                  </TableCell>
                  <TableCell>{row.inverter_make}</TableCell>
                  <TableCell>{row.inverter_num}</TableCell>
                  <TableCell style={{ whiteSpace: "nowrap" }}>
                    {row.inverter_type}
                  </TableCell>
                  <TableCell>{row.slots}</TableCell>
                  <TableCell>{row.scb_connected}</TableCell>
                  <TableCell>{row.strings_connected}</TableCell>

                  <TableCell style={{ whiteSpace: "nowrap" }}>
                    {row.connected_module_make}
                  </TableCell>
                  <TableCell>{row.module_rating}</TableCell>
                  <TableCell>{row.ac_capacity_kw}</TableCell>
                  <TableCell>{row.dc_capacity_kw}</TableCell>
                  <TableCell>{row.da_ratio}</TableCell>

                  <TableCell>{row.dc_overloading}</TableCell>

                  <TableCell>{row.peak1}</TableCell>
                  <TableCell>{row.peak2}</TableCell>

                  <TableCell>{row.omegaid}</TableCell>
                  <TableCell>{row.techname}</TableCell>
                  <TableCell>{row.techmob}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.clipping_threshold}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container justifyContent="flex-end" style={{ marginTop: ".25rem" }}>
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
