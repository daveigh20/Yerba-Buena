import type { Lang } from "../../i18n/messages";

export type LatLng = [number, number];

export interface Origin {
  lat: number;
  lng: number;
  label: string;
}

export type Difficulty = "easy" | "moderate" | "challenging";
export type LengthChoice = "any" | "short" | "medium" | "long";
export type DifficultyChoice = "any" | Difficulty;
export type Sport = "hike" | "jogging";
export type TravelMode = "foot" | "car";

export interface TrailWay {
  name?: string;
  points: LatLng[];
}

export interface Trail {
  id: number;
  name: string;
  lengthKm: number;
  /** Hardest rating on the trail, or null when OpenStreetMap has no rating for it. */
  difficulty: Difficulty | null;
  paths: LatLng[][];
  /** The trail's connected parts, each an ordered list of ways, for following it on foot. */
  sections: TrailWay[][];
  /** The point on the trail closest to the visitor. */
  access: LatLng;
  distanceKm: number;
}

export interface Directions {
  distanceKm: number;
  minutes: number;
  line: LatLng[];
  steps: string[];
}

const EARTH_RADIUS_M = 6378137;
const TRAILS_API = "https://hiking.waymarkedtrails.org/api/v1";
const MAX_TRAILS = 12;
/** Name given to trails with no name or ref in OpenStreetMap. The page shows it translated. */
export const UNNAMED_TRAIL = "Unnamed trail";

export const RADIUS_OPTIONS = [5, 10, 20, 30, 50];

/** Komoot's official "Routes near a place" embed (https://www.komoot.com/b2b/embed). */
export function komootEmbedUrl(origin: Origin, sport: Sport, radiusKm: number): string {
  const params = new URLSearchParams({
    lat: origin.lat.toFixed(4),
    lng: origin.lng.toFixed(4),
    sport,
    name: origin.label,
    radius: String(radiusKm),
    layout: "map",
  });
  return `https://www.komoot.com/discover/embed?${params}`;
}

export function distanceKm([lat1, lng1]: LatLng, [lat2, lng2]: LatLng): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return (2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(a))) / 1000;
}

function mercatorToLatLng([x = 0, y = 0]: number[]): LatLng {
  const lat = ((2 * Math.atan(Math.exp(y / EARTH_RADIUS_M)) - Math.PI / 2) * 180) / Math.PI;
  const lng = ((x / EARTH_RADIUS_M) * 180) / Math.PI;
  return [lat, lng];
}

/** Bounding box around a point, in the Web Mercator metres the trails API expects. */
export function mercatorBox(lat: number, lng: number, radiusKm: number): string {
  const x = (lng * Math.PI * EARTH_RADIUS_M) / 180;
  const y = Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) * EARTH_RADIUS_M;
  // Web Mercator stretches distances away from the equator.
  const d = (radiusKm * 1000) / Math.cos((lat * Math.PI) / 180);
  return [x - d, y - d, x + d, y + d].map(Math.round).join(",");
}

const SAC_DIFFICULTY: Record<string, Difficulty> = {
  hiking: "easy",
  mountain_hiking: "moderate",
  demanding_mountain_hiking: "challenging",
  alpine_hiking: "challenging",
  demanding_alpine_hiking: "challenging",
  difficult_alpine_hiking: "challenging",
};
const DIFFICULTY_RANK: Difficulty[] = ["easy", "moderate", "challenging"];

interface TrailDetail {
  id: number;
  name?: string;
  ref?: string;
  tags?: Record<string, string>;
  route?: { length?: number } & Record<string, unknown>;
}

