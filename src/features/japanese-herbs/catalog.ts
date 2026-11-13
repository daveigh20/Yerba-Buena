import { useMemo } from "react";
import { type Lang, useLanguage } from "../../i18n/LanguageContext";
import { JAPANESE_HERB_BASE, JAPANESE_HERB_IDS, JAPANESE_HERB_TEXT_EN, type JapaneseHerb } from "./data";
import { JAPANESE_HERB_TEXT_ES } from "./data.es";

const TEXT = { en: JAPANESE_HERB_TEXT_EN, es: JAPANESE_HERB_TEXT_ES } as const;

const cache = new Map<Lang, JapaneseHerb[]>();

/** Japanese herbs in the source article's order, in the given language. */
export function getJapaneseHerbs(lang: Lang): JapaneseHerb[] {
  let herbs = cache.get(lang);
  if (!herbs) {
    herbs = JAPANESE_HERB_IDS.map((id) => ({ id, ...JAPANESE_HERB_BASE[id], ...TEXT[lang][id] }));
    cache.set(lang, herbs);
  }
  return herbs;
}

export function useJapaneseHerbs() {
  const { lang } = useLanguage();
  return useMemo(() => {
    const herbs = getJapaneseHerbs(lang);
    // On the Spanish site, English names still find the herb ("japanese pepper" finds Sansho).
    const otherNames = (herb: JapaneseHerb) =>
      lang === "en" ? [] : [JAPANESE_HERB_TEXT_EN[herb.id].name, ...JAPANESE_HERB_TEXT_EN[herb.id].aliases];
    return { lang, herbs, otherNames, getHerb: (id: string | undefined) => herbs.find((h) => h.id === id) };
  }, [lang]);
}
