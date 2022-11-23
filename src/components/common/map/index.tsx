import React from "react";
import ReactMapGL from "react-map-gl";

import { MAPBOX_TOKEN } from "@constants";

import GeocoderControl from "./geocoder";

import "mapbox-gl/dist/mapbox-gl.css";
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProps {} // TODO: add props

// eslint-disable-next-line no-empty-pattern
export default function MapComponent({}: IProps) {
  return (
    <ReactMapGL
      mapboxAccessToken={MAPBOX_TOKEN}
      initialViewState={{
        latitude: 48.13,
        longitude: 11.58,
        zoom: 12,
        bearing: 0,
        pitch: 0,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/dark-v9"
    >
      <GeocoderControl
        mapboxAccessToken={MAPBOX_TOKEN}
        marker={true}
        position="top-left"
      />
    </ReactMapGL>
  );
}
