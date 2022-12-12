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

export const map_layers_selector = createSelector(
  (state: RootState) => state.map.layers,
  (view) => view
);

export const map_layers_list_selector = createSelector(
  (state: RootState) => state.map.layers,
  (view) => {
    const layerList = Object.keys(view).map((key) => {
      return {
        value: key,
        label: view[key].title || key,
        visibility: view[key].visibility,
      };
    });
    // layerList.unshift({ value: "none", label: "None" });
    return layerList;
  }
);

export const study_area_selector = createSelector(
  (state: RootState) => state.map.studyArea,
  (view) => view
);

export const view_bounds_selector = createSelector(
  (state: RootState) => state.map.viewBounds,
  (view) => view
);
