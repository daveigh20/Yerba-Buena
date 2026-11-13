import { Link, useParams } from "react-router-dom";
import BackLink from "../../components/BackLink";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useT } from "../../i18n/LanguageContext";
import NotFoundPage from "../../pages/NotFoundPage";
import CautionBox from "../herbs/components/CautionBox";
import { useJapaneseHerbs } from "./catalog";
import JapaneseSourceNote from "./JapaneseSourceNote";

export default function JapaneseHerbDetailPage() {
  const t = useT();
  const { lang, herbs, getHerb } = useJapaneseHerbs();
  const herb = getHerb(useParams().herbId);
  useDocumentTitle(herb?.name);
  if (!herb) return <NotFoundPage message={t.japanese.notFound} />;

  const others = herbs.filter((h) => h.id !== herb.id);

  return (
    <article className="detail">
      <BackLink fallback="/japanese-herbs" label={t.japanese.back} />

      <header className="page-header">
        <div className="title-row">
          <h1>{herb.name}</h1>
          {herb.japaneseName !== herb.name && (
            <span className="jp-name jp-name--large" lang="ja">
              {herb.japaneseName}
            </span>
          )}
        </div>
        <p className="scientific">{herb.scientificName}</p>
        {herb.aliases.length > 0 && <p className="small muted">{t.japanese.alsoKnownAs(herb.aliases.join(", "))}</p>}
      </header>

      {herb.images && (
        <div className={herb.images.length > 1 ? "jp-photos jp-photos--multi" : "jp-photos"}>
          {herb.images.map((image) => {
            const label = image.label?.[lang];
            return (
              <figure key={image.src} className="jp-photo">
                <img src={image.src} width={image.width} height={image.height} alt={label ?? herb.name} />
                <figcaption className="small muted">
                  {label && <strong className="jp-photo__label">{label}</strong>}
                  {t.japanese.photoBy}{" "}
                  <a href={image.sourceUrl} target="_blank" rel="noopener noreferrer">
                    {image.credit}
                  </a>{" "}
                  (
                  <a href={image.licenseUrl} target="_blank" rel="noopener noreferrer">
                    {image.license}
                  </a>
                  )
                </figcaption>
              </figure>
            );
          })}
        </div>
      )}

      <p className="lead">{herb.description}</p>

      <dl className="facts">
        <div>
          <dt>{t.japanese.inJapanese}</dt>
          <dd>
            <span lang="ja">{herb.japaneseName}</span> · {herb.romaji}
          </dd>
        </div>
        <div>
          <dt>{t.japanese.partsUsed}</dt>
          <dd>{herb.partsUsed.join(", ")}</dd>
        </div>
        <div>
          <dt>{t.japanese.flavor}</dt>
          <dd>{herb.flavor}</dd>
        </div>
      </dl>

      <section className="section">
        <h2 className="section__title">{t.japanese.howToUse}</h2>
        <ol className="steps">
          {herb.howToUse.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="section">
        <h2 className="section__title">{t.japanese.storage}</h2>
        <p>{herb.storage}</p>
      </section>

      <CautionBox title={t.japanese.cautions}>
        <ul>
          {herb.cautions.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </CautionBox>

      <section className="section">
        <h2 className="section__title">{t.japanese.others}</h2>
        <ul className="tag-list">
          {others.map((o) => (
            <li key={o.id}>
              <Link to={`/japanese-herbs/${o.id}`} className="tag tag--link">
                {o.name}
                {o.japaneseName !== o.name && <span lang="ja"> {o.japaneseName}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <JapaneseSourceNote />
    </article>
  );
}
