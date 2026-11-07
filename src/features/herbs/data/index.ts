import type { Herb, HerbId, Remedy } from "../types";
import { buildBenefitIndex } from "./benefits";
import { HERB_IDS, HERB_PROFILES } from "./herbs";
import { REMEDIES } from "./remedies";

export { SOURCE } from "./benefits";

const benefitIndex = buildBenefitIndex();

/** All herbs, sorted by name. */
export const HERBS: Herb[] = HERB_IDS.map((id) => ({
  id,
  ...HERB_PROFILES[id],
  benefits: benefitIndex.get(id) ?? [],
})).sort((a, b) => a.name.localeCompare(b.name));

const herbsById = new Map<string, Herb>(HERBS.map((h) => [h.id, h]));
const remediesById = new Map<string, Remedy>(REMEDIES.map((r) => [r.id, r]));

export { REMEDIES };

export function getHerb(id: string | undefined): Herb | undefined {
  return id ? herbsById.get(id) : undefined;
}

export function getRemedy(id: string | undefined): Remedy | undefined {
  return id ? remediesById.get(id) : undefined;
}

/** Unique herb ids used as ingredients in a remedy, in recipe order. */
export function remedyHerbIds(remedy: Remedy): HerbId[] {
  const ids = remedy.ingredients.flatMap((i) => (i.herbId ? [i.herbId] : []));
  return [...new Set(ids)];
}

export function remediesForHerb(id: HerbId): Remedy[] {
  return REMEDIES.filter((r) => remedyHerbIds(r).includes(id));
}

/** Other herbs that show up in the same remedies, most frequent first. */
export function herbsPairedWith(id: HerbId): Herb[] {
  const counts = new Map<HerbId, number>();
  for (const remedy of remediesForHerb(id)) {
    for (const other of remedyHerbIds(remedy)) {
      if (other !== id) counts.set(other, (counts.get(other) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .flatMap(([other]) => herbsById.get(other) ?? []);
}
