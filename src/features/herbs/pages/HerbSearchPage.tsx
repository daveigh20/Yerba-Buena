import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import HerbCard from "../components/HerbCard";
import RemedyCard from "../components/RemedyCard";
import SourceNote from "../components/SourceNote";
import { useT } from "../../../i18n/LanguageContext";
import { useCatalog } from "../data";
import { type CategoryFilter, searchHerbs, searchRemedies } from "../lib/search";

const FILTERS: CategoryFilter[] = ["all", "herbal", "true-tea"];

function parseCategory(value: string | null): CategoryFilter {
  return value === "herbal" || value === "true-tea" ? value : "all";
}

export default function HerbSearchPage() {
  const t = useT();
  const { herbs, remedies } = useCatalog();
  useDocumentTitle(t.herbs.searchTitle);
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const category = parseCategory(params.get("type"));

  const herbResults = useMemo(() => searchHerbs(herbs, query, category), [herbs, query, category]);
  const remedyResults = useMemo(() => searchRemedies(remedies, query), [remedies, query]);
  const hasQuery = query.trim() !== "";

  const update = (changes: { q?: string; type?: CategoryFilter }) => {
    const next = new URLSearchParams(params);
    if (changes.q !== undefined) {
      if (changes.q) next.set("q", changes.q);
      else next.delete("q");
    }
    if (changes.type !== undefined) {
      if (changes.type === "all") next.delete("type");
      else next.set("type", changes.type);
    }
    setParams(next, { replace: true });
  };

  return (
    <>
      <header className="page-header">
        <h1>{t.herbs.searchTitle}</h1>
        <p className="lead muted">{t.herbs.searchLead}</p>
      </header>

      <form role="search" className="search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="herb-search" className="visually-hidden">
          {t.herbs.searchLabel}
        </label>
        <input
          id="herb-search"
          type="search"
          className="search__input"
          value={query}
          onChange={(e) => update({ q: e.target.value })}
          placeholder={t.herbs.searchPlaceholder}
          autoComplete="off"
          autoFocus
        />
      </form>

      <div className="toolbar">
        <div className="segmented" role="group" aria-label={t.herbs.filterLabel}>
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className="segmented__button"
              aria-pressed={category === f}
              onClick={() => update({ type: f })}
            >
              {t.herbs.filters[f]}
            </button>
          ))}
        </div>
        {!hasQuery && (
          <div className="suggestions">
            <span className="small muted">{t.herbs.try}</span>
            {t.herbs.suggestions.map((s) => (
              <button key={s} type="button" className="chip" onClick={() => update({ q: s })}>
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="small muted" aria-live="polite">
        {t.herbs.herbCount(herbResults.length)}
        {hasQuery && ` · ${t.herbs.remedyCount(remedyResults.length)}`}
      </p>

      {hasQuery && herbResults.length === 0 && remedyResults.length === 0 ? (
        <div className="empty-state">
          <p>{t.herbs.noMatch(query, category !== "all")}</p>
          <p className="muted">{t.herbs.noMatchHint}</p>
          <button type="button" className="button button--secondary" onClick={() => update({ q: "", type: "all" })}>
            {t.herbs.clear}
          </button>
        </div>
      ) : (
        <>
          {herbResults.length > 0 && (
            <section aria-label={t.herbs.herbsSection}>
              <ul className="card-grid">
                {herbResults.map((result) => (
                  <li key={result.herb.id}>
                    <HerbCard result={result} query={query} />
                  </li>
                ))}
              </ul>
            </section>
          )}
          {remedyResults.length > 0 && (
            <section className="section">
              <h2 className="section__title">{t.herbs.remediesSection}</h2>
              <ul className="card-grid">
                {remedyResults.map((remedy) => (
                  <li key={remedy.id}>
                    <RemedyCard remedy={remedy} query={query} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}

      <SourceNote />
    </>
  );
}
