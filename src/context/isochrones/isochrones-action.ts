import { type LngLat } from "react-map-gl";

import * as Api from "@api/isochrones";

import { IsochroneParams } from "@types";

import { RootState } from "@context";
import { networkStateHandler } from "@context/base/network";
// import { resetNotify } from "@context/base/notifier";
import { coords_to_address, setPickedPoint } from "@context/map";

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
    // dispatch(clearIsochrone());
    dispatch(setPickedPoint(picked_point));
    // if (picked_point && state.map.picked_point === null) {
    //   dispatch(setPickedPoint(picked_point));
    // }
    if (state.map.picking_mode) {
      // Fetch the new point of the Isochrone
      const isochroneRequestDefault = ISOCHRONE_REQUEST_DEFAULTS[state.isochrones.mode];
      dispatch(
        fetch_isochrone({
          ...isochroneRequestDefault,
          starting_point: {
            input: [{ lat: picked_point.lat, lon: picked_point.lng }],
          },
        })
      );
      // get text address
      dispatch(coords_to_address(picked_point));
    }
  };
}
