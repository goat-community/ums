import React, { useEffect } from "react";
import { MapContainer } from "@containers/map/map-container";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { get_pois_aois } from "@context/pois";

import { IsochroneModifier } from "./isochrone-modifier";

export function MapLayer() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.network.loading);
  const travel_time_surface = useAppSelector(
    (state) => state.isochrones.travel_time_surface
  );

  useEffect(() => {
    //fetch pois at app startup
    dispatch(get_pois_aois());
  }, []);

  return (
    <>
      <MapContainer />
      {travel_time_surface && !loading && <IsochroneModifier />}
    </>
  );
}
