/**
 * Herb sightings: photographed, located observations of the plants in our herb guide, from the
 * iNaturalist community. Only observations whose photos carry a Creative Commons license are
 * requested, so every photo we show can be shown with its credit.
 */

import { distanceKm, type LatLng } from "../trail-map/trailGuide";

const API = "https://api.inaturalist.org/v1/observations";

/** iNaturalist's Creative Commons photo licenses. "All rights reserved" photos are left out. */
const OPEN_LICENSES = ["cc0", "cc-by", "cc-by-nc", "cc-by-sa", "cc-by-nc-sa", "cc-by-nd", "cc-by-nc-nd"];

/** The most sightings one request returns. The newest come first. */
export const SIGHTINGS_LIMIT = 200;

/** How close to a trail a sighting has to be to count as "along" it. */
export const ALONG_TRAIL_KM = 0.25;

export type Quality = "research" | "needs_id";

export interface HerbPhoto {
  /** About 500 px on the long side, for the detail view. */
  src: string;
  /** About 240 px, for lists. */
  thumb: string;
  /** 75 px square, for map pins. */
  square: string;
  /** The photographer's credit and license, as iNaturalist words it. */
  credit: string;
}

export interface HerbSighting {
  id: number;
  url: string;
  point: LatLng;
  /** The observed taxon and all its ancestors, for matching to our herbs. */
  taxonIds: number[];
  scientificName: string;
  observedOn: string | null;
  placeName: string;
  quality: Quality;
  /** True when the observer or iNaturalist blurred the location, for example to protect a rare plant. */
  obscured: boolean;
  accuracyM: number | null;
  /** Always at least one. */
  photos: [HerbPhoto, ...HerbPhoto[]];
}

export interface Box {
  south: number;
  west: number;
  north: number;
  east: number;
}

export type SightingArea = { center: LatLng; radiusKm: number } | Box;

export interface SightingResults {
  sightings: HerbSighting[];
  /** How many sightings match in all, which can be more than were returned. */
  total: number;
}

export function sightingsUrl(area: SightingArea, taxonIds: number[], confirmedOnly: boolean): string {
  const params = new URLSearchParams({
    taxon_id: [...new Set(taxonIds)].join(","),
    photos: "true",
    photo_license: OPEN_LICENSES.join(","),
    // Leaves out garden and potted plants, which aren't something a hiker can visit.
    verifiable: "true",
    quality_grade: confirmedOnly ? "research" : "research,needs_id",
    order_by: "observed_on",
    order: "desc",
    per_page: String(SIGHTINGS_LIMIT),
  });
  if ("center" in area) {
    params.set("lat", area.center[0].toFixed(5));
    params.set("lng", area.center[1].toFixed(5));
    params.set("radius", String(area.radiusKm));
  } else {
    params.set("swlat", area.south.toFixed(5));
    params.set("swlng", area.west.toFixed(5));
    params.set("nelat", area.north.toFixed(5));
    params.set("nelng", area.east.toFixed(5));
  }
  return `${API}?${params}`;
}

interface ApiPhoto {
  url?: string;
  license_code?: string | null;
  attribution?: string;
}

interface ApiObservation {
  id: number;
  uri?: string;
  geojson?: { coordinates?: number[] } | null;
  taxon?: { id: number; name?: string; ancestor_ids?: number[] } | null;
  observed_on?: string | null;
  place_guess?: string | null;
  quality_grade?: string;
  obscured?: boolean;
  positional_accuracy?: number | null;
  photos?: ApiPhoto[];
}

function resize(url: string, size: "small" | "medium" | "square"): string {
  return url.replace(/\/(square|thumb|small|medium|large|original)\.(\w+)(\?|$)/, `/${size}.$2$3`);
}

function parsePhoto(photo: ApiPhoto): HerbPhoto | null {
  // Some observations mix licensed and unlicensed photos. Only the licensed ones are kept.
  if (!photo.url || !photo.license_code || !photo.attribution) return null;
  return {
    src: resize(photo.url, "medium"),
    thumb: resize(photo.url, "small"),
    square: resize(photo.url, "square"),
    credit: photo.attribution,
  };
}

