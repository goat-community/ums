import type { IsochroneParams } from "@types";
import { instance } from "@utils";
import type { AxiosError } from "axios";

export function getIsochrone(data: IsochroneParams): Promise<string> | null {
  return instance
    .post("isochrones", data)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}
