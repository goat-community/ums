import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { LatandLang } from "@types";

/** Reducer */
const initialState = {
  picking_mode: false as boolean,
  picked_point: null as LatandLang | null,
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
  },
});

export const { setPickingMode, setPickedPoint } = map.actions;
export default map.reducer;
