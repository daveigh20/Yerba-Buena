import { Fragment } from "react";
import { useT } from "../../i18n/LanguageContext";
import { JAPANESE_SOURCES } from "./data";

export default function JapaneseSourceNote() {
  const t = useT();
  return (
    <p className="source-note small muted">
      {t.japanese.sourceNote.before}{" "}
      {JAPANESE_SOURCES.map((source, i) => (
        <Fragment key={source.url}>
          {i > 0 && (i === JAPANESE_SOURCES.length - 1 ? ` ${t.japanese.sourceNote.and} ` : ", ")}
          <a href={source.url} target="_blank" rel="noopener noreferrer" lang="en">
            {source.publisher}, “{source.title}”
          </a>
        </Fragment>
      ))}
      {t.japanese.sourceNote.after}
    </p>
  );
}
