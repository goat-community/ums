import React from "react";

import { CircularProgress, Typography } from "@mui/material";

import logo from "@images/logo.png";

import "./splash.scss";

export default function Splash() {
  return (
    <section className="splash-background">
      <div className="logo-container">
        <img src={logo} alt="logo" width="68" height="74" />
      </div>
      <Typography variant="h1">Where to be?</Typography>
      <CircularProgress />
    </section>
  );
}
