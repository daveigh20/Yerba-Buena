import type { Lang } from "./messages";

/** Spanish doesn't capitalize common nouns, so "Flor de jamaica" reads as "flor de jamaica" mid-sentence. */
export function inSentence(name: string, lang: Lang): string {
  return lang === "es" ? name.charAt(0).toLowerCase() + name.slice(1) : name;
}
