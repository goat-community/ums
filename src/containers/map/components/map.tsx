import { memo } from "react";
import Map, { type LngLat } from "react-map-gl";

import { MapView } from "@types";

// import { isochrones_selector } from "@context/isochrones/isochrones-selector";
import { API_TOKEN, MAPBOX_TOKEN } from "@constants";

// import { GeocoderControl } from "@components/common";
// import PinIcon from "@images/pin.png";
import Isochrones from "./isochrones";
import Layers from "./layers";
import MaskLayer from "./mask";
import Pois from "./pois";
import ScoreLayer from "./score-layer";

import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps {
  view: MapView;
  viewBounds: [number, number, number, number] | null;
  on_click_point: (e: LngLat) => void;
}

function MapComponent(props: MapProps) {
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
            headers: { Authorization: "Bearer " + API_TOKEN },
          };
        }
      }}
    >
      {/** Score Layer */}
      <ScoreLayer />
      {/** Isochrones */}
      <Isochrones />
      {/** Layers */}
      <Layers />
      <MaskLayer />

      {/** POIS */}
      <Pois />
    </Map>
  );
}

export const MemoiezedMap = memo(MapComponent);
