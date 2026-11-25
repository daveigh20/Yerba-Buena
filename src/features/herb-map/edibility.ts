import type { Lang } from "../../i18n/messages";
import type { HerbId } from "../herbs/data/herbs";
import type { JapaneseHerbId } from "../japanese-herbs/data";
import { EDIBILITY_TEXT_ES } from "./edibility.es";
import { EDIBILITY_TEXT_JA } from "./edibility.ja";
import { EDIBILITY_TEXT_ZH } from "./edibility.zh";

/**
 * Whether people can eat or drink each herb, for the sighting card on the herb map.
 * - "edible": a common food or tea, safe in normal kitchen amounts for most people.
 * - "careful": people do eat it, but only some parts, only prepared a certain way, or only in small amounts.
 * - "not-food": not safe to eat or drink at home.
 * Based on food-safety and herbal references (NIH NCCIH herb fact sheets, poison-control guidance, and
 * standard foraging guides). This is about the herb itself, not permission to pick a wild plant.
 */
export type Edibility = "edible" | "careful" | "not-food";

export interface EdibilityText {
  /** The parts people eat or drink, or how "not-food" herbs are used instead. */
  parts: string;
  /** One sentence on why it's worth eating, or why not. */
  why: string;
  /** Two or three short benefits. Empty for "not-food" herbs. */
  benefits: string[];
  /** The main thing to watch out for. */
  care: string;
}

export type EdibilityTexts = Record<HerbId, EdibilityText> & Record<JapaneseHerbId, EdibilityText>;

export const HERB_EDIBILITY: Record<HerbId, Edibility> = {
  artichoke: "edible",
  beetroot: "edible",
  bilberry: "edible",
  "black-cohosh": "not-food",
  "black-tea": "edible",
  "black-walnut": "edible",
  chamomile: "edible",
  chasteberry: "careful",
  cinnamon: "edible",
  "dandelion-root": "edible",
  echinacea: "careful",
  elderberry: "careful",
  eucalyptus: "not-food",
  fennel: "edible",
  fenugreek: "edible",
  ginger: "edible",
  ginkgo: "careful",
  ginseng: "careful",
  "green-tea": "edible",
  hawthorn: "careful",
  hibiscus: "edible",
  lavender: "edible",
  "lemon-balm": "edible",
  "licorice-root": "careful",
  lobelia: "not-food",
  matcha: "edible",
  "milk-thistle": "edible",
  nettle: "edible",
  "oat-straw": "edible",
  "oolong-tea": "edible",
  passionflower: "edible",
  "pau-darco": "not-food",
  peppermint: "edible",
  "prickly-pear": "edible",
  "red-clover": "edible",
  "red-raspberry-leaf": "edible",
  rooibos: "edible",
  "slippery-elm": "careful",
  "st-johns-wort": "careful",
  thyme: "edible",
  turmeric: "edible",
  "white-tea": "edible",
  wormwood: "not-food",
};

export const JAPANESE_HERB_EDIBILITY: Record<JapaneseHerbId, Edibility> = {
  shiso: "edible",
  wasabi: "edible",
  yomogi: "edible",
  mitsuba: "edible",
  kuromoji: "edible",
  sansho: "edible",
  kiku: "edible",
  gobo: "edible",
  kombu: "edible",
  ashitaba: "edible",
  "naginata-koju": "edible",
  "ibuki-jakoso": "edible",
  toki: "careful",
  tachibana: "edible",
  getto: "careful",
  hamanasu: "edible",
  dokudami: "edible",
  "sakura-leaf": "careful",
  hatomugi: "edible",
  tsubaki: "careful",
  kawamidori: "edible",
  kuko: "edible",
};

const TEA_PLANT_CARE = "Has caffeine, so go easy late in the day, in pregnancy, or if caffeine makes you jittery.";

