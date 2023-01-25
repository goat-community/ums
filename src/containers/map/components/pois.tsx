import { useControl } from "react-map-gl";
import { DeckProps } from "@deck.gl/core/typed";
import { IconLayer } from "@deck.gl/layers";
import { MapboxOverlay } from "@deck.gl/mapbox/typed";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { setPopupInfo } from "@context/map";
import { get_poi_features } from "@context/pois/pois-selector";

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
function DeckGLOverlay(props: DeckProps) {
  const deck = useControl<MapboxOverlay>(() => new MapboxOverlay({ ...props }));
  deck.setProps(props);
  return null;
}

export default function PoiLayer() {
  const poiFeatures = useAppSelector(get_poi_features);
  const dispatch = useAppDispatch();

  const poiLayer = new IconLayer({
    data: poiFeatures,
    iconAtlas: "https://i.imgur.com/br0ZLlr.png",
    visible: true,
    minZoom: 13,
    maxZoom: 16,
    iconMapping: ICON_MAPPING,
    getIcon: (d) => d.category,
    getPosition: (d) => d.coordinates,
    sizeScale: 40,
    pickable: true,
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
    beforeId: "study-area-mask",
  });

  return <DeckGLOverlay useDevicePixels={false} layers={[poiLayer]} />;
}
