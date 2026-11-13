import { describe, expect, it } from "vitest";
import { getJapaneseHerbs } from "./catalog";
import { JAPANESE_HERB_IDS, JAPANESE_HERB_TEXT_EN } from "./data";
import { JAPANESE_HERB_TEXT_ES } from "./data.es";

describe("Japanese herbs", () => {
  it("covers the six herbs from the source, in order", () => {
    expect(getJapaneseHerbs("en").map((h) => h.id)).toEqual(["shiso", "wasabi", "yomogi", "mitsuba", "kuromoji", "sansho"]);
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
