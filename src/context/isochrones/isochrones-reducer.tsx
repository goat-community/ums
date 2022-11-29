import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { parseTimesData } from "@utils/parse-times-data";

import { ISOCHRONE_REQUEST_DEFAULTS } from "@constants";

/** Reducer */
const initialState = {
  travelTimeSurface: null,
  maxTripDurationMinutes: 15,
  travelTimePercentile: 0,
  requestsSettings: [{ ...ISOCHRONE_REQUEST_DEFAULTS }],
};

export const isochrone = createSlice({
  name: "isochrone",
  initialState,
  reducers: {
    setTravelTimeSurface: (
      state: typeof initialState,
      action: PayloadAction<ArrayBuffer>
    ) => {
      const isochroneSurface = parseTimesData(action.payload);
      state.travelTimeSurface = isochroneSurface;
    },
    setRequestSettings: (state: typeof initialState, action) => {
      state.requestsSettings = action.payload;
    },
    setMaxTripDurationMinutes: (state: typeof initialState, action) => {
      state.maxTripDurationMinutes = action.payload;
    },
  },
});

export const { setTravelTimeSurface, setRequestSettings, setMaxTripDurationMinutes } =
  isochrone.actions;
export default isochrone.reducer;
