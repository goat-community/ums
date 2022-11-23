import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { notify } from "./notifier";

/** Reducer */
const initialState = {
  loading: false,
} as {
  loading: boolean;
};

export const network = createSlice({
  name: "network",
  initialState,
  reducers: {
    setNetworkState: (
      state: typeof initialState,
      action: PayloadAction<typeof initialState>
    ) => {
      state.loading = action.payload.loading;
    },
    resetNetworkState: (state: typeof initialState) => {
      state.loading = false;
    },
  },
});

export const { setNetworkState, resetNetworkState } = network.actions;
export default network.reducer;

/** Actions  */
//  This HOF will handle network state changes
export function networkStateHandler(req: CallableFunction) {
  return async (dispatch: CallableFunction) => {
    dispatch(setNetworkState({ loading: true }));
    try {
      await req();
      dispatch(resetNetworkState());
    } catch (e) {
      dispatch(
        setNetworkState({
          loading: false,
        })
      );
      // notify error message
      dispatch(notify("Error occured!"));
    }
  };
}
