import { Link, useParams } from "react-router-dom";
import BackLink from "../../../components/BackLink";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import NotFoundPage from "../../../pages/NotFoundPage";
import CautionBox from "../components/CautionBox";
import { getHerb, getRemedy, remedyHerbIds } from "../data";

export default function RemedyDetailPage() {
  const remedy = getRemedy(useParams().remedyId);
  useDocumentTitle(remedy?.name);
  if (!remedy) return <NotFoundPage message="We couldn't find that remedy." />;

  const herbs = remedyHerbIds(remedy).flatMap((id) => getHerb(id) ?? []);

  return (
    <article className="detail">
      <BackLink fallback="/remedies" label="Back" />

      <header className="page-header">
        <div className="title-row">
          <h1>{remedy.name}</h1>
          <span className="badge badge--form">{remedy.form}</span>
        </div>
        <p className="lead">{remedy.summary}</p>
        <p className="meta">
          <span>
            <strong>Time:</strong> {remedy.time}
          </span>
          <span>
            <strong>Makes:</strong> {remedy.makes}
          </span>
        </p>
        <ul className="tag-list">
          {remedy.goodFor.map((g) => (
            <li key={g} className="tag">
              {g}
            </li>
          ))}
        </ul>
      </header>

      <div className="recipe">
        <section>
          <h2 className="section__title">Ingredients</h2>
          <ul className="ingredients">
            {remedy.ingredients.map((ing) => (
              <li key={ing.item}>
                <span className="ingredients__amount">{ing.amount}</span>
                <span>
                  {ing.herbId ? <Link to={`/herbs/${ing.herbId}`}>{ing.item}</Link> : ing.item}
                  {ing.optional && <span className="muted"> (optional)</span>}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="section__title">Steps</h2>
          <ol className="steps">
            {remedy.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
      </div>

      <CautionBox title="Before you make this">
        {remedy.cautions && (
          <ul>
            {remedy.cautions.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        )}
        {herbs.map((herb) => (
          <div key={herb.id} className="caution__herb">
            <h3>
              <Link to={`/herbs/${herb.id}`}>{herb.name}</Link>
            </h3>
            <ul>
              {herb.cautions.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        ))}
      </CautionBox>

      <p className="source-note small muted">
        Remedies are simple traditional home preparations, not a substitute for medical care. Talk with a healthcare
        professional before using herbs, especially if you're pregnant, nursing, or taking medication.
      </p>
    </article>
  );
}
