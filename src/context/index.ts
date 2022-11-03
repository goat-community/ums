import { configureStore } from "@reduxjs/toolkit";

import networkReducer from "./base/network";
import notifierReducer from "./base/notifier";
import isochronesReducer from "./isochrones/isochrones-reducer";

export const store = configureStore({
  reducer: {
    isochrones: isochronesReducer,
    network: networkReducer,
    notifier: notifierReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
