import * as Api from "@api/isochrones";

import { IsochroneParams } from "@types";

import { networkStateHandler } from "@context/base/network";

import { setTravelTimeSurface } from "./isochrones-reducer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getIsochrone(isochrone: IsochroneParams): any {
  return (dispatch: CallableFunction) =>
    dispatch(
      networkStateHandler(async () => {
        const response = await Api.getIsochrone(isochrone);
        if (response) {
          dispatch(setTravelTimeSurface(response));
        }
      })
    );
}
