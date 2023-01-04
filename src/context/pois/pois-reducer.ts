import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { PoisConfig, PoisList } from "@types";

/** Reducer */
const initialState = {
  pois_config: {} as PoisConfig,
  poi_features: {} as PoisList,
  persistance_date: "" as ReturnType<typeof Date>,
  active_poi_groups: [] as string[],
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
      state.active_poi_groups = action.payload;
    },
    clearActivePois: (state: typeof initialState) => {
      state.active_poi_groups = [];
    },
    setPoiConfig: (state: typeof initialState, action: PayloadAction<PoisConfig>) => {
      state.pois_config = action.payload;
    },
  },
});

export const {
  setPoiFeatures,
  setPersistanceDate,
  clearPois,
  setActivePois,
  clearActivePois,
  setPoiConfig,
} = pois.actions;
export default pois.reducer;
