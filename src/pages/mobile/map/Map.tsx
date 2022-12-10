import React from "react";

import { BottomBarLayout } from "@layouts/mobile";

// import { FloatingFlowerButton } from "./components/floating-flower";
import { FloatingIsochroneButton } from "./components/floating-isochrone";
import { MapHeader } from "./components/header";
import { MapLayer } from "./components/map-layer";

export default function Map() {
  return (
    <BottomBarLayout>
      <MapHeader />
      <FloatingIsochroneButton />
      {/* <FloatingFlowerButton /> */}
      <MapLayer />
    </BottomBarLayout>
  );
}
