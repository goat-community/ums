export enum TRAVEL_MODES {
  walking = "walking",
  cycling = "cycling",
  transit = "transit",
}

export type TRAVEL_MODE =
  | TRAVEL_MODES.walking
  | TRAVEL_MODES.cycling
  | TRAVEL_MODES.transit;

export interface IsochroneParams {
  mode: TRAVEL_MODE;
  settings: {
    travel_time: number;
    speed: number;
    walking_profile: string;
  };
  starting_point: {
    input: {
      lat: number;
      lon: number;
    }[];
  };
  scenario: {
    id: number;
    modus: string;
  };
  output: {
    type: string;
    resolution: number;
  };
}

export interface GridHeader {
  zoom: number;
  west: number;
  north: number;
  width: number;
  height: number;
}

export interface AccessGridHeader extends GridHeader {
  depth: number;
  version: number;
}

export type AccessGridMetadata = Record<string, unknown>;

export interface AccessGrid extends AccessGridHeader, AccessGridMetadata {
  data: Int32Array;
  errors: unknown[];
  warnings: unknown;
  contains(x: number, y: number, z: number): boolean;
  get(x: number, y: number, z: number): number;
}
