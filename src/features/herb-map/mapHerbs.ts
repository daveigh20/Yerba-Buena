import { useMemo } from "react";
import type { Lang } from "../../i18n/messages";
import { useLanguage } from "../../i18n/LanguageContext";
import { getCatalog } from "../herbs/data";
import { getJapaneseHerbs } from "../japanese-herbs/catalog";
import { type Edibility, type EdibilityText, edibilityText, HERB_EDIBILITY, JAPANESE_HERB_EDIBILITY } from "./edibility";
import type { HerbSighting } from "./sightings";
import { HERB_TAXON_IDS, JAPANESE_HERB_TAXON_IDS } from "./taxa";

/** An herb from one of our catalogs that can be found on the map. */
export interface MapHerb {
  /** Unique across both catalogs, such as "herbs:nettle" or "japanese:yomogi". */
  key: string;
  group: "herbs" | "japanese";
  name: string;
  scientificName: string;
  href: string;
  taxonIds: number[];
  /** Whether people can eat it, and what to know if so. */
  edibility: Edibility;
  eat: EdibilityText;
}

export interface MapHerbs {
  /** Every mappable herb, the herb guide first, each group sorted by name. */
  herbs: MapHerb[];
  get(key: string): MapHerb | undefined;
  /** Our herbs that a sighting is of. Several herbs can share a plant, like the true teas. */
  herbsFor(sighting: HerbSighting): MapHerb[];
  /** Every taxon id on the map, for searching all herbs at once. */
  allTaxonIds: number[];
}

export function buildMapHerbs(lang: Lang): MapHerbs {
  const main = getCatalog(lang).herbs.map(
    (herb): MapHerb => ({
      key: `herbs:${herb.id}`,
      group: "herbs",
      name: herb.name,
      scientificName: herb.scientificName,
      href: `/herbs/${herb.id}`,
      taxonIds: HERB_TAXON_IDS[herb.id],
      edibility: HERB_EDIBILITY[herb.id],
      eat: edibilityText(lang, herb.id),
    }),
  );
  const japanese = getJapaneseHerbs(lang)
    .map(
      (herb): MapHerb => ({
        key: `japanese:${herb.id}`,
        group: "japanese",
        name: herb.name,
        scientificName: herb.scientificName,
        href: `/japanese-herbs/${herb.id}`,
        taxonIds: JAPANESE_HERB_TAXON_IDS[herb.id],
        edibility: JAPANESE_HERB_EDIBILITY[herb.id],
        eat: edibilityText(lang, herb.id),
      }),
    )
    .sort((a, b) => a.name.localeCompare(b.name, lang));
  const herbs = [...main, ...japanese].filter((herb) => herb.taxonIds.length > 0);

  const byKey = new Map(herbs.map((herb) => [herb.key, herb]));
  const byTaxon = new Map<number, MapHerb[]>();
  for (const herb of herbs) {
    for (const id of herb.taxonIds) byTaxon.set(id, [...(byTaxon.get(id) ?? []), herb]);
  }

  return {
    herbs,
    get: (key) => byKey.get(key),
    herbsFor(sighting) {
      const found = sighting.taxonIds.flatMap((id) => byTaxon.get(id) ?? []);
      return [...new Set(found)];
    },
    allTaxonIds: [...byTaxon.keys()].sort((a, b) => a - b),
  };
}

/** The trail map, opened on one herb's sightings. */
export function herbMapUrl(key: string): string {
  return `/trail-map?herb=${encodeURIComponent(key)}`;
}

const cache = new Map<Lang, MapHerbs>();

export function getMapHerbs(lang: Lang): MapHerbs {
  let herbs = cache.get(lang);
  if (!herbs) {
    herbs = buildMapHerbs(lang);
    cache.set(lang, herbs);
  }
  return herbs;
}

export function useMapHerbs(): MapHerbs {
  const { lang } = useLanguage();
  return useMemo(() => getMapHerbs(lang), [lang]);
}
