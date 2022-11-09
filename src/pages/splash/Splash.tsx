import React from "react";
import logo from "@images/logo.png";
import { Typography } from "@mui/material";

import "./splash.scss";

export function Splash() {
  return (
    <section className="splash-background">
      <div className="logo-container">
        <img src={logo} alt="logo" width="68" height="74" />
      </div>
      <Typography variant="h1">Where to be?</Typography>
    </section>
  );
}
