import { LngLat } from "mapbox-gl";

import * as Api from "@api/map";

import { MapView } from "@types";

import { networkStateHandler } from "@context/base/network";
import { notify, resetNotify } from "@context/base/notifier";
import { clearIsochrone } from "@context/isochrones";

import {
  setAddress,
  setMapView,
  setPickedPoint,
  setPickingMode,
  setStudyArea,
} from "./maps-reducer";

export function close_picking_mode() {
  return (dispatch: CallableFunction) => {
    dispatch(setPickingMode(false));
    dispatch(resetNotify());
  };
}

export function remove_picked_point() {
  return (dispatch: CallableFunction) => {
    // remove the picked point
    dispatch(setPickedPoint(null));
    // remove the current fetched isochrone
    dispatch(clearIsochrone());
  };
}

export function set_picking_mode(picking_mode: boolean) {
  return (dispatch: CallableFunction) => {
    if (picking_mode === true) {
      dispatch(notify("Tap a location on the map"));
      // Turn on picking mode
      dispatch(setPickingMode(picking_mode));
    }
    if (picking_mode === false) {
      dispatch(setPickingMode(false));
      dispatch(remove_picked_point());
      dispatch(resetNotify());
    }
  };
}

export function set_map_view(view: MapView) {
  return (dispatch: CallableFunction) => {
    dispatch(setMapView(view));
  };
}

export function getStudyArea() {
  return (dispatch: CallableFunction) =>
    dispatch(
      networkStateHandler(async () => {
        const response = await Api.getStudyArea();
        if (response) {
          dispatch(setStudyArea(response));
        }
      })
    );
}

// TODO: change return to dispatch
export function coords_to_address(coords: LngLat) {
  return async (dispatch: CallableFunction) => {
    const response = await Api.geocode_coords(coords);
    if (response?.display_name) {
      dispatch(setAddress(response.display_name));
    }
  };
}
