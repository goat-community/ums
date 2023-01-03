import type { AxiosError } from "axios";

import { CustomizationConfig } from "@types";

import { instance } from "@utils";

export function fetch_pois_config(): Promise<CustomizationConfig> {
  return instance
    .get("customizations/me")
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function fetch_pois_aios(): Promise<ArrayBuffer> {
  return instance
    .get("pois-aois/visualization?return_type=geobuf&scenario_id=0", {
      responseType: "arraybuffer",
      headers: {
        Accept: "application/pbf",
      },
    })
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}
