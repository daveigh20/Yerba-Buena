import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useT } from "../../i18n/LanguageContext";
import Highlight from "../herbs/components/Highlight";
import { useJapaneseHerbs } from "./catalog";
import JapaneseSourceNote from "./JapaneseSourceNote";
import { searchJapaneseHerbs } from "./search";

export default function JapaneseHerbsPage() {
  const t = useT();
  const { herbs, otherNames } = useJapaneseHerbs();
  useDocumentTitle(t.japanese.title);
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const hasQuery = query.trim() !== "";
  const results = useMemo(() => searchJapaneseHerbs(herbs, query, otherNames), [herbs, query, otherNames]);

  const setQuery = (q: string) => {
    const next = new URLSearchParams(params);
    if (q) next.set("q", q);
    else next.delete("q");
    setParams(next, { replace: true });
  };

  return (
    <>
      <header className="page-header">
        <h1>{t.japanese.title}</h1>
        <p className="lead muted">{t.japanese.lead}</p>
      </header>

      <form role="search" className="search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="japanese-herb-search" className="visually-hidden">
          {t.japanese.searchLabel}
        </label>
        <input
          id="japanese-herb-search"
          type="search"
          className="search__input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.japanese.searchPlaceholder}
          autoComplete="off"
        />
      </form>

      {!hasQuery && (
        <div className="toolbar">
          <div className="suggestions">
            <span className="small muted">{t.herbs.try}</span>
            {t.japanese.suggestions.map((s) => (
              <button key={s} type="button" className="chip" onClick={() => setQuery(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <p className="small muted" aria-live="polite">
        {t.japanese.count(results.length)}
      </p>

      {results.length === 0 ? (
        <div className="empty-state">
          <p>{t.herbs.noMatch(query, false)}</p>
          <p className="muted">{t.japanese.noMatchHint}</p>
          <button type="button" className="button button--secondary" onClick={() => setQuery("")}>
            {t.herbs.clear}
          </button>
        </div>
      ) : (
        <ul className="card-grid">
          {results.map(({ herb, matchedAlias, matchedText }) => (
            <li key={herb.id}>
              <Link to={`/japanese-herbs/${herb.id}`} className="card card--link jp-card">
                <div className="herb-card__head">
                  <h2 className="card__title">
                    <Highlight text={herb.name} query={query} />
                  </h2>
                  <span className="jp-name" lang="ja">
                    <Highlight text={herb.japaneseName} query={query} />
                  </span>
                </div>
                <p className="scientific">
                  <Highlight text={herb.scientificName} query={query} />
                </p>
                {matchedAlias && (
                  <p className="small muted">
                    {t.herbs.alsoCalled} <Highlight text={matchedAlias} query={query} />
                  </p>
                )}
                <p>
                  <Highlight text={herb.summary} query={query} />
                </p>
                {matchedText && (
                  <p className="jp-card__match small muted">
                    <Highlight text={matchedText} query={query} />
                  </p>
                )}
                <p className="jp-card__foot small">{t.japanese.viewHowTo}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <JapaneseSourceNote />
    </>
  );
}
