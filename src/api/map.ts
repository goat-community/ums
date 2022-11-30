import type { AxiosError } from "axios";

import { instance } from "@utils";

export function getStudyArea(): Promise<GeoJSON.FeatureCollection> {
  return instance
    .get("users/me/study-area")
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}
