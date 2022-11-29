import React, { useEffect } from "react";
import { FillLayer, Layer, Source, useMap } from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";
import bbox from "@turf/bbox";

import { RootState } from "@context";
import { getIsochrone } from "@context/isochrones";
import selectIsochrone from "@context/isochrones/isochrones-selector";

import { ISOCHRONE_REQUEST_DEFAULTS } from "@constants";

const isochroneStyle: FillLayer = {
  id: "data",
  type: "fill",
  paint: {
    "fill-color": "#6750A4",
    "fill-opacity": 0.8,
  },
};

export default function Isochrones() {
  const dispatch = useDispatch();
  const isochrone = useSelector(selectIsochrone);
  const mapRef = useMap();
  const travelTimeSurface = useSelector(
    (state: RootState) => state.isochrones.travelTimeSurface
  );
  useEffect(() => {
    dispatch(getIsochrone(ISOCHRONE_REQUEST_DEFAULTS));
  }, [dispatch]);
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
  return (
    <Source type="geojson" data={isochrone || null}>
      <Layer {...isochroneStyle} />
    </Source>
  );
}
