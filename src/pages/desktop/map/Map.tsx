import React from "react";

import { SideBarLayout } from "@layouts/desktop";

import FakeMap from "@images/fakemapdesktop.png";

import { DrawerContent } from "./components/drawer-content";
import { Header } from "./components/header";

export default function Map() {
  return (
    <SideBarLayout drawer_content={<DrawerContent />}>
      <Header />
      <img
        src={FakeMap}
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100vw",
          position: "fixed",
          zIndex: -1,
        }}
        alt="fakemap"
        draggable={false}
      />
    </SideBarLayout>
  );
}
