import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        bgcolor: "#f9fafb",
        color: "#333",
        p: 3,
      }}
    >
      <Typography variant="h1" sx={{ fontSize: { xs: "4rem", md: "6rem" }, fontWeight: 700 }}>
        404
      </Typography>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Oops! Page Not Found 😕
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, maxWidth: 400 }}>
        The page you’re looking for doesn’t exist or has been moved.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        sx={{ borderRadius: 2, px: 4 }}
      >
        Go Back Home
      </Button>
    </Box>
  );
}

export default NotFound;
