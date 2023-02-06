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
export const API_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE5OTEwMzA4NzgsInN1YiI6IjE1Iiwic2NvcGVzIjpbXX0.nT182uu8EtlI4kRDMEX1VzLq4VYKTDKCdJu8MbKlfec";
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
 * Percentiles of travel time to request from the backend. This is for
 * TRAVEL_TIME_SURFACE requests.
 */
export const TRAVEL_TIME_PERCENTILES = [5, 25, 50, 75, 95];
/**
 * Isochrone Request Default
 */
export const ISOCHRONE_REQUEST_DEFAULTS = {
  walking: {
    mode: "walking",
    settings: { travel_time: 15, speed: 5, walking_profile: "standard" },
    starting_point: { input: [{ lat: 48.13, lon: 11.58 }] },
    scenario: { id: 0, modus: "default" },
    output: { type: "grid", resolution: 13 },
  },
  cycling: {
    mode: "cycling",
    settings: { travel_time: 15, speed: 15, cycling_profile: "standard" },
    starting_point: { input: [{ lat: 48.13, lon: 11.58 }] },
    scenario: { id: 0, modus: "default" },
    output: { type: "grid", resolution: 13 },
  },
  transit: {
    mode: "transit",
    settings: {
      travel_time: 60,
      transit_modes: ["bus", "tram", "subway", "rail"],
      weekday: 0, // Monday`
      access_mode: "walk",
      egress_mode: "walk",
      bike_traffic_stress: 4,
      from_time: 25200, // 7am
      to_time: 32400, // 9am
      max_rides: 4,
      max_bike_time: 20,
      max_walk_time: 20,
      percentiles: [5, 25, 50, 75, 95],
      monte_carlo_draws: 200,
    },
    starting_point: { input: [{ lat: 48.14134178167768, lon: 11.591070826353457 }] },
    scenario: { id: 0, modus: "default" },
    output: { type: "grid", resolution: 9 },
  },
};

export const POIS = "POIS";
export const INDICATOR_OEV_GUETEKLASSEN = "INDICATOR_OEV_GUETEKLASSEN";
export const PERSISTANCE_DATE = "PERSISTANCE_DATE";
