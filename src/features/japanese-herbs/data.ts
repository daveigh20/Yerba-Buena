/**
 * Japanese herbs and spices. The herb list and their traditional uses come from the source
 * articles below; preparation steps, storage tips, and cautions are added so each page is
 * practical to cook or brew with.
 */

export interface JapaneseSource {
  title: string;
  publisher: string;
  url: string;
}

export const JAPANESE_SOURCES: readonly JapaneseSource[] = [
  {
    title: "Japanese Herbs and Spices: Aromas and Tastes from Nature",
    publisher: "Kokoro Care",
    url: "https://kokorocares.com/blogs/blog/japanese-herbs-and-spices",
  },
  {
    // Kiku, gobo, kombu, and ashitaba. Its ginseng is already in the main herb catalog, so it isn't repeated here.
    title: "10 Japanese herbs that are used for longevity",
    publisher: "The Times of India",
    url: "https://timesofindia.indiatimes.com/life-style/food-news/10-japanese-herbs-that-are-used-for-longevity/photostory/119201702.cms",
  },
  {
    // The wa-herbs in the shop's tea blends. Yomogi is already above. Shop prices aren't included.
    title: "Wa-herb",
    publisher: "Waho-An Nature Tokyo",
    url: "https://natura-w.com/en/waherb.html",
  },
  {
    // A skincare brand's ingredient list. Kuromoji, dokudami, and gettō are already above, and tea leaf
    // (Camellia sinensis) is in the main herb catalog, so only cherry leaf, coix seed, and camellia are new.
    title: "Japanese herb list",
    publisher: "ORIFUSI",
    url: "https://orifusi.com/en-english/blogs/item/japanese-herbs",
  },
  {
    // Four herbs to grow on a balcony. Shiso and sanshō are already above, so only Korean mint and goji are new.
    title: "Grow Your Own Japanese Herbs and Spices",
    publisher: "Savvy Tokyo",
    url: "https://savvytokyo.com/grow-your-own-japanese-herbs-and-spices/",
  },
];

export const JAPANESE_HERB_IDS = [
  "shiso",
  "wasabi",
  "yomogi",
  "mitsuba",
  "kuromoji",
  "sansho",
  "kiku",
  "gobo",
  "kombu",
  "ashitaba",
  "naginata-koju",
  "ibuki-jakoso",
  "toki",
  "tachibana",
  "getto",
  "hamanasu",
  "dokudami",
  "sakura-leaf",
  "hatomugi",
  "tsubaki",
  "kawamidori",
  "kuko",
] as const;

export type JapaneseHerbId = (typeof JAPANESE_HERB_IDS)[number];

export interface JapaneseHerbText {
  name: string;
  /** Other names people might search for. */
  aliases: string[];
  partsUsed: string[];
  flavor: string;
  /** One sentence for the card. */
  summary: string;
  description: string;
  /** Step-by-step ways to use the herb, in the order most people would try them. */
  howToUse: string[];
  /** Buying and storing tips. */
  storage: string;
  cautions: string[];
}

export interface JapaneseHerb extends JapaneseHerbText {
  id: JapaneseHerbId;
  /** The name in Japanese script. */
  japaneseName: string;
  /** The Japanese name in the Latin alphabet. */
  romaji: string;
  scientificName: string;
  /** Photos for the detail page. The first one is also shown on the herb's card. */
  images?: JapaneseHerbImage[];
}

/** A freely licensed photo, served from public/images/japanese-herbs. */
export interface JapaneseHerbImage {
  src: string;
  width: number;
  height: number;
  /** What the photo shows, when the herb has more than one photo. */
  label?: { en: string; es: string };
  /** Photographer, as the license asks to credit them. */
  credit: string;
  license: string;
  licenseUrl: string;
  /** The photo's Wikimedia Commons page. */
  sourceUrl: string;
}

type JapaneseHerbBase = Pick<JapaneseHerb, "japaneseName" | "romaji" | "scientificName" | "images">;

