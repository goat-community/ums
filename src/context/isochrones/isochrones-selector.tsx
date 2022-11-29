import { createSelector } from "@reduxjs/toolkit";

import jsolines from "@utils/jsolines";
import { fromPixel } from "@utils/map";

import { RootState } from "@context";

import { TRAVEL_TIME_PERCENTILES } from "@constants";

export function selectNearestPercentileIndex(requestedPercentile) {
  let percentileIndex = 0;
  let closestDiff = Infinity;
  // get the closest percentile
  TRAVEL_TIME_PERCENTILES.forEach((p, i) => {
    const currentDiff = Math.abs(p - requestedPercentile);
    if (currentDiff < closestDiff) {
      percentileIndex = i;
      closestDiff = currentDiff;
    }
  });

  return percentileIndex;
}

/**
 * SingleValuedSurface, width, height all come from selector defined below and
 * thus must be passed in one argument.
 */
export function computeIsochrone(
  singleValuedSurface,
  cutoff
): void | GeoJSON.Feature<GeoJSON.MultiPolygon> {
  if (singleValuedSurface == null) return null;

  const { surface, width, height, west, north, zoom } = singleValuedSurface;

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
export function computeSingleValuedSurface(travelTimeSurface, percentile) {
  if (travelTimeSurface == null) return null;
  const surface = new Uint8Array(travelTimeSurface.width * travelTimeSurface.height);
  const percentileIndex =
    travelTimeSurface.depth == 1 ? 0 : selectNearestPercentileIndex(percentile);
  // y on outside, loop in order, hope the CPU figures this out and prefetches
  for (let y = 0; y < travelTimeSurface.height; y++) {
    for (let x = 0; x < travelTimeSurface.width; x++) {
      const index = y * travelTimeSurface.width + x;
      surface[index] = travelTimeSurface.get(x, y, percentileIndex);
    }
  }

  return {
    ...travelTimeSurface,
    surface,
  };
}

export const selectTravelTimePercentile = (state: RootState) =>
  state.isochrones.travelTimePercentile || 0;

export const selectMaxTripDurationMinutes = (state: RootState) =>
  state.isochrones.maxTripDurationMinutes || 15;

const singleValuedSurface = createSelector(
  (state: RootState) => state.isochrones.travelTimeSurface,
  selectTravelTimePercentile,
  computeSingleValuedSurface
);

export default createSelector(
  singleValuedSurface,
  selectMaxTripDurationMinutes,
  computeIsochrone
);
