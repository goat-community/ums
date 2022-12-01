import { type LngLat } from "react-map-gl";

import * as Api from "@api/isochrones";

import { IsochroneParams } from "@types";

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

export function get_point_isochrone(picked_point: LngLat | null) {
  return (dispatch: CallableFunction, getState: () => RootState) => {
    // check user already clicked on flower
    const state = getState();
    if (picked_point && state.map.picked_point === null) {
      dispatch(setPickedPoint(picked_point));
    }
    if (state.map.picking_mode && state.map.picked_point) {
      // remove the picking hint notify
      dispatch(resetNotify());
      // Fetch the new point of the Isochrone
      const isochroneRequestDefault = ISOCHRONE_REQUEST_DEFAULTS[state.isochrones.mode];
      dispatch(
        fetch_isochrone({
          ...isochroneRequestDefault,
          starting_point: {
            input: [{ lat: state.map.picked_point.lat, lon: state.map.picked_point.lng }],
          },
        })
      );
    }
  };
}
