type Tuple<T, N extends number, R extends readonly T[] = []> = R["length"] extends N
  ? R
  : Tuple<T, N, readonly [T, ...R]>;

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
  mode: string;
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

export interface Accessibilities {
  Mobilitaetspunkte: Tuple<number, 15>[];
  atm: Tuple<number, 15>[];
  bakery: Tuple<number, 15>[];
  bank: Tuple<number, 15>[];
  bar: Tuple<number, 15>[];
  bike_sharing: Tuple<number, 15>[];
  bus_stop: Tuple<number, 15>[];
  butcher: Tuple<number, 15>[];
  cafe: Tuple<number, 15>[];
  car_sharing: Tuple<number, 15>[];
  charging_station: Tuple<number, 15>[];
  cinema: Tuple<number, 15>[];
  convenience: Tuple<number, 15>[];
  dentist: Tuple<number, 15>[];
  discount_supermarket: Tuple<number, 15>[];
  fast_food: Tuple<number, 15>[];
  general_practitioner: Tuple<number, 15>[];
  grundschule: Tuple<number, 15>[];
  gym: Tuple<number, 15>[];
  gymnasium: Tuple<number, 15>[];
  hauptschule_mittelschule: Tuple<number, 15>[];
  hotel: Tuple<number, 15>[];
  kindergarten: Tuple<number, 15>[];
  marketplace: Tuple<number, 15>[];
  museum: Tuple<number, 15>[];
  nursery: Tuple<number, 15>[];
  organic_supermarket: Tuple<number, 15>[];
  park: Tuple<number, 15>[];
  pharmacy: Tuple<number, 15>[];
  playground: Tuple<number, 15>[];
  population: Tuple<number, 15>[];
  post_box: Tuple<number, 15>[];
  post_office: Tuple<number, 15>[];
  pub: Tuple<number, 15>[];
  realschule: Tuple<number, 15>[];
  recycling: Tuple<number, 15>[];
  restaurant: Tuple<number, 15>[];
  subway_entrance: Tuple<number, 15>[];
  supermarket: Tuple<number, 15>[];
  tram_stop: Tuple<number, 15>[];
}

export enum SCORE_MODE {
  personal = "personal",
  standard = "standard",
}
