import { configureStore } from "@reduxjs/toolkit";

import networkReducer from "./base/network";
import notifierReducer from "./base/notifier";
import isochronesReducer from "./isochrones/isochrones-reducer";
import mapReducer from "./map/maps-reducer";

export const store = configureStore({
  reducer: {
    isochrones: isochronesReducer,
    network: networkReducer,
    notifier: notifierReducer,
    map: mapReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