export function parseSighting(raw: ApiObservation): HerbSighting | null {
  const coords = raw.geojson?.coordinates;
  if (!raw.taxon || !coords || coords.length !== 2) return null;
  const [lng, lat] = coords;
  if (typeof lat !== "number" || typeof lng !== "number" || !Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  const [cover, ...more] = (raw.photos ?? []).flatMap((p) => parsePhoto(p) ?? []);
  if (!cover) return null;
  const quality = raw.quality_grade === "research" ? "research" : raw.quality_grade === "needs_id" ? "needs_id" : null;
  if (!quality) return null;
  return {
    id: raw.id,
    url: raw.uri ?? `https://www.inaturalist.org/observations/${raw.id}`,
    point: [lat, lng],
    taxonIds: [...new Set([...(raw.taxon.ancestor_ids ?? []), raw.taxon.id])],
    scientificName: raw.taxon.name ?? "",
    observedOn: raw.observed_on ?? null,
    placeName: raw.place_guess?.trim() ?? "",
    quality,
    obscured: raw.obscured === true,
    accuracyM: typeof raw.positional_accuracy === "number" ? Math.round(raw.positional_accuracy) : null,
    photos: [cover, ...more],
  };
}

export function parseSightings(json: unknown): SightingResults {
  const data = json as { total_results?: number; results?: ApiObservation[] };
  const sightings = (data.results ?? []).flatMap((raw) => parseSighting(raw) ?? []);
  return { sightings, total: Math.max(data.total_results ?? 0, sightings.length) };
}

export async function findHerbSightings(
  area: SightingArea,
  taxonIds: number[],
  confirmedOnly: boolean,
  signal?: AbortSignal,
): Promise<SightingResults> {
  if (taxonIds.length === 0) return { sightings: [], total: 0 };
  const response = await fetch(sightingsUrl(area, taxonIds, confirmedOnly), {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error(`iNaturalist answered ${response.status}`);
  return parseSightings(await response.json());
}

/** A box around the trail, padded so sightings just off the path are included. */
export function trailBox(paths: LatLng[][], padKm = ALONG_TRAIL_KM): Box | null {
  const points = paths.flat();
  if (points.length === 0) return null;
  const lats = points.map((p) => p[0]);
  const lngs = points.map((p) => p[1]);
  const south = Math.min(...lats);
  const north = Math.max(...lats);
  const padLat = padKm / 111.32;
  const padLng = padKm / (111.32 * Math.max(0.01, Math.cos((((south + north) / 2) * Math.PI) / 180)));
  return {
    south: south - padLat,
    north: north + padLat,
    west: Math.min(...lngs) - padLng,
    east: Math.max(...lngs) + padLng,
  };
}

/** Distance in km from a point to the closest place on any of the paths. */
export function distanceToPathsKm(point: LatLng, paths: LatLng[][]): number {
  let best = Infinity;
  const cosLat = Math.cos((point[0] * Math.PI) / 180);
  // Flat projection around the point, in km. Plenty accurate over the length of a trail segment.
  const project = ([lat, lng]: LatLng): [number, number] => [
    (lng - point[1]) * 111.32 * cosLat,
    (lat - point[0]) * 111.32,
  ];
  for (const path of paths) {
    const only = path[0];
    if (path.length === 1 && only) best = Math.min(best, distanceKm(point, only));
    for (let i = 1; i < path.length; i++) {
      const a = path[i - 1];
      const b = path[i];
      if (!a || !b) continue;
      const [ax, ay] = project(a);
      const [bx, by] = project(b);
      const dx = bx - ax;
      const dy = by - ay;
      const lengthSq = dx * dx + dy * dy;
      const t = lengthSq === 0 ? 0 : Math.max(0, Math.min(1, -(ax * dx + ay * dy) / lengthSq));
      best = Math.min(best, Math.hypot(ax + t * dx, ay + t * dy));
    }
  }
  return best;
}

export function googleMapsSpotUrl([lat, lng]: LatLng): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat.toFixed(6)},${lng.toFixed(6)}`;
}
