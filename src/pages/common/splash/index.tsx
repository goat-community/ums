import { CircularProgress } from "@mui/material";

import { Margin } from "@components/common";

import logo from "@images/m4c.png";

import "./splash.scss";

export default function Splash() {
  return (
    <section className="splash-background">
      <img src={logo} alt="logo" width="200" height="auto" />
      <Margin margin="20px 0" />
      <CircularProgress variant="indeterminate" disableShrink size={30} />
    </section>
  );
}
