import React from "react";
import FakeMap from "@images/fakemapdesktop.png";
import { SideBarLayout } from "@layouts/desktop";

export default function Map() {
  return (
    <SideBarLayout>
      <img
        src={FakeMap}
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100vw",
          position: "fixed",
        }}
        alt="fakemap"
        draggable={false}
      />
    </SideBarLayout>
  );
}
