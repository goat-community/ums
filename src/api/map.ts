import type { AxiosError } from "axios";
import axios from "axios";
import { LngLat } from "mapbox-gl";

import { IndicatorConfig } from "@types";

import { instance } from "@utils";

export function getStudyArea(): Promise<GeoJSON.FeatureCollection> {
  return instance
    .get("users/me/study-area")
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

// TODO: implcipt type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function geocode_coords(coords: LngLat): Promise<any> {
  return axios
    .get(
      `https://api.locationiq.com/v1/reverse.php?key=ca068d7840bca4&lat=${coords.lat}&lon=${coords.lng}&format=json`
    )
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function getIndicator(config: IndicatorConfig): Promise<ArrayBuffer> | null {
  return instance
    .post("indicators\\" + config.url, config.payload, { responseType: "arraybuffer" })
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}
