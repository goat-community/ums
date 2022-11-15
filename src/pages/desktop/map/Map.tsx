import React from "react";
import FakeMap from "@images/fakemapdesktop.png";
import { SideBarLayout } from "@layouts/desktop";

export default function Map() {
  return (
    <SideBarLayout>
      <img src={FakeMap} width="100%" height="100%" alt="fakemap" draggable={false} />
    </SideBarLayout>
  );
}
