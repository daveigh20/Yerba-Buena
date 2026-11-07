import { Link } from "react-router-dom";
import { remediesForHerb } from "../data";
import { normalize } from "../lib/normalize";
import type { HerbResult } from "../lib/search";
import CategoryBadge from "./CategoryBadge";
import Highlight from "./Highlight";

const PREVIEW_COUNT = 3;

export default function HerbCard({ result, query }: { result: HerbResult; query: string }) {
  const { herb, matchedOn, matchedBenefits } = result;
  const benefits = matchedOn === "benefit" ? matchedBenefits : herb.benefits.slice(0, PREVIEW_COUNT);
  const more = herb.benefits.length - benefits.length;
  const remedyCount = remediesForHerb(herb.id).length;
  const q = normalize(query);
  const matchedAlias = matchedOn === "alias" ? herb.aliases.find((a) => normalize(a).includes(q)) : undefined;

  return (
    <Link to={`/herbs/${herb.id}`} className="card card--link herb-card">
      <div className="herb-card__head">
        <h3 className="card__title">
          <Highlight text={herb.name} query={query} />
        </h3>
        <CategoryBadge category={herb.category} />
      </div>
      <p className="scientific">
        <Highlight text={herb.scientificName} query={query} />
      </p>
      {matchedAlias && (
        <p className="small muted">
          Also called <Highlight text={matchedAlias} query={query} />
        </p>
      )}
      <ul className="benefit-preview">
        {benefits.map((b) => (
          <li key={b}>
            <Highlight text={b} query={query} />
          </li>
        ))}
      </ul>
      <p className="herb-card__foot small muted">
        {more > 0 && <span>+{more} more benefits</span>}
        {remedyCount > 0 && (
          <span className="herb-card__remedies">
            {remedyCount} {remedyCount === 1 ? "remedy" : "remedies"}
          </span>
        )}
      </p>
    </Link>
  );
}
