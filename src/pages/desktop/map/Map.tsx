import { MapProvider } from "react-map-gl";
import { MapContainer } from "@containers/map/map-container";

import DrawerContent from "./components/drawer-content";
import { FloatingActions } from "./components/floating-actions";
import { Onboarding } from "./components/on-boarding";
import { ProfileButton } from "./components/profile-button";

export default function Map() {
  return (
    <>
      <Onboarding />
      <MapProvider>
        <DrawerContent />
        <ProfileButton />
        <FloatingActions />
        <MapContainer />
      </MapProvider>
    </>
  );
}
