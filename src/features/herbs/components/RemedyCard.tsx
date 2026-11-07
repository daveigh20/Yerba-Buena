import { Link } from "react-router-dom";
import { getHerb, remedyHerbIds } from "../data";
import type { Remedy } from "../types";
import Highlight from "./Highlight";

export default function RemedyCard({ remedy, query = "" }: { remedy: Remedy; query?: string }) {
  const herbNames = remedyHerbIds(remedy).flatMap((id) => getHerb(id)?.name ?? []);
  return (
    <Link to={`/remedies/${remedy.id}`} className="card card--link remedy-card">
      <div className="herb-card__head">
        <h3 className="card__title">
          <Highlight text={remedy.name} query={query} />
        </h3>
        <span className="badge badge--form">{remedy.form}</span>
      </div>
      <p className="muted">
        <Highlight text={remedy.summary} query={query} />
      </p>
      <ul className="tag-list">
        {remedy.goodFor.map((g) => (
          <li key={g} className="tag">
            <Highlight text={g} query={query} />
          </li>
        ))}
      </ul>
      <p className="small muted">
        {remedy.time} · With {herbNames.join(", ")}
      </p>
    </Link>
  );
}
