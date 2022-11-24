import React from "react";
// import { MapLayer } from "./components/map-layer";
import { MapContainer } from "@containers/map/map-container";

import Container from "@mui/material/Container";

import { BottomBarLayout } from "@layouts/mobile";

import { FloatingFlower } from "./components/floating-flower";
import { Header } from "./components/header";

export default function Map() {
  return (
    <BottomBarLayout>
      <Container sx={{ position: "fixed", top: 20 }}>
        <Header />
        <FloatingFlower />
      </Container>
      <MapContainer />
    </BottomBarLayout>
  );
}
