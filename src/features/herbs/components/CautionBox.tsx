import type { ReactNode } from "react";

export default function CautionBox({ title = "Cautions", children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="caution" aria-label={title}>
      <h2 className="caution__title">
        <span aria-hidden="true">⚠︎ </span>
        {title}
      </h2>
      {children}
    </aside>
  );
}
