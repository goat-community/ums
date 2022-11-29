export type LatandLang = { lat: number; lng: number };

export type LonLatOutput = {
  lat: number;
  lon: number;
};
export type Point = {
  x: number;
  y: number;
};

export type LeafletLatLng =
  | {
      longitude: number;
      latitude: number;
    }
  | { lat: number; lng: number };
