import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { parse_times_data } from "@utils/parse-times-data";

import { ISOCHRONE_REQUEST_DEFAULTS } from "@constants";

/** Reducer */
const initialState = {
  travel_time_surface: null,
  max_trip_duration_minutes: 5,
  travel_time_percentile: 0,
  requests_settings: [{ ...ISOCHRONE_REQUEST_DEFAULTS }],
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
    setRequestSettings: (state: typeof initialState, action) => {
      state.requests_settings = action.payload;
    },
    setMaxTripDurationMinutes: (state: typeof initialState, action) => {
      state.max_trip_duration_minutes = action.payload;
    },
    clearIsochrone: (state: typeof initialState) => {
      state.max_trip_duration_minutes = initialState.max_trip_duration_minutes;
      state.requests_settings = initialState.requests_settings;
      state.travel_time_surface = initialState.travel_time_surface;
    },
  },
});

export const {
  setTravelTimeSurface,
  setRequestSettings,
  setMaxTripDurationMinutes,
  clearIsochrone,
} = isochrone.actions;
export default isochrone.reducer;
