import L from "leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import { Circle, CircleMarker, MapContainer, Marker, TileLayer, Tooltip, useMap } from "react-leaflet";
import { Link } from "react-router-dom";
import { type Lang, type Messages, useLanguage, useT } from "../../i18n/LanguageContext";
import { HTML_LANG } from "../../i18n/messages";
import { MAP_VIEWS, type MapView } from "../trail-map/mapViews";
import { distanceKm, hasSatelliteImagery, type LatLng } from "../trail-map/trailGuide";
import { type MapHerb, type MapHerbs, useMapHerbs } from "./mapHerbs";
import {
  findHerbSightings,
  googleMapsSpotUrl,
  type HerbSighting,
  type SightingArea,
  type SightingResults,
} from "./sightings";

const LIST_STEP = 12;

/** Loads sightings for an area. `area` is compared by value, so it can be rebuilt on each render. */
export function useHerbSightings(area: SightingArea | null, taxonIds: number[], confirmedOnly: boolean) {
  const [results, setResults] = useState<SightingResults | null>(null);
  const [failed, setFailed] = useState(false);
  const areaKey = area ? JSON.stringify(area) : "";
  const taxaKey = taxonIds.join(",");

  useEffect(() => {
    if (!areaKey) return;
    const controller = new AbortController();
    setResults(null);
    setFailed(false);
    findHerbSightings(JSON.parse(areaKey) as SightingArea, taxaKey ? taxaKey.split(",").map(Number) : [], confirmedOnly, controller.signal)
      .then((found) => {
        if (!controller.signal.aborted) setResults(found);
      })
      .catch(() => {
        if (!controller.signal.aborted) setFailed(true);
      });
    return () => controller.abort();
  }, [areaKey, taxaKey, confirmedOnly]);

  return { results, failed, loading: Boolean(areaKey) && !results && !failed };
}

