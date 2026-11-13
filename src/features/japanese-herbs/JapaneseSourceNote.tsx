import { useT } from "../../i18n/LanguageContext";
import { JAPANESE_SOURCE } from "./data";

export default function JapaneseSourceNote() {
  const t = useT();
  return (
    <p className="source-note small muted">
      {t.japanese.sourceNote.before}{" "}
      <a href={JAPANESE_SOURCE.url} target="_blank" rel="noopener noreferrer" lang="en">
        {JAPANESE_SOURCE.publisher}, “{JAPANESE_SOURCE.title}”
      </a>
      {t.japanese.sourceNote.after}
    </p>
  );
}
