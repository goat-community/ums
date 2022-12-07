import type { Amenities, FlowerMinutes } from "@types";

import { object_is_empty } from "@utils";

import { AMENITIES } from "@constants/flower";

import { setAmenities, setSurveyDone } from "./flowers-reducer";

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