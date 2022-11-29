import React, { useRef } from "react";
import ReactMapGL, { MapRef } from "react-map-gl";

import { MAPBOX_TOKEN } from "@constants";

import { GeocoderControl } from "@components/common";
import Isochrones from "@components/common/map/isochrones";

import "mapbox-gl/dist/mapbox-gl.css";
// import { GeocoderControl } from "@components/common";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProps {} // TODO: add props

// eslint-disable-next-line no-empty-pattern
export function MapContainer({}: IProps) {
  const mapRef = useRef<MapRef>();

  return (
    <ReactMapGL
      id="map"
      ref={mapRef}
      mapboxAccessToken={MAPBOX_TOKEN}
      initialViewState={{
        latitude: 48.13,
        longitude: 11.58,
        zoom: 12,
        bearing: 0,
        pitch: 0,
      }}
      style={{ top: 0, left: 0, bottom: 0, right: 0, zIndex: -1, position: "fixed" }}
      mapStyle="mapbox://styles/mapbox/light-v11"
    >
      <GeocoderControl
        mapboxAccessToken={MAPBOX_TOKEN}
        marker={true}
        position="top-right"
        onResult={(result) => {
          console.log(result);
        }}
      />
      <Isochrones></Isochrones>
    </ReactMapGL>
  );
}
