import { Link, useParams } from "react-router-dom";
import BackLink from "../../../components/BackLink";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import NotFoundPage from "../../../pages/NotFoundPage";
import CategoryBadge, { CATEGORY_LABEL } from "../components/CategoryBadge";
import CautionBox from "../components/CautionBox";
import RemedyCard from "../components/RemedyCard";
import SourceNote from "../components/SourceNote";
import { getHerb, herbsPairedWith, remediesForHerb } from "../data";

export default function HerbDetailPage() {
  const herb = getHerb(useParams().herbId);
  useDocumentTitle(herb?.name);
  if (!herb) return <NotFoundPage message="We couldn't find that herb." />;

  const remedies = remediesForHerb(herb.id);
  const paired = herbsPairedWith(herb.id);

  return (
    <article className="detail">
      <BackLink fallback="/herbs" label="Herb search" />

      <header className="page-header">
        <div className="title-row">
          <h1>{herb.name}</h1>
          <CategoryBadge category={herb.category} />
        </div>
        <p className="scientific">{herb.scientificName}</p>
        {herb.aliases.length > 0 && <p className="small muted">Also known as {herb.aliases.join(", ")}</p>}
      </header>

      <p className="lead">{herb.description}</p>

      <dl className="facts">
        <div>
          <dt>Parts used</dt>
          <dd>{herb.partsUsed.join(", ")}</dd>
        </div>
        <div>
          <dt>Flavor</dt>
          <dd>{herb.flavor}</dd>
        </div>
        <div>
          <dt>Type</dt>
          <dd>{CATEGORY_LABEL[herb.category]}</dd>
        </div>
      </dl>

      <section className="section">
        <h2 className="section__title">How to use</h2>
        <p>{herb.howToUse}</p>
      </section>

      <section className="section">
        <h2 className="section__title">Traditionally used for</h2>
        <ul className="tag-list">
          {herb.benefits.map((b) => (
            <li key={b}>
              <Link to={`/herbs?q=${encodeURIComponent(b)}`} className="tag tag--link" title={`Other herbs used for: ${b}`}>
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
        <h2 className="section__title">Remedies with {herb.name}</h2>
        {remedies.length > 0 ? (
          <ul className="card-grid">
            {remedies.map((r) => (
              <li key={r.id}>
                <RemedyCard remedy={r} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">{herb.remedyNote ?? `We don't have any remedies with ${herb.name} yet.`}</p>
        )}
      </section>

      {paired.length > 0 && (
        <section className="section">
          <h2 className="section__title">Pairs well with</h2>
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
