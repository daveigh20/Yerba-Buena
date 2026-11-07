import type { HerbId } from "./herbs";

export const SOURCE = {
  title: "The Power of Tea: 100 Health and Wellness Benefits",
  publisher: "The Tea House on Los Rios",
  url: "https://theteahouseonlosrios.com/blogs/news/the-power-of-tea-100-health-and-wellness-benefits",
} as const;

/**
 * Copied verbatim from the source article, one "Benefit|herb, herb" per line.
 * The article lists benefit -> teas; buildBenefitIndex() inverts it to herb -> benefits.
 * Generic entries ("any hot tea", "social rituals", "enjoyment") are left out.
 */
const RAW = `Help with sleep|chamomile
Settle stomach|peppermint
Relaxation and stress relief|chamomile, lavender
Digestive aid|peppermint, ginger
Hydration|green, white
Boosting immunity|echinacea, elderberry
Energy and alertness|black, green
Weight management|green, oolong
Antioxidant source|green, white
Hygiene and oral health|peppermint, green
Mood enhancement|lavender, chamomile
Mental focus and concentration|matcha
Detoxification and cleansing|dandelion root, milk thistle
Cold and flu relief|ginger
Allergy relief|nettle
Sore throat soothing|licorice root, slippery elm
Headache relief|peppermint, chamomile
Heart health support|hibiscus, green
Anti-inflammatory effects|ginger, turmeric
Skin health improvement|rooibos, green
Anti-aging properties|white, green
Respiratory health improvement|eucalyptus, thyme
Joint and muscle pain relief|turmeric, ginger
Menstrual cramp relief|chamomile, ginger
Blood sugar regulation|green, cinnamon
Caffeine replacement|rooibos, chamomile
Hangover remedy|ginger, peppermint
Kidney health support|dandelion root, nettle
Liver health support|milk thistle, dandelion root
Eye health improvement|bilberry, green
Memory and cognitive enhancement|ginseng, ginkgo biloba
Nervous system support|lemon balm, passionflower
Hormonal balance|red clover, chasteberry
Appetite control|peppermint, green
Anti-anxiety effects|lavender, chamomile
Anti-depressant effects|st. john's wort, lemon balm
Cancer prevention|green, white
Blood pressure regulation|hibiscus, green
Cholesterol reduction|green, black
Diuretic effects|dandelion root, nettle
Oral hygiene improvement|peppermint, green
Weight loss aid|green, oolong
Improved digestion|peppermint, ginger
Bone health support|nettle, chamomile
Anti-bacterial properties|green, black
Anti-viral properties|echinacea, elderberry
Anti-fungal properties|pau d'arco, chamomile
Anti-parasitic properties|wormwood, black walnut
Hangover prevention|cactus, artichoke
Alleviating motion sickness|ginger, peppermint
Detoxifying effects|dandelion root, milk thistle
Brain function improvement|ginseng, green
Relaxation before meditation or yoga|chamomile, lavender
Calming nerves before public speaking|chamomile, lemon balm
Pre- and post-workout hydration|green
Reducing sugar cravings|licorice root, cinnamon
Skin complexion improvement|rooibos, green
Reducing bloating and gas|peppermint, ginger
Easing arthritis symptoms|turmeric, ginger
Improving hair health|nettle, green
Supporting healthy weight gain|rooibos, oat straw
Boosting metabolism|green, oolong
Aid in quitting smoking|lobelia, peppermint
Alleviating morning sickness|ginger, lemon balm
Soothing sunburned skin|chamomile, green
Alleviating allergy symptoms|nettle, chamomile
Managing diabetes|green, cinnamon
Supporting healthy digestion in infants|fennel, chamomile
Easing PMS symptoms|chamomile, ginger
Supporting breastfeeding|fennel, fenugreek
Reducing inflammation in the body|ginger, turmeric
Improving circulation|ginger, hawthorn
Relieving muscle tension|peppermint, chamomile
Managing irritable bowel syndrome (IBS)|peppermint, chamomile
Easing asthma symptoms|ginger, chamomile
Boosting collagen production|rooibos, green
Supporting healthy pregnancy|red raspberry leaf, nettle
Alleviating menopause symptoms|black cohosh, red clover
Enhancing nutrient absorption|rooibos, green
Supporting liver detoxification|dandelion root, milk thistle
Aiding in weight maintenance|green
Enhancing athletic performance|matcha, beetroot
Reducing water retention|dandelion root, nettle
Promoting healthy hair growth|nettle, green
Supporting healthy aging|white, green
Enhancing metabolism during exercise|green, oolong
Boosting natural detoxification processes|dandelion root, milk thistle
Improving gut health|peppermint, chamomile
Boosting the immune response|echinacea, elderberry
Improving cardiovascular health|hibiscus, green
Enhancing respiratory function|eucalyptus, thyme
Alleviating muscle soreness after exercise|ginger, chamomile
Promoting mental clarity and focus|matcha, ginkgo biloba
Supporting a healthy gut microbiome|peppermint, ginger
Easing chronic pain|turmeric, ginger
Promoting overall well-being|green
Enhancing the body's natural defenses|green, black`;

/** Maps the names used in the article to catalog ids. */
const SOURCE_NAME_TO_ID: Record<string, HerbId> = {
  artichoke: "artichoke",
  beetroot: "beetroot",
  bilberry: "bilberry",
  "black cohosh": "black-cohosh",
  black: "black-tea",
  "black walnut": "black-walnut",
  cactus: "prickly-pear",
  chamomile: "chamomile",
  chasteberry: "chasteberry",
  cinnamon: "cinnamon",
  "dandelion root": "dandelion-root",
  echinacea: "echinacea",
  elderberry: "elderberry",
  eucalyptus: "eucalyptus",
  fennel: "fennel",
  fenugreek: "fenugreek",
  ginger: "ginger",
  "ginkgo biloba": "ginkgo",
  ginseng: "ginseng",
  green: "green-tea",
  hawthorn: "hawthorn",
  hibiscus: "hibiscus",
  lavender: "lavender",
  "lemon balm": "lemon-balm",
  "licorice root": "licorice-root",
  lobelia: "lobelia",
  matcha: "matcha",
  "milk thistle": "milk-thistle",
  nettle: "nettle",
  "oat straw": "oat-straw",
  oolong: "oolong-tea",
  passionflower: "passionflower",
  "pau d'arco": "pau-darco",
  peppermint: "peppermint",
  "red clover": "red-clover",
  "red raspberry leaf": "red-raspberry-leaf",
  rooibos: "rooibos",
  "slippery elm": "slippery-elm",
  "st. john's wort": "st-johns-wort",
  thyme: "thyme",
  turmeric: "turmeric",
  white: "white-tea",
  wormwood: "wormwood",
};

export function buildBenefitIndex(raw: string = RAW): Map<HerbId, string[]> {
  const index = new Map<HerbId, string[]>();
  for (const line of raw.trim().split("\n")) {
    const [benefit, names] = line.split("|");
    if (!benefit || !names) throw new Error(`Malformed benefit line: "${line}"`);
    for (const name of names.split(",")) {
      const id = SOURCE_NAME_TO_ID[name.trim()];
      if (!id) throw new Error(`Unknown herb "${name.trim()}" in benefit line: "${line}"`);
      const list = index.get(id) ?? [];
      list.push(benefit.trim());
      index.set(id, list);
    }
  }
  return index;
}
