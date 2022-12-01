import React from "react";
import { MapContainer } from "@containers/map/map-container";

import { useAppSelector } from "@hooks/context";

import { FlowerModifier } from "./flower-modifier";

export function MapLayer() {
  const loading = useAppSelector((state) => state.network.loading);
  const travel_time_surface = useAppSelector(
    (state) => state.isochrones.travel_time_surface
  );

  return (
    <>
      <MapContainer />
      {travel_time_surface && !loading && <FlowerModifier />}
    </>
  );
}
