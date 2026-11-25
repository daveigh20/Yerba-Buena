/**
 * Chinese text for the check-in's topics and resources. Links and phone numbers come from
 * support.ts; only what people read changes here.
 *
 * The resources are US-based. 988 offered phone interpretation in many languages when this was
 * written; Crisis Text Line works in English and Spanish. Check them before launch.
 */
import type { ResourceId, TopicId } from "./support";
import type { ResourceText, TopicText } from "./support.es";

export const TOPIC_TEXT_ZH: Record<TopicId, TopicText> = {
  grief: {
    label: "悲伤或失去亲人",
    message: "听到你失去了重要的人，我真的很难过。悲伤可能会让人难以承受，而且没有所谓正确的感受方式。你不必独自承担。",
    ideas: [
      "联系一个你信任的人，告诉他们你现在的状况。",
      "温柔地对待自己。能休息时就休息，记得吃饭、喝水。",
      "和哀伤辅导师或互助小组聊聊，会很有帮助。",
    ],
  },
  stress: {
    label: "压力或负担",
    message: "听起来你要应付的事情太多了。会觉得精疲力尽也是很正常的。",
    ideas: [
      "只挑一件接下来要做的小事，其他的先放一放。",
      "慢慢地呼吸几次：吸气 4 秒，屏住 4 秒，呼气 6 秒。",
      "散散步或喝杯热茶，能让你的头脑休息一下。",
    ],
  },
  lonely: {
    label: "感到孤独",
    message: "感到孤独真的很难受，很多人都有这种感觉，只是没说出来。很高兴你愿意分享。",
    ideas: ["给某个人发一条简短的消息，哪怕只是“想到你了”。", "去有其他人的地方待一会儿，比如咖啡馆、图书馆或公园。"],
  },
  anxious: {
    label: "焦虑或担心",
    message: "焦虑会让一切都显得紧迫而沉重。你并不孤单。",
    ideas: ["试试稳定情绪的练习：说出你看到的 5 样东西、听到的 4 种声音和能摸到的 3 样东西。", "慢慢呼气，呼气的时间比吸气更长。"],
  },
  down: {
    label: "难过或低落",
    message: "很遗憾你感到低落。你的感受很重要，寻求支持是完全可以的。",
    ideas: ["告诉一个你信任的人你今天的感受。", "为自己做一件小小的好事，比如洗个澡、吃顿饭或呼吸点新鲜空气。"],
  },
  other: {
    label: "其他",
    message: "谢谢你告诉我。无论你正在经历什么，你都值得被支持。",
    ideas: ["和朋友或心理咨询师聊一聊，可能会让你感觉轻松一些。"],
  },
};

export const RESOURCE_TEXT_ZH: Record<ResourceId, ResourceText> = {
  "988": {
    name: "988 自杀与危机生命线（美国）",
    description: "由受过培训的咨询师提供免费、保密的支持。打电话时可以要求口译服务。你不必处于危机中才打电话：他们也会帮助应对悲伤、压力和难熬的日子。",
    hours: "全天 24 小时",
    actions: [
      { label: "拨打 988", href: "tel:988" },
      { label: "发短信到 988", href: "sms:988" },
      { label: "在线聊天（英文）", href: "https://988lifeline.org/chat/" },
    ],
  },
  "crisis-text": {
    name: "Crisis Text Line（美国）",
    description: "发送 HOME 到 741741，就能通过短信联系受过培训的危机咨询师（英语或西班牙语）。",
    hours: "全天 24 小时",
    actions: [{ label: "发送 HOME 到 741741", href: "sms:741741" }],
  },
  nami: {
    name: "NAMI 帮助热线（美国）",
    description: "由美国国家精神疾病联盟（NAMI）提供心理健康信息、支持和转介（主要为英语）。",
    hours: "周一至周五，美国东部时间上午 10 点至晚上 10 点",
    actions: [
      { label: "拨打 1-800-950-6264", href: "tel:18009506264" },
      { label: "发送“helpline”到 62640", href: "sms:62640" },
    ],
  },
  griefshare: {
    name: "GriefShare",
    description: "查找你附近或线上的哀伤互助小组，由理解失去之痛的人带领（主要为英语）。",
    hours: "小组每周聚会",
    actions: [{ label: "查找小组", href: "https://www.griefshare.org/findagroup" }],
  },
  emergency: {
    name: "紧急服务",
    description: "如果你或其他人正处于紧急危险中，请拨打 911 或前往最近的急诊室。",
    hours: "全天 24 小时",
    actions: [{ label: "拨打 911", href: "tel:911" }],
  },
  international: {
    name: "不在美国？",
    description: "查找你所在国家或地区的免费求助热线。",
    hours: "因热线而异",
    actions: [{ label: "查找求助热线", href: "https://findahelpline.com" }],
  },
};
