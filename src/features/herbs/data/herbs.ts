import type { HerbProfile } from "../types";

/**
 * Every herb in the catalog. Remedies and benefits refer to herbs by these ids,
 * so TypeScript catches typos and missing profiles at compile time.
 */
export const HERB_IDS = [
  "artichoke",
  "beetroot",
  "bilberry",
  "black-cohosh",
  "black-tea",
  "black-walnut",
  "chamomile",
  "chasteberry",
  "cinnamon",
  "dandelion-root",
  "echinacea",
  "elderberry",
  "eucalyptus",
  "fennel",
  "fenugreek",
  "ginger",
  "ginkgo",
  "ginseng",
  "green-tea",
  "hawthorn",
  "hibiscus",
  "lavender",
  "lemon-balm",
  "licorice-root",
  "lobelia",
  "matcha",
  "milk-thistle",
  "nettle",
  "oat-straw",
  "oolong-tea",
  "passionflower",
  "pau-darco",
  "peppermint",
  "prickly-pear",
  "red-clover",
  "red-raspberry-leaf",
  "rooibos",
  "slippery-elm",
  "st-johns-wort",
  "thyme",
  "turmeric",
  "white-tea",
  "wormwood",
] as const;

export type HerbId = (typeof HERB_IDS)[number];

const CAFFEINE = "Contains caffeine. Limit it later in the day if it affects your sleep.";
const DAISY_FAMILY =
  "Avoid if you're allergic to plants in the daisy family (ragweed, chrysanthemums, marigolds, daisies).";
const GUIDED_ONLY =
  "We don't include a homemade remedy for this herb. It's usually taken as a standardized product with guidance from a healthcare professional.";

