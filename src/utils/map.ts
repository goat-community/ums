import { LonLatOutput, Point } from "@types";

/**
 * -----------------------LATLON => PIXELS FUNCTIONS -------------------------------
 */

/**
 * Pixels per tile.
 */
export const PIXELS_PER_TILE = 256;

// 2^z represents the tile number. Scale that by the number of pixels in each tile.
function zScale(z: number): number {
  return Math.pow(2, z) * PIXELS_PER_TILE;
}

// Converts from radians to degrees.
function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

export function fromPixel(pixel: Point, zoom: number): LonLatOutput {
  return {
    lat: pixelToLatitude(pixel.y, zoom),
    lon: pixelToLongitude(pixel.x, zoom),
  };
}

/**
 * Convert a pixel to it's longitude value given a zoom level.
 *
 * @param {number} x
 * @param {number} zoom
 * @return {number} longitude
 * @example
 * var lon = lonlat.pixelToLongitude(40000, 9) //= -70.13671875
 */
export function pixelToLongitude(x: number, zoom: number): number {
  return (x / zScale(zoom)) * 360 - 180;
}

/**
 * Convert a pixel to it's latitude value given a zoom level.
 *
 * @param {number} y
 * @param {number} zoom
 * @return {number} latitude
 * @example
 * var lat = lonlat.pixelToLatitude(50000, 9) //= 39.1982053488948
 */
export function pixelToLatitude(y: number, zoom: number): number {
  const latRad: number = Math.atan(Math.sinh(Math.PI * (1 - (2 * y) / zScale(zoom))));
  return toDegrees(latRad);
}
