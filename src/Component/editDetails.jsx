import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Snackbar,
  Alert,
  Avatar,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const [user, setUser] = useState({ fullName: "", email: "", avatar: "" });
  const [newAvatar, setNewAvatar] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch current user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/users/me", {
          withCredentials: true,
        });
        setUser({
          fullName: res.data.data.fullName || "",
          email: res.data.data.email || "",
          avatar: res.data.data.avatar || "",
        });
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  // Handle text field changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle avatar selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewAvatar(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  // Submit form (fullName, email, and avatar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("fullName", user.fullName);
      formData.append("email", user.email);
      if (newAvatar) formData.append("avatar", newAvatar);

      const res = await axios.put(
        "http://localhost:8080/api/v1/users/updateDetails",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessage(res.data.message || "Profile updated successfully!");
      setUser({
        fullName: res.data.data.user.fullName,
        email: res.data.data.user.email,
        avatar: res.data.data.user.avatar,
      });
      setPreview("");
      setNewAvatar(null);
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Update failed");
      setMessage("");
    } finally {
      setLoading(false);
      setOpen(true);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          borderRadius: 4,
          width: "100%",
          maxWidth: 450,
          textAlign: "center",
          background: "rgba(255,255,255,0.95)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "#1976d2", mb: 3 }}
        >
          Edit Profile
        </Typography>

        {/* Profile Picture */}
        <Box sx={{ mb: 3 }}>
          <Avatar
            src={preview || user.avatar}
            alt="Profile"
            sx={{
              width: 100,
              height: 100,
              margin: "auto",
              mb: 2,
              border: "3px solid #1976d2",
            }}
          />
          <Button
            variant="outlined"
            component="label"
            sx={{
              color: "#1976d2",
              borderColor: "#1976d2",
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Choose New Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
        </Box>

        {/* Edit Info Form */}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
            variant="outlined"
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            variant="outlined"
            sx={{ mb: 4 }}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{
              background:
                "linear-gradient(135deg, #1976d2 0%, #2196f3 50%, #42a5f5 100%)",
              color: "white",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                background:
                  "linear-gradient(135deg, #1565c0 0%, #1976d2 50%, #1e88e5 100%)",
              },
            }}
            type="submit"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
          </Button>
        </form>
      </Paper>

      {/* Snackbar Notifications */}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {message ? (
          <Alert severity="success" sx={{ width: "100%" }}>
            {message}
          </Alert>
        ) : (
          <Alert severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        )}
      </Snackbar>
    </Box>
  );
}

export default EditProfile;
