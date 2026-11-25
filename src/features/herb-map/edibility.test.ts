import { describe, expect, it } from "vitest";
import { LANGS } from "../../i18n/messages";
import { getMapHerbs } from "./mapHerbs";

describe("herb edibility", () => {
  it.each(LANGS)("every herb on the map says whether people can eat it in %s", (lang) => {
    for (const herb of getMapHerbs(lang).herbs) {
      expect(herb.eat, herb.key).toBeDefined();
      expect(herb.eat.parts, herb.key).toBeTruthy();
      expect(herb.eat.why, herb.key).toBeTruthy();
      expect(herb.eat.care, herb.key).toBeTruthy();
      // Herbs people can eat list their benefits; ones that aren't food don't.
      if (herb.edibility === "not-food") expect(herb.eat.benefits, herb.key).toEqual([]);
      else expect(herb.eat.benefits.length, herb.key).toBeGreaterThan(0);
    }
  });

  it("keeps the same benefit count in every language", () => {
    const en = getMapHerbs("en").herbs;
    for (const lang of LANGS) {
      for (const herb of getMapHerbs(lang).herbs) {
        expect(herb.eat.benefits.length, `${lang} ${herb.key}`).toBe(en.find((h) => h.key === herb.key)?.eat.benefits.length);
        expect(herb.edibility).toBe(en.find((h) => h.key === herb.key)?.edibility);
      }
    }
  });
});
