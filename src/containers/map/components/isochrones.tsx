import React, { useEffect } from "react";
import { FillLayer, Layer, Source, useMap } from "react-map-gl";
import { useSelector } from "react-redux";
import bbox from "@turf/bbox";

import { RootState } from "@context";
import { isochrones_selector } from "@context/isochrones/isochrones-selector";

const isochroneStyle: FillLayer = {
  id: "data",
  type: "fill",
  paint: {
    "fill-color": "#a9afb6",
    "fill-opacity": 0.7,
  },
};

export default function Isochrones() {
  const isochrone = useSelector(isochrones_selector);
  const mapRef = useMap();
  const travelTimeSurface = useSelector(
    (state: RootState) => state.isochrones.travel_time_surface
  );
  // Zoom to the bounding box of the isochrone
  useEffect(() => {
    if (isochrone) {
      const [minLng, minLat, maxLng, maxLat] = bbox(isochrone);
      mapRef.current.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        { padding: 40, duration: 1000 }
      );
    }
  }, [travelTimeSurface]);
  useEffect(() => {
    // check if layer bounds exeeds map bounds
    if (isochrone) {
      const [minLng, minLat, maxLng, maxLat] = bbox(isochrone);
      const mapBounds = mapRef.current.getBounds();
      if (
        minLng < mapBounds.getSouthWest().lng ||
        minLat < mapBounds.getSouthWest().lat ||
        maxLng > mapBounds.getNorthEast().lng ||
        maxLat > mapBounds.getNorthEast().lat
      ) {
        mapRef.current.fitBounds(
          [
            [minLng, minLat],
            [maxLng, maxLat],
          ],
          { padding: 40, duration: 1000 }
        );
      }
    }
  }, [isochrone]);
  return (
    <Source type="geojson" data={isochrone || null}>
      <Layer {...isochroneStyle} />
    </Source>
  );
}
