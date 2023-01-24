import { useControl, useMap } from "react-map-gl";
import { DeckProps } from "@deck.gl/core/typed";
import { MVTLayer } from "@deck.gl/geo-layers/typed";
import { MapboxOverlay } from "@deck.gl/mapbox/typed";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { active_amenities_selector } from "@context/flower";
import { setPopupInfo } from "@context/map";

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
const SCORE_LAYER_TILESET_URL = `https://api.mapbox.com/v4/majkshkurti.dzvk0han/{z}/{x}/{y}.mvt?access_token=${MAPBOX_TOKEN}`;

function DeckGLOverlay(props: DeckProps) {
  const deck = useControl<MapboxOverlay>(() => new MapboxOverlay({ ...props }));
  deck.setProps(props);
  return null;
}

export default function ScoreLayer() {
  const mapRef = useMap();
  // All amenities are the ones that are available in the redux store.
  // For the score to be correct the amenities in redux should be the same as the ones in the vector tile feature props.
  // TODO: Make sure that the amenities in the vector tile are the same as the ones in the redux store
  const allAmenities = useAppSelector((state) => state.flower.amenities);
  const surveyCompleted = useAppSelector((state) => state.flower.survey_done_already);
  const flowerOpen = useAppSelector((state) => state.flower.flower_open);
  const scoreLayerVisible = useAppSelector((state) => state.flower.score_layer_visible);
  const dispatch = useAppDispatch();

  // Active amenities are the ones that have a value > 0 in the flower state
  const calculateScore = (d) => {
    let nrAmenitiesReached = 0;
    const amenities = surveyCompleted ? activeAmenities : allAmenities;
    const nrTotalAmenities = Object.keys(amenities).length;
    Object.keys(d.properties).forEach((amenity) => {
      if (amenities[amenity]) {
        const maxTime = surveyCompleted ? amenities[amenity] : 15;
        if (d.properties[amenity] <= maxTime) {
          nrAmenitiesReached++;
        }
      }
    });
    const score = Math.round((nrAmenitiesReached / nrTotalAmenities) * 10);
    return score;
  };
  const activeAmenities = useAppSelector(active_amenities_selector);
  const scoreLayer = new MVTLayer({
    data: SCORE_LAYER_TILESET_URL,
    visible: scoreLayerVisible,
    minZoom: 0,
    maxZoom: 17,
    getLineWidth: 0,
    getFillColor: (d) => {
      const zoom = mapRef.current.getZoom();
      const score = calculateScore(d);
      const color = COLORS[score] || [168, 168, 168];
      if (zoom < 14) {
        return [color[0], color[1], color[2], 100];
      }
      return [color[0], color[1], color[2], 255];
    },
    pickable: true,
    onClick: (e) => {
      dispatch(setPopupInfo(null));
      setTimeout(() => {
        dispatch(
          setPopupInfo({
            title: "Building",
            latitude: e.coordinate[1].toString(),
            longitude: e.coordinate[0].toString(),
            uid: e.object.properties.fid,
            content: {
              score: ` ${calculateScore(e.object)} / 10 `,
              color: COLORS[calculateScore(e.object)],
            },
          })
        );
      }, 100);
    },
    updateTriggers: {
      getFillColor: [surveyCompleted, flowerOpen],
    },
  });

  return <DeckGLOverlay useDevicePixels={false} layers={[scoreLayer]} />;
}
