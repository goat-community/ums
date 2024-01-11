import { type LngLat } from "react-map-gl";
import axios from "axios";

import * as Api from "@api/indicators";

import { IsochroneParams } from "@types";

import { RootState } from "@context";
import { networkStateHandler } from "@context/base/network";
// import { resetNotify } from "@context/base/notifier";
import { coords_to_address, setPickedPoint } from "@context/map";

import { ISOCHRONE_REQUEST_DEFAULTS } from "@constants";

import { setTravelTimeSurface } from "./isochrones-reducer";

const MAX_TRIES = 20;

let isochroneCancelToken = null;

export function fetch_isochrone_result(
  task_id: string,
  currentTry,
  dispatch: CallableFunction,
  _cancelToken
) {
  if (currentTry < MAX_TRIES) {
    Api.getIsochroneResult(task_id, _cancelToken).then((result) => {
      if (result.status === 202) {
        setTimeout(() => {
          fetch_isochrone_result(task_id, currentTry + 1, dispatch, _cancelToken);
        }, 1000);
      } else {
        if (!result) {
          console.error("No result");
        }
        dispatch(setTravelTimeSurface(result.data));
      }
    });
  }
}

export function fetch_isochrone(isochrone: IsochroneParams) {
  if (isochroneCancelToken instanceof Function) {
    isochroneCancelToken("cancelled");
    isochroneCancelToken = null;
  }
  const CancelToken = axios.CancelToken;
  const _cancelToken = new CancelToken((c) => {
    isochroneCancelToken = c;
  });
  return (dispatch: CallableFunction) =>
    dispatch(
      networkStateHandler(async () => {
        const response = await Api.calculateIsochrone(isochrone);
        if (response && response.task_id) {
          fetch_isochrone_result(response.task_id, 1, dispatch, _cancelToken);
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
