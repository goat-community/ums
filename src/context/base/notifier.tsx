import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

/** Reducer */
const initialState = {
  msg: "" as string,
};

export const notifier = createSlice({
  name: "notifier",
  initialState,
  reducers: {
    setNotify: (
      state: typeof initialState,
      action: PayloadAction<typeof initialState>
    ) => {
      state.msg = action.payload.msg;
    },
    resetNotify: (state: typeof initialState) => {
      state.msg = initialState.msg;
    },
  },
});

export const { setNotify, resetNotify } = notifier.actions;
export default notifier.reducer;

/** Actions  */
export function notify(msg: string) {
  return (dispatch: CallableFunction) => {
    dispatch(setNotify({ msg }));
  };
}

export function close_notify() {
  return (dispatch: CallableFunction) => {
    dispatch(resetNotify());
  };
}
