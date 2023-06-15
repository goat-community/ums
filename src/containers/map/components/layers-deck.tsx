import { useEffect, useState } from "react";
import { useControl, useMap } from "react-map-gl";
import { MVTLayer } from "@deck.gl/geo-layers/typed";
import { GeoJsonLayer, IconLayer } from "@deck.gl/layers/typed";
import { MapboxOverlay, MapboxOverlayProps } from "@deck.gl/mapbox";
import { t } from "i18next";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { active_amenities_selector } from "@context/flower";
import { setPopupInfo, study_area_selector } from "@context/map";
import { getStudyArea } from "@context/map";
import { get_poi_features } from "@context/pois/pois-selector";

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

const ICON_MAPPING = {
  atm: {
    x: 0,
    y: 0,
    width: 61,
    height: 92,
  },
  bakery: {
    x: 61,
    y: 0,
    width: 61,
    height: 92,
  },
  bank: {
    x: 122,
    y: 0,
    width: 61,
    height: 92,
  },
  bar: {
    x: 183,
    y: 0,
    width: 61,
    height: 92,
  },
  bike_sharing: {
    x: 244,
    y: 0,
    width: 61,
    height: 92,
  },
  bus_stop: {
    x: 305,
    y: 0,
    width: 61,
    height: 92,
  },
  butcher: {
    x: 366,
    y: 0,
    width: 61,
    height: 92,
  },
  cafe: {
    x: 427,
    y: 0,
    width: 61,
    height: 92,
  },
  car_sharing: {
    x: 0,
    y: 92,
    width: 61,
    height: 92,
  },
  charging_station: {
    x: 61,
    y: 92,
    width: 61,
    height: 92,
  },
  cinema: {
    x: 122,
    y: 92,
    width: 61,
    height: 92,
  },
  convenience: {
    x: 183,
    y: 92,
    width: 61,
    height: 92,
  },
  dentist: {
    x: 244,
    y: 92,
    width: 61,
    height: 92,
  },
  discount_gym: {
    x: 305,
    y: 92,
    width: 61,
    height: 92,
  },
  discount_supermarket: {
    x: 366,
    y: 92,
    width: 61,
    height: 92,
  },
  fast_food: {
    x: 427,
    y: 92,
    width: 61,
    height: 92,
  },
  fuel: {
    x: 0,
    y: 184,
    width: 61,
    height: 92,
  },
  general_practitioner: {
    x: 61,
    y: 184,
    width: 61,
    height: 92,
  },
  grundschule: {
    x: 122,
    y: 184,
    width: 61,
    height: 92,
  },
  gym: {
    x: 183,
    y: 184,
    width: 61,
    height: 92,
  },
  gymnasium: {
    x: 244,
    y: 184,
    width: 61,
    height: 92,
  },
  hauptschule_mittelschule: {
    x: 305,
    y: 184,
    width: 61,
    height: 92,
  },
  hotel: {
    x: 366,
    y: 184,
    width: 61,
    height: 92,
  },
  hypermarket: {
    x: 427,
    y: 184,
    width: 61,
    height: 92,
  },
  kindergarten: {
    x: 0,
    y: 276,
    width: 61,
    height: 92,
  },
  marketplace: {
    x: 61,
    y: 276,
    width: 61,
    height: 92,
  },
  museum: {
    x: 122,
    y: 276,
    width: 61,
    height: 92,
  },
  nightclub: {
    x: 183,
    y: 276,
    width: 61,
    height: 92,
  },
  nursery: {
    x: 244,
    y: 276,
    width: 61,
    height: 92,
  },
  organic_supermarket: {
    x: 305,
    y: 276,
    width: 61,
    height: 92,
  },
  pharmacy: {
    x: 366,
    y: 276,
    width: 61,
    height: 92,
  },
  playground: {
    x: 427,
    y: 276,
    width: 61,
    height: 92,
  },
  post_box: {
    x: 0,
    y: 368,
    width: 61,
    height: 92,
  },
  post_office: {
    x: 61,
    y: 368,
    width: 61,
    height: 92,
  },
  pub: {
    x: 122,
    y: 368,
    width: 61,
    height: 92,
  },
  rail_station: {
    x: 183,
    y: 368,
    width: 61,
    height: 92,
  },
  realschule: {
    x: 244,
    y: 368,
    width: 61,
    height: 92,
  },
  recycling: {
    x: 305,
    y: 368,
    width: 61,
    height: 92,
  },
  restaurant: {
    x: 366,
    y: 368,
    width: 62,
    height: 92,
  },
  subway_entrance: {
    x: 428,
    y: 368,
    width: 61,
    height: 92,
  },
  supermarket: {
    x: 488,
    y: 0,
    width: 61,
    height: 92,
  },
  swimming_pool_outdoor: {
    x: 488,
    y: 92,
    width: 61,
    height: 92,
  },
  tram_stop: {
    x: 488,
    y: 184,
    width: 61,
    height: 92,
  },
  yoga: {
    x: 488,
    y: 276,
    width: 61,
    height: 92,
  },
};

