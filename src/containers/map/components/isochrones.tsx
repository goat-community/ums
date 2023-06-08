import { useCallback, useEffect } from "react";
import { FillLayer, Layer, Marker, Source, useMap } from "react-map-gl";
import { AnyLayer } from "react-map-gl/dist/esm/types";
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
  id: "isochrone-layer",
  type: "fill",
  paint: {
    "fill-color": "#7DFAC2",
    "fill-opacity": 0.3,
  },
};

const markerStyle: AnyLayer = {
  id: "marker-custom-1",
  type: "symbol",
  source: "marker-custom-1",
  layout: {
    "icon-image": "marker-custom-1",
    "icon-size": 1,
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

  const fitBounds = useCallback(() => {
    if (isochrone && mapRef.current && travelTimeSurface) {
      try {
        const [minLng, minLat, maxLng, maxLat] = bbox(isochrone);
        if (!minLng || !minLat || !maxLng || !maxLat) return;

        mapRef.current.fitBounds(
          [
            [minLng, minLat],
            [maxLng, maxLat],
          ],
          { padding: flying_padding, duration: 1000 }
        );
      } catch (error) {
        console.error(error);
      }
    }
  }, [travelTimeSurface, isochrone, mapRef, flying_padding]);

  useEffect(() => {
    fitBounds();
  }, [fitBounds]);

  useEffect(() => {
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
  }, [isochrone, mapRef]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.loadImage(PinIcon, (error, image) => {
        if (error) throw error;
        mapRef.current.addImage("marker-custom-1", image);
      });
    }
  }, [mapRef]);

  return (
    <>
      {isochrone && isochrone_score && (
        <>
          <Source type="geojson" data={isochrone || null}>
            <Layer {...isochroneStyle} />
          </Source>

          <Source
            type="geojson"
            data={{
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [picked_point.lng, picked_point.lat],
              },
              properties: {
                iconNumber: "1",
              },
            }}
          >
            <Layer {...markerStyle} />
          </Source>

          <Marker
            longitude={picked_point.lng}
            latitude={picked_point.lat}
            anchor="bottom"
            offset={[60, -10]}
          >
            <ScoreHighLighter
              isochrone_score={isochrone_score}
              score_type_hint
              with_margin
            />
          </Marker>
        </>
      )}
    </>
  );
}
