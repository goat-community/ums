import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@context";

export const active_amenities_selector = createSelector(
  (state: RootState) => state.flower.amenities,
  (view) => {
    return Object.keys(view)
      .filter((k) => view[k] != null)
      .reduce((a, k) => ({ ...a, [k]: view[k] }), {});
  }
);
