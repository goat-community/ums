import React from "react";
import { useControl } from "react-map-gl";
import { DeckProps } from "@deck.gl/core/typed";
import { MVTLayer } from "@deck.gl/geo-layers/typed";
import { MapboxOverlay } from "@deck.gl/mapbox/typed";

import { useAppSelector } from "@hooks/context";

import { MAPBOX_TOKEN } from "@constants";
const colors = {
  10: [50, 136, 189],
  9: [102, 194, 165],
  8: [171, 221, 164],
  7: [230, 245, 152],
  6: [255, 255, 191],
  5: [254, 224, 139],
  4: [253, 174, 97],
  3: [244, 109, 67],
  2: [197, 56, 12],
  1: [125, 36, 8],
  0: [168, 168, 168],
};

function DeckGLOverlay(props: DeckProps) {
  const deck = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  deck.setProps(props);
  return null;
}

export default function ScoreLayer() {
  const flowerSurveyAmenities = useAppSelector((state) => state.flower.amenities);
  const scoreLayer = new MVTLayer({
    data: `https://api.mapbox.com/v4/majkshkurti.cn7oycg5/{z}/{x}/{y}.mvt?access_token=${MAPBOX_TOKEN}`,
    minZoom: 0,
    maxZoom: 23,
    getLineWidth: 0,
    getFillColor: (d) => {
      let nrAmenitiesReached = 0;
      Object.keys(d.properties).forEach((amenity) => {
        if (flowerSurveyAmenities[amenity] && d.properties[amenity] <= 5) {
          nrAmenitiesReached++;
        }
      });
      const score = Math.round(
        (nrAmenitiesReached / Object.keys(flowerSurveyAmenities).length) * 10
      );
      return colors[score] || [168, 168, 168];
    },
  });

  return <DeckGLOverlay layers={[scoreLayer]} />;
}
