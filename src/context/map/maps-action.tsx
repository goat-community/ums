import { type LatandLang } from "@types";

import { notify, resetNotify } from "@context/base/notifier";

import { setPickedPoint, setPickingMode } from "./maps-reducer";

export function close_picking_mode() {
  return (dispatch: CallableFunction) => {
    dispatch(setPickingMode(false));
    dispatch(resetNotify());
  };
}

export function remove_picked_point() {
  return (dispatch: CallableFunction) => {
    dispatch(setPickedPoint(null));
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

export function pick_point(picked_point: LatandLang) {
  return (dispatch: CallableFunction) => {
    // dispatch picking point to reducer
    dispatch(setPickedPoint(picked_point));
    // remove the picking hint notify
    dispatch(resetNotify());
  };
}
