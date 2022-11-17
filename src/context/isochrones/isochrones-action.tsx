import * as Api from "@api/isochrones";

import { IsochroneParams } from "@types";

import { networkStateHandler } from "@context/base/network";

import { setIsochrone } from "./isochrones-reducer";

export function getIsochrone(isochrone: IsochroneParams) {
  return (dispatch: CallableFunction) =>
    dispatch(
      networkStateHandler(async () => {
        const response = await Api.getIsochrone(isochrone);
        if (response) {
          dispatch(setIsochrone(response));
        }
      })
    );
}
