// eslint-disable-next-line simple-import-sort/imports
import { memo, useEffect, useRef } from "react";
import Map, { MapRef, type LngLat } from "react-map-gl";

import { MapView } from "@types";

import { useAppSelector } from "@hooks/context";

import { API_TOKEN, MAPBOX_TOKEN } from "@constants";

import Isochrones from "./isochrones";
import Layers from "./layers";
import LayersDeck from "./layers-deck";
import PopupTooltip from "./popup";

import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps {
  view: MapView;
  viewBounds: [number, number, number, number] | null;
  picking_mode: boolean;
  on_click_point: (e: LngLat) => void;
}

function MapComponent(props: MapProps) {
  const mapStyle = useAppSelector((state) => state.map.style);
  const cursor_mode = props.picking_mode ? "crosshair" : "default";
  const mapRef = useRef<MapRef>();

  // Fix map bounds when we have props.viewBounds
  function set_map_bounds() {
    if (!mapRef?.current) return;
    const map = mapRef.current.getMap();
    map.fitBounds(props.viewBounds, { padding: 20 });
  }

  useEffect(() => {
    if (props.viewBounds) {
      set_map_bounds();
    }
  }, [props.viewBounds, mapRef]);

  return (
    <Map
      id="map"
      ref={mapRef}
      cursor={cursor_mode}
      initialViewState={props.view}
      mapboxAccessToken={MAPBOX_TOKEN}
      mapStyle={mapStyle}
      minZoom={10}
      style={{ top: 0, left: 0, bottom: 0, right: 0, zIndex: -1, position: "fixed" }}
      onClick={(e) => props.on_click_point(e.lngLat as LngLat)}
      transformRequest={(url) => {
        if (url.startsWith("https://goat") || url.startsWith("http://localhost")) {
          return {
            url: url,
            headers: { Authorization: "Bearer " + API_TOKEN },
          };
        }
      }}
    >
      <LayersDeck />
      <Isochrones />
      <Layers />
      <PopupTooltip />
    </Map>
  );
}

export const MemoiezedMap = memo(MapComponent);
