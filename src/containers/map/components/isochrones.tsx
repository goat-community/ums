import React, { useEffect } from "react";
import { FillLayer, Layer, Marker, Source, useMap } from "react-map-gl";
import { useSelector } from "react-redux";
import bbox from "@turf/bbox";
import styled from "styled-components";

import { useCalculateSingleScore, useIsMobile } from "@hooks";
import { useAppSelector } from "@hooks/context";

import { RootState } from "@context";
import { isochrones_selector } from "@context/isochrones/isochrones-selector";
import { picked_point_selector } from "@context/map/map-selector";

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
      <Source type="geojson" data={isochrone || null}>
        <Layer {...isochroneStyle} />
      </Source>
      {isochrone && isochrone_score && (
        <>
          <Marker
            longitude={picked_point.lng}
            latitude={picked_point.lat}
            anchor="bottom"
          >
            <ScoreHighlighter score={isochrone_score}>
              {isochrone_score + "/10"}
            </ScoreHighlighter>
            <img src={PinIcon} width="16" height="20" alt="pin" />
          </Marker>
        </>
      )}
    </>
  );
}

const ScoreHighlighter = styled.div<{ score: number }>`
  background-color: ${(props) =>
    props.score > 6 ? "#4ADD32" : props.score >= 5 ? "#F2E359" : "#ff0017"};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  font-size: 12px;
  width: 50px;
  height: 20px;
  border-radius: 10px;
  color: white;
`;
