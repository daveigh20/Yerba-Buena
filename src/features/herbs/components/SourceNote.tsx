import { useT } from "../../../i18n/LanguageContext";
import { SOURCE } from "../data";

export default function SourceNote() {
  const t = useT();
  return (
    <p className="source-note small muted">
      {t.herbs.sourceNote.before}{" "}
      <a href={SOURCE.url} target="_blank" rel="noopener noreferrer" lang="en">
        {SOURCE.publisher}, “{SOURCE.title}”
      </a>
      {t.herbs.sourceNote.after}
    </p>
  );
}
