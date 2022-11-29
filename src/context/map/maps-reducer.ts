import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { LatandLang, MapView } from "@types";

/** Reducer */
const initialState = {
  picking_mode: false as boolean,
  picked_point: null as LatandLang | null,
  view: {
    latitude: 48.13,
    longitude: 11.58,
    zoom: 12,
    bearing: 0,
    pitch: 0,
  } as MapView,
};

export const map = createSlice({
  name: "map",
  initialState,
  reducers: {
    setPickingMode: (state: typeof initialState, action: PayloadAction<boolean>) => {
      state.picking_mode = action.payload;
    },
    setPickedPoint: (
      state: typeof initialState,
      action: PayloadAction<LatandLang | null>
    ) => {
      state.picked_point = action.payload;
    },
    setMapView: (
      state: typeof initialState,
      action: PayloadAction<typeof initialState.view>
    ) => {
      state.view = action.payload;
    },
  },
});

export const { setPickingMode, setPickedPoint, setMapView } = map.actions;
export default map.reducer;
