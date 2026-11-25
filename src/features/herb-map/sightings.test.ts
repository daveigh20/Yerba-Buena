import { describe, expect, it } from "vitest";
import { HERB_IDS } from "../herbs/data/herbs";
import { JAPANESE_HERB_IDS } from "../japanese-herbs/data";
import { buildMapHerbs } from "./mapHerbs";
import { distanceToPathsKm, parseSighting, parseSightings, sightingsUrl, trailBox } from "./sightings";
import { HERB_TAXON_IDS, JAPANESE_HERB_TAXON_IDS } from "./taxa";

const observation = {
  id: 415461276,
  uri: "https://www.inaturalist.org/observations/415461276",
  geojson: { type: "Point", coordinates: [-122.4743, 37.8083] },
  taxon: { id: 53052, name: "Foeniculum vulgare", ancestor_ids: [48460, 47126, 53053, 53052] },
  observed_on: "2026-11-01",
  place_guess: "Battery East Trail, San Francisco, CA, US",
  quality_grade: "research",
  obscured: false,
  positional_accuracy: 12.4,
  photos: [
    { url: "https://example.org/photos/1/square.jpg", license_code: null, attribution: "(c) someone, all rights reserved" },
    { url: "https://example.org/photos/2/square.jpeg?1700", license_code: "cc-by-nc", attribution: "(c) walker, some rights reserved (CC BY-NC)" },
  ],
};

describe("parseSighting", () => {
  it("keeps the point as [lat, lng], the taxon with its ancestors, and only licensed photos", () => {
    const sighting = parseSighting(observation);
    expect(sighting).toMatchObject({
      id: 415461276,
      point: [37.8083, -122.4743],
      scientificName: "Foeniculum vulgare",
      placeName: "Battery East Trail, San Francisco, CA, US",
      quality: "research",
      accuracyM: 12,
    });
    expect(sighting?.taxonIds).toEqual([48460, 47126, 53053, 53052]);
    expect(sighting?.photos).toEqual([
      {
        src: "https://example.org/photos/2/medium.jpeg?1700",
        thumb: "https://example.org/photos/2/small.jpeg?1700",
        square: "https://example.org/photos/2/square.jpeg?1700",
        credit: "(c) walker, some rights reserved (CC BY-NC)",
      },
    ]);
  });

  it("drops sightings with no licensed photo, no location, or a casual grade", () => {
    expect(parseSighting({ ...observation, photos: [observation.photos[0]!] })).toBeNull();
    expect(parseSighting({ ...observation, geojson: null })).toBeNull();
    expect(parseSighting({ ...observation, quality_grade: "casual" })).toBeNull();
  });

  it("never reports fewer total results than it returned", () => {
    expect(parseSightings({ results: [observation] }).total).toBe(1);
    expect(parseSightings({ total_results: 900, results: [observation] }).total).toBe(900);
  });
});

describe("sightingsUrl", () => {
  it("asks for wild, photographed, openly licensed sightings near a point", () => {
    const url = new URL(sightingsUrl({ center: [37.77, -122.45], radiusKm: 10 }, [53052, 53052, 47602], false));
    expect(url.origin).toBe("https://api.inaturalist.org");
    expect(url.searchParams.get("taxon_id")).toBe("53052,47602");
    expect(url.searchParams.get("verifiable")).toBe("true");
    expect(url.searchParams.get("photo_license")).not.toContain("all rights");
    expect(url.searchParams.get("photo_license")).toContain("cc-by");
    expect(url.searchParams.get("quality_grade")).toBe("research,needs_id");
    expect(url.searchParams.get("radius")).toBe("10");
  });

  it("can search a box and only confirmed IDs", () => {
    const url = new URL(sightingsUrl({ south: 1, west: 2, north: 3, east: 4 }, [1], true));
    expect(url.searchParams.get("swlat")).toBe("1.00000");
    expect(url.searchParams.get("nelng")).toBe("4.00000");
    expect(url.searchParams.get("quality_grade")).toBe("research");
  });
});

describe("trail geometry", () => {
  const path: [number, number][] = [
    [37.8, -122.5],
    [37.8, -122.4],
  ];

  it("measures the distance to the closest point on a path, not just its corners", () => {
    // About 111 m north of the middle of the segment.
    expect(distanceToPathsKm([37.801, -122.45], [path])).toBeCloseTo(0.111, 2);
    expect(distanceToPathsKm([37.8, -122.6], [path])).toBeGreaterThan(8);
  });

  it("pads the box around the trail", () => {
    const box = trailBox([path], 0.25);
    expect(box!.south).toBeLessThan(37.8);
    expect(box!.north).toBeGreaterThan(37.8);
    expect(box!.west).toBeLessThan(-122.5);
    expect(box!.east).toBeGreaterThan(-122.4);
    expect(trailBox([])).toBeNull();
  });
});

describe("map herbs", () => {
  it("covers every herb in the herb search and the Japanese herb guide", () => {
    expect(Object.keys(HERB_TAXON_IDS).sort()).toEqual([...HERB_IDS].sort());
    expect(Object.keys(JAPANESE_HERB_TAXON_IDS).sort()).toEqual([...JAPANESE_HERB_IDS].sort());
    const herbs = buildMapHerbs("en");
    const unmapped = JAPANESE_HERB_IDS.filter((id) => JAPANESE_HERB_TAXON_IDS[id].length === 0);
    expect(herbs.herbs).toHaveLength(HERB_IDS.length + JAPANESE_HERB_IDS.length - unmapped.length);
    expect(unmapped).toEqual(["tachibana"]);
  });

  it("matches a sighting to every herb made from that plant, including through ancestors", () => {
    const herbs = buildMapHerbs("en");
    const tea = parseSighting({ ...observation, taxon: { id: 123005, name: "Camellia sinensis", ancestor_ids: [123005] } })!;
    expect(herbs.herbsFor(tea).map((h) => h.key).sort()).toEqual([
      "herbs:black-tea",
      "herbs:green-tea",
      "herbs:matcha",
      "herbs:oolong-tea",
      "herbs:white-tea",
    ]);
    // A hawthorn species counts as hawthorn, through the Crataegus genus.
    const hawthorn = parseSighting({ ...observation, taxon: { id: 141714, name: "Crataegus phaenopyrum", ancestor_ids: [51148, 141714] } })!;
    expect(herbs.herbsFor(hawthorn).map((h) => h.key)).toEqual(["herbs:hawthorn"]);
  });

  it("links to the herb pages in the visitor's language", () => {
    const herb = buildMapHerbs("es").get("japanese:kawamidori");
    expect(herb?.href).toBe("/japanese-herbs/kawamidori");
    expect(herb?.taxonIds).toEqual([506801]);
  });
});
