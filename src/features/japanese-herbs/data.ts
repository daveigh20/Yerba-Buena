/**
 * Japanese herbs and spices. The herb list and their traditional uses come from the source
 * article below; preparation steps, storage tips, and cautions are added so each page is
 * practical to cook or brew with.
 */

export const JAPANESE_SOURCE = {
  title: "Japanese Herbs and Spices: Aromas and Tastes from Nature",
  publisher: "Kokoro Care",
  url: "https://kokorocares.com/blogs/blog/japanese-herbs-and-spices",
} as const;

export const JAPANESE_HERB_IDS = ["shiso", "wasabi", "yomogi", "mitsuba", "kuromoji", "sansho"] as const;

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
}

type JapaneseHerbBase = Pick<JapaneseHerb, "japaneseName" | "romaji" | "scientificName">;

export const JAPANESE_HERB_BASE: Record<JapaneseHerbId, JapaneseHerbBase> = {
  shiso: { japaneseName: "紫蘇", romaji: "Shiso", scientificName: "Perilla frutescens var. crispa" },
  wasabi: { japaneseName: "本わさび", romaji: "Hon-wasabi", scientificName: "Eutrema japonicum" },
  yomogi: { japaneseName: "蓬", romaji: "Yomogi", scientificName: "Artemisia princeps" },
  mitsuba: { japaneseName: "三つ葉", romaji: "Mitsuba", scientificName: "Cryptotaenia japonica" },
  kuromoji: { japaneseName: "クロモジ", romaji: "Kuromoji", scientificName: "Lindera umbellata" },
  sansho: { japaneseName: "山椒", romaji: "Sanshō", scientificName: "Zanthoxylum piperitum" },
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
  },
};