export const EDIBILITY_TEXT_EN: EdibilityTexts = {
  artichoke: {
    parts: "Flower buds (the artichoke you cook), leaf stalks of wild cardoon, and leaves for tea",
    why: "The cooked buds are a fiber-rich vegetable, and the bitter leaves are a classic digestive tea.",
    benefits: ["High in fiber and antioxidants", "Bitter leaf tea is used to ease heavy meals", "Traditionally taken to support the liver"],
    care: "Can trigger allergies in people sensitive to the daisy family. Wild cardoon spines are sharp.",
  },
  beetroot: {
    parts: "Roots and leaves",
    why: "An everyday vegetable full of nitrates, folate, and fiber.",
    benefits: ["Natural nitrates may help blood vessels relax", "Popular before exercise for stamina", "Leaves are a good source of vitamins A and K"],
    care: "Harmless pink urine is common. Go easy if you get oxalate kidney stones.",
  },
  bilberry: {
    parts: "Ripe berries and leaves for tea",
    why: "A wild cousin of the blueberry that's even richer in deep purple antioxidants.",
    benefits: ["Packed with anthocyanin antioxidants", "Traditionally used for eye health", "Tasty fresh, in jam, or dried"],
    care: "Stick to the berries for regular eating. Large amounts of the leaf aren't recommended.",
  },
  "black-cohosh": {
    parts: "The root is only used as a supplement, under a doctor's care",
    why: "It isn't a food, and it has been linked to rare cases of liver damage.",
    benefits: [],
    care: "Don't eat or brew the wild plant. Talk to a doctor before taking it in any form.",
  },
  "black-tea": {
    parts: "Leaves, processed into black tea",
    why: "One of the world's favorite drinks, with gentle caffeine and plenty of antioxidants.",
    benefits: ["Theaflavin antioxidants", "Steady energy and focus", "Linked to heart health in long-term studies"],
    care: TEA_PLANT_CARE,
  },
  "black-walnut": {
    parts: "Nut meats inside the shell",
    why: "Black walnuts have a bold, rich flavor and lots of healthy fats.",
    benefits: ["Omega-3 fats and protein", "Minerals such as magnesium and manganese", "Great in baking and ice cream"],
    care: "Skip moldy nuts and the green husks, which stain skin. Avoid if you have a tree-nut allergy.",
  },
  chamomile: {
    parts: "Flower heads, usually dried for tea",
    why: "A mild, apple-scented tea people have used for centuries to wind down.",
    benefits: ["A calming bedtime tea", "Soothes an upset stomach", "Gentle enough for daily use"],
    care: "Can cause allergies in people sensitive to ragweed or daisies.",
  },
  chasteberry: {
    parts: "Dried berries, in small amounts as tea or supplements",
    why: "Used mainly as a women's health herb rather than a food.",
    benefits: ["Traditionally used for PMS symptoms", "Peppery flavor, once used like pepper"],
    care: "Affects hormones. Avoid in pregnancy, with hormonal birth control, or with fertility treatment.",
  },
  cinnamon: {
    parts: "Inner bark, dried and ground or as sticks",
    why: "A warming spice that makes food sweeter-tasting without added sugar.",
    benefits: ["Rich in antioxidants", "May help with blood sugar after meals", "Warming in teas and baking"],
    care: "Cassia cinnamon has coumarin, so keep big daily amounts to Ceylon cinnamon.",
  },
  "dandelion-root": {
    parts: "Whole plant: young leaves, flowers, and roots",
    why: "One of the most nutritious wild greens, and the roasted root makes a coffee-like drink.",
    benefits: ["Leaves are rich in vitamins A, C, and K", "Root has prebiotic inulin fiber", "Traditionally used as a gentle diuretic"],
    care: "Avoid if you're allergic to daisies. Skip plants from lawns or roadsides that may be sprayed.",
  },
  echinacea: {
    parts: "Flowers, leaves, and roots, mostly as tea",
    why: "A popular tea at the first sign of a cold, though it isn't eaten as a food.",
    benefits: ["Traditionally used for colds", "Gives a tingly, numbing feeling on the tongue"],
    care: "Can trigger daisy-family allergies. Best used for short stretches. Wild purple coneflowers are often protected.",
  },
  elderberry: {
    parts: "Ripe, cooked berries and the flowers",
    why: "Cooked elderberries make a tangy syrup or jam, and the flowers make a fragrant tea.",
    benefits: ["Rich in vitamin C and antioxidants", "Syrup is traditionally used for colds and flu", "Flowers make cordials and tea"],
    care: "Raw berries, unripe berries, leaves, stems, and bark can make you sick. Always cook the berries.",
  },
  eucalyptus: {
    parts: "Leaves are only used for steam or scent",
    why: "The leaves and oil are toxic to swallow, even in small amounts.",
    benefits: [],
    care: "Never swallow eucalyptus oil. Keep it away from children and pets.",
  },
  fennel: {
    parts: "Bulb, stalks, fronds, flowers, and seeds",
    why: "Every part has a sweet licorice flavor, and the seeds are a classic after-meal digestive.",
    benefits: ["Seeds help with gas and bloating", "Good source of fiber and vitamin C", "Freshens breath"],
    care: "Wild fennel looks a lot like deadly poison hemlock. Only eat it if you're certain, or buy it.",
  },
  fenugreek: {
    parts: "Seeds and leaves",
    why: "A staple spice and leafy green in Indian and Middle Eastern cooking.",
    benefits: ["High in fiber", "May help with blood sugar", "Traditionally used to support breast milk"],
    care: "Avoid medicinal amounts in pregnancy. Can affect people with peanut or chickpea allergies.",
  },
  ginger: {
    parts: "Rhizome (the root), fresh or dried",
    why: "A kitchen staple that's one of the best-studied remedies for nausea.",
    benefits: ["Eases nausea and motion sickness", "Warming in colds", "Anti-inflammatory compounds"],
    care: "Large amounts can cause heartburn. Ask a doctor if you take blood thinners.",
  },
  ginkgo: {
    parts: "Seed kernels only, cooked, and only a few at a time",
    why: "Roasted ginkgo nuts are a traditional treat in East Asia.",
    benefits: ["A traditional food in Japanese and Chinese cooking", "Leaf extract is a common supplement"],
    care: "Raw seeds and too many cooked ones are poisonous. The fruit pulp irritates skin. Never give them to children.",
  },
  ginseng: {
    parts: "Root, usually as tea or slices",
    why: "A famous energizing root in Korean and Chinese tradition.",
    benefits: ["Traditionally used for energy and stamina", "May help with focus"],
    care: "Wild ginseng is rare and protected, so don't dig it. Can affect blood sugar and some medicines.",
  },
  "green-tea": {
    parts: "Leaves, steamed or pan-fired into green tea",
    why: "A gentle source of caffeine and calming L-theanine, with lots of antioxidants.",
    benefits: ["Rich in catechin antioxidants", "Calm focus from L-theanine", "Linked to heart health"],
    care: TEA_PLANT_CARE,
  },
  hawthorn: {
    parts: "Ripe berries (without seeds), flowers, and leaves for tea",
    why: "Tart hawthorn berries make jelly, syrup, and the Chinese snack haw flakes.",
    benefits: ["Traditionally used to support the heart", "Antioxidant flavonoids", "Aids digestion of rich food"],
    care: "Don't eat the seeds. Ask a doctor first if you take heart or blood pressure medicine.",
  },
  hibiscus: {
    parts: "Red calyxes (the fleshy cups around the flower) and young leaves",
    why: "Makes a tart, ruby-red tea, hot or iced, that's popular around the world.",
    benefits: ["May help lower blood pressure", "Rich in vitamin C and antioxidants", "Naturally caffeine-free"],
    care: "Ask a doctor if you take blood pressure medicine. Avoid in pregnancy.",
  },
  lavender: {
    parts: "Flowers, in small amounts",
    why: "A little adds a floral note to tea, baking, and honey.",
    benefits: ["Calming scent and tea", "Traditionally used for sleep and stress"],
    care: "A little goes a long way; too much tastes soapy. Don't swallow lavender oil.",
  },
  "lemon-balm": {
    parts: "Leaves, fresh or dried",
    why: "A lemony mint-family herb that makes a soothing tea and fresh garnish.",
    benefits: ["Calms stress and nerves", "Helps with sleep", "Soothes digestion"],
    care: "Ask a doctor first if you have thyroid problems.",
  },
  "licorice-root": {
    parts: "Root, in small amounts as tea",
    why: "Naturally very sweet, it's a classic throat-soothing tea.",
    benefits: ["Soothes sore throats and coughs", "Coats and calms the stomach"],
    care: "Daily use for weeks can raise blood pressure and lower potassium. Avoid in pregnancy and with heart or kidney problems.",
  },
  lobelia: {
    parts: "None. No part is safe to use at home",
    why: "Lobelia contains lobeline, which acts like nicotine and can cause vomiting, a racing heart, and worse.",
    benefits: [],
    care: "Don't taste, brew, or smoke any part of the plant.",
  },
  matcha: {
    parts: "Shade-grown tea leaves, stone-ground into powder",
    why: "You drink the whole leaf, so you get more antioxidants than steeped green tea.",
    benefits: ["Very high in catechin antioxidants", "Calm, steady energy", "Great in lattes and baking"],
    care: TEA_PLANT_CARE,
  },
  "milk-thistle": {
    parts: "Seeds, young leaves (spines removed), roots, and flower buds",
    why: "The seeds are known for supporting the liver, and young leaves can be cooked like greens.",
    benefits: ["Seeds contain silymarin, studied for liver health", "Antioxidant-rich", "Young greens are edible cooked"],
    care: "Can trigger daisy-family allergies. Watch out for the sharp spines.",
  },
  nettle: {
    parts: "Young leaves and tops, cooked or dried",
    why: "Cooking or drying takes away the sting, leaving one of the most nutritious greens around.",
    benefits: ["Rich in iron, calcium, and vitamins", "Traditionally used for allergies", "Tastes like spinach"],
    care: "Never eat it raw: wear gloves to pick. Use only young leaves before the plant flowers.",
  },
  "oat-straw": {
    parts: "Oat grain, plus the green tops and stems for tea",
    why: "Oats are a whole-grain staple, and the green tops make a mild, nourishing tea.",
    benefits: ["Beta-glucan fiber helps cholesterol", "Steady energy", "Tea is traditionally calming"],
    care: "Choose certified gluten-free oats if you have celiac disease.",
  },
  "oolong-tea": {
    parts: "Leaves, partly oxidized into oolong",
    why: "A tea between green and black, with a smooth taste and moderate caffeine.",
    benefits: ["Antioxidant polyphenols", "Gentle energy", "Pairs well with rich food"],
    care: TEA_PLANT_CARE,
  },
  passionflower: {
    parts: "Ripe fruit (maypops), plus leaves and flowers for tea",
    why: "The ripe fruit is sweet and tangy, and the leaf tea is used to relax.",
    benefits: ["Calming tea for stress and sleep", "Fruit is a sweet wild treat"],
    care: "The tea can make you drowsy. Avoid in pregnancy. Eat only fully ripe, wrinkly fruit.",
  },
  "pau-darco": {
    parts: "Bark is sold as a supplement",
    why: "Its main compound, lapachol, can cause bleeding and nausea, and there's little proof it helps.",
    benefits: [],
    care: "Health agencies don't consider it safe to use at home.",
  },
  peppermint: {
    parts: "Leaves, fresh or dried",
    why: "A cooling, refreshing herb for tea, salads, and desserts.",
    benefits: ["Eases gas and an upset stomach", "Clears the head when you're stuffy", "Freshens breath"],
    care: "Can make heartburn or reflux worse. Don't swallow peppermint oil.",
  },
  "prickly-pear": {
    parts: "Young pads (nopales) and ripe fruit (tunas)",
    why: "Nopales are a classic Mexican vegetable, and the fruit is sweet and juicy.",
    benefits: ["High in fiber", "May help with blood sugar", "Rich in vitamin C and antioxidants"],
    care: "Remove every spine and tiny hair-like glochid before eating. Wear gloves.",
  },
  "red-clover": {
    parts: "Flower heads and young leaves",
    why: "The sweet blossoms make a pretty tea and salad topping.",
    benefits: ["Contains isoflavones", "Mild, honey-like tea"],
    care: "Avoid in pregnancy and with blood thinners. Don't use clover that's brown or moldy.",
  },
  "red-raspberry-leaf": {
    parts: "Ripe berries and leaves",
    why: "Wild raspberries are a sweet summer treat, and the leaves make a mild tea.",
    benefits: ["Berries are rich in fiber and vitamin C", "Leaf tea is a traditional women's health tea"],
    care: "Ask your doctor before drinking the leaf tea while pregnant.",
  },
  rooibos: {
    parts: "Leaves and stems, fermented into tea",
    why: "A naturally sweet, caffeine-free red tea from South Africa.",
    benefits: ["Caffeine-free, so good any time", "Unique antioxidants such as aspalathin", "Low in tannins"],
    care: "Generally very safe. Very large amounts haven't been well studied.",
  },
  "slippery-elm": {
    parts: "Inner bark, powdered",
    why: "Mixed with water it turns soothing and gel-like, coating the throat and stomach.",
    benefits: ["Soothes sore throats and coughs", "Calms an irritated stomach"],
    care: "Never strip bark from a wild tree, which can kill it; buy it instead. Take other medicines 2 hours apart.",
  },
  "st-johns-wort": {
    parts: "Flowering tops, as tea",
    why: "A traditional mood-lifting tea, but it's a strong medicinal herb, not a food.",
    benefits: ["Studied for mild low mood"],
    care: "It weakens many medicines, including birth control and antidepressants. Talk to a doctor first.",
  },
  thyme: {
    parts: "Leaves and flowers",
    why: "A cooking classic that also makes a warming tea for coughs.",
    benefits: ["Thymol has antimicrobial properties", "Soothes coughs", "Adds flavor without salt"],
    care: "Safe in cooking amounts. Don't swallow thyme oil.",
  },
  turmeric: {
    parts: "Rhizome (the root), fresh or dried",
    why: "A golden spice in curries and drinks, studied for its anti-inflammatory curcumin.",
    benefits: ["Curcumin has anti-inflammatory effects", "Adds color and earthy flavor", "Absorbs better with black pepper"],
    care: "High-dose supplements have been linked to liver problems. Ask a doctor if you take blood thinners.",
  },
  "white-tea": {
    parts: "Young buds and leaves, lightly dried",
    why: "The most delicate tea, with a light, sweet taste.",
    benefits: ["Rich in antioxidants", "Lighter flavor than green tea", "Gentle energy"],
    care: TEA_PLANT_CARE,
  },
  wormwood: {
    parts: "Tiny amounts are only used to flavor bitters",
    why: "It contains thujone, which can cause seizures and harm the kidneys.",
    benefits: [],
    care: "Don't make tea or extracts from it at home.",
  },
  shiso: {
    parts: "Leaves, flower buds, and seeds",
    why: "A fragrant herb that's a favorite with sushi, salads, and pickles.",
    benefits: ["Rich in antioxidants", "Traditionally used for allergies", "Fresh minty-basil flavor"],
    care: "Safe as food. Wild perilla can be very strong.",
  },
  wasabi: {
    parts: "Rhizome (stem), leaves, and flowers",
    why: "Fresh wasabi gives a clean, sweet heat to sushi and noodles.",
    benefits: ["Antimicrobial compounds", "Leaves are tasty pickled"],
    care: "Real wasabi only grows in cold, clean mountain streams. Don't disturb wild plants.",
  },
  yomogi: {
    parts: "Young leaves",
    why: "Used to make green kusa-mochi rice cakes and tea in Japan.",
    benefits: ["Rich in fiber, iron, and vitamins", "Traditionally used for digestion"],
    care: "Use as food only, not in large medicinal amounts. Can trigger ragweed allergies. Avoid in pregnancy.",
  },
  mitsuba: {
    parts: "Leaves and stems",
    why: "A fresh, celery-like herb for soups, chawanmushi, and salads.",
    benefits: ["Good source of vitamins and minerals", "Light, refreshing flavor"],
    care: "It's in the carrot family, which has deadly look-alikes. Only eat it if you're sure of the ID.",
  },
  kuromoji: {
    parts: "Twigs and leaves, for tea",
    why: "Makes a woodsy, citrusy tea and the traditional toothpicks for wagashi sweets.",
    benefits: ["Relaxing, forest-like scent", "Caffeine-free"],
    care: "Little studied in large amounts. Take only a few twigs, or buy it.",
  },
  sansho: {
    parts: "Young leaves (kinome), green berries, and ground husks",
    why: "A citrusy, tingly spice that brightens grilled eel and miso.",
    benefits: ["Aids digestion", "Adds flavor without salt"],
    care: "The branches are thorny. Use the powder in small amounts.",
  },
  kiku: {
    parts: "Flower petals of edible varieties",
    why: "Edible chrysanthemum petals are eaten as a side dish and brewed into a classic tea.",
    benefits: ["Cooling floral tea", "Rich in flavonoids"],
    care: "Only eat varieties grown as food; garden mums are often sprayed. Can trigger daisy allergies.",
  },
  gobo: {
    parts: "Root, plus young stems",
    why: "Burdock root is a crunchy, earthy vegetable in kinpira and soups.",
    benefits: ["High in inulin fiber for gut health", "Rich in antioxidants"],
    care: "Young burdock leaves can look like poisonous foxglove or belladonna. Dig only where it's allowed.",
  },
  kombu: {
    parts: "The whole blade of kelp, dried",
    why: "The base of dashi broth, giving deep umami flavor.",
    benefits: ["Natural umami lets you use less salt", "Rich in minerals", "Contains iodine"],
    care: "Very high in iodine, so don't eat a lot every day, especially with thyroid problems.",
  },
  ashitaba: {
    parts: "Leaves and stems",
    why: "Known as the \"tomorrow leaf\" because it regrows overnight; eaten as tempura and greens.",
    benefits: ["Rich in vitamins and chalcone antioxidants", "Traditionally used for vitality"],
    care: "It's in the carrot family, which has deadly look-alikes. The yellow sap can irritate skin.",
  },
  "naginata-koju": {
    parts: "Leaves and flowering tops",
    why: "A mint-family herb with a strong, warm aroma, used as tea and in cooking.",
    benefits: ["Traditionally used for colds and digestion", "Aromatic tea"],
    care: "Safe in food amounts. Strong flavor, so use a little.",
  },
  "ibuki-jakoso": {
    parts: "Leaves and flowers",
    why: "A wild Japanese thyme that can be used just like garden thyme.",
    benefits: ["Thymol-rich and soothing for coughs", "Fragrant tea"],
    care: "Often a protected alpine plant, so don't pick it in the wild.",
  },
  toki: {
    parts: "Root, prepared as a medicinal tea",
    why: "A key herb in traditional Japanese Kampo medicine for women's health.",
    benefits: ["Traditionally used for women's health and circulation"],
    care: "It's in the carrot family, with deadly look-alikes. Avoid in pregnancy and with blood thinners.",
  },
  tachibana: {
    parts: "Fruit and peel",
    why: "Japan's native wild citrus, tart and fragrant.",
    benefits: ["Vitamin C", "Peel adds aroma to tea and cooking"],
    care: "Safe as food. The trees are rare in the wild, so leave them be.",
  },
  getto: {
    parts: "Leaves, for tea or to wrap food",
    why: "In Okinawa the fragrant leaves wrap muchi rice cakes and make tea.",
    benefits: ["Rich in polyphenols", "Fragrant, refreshing tea"],
    care: "The leaves are too tough to eat; use them to flavor food or tea.",
  },
  hamanasu: {
    parts: "Ripe rose hips (seeds removed) and petals",
    why: "Beach rose hips are tart and fruity, perfect for jam and tea.",
    benefits: ["Very rich in vitamin C", "Antioxidants", "Petals make a fragrant tea"],
    care: "Scoop out the hairy seeds, which irritate the mouth and stomach.",
  },
  dokudami: {
    parts: "Leaves and roots",
    why: "Its leaves are a salad herb in Vietnam, and dried leaves make a traditional Japanese tea.",
    benefits: ["Traditionally used as a detox tea", "Rich in flavonoids"],
    care: "Strong fishy flavor when fresh. Drying it makes it milder.",
  },
  "sakura-leaf": {
    parts: "Young leaves, salted, and blossoms, pickled",
    why: "Salted cherry leaves wrap sakura mochi and give them their sweet springtime scent.",
    benefits: ["Fragrant spring flavor", "Traditional seasonal treat"],
    care: "Don't eat raw leaves, seeds, or bark, which contain cyanide-forming compounds. Use salted ones in small amounts.",
  },
  hatomugi: {
    parts: "Seeds (grains), cooked or roasted",
    why: "A chewy grain cooked like barley or roasted into a nutty tea.",
    benefits: ["High in protein and fiber", "Traditionally used for clear skin"],
    care: "Avoid in pregnancy.",
  },
  tsubaki: {
    parts: "Seed oil and flower petals",
    why: "Camellia oil is a light cooking oil, and the flowers can be eaten as tempura.",
    benefits: ["Healthy oleic acid oil", "Pretty edible petals"],
    care: "Eat only the oil and petals; the leaves and raw seeds aren't food.",
  },
  kawamidori: {
    parts: "Leaves and flowers",
    why: "Korean mint has a sweet licorice-mint flavor for tea, pancakes, and stews.",
    benefits: ["Soothes digestion", "Traditionally used for colds"],
    care: "Safe in food amounts. Avoid large medicinal doses in pregnancy.",
  },
  kuko: {
    parts: "Ripe red berries and young leaves",
    why: "Goji berries are a sweet snack in teas, soups, and trail mix.",
    benefits: ["Rich in vitamin A and antioxidants", "Traditionally used for eye health"],
    care: "Ask a doctor if you take blood thinners. Don't eat unripe berries.",
  },
};

const TEXT: Record<Lang, EdibilityTexts> = {
  en: EDIBILITY_TEXT_EN,
  es: EDIBILITY_TEXT_ES,
  ja: EDIBILITY_TEXT_JA,
  zh: EDIBILITY_TEXT_ZH,
};

export function edibilityText(lang: Lang, id: HerbId | JapaneseHerbId): EdibilityText {
  return TEXT[lang][id];
}
