import { describe, expect, it } from "vitest";
import { MESSAGES } from "../../i18n/messages";
import { getJapaneseHerbs } from "./catalog";
import { JAPANESE_HERB_TEXT_EN } from "./data";
import { searchJapaneseHerbs } from "./search";

const en = getJapaneseHerbs("en");
const es = getJapaneseHerbs("es");
const englishNames = (h: (typeof es)[number]) => [JAPANESE_HERB_TEXT_EN[h.id].name, ...JAPANESE_HERB_TEXT_EN[h.id].aliases];
const ids = (results: ReturnType<typeof searchJapaneseHerbs>) => results.map((r) => r.herb.id);

describe("Japanese herb search", () => {
  it("shows every herb for an empty query", () => {
    expect(searchJapaneseHerbs(en, "  ")).toHaveLength(en.length);
  });

  it("finds herbs by name, alias, Japanese script, and scientific name", () => {
    expect(ids(searchJapaneseHerbs(en, "WASABI"))[0]).toBe("wasabi");
    expect(ids(searchJapaneseHerbs(en, "mugwort"))).toEqual(["yomogi"]);
    expect(searchJapaneseHerbs(en, "mugwort")[0]?.matchedAlias).toBe("japanese mugwort");
    expect(ids(searchJapaneseHerbs(en, "山椒"))).toEqual(["sansho"]);
    expect(ids(searchJapaneseHerbs(en, "sanshō"))).toContain("sansho");
    expect(ids(searchJapaneseHerbs(en, "zanthoxylum"))).toEqual(["sansho"]);
  });

  it("finds herbs by dish or use, and shows the matching passage", () => {
    const results = searchJapaneseHerbs(en, "chawanmushi");
    expect(ids(results)).toContain("mitsuba");
    expect(results.find((r) => r.herb.id === "mitsuba")?.matchedText).toMatch(/chawanmushi/i);
  });

  it("puts name matches before other matches", () => {
    expect(ids(searchJapaneseHerbs(en, "shiso"))[0]).toBe("shiso");
  });

  it("finds Spanish herbs by English names, ignoring accents", () => {
    expect(ids(searchJapaneseHerbs(es, "japanese pepper", englishNames))).toEqual(["sansho"]);
    expect(ids(searchJapaneseHerbs(es, "artemisa"))).toContain("yomogi");
    expect(ids(searchJapaneseHerbs(es, "japones"))).not.toHaveLength(0);
  });

  it("gives every suggestion at least one result", () => {
    for (const s of MESSAGES.en.japanese.suggestions) expect(searchJapaneseHerbs(en, s).length, s).toBeGreaterThan(0);
    for (const s of MESSAGES.es.japanese.suggestions) expect(searchJapaneseHerbs(es, s).length, s).toBeGreaterThan(0);
  });
});
