import { describe, expect, it } from "vitest";
import { HERBS, REMEDIES } from "../data";
import { findMatches, normalize } from "./normalize";
import { searchHerbs, searchRemedies } from "./search";

const names = (results: ReturnType<typeof searchHerbs>) => results.map((r) => r.herb.name);

describe("normalize", () => {
  it("ignores case, accents, apostrophes, and periods", () => {
    expect(normalize("St. John's Wort")).toBe("st johns wort");
    expect(normalize("  Diente  de León ")).toBe("diente de leon");
    expect(normalize("Mentha × piperita")).toBe("mentha piperita");
  });
});

describe("findMatches", () => {
  it("returns every match, mapped back to the original text", () => {
    const text = "Ginger, ginger, GINGER";
    expect(findMatches(text, "ginger").map(([s, e]) => text.slice(s, e))).toEqual(["Ginger", "ginger", "GINGER"]);
  });

  it("matches across punctuation", () => {
    const text = "St. John's Wort";
    const [range] = findMatches(text, "johns wort");
    expect(range && text.slice(...range)).toBe("John's Wort");
  });

  it("returns nothing for an empty query", () => {
    expect(findMatches("anything", "  ")).toEqual([]);
  });
});

describe("searchHerbs", () => {
  it("returns every herb when the query is empty", () => {
    expect(searchHerbs(HERBS, "")).toHaveLength(HERBS.length);
  });

  it("finds herbs by name, ignoring punctuation", () => {
    expect(names(searchHerbs(HERBS, "st johns wort"))).toEqual(["St. John's Wort"]);
    expect(names(searchHerbs(HERBS, "PAU D’ARCO"))).toEqual(["Pau d'Arco"]);
    expect(names(searchHerbs(HERBS, "pau darco"))).toEqual(["Pau d'Arco"]);
  });

  it("finds herbs by other names and scientific names", () => {
    expect(names(searchHerbs(HERBS, "nopal"))).toEqual(["Prickly Pear Cactus"]);
    expect(names(searchHerbs(HERBS, "Zingiber"))).toEqual(["Ginger"]);
    expect(names(searchHerbs(HERBS, "vitex"))).toEqual(["Chasteberry"]);
  });

  it("finds herbs by benefit and reports which benefits matched", () => {
    const results = searchHerbs(HERBS, "sleep");
    expect(names(results)).toEqual(["Chamomile"]);
    expect(results[0]?.matchedOn).toBe("benefit");
    expect(results[0]?.matchedBenefits).toEqual(["Help with sleep"]);
  });

  it("ranks name matches above benefit matches", () => {
    const results = searchHerbs(HERBS, "green");
    expect(results[0]?.herb.name).toBe("Green Tea");
    expect(results.find((r) => r.herb.name === "Matcha")?.matchedOn).toBe("alias");
  });

  it("ranks names that start with the query first", () => {
    expect(names(searchHerbs(HERBS, "black")).slice(0, 3)).toEqual(["Black Cohosh", "Black Tea", "Black Walnut"]);
  });

  it("filters by category", () => {
    const teas = searchHerbs(HERBS, "", "true-tea");
    expect(names(teas)).toEqual(["Black Tea", "Green Tea", "Matcha", "Oolong Tea", "White Tea"]);
    expect(names(searchHerbs(HERBS, "rooibos", "true-tea"))).toEqual([]);
  });

  it("returns nothing for nonsense", () => {
    expect(searchHerbs(HERBS, "xyzzy")).toEqual([]);
  });
});

describe("searchRemedies", () => {
  it("finds remedies by what they're good for", () => {
    const ids = searchRemedies(REMEDIES, "sore throat").map((r) => r.id);
    expect(ids).toContain("thyme-honey-throat-tea");
    expect(ids).toContain("throat-coat-tea");
  });

  it("returns nothing for an empty query", () => {
    expect(searchRemedies(REMEDIES, "")).toEqual([]);
  });
});
