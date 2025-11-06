
import axios from "axios";
import { useState,useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {watchlist} from "../data/data";

function Holdings() {

let [allHoldings,setAllHoldings]=useState([]);

useEffect(() => {
  axios.get("https://stockpilot-backend-615k.onrender.com/api/v1/users/holdingData",{withCredentials:true})
    .then((res) => { 
      setAllHoldings(res.data.holding);
    })
    .catch((err) => console.error("Error fetching holdings:", err));
}, []);


let holdings=allHoldings;
const currData=watchlist;



  const columns = [
    { id: "Instrument", label: "Instrument" },
    { id: "Qty", label: "Qty" },
    { id: "Avg_Cost", label: "Avg Cost", align: "right" },
    { id: "LTP", label: "LTP", align: "right" },
    { id: "Cur_val", label: "Cur. Value", align: "right" },
    { id: "PL", label: "P&L", align: "right" },
    { id: "Net_chg", label: "Net Change", align: "right" },
    { id: "Day_chg", label: "Day Change", align: "right" },
  ];

  function createData(e) {
    const curVal = currData.find(s => s.name === e.name)?.price;
    const daychange=currData.find(s => s.name === e.name)?.percent;
    const pl = (curVal*e.qty) - (e.qty * e.avg);
    return {
      Instrument: e.name,
      Qty: e.qty,
      Avg_Cost: e.avg.toFixed(2),
      LTP: e.price.toFixed(2),
      Cur_val: curVal.toFixed(2),
      PL: pl.toFixed(2),
      Net_chg: `${(((curVal/e.avg)-1)*100).toFixed(2)}%`,
      Day_chg: daychange,
    };
  }

  const rows = holdings.map((e) => createData(e));
  
  /// to work on 
  function totalCurrentValue(){
    const stockname = holdings.map(e => ({ name: e.name, qty: e.qty }));

    const priceList = stockname.map(({ name, qty }) => ({name,qty,price: currData.find(stock => stock.name === name)?.price || 0}));

    const totalcurrent = priceList.reduce((sum, { price, qty }) => sum + (price * qty), 0);

    return(totalcurrent);
  }

  


  return (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>

        
      <Box sx={{ height: "6rem", display: "flex", alignItems: "center" }}>
        <Typography variant="h5">Holdings ({holdings.length})</Typography>
      </Box>
       <Box sx={{ display: "flex", justifyContent: "space-around", mt: 4 ,textAlign:"center"}}>
            <Box >
            <Typography variant="h4">
                <CurrencyRupeeIcon/>{holdings.reduce((sum, e) => sum + e.qty * e.avg, 0).toFixed(2)}
            </Typography>
            <Typography variant="h6">Total Investment</Typography>
            </Box>
            <Box>
            <Typography variant="h4">
                <CurrencyRupeeIcon/>{totalCurrentValue().toFixed(2)}
            </Typography>
            <Typography variant="h6">Current Value</Typography>
            </Box>
            <Box>
            <Typography variant="h4" sx={{ color: totalCurrentValue()-(holdings.reduce((sum, e) => sum +  (e.qty * e.avg), 0)) >= 0 ? "green" : "red" }}>
                <CurrencyRupeeIcon/>{(totalCurrentValue()-(holdings.reduce((sum, e) => sum +  (e.qty * e.avg), 0))).toFixed(2)}
            </Typography>
            <Typography variant="h6">P&L</Typography>
            </Box>
        </Box>


      <Paper sx={{ width: "100%", mt: 6 ,zIndex:0}}>
        <TableContainer sx={{maxHeight:"80vh", overflow: "auto",}}>
          <Table stickyHeader aria-label="holdings table">
            <TableHead >
              <TableRow sx={{position:"sticky"}}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    <b>{column.label}</b>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody >
              {rows.map((row) => (
                <TableRow key={row.Instrument}>
                  {columns.map((column) => {
                    let value = row[column.id];
                    let color = "inherit";

                    if (["PL", "Net_chg", "Day_chg"].includes(column.id)) {
                      if (parseFloat(value) > 0 ){color = "green"} 
                      else if (parseFloat(value) < 0)  {color = "red"};
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

export default Holdings;
