import type { Herb, HerbCategory, Remedy } from "../types";
import { normalize } from "./normalize";

export type CategoryFilter = HerbCategory | "all";

export interface HerbResult {
  herb: Herb;
  /** How the herb matched. "all" means there was no query. */
  matchedOn: "name" | "alias" | "benefit" | "all";
  /** Benefits containing the query (empty unless matchedOn is "benefit"). */
  matchedBenefits: string[];
}

const RANK: Record<HerbResult["matchedOn"], number> = { all: 0, name: 1, alias: 2, benefit: 3 };

/**
 * Find herbs whose name, other names, scientific name, or benefits contain the query.
 * Name matches rank first (names that start with the query before others), then other names,
 * then benefit matches. Ties are alphabetical.
 */
export function searchHerbs(herbs: Herb[], query: string, category: CategoryFilter = "all"): HerbResult[] {
  const q = normalize(query);
  const pool = category === "all" ? herbs : herbs.filter((h) => h.category === category);
  if (!q) return pool.map((herb) => ({ herb, matchedOn: "all", matchedBenefits: [] }));

  const scored: Array<{ result: HerbResult; score: number }> = [];
  for (const herb of pool) {
    const name = normalize(herb.name);
    if (name.includes(q)) {
      const startsWord = name.startsWith(q) ? 0 : 0.5;
      scored.push({ result: { herb, matchedOn: "name", matchedBenefits: [] }, score: RANK.name + startsWord });
      continue;
    }
    if ([...herb.aliases, herb.scientificName, herb.id].some((n) => normalize(n).includes(q))) {
      scored.push({ result: { herb, matchedOn: "alias", matchedBenefits: [] }, score: RANK.alias });
      continue;
    }
    const matchedBenefits = herb.benefits.filter((b) => normalize(b).includes(q));
    if (matchedBenefits.length) {
      scored.push({ result: { herb, matchedOn: "benefit", matchedBenefits }, score: RANK.benefit });
    }
  }
  return scored
    .sort((a, b) => a.score - b.score || a.result.herb.name.localeCompare(b.result.herb.name))
    .map((s) => s.result);
}

/** Find remedies whose name, summary, "good for" tags, or ingredients contain the query. */
export function searchRemedies(remedies: Remedy[], query: string): Remedy[] {
  const q = normalize(query);
  if (!q) return [];
  return remedies.filter((r) =>
    [r.name, r.summary, r.form, ...r.goodFor, ...r.ingredients.map((i) => i.item)].some((text) =>
      normalize(text).includes(q),
    ),
  );
}
