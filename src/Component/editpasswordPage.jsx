import { useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function EditPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/users/changePassword",
        { oldPassword, newPassword1, newPassword2 },
        { withCredentials: true }
      );

      setMessage(res.data.message || "Password updated successfully");
      setTimeout(() => navigate("/profile"), 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 5,
          borderRadius: 4,
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          textAlign: "center",
          transition: "0.3s",
          "&:hover": { transform: "translateY(-5px)" },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: "bold",
            color: "#1976d2",
            textShadow: "0 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          Change Password
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Old Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            label="New Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={newPassword1}
            onChange={(e) => setNewPassword1(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Confirm New Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={newPassword2}
            onChange={(e) => setNewPassword2(e.target.value)}
            sx={{ mb: 3 }}
          />

          {error && (
            <Alert severity="error" sx={{ mb: 2, textAlign: "left" }}>
              {error}
            </Alert>
          )}
          {message && (
            <Alert severity="success" sx={{ mb: 2, textAlign: "left" }}>
              {message}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{
              py: 1.3,
              fontWeight: "bold",
              borderRadius: 2,
              textTransform: "none",
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={26} color="inherit" /> : "Update Password"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default EditPassword;



