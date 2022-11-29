import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@context";

export const map_view_selector = createSelector(
  (state: RootState) => state.map.view,
  (view) => view
);

export const picked_point_selector = createSelector(
  (state: RootState) => state.map.picked_point,
  (view) => view
);
