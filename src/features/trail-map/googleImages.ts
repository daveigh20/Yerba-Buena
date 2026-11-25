import type { Lang } from "../../i18n/messages";
import type { LatLng, Trail } from "./trailGuide";

/**
 * Google Maps Static API key. Google's terms require images to be requested live with a key
 * (no saving or re-hosting) and not shown with or near a non-Google map.
 */
export const GOOGLE_MAPS_KEY: string | undefined = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || undefined;

const MAX_PATH_POINTS = 500;

export interface GoogleImage {
  title: string;
  alt: string;
  src: string;
}

function encodeValue(value: number): string {
  let shifted = value < 0 ? ~(value << 1) : value << 1;
  let out = "";
  while (shifted >= 0x20) {
    out += String.fromCharCode((0x20 | (shifted & 0x1f)) + 63);
    shifted >>>= 5;
  }
  return out + String.fromCharCode(shifted + 63);
}

/** Google's encoded polyline format, which keeps long trails within the URL length limit. */
export function encodePolyline(points: LatLng[]): string {
  let lastLat = 0;
  let lastLng = 0;
  let out = "";
  for (const [lat, lng] of points) {
    const roundedLat = Math.round(lat * 1e5);
    const roundedLng = Math.round(lng * 1e5);
    out += encodeValue(roundedLat - lastLat) + encodeValue(roundedLng - lastLng);
    lastLat = roundedLat;
    lastLng = roundedLng;
  }
  return out;
}

export function thinPoints(points: LatLng[], max: number): LatLng[] {
  if (points.length <= max) return points;
  const step = (points.length - 1) / (max - 1);
  return Array.from({ length: max }, (_, i) => points[Math.round(i * step)] as LatLng);
}

function staticMapUrl(key: string, trail: Trail, options: Record<string, string>): string {
  const lines = trail.sections.map((section) =>
    section.flatMap((way, i) => (i === 0 ? way.points : way.points.slice(1))),
  );
  const perLine = Math.max(2, Math.floor(MAX_PATH_POINTS / Math.max(lines.length, 1)));
  const params = new URLSearchParams({ size: "640x400", scale: "2", ...options });
  for (const line of lines) {
    params.append("path", `color:0xffd23fff|weight:4|enc:${encodePolyline(thinPoints(line, perLine))}`);
  }
  params.append("markers", `color:green|label:J|${trail.access.join(",")}`);
  params.append("key", key);
  return `https://maps.googleapis.com/maps/api/staticmap?${params}`;
}

const IMAGE_TEXT = {
  en: {
    whole: "The whole trail from above",
    wholeAlt: (name: string) => `Satellite image of ${name} with the route drawn in yellow`,
    terrain: "Terrain",
    terrainAlt: (name: string) => `Terrain map of ${name} with the route drawn in yellow`,
    join: "Where you join the trail",
    joinAlt: (name: string) => `Close-up satellite image of the point where you join ${name}`,
  },
  es: {
    whole: "Todo el sendero desde arriba",
    wholeAlt: (name: string) => `Imagen satelital de ${name} con la ruta marcada en amarillo`,
    terrain: "Relieve",
    terrainAlt: (name: string) => `Mapa de relieve de ${name} con la ruta marcada en amarillo`,
    join: "Donde entras al sendero",
    joinAlt: (name: string) => `Imagen satelital de cerca del punto donde entras a ${name}`,
  },
  ja: {
    whole: "上空から見たトレイル全体",
    wholeAlt: (name: string) => `ルートを黄色で示した${name}の航空写真`,
    terrain: "地形",
    terrainAlt: (name: string) => `ルートを黄色で示した${name}の地形図`,
    join: "トレイルに入る地点",
    joinAlt: (name: string) => `${name}に入る地点を拡大した航空写真`,
  },
  zh: {
    whole: "从空中俯瞰整条步道",
    wholeAlt: (name: string) => `${name}的卫星图像，路线以黄色标出`,
    terrain: "地形",
    terrainAlt: (name: string) => `${name}的地形图，路线以黄色标出`,
    join: "你进入步道的地点",
    joinAlt: (name: string) => `你进入${name}的地点的卫星近景图`,
  },
} satisfies Record<Lang, unknown>;

export function trailImages(key: string, trail: Trail, lang: Lang = "en"): GoogleImage[] {
  const t = IMAGE_TEXT[lang];
  return [
    {
      title: t.whole,
      alt: t.wholeAlt(trail.name),
      src: staticMapUrl(key, trail, { maptype: "hybrid" }),
    },
    {
      title: t.terrain,
      alt: t.terrainAlt(trail.name),
      src: staticMapUrl(key, trail, { maptype: "terrain" }),
    },
    {
      title: t.join,
      alt: t.joinAlt(trail.name),
      src: staticMapUrl(key, trail, { maptype: "satellite", center: trail.access.join(","), zoom: "17" }),
    },
  ];
}

/** Opens Google Maps itself in satellite view. Needs no API key. */
export function googleSatelliteUrl(point: LatLng): string {
  const params = new URLSearchParams({
    api: "1",
    map_action: "map",
    center: point.join(","),
    zoom: "16",
    basemap: "satellite",
  });
  return `https://www.google.com/maps/@?${params}`;
}
