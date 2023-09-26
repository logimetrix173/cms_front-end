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

export default function InvertersScbTable({ data, updateInverterScb }) {
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
        (userDetails.email === "akasmishra@datablare.com" ||
          userDetails.email === "veerpratap@acme.in" ||
          userDetails.email === "sumit.datablare@gmail.com")) ||
      userDetails.email === "acmeace@acme.in"
    ) {
      // window.alert('The update feature is temporarily disabled.');
      updateInverterScb(row);
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
              {/* <TableCell style={{ color: "#000" }}>Id</TableCell> */}
              <TableCell style={{ color: "#000" }}>Site</TableCell>
              <TableCell style={{ color: "#000" }}>Block</TableCell>
              <TableCell style={{ color: "#000" }}>Inverter</TableCell>
              {/* <TableCell style={{ color: "#000" }}>Group</TableCell> */}
              {/* <TableCell style={{ color: "#000" }}>Make</TableCell> */}
              {/* <TableCell style={{ color: "#000" }}>Number</TableCell> */}
              {/* <TableCell style={{ color: "#000" }}>Type</TableCell> */}
              {/* <TableCell style={{ color: "#000" }}>Slots</TableCell> */}
              {/* <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                SCB Connected
              </TableCell> */}
              {/* <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                Strings Connected
              </TableCell> */}
              {/* <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                Module Make
              </TableCell> */}
              {/* <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                Module Rating
              </TableCell> */}
              {/* <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                AC Capacity
              </TableCell> */}
              {/* <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                DC Capacity
              </TableCell> */}
              {/* <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                DA Ratio
              </TableCell> */}
              {/* <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                DC overloading
              </TableCell> */}
              {/* <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                Peak 1
              </TableCell> */}
              {/* <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                Peak 2
              </TableCell> */}
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S1
              </TableCell>
              <TableCell
                style={{
                  whiteSpace: "nowrap",
                  color: "#000",
                }}
              >
                S1-Field
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S2
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S2-Field
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S3
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S3-Field
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S4
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S4-Field
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S5
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S5-Field
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S6
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S6-Field
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S7
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S7-Field
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S8
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S8-Field
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S9
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S9-Field
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S10
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S10-Field
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S11
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S11-Field
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S12
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S12-Field
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S13
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S13-Field
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S14
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S14-Field
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S15
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S15-Field
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S16
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S16-Field
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S17
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S17-Field
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S18
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S18-Field
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S19
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S19-Field
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S20
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S20-Field
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S21
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S21-Field
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S22
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S22-Field
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S23
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S23-Field
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S24
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S24-Field
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S25
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S25-Field
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S26
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S26-Field
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S27
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S27-Field
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S28
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S28-Field
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S29
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S29-Field
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S30
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S30-Field
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S31
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S31-Field
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S32
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                S32-Field
              </TableCell>
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
              {/* <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                Tech Name
              </TableCell> */}
              {/* <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                Tech Mob
              </TableCell> */}
              {/* <TableCell style={{ whiteSpace: "nowrap", color: "#000" }}>
                Tech Email
              </TableCell> */}
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
                  {/* <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell> */}
                  <TableCell>{row.sitename}</TableCell>
                  <TableCell>{row.block}</TableCell>
                  <TableCell>{row.inverter}</TableCell>
                  {/* <TableCell style={{ whiteSpace: "nowrap" }}>
                    {row.inv_group}
                  </TableCell> */}
                  {/* <TableCell>{row.inverter_make}</TableCell> */}
                  {/* <TableCell>{row.inverter_num}</TableCell> */}
                  {/* <TableCell style={{ whiteSpace: "nowrap" }}>
                    {row.inverter_type}
                  </TableCell> */}
                  {/* <TableCell>{row.slots}</TableCell> */}
                  {/* <TableCell>{row.scb_connected}</TableCell> */}
                  {/* <TableCell>{row.strings_connected}</TableCell> */}

                  {/* <TableCell style={{ whiteSpace: "nowrap" }}>
                    {row.connected_module_make}
                  </TableCell> */}
                  {/* <TableCell>{row.module_rating}</TableCell> */}
                  {/* <TableCell>{row.ac_capacity_kw}</TableCell> */}
                  {/* <TableCell>{row.dc_capacity_kw}</TableCell> */}
                  {/* <TableCell>{row.da_ratio}</TableCell> */}

                  {/* <TableCell>{row.dc_overloading}</TableCell> */}

                  {/* <TableCell>{row.peak1}</TableCell> */}
                  {/* <TableCell>{row.peak2}</TableCell> */}

                  <TableCell
                    style={{ color: row.s1_status ? "grey" : "black" }}
                  >
                    {row.s1}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s1_status ? "grey" : "black" }}
                  >
                    {row.s1_field}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s2_status ? "grey" : "black" }}
                  >
                    {row.s2}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s2_status ? "grey" : "black" }}
                  >
                    {row.s2_field}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s3_status ? "grey" : "black" }}
                  >
                    {row.s3}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s3_status ? "grey" : "black" }}
                  >
                    {row.s3_field}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s4_status ? "grey" : "black" }}
                  >
                    {row.s4}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s4_status ? "grey" : "black" }}
                  >
                    {row.s4_field}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s5_status ? "grey" : "black" }}
                  >
                    {row.s5}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s5_status ? "grey" : "black" }}
                  >
                    {row.s5_field}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s6_status ? "grey" : "black" }}
                  >
                    {row.s6}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s6_status ? "grey" : "black" }}
                  >
                    {row.s6_field}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s7_status ? "grey" : "black" }}
                  >
                    {row.s7}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s7_status ? "grey" : "black" }}
                  >
                    {row.s7_field}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s8_status ? "grey" : "black" }}
                  >
                    {row.s8}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s8_status ? "grey" : "black" }}
                  >
                    {row.s8_field}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s9_status ? "grey" : "black" }}
                  >
                    {row.s9}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s9_status ? "grey" : "black" }}
                  >
                    {row.s9_field}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s10_status ? "grey" : "black" }}
                  >
                    {row.s10}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s10_status ? "grey" : "black" }}
                  >
                    {row.s10_field}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s11_status ? "grey" : "black" }}
                  >
                    {row.s11}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s11_status ? "grey" : "black" }}
                  >
                    {row.s11_field}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s12_status ? "grey" : "black" }}
                  >
                    {row.s12}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s12_status ? "grey" : "black" }}
                  >
                    {row.s12_field}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s13_status ? "grey" : "black" }}
                  >
                    {row.s13}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s13_status ? "grey" : "black" }}
                  >
                    {row.s13_field}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s14_status ? "grey" : "black" }}
                  >
                    {row.s14}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s14_status ? "grey" : "black" }}
                  >
                    {row.s14_field}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s15_status ? "grey" : "black" }}
                  >
                    {row.s15}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s15_status ? "grey" : "black" }}
                  >
                    {row.s15_field}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s16_status ? "grey" : "black" }}
                  >
                    {row.s16}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s16_status ? "grey" : "black" }}
                  >
                    {row.s16_field}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s17_status ? "grey" : "black" }}
                  >
                    {row.s17}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s17_status ? "grey" : "black" }}
                  >
                    {row.s17_field}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s18_status ? "grey" : "black" }}
                  >
                    {row.s18}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s18_status ? "grey" : "black" }}
                  >
                    {row.s18_field}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s19_status ? "grey" : "black" }}
                  >
                    {row.s19}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s19_status ? "grey" : "black" }}
                  >
                    {row.s19_field}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s20_status ? "grey" : "black" }}
                  >
                    {row.s20}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s20_status ? "grey" : "black" }}
                  >
                    {row.s20_field}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s21_status ? "grey" : "black" }}
                  >
                    {row.s21}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s21_status ? "grey" : "black" }}
                  >
                    {row.s21_field}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s22_status ? "grey" : "black" }}
                  >
                    {row.s22}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s22_status ? "grey" : "black" }}
                  >
                    {row.s22_field}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s23_status ? "grey" : "black" }}
                  >
                    {row.s23}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s23_status ? "grey" : "black" }}
                  >
                    {row.s23_field}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s24_status ? "grey" : "black" }}
                  >
                    {row.s24}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s24_status ? "grey" : "black" }}
                  >
                    {row.s24_field}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s25_status ? "grey" : "black" }}
                  >
                    {row.s25}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s25_status ? "grey" : "black" }}
                  >
                    {row.s25_field}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s26_status ? "grey" : "black" }}
                  >
                    {row.s26}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s26_status ? "grey" : "black" }}
                  >
                    {row.s26_field}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s27_status ? "grey" : "black" }}
                  >
                    {row.s27}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s27_status ? "grey" : "black" }}
                  >
                    {row.s27_field}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s28_status ? "grey" : "black" }}
                  >
                    {row.s28}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s28_status ? "grey" : "black" }}
                  >
                    {row.s28_field}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s29_status ? "grey" : "black" }}
                  >
                    {row.s29}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s29_status ? "grey" : "black" }}
                  >
                    {row.s29_field}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s30_status ? "grey" : "black" }}
                  >
                    {row.s30}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s30_status ? "grey" : "black" }}
                  >
                    {row.s30_field}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s31_status ? "grey" : "black" }}
                  >
                    {row.s31}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s31_status ? "grey" : "black" }}
                  >
                    {row.s31_field}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s32_status ? "grey" : "black" }}
                  >
                    {row.s32}
                  </TableCell>
                  <TableCell
                    style={{ color: row.s32_status ? "grey" : "black" }}
                  >
                    {row.s32_field}
                  </TableCell>

                  {/* <TableCell>{row.omegaid}</TableCell> */}
                  {/* <TableCell>{row.techname}</TableCell> */}
                  {/* <TableCell>{row.techmob}</TableCell> */}
                  {/* <TableCell>{row.email}</TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid
        container
        justifyContent="flex-end"
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
