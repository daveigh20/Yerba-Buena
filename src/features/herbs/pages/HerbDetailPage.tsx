import { Link, useParams } from "react-router-dom";
import BackLink from "../../../components/BackLink";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import NotFoundPage from "../../../pages/NotFoundPage";
import { useT } from "../../../i18n/LanguageContext";
import FindOnMapLink from "../../herb-map/FindOnMapLink";
import CategoryBadge from "../components/CategoryBadge";
import CautionBox from "../components/CautionBox";
import RemedyCard from "../components/RemedyCard";
import SourceNote from "../components/SourceNote";
import { inSentence } from "../../../i18n/text";
import { useCatalog } from "../data";

export default function HerbDetailPage() {
  const t = useT();
  const { lang, getHerb, herbsPairedWith, remediesForHerb } = useCatalog();
  const herb = getHerb(useParams().herbId);
  useDocumentTitle(herb?.name);
  if (!herb) return <NotFoundPage message={t.notFound.herb} />;

  const remedies = remediesForHerb(herb.id);
  const paired = herbsPairedWith(herb.id);

  return (
    <article className="detail">
      <BackLink fallback="/herbs" label={t.herbs.backToSearch} />

      <header className="page-header">
        <div className="title-row">
          <h1>{herb.name}</h1>
          <CategoryBadge category={herb.category} />
        </div>
        <p className="scientific">{herb.scientificName}</p>
        {herb.aliases.length > 0 && <p className="small muted">{t.herbs.alsoKnownAs(herb.aliases.join(", "))}</p>}
      </header>

      <p className="lead">{herb.description}</p>

      <dl className="facts">
        <div>
          <dt>{t.herbs.partsUsed}</dt>
          <dd>{herb.partsUsed.join(", ")}</dd>
        </div>
        <div>
          <dt>{t.herbs.flavor}</dt>
          <dd>{herb.flavor}</dd>
        </div>
        <div>
          <dt>{t.herbs.type}</dt>
          <dd>{t.herbs.category[herb.category]}</dd>
        </div>
      </dl>

      <FindOnMapLink herbKey={`herbs:${herb.id}`} />

      <section className="section">
        <h2 className="section__title">{t.herbs.howToUse}</h2>
        <p>{herb.howToUse}</p>
      </section>

      <section className="section">
        <h2 className="section__title">{t.herbs.traditionallyUsedFor}</h2>
        <ul className="tag-list">
          {herb.benefits.map((b) => (
            <li key={b}>
              <Link to={`/herbs?q=${encodeURIComponent(b)}`} className="tag tag--link" title={t.herbs.otherHerbsFor(b)}>
                {b}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CautionBox>
        <ul>
          {herb.cautions.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </CautionBox>

      <section className="section">
        <h2 className="section__title">{t.herbs.remediesWith(inSentence(herb.name, lang))}</h2>
        {remedies.length > 0 ? (
          <ul className="card-grid">
            {remedies.map((r) => (
              <li key={r.id}>
                <RemedyCard remedy={r} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">{herb.remedyNote ?? t.herbs.noRemedies(inSentence(herb.name, lang))}</p>
        )}
      </section>

      {paired.length > 0 && (
        <section className="section">
          <h2 className="section__title">{t.herbs.pairsWellWith}</h2>
          <ul className="tag-list">
            {paired.map((p) => (
              <li key={p.id}>
                <Link to={`/herbs/${p.id}`} className="tag tag--link">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <SourceNote />
    </article>
  );
}
