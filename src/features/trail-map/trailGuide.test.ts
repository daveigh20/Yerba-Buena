import { describe, expect, it } from "vitest";
import { hasSatelliteImagery, komootEmbedUrl, matchesChoices, mercatorBox, parseTrail, stepText, type Trail } from "./trailGuide";

const R = 6378137;
const toMercator = (lat: number, lng: number) => [
  (lng * Math.PI * R) / 180,
  Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) * R,
];

describe("komootEmbedUrl", () => {
  it("builds the official location embed with the visitor's choices", () => {
    const url = new URL(komootEmbedUrl({ lat: 37.81994, lng: -122.4783, label: "Mill Valley & Co" }, "jogging", 20));
    expect(url.origin + url.pathname).toBe("https://www.komoot.com/discover/embed");
    expect(Object.fromEntries(url.searchParams)).toEqual({
      lat: "37.8199",
      lng: "-122.4783",
      sport: "jogging",
      name: "Mill Valley & Co",
      radius: "20",
      layout: "map",
    });
  });
});

describe("mercatorBox", () => {
  it("centres the box on the point", () => {
    const [minX = 0, minY = 0, maxX = 0, maxY = 0] = mercatorBox(37.82, -122.48, 10).split(",").map(Number);
    const [x = 0, y = 0] = toMercator(37.82, -122.48);
    expect((minX + maxX) / 2).toBeCloseTo(x, -1);
    expect((minY + maxY) / 2).toBeCloseTo(y, -1);
  });
});

describe("parseTrail", () => {
  const way = (points: [number, number][], tags: Record<string, string> = {}) => ({
    geometry: { type: "LineString", coordinates: points.map(([lat, lng]) => toMercator(lat, lng)) },
    tags,
  });

  it("finds ways nested in sections, the closest point, and the hardest rating", () => {
    const trail = parseTrail(
      {
        id: 1,
        name: "Owl Trail",
        route: {
          length: 1663,
          main: [
            { ways: [way([[37.9, -122.5], [37.85, -122.5]], { sac_scale: "hiking" })] },
            { main: [{ ways: [way([[37.82, -122.5]], { sac_scale: "mountain_hiking" })] }] },
          ],
        },
      },
      [37.8, -122.5],
    );
    expect(trail?.lengthKm).toBeCloseTo(1.663);
    expect(trail?.difficulty).toBe("moderate");
    expect(trail?.access[0]).toBeCloseTo(37.82);
    expect(trail?.access[1]).toBeCloseTo(-122.5);
    expect(trail?.paths).toHaveLength(2);
  });

  it("reports no difficulty when the trail is unrated, and skips empty routes", () => {
    const rated = parseTrail({ id: 2, route: { length: 10, main: [way([[1, 1]])] } }, [0, 0]);
    expect(rated?.difficulty).toBeNull();
    expect(parseTrail({ id: 3, route: { length: 0, main: [] } }, [0, 0])).toBeNull();
  });
});

describe("matchesChoices", () => {
  const trail = (lengthKm: number, difficulty: Trail["difficulty"]) =>
    ({ lengthKm, difficulty }) as Trail;

  it("filters by length band", () => {
    expect(matchesChoices(trail(4.9, null), "short", "any")).toBe(true);
    expect(matchesChoices(trail(5, null), "short", "any")).toBe(false);
    expect(matchesChoices(trail(15, null), "medium", "any")).toBe(true);
    expect(matchesChoices(trail(15.1, null), "long", "any")).toBe(true);
  });

  it("does not present an unrated trail as a chosen difficulty", () => {
    expect(matchesChoices(trail(3, null), "any", "easy")).toBe(false);
    expect(matchesChoices(trail(3, "easy"), "any", "easy")).toBe(true);
  });
});

describe("stepText", () => {
  it("writes readable directions", () => {
    expect(stepText({ name: "Main St", maneuver: { type: "turn", modifier: "slight left" } }, "T")).toBe(
      "Bear left onto Main St",
    );
    expect(stepText({ maneuver: { type: "turn", modifier: "sharp right" } }, "T")).toBe("Turn right");
    expect(stepText({ maneuver: { type: "arrive" } }, "Owl Trail")).toBe("Arrive at Owl Trail");
    expect(stepText({ name: "Main St", maneuver: { type: "turn", modifier: "slight left" } }, "T", "es")).toBe(
      "Mantente a la izquierda por Main St",
    );
    expect(stepText({ maneuver: { type: "arrive" } }, "Owl Trail", "es")).toBe("Llega a Owl Trail");
  });
});

describe("hasSatelliteImagery", () => {
  it("covers US locations only", () => {
    expect(hasSatelliteImagery([37.9, -122.5])).toBe(true);
    expect(hasSatelliteImagery([21.3, -157.8])).toBe(true);
    expect(hasSatelliteImagery([47.49, 11.09])).toBe(false);
  });
});
