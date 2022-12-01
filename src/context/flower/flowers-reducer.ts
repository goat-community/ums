import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { Amenities } from "@types";

/** Reducer */
const initialState = {
  amenities: {
    Mobilitaetspunkte: 5,
    atm: 5,
    bakery: 5,
    bank: 5,
    bar: 5,
    bike_sharing: 5,
    bus_stop: 5,
    butcher: 5,
    cafe: 5,
    car_sharing: 5,
    charging_station: 5,
    cinema: 5,
    convenience: 5,
    dentist: 5,
    discount_supermarket: 5,
    fast_food: 5,
    general_practitioner: 5,
    grundschule: 5,
    gym: 5,
    gymnasium: 5,
    hauptschule_mittelschule: 5,
    hotel: 5,
    kindergarten: 5,
    marketplace: 5,
    museum: 5,
    nursery: 5,
    organic_supermarket: 5,
    park: 5,
    pharmacy: 5,
    playground: 5,
    population: 5,
    post_box: 5,
    post_office: 5,
    pub: 5,
    realschule: 5,
    recycling: 5,
    restaurant: 5,
    subway_entrance: 5,
    supermarket: 5,
    tram_stop: 5,
  } as Amenities,
  survey_done_already: false as boolean,
};

export const flower = createSlice({
  name: "flower",
  initialState,
  reducers: {
    setAmenities: (
      state: typeof initialState,
      action: PayloadAction<Amenities | Partial<Amenities>>
    ) => {
      state.amenities = {
        ...state.amenities,
        ...action.payload,
      };
    },
    clearAmenities: (state: typeof initialState) => {
      state.amenities = null;
    },
    setSurveyDone: (state: typeof initialState) => {
      state.survey_done_already = true;
    },
  },
});

export const { setAmenities, clearAmenities, setSurveyDone } = flower.actions;
export default flower.reducer;
