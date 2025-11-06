import { useState } from "react";
import {TextField,Button,Typography,Container,Box,Link,Paper,} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({fullName: "",email: "",username: "",password: "",dob: "",});
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle file input
  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Create FormData object for file + fields
      const formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("email", form.email);
      formData.append("username", form.username);
      formData.append("password", form.password);
      formData.append("dob", form.dob);
      if (avatar) formData.append("avatar", avatar); // 🖼 add file if selected

      const res = await axios.post(
        "https://stockpilot-backend-pwna.onrender.com/api/v1/users/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success === false ) {
        setError(res.data.message || "Signup failed, try again.");
        return;
      }

      console.log("Signup success:", res.data);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={4} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
          Create Account
        </Typography>

        {error && <Typography color="error" align="center">{error}</Typography>}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} required />
          <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
          <TextField label="Username" name="username" value={form.username} onChange={handleChange} required />
          <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} required />
          <TextField label="Date of Birth" name="dob" type="date" value={form.dob} onChange={handleChange} InputLabelProps={{ shrink: true }} required />

          {/* File Upload Field */}
          <Button variant="outlined" component="label">
            Upload Avatar
            <input hidden accept="image/*" type="file" onChange={handleFileChange} />
          </Button>
          {avatar && (
            <Typography variant="body2" color="text.secondary">
              Selected: {avatar.name}
            </Typography>
          )}

          <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
            Sign Up
          </Button>

          <Typography align="center" sx={{ mt: 1 }}>
            Already have an account?{" "}
            <Link href="/login" underline="hover">
              Log in
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
