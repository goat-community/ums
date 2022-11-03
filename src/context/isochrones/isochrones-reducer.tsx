import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

/** Reducer */
const initialState = {
  isochrone: null as string | null,
};

export const isochrone = createSlice({
  name: "isochrone",
  initialState,
  reducers: {
    setIsochrone: (state: typeof initialState, action: PayloadAction<string>) => {
      state.isochrone = action.payload;
    },
  },
});

export const { setIsochrone } = isochrone.actions;
export default isochrone.reducer;
