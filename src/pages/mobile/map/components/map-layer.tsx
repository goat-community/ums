import React from "react";
import { MapContainer } from "@containers/map/map-container";

import { useAppSelector } from "@hooks/context";

import { FlowerModifier } from "./flower-modifier";

export function MapLayer() {
  const picked_point = useAppSelector((state) => state.map.picked_point);
  const loading = useAppSelector((state) => state.network.loading);

  return (
    <>
      <MapContainer />
      {picked_point && !loading && <FlowerModifier />}
    </>
  );
}
