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

export interface ReverseAddress {
  display_name: string;
  address: {
    city: string;
    city_district: string;
    country: string;
    country_code: string;
    house_number: string;
    postcode: string;
    road: string;
    state: string;
    suburb: string;
  };
}