/** The API nests a route's ways in sections and forks, so walk the whole tree to find them. */
function collectWays(node: unknown, found: { coords: number[][]; sac?: string }[]): void {
  if (Array.isArray(node)) {
    node.forEach((child) => collectWays(child, found));
  } else if (node && typeof node === "object") {
    const obj = node as Record<string, unknown>;
    const geometry = obj.geometry as { type?: string; coordinates?: number[][] } | undefined;
    if (geometry?.type === "LineString" && geometry.coordinates) {
      found.push({ coords: geometry.coordinates, sac: (obj.tags as Record<string, string> | undefined)?.sac_scale });
      return;
    }
    Object.entries(obj).forEach(([key, value]) => {
      if (key !== "tags") collectWays(value, found);
    });
  }
}

interface RawWay {
  geometry?: { coordinates: number[][] };
  tags?: Record<string, string>;
  ways?: RawWay[];
  main?: RawWay[];
  forward?: RawWay[];
}

/** Ways in walking order. A stretch that splits by direction is followed the forward way. */
function orderedWays(items: RawWay[]): RawWay[] {
  return items.flatMap((item) => (item.geometry ? [item] : orderedWays(item.forward ?? item.ways ?? item.main ?? [])));
}

function linearSections(node: RawWay): RawWay[][] {
  if (node.geometry) return [[node]];
  if (node.ways) return [orderedWays(node.ways)];
  return (node.main ?? []).flatMap(linearSections);
}

export function parseTrail(detail: TrailDetail, from: LatLng): Trail | null {
  const ways: { coords: number[][]; sac?: string }[] = [];
  collectWays(detail.route, ways);
  if (ways.length === 0) return null;

  const paths = ways.map((way) => way.coords.map(mercatorToLatLng)).filter((path) => path.length > 0);
  if (paths.length === 0) return null;
  let access = from;
  let nearest = Infinity;
  for (const point of paths.flat()) {
    const d = distanceKm(from, point);
    if (d < nearest) {
      nearest = d;
      access = point;
    }
  }

  const ratings = [detail.tags?.sac_scale, ...ways.map((way) => way.sac)]
    .map((sac) => (sac ? SAC_DIFFICULTY[sac] : undefined))
    .filter((rating): rating is Difficulty => rating !== undefined);
  const difficulty = DIFFICULTY_RANK.filter((rating) => ratings.includes(rating)).pop() ?? null;

  return {
    id: detail.id,
    name: detail.name || detail.ref || UNNAMED_TRAIL,
    lengthKm: (detail.route?.length ?? 0) / 1000,
    difficulty,
    paths,
    sections: linearSections((detail.route ?? {}) as RawWay)
      .map((section) =>
        section
          .map((way) => ({ name: way.tags?.name, points: (way.geometry?.coordinates ?? []).map(mercatorToLatLng) }))
          .filter((way) => way.points.length > 0),
      )
      .filter((section) => section.length > 0),
    access,
    distanceKm: nearest,
  };
}

export function matchesChoices(trail: Trail, length: LengthChoice, difficulty: DifficultyChoice): boolean {
  const lengthOk =
    length === "any" ||
    (length === "short" && trail.lengthKm < 5) ||
    (length === "medium" && trail.lengthKm >= 5 && trail.lengthKm <= 15) ||
    (length === "long" && trail.lengthKm > 15);
  return lengthOk && (difficulty === "any" || trail.difficulty === difficulty);
}

async function getJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return (await res.json()) as T;
}

/** Turns a typed place into coordinates. Called on submit only, per Nominatim's usage policy. */
export async function findPlace(query: string, signal?: AbortSignal): Promise<Origin | null> {
  const params = new URLSearchParams({ q: query, format: "jsonv2", limit: "1" });
  const results = await getJson<{ lat: string; lon: string; name?: string; display_name: string }[]>(
    `https://nominatim.openstreetmap.org/search?${params}`,
    signal,
  );
  const place = results[0];
  return place ? { lat: Number(place.lat), lng: Number(place.lon), label: place.name || place.display_name } : null;
}

interface TrailSummary {
  type: string;
  id: number;
  group?: string;
}