const SCORE_LAYER_TILESET_URL = `https://api.mapbox.com/v4/majkshkurti.dzvk0han/{z}/{x}/{y}.mvt?access_token=${MAPBOX_TOKEN}`;

function DeckGLOverlay(
  props: MapboxOverlayProps & {
    interleaved?: boolean;
  }
) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

export default function LayersDeck() {
  const mapRef = useMap();
  const [hovered, setHovered] = useState<boolean>(false);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const [zoom, setZoom] = useState(mapRef.current.getZoom());

  // Update the zoom state when the map is zoomed in or out
  const handleZoomChange = () => {
    setZoom(mapRef.current.getZoom());
  };

  // Add a listener for the 'zoomend' event on your map
  // This might vary depending on the map library you are using
  mapRef.current.on("zoomend", handleZoomChange);

  const allAmenities = useAppSelector((state) => state.flower.amenities);
  const poiFeatures = useAppSelector(get_poi_features);
  const studyAreaData = useAppSelector(study_area_selector);
  const picking_mode = useAppSelector((state) => state.map.picking_mode);
  const surveyCompleted = useAppSelector((state) => state.flower.survey_done_already);
  const flowerOpen = useAppSelector((state) => state.flower.flower_open);
  const scoreLayerVisible = useAppSelector((state) => state.flower.score_layer_visible);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getStudyArea());
  }, [dispatch]);
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
    id: "score-layer",
    data: SCORE_LAYER_TILESET_URL,
    visible: scoreLayerVisible,
    minZoom: 0,
    maxZoom: 17,
    getFillColor: (d) => {
      const zoom = mapRef.current.getZoom();
      const score = calculateScore(d);
      const color = COLORS[score] || [168, 168, 168];
      if (zoom < 14) {
        return [color[0], color[1], color[2], 100];
      }
      return [color[0], color[1], color[2], 255];
    },
    getLineWidth: 0,
    pickable: true,
    onHover: (e) => {
      setHovered(!!e.object);
    },
    onClick: (e) => {
      console.log(e);
      // only select district on district features
      if (e.object?.properties?.layerName === "district_munich") {
        setSelectedDistrict(e.object);
        setTimeout(() => {
          dispatch(
            setPopupInfo({
              title: t("popup.titles.district"),
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
      }
      dispatch(setPopupInfo(null));
      // set popup info at a min zoom level
      if (mapRef.current.getZoom() >= 14) {
        setTimeout(() => {
          dispatch(
            setPopupInfo({
              title: t("popup.titles.building"),
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
      }
    },
    updateTriggers: {
      getFillColor: [surveyCompleted, flowerOpen],
    },
  });

  const poiLayer = new IconLayer({
    id: "poi-layer",
    data: poiFeatures,
    iconAtlas: "https://i.imgur.com/br0ZLlr.png",
    visible: true,
    minZoom: 13,
    maxZoom: 16,
    iconMapping: ICON_MAPPING,
    getIcon: (d) => {
      console.log(d);
      return d.category;
    },
    getPosition: (d) => d.coordinates,
    sizeScale: 40,
    pickable: true,
    onHover: (e) => {
      setHovered(!!e.object);
    },
    onClick: (e) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { coordinates, id, min_zoom, max_zoom, uid, ...object } = e.object;
      dispatch(setPopupInfo(null));
      setTimeout(() => {
        dispatch(
          setPopupInfo({
            title: "Amenity",
            latitude: coordinates[1],
            longitude: coordinates[0],
            uid,
            content: object,
          })
        );
      }, 100);
    },
  });

  const maskLayer = new GeoJsonLayer({
    id: "study-area-mask",
    data: studyAreaData,
    pickable: false,
    stroked: false,
    filled: true,
    getFillColor: [96, 96, 98, 200],
    getLineWidth: 1,
  });

  const selectedDistrictLayer = new GeoJsonLayer({
    id: "selected-district",
    data: selectedDistrict,
    pickable: false,
    stroked: true,
    filled: false,
    getLineColor: [255, 255, 255],
    getLineWidth: () => {
      console.log(mapRef.current.getZoom());
      const zoom = mapRef.current.getZoom();
      if (zoom >= 13.7) {
        return 0;
      }
      return 30;
    },
    zoom: zoom,
    updateTriggers: {
      getLineWidth: [mapRef.current.getZoom()],
    },
  });

  return (
    <DeckGLOverlay
      getCursor={() => {
        if (picking_mode || hovered) {
          return "pointer";
        } else {
          return "inherit";
        }
      }}
      useDevicePixels={true}
      layers={[scoreLayer, poiLayer, maskLayer, selectedDistrictLayer]}
      interleaved={true}
    />
  );
}
