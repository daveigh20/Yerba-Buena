import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import RemedyCard from "../components/RemedyCard";
import { useT } from "../../../i18n/LanguageContext";
import { useCatalog } from "../data";
import { searchRemedies } from "../lib/search";

export default function RemediesPage() {
  const t = useT();
  const { remedies: all } = useCatalog();
  useDocumentTitle(t.remedies.title);
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const remedies = useMemo(() => (query.trim() ? searchRemedies(all, query) : all), [all, query]);

  return (
    <>
      <header className="page-header">
        <h1>{t.remedies.title}</h1>
        <p className="lead muted">{t.remedies.lead}</p>
      </header>

      <form role="search" className="search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="remedy-search" className="visually-hidden">
          {t.remedies.filterLabel}
        </label>
        <input
          id="remedy-search"
          type="search"
          className="search__input"
          value={query}
          onChange={(e) => setParams(e.target.value ? { q: e.target.value } : {}, { replace: true })}
          placeholder={t.remedies.filterPlaceholder}
          autoComplete="off"
        />
      </form>

      <p className="small muted" aria-live="polite">
        {t.remedies.count(remedies.length)}
      </p>

      {remedies.length === 0 ? (
        <div className="empty-state">
          <p>{t.remedies.noMatch(query)}</p>
        </div>
      ) : (
        <ul className="card-grid">
          {remedies.map((r) => (
            <li key={r.id}>
              <RemedyCard remedy={r} query={query} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
