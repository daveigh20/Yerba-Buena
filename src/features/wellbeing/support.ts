/**
 * Follow-up topics and support resources for the well-being check-in.
 *
 * Resources are US-based. Check the numbers and hours before launch, and
 * update them if the app is used in another country.
 */

export const TOPIC_IDS = ["grief", "stress", "lonely", "anxious", "down", "other"] as const;
export type TopicId = (typeof TOPIC_IDS)[number];

export const RESOURCE_IDS = ["988", "crisis-text", "nami", "griefshare", "emergency", "international"] as const;
export type ResourceId = (typeof RESOURCE_IDS)[number];

export interface ResourceAction {
  label: string;
  href: string;
}

export interface Resource {
  id: ResourceId;
  name: string;
  description: string;
  hours: string;
  actions: ResourceAction[];
}

export interface Topic {
  id: TopicId;
  /** Short label shown on the follow-up chip. */
  label: string;
  /** What we say back when this topic applies. */
  message: string;
  /** Small, gentle ideas. Never a replacement for talking to someone. */
  ideas: string[];
  resources: ResourceId[];
  /** Phrases (already normalized) that suggest this topic in free text. */
  keywords: RegExp[];
}

export const RESOURCES: Record<ResourceId, Resource> = {
  "988": {
    id: "988",
    name: "988 Suicide & Crisis Lifeline",
    description:
      "Free, confidential support from a trained counselor. You don't have to be in crisis to call: they also help with grief, stress, and hard days.",
    hours: "24/7",
    actions: [
      { label: "Call 988", href: "tel:988" },
      { label: "Text 988", href: "sms:988" },
      { label: "Chat online", href: "https://988lifeline.org/chat/" },
    ],
  },
  "crisis-text": {
    id: "crisis-text",
    name: "Crisis Text Line",
    description: "Text HOME to 741741 to reach a trained crisis counselor by text.",
    hours: "24/7",
    actions: [{ label: "Text HOME to 741741", href: "sms:741741" }],
  },
  nami: {
    id: "nami",
    name: "NAMI HelpLine",
    description: "Information, support, and referrals for mental health from the National Alliance on Mental Illness.",
    hours: "Mon–Fri, 10 am–10 pm ET",
    actions: [
      { label: "Call 1-800-950-6264", href: "tel:18009506264" },
      { label: "Text “helpline” to 62640", href: "sms:62640" },
    ],
  },
  griefshare: {
    id: "griefshare",
    name: "GriefShare",
    description: "Find a grief support group near you or online, led by people who understand loss.",
    hours: "Groups meet weekly",
    actions: [{ label: "Find a group", href: "https://www.griefshare.org/findagroup" }],
  },
  emergency: {
    id: "emergency",
    name: "Emergency services",
    description: "If you or someone else is in immediate danger, call 911 or go to the nearest emergency room.",
    hours: "24/7",
    actions: [{ label: "Call 911", href: "tel:911" }],
  },
  international: {
    id: "international",
    name: "Outside the US?",
    description: "Find a free helpline in your country.",
    hours: "Varies",
    actions: [{ label: "Find a helpline", href: "https://findahelpline.com" }],
  },
};

