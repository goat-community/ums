import { useCallback, useEffect } from "react";
import { type LngLat } from "react-map-gl";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { get_point_isochrone } from "@context/isochrones";
import { map_view_selector, view_bounds_selector } from "@context/map/maps-selector";
import { get_pois_aois } from "@context/pois";

import { MemoiezedMap } from "./components/map";

export function MapContainer() {
  const dispatch = useAppDispatch();
  const map_view = useAppSelector(map_view_selector);
  const viewBounds = useAppSelector(view_bounds_selector);

  /* Container Methods */
  const on_click_point = useCallback((latlng: LngLat) => {
    dispatch(get_point_isochrone(latlng));
  }, []);
  useEffect(() => {
    //fetch pois at app startup
    dispatch(get_pois_aois());
  }, []);

  return (
    <MemoiezedMap
      view={map_view}
      on_click_point={on_click_point}
      viewBounds={viewBounds}
    />
  );
}
