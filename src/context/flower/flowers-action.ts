import type { Amenities, FlowerMinutes } from "@types";

import * as Api from "@api/flower";

import { object_is_empty } from "@utils";

import { RootState } from "@context";
import { networkStateHandler } from "@context/base/network";

import { AMENITIES } from "@constants/flower";

import {
  resetFlower,
  resetShareableFlowerKey,
  resetSignedShareableFlower,
  setAmenities,
  setShareableFlowerKey,
  setSignedShareableFlower,
  setSurveyDone,
} from "./flowers-reducer";

export function get_amenities() {
  return (dispatch: CallableFunction) => {
    const amenities = JSON.parse(localStorage.getItem(AMENITIES)) || {};
    if (!object_is_empty(amenities)) {
      dispatch(setAmenities(amenities as Amenities));
      dispatch(setSurveyDone());
    }
  };
}

export function persist_amenities(amenities: Amenities) {
  return (dispatch: CallableFunction) => {
    localStorage.setItem(AMENITIES, JSON.stringify(amenities));
    dispatch(setSurveyDone());
  };
}

export function set_amenity(amenity: Record<string, FlowerMinutes>) {
  return (dispatch: CallableFunction) => {
    dispatch(setAmenities(amenity));
  };
}

export function resetToStandardFlower() {
  return (dispatch: CallableFunction, getState: () => RootState) => {
    dispatch(resetFlower());
    dispatch(persist_amenities(getState().flower.amenities));
  };
}

export function get_signed_url_flower(key: string) {
  return (dispatch: CallableFunction) =>
    dispatch(
      networkStateHandler(async () => {
        dispatch(resetSignedShareableFlower());
        const response = await Api.getSignedURL(key);
        if (response?.signedUrl) {
          dispatch(setSignedShareableFlower(response.signedUrl));
        }
      })
    );
}

export function upload_flower(svgData: string) {
  return (dispatch: CallableFunction) =>
    dispatch(
      networkStateHandler(async () => {
        dispatch(resetShareableFlowerKey());
        const response = await Api.uploadSvgCode(svgData);
        if (response?.key) {
          dispatch(setShareableFlowerKey(response.key));
          dispatch(get_signed_url_flower(response.key));
        }
      })
    );
}
