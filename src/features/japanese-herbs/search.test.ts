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
    expect(ids(searchJapaneseHerbs(en, "gobo"))[0]).toBe("gobo");
    expect(ids(searchJapaneseHerbs(en, "tomorrow's leaf"))).toEqual(["ashitaba"]);
    expect(ids(searchJapaneseHerbs(en, "昆布"))).toEqual(["kombu"]);
    expect(ids(searchJapaneseHerbs(en, "kiku"))[0]).toBe("kiku");
    expect(ids(searchJapaneseHerbs(en, "shell ginger"))).toEqual(["getto"]);
    expect(ids(searchJapaneseHerbs(en, "toki"))[0]).toBe("toki");
    expect(ids(searchJapaneseHerbs(en, "ドクダミ"))).toEqual(["dokudami"]);
    expect(ids(searchJapaneseHerbs(es, "rosa de playa"))).toEqual(["hamanasu"]);
    expect(ids(searchJapaneseHerbs(en, "sakuramochi"))[0]).toBe("sakura-leaf");
    expect(ids(searchJapaneseHerbs(en, "job's tears"))).toEqual(["hatomugi"]);
    expect(ids(searchJapaneseHerbs(en, "椿"))).toEqual(["tsubaki"]);
    expect(ids(searchJapaneseHerbs(es, "aceite de camelia"))[0]).toBe("tsubaki");
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
    expect(ids(searchJapaneseHerbs(es, "burdock", englishNames))).toContain("gobo");
    expect(ids(searchJapaneseHerbs(es, "crisantemo"))[0]).toBe("kiku");
    expect(ids(searchJapaneseHerbs(es, "artemisa"))).toContain("yomogi");
    expect(ids(searchJapaneseHerbs(es, "japones"))).not.toHaveLength(0);
  });

  it("gives every suggestion at least one result", () => {
    for (const s of MESSAGES.en.japanese.suggestions) expect(searchJapaneseHerbs(en, s).length, s).toBeGreaterThan(0);
    for (const s of MESSAGES.es.japanese.suggestions) expect(searchJapaneseHerbs(es, s).length, s).toBeGreaterThan(0);
  });
});
