import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

import axios from "axios";
import { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Tooltip } from "@mui/material";


const Funds = () => {
  const [holdings, setHoldings] = useState([]);
  const[totalFunds,setTotalFunds]=useState(0);
  
  // Fetch holdings
  useEffect(() => {
    axios.get("https://stockpilot-backend-615k.onrender.com/api/v1/users/holdingData",{withCredentials:true})
      .then((res) => {setHoldings(res.data?.holding),setTotalFunds(res.data?.balance)})
      .catch((err) => console.error("Error fetching holdings:", err));
  }, []);

  // Calculate used margin
  const usedMargin = holdings.reduce((sum, e) => sum + e.qty * e.avg, 0).toFixed(2);
  const avalableMargin = holdings.reduce((sum, e) => sum + e.qty * e.price, 0).toFixed(2);

  // Prepare rows
  const rows = [
    { data: "Available margin", amount: totalFunds-(avalableMargin-usedMargin) },
    { data: "Used margin", amount: (usedMargin*1) },
    { data: "Available cash", amount: totalFunds-usedMargin },
    { data: "Opening Balance", amount: totalFunds },
    { data: "Profit", amount: (avalableMargin > usedMargin) ? (avalableMargin - usedMargin) : 0},
    { data: "Loss", amount: (avalableMargin < usedMargin) ? (usedMargin-avalableMargin) : 0 },
    { data: "Delivery margin", amount: 0 },
    { data: "Collateral (Liquid funds)", amount: 0 },
    { data: "Options premium", amount: 0 },
    { data: "Exposure", amount: 0 },
    { data: "Collateral (Equity)", amount: 0 },
    { data: "Total Collateral", amount: 0 },
  ];

 

  return (
    <>
      <Box sx={{ display:"flex", pt:2, justifyContent:"end", gap:5, alignItems:"center" }}>
        <Typography sx={{ color:"text.secondary" }}>Instant, zero-cost fund transfers with UPI</Typography>
        <Tooltip title="Add Money" arrow>
        <Button  sx={{ backgroundColor:"#74eb50ff",color:"black" }} disabled>
          <Link  style={{ textDecoration:"none", color:"inherit" }}>Add funds</Link>
        </Button>
        </Tooltip>
        <Tooltip title="Withdraw Money" arrow>
        <Button sx={{ backgroundColor:"#5098ebff",color:"black" }} disabled> 
          <Link style={{ textDecoration:"none", color:"inherit" }}>Withdraw</Link>
        </Button>
        </Tooltip>
      </Box>

      <Box sx={{ display:"flex", pt:4, justifyContent:"center", gap:5, alignItems:"center", flexDirection:"column" }}>
        <Typography variant="h5" sx={{ display:"flex", pt:2, alignItems:"center" }}>
          <PieChartOutlineIcon /> &nbsp;Equity
        </Typography>
        <TableContainer component={Paper} sx={{ width:"40%" }} >
          <Table>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.data}>
                  <TableCell component="th" scope="row">{row.data}</TableCell>
                  <TableCell align="right"><CurrencyRupeeIcon fontSize="small"/>{(row.amount).toLocaleString("en-IN")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Funds;
