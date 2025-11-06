import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useState, useEffect } from "react";


export default function Orders() {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    axios
      .get("https://stockpilot-backend-615k.onrender.com/api/v1/users/holdingData",{withCredentials:true})
      .then((res) => setAllOrders(res.data.order))
      .catch((err) => console.error("Error fetching positions:", err));
  }, []);


  function createData(data) {
    const dateObj = data.date ? new Date(data.date) : null;
    return {
      Name:data.orderName,
      Qty:data.qty,
      type:data.mode.toUpperCase(),
      price:data.price.toLocaleString("en-IN"),
      Date: dateObj ? dateObj.toLocaleDateString("en-IN") : "-", 
      Time: dateObj ? dateObj.toLocaleTimeString("en-IN") : "-" ,
      _rawDate: dateObj,
    };
  }

  const orders = allOrders.map((p) => createData(p));
orders.sort((a, b) => (b._rawDate || 0) - (a._rawDate || 0));

  const columns = [
    { id: "Date", label: "Date" },
    { id: "Time", label: "Time" },
    { id: "Name", label: "Name" },
    { id: "Qty", label: "Qty", align: "right" },
    { id: "type", label: "Type", align: "right" },
    { id: "price", label: "Price/Qty", align: "right" },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      <Box sx={{ height: "4rem", display: "flex", alignItems: "center" }}>
        <Typography variant="h5">Orders ({orders.length})</Typography>
      </Box>

      <Paper sx={{ width: "100%", mt: 6, zIndex: 0 }}>
        <TableContainer sx={{ maxHeight: "80vh", overflow: "auto" }}>
          <Table stickyHeader aria-label="positions table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    <b>{column.label}</b>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {orders.map((row,idx) => (
                <TableRow key={idx}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    let color = "inherit";
                    if (column.id === "type") {
                    if (value === "BUY") color = "green";
                    else if (value === "SELL") color = "red";
                    }


                    return (
                      <TableCell key={column.id} align={column.align} sx={{ color }}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
