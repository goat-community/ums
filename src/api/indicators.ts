import type { IsochroneParams } from "@types";
import type { AxiosError } from "axios";

import { instance } from "@utils";

export function getIsochrone(data: IsochroneParams): Promise<ArrayBuffer> | null {
  return instance
    .post("indicators/isochrone", data, {
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
