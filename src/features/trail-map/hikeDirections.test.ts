import { describe, expect, it } from "vitest";
import { encodePolyline, thinPoints, trailImages } from "./googleImages";
import { buildHike, formatDistance } from "./hikeDirections";
import type { LatLng, Trail, TrailWay } from "./trailGuide";

const trailOf = (sections: TrailWay[][], access: LatLng): Trail => ({
  id: 1,
  name: "Owl Trail",
  lengthKm: 1,
  difficulty: null,
  paths: sections.flat().map((way) => way.points),
  sections,
  access,
  distanceKm: 0,
});

// Heads north, then turns east at (0.01, 0).
const north: TrailWay = { name: "Owl Trail", points: [[0, 0], [0.005, 0], [0.01, 0]] };
const east: TrailWay = { name: "Fern Path", points: [[0.01, 0], [0.01, 0.01], [0.01, 0.02]] };

describe("buildHike", () => {
  it("walks from the start, calling out the turn and the end", () => {
    const hike = buildHike(trailOf([[north, east]], [0, 0]));
    expect(hike?.steps).toEqual([
      "Head north on Owl Trail for 1.1 km",
      "Turn right onto Fern Path for 2.2 km",
      "Reach the end of Owl Trail, then return the way you came",
    ]);
    expect(hike?.distanceKm).toBeCloseTo(3.34, 1);
    expect(hike?.canReverse).toBe(false);
    expect(hike?.end).toEqual([0.01, 0.02]);
  });

  it("heads to the farther end from the middle, and can go the other way", () => {
    const trail = trailOf([[north, east]], [0.005, 0]);
    expect(buildHike(trail)?.end).toEqual([0.01, 0.02]);
    const back = buildHike(trail, true);
    expect(back?.end).toEqual([0, 0]);
    expect(back?.steps[0]).toBe("Head south on Owl Trail for 557 m");
  });

  it("joins ways of the same trail and absorbs short unnamed links", () => {
    const link: TrailWay = { points: [[0.01, 0], [0.0102, 0]] };
    const more: TrailWay = { name: "Owl Trail", points: [[0.0102, 0], [0.02, 0]] };
    const hike = buildHike(trailOf([[north, link, more]], [0, 0]));
    expect(hike?.steps).toHaveLength(2);
    expect(hike?.steps[0]).toContain("on Owl Trail for 2.2 km");
  });

  it("goes all the way round a loop from a mid-way join", () => {
    const a: TrailWay = { name: "Ring", points: [[0, 0], [0.01, 0], [0.01, 0.01]] };
    const b: TrailWay = { name: "Ring", points: [[0.01, 0.01], [0, 0.01], [0, 0]] };
    const hike = buildHike(trailOf([[a, b]], [0.01, 0.01]));
    expect(hike?.isLoop).toBe(true);
    expect(hike?.distanceKm).toBeCloseTo(4.45, 1);
    expect(hike?.end).toEqual([0.01, 0.01]);
    expect(hike?.steps.at(-1)).toBe("You're back where you joined the trail");
  });

  it("flags directions that cover one part of a multi-part trail", () => {
    const other: TrailWay = { name: "Far Part", points: [[1, 1], [1.01, 1]] };
    expect(buildHike(trailOf([[north, east], [other]], [0, 0]))?.isPartOfTrail).toBe(true);
  });
});

describe("formatDistance", () => {
  it("uses metres under a kilometre", () => {
    expect(formatDistance(0.34)).toBe("340 m");
    expect(formatDistance(1.26)).toBe("1.3 km");
  });
});

describe("Google images", () => {
  it("encodes polylines to Google's documented example", () => {
    expect(encodePolyline([[38.5, -120.2], [40.7, -120.95], [43.252, -126.453]])).toBe("_p~iF~ps|U_ulLnnqC_mqNvxq`@");
  });

  it("thins long lines but keeps both ends", () => {
    const line = Array.from({ length: 1000 }, (_, i): LatLng => [i, i]);
    const thin = thinPoints(line, 100);
    expect(thin).toHaveLength(100);
    expect(thin[0]).toEqual([0, 0]);
    expect(thin[99]).toEqual([999, 999]);
  });

  it("requests live images with the trail drawn and stays within the URL limit", () => {
    const long = Array.from({ length: 5000 }, (_, i): LatLng => [37 + i / 1000, -122 - i / 1500]);
    const images = trailImages("KEY", trailOf([[{ name: "L", points: long }]], [37, -122]));
    expect(images.map((image) => new URL(image.src).searchParams.get("maptype"))).toEqual([
      "hybrid",
      "terrain",
      "satellite",
    ]);
    for (const image of images) {
      expect(image.src.length).toBeLessThan(16384);
      expect(new URL(image.src).searchParams.get("path")).toMatch(/^color:.*\|enc:/);
      expect(new URL(image.src).searchParams.get("key")).toBe("KEY");
    }
  });
});
