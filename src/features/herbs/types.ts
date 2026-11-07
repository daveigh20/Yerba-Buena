import type { HerbId } from "./data/herbs";

export type { HerbId };

/** "true-tea" = leaves of the tea plant, Camellia sinensis. Everything else is "herbal". */
export type HerbCategory = "true-tea" | "herbal";

export interface HerbProfile {
  name: string;
  /** Other names people might search for. */
  aliases: string[];
  scientificName: string;
  category: HerbCategory;
  partsUsed: string[];
  flavor: string;
  description: string;
  /** Short preparation guidance for using the herb on its own. */
  howToUse: string;
  /** Safety notes. Always shown on the herb page and on remedies that use the herb. */
  cautions: string[];
  /** Shown instead of remedies for herbs that shouldn't be used in homemade preparations. */
  remedyNote?: string;
}

export interface Herb extends HerbProfile {
  id: HerbId;
  /** Traditional wellness benefits, from the source article. */
  benefits: string[];
}

export interface RemedyIngredient {
  /** Set when the ingredient is an herb in our catalog, so it can link to the herb page. */
  herbId?: HerbId;
  item: string;
  amount: string;
  optional?: boolean;
}

export interface Remedy {
  id: string;
  name: string;
  form: "Tea" | "Decoction" | "Infusion" | "Syrup" | "Latte" | "Steam" | "Tonic" | "Cold brew";
  summary: string;
  goodFor: string[];
  time: string;
  makes: string;
  ingredients: RemedyIngredient[];
  steps: string[];
  cautions?: string[];
}
