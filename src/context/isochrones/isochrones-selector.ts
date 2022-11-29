import { createSelector } from "@reduxjs/toolkit";

import jsolines from "@utils/jsolines";
import { fromPixel } from "@utils/map";

import { RootState } from "@context";

import { TRAVEL_TIME_PERCENTILES } from "@constants";

export function select_nearest_percentile_index(requested_percentile) {
  let percentile_index = 0;
  let closest_diff = Infinity;
  // get the closest percentile
  TRAVEL_TIME_PERCENTILES.forEach((p, i) => {
    const current_diff = Math.abs(p - requested_percentile);
    if (current_diff < closest_diff) {
      percentile_index = i;
      closest_diff = current_diff;
    }
  });

  return percentile_index;
}

/**
 * Single_valued_surface, width, height all come from selector defined below and
 * thus must be passed in one argument.
 */
export function compute_isochrone(
  single_valued_surface,
  cutoff
): void | GeoJSON.Feature<GeoJSON.MultiPolygon> {
  if (single_valued_surface == null) return null;

  const { surface, width, height, west, north, zoom } = single_valued_surface;

  return jsolines({
    surface,
    width,
    height,
    cutoff,
    project: ([x, y]) => {
      const ll = fromPixel({ x: x + west, y: y + north }, zoom);
      return [ll.lon, ll.lat];
    },
  });
}

/**
 * The travel time surface contains percentiles, compute a surface with a single
 * percentile for jsolines done separately from isochrone computation because it
 * can be saved when the isochrone cutoff changes when put in a separate
 * selector, memoization will handle this for us.
 */
export function compute_single_valued_surface(travel_time_surface, percentile) {
  if (travel_time_surface == null) return null;
  const surface = new Uint8Array(travel_time_surface.width * travel_time_surface.height);
  const percentile_index =
    travel_time_surface.depth == 1 ? 0 : select_nearest_percentile_index(percentile);
  // y on outside, loop in order, hope the CPU figures this out and prefetches
  for (let y = 0; y < travel_time_surface.height; y++) {
    for (let x = 0; x < travel_time_surface.width; x++) {
      const index = y * travel_time_surface.width + x;
      surface[index] = travel_time_surface.get(x, y, percentile_index);
    }
  }

  return {
    ...travel_time_surface,
    surface,
  };
}

export const selectravel_time_percentile = (state: RootState) =>
  state.isochrones.travel_time_percentile || 0;

export const select_max_trip_duration_minutes = (state: RootState) =>
  state.isochrones.max_trip_duration_minutes || 15;

const single_valued_surface = createSelector(
  (state: RootState) => state.isochrones.travel_time_surface,
  selectravel_time_percentile,
  compute_single_valued_surface
);

export const isochrones_selector = createSelector(
  single_valued_surface,
  select_max_trip_duration_minutes,
  compute_isochrone
);
