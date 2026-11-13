import { describe, expect, it } from "vitest";
import { HERB_IDS, HERB_PROFILES } from "../herbs/data/herbs";
import { getJapaneseHerbs } from "./catalog";
import { JAPANESE_HERB_IDS, JAPANESE_HERB_TEXT_EN } from "./data";
import { JAPANESE_HERB_TEXT_ES } from "./data.es";

describe("Japanese herbs", () => {
  it("covers the herbs from both sources, in order", () => {
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

  it("gives every herb how-to steps, storage tips, and cautions in both languages", () => {
    for (const lang of ["en", "es"] as const) {
      for (const herb of getJapaneseHerbs(lang)) {
        expect(herb.description.length, `${lang} ${herb.id}`).toBeGreaterThan(40);
        expect(herb.howToUse.length, `${lang} ${herb.id}`).toBeGreaterThanOrEqual(3);
        expect(herb.storage.length, `${lang} ${herb.id}`).toBeGreaterThan(20);
        expect(herb.cautions.length, `${lang} ${herb.id}`).toBeGreaterThan(0);
        expect(herb.japaneseName, herb.id).toBeTruthy();
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
