import type { AxiosError } from "axios";

import { instance } from "@utils";
// import axios from "axios";

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
