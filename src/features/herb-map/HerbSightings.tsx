import L from "leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import { Circle, CircleMarker, MapContainer, Marker, TileLayer, Tooltip, useMap, useMapEvents } from "react-leaflet";
import { Link } from "react-router-dom";
import { type Lang, type Messages, useLanguage, useT } from "../../i18n/LanguageContext";
import { HTML_LANG } from "../../i18n/messages";
import { ALL_VIEWS, MAP_VIEWS, mapStyle, type MapView } from "../trail-map/mapViews";
import { distanceKm, hasSatelliteImagery, type LatLng } from "../trail-map/trailGuide";
import { MAP_HERB_GROUPS, type MapHerb, type MapHerbGroup, type MapHerbs, useMapHerbs } from "./mapHerbs";
import {
  findHerbSightings,
  googleMapsSpotUrl,
  type HerbSighting,
  type SightingArea,
  type SightingResults,
  type Box,
  viewBox,
} from "./sightings";

const LIST_STEP = 12;

/**
 * Loads sightings for an area. `area` is compared by value, so it can be rebuilt on each render.
 * With `keepWhileLoading`, the last results stay up while the next ones load, so panning a map
 * doesn't blank it.
 */
export function useHerbSightings(
  area: SightingArea | null,
  taxonIds: number[],
  confirmedOnly: boolean,
  keepWhileLoading = false,
) {
  const [state, setState] = useState<{ key: string; results: SightingResults | null; failed: boolean }>({
    key: "",
    results: null,
    failed: false,
  });
  const areaKey = area ? JSON.stringify(area) : "";
  const taxaKey = taxonIds.join(",");
  const requestKey = areaKey ? `${areaKey}|${taxaKey}|${confirmedOnly}` : "";

  useEffect(() => {
    if (!areaKey) return;
    const controller = new AbortController();
    const key = `${areaKey}|${taxaKey}|${confirmedOnly}`;
    findHerbSightings(JSON.parse(areaKey) as SightingArea, taxaKey ? taxaKey.split(",").map(Number) : [], confirmedOnly, controller.signal)
      .then((found) => {
        if (!controller.signal.aborted) setState({ key, results: found, failed: false });
      })
      .catch(() => {
        if (!controller.signal.aborted) setState((last) => ({ key, results: last.results, failed: true }));
      });
    return () => controller.abort();
  }, [areaKey, taxaKey, confirmedOnly]);

  const current = Boolean(requestKey) && state.key === requestKey;
  const results = (current && !state.failed) || (keepWhileLoading && requestKey) ? state.results : null;
  return { results, failed: current && state.failed, loading: Boolean(requestKey) && !current };
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

/** A photo pin, or a plain leaf pin when the photo is only on iNaturalist. */
function pinIcon(photo: string | undefined, selected: boolean): L.DivIcon {
  const key = `${photo ?? ""}|${selected}`;
  let icon = iconCache.get(key);
  if (!icon) {
    const size = selected ? 52 : photo ? 38 : 30;
    icon = L.divIcon({
      className: ["herb-pin", selected && "herb-pin--selected", !photo && "herb-pin--plain"].filter(Boolean).join(" "),
      html: photo
        ? `<img src="${escapeAttr(photo)}" alt="" width="${size}" height="${size}" loading="lazy">`
        : `<span aria-hidden="true"></span>`,
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
            icon={pinIcon(sighting.photos[0]?.square, selected)}
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

/** Whether people can eat the herb, why, and its benefits. */
function HerbEdibility({ herb, t, showName }: { herb: MapHerb; t: Messages; showName: boolean }) {
  const { edibility, eat } = herb;
  const food = edibility !== "not-food";
  return (
    <section className={`herb-eat herb-eat--${edibility}`} aria-label={`${t.herbMap.eatTitle} ${herb.name}`}>
      <h4 className="herb-eat__title">
        {t.herbMap.eatTitle}
        {showName && <span className="muted"> · {herb.name}</span>}
      </h4>
      <p className="herb-eat__status">{t.herbMap.eatStatus[edibility]}</p>
      <dl className="herb-eat__facts">
        <div>
          <dt>{food ? t.herbMap.eatParts : t.herbMap.eatUse}</dt>
          <dd>{eat.parts}</dd>
        </div>
        <div>
          <dt>{food ? t.herbMap.eatWhy : t.herbMap.eatWhyNot}</dt>
          <dd>{eat.why}</dd>
        </div>
        {eat.benefits.length > 0 && (
          <div>
            <dt>{t.herbMap.eatBenefits}</dt>
            <dd>
              <ul className="herb-eat__benefits">
                {eat.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </dd>
          </div>
        )}
        <div>
          <dt>{t.herbMap.eatCare}</dt>
          <dd>{eat.care}</dd>
        </div>
      </dl>
    </section>
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
  const photo = sighting.photos[photoIndex] ?? sighting.photos[0] ?? null;
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
        {!photo && (
          <div className="herb-spot__photo herb-spot__no-photo">
            <p className="muted small">{t.herbMap.photoOnINat}</p>
            <a className="button button--secondary" href={sighting.url} target="_blank" rel="noreferrer">
              {t.herbMap.seePhoto}
            </a>
          </div>
        )}
        {photo && (
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
        )}
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

      {herbs.length > 0 && (
        <div className="herb-eat-group">
          {herbs.map((herb) => (
            <HerbEdibility key={herb.key} herb={herb} t={t} showName={herbs.length > 1} />
          ))}
          {herbs.some((herb) => herb.edibility !== "not-food") && <p className="muted small herb-eat__wild">{t.herbMap.eatWild}</p>}
        </div>
      )}

      <div className="herb-spot__actions">
        {herbs.map(
          (herb) =>
            herb.href && (
              <Link key={herb.key} className="button" to={herb.href}>
                {t.herbMap.readAbout(herb.name)}
              </Link>
            ),
        )}
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
                {sighting.photos[0] ? (
                  <img src={sighting.photos[0].thumb} alt="" width={240} height={180} loading="lazy" />
                ) : (
                  <span className="herb-spots__no-photo small">{t.herbMap.noPhoto}</span>
                )}
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

export type HerbMapScope = "near" | "world";

/** Where the world map opens: the whole globe, with the most land in view. */
const WORLD_CENTER: LatLng = [20, 0];
const WORLD_ZOOM = 2;
/** Below this zoom, the map shows more than the US, so satellite uses world imagery. */
const US_AERIAL_MIN_ZOOM = 7;

interface WorldView {
  box: Box;
  center: LatLng;
  zoom: number;
}

/** Reports the part of the world the map is showing, after the visitor stops moving it. */
function TrackView({ onChange }: { onChange: (view: WorldView) => void }) {
  const timer = useRef<number | undefined>(undefined);
  const map = useMapEvents({
    moveend: () => report(),
  });
  function report() {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      const bounds = map.getBounds();
      const center = map.getCenter();
      onChange({
        box: viewBox(bounds.getSouth(), bounds.getWest(), bounds.getNorth(), bounds.getEast()),
        center: [center.lat, ((((center.lng + 180) % 360) + 360) % 360) - 180],
        zoom: map.getZoom(),
      });
    }, 400);
  }
  useEffect(() => {
    report();
    return () => window.clearTimeout(timer.current);
    // Only once, for the opening view. Later moves report through `moveend`.
  }, []);
  return null;
}

/**
 * Herbs people have photographed in the wild: around the visitor's starting point, or anywhere
 * in the world. In the world view, the list follows whatever part of the map is showing.
 */
export function HerbMap({
  origin,
  radiusKm,
  label,
  herb,
  onHerbChange,
}: {
  /** The visitor's starting point. Without one, only the world view is offered. */
  origin: LatLng | null;
  radiusKm: number;
  label: string | null;
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
  const [chosenScope, setScope] = useState<HerbMapScope>(origin ? "near" : "world");
  const scope: HerbMapScope = origin ? chosenScope : "world";
  const [worldView, setWorldView] = useState<WorldView | null>(null);

  const chosen = herbKey === ALL ? undefined : mapHerbs.get(herbKey);
  const taxonIds = chosen ? chosen.taxonIds : mapHerbs.allTaxonIds;
  const area = useMemo<SightingArea | null>(
    () => (scope === "near" && origin ? { center: origin, radiusKm } : (worldView?.box ?? null)),
    [scope, origin, radiusKm, worldView],
  );
  const { results, failed, loading } = useHerbSightings(area, taxonIds, confirmedOnly, scope === "world");

  const sightings = useMemo(() => results?.sightings ?? [], [results]);
  const counts = useMemo(() => herbCounts(sightings, mapHerbs), [sightings, mapHerbs]);
  const selected = sightings.find((s) => s.id === selectedId) ?? null;
  const fitPoints = useMemo<LatLng[]>(
    () => (!origin ? [] : sightings.length > 0 ? [origin, ...sightings.map((s) => s.point)] : [origin]),
    [origin, sightings],
  );
  const aerialAt =
    scope === "near" ? origin : worldView && worldView.zoom >= US_AERIAL_MIN_ZOOM ? worldView.center : null;
  const tiles = mapStyle(view, aerialAt);
  const from = scope === "near" ? origin : null;

  useEffect(() => setSelectedId(null), [herbKey, confirmedOnly, origin, radiusKm, scope]);

  const groupLabel: Record<MapHerbGroup, string> = {
    herbs: t.herbMap.groupHerbs,
    japanese: t.herbMap.groupJapanese,
    world: t.herbMap.groupWorld,
  };
  const groups = MAP_HERB_GROUPS.map((group) => ({
    group,
    herbs: mapHerbs.herbs.filter((h) => h.group === group),
  }));

  return (
    <section className="trail-step herb-map" aria-labelledby="herb-map-title">
      <h2 id="herb-map-title">{scope === "near" ? t.herbMap.title : t.herbMap.worldTitle}</h2>
      <p className="muted">{scope === "near" && label ? t.herbMap.lead(label) : t.herbMap.worldLead}</p>

      {origin && label && (
        <div className="trail-modes" role="group" aria-label={t.herbMap.scopeLabel}>
          <button type="button" className="chip" aria-pressed={scope === "near"} onClick={() => setScope("near")}>
            {t.herbMap.scopeNear(label)}
          </button>
          <button type="button" className="chip" aria-pressed={scope === "world"} onClick={() => setScope("world")}>
            {t.herbMap.scopeWorld}
          </button>
        </div>
      )}

      <div className="herb-map__filters">
        <div className="field">
          <label htmlFor="herb-map-herb" className="field__label">
            {t.herbMap.herbLabel}
          </label>
          <select id="herb-map-herb" className="input" value={herbKey} onChange={(e) => setHerbKey(e.target.value)}>
            <option value={ALL}>{t.herbMap.allHerbs}</option>
            {groups.map(({ group, herbs }) => (
              <optgroup key={group} label={groupLabel[group]}>
                {herbs.map((h) => (
                  <option key={h.key} value={h.key}>
                    {h.name}
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
          <p className="small herb-map__found-label">{scope === "near" ? t.herbMap.spotted : t.herbMap.spottedHere}</p>
          <div className="herb-map__chips">
            {counts.map(({ herb: h, count }) => (
              <button key={h.key} type="button" className="chip" onClick={() => setHerbKey(h.key)}>
                {h.name} <span className="muted">{count}</span>
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
          {chosen.href && <Link to={chosen.href}>{t.herbMap.readAbout(chosen.name)}</Link>}
        </p>
      )}

      <div className="trail-modes" role="group" aria-label={t.trail.mapStyle}>
        {ALL_VIEWS.map((option) => (
          <button key={option} type="button" className="chip" aria-pressed={view === option} onClick={() => setView(option)}>
            {t.trail.views[option]}
          </button>
        ))}
      </div>
      <div className="map">
        <MapContainer
          // A fresh map for each scope, so each opens on its own view.
          key={scope}
          center={scope === "near" && origin ? origin : WORLD_CENTER}
          zoom={scope === "near" ? 13 : WORLD_ZOOM}
          minZoom={2}
          worldCopyJump
          scrollWheelZoom={false}
          dragging={!window.matchMedia("(pointer: coarse)").matches || scope === "world"}
          className="map__canvas"
        >
          <TileLayer
            key={tiles.url}
            attribution={tiles.attribution}
            url={tiles.url}
            maxNativeZoom={tiles.maxNativeZoom}
            maxZoom={19}
          />
          {scope === "near" && <FitTo points={fitPoints} />}
          {scope === "world" && <TrackView onChange={setWorldView} />}
          <FocusSighting sighting={selected} />
          {origin && (
            <CircleMarker center={origin} radius={9} pathOptions={{ color: "#fff", weight: 2, fillColor: "#2f6fdb", fillOpacity: 1 }}>
              <Tooltip>{t.trail.youStartHere}</Tooltip>
            </CircleMarker>
          )}
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
      {!loading && results && sightings.length === 0 && (
        <p className="muted">{scope === "near" ? t.herbMap.none : t.herbMap.worldNone}</p>
      )}
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
          from={from}
        />
      )}
      <HerbCredit t={t} />
    </section>
  );
}
