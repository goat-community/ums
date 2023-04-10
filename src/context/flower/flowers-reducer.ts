import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { Amenities } from "@types";

/** Reducer */
const initialState = {
  amenities: {
    Mobilitaetspunkte: 15,
    atm: 15,
    bakery: 15,
    bank: 15,
    bar: 15,
    bike_sharing: 15,
    bus_stop: 15,
    butcher: 15,
    cafe: 15,
    car_sharing: 15,
    charging_station: 15,
    cinema: 15,
    convenience: 15,
    dentist: 15,
    discount_supermarket: 15,
    fast_food: 15,
    general_practitioner: 15,
    grundschule: 15,
    gym: 15,
    gymnasium: 15,
    hauptschule_mittelschule: 15,
    hotel: 15,
    kindergarten: 15,
    marketplace: 15,
    museum: 15,
    nursery: 15,
    organic_supermarket: 15,
    park: 15,
    pharmacy: 15,
    playground: 15,
    population: 15,
    post_box: 15,
    post_office: 15,
    pub: 15,
    hyper: 15,
    yoga: 15,
    realschule: 15,
    recycling: 15,
    restaurant: 15,
    subway_entrance: 15,
    supermarket: 15,
    tram_stop: 15,
    fuel_station: 15,
    recycling_station: 15,
    chemists: 15,
    nurseries: 15,
    underground_stop: 15,
    railway_station: 15,
  } as Amenities,
  survey_done_already: false as boolean,
  score_layer_visible: true as boolean,
  flower_open: false as boolean,
  shareable_flower_key: "" as string,
  signed_shareable_flower_link: "" as string,
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
    setFlowerOpen: (state: typeof initialState, action: PayloadAction<boolean>) => {
      state.flower_open = action.payload;
    },
    setScoreLayerMode: (state: typeof initialState, action: PayloadAction<boolean>) => {
      state.score_layer_visible = action.payload;
    },
    resetFlower: (state: typeof initialState) => {
      state.amenities = initialState.amenities;
    },
    setShareableFlowerKey: (
      state: typeof initialState,
      action: PayloadAction<string>
    ) => {
      state.shareable_flower_key = action.payload;
    },
    resetShareableFlowerKey: (state: typeof initialState) => {
      state.shareable_flower_key = null;
    },
    setSignedShareableFlower: (
      state: typeof initialState,
      action: PayloadAction<string>
    ) => {
      state.signed_shareable_flower_link = action.payload;
    },
    resetSignedShareableFlower: (state: typeof initialState) => {
      state.signed_shareable_flower_link = null;
    },
  },
});

export const {
  setAmenities,
  clearAmenities,
  setSurveyDone,
  setScoreLayerMode,
  setFlowerOpen,
  resetFlower,
  setShareableFlowerKey,
  resetShareableFlowerKey,
  setSignedShareableFlower,
  resetSignedShareableFlower,
} = flower.actions;
export default flower.reducer;
