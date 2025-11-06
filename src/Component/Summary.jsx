import {Box,Typography,Divider,Tooltip,} from "@mui/material";
import PieChartOutlineIcon from "@mui/icons-material/PieChartOutline";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SwapCallsIcon from "@mui/icons-material/SwapCalls";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useState, useEffect } from "react";
import axios from "axios";
import VerticalGraph from "./VerticalGraph.jsx";
import { DoughNut } from "./DoughNutGraph.jsx";
import {watchlist} from "../data/data";

function Summary() {
  const [user, setUser] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const analyticsClosure = () => setShowAnalytics((prev) => !prev);

let [allHoldings,setAllHoldings]=useState([]);

useEffect(() => {
  axios.get("http://localhost:8080/api/v1/users/holdingData",{withCredentials:true})
    .then((res) => { 
      setAllHoldings(res.data.holding);
      setUser(res.data)
    })
    .catch((err) => console.error("Error fetching holdings:", err));
}, []);


  if (!user) {
    return (
      <Typography sx={{ mt: 10, textAlign: "center" }}>
        Loading portfolio...
      </Typography>
    );
  }

  const holdings = allHoldings || [];
  const balance = user.balance || 0;
  const currData=watchlist;

  // Compute metrics
  const stockname = holdings.map(e => ({ name: e.name, qty: e.qty }));
  const priceList = stockname.map(({ name, qty }) => ({name,qty,price: currData.find(stock => stock.name === name)?.price || 0}));
  const investment = holdings.reduce((sum, e) => sum + (e.qty * e.avg), 0);
  const currentValue = priceList.reduce((sum, { price, qty }) => sum + (price * qty), 0);
  const pnl = currentValue - investment;
  const pnlPercent = investment ? (pnl / investment) * 100 : 0;

  // vertical Graph data
  const data = {
    labels: watchlist.map((e) => e.name),
    datasets: [
      {
        label: "Stock Value",
        data: watchlist.map((e) => e.price ),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      {/* Greeting */}
      <Box sx={{ height: "6rem", display: "flex", alignItems: "center" }}>
        <Typography variant="h4" sx={{color:"green"}}>Hi, {(user.username).toUpperCase() || "User"} </Typography>
      </Box>

      <Divider />

      {/* Analytics */}
      <Box>
        <Typography sx={{ display: "flex", alignItems: "start", mt: 5.5 }}>
          <PieChartOutlineIcon /> &nbsp;Analytics
        </Typography>
        <Tooltip arrow title="Analytics">
          <Box
            sx={{ my: 3, display: "flex", justifyContent: "center", cursor: "pointer" }}
            onClick={analyticsClosure}
          >
            {showAnalytics ? <KeyboardDoubleArrowUpIcon /> : <KeyboardDoubleArrowDownIcon />}
          </Box>
        </Tooltip>
        {showAnalytics && (
          <Box sx={{ my: 3 }}>
            <VerticalGraph data={data} />
          </Box>
        )}
      </Box>

      <Divider />

      {/* Equity Section */}
      <Box>
        <Typography sx={{ display: "flex", alignItems: "center", mt: 5.5 }}>
          <SwapCallsIcon /> &nbsp;Equity
        </Typography>
        <Box sx={{ mt: 3, display: "flex", gap: 15, my: 6 }}>
          <Box>
            <Typography variant="h3">
              ₹{balance.toLocaleString("en-IN")}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Margin available
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "start",
            }}
          >
            <Typography>
              Margins used :- <span>₹{investment.toLocaleString("en-IN")}</span>
            </Typography>
            <Typography>
              Opening balance :- <span>₹{(100000).toLocaleString("en-IN")}</span>
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* Holdings */}
      <Box>
        <Typography sx={{ display: "flex", alignItems: "center", mt: 5.5 }}>
          <BusinessCenterIcon /> &nbsp;Holdings ({holdings.length})
        </Typography>
        <Box sx={{ mt: 3, display: "flex", gap: 15, my: 6 }}>
          <Box>
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 3, color: pnl >= 0 ? "green" : "red" }}>
              <Typography variant="h3">
                ₹{pnl.toLocaleString("en-IN")}
              </Typography>
              <Typography>
                {pnl >= 0 ? "+" : ""}
                {pnlPercent.toFixed(2)}%
              </Typography>
            </Box>
            <Typography sx={{ color: "text.secondary" }}>P&L</Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "start",
            }}
          >
            <Typography>
              Current Value :- <span>₹{currentValue.toLocaleString("en-IN")}</span>
            </Typography>
            <Typography>
              Investment :- <span>₹{investment.toLocaleString("en-IN")}</span>
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* Graph */}
      <DoughNut  />
    </Box>
  );
}

export default Summary;
