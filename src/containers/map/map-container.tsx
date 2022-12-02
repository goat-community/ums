import React, { useCallback } from "react";
import { type LngLat } from "react-map-gl";
import { useSelector } from "react-redux";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { get_point_isochrone } from "@context/isochrones";
import { isochrones_selector } from "@context/isochrones/isochrones-selector";
import { coords_to_address, setPickedPoint } from "@context/map";
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

  /* Container Methods */
  const on_click_point = useCallback((latlng: LngLat) => {
    dispatch(setPickedPoint(latlng));
    dispatch(get_point_isochrone(latlng));
    dispatch(coords_to_address(latlng));
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
