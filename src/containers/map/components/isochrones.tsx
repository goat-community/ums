import { useEffect } from "react";
import { FillLayer, Layer, Marker, Source, useMap } from "react-map-gl";
import { useSelector } from "react-redux";
import bbox from "@turf/bbox";

import { useCalculateSingleScore, useIsMobile } from "@hooks";
import { useAppSelector } from "@hooks/context";

import { RootState } from "@context";
import { isochrones_selector } from "@context/isochrones/isochrones-selector";
import { picked_point_selector } from "@context/map/maps-selector";

import { ScoreHighLighter } from "@components/common";

import PinIcon from "@images/pin.png";

const isochroneStyle: FillLayer = {
  id: "data",
  type: "fill",
  paint: {
    "fill-color": "#7DFAC2",
    "fill-opacity": 0.3,
  },
};

export default function Isochrones() {
  const mapRef = useMap();
  const is_mobile = useIsMobile();
  const isochrone_score = useCalculateSingleScore();
  const isochrone = useSelector(isochrones_selector);
  const picked_point = useAppSelector(picked_point_selector);
  const travelTimeSurface = useSelector(
    (state: RootState) => state.isochrones.travel_time_surface
  );

  const flying_padding = is_mobile ? 40 : 200;

  // Zoom to the bounding box of the isochrone
  useEffect(() => {
    if (isochrone) {
      const [minLng, minLat, maxLng, maxLat] = bbox(isochrone);
      mapRef.current.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        { padding: flying_padding, duration: 1000 }
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
    <>
      {isochrone && isochrone_score && (
        <>
          <Source type="geojson" data={isochrone || null}>
            <Layer {...isochroneStyle} />
          </Source>
          <Marker
            longitude={picked_point.lng}
            latitude={picked_point.lat}
            anchor="bottom"
          >
            <ScoreHighLighter isochrone_score={isochrone_score} />
            <img src={PinIcon} width="16" height="20" alt="pin" />
          </Marker>
        </>
      )}
    </>
  );
}
