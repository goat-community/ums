import type { IsochroneParams } from "@types";
import type { AxiosError } from "axios";

import { instance } from "@utils";

export function getIsochrone(data: IsochroneParams): Promise<ArrayBuffer> | null {
  return instance
    .post("isochrones", data, { responseType: "arraybuffer" })
    .then((response) => {
      return response.data;
    })
    .catch((err: AxiosError) => {
      throw err;
    });
}
