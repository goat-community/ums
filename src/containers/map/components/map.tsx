import React, { memo } from "react";
import Map, { type FillLayer, type LngLat, Layer, Marker, Source } from "react-map-gl";

import { LatandLang, MapView } from "@types";

import { isochrones_selector } from "@context/isochrones/isochrones-selector";

import { MAPBOX_TOKEN } from "@constants";

import { GeocoderControl } from "@components/common";

import PinIcon from "@images/pin.png";

import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl/dist/mapbox-gl.css";

const dataLayer: FillLayer = {
  id: "data",
  type: "fill",
  paint: {
    "fill-color": "#a9afb6",
    "fill-opacity": 0.3,
  },
};

interface MapProps {
  view: MapView;
  isochrone: ReturnType<typeof isochrones_selector>;
  picked_point: LatandLang;
  on_click_point: (e: LngLat) => void;
}

function MapComponent(props: MapProps) {
  // console.log("MapComponent was rendered at", new Date().toLocaleTimeString());
  return (
    <Map
      id="map"
      initialViewState={props.view}
      mapboxAccessToken={MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/light-v11"
      style={{ top: 0, left: 0, bottom: 0, right: 0, zIndex: -1, position: "fixed" }}
      onClick={(e) => props.on_click_point(e.lngLat as LngLat)}
    >
      <GeocoderControl
        mapboxAccessToken={MAPBOX_TOKEN}
        marker={true}
        position="top-right"
      />
      <Source type="geojson" data={props.isochrone || null}>
        <Layer {...dataLayer} />
      </Source>

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
