import type { ReactNode } from "react";
import { useT } from "../../../i18n/LanguageContext";

export default function CautionBox({ title, children }: { title?: string; children: ReactNode }) {
  const t = useT();
  const heading = title ?? t.herbs.cautions;
  return (
    <aside className="caution" aria-label={heading}>
      <h2 className="caution__title">
        <span aria-hidden="true">⚠︎ </span>
        {heading}
      </h2>
      {children}
    </aside>
  );
}
