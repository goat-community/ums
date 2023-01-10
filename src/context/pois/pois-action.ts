import type { PoisList } from "@types";
import geobuf from "geobuf";
import Pbf from "pbf";

import * as Api from "@api/poi";

import { networkStateHandler } from "@context/base/network";

import { AMENITIES_LIST } from "@constants/flower";

import { setPoiConfig, setPoiFeatures } from "./pois-reducer";

export function get_pois_aois() {
  return (dispatch: CallableFunction) => {
    dispatch(
      networkStateHandler(async () => {
        const response = await Api.fetch_pois_aios();
        if (response) {
          const geobuf_raw = geobuf.decode(new Pbf(response));
          const features = geobuf_raw.features;

          let pois: PoisList = {};

          for (let index = 0; index < features.length; index++) {
            const element = features[index];
            if (AMENITIES_LIST.includes(element.properties.category)) {
              pois = {
                ...pois,
                [element.properties.category]: [
                  ...(pois[element.properties.category] || ""),
                  {
                    coordinates: element.geometry.coordinates,
                    ...element.properties,
                  },
                ],
              };
            }
          }

          dispatch(setPoiFeatures(pois));
        }
      })
    );
  };
}

export function get_pois_config() {
  return (dispatch: CallableFunction) => {
    dispatch(
      networkStateHandler(async () => {
        const response = await Api.fetch_pois_config();
        if (response && response.poi_groups) {
          dispatch(setPoiConfig(response.poi_groups));
        }
      })
    );
  };
}
