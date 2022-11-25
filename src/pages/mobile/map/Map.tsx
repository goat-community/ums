import React from "react";

// import { MapLayer } from "./components/map-layer";
// import { MapContainer } from "@containers/map/map-container";
import { BottomBarLayout } from "@layouts/mobile";

import { FloatingFlower } from "./components/floating-flower";
import { MapHeader } from "./components/header";
import { MapLayer } from "./components/map-layer";

export default function Map() {
  return (
    <BottomBarLayout>
      <MapHeader />
      <FloatingFlower />
      <MapLayer />
    </BottomBarLayout>
  );
}
