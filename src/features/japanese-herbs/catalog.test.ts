import { existsSync, statSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { HERB_IDS, HERB_PROFILES } from "../herbs/data/herbs";
import { getJapaneseHerbs } from "./catalog";
import { JAPANESE_HERB_IDS, JAPANESE_HERB_TEXT_EN } from "./data";
import { JAPANESE_HERB_TEXT_ES } from "./data.es";

describe("Japanese herbs", () => {
  it("covers the herbs from every source, in order", () => {
    expect(getJapaneseHerbs("en").map((h) => h.id)).toEqual([
      "shiso",
      "wasabi",
      "yomogi",
      "mitsuba",
      "kuromoji",
      "sansho",
      "kiku",
      "gobo",
      "kombu",
      "ashitaba",
      "naginata-koju",
      "ibuki-jakoso",
      "toki",
      "tachibana",
      "getto",
      "hamanasu",
      "dokudami",
      "sakura-leaf",
      "hatomugi",
      "tsubaki",
      "kawamidori",
      "kuko",
    ]);
  });

  it("doesn't repeat herbs that are already in the main Yerba Buena catalog", () => {
    const genus = (name: string) => name.split(/[ ,]/)[0]!.toLowerCase();
    const mainNames = new Set(HERB_IDS.map((id) => HERB_PROFILES[id].name.toLowerCase()));
    const mainSpecies = new Set(
      HERB_IDS.flatMap((id) => HERB_PROFILES[id].scientificName.split(",").map((n) => n.trim().toLowerCase())),
    );
    for (const herb of getJapaneseHerbs("en")) {
      expect(mainNames.has(herb.name.toLowerCase()), herb.id).toBe(false);
      expect(mainSpecies.has(herb.scientificName.toLowerCase()), herb.id).toBe(false);
      expect(genus(herb.scientificName), herb.id).not.toBe("panax"); // Ginseng is already in the main catalog.
    }
  });

  it("leaves out the shop prices from the Waho-An source", () => {
    for (const lang of ["en", "es", "ja", "zh"] as const) {
      for (const herb of getJapaneseHerbs(lang)) {
        expect(JSON.stringify(herb), `${lang} ${herb.id}`).not.toMatch(/\byen\b|¥|円|special price|loose leaf pack|\bpack \(/i);
      }
    }
  });

  it("gives every herb how-to steps, storage tips, and cautions in every language", () => {
    for (const lang of ["en", "es", "ja", "zh"] as const) {
      for (const herb of getJapaneseHerbs(lang)) {
        expect(herb.description.length, `${lang} ${herb.id}`).toBeGreaterThan(40);
        expect(herb.howToUse.length, `${lang} ${herb.id}`).toBeGreaterThanOrEqual(3);
        expect(herb.storage.length, `${lang} ${herb.id}`).toBeGreaterThan(20);
        expect(herb.cautions.length, `${lang} ${herb.id}`).toBeGreaterThan(0);
        expect(herb.japaneseName, herb.id).toBeTruthy();
      }
    }
  });

  it("gives the herbs with photos a credited photo that exists and stays small", () => {
    const withPhotos = ["kuromoji", "dokudami", "getto", "sakura-leaf", "hatomugi", "tsubaki", "hamanasu", "kawamidori", "kuko"];
    for (const herb of getJapaneseHerbs("en")) {
      expect(Boolean(herb.images?.length), herb.id).toBe(withPhotos.includes(herb.id));
      for (const image of herb.images ?? []) {
        const file = new URL(`../../../public${image.src}`, import.meta.url);
        expect(existsSync(file), image.src).toBe(true);
        expect(statSync(file).size, image.src).toBeLessThan(300_000);
        expect(image.credit, image.src).toBeTruthy();
        expect(image.sourceUrl, image.src).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
        expect(image.licenseUrl, image.src).toMatch(/^https:\/\/creativecommons\.org\//);
        // A herb with several photos labels each one, so readers know which part they're looking at.
        if (herb.images!.length > 1) expect(image.label?.en && image.label.es, image.src).toBeTruthy();
      }
    }
  });

  it("translates step for step", () => {
    for (const id of JAPANESE_HERB_IDS) {
      expect(JAPANESE_HERB_TEXT_ES[id].howToUse, id).toHaveLength(JAPANESE_HERB_TEXT_EN[id].howToUse.length);
      expect(JAPANESE_HERB_TEXT_ES[id].cautions, id).toHaveLength(JAPANESE_HERB_TEXT_EN[id].cautions.length);
    }
  });
});