function formatDate(day: string | null, lang: Lang): string | null {
  if (!day) return null;
  const date = new Date(`${day}T12:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat(HTML_LANG[lang], { dateStyle: "medium" }).format(date);
}

function herbTitle(herbs: MapHerb[], sighting: HerbSighting): string {
  return herbs.length > 0 ? herbs.map((herb) => herb.name).join(" · ") : sighting.scientificName;
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

const iconCache = new Map<string, L.DivIcon>();

function pinIcon(photo: string, selected: boolean): L.DivIcon {
  const key = `${photo}|${selected}`;
  let icon = iconCache.get(key);
  if (!icon) {
    const size = selected ? 52 : 38;
    icon = L.divIcon({
      className: selected ? "herb-pin herb-pin--selected" : "herb-pin",
      html: `<img src="${escapeAttr(photo)}" alt="" width="${size}" height="${size}" loading="lazy">`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      tooltipAnchor: [0, -size / 2],
    });
    iconCache.set(key, icon);
  }
  return icon;
}

/** Photo pins for each sighting. Render inside a MapContainer. */
export function HerbPins({
  sightings,
  mapHerbs,
  selectedId,
  onSelect,
}: {
  sightings: HerbSighting[];
  mapHerbs: MapHerbs;
  selectedId: number | null;
  onSelect: (sighting: HerbSighting) => void;
}) {
  return (
    <>
      {sightings.map((sighting) => {
        const selected = sighting.id === selectedId;
        const title = herbTitle(mapHerbs.herbsFor(sighting), sighting);
        return (
          <Marker
            key={sighting.id}
            position={sighting.point}
            icon={pinIcon(sighting.photos[0].square, selected)}
            title={title}
            alt={title}
            zIndexOffset={selected ? 1000 : 0}
            eventHandlers={{ click: () => onSelect(sighting) }}
          >
            <Tooltip>{title}</Tooltip>
          </Marker>
        );
      })}
    </>
  );
}

/** Brings the selected sighting into view, without moving the map if it's already showing. */
export function FocusSighting({ sighting }: { sighting: HerbSighting | null }) {
  const map = useMap();
  useEffect(() => {
    if (!sighting) return;
    if (!map.getBounds().pad(-0.1).contains(sighting.point)) {
      map.setView(sighting.point, Math.max(map.getZoom(), 15));
    }
  }, [map, sighting]);
  return null;
}

function FitTo({ points }: { points: LatLng[] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length > 0) map.fitBounds(points, { padding: [32, 32], maxZoom: 16 });
  }, [map, points]);
  return null;
}

function spotZoom(accuracyM: number | null): number {
  if (accuracyM === null || accuracyM <= 50) return 17;
  if (accuracyM <= 200) return 16;
  if (accuracyM <= 1000) return 14;
  return 13;
}

/** A still, close-up picture of the spot: aerial imagery where we have it, otherwise the terrain map. */
function SpotView({ sighting, t }: { sighting: HerbSighting; t: Messages }) {
  const aerial = hasSatelliteImagery(sighting.point);
  const view = MAP_VIEWS[aerial ? "satellite" : "terrain"];
  return (
    <figure className="herb-spot__place">
      <div className="herb-spot__place-map">
        <MapContainer
          key={sighting.id}
          center={sighting.point}
          zoom={spotZoom(sighting.accuracyM)}
          className="herb-spot__place-canvas"
          zoomControl={false}
          dragging={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          touchZoom={false}
          boxZoom={false}
          keyboard={false}
          attributionControl={false}
        >
          <TileLayer url={view.url} maxNativeZoom={view.maxNativeZoom} maxZoom={19} />
          {sighting.accuracyM !== null && sighting.accuracyM > 15 && (
            <Circle
              center={sighting.point}
              radius={sighting.accuracyM}
              pathOptions={{ color: "#ffd23f", weight: 2, fillOpacity: 0.12 }}
            />
          )}
          <CircleMarker
            center={sighting.point}
            radius={8}
            pathOptions={{ color: "#fff", weight: 3, fillColor: "#2f7d4f", fillOpacity: 1 }}
          />
        </MapContainer>
      </div>
      <figcaption className="muted small">
        {aerial ? t.herbMap.spotAerial : t.herbMap.spotMap}
        {sighting.accuracyM !== null && ` · ${t.herbMap.accuracy(sighting.accuracyM)}`}
      </figcaption>
    </figure>
  );
}

function SightingDetail({
  sighting,
  mapHerbs,
  from,
  onClose,
}: {
  sighting: HerbSighting;
  mapHerbs: MapHerbs;
  from: LatLng | null;
  onClose: () => void;
}) {
  const t = useT();
  const { lang } = useLanguage();
  const [photoIndex, setPhotoIndex] = useState(0);
  const herbs = mapHerbs.herbsFor(sighting);
  const title = herbTitle(herbs, sighting);
  const photo = sighting.photos[photoIndex] ?? sighting.photos[0];
  const seen = formatDate(sighting.observedOn, lang);

  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, []);

  return (
    <article ref={ref} className="herb-spot card" aria-labelledby={`herb-spot-${sighting.id}`}>
      <div className="herb-spot__header">
        <div>
          <h3 id={`herb-spot-${sighting.id}`} className="herb-spot__title">
            {title}
          </h3>
          <p className="muted small herb-spot__sci">
            <i>{sighting.scientificName}</i>
          </p>
        </div>
        <button type="button" className="chip" onClick={onClose}>
          {t.herbMap.close}
        </button>
      </div>

      <div className="herb-spot__media">
        <figure className="herb-spot__photo">
          <a href={sighting.url} target="_blank" rel="noreferrer">
            <img src={photo.src} alt={t.herbMap.photoOf(title)} loading="lazy" />
          </a>
          <figcaption className="muted small">{photo.credit}</figcaption>
          {sighting.photos.length > 1 && (
            <div className="herb-spot__thumbs" role="group" aria-label={t.herbMap.morePhotos}>
              {sighting.photos.map((p, i) => (
                <button
                  key={p.square}
                  type="button"
                  className="herb-spot__thumb"
                  aria-pressed={p === photo}
                  aria-label={t.herbMap.photoN(i + 1, sighting.photos.length)}
                  onClick={() => setPhotoIndex(i)}
                >
                  <img src={p.square} alt="" width={48} height={48} loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </figure>
        {sighting.obscured ? (
          <p className="herb-spot__place herb-spot__hidden muted small">{t.herbMap.approximate}</p>
        ) : (
          <SpotView sighting={sighting} t={t} />
        )}
      </div>

      <dl className="herb-spot__facts">
        <div>
          <dt>{t.herbMap.where}</dt>
          <dd>
            {sighting.placeName || t.herbMap.unknownPlace}
            {from && ` · ${t.herbMap.away(distanceKm(from, sighting.point).toFixed(1))}`}
          </dd>
        </div>
        <div>
          <dt>{t.herbMap.when}</dt>
          <dd>{seen ?? t.herbMap.unknownDate}</dd>
        </div>
        <div>
          <dt>{t.herbMap.idLabel}</dt>
          <dd>
            <span className={`herb-quality herb-quality--${sighting.quality}`}>{t.herbMap.quality[sighting.quality]}</span>
          </dd>
        </div>
      </dl>

      <div className="herb-spot__actions">
        {herbs.map((herb) => (
          <Link key={herb.key} className="button" to={herb.href}>
            {t.herbMap.readAbout(herb.name)}
          </Link>
        ))}
        {!sighting.obscured && (
          <a className="button button--secondary" href={googleMapsSpotUrl(sighting.point)} target="_blank" rel="noreferrer">
            {t.herbMap.openSpot}
          </a>
        )}
        <a className="button button--secondary" href={sighting.url} target="_blank" rel="noreferrer">
          {t.herbMap.onINat}
        </a>
      </div>
    </article>
  );
}

function SightingList({
  sightings,
  mapHerbs,
  selectedId,
  onSelect,
  from,
}: {
  sightings: HerbSighting[];
  mapHerbs: MapHerbs;
  selectedId: number | null;
  onSelect: (sighting: HerbSighting) => void;
  from: LatLng | null;
}) {
  const t = useT();
  const { lang } = useLanguage();
  const [shown, setShown] = useState(LIST_STEP);
  useEffect(() => setShown(LIST_STEP), [sightings]);

  return (
    <>
      <ul className="herb-spots">
        {sightings.slice(0, shown).map((sighting) => {
          const title = herbTitle(mapHerbs.herbsFor(sighting), sighting);
          const seen = formatDate(sighting.observedOn, lang);
          return (
            <li key={sighting.id}>
              <button
                type="button"
                className="herb-spots__item"
                aria-pressed={sighting.id === selectedId}
                onClick={() => onSelect(sighting)}
              >
                <img src={sighting.photos[0].thumb} alt="" width={240} height={180} loading="lazy" />
                <span className="herb-spots__text">
                  <strong>{title}</strong>
                  <span className="muted small">{sighting.placeName || t.herbMap.unknownPlace}</span>
                  <span className="muted small">
                    {[seen, from && t.herbMap.away(distanceKm(from, sighting.point).toFixed(1))].filter(Boolean).join(" · ")}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {sightings.length > shown && (
        <button type="button" className="button button--secondary" onClick={() => setShown((n) => n + LIST_STEP)}>
          {t.herbMap.showMore(sightings.length - shown)}
        </button>
      )}
    </>
  );
}

/** How many sightings each herb has, most first. */
function herbCounts(sightings: HerbSighting[], mapHerbs: MapHerbs): { herb: MapHerb; count: number }[] {
  const counts = new Map<MapHerb, number>();
  for (const sighting of sightings) {
    for (const herb of mapHerbs.herbsFor(sighting)) counts.set(herb, (counts.get(herb) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([herb, count]) => ({ herb, count }))
    .sort((a, b) => b.count - a.count || a.herb.name.localeCompare(b.herb.name));
}

export function HerbSafetyNote({ t }: { t: Messages }) {
  return <p className="herb-safety small">{t.herbMap.safety}</p>;
}

export function HerbCredit({ t }: { t: Messages }) {
  return (
    <p className="muted small">
      {t.herbMap.creditBefore}{" "}
      <a href="https://www.inaturalist.org/" target="_blank" rel="noreferrer">
        iNaturalist
      </a>
      {t.herbMap.creditAfter}
    </p>
  );
}

/** The selected sighting and a browsable list. The map with pins is drawn by the caller. */
export function SightingsPanel({
  sightings,
  mapHerbs,
  selected,
  onSelect,
  from,
}: {
  sightings: HerbSighting[];
  mapHerbs: MapHerbs;
  selected: HerbSighting | null;
  onSelect: (sighting: HerbSighting | null) => void;
  from: LatLng | null;
}) {
  return (
    <>
      {selected && (
        <SightingDetail key={selected.id} sighting={selected} mapHerbs={mapHerbs} from={from} onClose={() => onSelect(null)} />
      )}
      <SightingList sightings={sightings} mapHerbs={mapHerbs} selectedId={selected?.id ?? null} onSelect={onSelect} from={from} />
    </>
  );
}

const ALL = "all";

/** Herbs photographed around the visitor's starting point, with their own map. */
export function NearbyHerbs({
  origin,
  radiusKm,
  label,
  herb,
  onHerbChange,
}: {
  origin: LatLng;
  radiusKm: number;
  label: string;
  /** The chosen herb's key, or null for all herbs. */
  herb: string | null;
  onHerbChange: (key: string | null) => void;
}) {
  const t = useT();
  const mapHerbs = useMapHerbs();
  const herbKey = herb && mapHerbs.get(herb) ? herb : ALL;
  const setHerbKey = (key: string) => onHerbChange(key === ALL ? null : key);
  const [confirmedOnly, setConfirmedOnly] = useState(false);
  const [view, setView] = useState<MapView>("map");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const chosen = herbKey === ALL ? undefined : mapHerbs.get(herbKey);
  const taxonIds = chosen ? chosen.taxonIds : mapHerbs.allTaxonIds;
  const area = useMemo(() => ({ center: origin, radiusKm }), [origin, radiusKm]);
  const { results, failed, loading } = useHerbSightings(area, taxonIds, confirmedOnly);

  const sightings = useMemo(() => results?.sightings ?? [], [results]);
  const counts = useMemo(() => herbCounts(sightings, mapHerbs), [sightings, mapHerbs]);
  const selected = sightings.find((s) => s.id === selectedId) ?? null;
  const fitPoints = useMemo<LatLng[]>(
    () => (sightings.length > 0 ? [origin, ...sightings.map((s) => s.point)] : [origin]),
    [origin, sightings],
  );
  const views: MapView[] = hasSatelliteImagery(origin) ? ["map", "satellite", "terrain"] : ["map", "terrain"];

  useEffect(() => setSelectedId(null), [herbKey, confirmedOnly, origin, radiusKm]);

  const groups = (["herbs", "japanese"] as const).map((group) => ({
    group,
    herbs: mapHerbs.herbs.filter((herb) => herb.group === group),
  }));

  return (
    <section className="trail-step herb-map" aria-labelledby="herb-map-title">
      <h2 id="herb-map-title">{t.herbMap.title}</h2>
      <p className="muted">{t.herbMap.lead(label)}</p>

      <div className="herb-map__filters">
        <div className="field">
          <label htmlFor="herb-map-herb" className="field__label">
            {t.herbMap.herbLabel}
          </label>
          <select id="herb-map-herb" className="input" value={herbKey} onChange={(e) => setHerbKey(e.target.value)}>
            <option value={ALL}>{t.herbMap.allHerbs}</option>
            {groups.map(({ group, herbs }) => (
              <optgroup key={group} label={group === "herbs" ? t.herbMap.groupHerbs : t.herbMap.groupJapanese}>
                {herbs.map((herb) => (
                  <option key={herb.key} value={herb.key}>
                    {herb.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <button type="button" className="chip" aria-pressed={confirmedOnly} onClick={() => setConfirmedOnly((v) => !v)}>
          {t.herbMap.confirmedOnly}
        </button>
      </div>

      {herbKey === ALL && counts.length > 0 && (
        <div className="herb-map__found">
          <p className="small herb-map__found-label">{t.herbMap.spotted}</p>
          <div className="herb-map__chips">
            {counts.map(({ herb, count }) => (
              <button key={herb.key} type="button" className="chip" onClick={() => setHerbKey(herb.key)}>
                {herb.name} <span className="muted">{count}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {chosen && (
        <p className="small">
          <button type="button" className="chip" onClick={() => setHerbKey(ALL)}>
            {t.herbMap.backToAll}
          </button>{" "}
          <Link to={chosen.href}>{t.herbMap.readAbout(chosen.name)}</Link>
        </p>
      )}

      <div className="trail-modes" role="group" aria-label={t.trail.mapStyle}>
        {views.map((option) => (
          <button key={option} type="button" className="chip" aria-pressed={view === option} onClick={() => setView(option)}>
            {t.trail.views[option]}
          </button>
        ))}
      </div>
      <div className="map">
        <MapContainer
          center={origin}
          zoom={13}
          scrollWheelZoom={false}
          dragging={!window.matchMedia("(pointer: coarse)").matches}
          className="map__canvas"
        >
          <TileLayer
            key={view}
            attribution={MAP_VIEWS[view].attribution}
            url={MAP_VIEWS[view].url}
            maxNativeZoom={MAP_VIEWS[view].maxNativeZoom}
            maxZoom={19}
          />
          <FitTo points={fitPoints} />
          <FocusSighting sighting={selected} />
          <CircleMarker center={origin} radius={9} pathOptions={{ color: "#fff", weight: 2, fillColor: "#2f6fdb", fillOpacity: 1 }}>
            <Tooltip>{t.trail.youStartHere}</Tooltip>
          </CircleMarker>
          <HerbPins
            sightings={sightings}
            mapHerbs={mapHerbs}
            selectedId={selectedId}
            onSelect={(s) => setSelectedId(s.id)}
          />
        </MapContainer>
      </div>

      {loading && (
        <p className="muted" role="status">
          {t.herbMap.loading}
        </p>
      )}
      {failed && (
        <p className="alert alert--error" role="alert">
          {t.herbMap.failed}
        </p>
      )}
      {results && sightings.length === 0 && <p className="muted">{t.herbMap.none}</p>}
      {results && sightings.length > 0 && (
        <p className="muted small" role="status">
          {t.herbMap.showing(sightings.length, results.total)}
        </p>
      )}

      <HerbSafetyNote t={t} />
      {sightings.length > 0 && (
        <SightingsPanel
          sightings={sightings}
          mapHerbs={mapHerbs}
          selected={selected}
          onSelect={(s) => setSelectedId(s?.id ?? null)}
          from={origin}
        />
      )}
      <HerbCredit t={t} />
    </section>
  );
}
