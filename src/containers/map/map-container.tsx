import React, { useCallback, useEffect } from "react";
import { type LngLat } from "react-map-gl";
import { useSelector } from "react-redux";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { get_point_isochrone } from "@context/isochrones";
import { isochrones_selector } from "@context/isochrones/isochrones-selector";
import {
  map_view_selector,
  picked_point_selector,
  view_bounds_selector,
} from "@context/map/map-selector";

import { MemoiezedMap } from "./components/map";

export function MapContainer() {
  const dispatch = useAppDispatch();
  const isochrone = useSelector(isochrones_selector);
  const map_view = useAppSelector(map_view_selector);
  const viewBounds = useAppSelector(view_bounds_selector);
  const picked_point = useAppSelector(picked_point_selector);
  const travel_time_surface = useAppSelector(
    (state) => state.isochrones.travel_time_surface
  );

  useEffect(() => {
    console.log(travel_time_surface);
  }, [travel_time_surface]);

  /* Container Methods */
  const on_click_point = useCallback((latlng: LngLat) => {
    dispatch(get_point_isochrone(latlng));
  }, []);

  return (
    <MemoiezedMap
      view={map_view}
      isochrone={isochrone}
      picked_point={picked_point}
      on_click_point={on_click_point}
      viewBounds={viewBounds}
    />
  );
}
