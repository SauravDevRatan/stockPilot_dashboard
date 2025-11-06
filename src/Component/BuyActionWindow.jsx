 import {
  Box,
  Button,
  Typography,
  TextField,
  Stack,
  IconButton,
  CircularProgress,
  InputAdornment,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useState, useEffect } from "react";
import axios from "axios";

function ActionWindow({ name, price, type, toggler }) {
  const [count, setCount] = useState(1);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://stockpilot-backend-pwna.onrender.com/api/v1/users/me", { withCredentials: true })
      .then((res) => {
        if (res.data?.data.balance !== undefined) setBalance(res.data.data.balance);
      })
      .catch((err) => console.error("Error fetching user balance:", err));
  }, []);

  const setter = (e) => {
    const val = Number(e.target.value);
    setCount(val < 1 ? 1 : val);
  };

  const tradeStock = async () => {
    try {
      setLoading(true);
      setMsg("");

      const res = await axios.post(
        "https://stockpilot-backend-pwna.onrender.com/api/v1/users/trade",
        { name, qty: count, price, mode: type },
        { withCredentials: true }
      );

      setMsg(res.data.data.message || "Transaction successful ");
      if (res.data?.data?.user?.balance !== undefined)
        setBalance(res.data.data.user.balance);

      setTimeout(() => toggler(), 1200);
      navigate("/summary");
    } catch (err) {
      console.error("Error trading stock:", err);
      setMsg(err.response?.data?.data?.message || "Transaction failed ");
    } finally {
      setLoading(false);
    }
  };

 
  const numericPrice = Number(price) || 0;
  const totalCost = count * numericPrice;
  const isBuy = type === "buy";
  const disabled = count < 1 || (isBuy && totalCost > balance);

  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        p: 4,
        borderRadius: 3,
        width: 350,
        bgcolor: isBuy ? "#e9f9f0" : "#fde8e8",
        boxShadow: 6,
        zIndex: 2000,
        border: "1px solid #dcdcdc",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={toggler} size="small">
          <HighlightOffIcon />
        </IconButton>
      </Box>

      <Typography
        variant="h6"
        textAlign="center"
        fontWeight="bold"
        color={isBuy ? "success.main" : "error.main"}
        mb={1}
      >
        {isBuy ? "Buy Stock" : "Sell Stock"}
      </Typography>

      <Typography variant="subtitle1" textAlign="center" mb={2}>
        {name ? (
          <>
            {name} @ ₹{numericPrice.toLocaleString("en-IN")}
          </>
        ) : (
          "Loading stock info..."
        )}
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Typography variant="body2" color="text.secondary" mb={1}>
        Available Balance: ₹{balance?.toLocaleString("en-IN") || 0}
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Quantity"
          type="number"
          size="small"
          fullWidth
          value={count}
          onChange={setter}
          inputProps={{ min: 1 }}
        />

        <TextField
          label="Total"
          size="small"
          fullWidth
          value={Number.isFinite(totalCost) ? totalCost.toLocaleString("en-IN") : "0"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CurrencyRupeeIcon fontSize="small" />
              </InputAdornment>
            ),
            readOnly: true,
          }}
        />
      </Stack>

      <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
        <Button
          variant="contained"
          color={isBuy ? "success" : "error"}
          size="medium"
          onClick={tradeStock}
          disabled={disabled || loading}
          sx={{ px: 4, borderRadius: 2 }}
        >
          {loading ? (
            <CircularProgress size={22} color="inherit" />
          ) : isBuy ? (
            "Buy"
          ) : (
            "Sell"
          )}
        </Button>
      </Stack>

      {msg && (
        <Typography
          variant="body2"
          textAlign="center"
          color={msg.includes("failed") ? "error.main" : "success.main"}
          mt={2}
        >
          {msg}
        </Typography>
      )}
    </Box>
  );
}

export default ActionWindow;
