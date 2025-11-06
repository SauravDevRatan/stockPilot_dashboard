import { useState } from "react";
import {TextField,Button,Typography,Container,Box,Link,Paper,IconButton,InputAdornment,} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [form, setForm] = useState({fullName: "",email: "",dob: "",newPassword: "",confirmPassword: ""});
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState({new: false,confirm: false,});

  const navigate = useNavigate();

  const handleTogglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(
        "https://stockpilot-backend-615k.onrender.com/api/v1/users/verifyUser",
        form,
        { withCredentials: true }
      );

      if (res.data.success === 200) {
        setMessage("Verification successful! Redirecting to reset password...");
        setTimeout(() => navigate("/reset-password"), 2000);
      } else {
        setError(res.data.message || "Verification failed. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={4} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
          Verify Your Account
        </Typography>

        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
        {message && (
          <Typography sx={{ color: "green", textAlign: "center" }}>
            {message}
          </Typography>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Date of Birth"
            name="dob"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.dob}
            onChange={handleChange}
            required
          />

          <TextField
            label="New Password"
            name="newPassword"
            type={showPassword.new ? "text" : "password"}
            value={form.newPassword}
            onChange={handleChange}
            required
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" size="small">
                  <IconButton
                    onClick={() => handleTogglePassword("new")}
                    edge="end"
                  >
                    {showPassword.new ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type={showPassword.confirm ? "text" : "password"}
            value={form.confirmPassword}
            onChange={handleChange}
            required
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleTogglePassword("confirm")}
                    edge="end"
                  >
                    {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2 }}
          >
            Update password
          </Button>

          <Typography align="center" sx={{ mt: 1 }}>
            <Link href="/login" underline="hover">
              Back to Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
