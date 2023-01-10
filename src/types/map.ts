import { FitBoundsOptions, LngLatBoundsLike } from "mapbox-gl";

export interface LonLatOutput {
  lat: number;
  lon: number;
}

export interface popupInfo {
  title: string;
  longitude: string;
  latitude: string;
  uid: string;
  content: unknown;
}
export interface Point {
  x: number;
  y: number;
}

export type LeafletLatLng =
  | {
      longitude: number;
      latitude: number;
    }
  | { lat: number; lng: number };

export interface MapView {
  latitude: number;
  longitude: number;
  zoom: number;
  bearing?: number;
  pitch?: number;
  bounds?: LngLatBoundsLike;
  fitBoundsOptions?: FitBoundsOptions;
}
