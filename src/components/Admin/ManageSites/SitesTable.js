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
import NoteAddRoundedIcon from "@material-ui/icons/NoteAddRounded";
import SimpleDialogDemo from "./SimpleDialog";

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

export default function SitesTable({
  data,
  updateSite,
  handleClickOpen,
  sendNotemsg,
}) {
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
      userDetails.role === "admin" &&
      (userDetails.email === "sumit.datablare@gmail.com" ||
        userDetails.email === "veerpratap@acme.in" ||
        userDetails.email === "aman@datablare.com" ||
        userDetails.email === "acmeace@acme.in")
    ) {
      // window.alert('The update feature is temporarily disabled.');
      updateSite(row);
    } else {
      window.alert("The update is not allowed.");
    }
  };

  return (
    <Grid container>
      <TableContainer component={Paper} style={{ maxWidth: "91vw" }}>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#ffbf80" }}>
              <TableCell style={{ zIndex: 101 }}>Action</TableCell>
              <TableCell style={{ zIndex: 101 }}>Note</TableCell>
              <TableCell style={{ color: "#000" }}>Id</TableCell>
              <TableCell style={{ color: "#000" }}>Site</TableCell>
              <TableCell style={{ color: "#000" }}>Capacity</TableCell>
              <TableCell style={{ color: "#000" }}>Blocks</TableCell>
              <TableCell style={{ color: "#000" }}>Inverters</TableCell>
              <TableCell style={{ color: "#000" }}>Status</TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                Billing Rates
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                DB Pool
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                System Id
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                System Ip
              </TableCell>
              <TableCell style={{ color: "#000" }}>National Head</TableCell>
              <TableCell style={{ color: "#000" }}>Zonal Head</TableCell>
              <TableCell style={{ color: "#000" }}>Plant Head</TableCell>
              <TableCell style={{ color: "#000" }}>MobNo</TableCell>
              <TableCell style={{ color: "#000" }}>HO Contact</TableCell>
              <TableCell style={{ color: "#000" }}>Addl. Contact</TableCell>
              <TableCell style={{ color: "#000" }}>Edited By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => {
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
                  <TableCell style={{ zIndex: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleClickOpen(row)}
                      style={{ paddingInline: ".5rem" }}
                    >
                      <NoteAddRoundedIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.sitename}</TableCell>
                  <TableCell>{row.capacity}</TableCell>
                  <TableCell>{row.totalblocks}</TableCell>
                  <TableCell>{row.inverters}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.billingrates}</TableCell>
                  <TableCell>{row.dbpool}</TableCell>
                  <TableCell style={{ whiteSpace: "nowrap" }}>
                    {row.systemid}
                  </TableCell>
                  <TableCell>{row.systemip}</TableCell>
                  <TableCell>{row.nationalhead_email}</TableCell>
                  <TableCell>{row.zonalhead_email}</TableCell>
                  <TableCell>{row.siteincharge_email}</TableCell>
                  <TableCell>
                    {row.mob_no && row.mob_no.length > 0
                      ? row.mob_no.join(",")
                      : ""}
                  </TableCell>
                  <TableCell>{row.ho_coordinator}</TableCell>
                  <TableCell>
                    {row.emails && row.emails.length > 0
                      ? row.emails.join(",")
                      : ""}
                  </TableCell>
                  <TableCell>{row.editedby}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid
        container
        justify="flex-end"
        style={{ marginTop: ".25rem", marginRight: "1.2rem" }}
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
