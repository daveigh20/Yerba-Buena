import type { Lang } from "../../i18n/messages";
import { distanceKm, type LatLng, type Trail, type TrailWay } from "./trailGuide";

export interface Hike {
  steps: string[];
  distanceKm: number;
  isLoop: boolean;
  line: LatLng[];
  end: LatLng;
  /** False when the visitor joins at an end of the trail, so there is only one way to go. */
  canReverse: boolean;
  /** True when the trail has separate parts and these directions cover only one of them. */
  isPartOfTrail: boolean;
}

const LOOP_GAP_KM = 0.1;
const MIN_LEG_KM = 0.05;
const SHORT_UNNAMED_KM = 0.1;
const TURN_SAMPLE_KM = 0.03;
const COMPASS: Record<Lang, string[]> = {
  en: ["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest"],
  es: ["norte", "noreste", "este", "sureste", "sur", "suroeste", "oeste", "noroeste"],
};

const WORDS = {
  en: {
    continue: "Continue",
    bear: (side: string) => `Bear ${side}`,
    turn: (side: string) => `Turn ${side}`,
    sharp: (side: string) => `Make a sharp ${side}`,
    left: "left",
    right: "right",
    path: "the path",
    head: (heading: string, name: string, distance: string) => `Head ${heading} on ${name} for ${distance}`,
    next: (turn: string, name: string, distance: string) => `${turn} onto ${name} for ${distance}`,
    back: "You're back where you joined the trail",
    end: (trail: string) => `Reach the end of ${trail}, then return the way you came`,
  },
  es: {
    continue: "Sigue",
    bear: (side: string) => `Mantente ${side}`,
    turn: (side: string) => `Gira ${side}`,
    sharp: (side: string) => `Gira bruscamente ${side}`,
    left: "a la izquierda",
    right: "a la derecha",
    path: "el camino",
    head: (heading: string, name: string, distance: string) => `Ve hacia el ${heading} por ${name} durante ${distance}`,
    next: (turn: string, name: string, distance: string) => `${turn} hacia ${name} durante ${distance}`,
    back: "Volviste al punto donde entraste al sendero",
    end: (trail: string) => `Llega al final de ${trail} y regresa por donde viniste`,
  },
} satisfies Record<Lang, unknown>;

function lengthKm(points: LatLng[]): number {
  let total = 0;
  for (let i = 1; i < points.length; i++) total += distanceKm(points[i - 1] as LatLng, points[i] as LatLng);
  return total;
}

function bearing([lat1, lng1]: LatLng, [lat2, lng2]: LatLng): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLng = toRad(lng2 - lng1);
  const y = Math.sin(dLng) * Math.cos(toRad(lat2));
  const x =
    Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) - Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLng);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

/** The first point at least `km` along the line, or its last point if the line is shorter. */
function pointAlong(points: LatLng[], km: number): LatLng {
  let walked = 0;
  for (let i = 1; i < points.length; i++) {
    walked += distanceKm(points[i - 1] as LatLng, points[i] as LatLng);
    if (walked >= km) return points[i] as LatLng;
  }
  return points[points.length - 1] as LatLng;
}

function turnPhrase(incoming: LatLng[], outgoing: LatLng[], lang: Lang): string {
  const w = WORDS[lang];
  const junction = outgoing[0] as LatLng;
  const before = pointAlong([...incoming].reverse(), TURN_SAMPLE_KM);
  const after = pointAlong(outgoing, TURN_SAMPLE_KM);
  const change = ((bearing(junction, after) - bearing(before, junction) + 540) % 360) - 180;
  const side = change < 0 ? w.left : w.right;
  const size = Math.abs(change);
  if (size < 25) return w.continue;
  if (size < 60) return w.bear(side);
  if (size < 140) return w.turn(side);
  return w.sharp(side);
}

export function formatDistance(km: number): string {
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
}

const reverseWay = (way: TrailWay): TrailWay => ({ name: way.name, points: [...way.points].reverse() });
const hasLength = (way: TrailWay) => way.points.length >= 2;

