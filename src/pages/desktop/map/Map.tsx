import { useState } from "react";
import { MapProvider } from "react-map-gl";
import { MapContainer } from "@containers/map/map-container";

import DrawerContent from "./components/drawer-content";
import { FloatingActions } from "./components/floating-actions";
import { Onboarding } from "./components/on-boarding";
import { ProfileButton } from "./components/profile-button";

export default function Map() {
  const [force_visibility, set_force_visibility] = useState<boolean>(false);

  return (
    <>
      <Onboarding
        force_open={force_visibility}
        close_onboarding_force={() => set_force_visibility(false)}
      />
      <MapProvider>
        <DrawerContent />
        <ProfileButton />
        <FloatingActions open_onboarding_force={() => set_force_visibility(true)} />
        <MapContainer />
      </MapProvider>
    </>
  );
}
