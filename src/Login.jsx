import { useState } from "react";
import { TextField, Button, Typography, Container, Box, Link, Paper } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("https://stockpilot-backend-pwna.onrender.com/api/v1/users/login", form,{ withCredentials: true });
      // console.log(res.data);
      // console.log(res.data.data.accessToken);

      if (res.data.success !== 200 || !res.data.data.accessToken) {
        setError(res.data.message || "Invalid credentials, Please try again.");
        return;
      }
      // console.log("Login success:", res.data);
      localStorage.setItem("token", res.data.data.accessToken);
      navigate("/summary");
    } catch (err) {
      setError(err.response?.data?.data?.message || "Login failed");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={4} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
          Welcome Back
        </Typography>

        {error && <Typography color="error" align="center">{error},Please try again</Typography>}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="username" name="username" type="username" value={form.username} onChange={handleChange} required />
          <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} required />

          <Button type="submit" variant="contained" color="success" size="large" sx={{ mt: 2 }}>
            Login
          </Button>
          <Typography align="center" sx={{ mt: 1 }}>
            <Link href="/forget" underline="hover">
              Forget password
            </Link>
          </Typography>

          <Typography align="center" sx={{ mt: 1 }}>
            Don’t have an account?{" "}
            <Link href="/signup" underline="hover">
              Sign up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
