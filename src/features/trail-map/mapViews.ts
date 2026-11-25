/** Base map styles for the trail and herb maps. */

import { hasSatelliteImagery, type LatLng } from "./trailGuide";

export type MapView = "map" | "satellite" | "terrain";

export interface MapStyle {
  url: string;
  attribution: string;
  maxNativeZoom: number;
}

export const MAP_VIEWS: Record<MapView, MapStyle> = {
  map: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxNativeZoom: 19,
  },
  // Sharp, public-domain aerial photos, but only over the US. See `hasSatelliteImagery`.
  satellite: {
    url: "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}",
    attribution: 'Imagery: <a href="https://www.usgs.gov/">U.S. Geological Survey</a>',
    maxNativeZoom: 16,
  },
  terrain: {
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution:
      'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, SRTM | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    maxNativeZoom: 17,
  },
};

/**
 * Satellite imagery for the whole world: EOX's Sentinel-2 cloudless 2016 mosaic, which is
 * licensed CC BY 4.0. At 10 m per pixel it's good for seeing forests, mountains, and coasts,
 * but blurry up close, so US maps use the sharper USGS photos instead.
 */
export const WORLD_SATELLITE: MapStyle = {
  url: "https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless_3857/default/g/{z}/{y}/{x}.jpg",
  attribution:
    '<a href="https://s2maps.eu">Sentinel-2 cloudless</a> by <a href="https://eox.at">EOX IT Services GmbH</a> (contains modified Copernicus Sentinel data 2016, <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>)',
  maxNativeZoom: 14,
};

/** The tiles for a view. Satellite uses US aerial photos when the map is over the US, world imagery otherwise. */
export function mapStyle(view: MapView, at: LatLng | null): MapStyle {
  if (view === "satellite" && !(at && hasSatelliteImagery(at))) return WORLD_SATELLITE;
  return MAP_VIEWS[view];
}

export const ALL_VIEWS: MapView[] = ["map", "satellite", "terrain"];
