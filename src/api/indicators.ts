import type { IsochroneParams } from "@types";
import type { AxiosError } from "axios";

import { instance } from "@utils";

export function calculateIsochrone(data: IsochroneParams) {
  return instance
    .post("indicators/isochrone", data, {
      headers: {
        Accept: "application/json",
      },
    })
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function getIsochroneResult(task_id: string, cancelToken) {
  return instance.get(`indicators/result/${task_id}?return_type=grid`, {
    responseType: "arraybuffer",
    cancelToken,
  });
}
