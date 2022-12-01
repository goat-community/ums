import React, { memo } from "react";
import Map, { type LngLat, Marker } from "react-map-gl";

import { MapView } from "@types";

import { token } from "@utils";

import { isochrones_selector } from "@context/isochrones/isochrones-selector";

import { MAPBOX_TOKEN } from "@constants";

import { GeocoderControl } from "@components/common";

import PinIcon from "@images/pin.png";

import Isochrones from "./isochrones";
import Layers from "./layers";
import MaskLayer from "./mask";

import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps {
  view: MapView;
  isochrone: ReturnType<typeof isochrones_selector>;
  picked_point: LngLat;
  viewBounds: [number, number, number, number] | null;
  on_click_point: (e: LngLat) => void;
}

function MapComponent(props: MapProps) {
  // console.log("MapComponent was rendered at", new Date().toLocaleTimeString());
  return (
    <Map
      id="map"
      initialViewState={props.view}
      maxBounds={props.viewBounds}
      mapboxAccessToken={MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/light-v11"
      style={{ top: 0, left: 0, bottom: 0, right: 0, zIndex: -1, position: "fixed" }}
      onClick={(e) => props.on_click_point(e.lngLat as LngLat)}
      transformRequest={(url) => {
        if (url.startsWith("https://goat") || url.startsWith("http://localhost")) {
          return {
            url: url,
            headers: { Authorization: "Bearer " + token },
          };
        }
      }}
    >
      <GeocoderControl
        mapboxAccessToken={MAPBOX_TOKEN}
        marker={true}
        position="top-right"
      />
      <MaskLayer></MaskLayer>
      <Layers />
      <Isochrones></Isochrones>
      {props.isochrone && (
        <Marker
          longitude={props.picked_point.lng}
          latitude={props.picked_point.lat}
          anchor="bottom"
        >
          <img src={PinIcon} width="16" height="20" alt="pin" />
        </Marker>
      )}
    </Map>
  );
}

export const MemoiezedMap = memo(MapComponent);
