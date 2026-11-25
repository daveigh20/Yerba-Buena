import { describe, expect, it } from "vitest";
import { searchHerbs, searchRemedies } from "../lib/search";
import { buildBenefitIndex } from "./benefits";
import { BENEFIT_ES } from "./benefits.es";
import { getCatalog } from ".";
import { REMEDIES } from "./remedies";
import { REMEDY_TEXT_ES } from "./remedies.es";

const es = getCatalog("es");

describe("Spanish catalog", () => {
  it("translates every benefit in the source", () => {
    const all = new Set([...buildBenefitIndex().values()].flat());
    for (const benefit of all) expect(BENEFIT_ES[benefit], benefit).toBeTruthy();
  });

  it("translates every remedy, ingredient for ingredient", () => {
    for (const r of REMEDIES) {
      const text = REMEDY_TEXT_ES[r.id];
      expect(text, r.id).toBeDefined();
      expect(text?.ingredients, r.id).toHaveLength(r.ingredients.length);
      expect(Boolean(text?.cautions), r.id).toBe(Boolean(r.cautions));
    }
  });

  it("keeps herb ids, links, and unique names", () => {
    expect(es.herbs).toHaveLength(getCatalog("en").herbs.length);
    expect(new Set(es.herbs.map((h) => h.name)).size).toBe(es.herbs.length);
    expect(es.getHerb("ginger")?.name).toBe("Jengibre");
    expect(es.remediesForHerb("elderberry").map((r) => r.id)).toContain("elderberry-syrup");
    expect(es.getRemedy("hibiscus-cooler")?.ingredients[0]?.herbId).toBe("hibiscus");
  });

  it("finds herbs by Spanish or English name, ignoring accents", () => {
    expect(searchHerbs(es.herbs, "jengibre")[0]?.herb.id).toBe("ginger");
    expect(searchHerbs(es.herbs, "ginger")[0]?.herb.id).toBe("ginger");
    expect(searchHerbs(es.herbs, "curcuma")[0]?.herb.id).toBe("turmeric");
    expect(searchHerbs(es.herbs, "sueño").some((r) => r.herb.id === "chamomile")).toBe(true);
    expect(searchRemedies(es.remedies, "garganta").length).toBeGreaterThan(0);
  });
});

describe("Spanish search suggestions", () => {
  it("each find at least one herb", async () => {
    const { MESSAGES } = await import("../../../i18n/messages");
    for (const s of MESSAGES.es.herbs.suggestions) expect(searchHerbs(es.herbs, s).length, s).toBeGreaterThan(0);
  });
});
