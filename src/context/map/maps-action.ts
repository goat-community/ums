import geobuf from "geobuf";
import i18n from "i18next";
import { LngLat } from "mapbox-gl";
import Pbf from "pbf";

import * as Api from "@api/map";

import { IndicatorConfig, MapView } from "@types";

import { networkStateHandler } from "@context/base/network";
import { notify, resetNotify } from "@context/base/notifier";
import { clearIsochrone } from "@context/isochrones";

import {
  setAddress,
  setIndicator,
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
      dispatch(notify(i18n.t("messages.tapLocation")));
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

export function coords_to_address(coords: LngLat) {
  return async (dispatch: CallableFunction) => {
    const response = await Api.geocode_coords(coords);
    if (response?.display_name) {
      dispatch(setAddress(response));
    }
  };
}

export function getIndicator(
  config: IndicatorConfig,
  layer: string,
  task_id?: string,
  attemp = 0
) {
  return async (dispatch: CallableFunction) =>
    dispatch(
      networkStateHandler(async () => {
        if (task_id && attemp < 40) {
          const response = await Api.getTaskResult(task_id);
          if (response.status === 202) {
            // still worker is pending
            setTimeout(
              () => dispatch(getIndicator(config, layer, task_id, attemp + 1)),
              1500
            );
          } else {
            const geobufDecoded = geobuf.decode(new Pbf(response.data));
            const features = geobufDecoded.features;
            dispatch(
              setIndicator({
                features,
                layer,
              })
            );
          }
        } else {
          const response = await Api.getIndicator(config);
          if (response?.task_id) {
            await dispatch(getIndicator(config, layer, response.task_id));
          }
        }
      })
    );
}
