import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@context";

export const get_poi_features = createSelector(
  (state: RootState) => state.poi,
  (view) => {
    const activeGroups = view.active_poi_groups;
    const config = view.pois_config;
    const activeCategories = [];
    if (!config || Object.keys(config).length === 0) return [];
    config.forEach((group) => {
      const groupName = Object.keys(group)[0];
      if (activeGroups.includes(groupName)) {
        const children = group[groupName].children;
        children.forEach((child) => {
          const categoryName = Object.keys(child)[0];
          activeCategories.push(categoryName);
        });
      }
    });
    const features = [];
    const featuresCategories = Object.keys(view.poi_features);
    featuresCategories.forEach((category) => {
      if (activeCategories.includes(category))
        features.push(...view.poi_features[category]);
    });
    return features;
  }
);

export const get_poi_groups = createSelector(
  (state: RootState) => state.poi.pois_config,
  (view) => {
    if (!view || Object.keys(view).length === 0) return {};
    const groups = {};
    view.forEach((group) => {
      const name = Object.keys(group)[0];
      const icon = Object.values(group)[0].icon;
      const color = Object.values(group)[0].color[0];
      groups[name] = { icon, color };
    });
    return groups;
  }
);
