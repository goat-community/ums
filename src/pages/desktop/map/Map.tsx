import React from "react";
import { MapProvider } from "react-map-gl";
import { MapContainer } from "@containers/map/map-container";

import { FloatingActions } from "./components/floating-actions";
import { Header } from "./components/header";

// import { SideBarLayout } from "@layouts/desktop";

// import { DrawerContent } from "./components/drawer-content";

export default function Map() {
  return (
    <MapProvider>
      <Header />
      <FloatingActions />
      <MapContainer />
    </MapProvider>
  );
}
