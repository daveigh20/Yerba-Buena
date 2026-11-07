import type { HerbCategory } from "../types";

export const CATEGORY_LABEL: Record<HerbCategory, string> = {
  "true-tea": "True tea",
  herbal: "Herbal",
};

export default function CategoryBadge({ category }: { category: HerbCategory }) {
  return <span className={`badge badge--${category}`}>{CATEGORY_LABEL[category]}</span>;
}
