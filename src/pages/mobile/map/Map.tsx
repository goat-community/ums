import React from "react";
import { BottomBarLayout } from "@layouts/mobile";
import Container from "@mui/material/Container";

import { Header } from "./components/header";
import { MapLayer } from "./components/maplayer";

export default function Map() {
  return (
    <BottomBarLayout>
      <MapLayer />
      <Container sx={{ position: "fixed", top: 20 }}>
        <Header />
      </Container>
    </BottomBarLayout>
  );
}
