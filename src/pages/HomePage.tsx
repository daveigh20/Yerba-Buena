import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useT } from "../i18n/LanguageContext";
import herbsHero from "../assets/herbs-hero.svg";

const FEATURES = [
  { to: "/herbs", key: "herbs" },
  { to: "/japanese-herbs", key: "japanese" },
  { to: "/remedies", key: "remedies" },
  { to: "/trail-map", key: "trailMap" },
  { to: "/check-in", key: "checkIn" },
] as const;

export default function HomePage() {
  useDocumentTitle(undefined);
  const t = useT();
  return (
    <>
      <section className="hero">
        <div className="hero__text">
          <h1>Yerba Buena</h1>
          <p className="lead">{t.home.lead}</p>
          <Link to="/herbs" className="button">
            {t.home.cta}
          </Link>
        </div>
        <img className="hero__image" src={herbsHero} alt={t.home.heroAlt} width={600} height={450} />
      </section>

      <ul className="card-grid">
        {FEATURES.map((f) => (
          <li key={f.to}>
            <Link to={f.to} className="card card--link">
              <h2 className="card__title">{t.home.features[f.key].title}</h2>
              <p className="muted">{t.home.features[f.key].text}</p>
            </Link>
          </li>
        ))}
      </ul>

      <section className="section">
        <h2 className="section__title">{t.home.comingSoon}</h2>
        <ul className="tag-list">
          {t.home.comingSoonItems.map((name) => (
            <li key={name} className="tag tag--muted">
              {name}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
