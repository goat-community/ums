import type { PoisList } from "@types";
import geobuf from "geobuf";
import Pbf from "pbf";

import * as Api from "@api/poi";

import { networkStateHandler } from "@context/base/network";

import { PERSISTANCE_DATE, POIS } from "@constants";
import { AMENITIES_LIST } from "@constants/flower";

import { setPersistanceDate, setPoiConfig, setPoiFeatures } from "./pois-reducer";

const POIS_PERSIST_TIME = 24;
export function get_pois_aois() {
  return (dispatch: CallableFunction) => {
    // check for last persisted date
    const persistanced_date = new Date(localStorage.getItem(PERSISTANCE_DATE)) || null;
    const persistanced_pois = JSON.parse(localStorage.getItem(POIS)) || [];
    // check the time passed more than 24 hours from last persistance
    // if not passed then we return the cached pois
    if (
      Math.abs(persistanced_date.getTime() - new Date().getTime()) / 36e5 <
      POIS_PERSIST_TIME
    ) {
      return dispatch(setPoiFeatures(persistanced_pois));
    }

    dispatch(
      networkStateHandler(async () => {
        const response = await Api.fetch_pois_aios();
        if (response) {
          const geobuf_raw = geobuf.decode(new Pbf(response));
          const features = geobuf_raw.features;

          // { atm: [], school: []...}
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
                    category: element.properties.category,
                  },
                ],
              };
            }
          }

          // Persist in local storage
          const persistance_date = new Date();
          localStorage.setItem(POIS, JSON.stringify(pois));
          localStorage.setItem(PERSISTANCE_DATE, persistance_date.toString());

          dispatch(setPersistanceDate(persistance_date.toString()));
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
