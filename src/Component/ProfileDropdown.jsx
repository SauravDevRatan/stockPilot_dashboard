import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function ProfileDropdown({ username, email }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post("https://stockpilot-backend-615k.onrender.com/api/v1/users/logout",{},{withCredentials: true,});
      console.log(res.data);

      // localStorage.removeItem("token");

      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <Box sx={{p: 2,width: 180,backgroundColor: "white",borderRadius: 1,boxShadow: 3,zIndex: 1200,}}>
      {/* User Info */}
      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle1" fontWeight={600} sx={{ color: "green" }}>
          {username?.toUpperCase()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {email}
        </Typography>
      </Box>

      <Divider sx={{ my: 1 }} />

      {/* Profile Section */}
      <Typography variant="body2" sx={{ cursor: "pointer", my: 1 }}>
        <Link to="/profile" style={{textDecoration:"none"}}>My Profile</Link>
      </Typography>

      <Divider sx={{ my: 1 }} />

      {/* Links */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Typography variant="body2" sx={{ cursor: "pointer" }}>Console</Typography>
        <Typography variant="body2" sx={{ cursor: "pointer" }}>Coin</Typography>
        <Typography variant="body2" sx={{ cursor: "pointer" }}>Support</Typography>
        <Typography variant="body2" sx={{ cursor: "pointer" }}>Invite friend</Typography>
      </Box>

      <Divider sx={{ my: 1 }} />

      {/* Footer */}
      <Box>
        <Typography variant="body2" sx={{ cursor: "pointer", mb: 1 }}>Tour Kite</Typography>
        <Typography variant="body2" sx={{ cursor: "pointer", mb: 2 }}>User Manual</Typography>

        <Button fullWidth variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
}

export default ProfileDropdown;
