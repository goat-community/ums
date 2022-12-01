import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { parse_times_data } from "@utils/parse-times-data";

/** Reducer */
const initialState = {
  travel_time_surface: null,
  max_trip_duration_minutes: 5,
  travel_time_percentile: 50,
  mode: "walking",
};

export const isochrone = createSlice({
  name: "isochrone",
  initialState,
  reducers: {
    setTravelTimeSurface: (
      state: typeof initialState,
      action: PayloadAction<ArrayBuffer>
    ) => {
      const isochroneSurface = parse_times_data(action.payload);
      state.travel_time_surface = isochroneSurface;
    },
    setMaxTripDurationMinutes: (state: typeof initialState, action) => {
      state.max_trip_duration_minutes = action.payload;
    },
    clearIsochrone: (state: typeof initialState) => {
      state.max_trip_duration_minutes = initialState.max_trip_duration_minutes;
      state.travel_time_surface = initialState.travel_time_surface;
    },
    setIsochroneMode: (state: typeof initialState, action) => {
      state.mode = action.payload;
    },
  },
});

export const {
  setTravelTimeSurface,
  setMaxTripDurationMinutes,
  clearIsochrone,
  setIsochroneMode,
} = isochrone.actions;
export default isochrone.reducer;
