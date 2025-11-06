import { useState,useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import Avatar from "@mui/material/Avatar";
import ProfileDropdown from "./ProfileDropdown";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);



  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/users/me", 
          { withCredentials: true } 
        );
        
        setUser(res.data.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        // If JWT invalid or expired → redirect to login
        navigate("/login");
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading user info...</div>;
  }






  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mx: 1 }}>
        {/* Left icon */}
        <Box sx={{ display: "flex", alignItems: "center", px: 2 }}>
          <QueryStatsIcon sx={{color:"green"}}/>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 4,  }}>
          {[
            { label: "Dashboard", path: "/summary" },
            { label: "Orders", path: "/orders" },
            { label: "Holdings", path: "/holdings" },
            { label: "Funds", path: "/funds" },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.path}
              style={{ textDecoration: "none" }}
              onClick={() => handleMenuClick(index)}
            >
              <Typography
                sx={{
                  color: selectedMenu === index ? "red" : "black",
                  "&:hover": { color: "red" },
                }}
              >
                {item.label}
              </Typography>
            </Link>
          ))}

          {/* Profile */}
          <Box
            onClick={handleProfileClick}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              py: 1,
              px: 2,
              position: "relative",
              cursor: "pointer",
            }}
          >
            <Avatar alt="user" src={user?user.avatar:""} sx={{ width: 24, height: 24 }} />
            <Typography sx={{color:"blue"}}>Hi, {user?user.username.toUpperCase():""} !</Typography>

            {isProfileDropdownOpen && (
              <Box
                sx={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  mt: 1,
                  zIndex: 10,
                  boxShadow: 3,
                  borderRadius: 1,
                }}
              >
                <ProfileDropdown username={user?user.username:""} email={user?user.email:""} />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Menu;