/** Merges ways into named legs, so a hiker gets one instruction per trail rather than per map segment. */
function toLegs(ways: TrailWay[]): TrailWay[] {
  const legs: TrailWay[] = [];
  ways.forEach((way, i) => {
    const previous = legs[legs.length - 1];
    const isShort = lengthKm(way.points) < SHORT_UNNAMED_KM;
    const name = way.name ?? (isShort ? (previous?.name ?? ways.slice(i + 1).find((w) => w.name)?.name) : undefined);
    if (previous && previous.name === name) previous.points.push(...way.points.slice(1));
    else legs.push({ name, points: [...way.points] });
  });
  return legs;
}

function closestPosition(trail: Trail): { section: TrailWay[]; way: number; point: number } | null {
  let best: { section: TrailWay[]; way: number; point: number } | null = null;
  let nearest = Infinity;
  for (const section of trail.sections) {
    section.forEach((way, wayIndex) => {
      way.points.forEach((point, pointIndex) => {
        const d = distanceKm(trail.access, point);
        if (d < nearest) {
          nearest = d;
          best = { section, way: wayIndex, point: pointIndex };
        }
      });
    });
  }
  return best;
}

/**
 * Directions along the trail from where the visitor joins it. Linear trails head toward the
 * farther end, and loops go all the way round. `reverse` picks the other direction.
 */
export function buildHike(trail: Trail, reverse = false, lang: Lang = "en"): Hike | null {
  const w = WORDS[lang];
  const position = closestPosition(trail);
  if (!position) return null;
  const { section, way: wayIndex, point: pointIndex } = position;
  const current = section[wayIndex] as TrailWay;

  const ahead: TrailWay[] = [
    { name: current.name, points: current.points.slice(pointIndex) },
    ...section.slice(wayIndex + 1),
  ].filter(hasLength);
  const behind: TrailWay[] = [
    { name: current.name, points: current.points.slice(0, pointIndex + 1) },
    ...section.slice(0, wayIndex).reverse(),
  ]
    .filter(hasLength)
    .map(reverseWay);

  const sectionStart = section[0]?.points[0] as LatLng;
  const lastWay = section[section.length - 1] as TrailWay;
  const sectionEnd = lastWay.points[lastWay.points.length - 1] as LatLng;
  const isLoop = distanceKm(sectionStart, sectionEnd) <= LOOP_GAP_KM && ahead.length + behind.length > 1;

  const legLength = (ways: TrailWay[]) => ways.reduce((sum, way) => sum + lengthKm(way.points), 0);
  let route: TrailWay[];
  let canReverse: boolean;
  if (isLoop) {
    // Round the loop: on to the end of the map data, then from its start back to where you joined.
    const clockwise = [...ahead, ...[...behind].reverse().map(reverseWay)];
    route = reverse ? [...clockwise].reverse().map(reverseWay) : clockwise;
    canReverse = true;
  } else {
    const [longer, shorter] = legLength(ahead) >= legLength(behind) ? [ahead, behind] : [behind, ahead];
    canReverse = legLength(shorter) >= MIN_LEG_KM;
    route = reverse && canReverse ? shorter : longer;
  }
  if (route.length === 0) return null;

  const legs = toLegs(route);
  const label = (leg: TrailWay) => leg.name ?? w.path;
  const first = legs[0] as TrailWay;
  const heading = COMPASS[lang][Math.round(bearing(first.points[0] as LatLng, pointAlong(first.points, TURN_SAMPLE_KM)) / 45) % 8];
  const steps = legs.map((leg, i) => {
    const distance = formatDistance(lengthKm(leg.points));
    if (i === 0) return w.head(heading ?? "", label(leg), distance);
    return w.next(turnPhrase((legs[i - 1] as TrailWay).points, leg.points, lang), label(leg), distance);
  });
  steps.push(isLoop ? w.back : w.end(trail.name));

  const line = legs.flatMap((leg, i) => (i === 0 ? leg.points : leg.points.slice(1)));
  return {
    steps,
    distanceKm: lengthKm(line),
    isLoop,
    line,
    end: line[line.length - 1] as LatLng,
    canReverse,
    isPartOfTrail: trail.sections.length > 1,
  };
}
