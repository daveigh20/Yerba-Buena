import type { HerbId } from "../herbs/data/herbs";
import type { JapaneseHerbId } from "../japanese-herbs/data";

/**
 * iNaturalist taxon ids for every herb in our catalogs, looked up from each herb's scientific name.
 * A sighting of the taxon or anything under it (a subspecies, or a species in a genus) counts.
 * Typed as full records so a new herb can't be added to a catalog without deciding its map taxa.
 * An empty list means iNaturalist can't tell the herb apart, so it stays off the map.
 */
export const HERB_TAXON_IDS: Record<HerbId, number[]> = {
  artichoke: [57563], // Cynara cardunculus: iNaturalist rarely separates the artichoke from wild cardoon.
  beetroot: [54498],
  bilberry: [127029],
  "black-cohosh": [119813],
  "black-tea": [123005], // All the true teas are the tea plant, Camellia sinensis.
  "black-walnut": [54504],
  chamomile: [77965],
  chasteberry: [170271],
  cinnamon: [122777, 774822],
  "dandelion-root": [47602],
  echinacea: [48627, 162167],
  elderberry: [1665961], // The Sambucus nigra complex, which includes American black elderberry.
  eucalyptus: [53398],
  fennel: [53052],
  fenugreek: [122771],
  ginger: [122971],
  ginkgo: [64350],
  ginseng: [366498, 116333],
  "green-tea": [123005],
  hawthorn: [51148], // The genus Crataegus.
  hibiscus: [1687652], // Roselle, filed by iNaturalist as Sabdariffa gossypiifolia.
  lavender: [133395],
  "lemon-balm": [59901],
  "licorice-root": [77295],
  lobelia: [62351],
  matcha: [123005],
  "milk-thistle": [52586],
  nettle: [1631210], // The Urtica dioica complex, so local stinging nettles count too.
  "oat-straw": [57156],
  "oolong-tea": [123005],
  passionflower: [51453],
  "pau-darco": [281274],
  peppermint: [181525],
  "prickly-pear": [64119],
  "red-clover": [51875],
  "red-raspberry-leaf": [54436],
  rooibos: [447656],
  "slippery-elm": [54860],
  "st-johns-wort": [56077],
  thyme: [85469],
  turmeric: [119386],
  "white-tea": [123005],
  wormwood: [60350],
};

export const JAPANESE_HERB_TAXON_IDS: Record<JapaneseHerbId, number[]> = {
  shiso: [119136], // Perilla frutescens: sightings are rarely named down to the shiso variety.
  wasabi: [123047],
  yomogi: [452353],
  mitsuba: [496962],
  kuromoji: [428425],
  sansho: [332459],
  kiku: [53806],
  gobo: [75501],
  kombu: [194654],
  ashitaba: [777001],
  "naginata-koju": [162273],
  "ibuki-jakoso": [500374],
  toki: [922164],
  // iNaturalist lumps tachibana into mandarin (Citrus deliciosa), so every tangerine tree would show up as it.
  tachibana: [],
  getto: [154776],
  hamanasu: [83653],
  dokudami: [157642],
  "sakura-leaf": [47352],
  hatomugi: [145588], // Coix lacryma-jobi: the ma-yuen variety is rarely recorded on its own.
  tsubaki: [83056],
  kawamidori: [506801],
  kuko: [164955],
};
