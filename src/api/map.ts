import type { AxiosError } from "axios";
import axios from "axios";
import { LngLat } from "mapbox-gl";

import { IndicatorConfig, TaskIDResponse } from "@types";

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

export function getIndicator(config: IndicatorConfig): Promise<TaskIDResponse> {
  return instance
    .post("indicators\\" + config.url, config.payload)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function getTaskResult(
  task_id: string
): Promise<{ status: number; data: ArrayBuffer }> {
  return instance
    .get("indicators/result/" + task_id + "?return_type=geobuf", {
      responseType: "arraybuffer",
    })
    .then((response) => {
      // return data and http status code
      return { data: response.data, status: response.status };
    })
    .catch((err: AxiosError) => {
      throw err;
    });
}
