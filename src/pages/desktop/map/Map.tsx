import React from "react";
import { MapProvider } from "react-map-gl";
import { MapContainer } from "@containers/map/map-container";

import { useAppSelector } from "@hooks/context";

import { Drawer } from "@components/desktop";

import { FloatingActions } from "./components/floating-actions";
import { Header } from "./components/header";
import { IsochroneModifier } from "./components/isochrone-modifier";
import { ProfileButton } from "./components/profile-button";

export default function Map() {
  const loading = useAppSelector((state) => state.network.loading);
  const travel_time_surface = useAppSelector(
    (state) => state.isochrones.travel_time_surface
  );

  const drawer_is_open = travel_time_surface && !loading;

  return (
    <MapProvider>
      {drawer_is_open ? (
        <Drawer open={travel_time_surface}>
          <Header position="static" />
          <IsochroneModifier />
        </Drawer>
      ) : (
        <Header />
      )}
      <ProfileButton />
      <FloatingActions />
      <MapContainer />
    </MapProvider>
  );
}
