import { Box, Typography, Paper, Divider, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://stockpilot-backend-pwna.onrender.com/api/v1/users/me", {
          withCredentials: true,
        });
        setUser(res.data.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  if (!user) {
    return (
      <Typography
        sx={{
          textAlign: "center",
          mt: 15,
          fontWeight: "bold",
          color: "text.secondary",
          fontSize: "1.5rem",
        }}
      >
        Loading profile...
      </Typography>
    );
  }

  const formattedDOB = user.dob
    ? new Date(user.dob).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Not provided";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "",
        p: 3,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 5,
          borderRadius: "25px",
          width: "100%",
          maxWidth: 420,
          textAlign: "center",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(15px)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
          transition: "all 0.4s ease",
          "&:hover": {
            transform: "translateY(-10px)",
            boxShadow: "0 16px 35px rgba(0,0,0,0.25)",
          },
        }}
      >
        
        <Box
          sx={{
            mx: "auto",
            mb: 3,
            width: "10rem",
            height: "10rem",
            borderRadius: "50%",
            overflow: "hidden",
            border: "4px solid #7e57c2",
            boxShadow: "0 6px 18px rgba(126,87,194,0.4)",
          }}
        >
          <img
            src={user.avatar}
            alt="User Avatar"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* //name and username// */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#4527a0",
            mb: 0.5,
            letterSpacing: "0.5px",
          }}
        >
          {user.fullName?.toUpperCase()}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: "text.secondary",
            mb: 3,
            fontStyle: "italic",
          }}
        >
          @{user.username}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* email and dob */}
        <Typography variant="body1" sx={{ mb: 1.5 }}>
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          <strong>Date of Birth:</strong> {formattedDOB}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/*  Actions */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/editPassword"
            sx={{
              textTransform: "none",
              borderRadius: "20px",
              px: 3,
              py: 1,
              fontWeight: "bold",
            }}
          >
            <EditIcon/> Edit Password
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            component={Link}
            to="/editDetails"
            sx={{
              textTransform: "none",
              borderRadius: "20px",
              px: 3,
              py: 1,
              fontWeight: "bold",
            }}
          >
            <AutoStoriesIcon/> Edit Details
          </Button>
        </Box>
      </Paper>

      
    </Box>
  );
}

export default Profile;
