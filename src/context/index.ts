import { configureStore } from "@reduxjs/toolkit";

import networkReducer from "./base/network";
import notifierReducer from "./base/notifier";
import flowersReducer from "./flower/flowers-reducer";
import isochronesReducer from "./isochrones/isochrones-reducer";
import mapReducer from "./map/maps-reducer";
import openersReducer from "./openers/openers-reducer";
import poisReducer from "./pois/pois-reducer";

export const store = configureStore({
  reducer: {
    isochrones: isochronesReducer,
    network: networkReducer,
    notifier: notifierReducer,
    map: mapReducer,
    flower: flowersReducer,
    poi: poisReducer,
    openers: openersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
