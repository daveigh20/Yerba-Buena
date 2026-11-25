import { describe, expect, it } from "vitest";
import { MESSAGES } from "../../../i18n/messages";
import { searchHerbs, searchRemedies } from "../lib/search";
import { getCatalog } from ".";
import { buildBenefitIndex } from "./benefits";
import { BENEFIT_JA } from "./benefits.ja";
import { BENEFIT_ZH } from "./benefits.zh";
import { REMEDIES } from "./remedies";
import { REMEDY_TEXT_JA } from "./remedies.ja";
import { REMEDY_TEXT_ZH } from "./remedies.zh";

const LANGS = [
  { lang: "ja", benefits: BENEFIT_JA, remedies: REMEDY_TEXT_JA, ginger: "ショウガ", search: "ショウガ", benefit: "睡眠", remedy: "のど" },
  { lang: "zh", benefits: BENEFIT_ZH, remedies: REMEDY_TEXT_ZH, ginger: "姜", search: "生姜", benefit: "睡眠", remedy: "喉咙" },
] as const;

describe.each(LANGS)("$lang catalog", ({ lang, benefits, remedies, ginger, search, benefit, remedy }) => {
  const catalog = getCatalog(lang);

  it("translates every benefit in the source", () => {
    const all = new Set([...buildBenefitIndex().values()].flat());
    for (const b of all) expect(benefits[b], b).toBeTruthy();
  });

  it("translates every remedy, ingredient for ingredient", () => {
    for (const r of REMEDIES) {
      const text = remedies[r.id];
      expect(text, r.id).toBeDefined();
      expect(text?.ingredients, r.id).toHaveLength(r.ingredients.length);
      expect(text?.steps, r.id).toHaveLength(r.steps.length);
      expect(Boolean(text?.cautions), r.id).toBe(Boolean(r.cautions));
    }
  });

  it("keeps herb ids, links, and unique names", () => {
    expect(catalog.herbs).toHaveLength(getCatalog("en").herbs.length);
    expect(new Set(catalog.herbs.map((h) => h.name)).size).toBe(catalog.herbs.length);
    expect(catalog.getHerb("ginger")?.name).toBe(ginger);
    expect(catalog.getRemedy("hibiscus-cooler")?.ingredients[0]?.herbId).toBe("hibiscus");
  });

  it("finds herbs by their own or English names, benefits, and remedies", () => {
    expect(searchHerbs(catalog.herbs, search)[0]?.herb.id).toBe("ginger");
    expect(searchHerbs(catalog.herbs, "ginger")[0]?.herb.id).toBe("ginger");
    expect(searchHerbs(catalog.herbs, benefit).some((r) => r.herb.id === "chamomile")).toBe(true);
    expect(searchRemedies(catalog.remedies, remedy).length).toBeGreaterThan(0);
  });

  it("gives every search suggestion at least one result", () => {
    for (const s of MESSAGES[lang].herbs.suggestions) expect(searchHerbs(catalog.herbs, s).length, s).toBeGreaterThan(0);
  });
});