const COMMONS = "https://commons.wikimedia.org/wiki/File:";
const CC_BY_SA_3 = { license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/" };
const CC_BY_SA_4 = { license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" };
const CC_BY_4 = { license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/" };
const CC_BY_3 = { license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0/" };
const CC0 = { license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/" };
const CC_BY_2 = { license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/" };

export const JAPANESE_HERB_BASE: Record<JapaneseHerbId, JapaneseHerbBase> = {
  shiso: { japaneseName: "紫蘇", romaji: "Shiso", scientificName: "Perilla frutescens var. crispa" },
  wasabi: { japaneseName: "本わさび", romaji: "Hon-wasabi", scientificName: "Eutrema japonicum" },
  yomogi: { japaneseName: "蓬", romaji: "Yomogi", scientificName: "Artemisia princeps" },
  mitsuba: { japaneseName: "三つ葉", romaji: "Mitsuba", scientificName: "Cryptotaenia japonica" },
  kuromoji: {
    japaneseName: "クロモジ",
    romaji: "Kuromoji",
    scientificName: "Lindera umbellata",
    images: [
      {
        src: "/images/japanese-herbs/kuromoji.jpg",
        width: 800,
        height: 506,
        credit: "Alpsdake",
        ...CC_BY_SA_3,
        sourceUrl: `${COMMONS}Lindera_umbellata.jpg`,
      },
    ],
  },
  sansho: { japaneseName: "山椒", romaji: "Sanshō", scientificName: "Zanthoxylum piperitum" },
  kiku: { japaneseName: "菊", romaji: "Kiku", scientificName: "Chrysanthemum morifolium" },
  gobo: { japaneseName: "牛蒡", romaji: "Gobō", scientificName: "Arctium lappa" },
  kombu: { japaneseName: "昆布", romaji: "Kombu", scientificName: "Saccharina japonica" },
  ashitaba: { japaneseName: "明日葉", romaji: "Ashitaba", scientificName: "Angelica keiskei" },
  "naginata-koju": { japaneseName: "ナギナタコウジュ", romaji: "Naginata-kōju", scientificName: "Elsholtzia ciliata" },
  "ibuki-jakoso": { japaneseName: "イブキジャコウソウ", romaji: "Ibuki-jakōsō", scientificName: "Thymus quinquecostatus" },
  toki: { japaneseName: "当帰", romaji: "Tōki", scientificName: "Angelica acutiloba" },
  tachibana: { japaneseName: "橘", romaji: "Tachibana", scientificName: "Citrus tachibana" },
  getto: {
    japaneseName: "月桃",
    romaji: "Gettō",
    scientificName: "Alpinia zerumbet",
    images: [
      {
        src: "/images/japanese-herbs/getto.jpg",
        width: 800,
        height: 600,
        credit: "Michael H. Parker",
        ...CC_BY_SA_4,
        sourceUrl: `${COMMONS}Alpinia_zerumbet_-_shell_ginger.jpg`,
      },
    ],
  },
  hamanasu: {
    japaneseName: "ハマナス",
    romaji: "Hamanasu",
    scientificName: "Rosa rugosa",
    images: [
      {
        src: "/images/japanese-herbs/hamanasu-rose.jpg",
        width: 800,
        height: 602,
        label: { en: "Hamanasu rose", es: "Rosa hamanasu" },
        credit: "Letartean",
        ...CC_BY_3,
        sourceUrl: `${COMMONS}Rosa_rugosa_2010.jpg`,
      },
      {
        src: "/images/japanese-herbs/hamanasu-fruit.jpg",
        width: 800,
        height: 660,
        label: { en: "Hamanasu fruit", es: "Fruto de hamanasu" },
        credit: "W.carter",
        ...CC0,
        sourceUrl: `${COMMONS}Rose_hips_Rosa_rugosa_Hansa_2.jpg`,
      },
    ],
  },
  dokudami: {
    japaneseName: "ドクダミ",
    romaji: "Dokudami",
    scientificName: "Houttuynia cordata",
    images: [
      {
        src: "/images/japanese-herbs/dokudami.jpg",
        width: 800,
        height: 571,
        credit: "Krzysztof Ziarnek, Kenraiz",
        ...CC_BY_SA_4,
        sourceUrl: `${COMMONS}Houttuynia_cordata_kz01.jpg`,
      },
    ],
  },
  "sakura-leaf": {
    japaneseName: "桜の葉",
    romaji: "Sakura no ha",
    scientificName: "Prunus × yedoensis",
    images: [
      {
        src: "/images/japanese-herbs/sakura-leaf.jpg",
        width: 800,
        height: 533,
        credit: "David J. Stang",
        ...CC_BY_SA_4,
        sourceUrl: `${COMMONS}Prunus_x_yedoensis_2zz.jpg`,
      },
    ],
  },
  hatomugi: {
    japaneseName: "ハトムギ",
    romaji: "Hatomugi",
    scientificName: "Coix lacryma-jobi var. ma-yuen",
    images: [
      {
        src: "/images/japanese-herbs/hatomugi.jpg",
        width: 800,
        height: 600,
        credit: "Joe Wu",
        ...CC_BY_2,
        sourceUrl: `${COMMONS}Coix_Seed(%E8%96%8F%E4%BB%81)_(2158988134).jpg`,
      },
    ],
  },
  tsubaki: {
    japaneseName: "椿",
    romaji: "Tsubaki",
    scientificName: "Camellia japonica",
    images: [
      {
        src: "/images/japanese-herbs/tsubaki.jpg",
        width: 529,
        height: 800,
        credit: "Lucas Libre",
        ...CC_BY_4,
        sourceUrl: `${COMMONS}Camellia_japonica_flower_with_raindrops_in_the_sun.jpg`,
      },
    ],
  },
  kawamidori: {
    japaneseName: "カワミドリ",
    romaji: "Kawamidori",
    scientificName: "Agastache rugosa",
    images: [
      {
        src: "/images/japanese-herbs/kawamidori.jpg",
        width: 800,
        height: 600,
        credit: "Dalgial",
        ...CC_BY_SA_3,
        sourceUrl: `${COMMONS}Agastache_rugosa_01.JPG`,
      },
    ],
  },
  kuko: {
    japaneseName: "枸杞",
    romaji: "Kuko",
    scientificName: "Lycium chinense",
    images: [
      {
        src: "/images/japanese-herbs/kuko.jpg",
        width: 800,
        height: 533,
        credit: "Siamaksabet",
        ...CC_BY_SA_4,
        sourceUrl: `${COMMONS}Lycium_chinense(siamak_sabet)_(2).jpg`,
      },
    ],
  },
};

const FOOD_AMOUNTS = "Enjoy it in the amounts used in cooking. If you're pregnant or breastfeeding, don't take it in larger, medicinal amounts.";

export const JAPANESE_HERB_TEXT_EN: Record<JapaneseHerbId, JapaneseHerbText> = {
  shiso: {
    name: "Shiso",
    aliases: ["perilla", "perilla leaf", "japanese basil", "ooba", "akajiso", "red shiso"],
    partsUsed: ["Leaf", "Seed"],
    flavor: "Bright and herbal, like mint and basil with a hint of citrus",
    summary: "A mint-family leaf used whole with sushi, shredded over noodles, or fried as tempura.",
    description:
      "Shiso, also called perilla or Japanese basil, is a member of the mint family and one of the most common herbs in Japanese cooking. Green shiso is used fresh as a garnish and wrapper, while red shiso (akajiso) is what gives umeboshi (pickled plums) their pink-purple color. Its seeds are one of the seven spices in shichimi togarashi.",
    howToUse: [
      "As a garnish: stack a few leaves, roll them up tightly, and slice into thin ribbons. Scatter over cold noodles, rice, grilled fish, or soup just before serving.",
      "With sushi and sashimi: lay a whole fresh leaf under sashimi, or tuck one inside a hand roll or around a rice ball (onigiri).",
      "As tempura: dip just one side of the leaf in a thin batter and fry for a few seconds until crisp.",
      "Red shiso: use it to color and flavor pickled plums (umeboshi), or buy dried red shiso flakes (yukari) to sprinkle on rice.",
      "As a simple tea: steep 4 to 5 fresh leaves in 1 cup of hot water for about 5 minutes.",
    ],
    storage:
      "Fresh leaves wilt quickly. Wrap them in a damp paper towel, keep them in a container in the fridge, and use them within 3 to 5 days.",
    cautions: [
      "Allergies to perilla are uncommon but possible, especially to the seeds. Stop using it if you notice itching or swelling.",
      FOOD_AMOUNTS,
    ],
  },
  wasabi: {
    name: "Wasabi",
    aliases: ["hon-wasabi", "real wasabi", "japanese horseradish"],
    partsUsed: ["Rhizome (root)", "Stem", "Leaf"],
    flavor: "Sharp, clean heat that rises into the nose and fades quickly, with a slight sweetness",
    summary: "A root that's grated fresh and served with sushi, sashimi, and cold noodles.",
    description:
      "Real wasabi is the root-like stem of a plant that grows in cool mountain streams. It's grated fresh at higher-end restaurants and served with sushi, sashimi, and cold soba or udon. Most green paste sold as “wasabi” is actually horseradish and mustard dyed green. Fresh wasabi loses its flavor after about 15 minutes in the open air, which is why it's grated just before eating.",
    howToUse: [
      "Rinse the root and trim off any dark, knobby skin from the top end.",
      "Grate it on a very fine grater (a traditional sharkskin grater is best) using small circular motions. Finer grating gives more heat.",
      "Gather the paste into a small mound and let it sit for about a minute so the flavor develops.",
      "Eat it within about 15 minutes. Dab a little straight onto a piece of fish or into cold noodle dipping sauce rather than stirring a lot into soy sauce.",
      "Wrap the cut end in plastic and refrigerate the rest. Grate from the same end next time.",
      "The stems and leaves can be pickled (wasabi-zuke) or chopped into dressings for a milder bite.",
    ],
    storage:
      "Wrap a fresh root in a damp paper towel and refrigerate. Rinse it and change the towel every few days, and it can keep for 2 to 3 weeks. When buying paste or powder, check the label: real wasabi lists Wasabia japonica or Eutrema japonicum.",
    cautions: [
      "It's very pungent. Start with a small amount, especially with children.",
      "Large amounts can irritate the stomach. If you have reflux or ulcers, keep portions small.",
      "Wasabi is in the mustard family. Avoid it if you're allergic to mustard or horseradish.",
    ],
  },
  yomogi: {
    name: "Yomogi",
    aliases: ["japanese mugwort", "mugwort", "kusa mochi herb"],
    partsUsed: ["Young leaf"],
    flavor: "Fresh, grassy, and springlike, with a gentle bitterness",
    summary: "Japanese mugwort, used to give rice cakes and sweets their bright green color and spring aroma.",
    description:
      "Yomogi is Japanese mugwort. It has been used as a medicinal herb for centuries and is a favorite ingredient of spring. Ground yomogi leaves give kusa mochi, a grass-green rice cake, its color and fragrance. It's also used in other Japanese sweets (wagashi), soups, teas, and rice dishes.",
    howToUse: [
      "Use young, tender leaves from the tips. Rinse them well and remove any tough stems.",
      "Blanch the leaves in boiling water with a pinch of baking soda for 1 to 2 minutes. This softens them and takes away some of the bitterness.",
      "Cool them in cold water, squeeze out as much water as you can, and chop finely or grind into a paste.",
      "For kusa mochi or yomogi daifuku: knead the paste into rice-flour (mochi) dough until it turns evenly green.",
      "For savory dishes: fold the chopped leaves into rice or miso soup, or fry fresh leaves as tempura.",
      "As tea: steep 1 teaspoon of dried yomogi in 1 cup of hot water for about 5 minutes.",
    ],
    storage:
      "Blanched, squeezed yomogi freezes well. Portion it into small balls and freeze for up to a few months. You can also buy it dried or as a powder.",
    cautions: [
      "Avoid yomogi if you're pregnant or breastfeeding. Mugwort has traditionally been thought to stimulate the uterus.",
      "Avoid it if you're allergic to plants in the daisy family (ragweed, chrysanthemums, marigolds, daisies).",
      "Only forage it if you're certain of the plant. Several look-alikes are toxic.",
    ],
  },
  mitsuba: {
    name: "Mitsuba",
    aliases: ["japanese parsley", "japanese trefoil", "honewort", "japanese wild parsley"],
    partsUsed: ["Leaf", "Stem"],
    flavor: "Mild and fresh, somewhere between parsley, celery, and sorrel",
    summary: "A delicate three-leaf herb added raw to soups and steamed egg custard.",
    description:
      "Mitsuba means “three leaves,” after its trefoil leaves on long, thin stalks. It looks a little like flat-leaf parsley and has a subtle flavor. It's best known as a topping for chawanmushi, a savory steamed egg custard, and is often added to soups and stews. Cooking can bring out its bitterness, so it's usually added raw as a garnish.",
    howToUse: [
      "Add it at the very end. Chop the leaves and stems and scatter them on soup, chawanmushi, or rice bowls just before serving.",
      "In clear soup (suimono) or miso soup: drop in a few whole sprigs right as you take the pot off the heat.",
      "As a garnish: tie a long stem into a simple knot and float it on top of soup.",
      "For a quick side dish: dip it in boiling water for 5 to 10 seconds, cool, squeeze dry, and toss with soy sauce and sesame (ohitashi).",
      "Avoid simmering it, or it turns bitter and loses its aroma.",
    ],
    storage:
      "Stand the stems in a glass with a little water, cover loosely with a plastic bag, and keep it in the fridge. Use within a few days.",
    cautions: [
      "Mitsuba is in the carrot and celery family. Avoid it if you're allergic to celery, parsley, or carrots.",
      "Generally safe in the amounts used in cooking.",
    ],
  },
  kuromoji: {
    name: "Kuromoji",
    aliases: ["spicebush", "japanese spicebush", "lindera"],
    partsUsed: ["Branch", "Bark", "Leaf"],
    flavor: "Woody and sweet, with a citrusy, floral scent similar to cinnamon",
    summary: "A fragrant laurel-family tree whose branches are brewed into a relaxing tea.",
    description:
      "Kuromoji is a small tree in the laurel family, related to cinnamon. Its strong, pleasant aroma is traditionally thought to help people relax, and its branches have long been brewed as a tea. Kuromoji wood is also carved into the small picks used to eat Japanese sweets (wagashi).",
    howToUse: [
      "For tea: put 3 to 5 grams of dried kuromoji branch pieces (about a small handful) in a pot with 2 cups of water.",
      "Bring it to a boil, then lower the heat and simmer for 5 to 10 minutes. Simmering longer gives a deeper color and stronger aroma.",
      "Strain and drink it hot, or chill it for iced tea. It needs no sweetener.",
      "The same branch pieces can usually be brewed 2 or 3 more times.",
      "If you have kuromoji tea bags, steep one in 1 cup of hot water for at least 5 minutes.",
      "Use kuromoji picks to cut and eat mochi and other wagashi. The wood adds a light fragrance.",
    ],
    storage: "Keep dried branches in an airtight container away from heat and light. They hold their aroma for months.",
    cautions: [
      "There's little research on its safety in larger amounts. Check with your doctor first if you're pregnant, breastfeeding, or taking medicine.",
      "Buy kuromoji sold as food or tea, not essential oil. Don't drink the essential oil.",
    ],
  },
  sansho: {
    name: "Sansho",
    aliases: ["sansho pepper", "japanese pepper", "japanese prickly ash", "kinome"],
    partsUsed: ["Seed husk", "Young leaf (kinome)"],
    flavor: "Sharp and lemony, with a tingling, slightly numbing feel",
    summary: "A citrusy, tingly “pepper” sprinkled on grilled eel, noodles, and soup.",
    description:
      "Sansho comes from the seed pods of the Japanese prickly ash, a tree in the citrus family. Despite its nickname, it isn't a true pepper. It has a sharp, citrusy flavor and a tingly feeling on the tongue, much like Sichuan peppercorn. It's one of the seven spices in shichimi togarashi, and records of its use in Japan go back to the 8th and 9th centuries.",
    howToUse: [
      "Sprinkle a small pinch of ground sansho over grilled eel (unagi), yakitori, or other rich, fatty foods at the table.",
      "Add a pinch to udon, soba, or miso soup just before eating.",
      "For the freshest flavor, buy whole dried husks and grind them in a mortar or spice grinder as you need them.",
      "Kinome (young leaves): lay a leaf on your palm and clap your hands once to release the aroma, then place it on soup, grilled fish, or simmered vegetables.",
      "Blend it with chili, sesame, and seaweed to make your own shichimi togarashi.",
    ],
    storage:
      "Ground sansho loses its aroma quickly. Buy small jars, close them tightly, and store them in a cool, dark place, or keep opened jars in the fridge.",
    cautions: [
      "The tingling or numbing feeling is normal. Use a small pinch, since a lot can be overwhelming.",
      "Avoid it if you're allergic to citrus-family plants or Sichuan pepper.",
      FOOD_AMOUNTS,
    ],
  },  kiku: {
    name: "Chrysanthemum",
    aliases: ["kiku", "chrysanthemum tea", "kikka", "edible chrysanthemum", "shokuyo giku", "mum flower"],
    partsUsed: ["Flower"],
    flavor: "Light, floral, and slightly sweet, with a gentle bitterness",
    summary: "Golden flowers brewed into a soothing tea or scattered over salads and sashimi.",
    description:
      "The chrysanthemum (kiku) is Japan's imperial flower, and its blossoms are both brewed and eaten. Chrysanthemum tea is a popular drink, traditionally enjoyed for circulation, heart health, and its antioxidants, which are thought to help keep skin looking youthful. Edible varieties (shokuyō-giku) are sold in bright yellow or purple bunches, and small blossoms are often placed beside sashimi as a garnish.",
    howToUse: [
      "For tea: put 5 to 8 dried flowers in a cup or teapot and pour over 1 cup of hot water, just off the boil.",
      "Steep for 3 to 5 minutes, until the flowers open and the tea turns pale gold. Drink it plain or with a little honey.",
      "Top up the same flowers with hot water once or twice more. The flavor gets milder each time.",
      "Edible flowers: pull the petals off fresh shokuyō-giku and blanch them in boiling water with a splash of rice vinegar for about 30 seconds. The vinegar keeps the color bright.",
      "Cool the petals in cold water, squeeze gently, and toss with soy sauce, dashi, or a sesame dressing (ohitashi), or mix into salads and sushi rice.",
    ],
    storage:
      "Keep dried flowers in an airtight jar away from light; they hold their aroma for about a year. Fresh edible flowers wilt fast, so refrigerate them in a bag and use within 2 to 3 days. Only use flowers sold as food or tea, not florist or garden mums, which may be sprayed.",
    cautions: [
      "Avoid it if you're allergic to plants in the daisy family (ragweed, chrysanthemums, marigolds, daisies).",
      "Handling the fresh plants can cause a skin rash in some people.",
      FOOD_AMOUNTS,
    ],
  },
  gobo: {
    name: "Burdock Root",
    aliases: ["gobo", "gobō", "burdock", "great burdock", "gobo tea", "kinpira gobo"],
    partsUsed: ["Root"],
    flavor: "Earthy and nutty, with a crisp crunch and a hint of sweetness, a little like artichoke",
    summary: "A long, earthy root stir-fried with carrot, simmered in soups, or roasted into tea.",
    description:
      "Burdock root (gobō) is a long, thin root with brown skin and white flesh, eaten as an everyday vegetable in Japan. It's traditionally used to cleanse the body, support digestion, and keep skin healthy, and it's rich in fiber, including inulin. It's best known in kinpira gobō, a sweet-and-salty stir-fry with carrot, and it's also roasted into a toasty, caffeine-free tea.",
    howToUse: [
      "Scrub the root under running water with a brush or the back of a knife. Don't peel it, since much of the flavor is just under the skin.",
      "Cut it into thin matchsticks or shave it into slivers, like sharpening a pencil, and drop the pieces into cold water right away so they don't turn brown. Soak 5 to 10 minutes, then drain.",
      "For kinpira gobō: stir-fry the burdock with carrot matchsticks in sesame oil for a few minutes, then add soy sauce, mirin, and a little sugar and cook until the liquid is gone. Finish with sesame seeds.",
      "In soups and stews: add slices to miso soup, tonjiru (pork and vegetable soup), or simmered dishes. It stays pleasantly crunchy.",
      "For gobō tea: dry thin shavings in a 250°F (120°C) oven or a dry pan until crisp and brown. Steep 1 to 2 teaspoons in 1 cup of hot water for about 5 minutes.",
    ],
    storage:
      "Wrap the whole, unwashed root in damp newspaper or a paper towel and refrigerate; it keeps for 1 to 2 weeks. Choose firm roots that aren't too thick, since thick ones can be hollow and woody.",
    cautions: [
      "Avoid it if you're allergic to plants in the daisy family (ragweed, chrysanthemums, marigolds, daisies).",
      "It may act as a mild diuretic and can lower blood sugar. If you take diabetes or water pills, check with your doctor before drinking it as tea every day.",
      "Don't forage it. Young burdock can be mistaken for toxic plants such as belladonna, so buy it from a store.",
      FOOD_AMOUNTS,
    ],
  },
  kombu: {
    name: "Kombu",
    aliases: ["konbu", "kelp", "seaweed", "dashi kombu", "kelp seaweed"],
    partsUsed: ["Dried frond (seaweed)"],
    flavor: "Deep, savory umami with a light taste of the sea",
    summary: "Dried kelp that gives dashi, the base of Japanese soups and sauces, its savory depth.",
    description:
      "Kombu is a thick, dark kelp that's sold dried in flat sheets. It's a staple of Japanese cooking and the main ingredient in dashi, the broth behind miso soup, noodle soups, and simmered dishes. It's rich in iodine, vitamins, and minerals, which support thyroid function and a healthy metabolism. Kombu also contains fucoidan, a compound being studied for its anti-inflammatory effects. Its natural glutamates are where the word “umami” comes from.",
    howToUse: [
      "Wipe the sheet gently with a damp cloth. Don't rinse or scrub it, since the white powder on the surface is flavor, not dirt.",
      "Cold-soak dashi: put a 4-inch (10 cm) piece in 4 cups of water and refrigerate for a few hours or overnight. Remove the kombu and use the broth.",
      "Quick dashi: put the kombu in cold water and heat it slowly. Take it out just before the water boils, or the broth turns slimy and bitter.",
      "With beans and rice: add a small piece to a pot of beans or rice as it cooks for extra flavor. It also helps soften beans.",
      "Don't throw out the used kombu. Slice it thin and simmer with soy sauce and mirin to make tsukudani, a sweet-salty rice topping.",
    ],
    storage:
      "Keep dried kombu in an airtight container in a cool, dry place; it lasts for a year or more. Refrigerate homemade dashi and use it within 3 days, or freeze it in ice-cube trays.",
    cautions: [
      "Kombu is one of the richest sources of iodine of any food, and too much iodine can upset the thyroid. Enjoy it in normal cooking amounts and avoid eating large amounts every day.",
      "If you have a thyroid condition, take thyroid medicine, or are pregnant or breastfeeding, keep portions small and check with your doctor.",
      "Skip kelp supplements unless a doctor recommends them. They can contain far more iodine than food.",
      "It's naturally high in sodium. Keep that in mind if you're watching your salt.",
    ],
  },
  ashitaba: {
    name: "Ashitaba",
    aliases: ["tomorrow's leaf", "tomorrow leaf", "angelica", "japanese angelica", "ashitaba tea"],
    partsUsed: ["Leaf", "Stem"],
    flavor: "Fresh and green, a little like celery, with a pleasant bitterness",
    summary: "“Tomorrow's leaf,” a fast-growing green eaten as tempura or sipped as a powder tea.",
    description:
      "Ashitaba is native to Japan's Izu Islands, and its name means “tomorrow's leaf” because a cut leaf grows back by the next day. The green plant is rich in antioxidants, vitamins, and chlorophyll, and it's traditionally used to cleanse the body, improve circulation, and support the liver. It's also believed to help the body renew its cells and stay youthful. Lab studies have linked its compounds (chalcones) to longer life in yeast and worms, but this hasn't been shown in people.",
    howToUse: [
      "Choose young, tender leaves and stems. Rinse them and trim off any tough ends.",
      "As tempura: dip whole leaves in a light batter and fry for a few seconds until crisp. Frying softens the bitterness.",
      "As ohitashi: blanch for about 1 minute, cool in cold water, squeeze dry, cut into short lengths, and dress with soy sauce and bonito flakes or sesame.",
      "In stir-fries and soups: chop and add near the end of cooking, the way you'd use spinach.",
      "As tea or a smoothie: stir 1 teaspoon of ashitaba powder into 1 cup of hot or cold water, or blend it into a smoothie.",
    ],
    storage:
      "Wrap fresh ashitaba in a damp paper towel, put it in a bag, and refrigerate; use within 3 to 4 days. Blanched leaves freeze well. Keep powder in a tightly closed bag away from light and humidity.",
    cautions: [
      "Ashitaba is in the carrot and celery family. Avoid it if you're allergic to celery, parsley, or carrots.",
      "Its yellow sap contains compounds that can make skin more sensitive to sunlight. Wash your hands after handling fresh stems, and be careful in the sun if you take it often.",
      "It may slow blood clotting. Check with your doctor first if you take blood thinners or have surgery coming up.",
      "There isn't enough safety information for pregnancy or breastfeeding, so avoid larger, medicinal amounts.",
    ],
  },
  "naginata-koju": {
    name: "Naginata Kōju",
    aliases: ["naginata koju", "naginatakoju", "elsholtzia", "crested late summer mint", "vietnamese balm", "kinh gioi"],
    partsUsed: ["Leaf", "Flowering top"],
    flavor: "Minty and warm, with a lemony, slightly medicinal scent",
    summary: "A warming mint-family herb brewed as a tea for colds and chills.",
    description:
      "Naginata kōju is a wild herb in the mint family, named for its flower spikes, which curve to one side like the blade of a naginata (a Japanese halberd). It has long been used across Japan in teas to warm the body, ease colds, and support circulation.",
    howToUse: [
      "For tea: put 1 to 2 teaspoons of the dried herb in a cup or teapot and pour over 1 cup of hot water, just off the boil.",
      "Cover and steep for 5 minutes so the aromatic oils stay in the cup, then strain.",
      "Drink it warm when you feel chilled or at the start of a cold. A little honey softens the minty bite.",
      "For a warming blend: mix equal parts naginata kōju, ibuki jakōsō, and yomogi, and brew 1 to 2 teaspoons of the mix the same way.",
      "Fresh leaves can be torn into soups or salads in small amounts, the way you'd use Vietnamese herbs (it's sold as kinh giới in Vietnamese markets).",
    ],
    storage:
      "Keep the dried herb in an airtight jar away from heat and light, and use it within a year. Wrap fresh sprigs in a damp paper towel, refrigerate, and use within a few days.",
    cautions: [
      "Avoid it if you're allergic to mint-family plants.",
      "There's little research on its safety in larger amounts. Check with your doctor first if you're taking medicine.",
      FOOD_AMOUNTS,
    ],
  },
  "ibuki-jakoso": {
    name: "Ibuki Jakōsō",
    aliases: ["ibuki jakoso", "ibukijakoso", "japanese thyme", "wild thyme", "japanese wild thyme"],
    partsUsed: ["Leaf", "Flowering top"],
    flavor: "Herbal and savory like garden thyme, but softer and more floral",
    summary: "Japan's native wild thyme, sipped as a tea to soothe the throat and nose.",
    description:
      "Ibuki jakōsō is Japan's native wild thyme. It's a low, creeping plant with tiny pink flowers, named after Mount Ibuki and its musky scent (jakō means musk). Like garden thyme, it has natural antibacterial properties, and it's traditionally used for sore throats, coughs, and stuffy noses.",
    howToUse: [
      "For tea: steep 1 teaspoon of the dried herb (or a few fresh sprigs) in 1 cup of hot water for 5 to 10 minutes, covered.",
      "For a sore throat: stir in a spoonful of honey and sip slowly while it's warm.",
      "For a stuffy nose: pour hot water over a handful of the herb in a bowl, lean over it with a towel over your head, and breathe in the steam for a few minutes. Keep your face a safe distance from the hot water.",
      "In cooking: use it like garden thyme, with roast vegetables, chicken, or fish.",
      "For a warming blend: mix it with naginata kōju and yomogi and brew as a tea.",
    ],
    storage:
      "Keep dried leaves in an airtight jar away from light for up to a year. Fresh sprigs keep in the fridge, wrapped in a damp paper towel, for about a week.",
    cautions: [
      "Avoid it if you're allergic to thyme or other mint-family plants.",
      "Thyme-family herbs may slow blood clotting in large amounts. Stop drinking it as a medicinal tea 2 weeks before surgery.",
      FOOD_AMOUNTS,
    ],
  },
  toki: {
    name: "Tōki",
    aliases: ["toki", "touki", "japanese angelica root", "yamato toki", "dong quai"],
    partsUsed: ["Root"],
    flavor: "Earthy and celery-like, with a bittersweet, slightly spicy finish",
    summary: "A warming root valued in Japan as a women's herb for cramps, chills, and cycles.",
    description:
      "Tōki is the root of Japanese angelica, a close relative of Chinese dong quai. It's one of the most important herbs in kampō (traditional Japanese medicine) and is traditionally used to warm the body, improve circulation, and support women's health: easing menstrual cramps and irregular cycles, chills, and water retention.",
    howToUse: [
      "Tōki is usually sold as dried slices of root. Rinse them briefly before using.",
      "For a decoction: simmer 3 to 5 grams (about 2 or 3 slices) in 2 cups of water for 15 to 20 minutes, until the liquid is reduced by about a third.",
      "Strain and drink it warm. Its flavor is strong, so you can add ginger or a little honey, or blend it with milder herbs.",
      "In cooking: add a slice to chicken or pork soup as it simmers, the way it's used in many East Asian tonic soups.",
      "Tōki leaves are milder and can be used for tea or in the bath.",
    ],
    storage:
      "Keep dried root slices in an airtight container in a cool, dry place. They last about a year. Check for mold or insects if they've been stored for a long time.",
    cautions: [
      "Don't take it if you're pregnant or trying to get pregnant, or while breastfeeding. Angelica root is traditionally thought to stimulate the uterus.",
      "It may slow blood clotting. Check with your doctor first if you take blood thinners (like warfarin) or have surgery coming up.",
      "Avoid it if you have a hormone-sensitive condition, such as endometriosis or certain cancers, unless your doctor approves.",
      "It's in the carrot and celery family. Avoid it if you're allergic to celery, parsley, or carrots. It can also make skin more sensitive to sunlight.",
    ],
  },
  tachibana: {
    name: "Tachibana Orange",
    aliases: ["tachibana", "japanese wild orange", "tachibana orange", "wild citrus"],
    partsUsed: ["Fruit peel", "Leaf", "Flower"],
    flavor: "Very tart and bright, with a fragrant, slightly bitter peel",
    summary: "Japan's only native wild citrus, whose fragrant peel is brewed into a fruity morning tea.",
    description:
      "Tachibana is a small, tart orange and Japan's only native wild citrus. It appears in Japan's oldest histories and in the Imperial Palace, where a tachibana tree is planted beside the main hall. The fruit is too sour to eat fresh, but its dried peel is used in teas and is rich in nobiletin, a citrus compound being studied for its effects on metabolism.",
    howToUse: [
      "For tea: steep 1 teaspoon of dried tachibana peel in 1 cup of hot water for about 5 minutes.",
      "Drink it in the morning as a caffeine-free pick-me-up instead of coffee.",
      "For a fruity blend: mix the peel with gettō leaves and hamanasu petals, and brew 1 to 2 teaspoons of the mix.",
      "To dry your own peel: use unwaxed fruit, cut away as much of the white pith as you can, and dry the peel in thin strips in a warm, airy spot or a low oven until brittle.",
      "In cooking: grate a little fresh peel over grilled fish, dressings, or desserts, the way you'd use yuzu zest.",
    ],
    storage:
      "Keep dried peel in an airtight jar away from light. It's most fragrant within 6 months. Fresh fruit keeps in the fridge for 1 to 2 weeks.",
    cautions: [
      "Avoid it if you're allergic to citrus.",
      "Wild tachibana is rare and protected in parts of Japan. Buy dried peel or fruit from cultivated trees, and don't forage it.",
      FOOD_AMOUNTS,
    ],
  },
  getto: {
    name: "Gettō",
    aliases: ["getto", "gettou", "shell ginger", "sannin", "okinawan shell ginger", "pink porcelain lily"],
    partsUsed: ["Leaf", "Seed"],
    flavor: "Fresh and spicy-sweet, with a ginger-like, slightly floral scent",
    summary: "An Okinawan ginger-family leaf rich in antioxidants, brewed as tea or wrapped around rice cakes.",
    description:
      "Gettō, also called shell ginger, is a tall plant in the ginger family that grows wild in Okinawa, where it's known as sannin. Its leaves are rich in polyphenols, which are antioxidants, and are prized for their fresh, spicy scent. In Okinawa, the leaves are used to wrap muchī, steamed rice cakes made for a winter festival, and they're also brewed into tea.",
    howToUse: [
      "For tea: steep 1 to 2 teaspoons of dried, chopped gettō leaf in 1 cup of hot water for 5 minutes.",
      "For a stronger flavor, simmer the dried leaf in water for 5 to 10 minutes instead.",
      "Drink it hot or chill it for iced tea. It pairs well with tachibana peel and hamanasu petals.",
      "To wrap muchī: wrap sweetened rice-flour dough in fresh leaves and steam for 15 to 20 minutes. The leaves add their aroma but aren't eaten.",
      "Lay fresh leaves under rice or fish as it steams to scent the food.",
    ],
    storage:
      "Keep dried leaves in an airtight container away from humidity and light. They last up to a year. Fresh leaves keep for several days in the fridge, wrapped in a damp towel.",
    cautions: [
      "Avoid it if you're allergic to ginger or turmeric.",
      "Gettō essential oil is for scent only. Don't drink it.",
      FOOD_AMOUNTS,
    ],
  },
  hamanasu: {
    name: "Hamanasu Rose",
    aliases: ["hamanasu", "beach rose", "rugosa rose", "japanese rose", "rose hips", "rose petal tea"],
    partsUsed: ["Petals", "Hips (fruit)"],
    flavor: "Sweetly floral petals and tangy, fruity hips",
    summary: "A wild beach rose whose fragrant petals and vitamin C-rich hips make a calming tea.",
    description:
      "Hamanasu is a wild rose that grows on sandy beaches in northern Japan, especially Hokkaido. Its deep pink petals have a strong, sweet scent, and its round red hips are rich in vitamin C. It's traditionally used to support healthy skin and to calm the body and mind.",
    howToUse: [
      "Petal tea: steep 1 to 2 teaspoons of dried petals (or a small handful of fresh, unsprayed petals) in 1 cup of hot water for 3 to 5 minutes.",
      "Hip tea: crush 1 to 2 teaspoons of dried hips and simmer them in 1 cup of water for about 10 minutes.",
      "Strain hip tea through a fine strainer or paper filter. The seeds have tiny hairs that can irritate the throat.",
      "For an evening blend: mix petals with gettō leaves, tachibana peel, and a little dokudami.",
      "Fresh hips can be seeded and cooked into jam or syrup.",
    ],
    storage:
      "Keep dried petals and hips in airtight jars away from light and use within a year. The petals lose their scent faster, so buy small amounts.",
    cautions: [
      "Only use roses that weren't sprayed. Florist roses usually are.",
      "Avoid it if you're allergic to roses.",
      FOOD_AMOUNTS,
    ],
  },
  dokudami: {
    name: "Dokudami",
    aliases: ["houttuynia", "fish mint", "fish leaf", "chameleon plant", "heartleaf", "juuyaku", "dokudami tea"],
    partsUsed: ["Leaf", "Stem", "Flower"],
    flavor: "Sharp and fishy when fresh, but mild, earthy, and slightly sweet as a dried tea",
    summary: "A heart-shaped “ten medicines” leaf brewed into a detox tea.",
    description:
      "Dokudami is a heart-leaved plant that grows in shady, damp spots all over Japan. It's also called jūyaku, “ten medicines,” because it was used for so many ailments. Dried dokudami tea is one of Japan's best-known folk remedies, traditionally used to detox the body, ease water retention and constipation, and support healthy skin.",
    howToUse: [
      "Always use it dried for tea. Drying removes the strong fishy smell of the fresh leaves.",
      "For tea: simmer 1 tablespoon (about 5 grams) of dried dokudami in 2 to 3 cups of water for 5 to 10 minutes, then strain.",
      "Drink it warm or cold, between meals. Start with 1 cup a day.",
      "Mix it with roasted barley tea (mugicha) or other herbs, like gettō and hamanasu, for a milder flavor.",
      "In Vietnamese cooking, the fresh leaves (diếp cá) are eaten raw with grilled meat and noodles, if you enjoy a bold taste.",
    ],
    storage:
      "Keep the dried herb in an airtight container away from humidity. It lasts about a year. Refrigerate brewed tea and drink it within 2 days.",
    cautions: [
      "It acts as a mild diuretic and laxative. Drink plenty of water, and don't use it if you take water pills unless your doctor approves.",
      "It's high in potassium. If you have kidney problems or take potassium-raising medicine, check with your doctor first.",
      "Don't use it if you're pregnant or breastfeeding, since there isn't enough safety information.",
    ],
  },  "sakura-leaf": {
    name: "Cherry Leaf",
    aliases: ["sakura leaf", "sakura no ha", "sakura-ba", "yoshino cherry", "somei yoshino", "cherry blossom leaf", "sakuramochi leaf"],
    partsUsed: ["Leaf"],
    flavor: "Sweet and almond-like, with a soft vanilla scent once the leaf is salt-pickled",
    summary: "The salty, almond-scented leaf wrapped around pink sakuramochi sweets.",
    description:
      "Cherry leaves are best known as the salt-pickled wrapper on sakuramochi, the pink rice cakes eaten in spring. Pickling brings out coumarin, the compound behind their sweet, almond-like scent. ORIFUSI lists an extract of Yoshino cherry (Somei-yoshino) leaves as a skincare ingredient used to soothe easily upset skin. Most leaves sold for cooking come from the closely related Ōshima cherry.",
    howToUse: [
      "Buy salt-pickled cherry leaves (sakura no ha shiozuke) from a Japanese grocery rather than picking leaves from a tree.",
      "Soak the leaves in cold water for 10 to 15 minutes to remove some of the salt, then pat them dry.",
      "For sakuramochi: wrap one leaf around each filled rice cake, vein side out. The leaf can be eaten or peeled off.",
      "Chop a soaked leaf finely and stir it into rice, butter cookies, or pound cake batter for a gentle cherry scent.",
      "For a quick tea: steep one rinsed leaf with a few salt-pickled cherry blossoms (sakurayu) in hot water.",
    ],
    storage:
      "Keep salt-pickled leaves sealed in the fridge, where they last for several months. Once soaked, use them the same day.",
    cautions: [
      "Don't eat fresh cherry leaves raw. Like other cherry parts, they contain natural compounds that can be harmful in large amounts. Stick to prepared, pickled leaves.",
      "Pickled leaves are salty. Soak them first, and go easy if you're watching your salt.",
      "Coumarin can add to the effect of blood thinners in large amounts. A leaf or two with a sweet is fine.",
    ],
  },
  hatomugi: {
    name: "Coix Seed",
    aliases: ["hatomugi", "job's tears", "jobs tears", "adlay", "yokuinin", "chinese pearl barley", "hatomugi tea"],
    partsUsed: ["Seed"],
    flavor: "Nutty and toasty, like roasted barley, with a chewy texture when cooked",
    summary: "A grain brewed into roasted hatomugi tea and traditionally used for smooth skin.",
    description:
      "Hatomugi, also called Job's tears, is a tall grass whose hulled seeds look like large, plump barley. In Japan, the roasted seeds make a popular caffeine-free tea, and the seeds are cooked like a grain. In traditional Japanese and Chinese medicine (where it's called yokuinin), it has long been used for clear, smooth skin. ORIFUSI uses coix seed extract as a moisturizing skincare ingredient.",
    howToUse: [
      "For tea: simmer 1 to 2 tablespoons of roasted hatomugi in 4 cups of water for 5 to 10 minutes, then strain. Tea bags work too.",
      "Drink it hot or chilled, any time of day, since it has no caffeine. It mixes well with roasted barley tea (mugicha).",
      "To roast raw seeds: toast them in a dry pan over medium heat, stirring, until golden brown and fragrant.",
      "As a grain: rinse and soak raw seeds for a few hours, then simmer for about 40 minutes until tender. Add them to soups, salads, or rice.",
      "Mix a few tablespoons into white rice before cooking for a chewy, nutty texture.",
    ],
    storage:
      "Keep the seeds or tea in an airtight container in a cool, dry place and use within 6 months. Refrigerate brewed tea and drink it within 2 days.",
    cautions: [
      "Don't use it if you're pregnant. It's traditionally avoided in pregnancy because it may affect the uterus.",
      "It may lower blood sugar. If you take diabetes medicine, watch your levels.",
      "Avoid it if you're allergic to grains or grasses.",
    ],
  },
  tsubaki: {
    name: "Camellia",
    aliases: ["tsubaki", "japanese camellia", "camellia japonica", "camellia oil", "tsubaki oil", "tsubaki abura", "camellia flower"],
    partsUsed: ["Seed oil", "Flower"],
    flavor: "The cooking oil is light and mild, with almost no taste",
    summary: "A winter flower whose seed oil has cared for Japanese hair and skin for centuries.",
    description:
      "Tsubaki, the Japanese camellia, blooms with red, pink, or white flowers in winter and early spring. Oil pressed from its seeds, tsubaki abura, has been used for centuries to give hair shine, soften skin, and cook light tempura. The Gotō Islands in Nagasaki are famous for it. ORIFUSI uses an extract of Gotō camellia flowers to add moisture and glow to the skin.",
    howToUse: [
      "For hair: warm 2 or 3 drops of camellia oil between your palms and smooth it over the ends of damp or dry hair.",
      "For skin: press 1 or 2 drops onto your face after toner, or rub a little into dry hands, elbows, and heels.",
      "For cooking: use only food-grade camellia oil. It's mild and stable when heated, so try it for tempura or in salad dressings.",
      "The flowers are mostly for looking at. Float a fresh bloom in a shallow bowl of water, the traditional way to display it.",
    ],
    storage:
      "Keep the oil tightly closed in a cool, dark place. It lasts about a year once opened. If it smells sharp or stale, replace it.",
    cautions: [
      "Do a patch test before using the oil on your face: dab a little on your inner arm and wait a day.",
      "Cosmetic camellia oil isn't meant to be eaten. Only cook with oil labeled for food.",
      "Avoid it if you're allergic to camellia or tea plants.",
    ],
  },  kawamidori: {
    name: "Korean Mint",
    aliases: ["kawamidori", "korean hyssop", "wrinkled giant hyssop", "agastache", "huo xiang", "korean mint tea"],
    partsUsed: ["Leaf", "Flower"],
    flavor: "Sweet and anise-like, similar to licorice with a cool minty edge",
    summary: "An anise-scented mint with purple flower spikes, brewed into tea or added to bath soaks.",
    description:
      "Kawamidori, or Korean mint, is a mint-family plant native to East Asia that has long been used in Japanese medicine. It has a sweet, anise-like scent and grows tall spikes of light purple flowers in late summer and fall. In Japan it's used in aromatherapy and bath soaks, and it's traditionally taken for headaches and colds and to help digestion. The fresh leaves make an herbal tea and a garnish for salads and soups.",
    howToUse: [
      "For tea: steep 5 to 6 fresh leaves (or 1 teaspoon dried) in 1 cup of hot water for 5 minutes, covered so the aroma stays in, then strain.",
      "As a garnish: tear or finely slice a few fresh leaves over salad or soup just before serving.",
      "As a seasoning: dry the leaves, crumble or blend them into a powder, and sprinkle a pinch over food.",
      "For a bath soak: tie a handful of fresh or dried leaves in a cloth bag and float it in a warm bath.",
      "To grow it: plant it in a pot with very well-drained soil in full sun. It's pest resistant and handles dry spells, but water it during long dry periods. Snip off faded flowers to keep new ones coming.",
    ],
    storage:
      "Keep fresh sprigs in a glass of water in the fridge for a few days. To dry, hang small bunches upside down in a shady, airy spot, then store the leaves in an airtight jar for up to a year.",
    cautions: [
      "Avoid it if you're allergic to mint-family plants.",
      "It contains estragole, like basil and tarragon. Stick to food and tea amounts, and don't use it in larger amounts if you're pregnant or breastfeeding.",
    ],
  },
  kuko: {
    name: "Goji",
    aliases: ["kuko", "goji berry", "goji berries", "wolfberry", "chinese wolfberry", "kuko no mi", "kukoshi", "kuko tea"],
    partsUsed: ["Berry", "Leaf"],
    flavor: "Sweet and lightly tart, like a cross between a cranberry and a raisin, with a faint herbal note",
    summary: "A “long-life” shrub whose red-orange berries are eaten dried, fresh, or as juice.",
    description:
      "Kuko, or goji, is a hardy shrub in the nightshade family known in Japan as a “long-life” herb. Its purple flowers, leaves, and red-orange berries can all be used, and the berries have become popular worldwide as a health and beauty food. They're high in antioxidants, B vitamins, vitamin C, and amino acids. In Japan the berries are a classic topping for annin dofu (almond jelly) and are added to puddings and jellies.",
    howToUse: [
      "Dried berries: eat a small handful as a snack, or soak them in warm water for 10 minutes to plump them up first.",
      "As a topping: scatter soaked berries over annin dofu, yogurt, puddings, jellies, or rice porridge.",
      "As tea: steep 1 tablespoon of dried berries in 1 cup of hot water for about 10 minutes, then eat the softened berries too.",
      "In cooking: add a small handful to soups and stews in the last 10 minutes so they stay plump.",
      "To grow it: use a deep pot with good drainage and full sun. It's drought tolerant and easy to care for. Plants grown from seed start to fruit in their second year, and birds love the berries.",
    ],
    storage:
      "Keep dried berries in an airtight container in a cool, dark place for up to a year, or in the fridge once opened. Fresh berries bruise easily, so refrigerate them and eat them within a few days.",
    cautions: [
      "Goji can strengthen the effect of warfarin and other blood thinners. Check with your doctor first if you take them.",
      "It may lower blood sugar and blood pressure. If you take medicine for either, watch your levels.",
      "Goji is in the nightshade family. Avoid it if you're allergic to tomatoes, eggplant, or peppers.",
      FOOD_AMOUNTS,
    ],
  },
};
