import { useMemo } from "react";
import { type Lang, useLanguage } from "../../../i18n/LanguageContext";
import type { Herb, HerbId, Remedy } from "../types";
import { buildBenefitIndex } from "./benefits";
import { BENEFIT_ES } from "./benefits.es";
import { BENEFIT_JA } from "./benefits.ja";
import { BENEFIT_ZH } from "./benefits.zh";
import { HERB_IDS, HERB_PROFILES } from "./herbs";
import { HERB_TEXT_ES } from "./herbs.es";
import { HERB_TEXT_JA } from "./herbs.ja";
import { HERB_TEXT_ZH } from "./herbs.zh";
import { REMEDIES as REMEDIES_EN } from "./remedies";
import { REMEDY_TEXT_ES } from "./remedies.es";
import { REMEDY_TEXT_JA } from "./remedies.ja";
import { REMEDY_TEXT_ZH } from "./remedies.zh";

export { SOURCE } from "./benefits";

const benefitIndex = buildBenefitIndex();

/** Translated herb and remedy text. English is the source, in herbs.ts and remedies.ts. */
const HERB_TEXT: Partial<Record<Lang, typeof HERB_TEXT_ES>> = { es: HERB_TEXT_ES, ja: HERB_TEXT_JA, zh: HERB_TEXT_ZH };
const REMEDY_TEXT: Partial<Record<Lang, typeof REMEDY_TEXT_ES>> = { es: REMEDY_TEXT_ES, ja: REMEDY_TEXT_JA, zh: REMEDY_TEXT_ZH };
const BENEFIT_TEXT: Partial<Record<Lang, typeof BENEFIT_ES>> = { es: BENEFIT_ES, ja: BENEFIT_JA, zh: BENEFIT_ZH };

function buildHerbs(lang: Lang): Herb[] {
  return HERB_IDS.map((id): Herb => {
    const base = HERB_PROFILES[id];
    const benefits = benefitIndex.get(id) ?? [];
    const texts = HERB_TEXT[lang];
    if (!texts) return { id, ...base, benefits };
    const text = texts[id];
    const benefitText = BENEFIT_TEXT[lang] ?? {};
    return {
      id,
      ...base,
      ...text,
      // Keep the English names searchable too, so "ginger" still finds Jengibre.
      searchNames: [base.name, ...base.aliases],
      remedyNote: text.remedyNote,
      benefits: benefits.map((b) => benefitText[b] ?? b),
    };
  }).sort((a, b) => a.name.localeCompare(b.name, lang));
}

function buildRemedies(lang: Lang): Remedy[] {
  const texts = REMEDY_TEXT[lang];
  if (!texts) return REMEDIES_EN;
  return REMEDIES_EN.map((r) => {
    const text = texts[r.id];
    if (!text) return r;
    return {
      ...r,
      ...text,
      ingredients: r.ingredients.map((ing, i) => ({ ...ing, ...text.ingredients[i] })),
      cautions: text.cautions ?? r.cautions,
    };
  });
}

export interface Catalog {
  lang: Lang;
  /** All herbs, sorted by name in this language. */
  herbs: Herb[];
  remedies: Remedy[];
  getHerb(id: string | undefined): Herb | undefined;
  getRemedy(id: string | undefined): Remedy | undefined;
  remediesForHerb(id: HerbId): Remedy[];
  /** Other herbs that show up in the same remedies, most frequent first. */
  herbsPairedWith(id: HerbId): Herb[];
}

/** Unique herb ids used as ingredients in a remedy, in recipe order. */
export function remedyHerbIds(remedy: Remedy): HerbId[] {
  const ids = remedy.ingredients.flatMap((i) => (i.herbId ? [i.herbId] : []));
  return [...new Set(ids)];
}

function buildCatalog(lang: Lang): Catalog {
  const herbs = buildHerbs(lang);
  const remedies = buildRemedies(lang);
  const herbsById = new Map<string, Herb>(herbs.map((h) => [h.id, h]));
  const remediesById = new Map<string, Remedy>(remedies.map((r) => [r.id, r]));
  const remediesForHerb = (id: HerbId) => remedies.filter((r) => remedyHerbIds(r).includes(id));

  return {
    lang,
    herbs,
    remedies,
    getHerb: (id) => (id ? herbsById.get(id) : undefined),
    getRemedy: (id) => (id ? remediesById.get(id) : undefined),
    remediesForHerb,
    herbsPairedWith(id) {
      const counts = new Map<HerbId, number>();
      for (const remedy of remediesForHerb(id)) {
        for (const other of remedyHerbIds(remedy)) {
          if (other !== id) counts.set(other, (counts.get(other) ?? 0) + 1);
        }
      }
      return [...counts.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .flatMap(([other]) => herbsById.get(other) ?? []);
    },
  };
}

const catalogs = new Map<Lang, Catalog>();

export function getCatalog(lang: Lang): Catalog {
  let catalog = catalogs.get(lang);
  if (!catalog) {
    catalog = buildCatalog(lang);
    catalogs.set(lang, catalog);
  }
  return catalog;
}

/** The herb and remedy catalog in the visitor's language. */
export function useCatalog(): Catalog {
  const { lang } = useLanguage();
  return useMemo(() => getCatalog(lang), [lang]);
}

// English catalog, for tests and non-React code.
const english = getCatalog("en");
export const HERBS = english.herbs;
export const REMEDIES = english.remedies;
export const getHerb = english.getHerb;
export const getRemedy = english.getRemedy;
export const remediesForHerb = english.remediesForHerb;
export const herbsPairedWith = english.herbsPairedWith;
