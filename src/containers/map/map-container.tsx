import React, { useEffect } from "react";
import ReactMapGL, { FillLayer, Layer, Source } from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";

import { getIsochrone, setMaxTripDurationMinutes } from "@context/isochrones";
import selectIsochrone from "@context/isochrones/isochrones-selector";

import { ISOCHRONE_REQUEST_DEFAULTS, MAPBOX_TOKEN } from "@constants";

import { GeocoderControl } from "@components/common";

import "mapbox-gl/dist/mapbox-gl.css";
// import { GeocoderControl } from "@components/common";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProps {} // TODO: add props

const dataLayer: FillLayer = {
  id: "data",
  type: "fill",
  paint: {
    "fill-color": "#6750A4",
    "fill-opacity": 0.8,
  },
};

// eslint-disable-next-line no-empty-pattern
export function MapContainer({}: IProps) {
  const dispatch = useDispatch();
  const isochrone = useSelector(selectIsochrone);
  useEffect(() => {
    dispatch(getIsochrone(ISOCHRONE_REQUEST_DEFAULTS));
  }, [dispatch]);
  return (
    <ReactMapGL
      id="map"
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
      />
      <Source type="geojson" data={isochrone || null}>
        <Layer {...dataLayer} />
      </Source>
    </ReactMapGL>
  );
}
