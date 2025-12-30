import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = ({ children, hasHiddenAuthButtons }) => {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem("username");
    localStorage.removeItem('balance');
    navigate('/')
    window.location.reload();
  }

  if (!hasHiddenAuthButtons && localStorage.getItem('token')) {
    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        <Box className="search search-desktop">{children}</Box>
        <Stack direction="row" spacing={2} className="center-name">
          <Avatar alt={localStorage.getItem('username')} src="avatar.png" />
          <p>{localStorage.getItem('username')}</p>
          <Button variant="text" onClick={logout}>
            Logout
          </Button>
        </Stack>
      </Box>
    )
  } else if (!hasHiddenAuthButtons) {
    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        <Box className="search search-desktop">{children}</Box>
        <Stack direction="row" spacing={1}>
          <Button
            variant="text"
            onClick={() => navigate("/login", { from: "HomePage" })}
          >
            Login
          </Button>
          <Button
            className="button header-register"
            variant="text"
            onClick={() => navigate("/register", { from: "HomePage" })}
          >
            Register
          </Button>
        </Stack>
      </Box>
    )
  } else return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        <Box className="search search-desktop">{children}</Box>
          <Button
            className="explore-button"
            startIcon={<ArrowBackIcon />}
            variant="text"
            onClick={() => navigate("/", { from: "HomePage" })}
          >
            Back to explore
          </Button>
      </Box>
    );
};

export default Header;