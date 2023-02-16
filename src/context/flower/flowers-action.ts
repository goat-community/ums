import type { Amenities, FlowerMinutes } from "@types";

import { object_is_empty } from "@utils";

import { RootState } from "@context";

import { AMENITIES } from "@constants/flower";

import { resetFlower, setAmenities, setSurveyDone } from "./flowers-reducer";

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
