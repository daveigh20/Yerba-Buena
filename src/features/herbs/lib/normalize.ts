/**
 * Search-friendly text: lowercase, accents removed, apostrophes and periods dropped,
 * everything else that isn't a letter or digit collapsed to single spaces.
 * So "St. John's Wort" and "st johns wort" both become "st johns wort".
 *
 * `map[i]` is the index in the original text of normalized character `i`,
 * which lets us highlight matches in the original text.
 */
export function normalizeWithMap(text: string): { norm: string; map: number[] } {
  let norm = "";
  const map: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const base = text[i]!.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    for (const ch of base) {
      if (ch === "'" || ch === "’" || ch === ".") continue;
      const out = /[a-z0-9]/.test(ch) ? ch : " ";
      if (out === " " && (norm === "" || norm.endsWith(" "))) continue;
      norm += out;
      map.push(i);
    }
  }
  if (norm.endsWith(" ")) {
    norm = norm.slice(0, -1);
    map.pop();
  }
  return { norm, map };
}

export function normalize(text: string): string {
  return normalizeWithMap(text).norm;
}

/** [start, end) ranges in `text` where `query` matches, ignoring case, accents, and punctuation. */
export function findMatches(text: string, query: string): Array<[number, number]> {
  const q = normalize(query);
  if (!q) return [];
  const { norm, map } = normalizeWithMap(text);
  const ranges: Array<[number, number]> = [];
  let from = 0;
  for (;;) {
    const idx = norm.indexOf(q, from);
    if (idx === -1) break;
    ranges.push([map[idx]!, map[idx + q.length - 1]! + 1]);
    from = idx + q.length;
  }
  return ranges;
}
