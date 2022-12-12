import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { SCORE_MODE } from "@types";

import { parse_times_data } from "@utils/parse-times-data";

/** Reducer */
const initialState = {
  travel_time_surface: null,
  max_trip_duration_minutes: 5,
  travel_time_percentile: 50,
  mode: "walking",
  score_mode: SCORE_MODE.standard as SCORE_MODE,
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
    setMaxTripDurationMinutes: (
      state: typeof initialState,
      action: PayloadAction<number>
    ) => {
      state.max_trip_duration_minutes = action.payload;
    },
    clearIsochrone: (state: typeof initialState) => {
      state.max_trip_duration_minutes = initialState.max_trip_duration_minutes;
      state.travel_time_surface = initialState.travel_time_surface;
    },
    setIsochroneMode: (state: typeof initialState, action: PayloadAction<string>) => {
      state.mode = action.payload;
    },
    setScoreMode: (state: typeof initialState, action: PayloadAction<SCORE_MODE>) => {
      state.score_mode = action.payload;
    },
  },
});

export const {
  setTravelTimeSurface,
  setMaxTripDurationMinutes,
  clearIsochrone,
  setIsochroneMode,
  setScoreMode,
} = isochrone.actions;
export default isochrone.reducer;