/** Finds named walking trails, searching outward so the closest ones are kept. */
export async function findTrails(origin: Origin, radiusKm: number, signal?: AbortSignal): Promise<Trail[]> {
  const found = new Map<number, TrailSummary>();
  const rings = [...new Set([5, 10, 20, radiusKm].filter((r) => r <= radiusKm))];
  for (const ring of rings) {
    const { results } = await getJson<{ results: TrailSummary[] }>(
      `${TRAILS_API}/list/by_area?bbox=${mercatorBox(origin.lat, origin.lng, ring)}&limit=100`,
      signal,
    );
    results.filter((r) => r.type === "relation").forEach((r) => found.has(r.id) || found.set(r.id, r));
    if ([...found.values()].filter((r) => isLocal(r)).length >= MAX_TRAILS) break;
  }

  // National and international trails are skipped: their data runs to many megabytes.
  const all = [...found.values()];
  const local = all.filter(isLocal).slice(0, MAX_TRAILS);
  const regional = local.length < 4 ? all.filter((r) => r.group === "REG").slice(0, 3) : [];
  const picks = [...local, ...regional];

  const from: LatLng = [origin.lat, origin.lng];
  const trails: Trail[] = [];
  for (let i = 0; i < picks.length; i += 4) {
    const batch = await Promise.allSettled(
      picks.slice(i, i + 4).map((pick) => getJson<TrailDetail>(`${TRAILS_API}/details/relation/${pick.id}`, signal)),
    );
    if (signal?.aborted) return [];
    for (const result of batch) {
      if (result.status !== "fulfilled") continue;
      const trail = parseTrail(result.value, from);
      if (trail && trail.distanceKm <= radiusKm) trails.push(trail);
    }
  }
  return trails.sort((a, b) => a.distanceKm - b.distanceKm);
}

function isLocal(summary: TrailSummary): boolean {
  return !["INT", "NAT", "REG"].includes(summary.group ?? "");
}

interface RouteStep {
  name?: string;
  maneuver: { type: string; modifier?: string };
}

const ES_SIDE: Record<string, string> = { left: "a la izquierda", right: "a la derecha" };

function stepTextEs(step: RouteStep, trailName: string): string {
  const { type, modifier } = step.maneuver;
  const onto = step.name ? ` por ${step.name}` : "";
  switch (type) {
    case "depart":
      return step.name ? `Sal por ${step.name}` : "Sal desde tu ubicación";
    case "arrive":
      return `Llega a ${trailName}`;
    case "roundabout":
    case "rotary":
      return `Toma la glorieta${onto}`;
    default: {
      if (modifier === "straight" || !modifier) return `Sigue${onto}`;
      if (modifier === "uturn") return "Da vuelta en U";
      const side = ES_SIDE[modifier.replace("slight ", "").replace("sharp ", "")] ?? modifier;
      return `${modifier.startsWith("slight") ? "Mantente" : "Gira"} ${side}${onto}`;
    }
  }
}

const JA_SIDE: Record<string, string> = { left: "左", right: "右" };

function stepTextJa(step: RouteStep, trailName: string): string {
  const { type, modifier } = step.maneuver;
  const onto = step.name ? `、${step.name}を進む` : "";
  switch (type) {
    case "depart":
      return step.name ? `${step.name}から出発` : "現在地から出発";
    case "arrive":
      return `${trailName}に到着`;
    case "roundabout":
    case "rotary":
      return `ロータリーに入る${onto}`;
    default: {
      if (modifier === "straight" || !modifier) return step.name ? `${step.name}をそのまま進む` : "そのまま進む";
      if (modifier === "uturn") return "Uターンする";
      const side = JA_SIDE[modifier.replace("slight ", "").replace("sharp ", "")] ?? modifier;
      return `${modifier.startsWith("slight") ? `やや${side}に進む` : `${side}に曲がる`}${onto}`;
    }
  }
}

const ZH_SIDE: Record<string, string> = { left: "左", right: "右" };

