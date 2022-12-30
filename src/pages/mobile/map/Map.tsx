import { BottomBarLayout } from "@layouts/mobile";

import { FlowerButton } from "./components/floating-flower";
import { FloatingIsochroneButton } from "./components/floating-isochrone";
import { MapHeader } from "./components/header";
import { MapLayer } from "./components/map-layer";
import { Onboarding } from "./components/on-boarding";

export default function Map() {
  return (
    <>
      <Onboarding />
      <BottomBarLayout>
        <MapHeader />
        <FloatingIsochroneButton />
        <FlowerButton />
        <MapLayer />
      </BottomBarLayout>
    </>
  );
}