export const TOPICS: Record<TopicId, Topic> = {
  grief: {
    id: "grief",
    label: "Grief or loss",
    message:
      "I'm so sorry for your loss. Grief can be overwhelming, and there's no right way to feel. You don't have to carry it alone.",
    ideas: [
      "Reach out to someone you trust and tell them how you're doing.",
      "Be gentle with yourself. Rest, eat, and drink water when you can.",
      "Talking with a grief counselor or support group can really help.",
    ],
    resources: ["988", "griefshare", "crisis-text"],
    keywords: [
      /\b(died|dies|dying|death|passed away|funeral|grief|grieving|mourning|bereave\w*)\b/,
      /\blost (my|our|a) (mom|mother|mum|dad|father|parent|son|daughter|child|baby|brother|sister|husband|wife|partner|friend|grand\w*|aunt|uncle|cousin|pet|dog|cat)\b/,
      /\bmiscarr\w*/,
    ],
  },
  stress: {
    id: "stress",
    label: "Stress or pressure",
    message: "That sounds like a lot to handle. It makes sense that you're feeling worn down.",
    ideas: [
      "Pick one small thing to do next, and let the rest wait for now.",
      "Take a few slow breaths: in for 4, hold for 4, out for 6.",
      "A short walk or a warm cup of tea can give your mind a break.",
    ],
    resources: ["988", "nami"],
    keywords: [/\b(stress\w*|overwhelm\w*|burn(ed|t)? out|burnout|pressure|exhausted|too much|lost my job|deadline\w*)\b/],
  },
  lonely: {
    id: "lonely",
    label: "Feeling lonely",
    message: "Feeling lonely is really hard, and a lot of people feel it more than they say. I'm glad you shared.",
    ideas: [
      "Send a short message to someone, even just “thinking of you.”",
      "Spend a little time somewhere with other people, like a café, library, or park.",
    ],
    resources: ["988", "nami", "crisis-text"],
    keywords: [/\b(lonely|loneliness|alone|isolated|no friends|no one|nobody)\b/],
  },
  anxious: {
    id: "anxious",
    label: "Anxious or worried",
    message: "Anxiety can make everything feel urgent and heavy. You're not alone in this.",
    ideas: [
      "Try grounding: name 5 things you see, 4 you hear, and 3 you can touch.",
      "Breathe out slowly, longer than you breathe in.",
    ],
    resources: ["988", "nami", "crisis-text"],
    keywords: [/\b(anxious|anxiety|panic\w*|worr(y|ied|ying)|scared|afraid|nervous|fear)\b/],
  },
  down: {
    id: "down",
    label: "Sad or down",
    message: "I'm sorry you're feeling down. Your feelings matter, and it's okay to ask for support.",
    ideas: [
      "Tell someone you trust how you're feeling today.",
      "Do one small kind thing for yourself, like a shower, a meal, or some fresh air.",
    ],
    resources: ["988", "nami", "crisis-text"],
    keywords: [/\b(sad|depress\w*|hopeless|empty|numb|crying|cry|miserable|worthless|heartbroken)\b/, /\b(feeling|feel|felt|so|really|been) down\b/],
  },
  other: {
    id: "other",
    label: "Something else",
    message: "Thank you for telling me. Whatever you're going through, you deserve support.",
    ideas: ["Talking it through with someone, a friend or a counselor, can make it feel lighter."],
    resources: ["988", "nami"],
    keywords: [],
  },
};

/** Phrases that suggest someone may be thinking about suicide or self-harm. */
const CRISIS_KEYWORDS: RegExp[] = [
  /\bsuicid\w*/,
  /\bkill(ing)? myself\b/,
  /\bend (it all|my life|things)\b/,
  /\b(want|wanna|going) to die\b/,
  /\bwanna die\b/,
  /\b(hurt|harm|cut)(ing)? myself\b/,
  /\bself ?harm\w*/,
  /\bno reason to live\b/,
  /\bbetter off (dead|without me)\b/,
  /\b(dont|do not) want to (live|be alive|be here|wake up)\b/,
  /\bcant go on\b/,
];

/** Lowercase, drop apostrophes, and turn other punctuation into spaces. */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export interface Assessment {
  /** True when the text suggests thoughts of suicide or self-harm. */
  crisis: boolean;
  /** Topics from the chips the user picked plus any found in their text. */
  topics: TopicId[];
  resources: ResourceId[];
}

export function detectTopics(text: string): TopicId[] {
  const t = normalizeText(text);
  if (!t) return [];
  return TOPIC_IDS.filter((id) => TOPICS[id].keywords.some((re) => re.test(t)));
}

export function detectCrisis(text: string): boolean {
  const t = normalizeText(text);
  return CRISIS_KEYWORDS.some((re) => re.test(t));
}

/** Decide what to show after the follow-up question. */
export function assess(selected: TopicId[], text: string): Assessment {
  const crisis = detectCrisis(text);
  const found = new Set<TopicId>([...selected, ...detectTopics(text)]);
  // "Something else" only adds anything when nothing more specific applies.
  if (found.size > 1) found.delete("other");
  const topics = TOPIC_IDS.filter((id) => found.has(id));

  const resources = new Set<ResourceId>();
  if (crisis) {
    resources.add("988");
    resources.add("crisis-text");
    resources.add("emergency");
  }
  for (const id of topics.length ? topics : (["other"] as TopicId[])) {
    for (const r of TOPICS[id].resources) resources.add(r);
  }
  resources.add("988");
  resources.add("international");

  return { crisis, topics, resources: RESOURCE_IDS.filter((id) => resources.has(id)) };
}
