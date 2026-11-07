import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import HerbCard from "../components/HerbCard";
import RemedyCard from "../components/RemedyCard";
import SourceNote from "../components/SourceNote";
import { HERBS, REMEDIES } from "../data";
import { type CategoryFilter, searchHerbs, searchRemedies } from "../lib/search";

const SUGGESTIONS = ["Sleep", "Digestion", "Stress", "Immunity", "Sore throat", "Energy"];

const FILTERS: Array<{ value: CategoryFilter; label: string }> = [
  { value: "all", label: "All" },
  { value: "herbal", label: "Herbal" },
  { value: "true-tea", label: "True teas" },
];

function parseCategory(value: string | null): CategoryFilter {
  return value === "herbal" || value === "true-tea" ? value : "all";
}

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export default function HerbSearchPage() {
  useDocumentTitle("Herb Search");
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const category = parseCategory(params.get("type"));

  const herbResults = useMemo(() => searchHerbs(HERBS, query, category), [query, category]);
  const remedyResults = useMemo(() => searchRemedies(REMEDIES, query), [query]);
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
        <h1>Herb Search</h1>
        <p className="lead muted">
          Search by herb (like “ginger”) or by what you're looking for (like “sleep” or “sore throat”).
        </p>
      </header>

      <form role="search" className="search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="herb-search" className="visually-hidden">
          Search herbs, benefits, or remedies
        </label>
        <input
          id="herb-search"
          type="search"
          className="search__input"
          value={query}
          onChange={(e) => update({ q: e.target.value })}
          placeholder="Search herbs, benefits, or remedies…"
          autoComplete="off"
          autoFocus
        />
      </form>

      <div className="toolbar">
        <div className="segmented" role="group" aria-label="Filter by type">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              className="segmented__button"
              aria-pressed={category === f.value}
              onClick={() => update({ type: f.value })}
            >
              {f.label}
            </button>
          ))}
        </div>
        {!hasQuery && (
          <div className="suggestions">
            <span className="small muted">Try:</span>
            {SUGGESTIONS.map((s) => (
              <button key={s} type="button" className="chip" onClick={() => update({ q: s })}>
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="small muted" aria-live="polite">
        {plural(herbResults.length, "herb", "herbs")}
        {hasQuery && ` · ${plural(remedyResults.length, "remedy", "remedies")}`}
      </p>

      {hasQuery && herbResults.length === 0 && remedyResults.length === 0 ? (
        <div className="empty-state">
          <p>
            Nothing matches “{query}”{category !== "all" && " with this filter"}.
          </p>
          <p className="muted">Try a different herb or benefit, or check the spelling.</p>
          <button type="button" className="button button--secondary" onClick={() => update({ q: "", type: "all" })}>
            Clear search
          </button>
        </div>
      ) : (
        <>
          {herbResults.length > 0 && (
            <section aria-label="Herbs">
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
              <h2 className="section__title">Remedies</h2>
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
