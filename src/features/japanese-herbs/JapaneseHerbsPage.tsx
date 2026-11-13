import { Link } from "react-router-dom";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useT } from "../../i18n/LanguageContext";
import { useJapaneseHerbs } from "./catalog";
import JapaneseSourceNote from "./JapaneseSourceNote";

export default function JapaneseHerbsPage() {
  const t = useT();
  const { herbs } = useJapaneseHerbs();
  useDocumentTitle(t.japanese.title);

  return (
    <>
      <header className="page-header">
        <h1>{t.japanese.title}</h1>
        <p className="lead muted">{t.japanese.lead}</p>
      </header>

      <p className="small muted">{t.japanese.count(herbs.length)}</p>

      <ul className="card-grid">
        {herbs.map((herb) => (
          <li key={herb.id}>
            <Link to={`/japanese-herbs/${herb.id}`} className="card card--link jp-card">
              <div className="herb-card__head">
                <h2 className="card__title">{herb.name}</h2>
                <span className="jp-name" lang="ja">
                  {herb.japaneseName}
                </span>
              </div>
              <p className="scientific">{herb.scientificName}</p>
              <p>{herb.summary}</p>
              <p className="jp-card__foot small">{t.japanese.viewHowTo}</p>
            </Link>
          </li>
        ))}
      </ul>

      <JapaneseSourceNote />
    </>
  );
}