function stepTextZh(step: RouteStep, trailName: string): string {
  const { type, modifier } = step.maneuver;
  const onto = step.name ? `，进入${step.name}` : "";
  switch (type) {
    case "depart":
      return step.name ? `从${step.name}出发` : "从你的位置出发";
    case "arrive":
      return `到达${trailName}`;
    case "roundabout":
    case "rotary":
      return `进入环岛${onto}`;
    default: {
      if (modifier === "straight" || !modifier) return step.name ? `沿${step.name}继续直行` : "继续直行";
      if (modifier === "uturn") return "掉头";
      const side = ZH_SIDE[modifier.replace("slight ", "").replace("sharp ", "")] ?? modifier;
      return `${modifier.startsWith("slight") ? `稍向${side}` : `向${side}转`}${onto}`;
    }
  }
}

export function stepText(step: RouteStep, trailName: string, lang: Lang = "en"): string {
  if (lang === "es") return stepTextEs(step, trailName);
  if (lang === "ja") return stepTextJa(step, trailName);
  if (lang === "zh") return stepTextZh(step, trailName);
  const { type, modifier } = step.maneuver;
  const onto = step.name ? ` onto ${step.name}` : "";
  switch (type) {
    case "depart":
      return step.name ? `Start on ${step.name}` : "Start from your location";
    case "arrive":
      return `Arrive at ${trailName}`;
    case "roundabout":
    case "rotary":
      return `Take the roundabout${onto}`;
    default:
      if (modifier === "straight" || !modifier) return `Continue${onto}`;
      if (modifier === "uturn") return "Make a U-turn";
      return `${modifier.startsWith("slight") ? "Bear" : "Turn"} ${modifier.replace("slight ", "").replace("sharp ", "")}${onto}`;
  }
}

export async function getDirections(
  from: LatLng,
  to: LatLng,
  mode: TravelMode,
  trailName: string,
  signal?: AbortSignal,
  lang: Lang = "en",
): Promise<Directions> {
  const service = mode === "foot" ? "routed-foot/route/v1/foot" : "routed-car/route/v1/driving";
  const points = `${from[1]},${from[0]};${to[1]},${to[0]}`;
  const data = await getJson<{
    routes?: {
      distance: number;
      duration: number;
      geometry: { coordinates: number[][] };
      legs: { steps: RouteStep[] }[];
    }[];
  }>(`https://routing.openstreetmap.de/${service}/${points}?overview=full&geometries=geojson&steps=true`, signal);
  const route = data.routes?.[0];
  if (!route) throw new Error("No route found");
  return {
    distanceKm: route.distance / 1000,
    minutes: Math.round(route.duration / 60),
    line: route.geometry.coordinates.map(([lng = 0, lat = 0]): LatLng => [lat, lng]),
    steps: route.legs.flatMap((leg) => leg.steps.map((step) => stepText(step, trailName, lang))),
  };
}

export function googleMapsUrl(from: LatLng, to: LatLng, mode: TravelMode): string {
  const params = new URLSearchParams({
    api: "1",
    origin: from.join(","),
    destination: to.join(","),
    travelmode: mode === "foot" ? "walking" : "driving",
  });
  return `https://www.google.com/maps/dir/?${params}`;
}

/** Rough boxes for the US areas covered by USGS aerial imagery: lower 48, Alaska, Hawaii, Puerto Rico. */
const USGS_COVERAGE = [
  { south: 24.5, north: 49.5, west: -125, east: -66.5 },
  { south: 51, north: 72, west: -170, east: -129 },
  { south: 18.5, north: 22.5, west: -161, east: -154.5 },
  { south: 17.5, north: 18.6, west: -68, east: -65 },
];

export function hasSatelliteImagery([lat, lng]: LatLng): boolean {
  return USGS_COVERAGE.some((box) => lat >= box.south && lat <= box.north && lng >= box.west && lng <= box.east);
}
