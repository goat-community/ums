import React from "react";
import { MapProvider } from "react-map-gl";
import { MapContainer } from "@containers/map/map-container";

import { SideBarLayout } from "@layouts/desktop";

import { DrawerContent } from "./components/drawer-content";

export default function Map() {
  return (
    <MapProvider>
      <SideBarLayout drawer_content={<DrawerContent />}>
        <div></div>
      </SideBarLayout>
      <MapContainer />
    </MapProvider>
  );
}
