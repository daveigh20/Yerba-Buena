/**
 * Japanese text for the check-in's topics and resources. Links and phone numbers come from
 * support.ts; only what people read changes here.
 *
 * The resources are US-based. 988 offered phone interpretation in many languages when this was
 * written; Crisis Text Line works in English and Spanish. Check them before launch.
 */
import type { ResourceId, TopicId } from "./support";
import type { ResourceText, TopicText } from "./support.es";

export const TOPIC_TEXT_JA: Record<TopicId, TopicText> = {
  grief: {
    label: "死別や喪失",
    message: "大切な人を亡くされたこと、本当にお気の毒に思います。悲しみに押しつぶされそうになることもあり、正しい感じ方というものはありません。ひとりで抱え込まなくて大丈夫です。",
    ideas: [
      "信頼できる人に連絡して、今の気持ちを伝えてみましょう。",
      "自分にやさしくしてください。できるときに休み、食べて、水分をとりましょう。",
      "グリーフカウンセラーや支援グループと話すことは、とても助けになります。",
    ],
  },
  stress: {
    label: "ストレスやプレッシャー",
    message: "抱えきれないほどのことがあるようですね。疲れ果ててしまうのも無理はありません。",
    ideas: [
      "次にやる小さなことをひとつだけ選び、残りはいったん置いておきましょう。",
      "ゆっくり何回か呼吸してみましょう。4秒吸って、4秒止めて、6秒で吐きます。",
      "少し散歩したり、温かいお茶を飲んだりすると、心がひと休みできます。",
    ],
  },
  lonely: {
    label: "孤独を感じる",
    message: "孤独を感じるのは本当につらいことです。口にしないだけで、多くの人が同じように感じています。話してくれてうれしいです。",
    ideas: [
      "誰かに短いメッセージを送ってみましょう。「元気かなと思って」だけでも大丈夫です。",
      "カフェ、図書館、公園など、ほかの人がいる場所で少し過ごしてみましょう。",
    ],
  },
  anxious: {
    label: "不安や心配",
    message: "不安があると、何もかもが急を要して重く感じられます。あなたはひとりではありません。",
    ideas: [
      "グラウンディングを試してみましょう。見えるものを5つ、聞こえるものを4つ、触れられるものを3つ挙げます。",
      "吸うときよりも長く、ゆっくりと息を吐きましょう。",
    ],
  },
  down: {
    label: "悲しい・落ち込んでいる",
    message: "気分が沈んでいるんですね。あなたの気持ちは大切で、助けを求めてもいいんです。",
    ideas: [
      "信頼できる人に、今日の気持ちを話してみましょう。",
      "シャワーを浴びる、食事をとる、外の空気を吸うなど、自分のために小さなやさしいことをひとつしてみましょう。",
    ],
  },
  other: {
    label: "その他",
    message: "話してくれてありがとう。どんなことがあっても、あなたは支えてもらっていいんです。",
    ideas: ["友人やカウンセラーなど、誰かに話してみると、気持ちが軽くなることがあります。"],
  },
};

export const RESOURCE_TEXT_JA: Record<ResourceId, ResourceText> = {
  "988": {
    name: "988 自殺・危機ライフライン（米国）",
    description:
      "訓練を受けたカウンセラーによる、無料で秘密が守られる相談窓口です。電話では通訳を頼むことができます。危機的な状況でなくても電話できます。死別、ストレス、つらい日の相談にものってくれます。",
    hours: "24時間365日",
    actions: [
      { label: "988に電話する", href: "tel:988" },
      { label: "988にメッセージを送る", href: "sms:988" },
      { label: "オンラインでチャット（英語）", href: "https://988lifeline.org/chat/" },
    ],
  },
  "crisis-text": {
    name: "Crisis Text Line（米国）",
    description: "741741にHOMEと送ると、訓練を受けた危機カウンセラーとテキストでやりとりできます（英語またはスペイン語）。",
    hours: "24時間365日",
    actions: [{ label: "741741にHOMEと送る", href: "sms:741741" }],
  },
  nami: {
    name: "NAMI ヘルプライン（米国）",
    description: "全米精神疾患連合（NAMI）による、メンタルヘルスの情報、支援、紹介の窓口です（主に英語）。",
    hours: "月〜金、米国東部時間 午前10時〜午後10時",
    actions: [
      { label: "1-800-950-6264に電話する", href: "tel:18009506264" },
      { label: "62640に「helpline」と送る", href: "sms:62640" },
    ],
  },
  griefshare: {
    name: "GriefShare",
    description: "喪失を理解する人たちが運営する、近くやオンラインの死別の支援グループを探せます（主に英語）。",
    hours: "グループは毎週開催",
    actions: [{ label: "グループを探す", href: "https://www.griefshare.org/findagroup" }],
  },
  emergency: {
    name: "緊急サービス",
    description: "あなたやほかの人に差し迫った危険がある場合は、911に電話するか、最寄りの救急外来へ行ってください。",
    hours: "24時間365日",
    actions: [{ label: "911に電話する", href: "tel:911" }],
  },
  international: {
    name: "米国外にお住まいの方",
    description: "日本など、お住まいの国の無料の相談窓口を探せます。",
    hours: "窓口によって異なります",
    actions: [{ label: "相談窓口を探す", href: "https://findahelpline.com" }],
  },
};
