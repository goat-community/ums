/**
 * Pages
 */

export const PAGES = {};
export type PageKey = keyof typeof PAGES;

/**
 * Map
 */

export const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWFqa3Noa3VydGkiLCJhIjoiY2w5YWpqM3ZlMGE2ZDQ1bGVqaG9tNzJnayJ9._IU92hy-v_e4vckpDNFyAQ";
export const DEFAULT_ZOOM = 16;
export const DEFAULT_LATITUDE = 48.1351;
export const DEFAULT_LONGITUDE = 11.582;
export const PT_GRID_ZOOM_LEVEL = 9;
export const WALK_CYCLE_GRID_ZOOM_LEVEL = 13;

/**
 * Routing modes
 */
export const WALKING = "walking";
export const CYCLING = "cycling";
export const TRANSIT = "transit";

export const ALL_ROUTING_MODES = [WALKING, CYCLING, TRANSIT];

/**
 * Isochrone Request Default
 */
export const ISOCHRONE_REQUEST_DEFAULTS = {
  mode: WALKING,
  settings: { travel_time: 20, speed: 5, walking_profile: "standard" },
  starting_point: { input: [{ lat: 48.142755739044816, lon: 11.51517168901437 }] },
  scenario: { id: 0, modus: "default" },
  output: { type: "grid", resolution: 12 },
};
