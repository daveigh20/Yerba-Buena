import { useT } from "../../../i18n/LanguageContext";
import type { HerbCategory } from "../types";

export default function CategoryBadge({ category }: { category: HerbCategory }) {
  const t = useT();
  return <span className={`badge badge--${category}`}>{t.herbs.category[category]}</span>;
}
