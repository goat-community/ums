import { type LngLat } from "react-map-gl";

import * as Api from "@api/isochrones";

import { IsochroneParams, TRAVEL_MODES } from "@types";

import { RootState } from "@context";
import { networkStateHandler } from "@context/base/network";
import { resetNotify } from "@context/base/notifier";
import { setPickedPoint } from "@context/map";

import { ISOCHRONE_REQUEST_DEFAULTS } from "@constants";

import { setTravelTimeSurface } from "./isochrones-reducer";

export function fetch_isochrone(isochrone: IsochroneParams) {
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

export function get_point_isochrone(picked_point: LngLat) {
  return (dispatch: CallableFunction, getState: () => RootState) => {
    // check user already clicked on flower
    const state = getState();
    if (state.map.picking_mode && !state.map.picked_point) {
      // dispatch picking point to reducer
      dispatch(setPickedPoint(picked_point));
      // remove the picking hint notify
      dispatch(resetNotify());
      // Fetch the new point of the Isochrone
      dispatch(
        fetch_isochrone({
          ...ISOCHRONE_REQUEST_DEFAULTS,
          mode: TRAVEL_MODES.walking,
          starting_point: { input: [{ lat: picked_point.lat, lon: picked_point.lng }] },
        })
      );
    }
  };
}
