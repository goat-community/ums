import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

/** Reducer */
const initialState = {
  flower_open: false as boolean,
};

export const openers = createSlice({
  name: "openers",
  initialState,
  reducers: {
    open: (state: typeof initialState, action: PayloadAction<string>) => {
      state[action.payload] = true;
    },
    close: (state: typeof initialState, action: PayloadAction<string>) => {
      state[action.payload] = false;
    },
  },
});

export const { open, close } = openers.actions;
export default openers.reducer;
