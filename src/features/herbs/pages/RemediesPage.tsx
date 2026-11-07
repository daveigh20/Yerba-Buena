import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import RemedyCard from "../components/RemedyCard";
import { REMEDIES } from "../data";
import { searchRemedies } from "../lib/search";

export default function RemediesPage() {
  useDocumentTitle("Remedies");
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const remedies = useMemo(() => (query.trim() ? searchRemedies(REMEDIES, query) : REMEDIES), [query]);

  return (
    <>
      <header className="page-header">
        <h1>Remedies</h1>
        <p className="lead muted">Simple teas, syrups, and steams made with herbs from the catalog.</p>
      </header>

      <form role="search" className="search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="remedy-search" className="visually-hidden">
          Filter remedies
        </label>
        <input
          id="remedy-search"
          type="search"
          className="search__input"
          value={query}
          onChange={(e) => setParams(e.target.value ? { q: e.target.value } : {}, { replace: true })}
          placeholder="Filter by name, use, or ingredient…"
          autoComplete="off"
        />
      </form>

      <p className="small muted" aria-live="polite">
        {remedies.length} {remedies.length === 1 ? "remedy" : "remedies"}
      </p>

      {remedies.length === 0 ? (
        <div className="empty-state">
          <p>No remedies match “{query}”.</p>
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
