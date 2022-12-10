import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { PoisList } from "@types";

/** Reducer */
const initialState = {
  poi_features: {} as PoisList,
  persistance_date: "" as ReturnType<typeof Date>,
  active_pois: [] as string[],
};

export const pois = createSlice({
  name: "pois",
  initialState,
  reducers: {
    setPoiFeatures: (state: typeof initialState, action: PayloadAction<PoisList>) => {
      state.poi_features = action.payload;
    },
    setPersistanceDate: (state: typeof initialState, action: PayloadAction<string>) => {
      state.persistance_date = action.payload;
    },
    clearPois: (state: typeof initialState) => {
      state.poi_features = {};
    },
    setActivePois: (state: typeof initialState, action: PayloadAction<string[]>) => {
      state.active_pois = action.payload;
    },
    clearActivePois: (state: typeof initialState) => {
      state.active_pois = [];
    },
  },
});

export const {
  setPoiFeatures,
  setPersistanceDate,
  clearPois,
  setActivePois,
  clearActivePois,
} = pois.actions;
export default pois.reducer;
