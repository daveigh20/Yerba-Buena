import { describe, expect, it } from "vitest";
import { HERB_IDS } from "./herbs";
import { buildBenefitIndex } from "./benefits";
import { HERBS, REMEDIES, getHerb, herbsPairedWith, remediesForHerb } from ".";

describe("herb catalog", () => {
  it("has one entry per herb id, with unique names", () => {
    expect(HERBS).toHaveLength(HERB_IDS.length);
    expect(new Set(HERBS.map((h) => h.name)).size).toBe(HERBS.length);
  });

  it("gives every herb at least one benefit from the source", () => {
    for (const herb of HERBS) expect(herb.benefits, herb.id).not.toHaveLength(0);
  });

  it("gives every herb a description, how-to, and at least one caution", () => {
    for (const herb of HERBS) {
      expect(herb.description.length, herb.id).toBeGreaterThan(40);
      expect(herb.howToUse.length, herb.id).toBeGreaterThan(10);
      expect(herb.cautions.length, herb.id).toBeGreaterThan(0);
    }
  });

  it("only classifies tea-plant herbs as true teas", () => {
    for (const herb of HERBS) {
      expect(herb.category === "true-tea", herb.id).toBe(herb.scientificName === "Camellia sinensis");
    }
  });

  it("parses every herb mention in the source (97 benefits, 186 mentions)", () => {
    const total = [...buildBenefitIndex().values()].reduce((n, list) => n + list.length, 0);
    expect(total).toBe(186);
  });

  it("rejects herbs the source map doesn't know", () => {
    expect(() => buildBenefitIndex("Something|mystery herb")).toThrow(/mystery herb/);
  });
});

describe("remedies", () => {
  it("have unique ids, ingredients, and steps", () => {
    expect(new Set(REMEDIES.map((r) => r.id)).size).toBe(REMEDIES.length);
    for (const r of REMEDIES) {
      expect(r.ingredients.some((i) => i.herbId), r.id).toBe(true);
      expect(r.steps.length, r.id).toBeGreaterThan(0);
    }
  });

  it("never use herbs that are flagged as unsuitable for homemade remedies", () => {
    for (const herb of HERBS.filter((h) => h.remedyNote)) {
      expect(remediesForHerb(herb.id), herb.id).toEqual([]);
    }
  });

  it("are linked from the herbs they use", () => {
    expect(remediesForHerb("elderberry").map((r) => r.id)).toContain("elderberry-syrup");
    expect(herbsPairedWith("elderberry").map((h) => h.id)).toContain("ginger");
    expect(getHerb("nope")).toBeUndefined();
  });
});
