import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const FEATURES = [
  { to: "/herbs", title: "Herb Search", text: "Look up herbs and teas by name or by what they're traditionally used for." },
  { to: "/remedies", title: "Remedies", text: "Simple teas, syrups, and steams you can make with herbs from the catalog." },
  { to: "/trail-map", title: "Trail Map", text: "See your route and stops on a map." },
  { to: "/check-in", title: "Well-being Check-in", text: "Take a moment to note how you're feeling today." },
];

const COMING_SOON = ["Sign up & log in", "Avatar", "Workouts", "Habit Tracker"];

export default function HomePage() {
  useDocumentTitle(undefined);
  return (
    <>
      <section className="hero">
        <h1>Yerba Buena</h1>
        <p className="lead">Herbs, remedies, and small habits for everyday well-being.</p>
        <Link to="/herbs" className="button">
          Search herbs
        </Link>
      </section>

      <ul className="card-grid">
        {FEATURES.map((f) => (
          <li key={f.to}>
            <Link to={f.to} className="card card--link">
              <h2 className="card__title">{f.title}</h2>
              <p className="muted">{f.text}</p>
            </Link>
          </li>
        ))}
      </ul>

      <section className="section">
        <h2 className="section__title">Coming soon</h2>
        <ul className="tag-list">
          {COMING_SOON.map((name) => (
            <li key={name} className="tag tag--muted">
              {name}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
