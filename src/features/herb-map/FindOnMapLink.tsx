import { Link } from "react-router-dom";
import { useT } from "../../i18n/LanguageContext";
import { herbMapUrl, useMapHerbs } from "./mapHerbs";

/** A link from an herb's page to its sightings on the trail map. Nothing shows for herbs that aren't on the map. */
export default function FindOnMapLink({ herbKey }: { herbKey: string }) {
  const t = useT();
  const herb = useMapHerbs().get(herbKey);
  if (!herb) return null;
  return (
    <p className="find-on-map">
      <Link className="button button--secondary" to={herbMapUrl(herb.key)}>
        {t.herbMap.findOnMap(herb.name)}
      </Link>
    </p>
  );
}
