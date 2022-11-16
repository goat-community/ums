import type { IsochroneParams } from "@types";
import type { AxiosError } from "axios";

import { instance } from "@utils";

export function getIsochrone(data: IsochroneParams): Promise<string> | null {
  return instance
    .post("isochrones", data)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}
