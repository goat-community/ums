import { useControl } from "react-map-gl";
import { DeckProps } from "@deck.gl/core/typed";
import { MVTLayer } from "@deck.gl/geo-layers/typed";
import { MapboxOverlay } from "@deck.gl/mapbox/typed";

import { useAppSelector } from "@hooks/context";

import { active_amenities_selector } from "@context/flower";

import { MAPBOX_TOKEN } from "@constants";
const COLORS = {
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
const TILESET_URL = `https://api.mapbox.com/v4/majkshkurti.cn7oycg5/{z}/{x}/{y}.mvt?access_token=${MAPBOX_TOKEN}`;

function DeckGLOverlay(props: DeckProps) {
  const deck = useControl<MapboxOverlay>(() => new MapboxOverlay({ ...props }));
  deck.setProps(props);
  return null;
}

export default function ScoreLayer() {
  // All amenities are the ones that are available in the redux store.
  // For the score to be correct the amenities in redux should be the same as the ones in the vector tile feature props.
  // TODO: Make sure that the amenities in the vector tile are the same as the ones in the redux store
  const allAmenities = useAppSelector((state) => state.flower.amenities);
  // Active amenities are the ones that have a value > 0 in the flower state
  const activeAmenities = useAppSelector(active_amenities_selector);
  const mode = useAppSelector((state) => state.flower.score_layer_mode);
  const scoreLayer = new MVTLayer({
    data: TILESET_URL,
    visible: mode !== "none",
    minZoom: 0,
    maxZoom: 17,
    getLineWidth: 0,
    getFillColor: (d) => {
      let nrAmenitiesReached = 0;
      const amenities = mode === "personal" ? activeAmenities : allAmenities;
      const nrTotalAmenities = Object.keys(amenities).length;
      Object.keys(d.properties).forEach((amenity) => {
        if (amenities[amenity]) {
          const maxTime = mode === "personal" ? amenities[amenity] : 15;
          if (d.properties[amenity] <= maxTime) {
            nrAmenitiesReached++;
          }
        }
      });
      const score = Math.round((nrAmenitiesReached / nrTotalAmenities) * 10);
      return COLORS[score] || [168, 168, 168];
    },
    updateTriggers: {
      getFillColor: [mode],
    },
  });

  return <DeckGLOverlay useDevicePixels={false} layers={[scoreLayer]} />;
}
