import React, { useEffect, useState } from "react";
import Clock from "react-live-clock";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Home = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    let userSessionId = cookies.get("session", { path: "/" });
    if (userSessionId === null || userSessionId === undefined)
      navigate("/login");
      else return
  }, []);

  const handleSignOut = () => {
    cookies.remove("session", { path: "/" });
    navigate("/login");
  };
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h5" component="div" gutterBottom>
        Live time in Iran, Tehran is :
      </Typography>
      <Clock
        style={{ fontSize: "5em" }}
        format={"HH:mm:ss"}
        ticking={true}
        timezone={"Asia/Tehran"}
      />
      <Button
        style={{ marginTop: "48px" }}
        variant="contained"
        color="secondary"
        onClick={handleSignOut}
      >
        sign out
      </Button>
    </Box>
  );
};

export default Home;
