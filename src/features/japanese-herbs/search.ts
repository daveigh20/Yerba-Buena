import { normalize } from "../herbs/lib/normalize";
import type { JapaneseHerb } from "./data";

export interface JapaneseHerbResult {
  herb: JapaneseHerb;
  /** An alias or other name that matched, when the visible name didn't. */
  matchedAlias?: string;
  /** A passage from the description or how-to steps that matched, when nothing on the card did. */
  matchedText?: string;
}

const includes = (text: string, q: string, raw: string) =>
  (q !== "" && normalize(text).includes(q)) || (raw !== "" && text.includes(raw));

/**
 * Filters Japanese herbs by name (in any language or in Japanese script), scientific name,
 * flavor, or anything in the description and how-to steps. Name matches come first.
 * `otherNames` adds names to match without showing them, such as English names on the Spanish site.
 */
export function searchJapaneseHerbs(
  herbs: JapaneseHerb[],
  query: string,
  otherNames: (herb: JapaneseHerb) => string[] = () => [],
): JapaneseHerbResult[] {
  const q = normalize(query);
  // normalize() drops non-Latin characters, so match Japanese script on the raw text.
  const raw = /[^\u0000-ɏ]/.test(query) ? query.trim() : "";
  if (!q && !raw) return herbs.map((herb) => ({ herb }));

  const ranked: Array<{ rank: number; result: JapaneseHerbResult }> = [];
  for (const herb of herbs) {
    const match = (text: string) => includes(text, q, raw);
    if ([herb.name, herb.romaji, herb.japaneseName].some(match)) {
      ranked.push({ rank: 0, result: { herb } });
      continue;
    }
    const alias = [...herb.aliases, ...otherNames(herb)].find(match);
    if (alias) {
      ranked.push({ rank: 1, result: { herb, matchedAlias: alias } });
      continue;
    }
    if ([herb.scientificName, herb.summary].some(match)) {
      ranked.push({ rank: 2, result: { herb } });
      continue;
    }
    const text = [herb.flavor, ...herb.partsUsed, herb.description, ...herb.howToUse, herb.storage].find(match);
    if (text) ranked.push({ rank: 3, result: { herb, matchedText: excerpt(text, q, raw) } });
  }
  return ranked.sort((a, b) => a.rank - b.rank).map((r) => r.result);
}

/** The sentence of `text` containing the match, so the card can show why it matched. */
function excerpt(text: string, q: string, raw: string): string {
  const sentences = text.match(/[^.!?]+[.!?]*/g) ?? [text];
  return (sentences.find((s) => includes(s, q, raw)) ?? text).trim();
}