export const HERB_PROFILES: Record<HerbId, HerbProfile> = {
  artichoke: {
    name: "Artichoke",
    aliases: ["globe artichoke", "artichoke leaf"],
    scientificName: "Cynara cardunculus var. scolymus",
    category: "herbal",
    partsUsed: ["Leaf"],
    flavor: "Bitter and earthy",
    description:
      "Beyond the familiar vegetable, artichoke leaves have long been used as a bitter digestive herb. They're traditionally taken to support the liver and gallbladder and to help with digesting rich, fatty meals.",
    howToUse:
      "Steep 1 teaspoon of dried artichoke leaf in 1 cup of just-boiled water for 10 minutes. It's quite bitter, so many people blend it with mint or add honey.",
    cautions: [
      DAISY_FAMILY,
      "Talk with your doctor first if you have gallstones or a bile duct blockage.",
    ],
  },
  beetroot: {
    name: "Beetroot",
    aliases: ["beet", "beets"],
    scientificName: "Beta vulgaris",
    category: "herbal",
    partsUsed: ["Root"],
    flavor: "Earthy and sweet",
    description:
      "Beetroot is rich in dietary nitrates, which the body converts into nitric oxide, a molecule that helps blood vessels relax. That's why beet juice is popular with athletes before training.",
    howToUse:
      "Drink as fresh juice, blend into smoothies, or use beetroot powder (about 1 teaspoon) stirred into water or tea.",
    cautions: [
      "Beets can turn urine or stools pink or red. This is harmless.",
      "Beets are high in oxalates. If you're prone to kidney stones, keep portions moderate.",
    ],
  },
  bilberry: {
    name: "Bilberry",
    aliases: ["european blueberry", "whortleberry", "huckleberry"],
    scientificName: "Vaccinium myrtillus",
    category: "herbal",
    partsUsed: ["Berry", "Leaf"],
    flavor: "Tart and fruity",
    description:
      "A small, dark European cousin of the blueberry, bilberry is packed with anthocyanins, the pigments behind its deep blue color. It's traditionally associated with eye health and night vision.",
    howToUse:
      "Simmer 1 tablespoon of dried berries in 1½ cups of water for 10 minutes, or eat the berries fresh or frozen.",
    cautions: [
      "Bilberry leaf isn't recommended for long-term use.",
      "May affect blood sugar and blood clotting. Check with your doctor if you take diabetes or blood-thinning medicine.",
    ],
  },
  "black-cohosh": {
    name: "Black Cohosh",
    aliases: ["black snakeroot", "bugbane", "cimicifuga"],
    scientificName: "Actaea racemosa",
    category: "herbal",
    partsUsed: ["Root", "Rhizome"],
    flavor: "Bitter",
    description:
      "A North American woodland plant in the buttercup family, black cohosh is used mostly for menopause symptoms such as hot flashes and night sweats.",
    howToUse: "Usually taken as a standardized supplement. Follow the label and your provider's advice.",
    cautions: [
      "Rare cases of liver damage have been reported. Stop and get medical care if you notice dark urine, yellowing skin or eyes, or stomach pain.",
      "Not for use during pregnancy or breastfeeding.",
      "Talk with your doctor if you have a hormone-sensitive condition.",
    ],
    remedyNote: GUIDED_ONLY,
  },
  "black-tea": {
    name: "Black Tea",
    aliases: ["english breakfast", "assam", "darjeeling", "ceylon tea"],
    scientificName: "Camellia sinensis",
    category: "true-tea",
    partsUsed: ["Leaf"],
    flavor: "Malty, brisk, and bold",
    description:
      "Black tea is made from fully oxidized leaves of the tea plant, which gives it a darker color and stronger flavor than green or white tea. It's rich in polyphenols called theaflavins and has the most caffeine of the common teas.",
    howToUse: "Steep 1 teaspoon of leaves (or 1 tea bag) in 1 cup of boiling water for 3–5 minutes.",
    cautions: [
      CAFFEINE,
      "Tea can reduce iron absorption from food. If you're low in iron, drink it between meals instead of with them.",
    ],
  },
  "black-walnut": {
    name: "Black Walnut",
    aliases: ["walnut hull"],
    scientificName: "Juglans nigra",
    category: "herbal",
    partsUsed: ["Green hull"],
    flavor: "Very bitter and astringent",
    description:
      "The green hulls of black walnuts are high in tannins and a compound called juglone. They've traditionally been used against intestinal parasites and fungal skin infections.",
    howToUse: "Only used as a commercial preparation. Follow the label and your provider's advice.",
    cautions: [
      "Not for use during pregnancy or breastfeeding.",
      "Avoid if you're allergic to tree nuts.",
      "The strong tannins can upset the stomach.",
    ],
    remedyNote: GUIDED_ONLY,
  },
  chamomile: {
    name: "Chamomile",
    aliases: ["german chamomile", "manzanilla"],
    scientificName: "Matricaria chamomilla",
    category: "herbal",
    partsUsed: ["Flower"],
    flavor: "Mild, floral, and apple-like",
    description:
      "Chamomile is one of the world's most popular herbal teas. Its small, daisy-like flowers have been used for centuries to help people relax, sleep, and settle an upset stomach.",
    howToUse:
      "Steep 1 tablespoon of dried flowers (or 1 tea bag) in 1 cup of just-boiled water, covered, for 5–10 minutes.",
    cautions: [
      DAISY_FAMILY,
      "May interact with blood thinners such as warfarin, and may add to the effects of sedatives.",
    ],
  },
  chasteberry: {
    name: "Chasteberry",
    aliases: ["vitex", "chaste tree", "monk's pepper"],
    scientificName: "Vitex agnus-castus",
    category: "herbal",
    partsUsed: ["Berry"],
    flavor: "Peppery",
    description:
      "Chasteberry is the fruit of the chaste tree, a Mediterranean shrub. It's mainly used for PMS symptoms such as breast tenderness and for irregular menstrual cycles.",
    howToUse: "Usually taken as a standardized supplement. Follow the label and your provider's advice.",
    cautions: [
      "May interact with hormonal birth control, hormone therapy, and medicines that affect dopamine.",
      "Not for use during pregnancy or breastfeeding.",
    ],
    remedyNote: GUIDED_ONLY,
  },
  cinnamon: {
    name: "Cinnamon",
    aliases: ["ceylon cinnamon", "cassia", "canela"],
    scientificName: "Cinnamomum verum, C. cassia",
    category: "herbal",
    partsUsed: ["Bark"],
    flavor: "Warm, sweet, and spicy",
    description:
      "Cinnamon is the dried inner bark of several tropical trees. Besides being a favorite warming spice, it's been studied for its role in blood sugar control.",
    howToUse:
      "Simmer 1 cinnamon stick in 1½ cups of water for 10 minutes, or add ¼ teaspoon of ground cinnamon to tea, coffee, or oatmeal.",
    cautions: [
      "Cassia, the most common supermarket cinnamon, contains coumarin, which can harm the liver in large amounts. Choose Ceylon cinnamon if you use it every day.",
      "Large amounts may lower blood sugar. Take care if you use diabetes medicine.",
    ],
  },
  "dandelion-root": {
    name: "Dandelion Root",
    aliases: ["dandelion", "diente de leon"],
    scientificName: "Taraxacum officinale",
    category: "herbal",
    partsUsed: ["Root", "Leaf"],
    flavor: "Bitter and earthy; roasted root tastes like coffee",
    description:
      "The common lawn weed is a traditional bitter herb for the liver and digestion. Dandelion leaves are a traditional diuretic, and the roasted root makes a popular caffeine-free coffee substitute.",
    howToUse:
      "Simmer 1 tablespoon of dried or roasted root in 1½ cups of water for 10–15 minutes, then strain.",
    cautions: [
      DAISY_FAMILY,
      "May interact with diuretics, lithium, and some antibiotics.",
      "Talk with your doctor first if you have gallbladder problems.",
    ],
  },
  echinacea: {
    name: "Echinacea",
    aliases: ["purple coneflower", "coneflower"],
    scientificName: "Echinacea purpurea, E. angustifolia",
    category: "herbal",
    partsUsed: ["Root", "Flower", "Leaf"],
    flavor: "Earthy, with a tingle on the tongue",
    description:
      "Echinacea is a North American wildflower that's widely taken at the first sign of a cold. The tingling sensation on your tongue comes from compounds called alkylamides.",
    howToUse:
      "Simmer 1 teaspoon of dried root in 1 cup of water for 10–15 minutes, or steep 1–2 teaspoons of dried flowers and leaves in just-boiled water for 10 minutes.",
    cautions: [
      DAISY_FAMILY,
      "If you have an autoimmune condition or take immune-suppressing medicine, talk with your doctor first.",
      "Generally meant for short-term use.",
    ],
  },
  elderberry: {
    name: "Elderberry",
    aliases: ["elder", "black elder", "sambucus", "sauco"],
    scientificName: "Sambucus nigra",
    category: "herbal",
    partsUsed: ["Berry (cooked)", "Flower"],
    flavor: "Tart, dark, and fruity",
    description:
      "Dark purple elderberries have long been simmered into syrups and teas during cold and flu season. They're rich in anthocyanins and vitamin C.",
    howToUse:
      "Always cook the berries. Simmer 1 tablespoon of dried berries in 1½ cups of water for 15 minutes, or make the elderberry syrup below.",
    cautions: [
      "Raw or unripe berries, and the leaves, stems, and seeds, can cause nausea, vomiting, and diarrhea. Always cook berries thoroughly.",
      "If you have an autoimmune condition or take immune-suppressing medicine, talk with your doctor first.",
    ],
  },
  eucalyptus: {
    name: "Eucalyptus",
    aliases: ["blue gum"],
    scientificName: "Eucalyptus globulus",
    category: "herbal",
    partsUsed: ["Leaf"],
    flavor: "Strong, cooling, and camphor-like",
    description:
      "Eucalyptus leaves are full of an aromatic compound called eucalyptol (also known as 1,8-cineole). Breathing in the scent from a steam or chest rub is a classic way to ease stuffy airways.",
    howToUse: "Mostly used as a steam inhalation (see below). Leaf tea should be weak and occasional.",
    cautions: [
      "Never swallow eucalyptus essential oil. It's poisonous even in small amounts.",
      "Keep eucalyptus steams and oils away from babies and young children.",
      "Strong scents can trigger asthma in some people.",
    ],
  },
  fennel: {
    name: "Fennel",
    aliases: ["fennel seed", "hinojo"],
    scientificName: "Foeniculum vulgare",
    category: "herbal",
    partsUsed: ["Seed"],
    flavor: "Sweet and licorice-like",
    description:
      "In many cultures, fennel seeds are chewed after meals to freshen breath and ease gas and bloating. The seeds are also a traditional support for breastfeeding.",
    howToUse:
      "Lightly crush 1 teaspoon of seeds and steep in 1 cup of just-boiled water, covered, for 10 minutes.",
    cautions: [
      "Don't give fennel tea or any herbal tea to an infant without your pediatrician's OK.",
      "Avoid concentrated or long-term use during pregnancy.",
      "Avoid if you're allergic to celery, carrots, or mugwort.",
    ],
  },
  fenugreek: {
    name: "Fenugreek",
    aliases: ["methi"],
    scientificName: "Trigonella foenum-graecum",
    category: "herbal",
    partsUsed: ["Seed", "Leaf"],
    flavor: "Bitter, nutty, and maple-like",
    description:
      "Fenugreek is a common spice in South Asian and Middle Eastern cooking. Its seeds are traditionally used to support breast milk supply and have been studied for blood sugar control.",
    howToUse:
      "Lightly crush 1 teaspoon of seeds and simmer in 1½ cups of water for 10 minutes. Soaking the seeds overnight first softens the bitterness.",
    cautions: [
      "Not for use during pregnancy. It may cause contractions.",
      "May lower blood sugar. Take care if you use diabetes medicine.",
      "Can cause gas, and may make sweat and urine smell like maple syrup.",
      "If you're allergic to peanuts or chickpeas, you may react to fenugreek too.",
    ],
  },
  ginger: {
    name: "Ginger",
    aliases: ["ginger root", "jengibre"],
    scientificName: "Zingiber officinale",
    category: "herbal",
    partsUsed: ["Rhizome (root)"],
    flavor: "Spicy, warming, and bright",
    description:
      "Ginger is one of the best-studied herbs for nausea, including motion sickness and morning sickness. It's also a kitchen staple for digestion, colds, and aches.",
    howToUse:
      "Simmer 4–5 thin slices of fresh ginger in 1½ cups of water for 10 minutes. Simmer longer for a spicier tea.",
    cautions: [
      "Large amounts can cause heartburn or an upset stomach.",
      "Talk with your doctor if you take blood thinners.",
      "If you're pregnant, ask your provider how much is right for you.",
    ],
  },
  ginkgo: {
    name: "Ginkgo Biloba",
    aliases: ["ginkgo", "maidenhair tree"],
    scientificName: "Ginkgo biloba",
    category: "herbal",
    partsUsed: ["Leaf"],
    flavor: "Mildly bitter",
    description:
      "Ginkgo is one of the oldest living tree species on Earth. Its fan-shaped leaves have been studied for memory and circulation.",
    howToUse:
      "Usually taken as a standardized leaf extract. You can also steep 1 teaspoon of dried leaf in just-boiled water for 10 minutes.",
    cautions: [
      "May increase bleeding risk. Avoid it if you take blood thinners, and stop before surgery.",
      "Never eat raw or roasted ginkgo seeds. They can be poisonous.",
      "Can cause headaches, dizziness, or an upset stomach.",
    ],
  },
  ginseng: {
    name: "Ginseng",
    aliases: ["panax ginseng", "korean ginseng", "american ginseng"],
    scientificName: "Panax ginseng, P. quinquefolius",
    category: "herbal",
    partsUsed: ["Root"],
    flavor: "Bittersweet and earthy",
    description:
      "Ginseng root has been prized in Chinese and Korean medicine for thousands of years. It's known as an adaptogen and is taken for energy, stamina, and mental sharpness.",
    howToUse: "Simmer 3–4 thin slices of dried root in 1½ cups of water for 15 minutes. Drink it earlier in the day.",
    cautions: [
      "May affect blood sugar and blood pressure.",
      "May interact with warfarin, diabetes medicine, antidepressants, and stimulants.",
      "Can cause trouble sleeping. Not for use during pregnancy.",
    ],
  },
  "green-tea": {
    name: "Green Tea",
    aliases: ["sencha", "gunpowder tea", "te verde"],
    scientificName: "Camellia sinensis",
    category: "true-tea",
    partsUsed: ["Leaf"],
    flavor: "Fresh, grassy, and vegetal",
    description:
      "Green tea is made from tea leaves that are heated soon after picking to stop oxidation. That keeps its catechins, especially EGCG, intact. It's one of the most-studied drinks in the world.",
    howToUse:
      "Steep 1 teaspoon of leaves in 1 cup of water just below boiling (about 175°F / 80°C) for 2–3 minutes. Water that's too hot makes it bitter.",
    cautions: [
      CAFFEINE,
      "Concentrated green tea extract supplements have been linked to liver damage. Brewed tea is generally considered safe.",
    ],
  },
  hawthorn: {
    name: "Hawthorn",
    aliases: ["hawthorn berry", "may tree", "tejocote"],
    scientificName: "Crataegus spp.",
    category: "herbal",
    partsUsed: ["Berry", "Leaf", "Flower"],
    flavor: "Tart and slightly sweet",
    description:
      "Hawthorn is a thorny shrub in the rose family. Its berries, leaves, and flowers have a long history as a traditional heart and circulation tonic.",
    howToUse: "Simmer 1 tablespoon of dried berries in 1½ cups of water for 15 minutes.",
    cautions: [
      "May interact with heart and blood pressure medicines, including digoxin and beta-blockers. Talk with your doctor if you have a heart condition.",
    ],
  },
  hibiscus: {
    name: "Hibiscus",
    aliases: ["roselle", "jamaica", "flor de jamaica", "sorrel"],
    scientificName: "Hibiscus sabdariffa",
    category: "herbal",
    partsUsed: ["Calyx (flower)"],
    flavor: "Tart and cranberry-like",
    description:
      "Hibiscus makes a vivid ruby-red drink that's enjoyed hot or iced around the world, including as agua de jamaica in Mexico. It has been studied for its effect on blood pressure.",
    howToUse: "Steep 1–2 teaspoons of dried flowers in 1 cup of just-boiled water for 5–10 minutes. Delicious iced.",
    cautions: [
      "May lower blood pressure. Take care if you take blood pressure medicine.",
      "Avoid during pregnancy.",
    ],
  },
  lavender: {
    name: "Lavender",
    aliases: ["english lavender", "lavanda"],
    scientificName: "Lavandula angustifolia",
    category: "herbal",
    partsUsed: ["Flower"],
    flavor: "Floral and slightly bitter",
    description:
      "Lavender's calming scent has made it a favorite for relaxation in teas, baths, and aromatherapy. A little goes a long way.",
    howToUse:
      "Steep ¼–½ teaspoon of dried culinary lavender in 1 cup of just-boiled water for 5 minutes. Too much tastes soapy.",
    cautions: [
      "Never swallow lavender essential oil.",
      "May add to the effects of sedatives and sleep medicine.",
    ],
  },
  "lemon-balm": {
    name: "Lemon Balm",
    aliases: ["melissa", "toronjil"],
    scientificName: "Melissa officinalis",
    category: "herbal",
    partsUsed: ["Leaf"],
    flavor: "Lemony and lightly minty",
    description:
      "Lemon balm is a lemon-scented member of the mint family. It's a traditional calming herb for frazzled nerves, restless sleep, and nervous stomachs.",
    howToUse:
      "Steep 1–2 teaspoons of dried leaf (or a small handful of fresh leaves) in 1 cup of just-boiled water, covered, for 10 minutes.",
    cautions: [
      "May add to the effects of sedatives and sleep medicine.",
      "Talk with your doctor if you have a thyroid condition.",
    ],
  },
  "licorice-root": {
    name: "Licorice Root",
    aliases: ["licorice", "liquorice", "regaliz", "orozuz"],
    scientificName: "Glycyrrhiza glabra",
    category: "herbal",
    partsUsed: ["Root"],
    flavor: "Intensely sweet",
    description:
      "Licorice root gets its sweetness from glycyrrhizin, which is many times sweeter than sugar. It's a classic ingredient in teas for sore throats and coughs.",
    howToUse: "Simmer ½–1 teaspoon of cut root in 1½ cups of water for 10 minutes. Best for occasional, short-term use.",
    cautions: [
      "Large amounts, or daily use for more than a few weeks, can raise blood pressure and lower potassium.",
      "Avoid if you have high blood pressure, or heart or kidney disease, and during pregnancy.",
      "DGL (deglycyrrhizinated licorice) products have the glycyrrhizin removed.",
    ],
  },
  lobelia: {
    name: "Lobelia",
    aliases: ["indian tobacco", "puke weed"],
    scientificName: "Lobelia inflata",
    category: "herbal",
    partsUsed: ["Leaf", "Flower", "Seed"],
    flavor: "Acrid",
    description:
      "Lobelia contains lobeline, a compound that acts a bit like nicotine. Historically it was used for asthma and to help people quit smoking.",
    howToUse: "Not recommended for home use.",
    cautions: [
      "Can be toxic. It may cause nausea, vomiting, a fast heartbeat, and, at high doses, dangerous effects.",
      "Not for use during pregnancy, by children, or by people with heart conditions.",
    ],
    remedyNote:
      "We don't include a homemade remedy for lobelia because it can be toxic. Only use it under the care of a qualified professional.",
  },
  matcha: {
    name: "Matcha",
    aliases: ["matcha green tea", "powdered green tea"],
    scientificName: "Camellia sinensis",
    category: "true-tea",
    partsUsed: ["Whole leaf, stone-ground"],
    flavor: "Rich, grassy, and savory (umami)",
    description:
      "Matcha is shade-grown green tea that's ground into a fine powder and whisked into water. You drink the whole leaf, so you get more caffeine and L-theanine than with brewed green tea, and many people describe the result as a calm focus.",
    howToUse:
      "Sift 1 teaspoon of matcha into a bowl, add 2 oz of water at about 175°F / 80°C, and whisk briskly until frothy.",
    cautions: [CAFFEINE + " A typical serving has about as much as a small cup of coffee."],
  },
  "milk-thistle": {
    name: "Milk Thistle",
    aliases: ["silymarin", "cardo mariano"],
    scientificName: "Silybum marianum",
    category: "herbal",
    partsUsed: ["Seed"],
    flavor: "Mildly bitter and nutty",
    description:
      "Milk thistle seeds contain silymarin, a group of compounds studied for protecting the liver. It's one of the best-known traditional liver herbs.",
    howToUse:
      "Crush 1 teaspoon of seeds and simmer in 1½ cups of water for 15 minutes. Silymarin doesn't dissolve well in water, so research usually uses standardized extracts.",
    cautions: [DAISY_FAMILY, "May lower blood sugar. Take care if you use diabetes medicine."],
  },
  nettle: {
    name: "Nettle",
    aliases: ["stinging nettle", "ortiga"],
    scientificName: "Urtica dioica",
    category: "herbal",
    partsUsed: ["Leaf", "Root"],
    flavor: "Green, earthy, and spinach-like",
    description:
      "Fresh stinging nettle stings, but drying or cooking it removes the sting completely. The mineral-rich leaves are a traditional spring tonic and are often used for seasonal allergies.",
    howToUse:
      "Steep 1 tablespoon of dried leaf in 1 cup of just-boiled water for 10–15 minutes, or make a long overnight infusion.",
    cautions: [
      "Wear gloves when handling fresh nettle.",
      "May interact with blood thinners, diuretics, lithium, and medicines for diabetes or blood pressure.",
      "Talk with your provider before using it during pregnancy.",
    ],
  },
  "oat-straw": {
    name: "Oat Straw",
    aliases: ["oatstraw", "milky oats", "avena"],
    scientificName: "Avena sativa",
    category: "herbal",
    partsUsed: ["Green stem and tops"],
    flavor: "Mild, sweet, and grassy",
    description:
      "Oat straw is the stem and leaves of the oat plant, harvested while still green. It's a gentle, nourishing herb traditionally used to support calm and overall well-being.",
    howToUse: "Steep 2 tablespoons in 1 cup of just-boiled water for 15 minutes or longer.",
    cautions: [
      "Generally well tolerated.",
      "Oats are often cross-contaminated with gluten. Choose certified gluten-free if you have celiac disease.",
    ],
  },
  "oolong-tea": {
    name: "Oolong Tea",
    aliases: ["oolong", "wulong", "tieguanyin"],
    scientificName: "Camellia sinensis",
    category: "true-tea",
    partsUsed: ["Leaf"],
    flavor: "Toasty, floral, and smooth",
    description:
      "Oolong is a partially oxidized tea, which puts it somewhere between green and black tea in color, flavor, and caffeine. Good oolong leaves can be steeped several times.",
    howToUse: "Steep 1–2 teaspoons in water at about 195°F / 90°C for 3–5 minutes. Re-steep the leaves 2–3 more times.",
    cautions: [CAFFEINE],
  },
  passionflower: {
    name: "Passionflower",
    aliases: ["maypop", "passion flower", "pasiflora"],
    scientificName: "Passiflora incarnata",
    category: "herbal",
    partsUsed: ["Leaf", "Stem", "Flower"],
    flavor: "Mild and grassy",
    description:
      "Passionflower is a climbing vine with striking purple flowers. It's used traditionally for anxiety, restlessness, and trouble sleeping.",
    howToUse: "Steep 1 teaspoon of dried herb in 1 cup of just-boiled water for 10 minutes. Drink it in the evening.",
    cautions: [
      "Can cause drowsiness. Don't drive after drinking it.",
      "May add to the effects of sedatives and sleep medicine.",
      "Avoid during pregnancy.",
    ],
  },
  "pau-darco": {
    name: "Pau d'Arco",
    aliases: ["lapacho", "taheebo", "tabebuia"],
    scientificName: "Handroanthus impetiginosus",
    category: "herbal",
    partsUsed: ["Inner bark"],
    flavor: "Bitter and woody",
    description:
      "Pau d'arco is the inner bark of a South American flowering tree. It has been used traditionally for infections, including fungal infections, but it hasn't been well studied in people.",
    howToUse: "Usually taken as a commercial preparation. Follow the label and your provider's advice.",
    cautions: [
      "Contains lapachol, which at high doses can cause nausea, vomiting, and bleeding.",
      "Avoid if you take blood thinners, and during pregnancy or breastfeeding.",
    ],
    remedyNote: GUIDED_ONLY,
  },
  peppermint: {
    name: "Peppermint",
    aliases: ["mint", "menta"],
    scientificName: "Mentha × piperita",
    category: "herbal",
    partsUsed: ["Leaf"],
    flavor: "Cool and refreshing",
    description:
      "Peppermint's cooling menthol relaxes the muscles of the digestive tract. That makes it a classic choice for an upset stomach, gas, and bloating, and peppermint oil capsules have been studied for IBS.",
    howToUse:
      "Steep 1 teaspoon of dried leaf (or a small handful of fresh leaves) in 1 cup of just-boiled water, covered, for 5–10 minutes.",
    cautions: [
      "Can make heartburn or acid reflux (GERD) worse.",
      "Never put peppermint oil on or near a baby's or young child's face.",
    ],
  },
  "prickly-pear": {
    name: "Prickly Pear Cactus",
    aliases: ["cactus", "nopal", "nopales", "opuntia", "tuna"],
    scientificName: "Opuntia ficus-indica",
    category: "herbal",
    partsUsed: ["Pad (nopal)", "Fruit"],
    flavor: "Mild and green (pads); sweet and melon-like (fruit)",
    description:
      "Our source lists this simply as \"cactus\". It most likely means prickly pear, whose extract has been studied for easing hangover symptoms. The pads, called nopales, are a common vegetable in Mexican cooking.",
    howToUse: "Eat cooked nopales or the fruit, or drink prickly pear juice.",
    cautions: [
      "May lower blood sugar. Take care if you use diabetes medicine.",
      "Can cause mild digestive upset.",
    ],
  },
  "red-clover": {
    name: "Red Clover",
    aliases: ["clover", "trebol rojo"],
    scientificName: "Trifolium pratense",
    category: "herbal",
    partsUsed: ["Flower"],
    flavor: "Mild and sweet",
    description:
      "Red clover blossoms contain isoflavones, plant compounds that act a bit like estrogen. It's been used for menopause symptoms.",
    howToUse: "Usually taken as a standardized supplement. Follow the label and your provider's advice.",
    cautions: [
      "Because it acts like estrogen, avoid it if you have a hormone-sensitive condition (such as some breast cancers or endometriosis).",
      "Not for use during pregnancy or breastfeeding.",
      "May increase bleeding risk if you take blood thinners.",
    ],
    remedyNote: GUIDED_ONLY,
  },
  "red-raspberry-leaf": {
    name: "Red Raspberry Leaf",
    aliases: ["raspberry leaf"],
    scientificName: "Rubus idaeus",
    category: "herbal",
    partsUsed: ["Leaf"],
    flavor: "Mild, like a caffeine-free black tea",
    description:
      "Midwives have long recommended red raspberry leaf tea in late pregnancy to tone the uterus. It's also used for menstrual cramps.",
    howToUse: "Steep 1 tablespoon of dried leaf in 1 cup of just-boiled water for 10–15 minutes.",
    cautions: [
      "If you're pregnant, talk with your midwife or doctor first. It's usually suggested only in the third trimester.",
    ],
  },
  rooibos: {
    name: "Rooibos",
    aliases: ["red bush", "redbush", "red tea"],
    scientificName: "Aspalathus linearis",
    category: "herbal",
    partsUsed: ["Leaf (needle)"],
    flavor: "Sweet and nutty, with vanilla notes",
    description:
      "Rooibos (\"red bush\") comes from a South African shrub and is naturally caffeine-free. It's often called red tea, but it isn't related to the tea plant. It's rich in antioxidants such as aspalathin.",
    howToUse: "Steep 1 tablespoon in 1 cup of boiling water for 5–10 minutes. It doesn't turn bitter if you steep it longer.",
    cautions: ["Generally considered safe for most people."],
  },
  "slippery-elm": {
    name: "Slippery Elm",
    aliases: ["red elm", "elm bark"],
    scientificName: "Ulmus rubra",
    category: "herbal",
    partsUsed: ["Inner bark"],
    flavor: "Mild, sweet, and silky",
    description:
      "Mixed with water, slippery elm's inner bark forms a slick gel (called mucilage) that coats and soothes a sore throat and stomach.",
    howToUse: "Whisk 1 teaspoon of powdered bark into 1 cup of hot water until smooth.",
    cautions: [
      "Its coating can slow how your body absorbs other medicines. Take it at least 2 hours apart from them.",
      "Avoid during pregnancy.",
    ],
  },
  "st-johns-wort": {
    name: "St. John's Wort",
    aliases: ["hypericum", "saint johns wort", "hierba de san juan"],
    scientificName: "Hypericum perforatum",
    category: "herbal",
    partsUsed: ["Flowering tops"],
    flavor: "Bitter",
    description:
      "St. John's wort is a yellow-flowered plant that has been studied for mild to moderate depression.",
    howToUse: "Only use it with guidance from your doctor or pharmacist.",
    cautions: [
      "Interacts with many medicines and can make them stop working, including birth control, antidepressants, blood thinners, and HIV and transplant drugs.",
      "Taken with antidepressants, it can cause a dangerous reaction called serotonin syndrome.",
      "Makes your skin more sensitive to the sun.",
      "Don't use it in place of treatment for depression.",
    ],
    remedyNote:
      "We don't include a homemade remedy for St. John's wort because it interacts with so many medicines. Talk with your doctor or pharmacist first.",
  },
  thyme: {
    name: "Thyme",
    aliases: ["common thyme", "tomillo"],
    scientificName: "Thymus vulgaris",
    category: "herbal",
    partsUsed: ["Leaf"],
    flavor: "Savory and herbal",
    description:
      "The kitchen herb gets its aroma from thymol, which has antiseptic properties. Thyme tea is a traditional remedy for coughs and chest congestion.",
    howToUse:
      "Steep 1 teaspoon of dried thyme (or 3 fresh sprigs) in 1 cup of just-boiled water, covered, for 10 minutes.",
    cautions: [
      "Amounts used in cooking and tea are safe for most people.",
      "Never swallow thyme essential oil.",
      "Avoid if you're allergic to oregano or other plants in the mint family.",
    ],
  },
  turmeric: {
    name: "Turmeric",
    aliases: ["curcumin", "curcuma", "haldi"],
    scientificName: "Curcuma longa",
    category: "herbal",
    partsUsed: ["Rhizome (root)"],
    flavor: "Earthy, warm, and slightly bitter",
    description:
      "Turmeric is the golden spice behind curry's color. Its main compound, curcumin, has been widely studied for inflammation. Black pepper and a little fat help your body absorb it.",
    howToUse:
      "Simmer ½ teaspoon of ground turmeric (or a 1-inch piece of fresh root) with a pinch of black pepper in milk or water for 5–10 minutes.",
    cautions: [
      "High-dose supplements can upset the stomach and have rarely been linked to liver injury.",
      "Talk with your doctor if you take blood thinners or have gallbladder problems.",
    ],
  },
  "white-tea": {
    name: "White Tea",
    aliases: ["silver needle", "white peony", "bai mudan"],
    scientificName: "Camellia sinensis",
    category: "true-tea",
    partsUsed: ["Young bud", "Leaf"],
    flavor: "Delicate, sweet, and floral",
    description:
      "White tea is made from young buds and leaves that are simply withered and dried. It's the least processed tea, with a soft, subtle flavor.",
    howToUse: "Steep 2 teaspoons in water at about 175°F / 80°C for 4–5 minutes.",
    cautions: [CAFFEINE],
  },
  wormwood: {
    name: "Wormwood",
    aliases: ["absinthe wormwood", "artemisia", "ajenjo"],
    scientificName: "Artemisia absinthium",
    category: "herbal",
    partsUsed: ["Leaf", "Flowering tops"],
    flavor: "Extremely bitter",
    description:
      "Wormwood is one of the most bitter herbs there is. It was traditionally used against intestinal worms (hence the name) and is famous as a flavoring in absinthe.",
    howToUse: "Only for short-term use with guidance from a qualified professional.",
    cautions: [
      "Contains thujone, which at high doses can cause seizures and kidney damage.",
      "Not for use during pregnancy or breastfeeding, or by people with epilepsy.",
      DAISY_FAMILY,
    ],
    remedyNote: GUIDED_ONLY,
  },
};
