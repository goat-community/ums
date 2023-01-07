import { useState } from "react";

import { BottomBarLayout } from "@layouts/mobile";

import { FlowerButton } from "./components/floating-flower";
import { FloatingIsochroneButton } from "./components/floating-isochrone";
import { MapHeader } from "./components/header";
import { MapLayer } from "./components/map-layer";
import { Onboarding } from "./components/on-boarding";

export default function Map() {
  const [force_visibility, set_force_visibility] = useState<boolean>(false);

  return (
    <>
      <Onboarding
        force_open={force_visibility}
        close_onboarding_force={() => set_force_visibility(false)}
      />
      <BottomBarLayout>
        <MapHeader open_onboarding_force={() => set_force_visibility(true)} />
        <FloatingIsochroneButton />
        <FlowerButton />
        <MapLayer />
      </BottomBarLayout>
    </>
  );
}
