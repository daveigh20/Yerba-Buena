import "leaflet/dist/leaflet.css";
import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { CircleMarker, MapContainer, Polyline, TileLayer, Tooltip, useMap } from "react-leaflet";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { type Lang, type Messages, useLanguage, useT } from "../../i18n/LanguageContext";
import {
  type DifficultyChoice,
  type Directions,
  findPlace,
  findTrails,
  getDirections,
  hasSatelliteImagery,
  googleMapsUrl,
  komootEmbedUrl,
  type LatLng,
  type LengthChoice,
  matchesChoices,
  type Origin,
  RADIUS_OPTIONS,
  type Sport,
  type Trail,
  type TravelMode,
  UNNAMED_TRAIL,
} from "./trailGuide";
import { GOOGLE_MAPS_KEY, googleSatelliteUrl, trailImages } from "./googleImages";
import { buildHike, formatDistance } from "./hikeDirections";


function FitBounds({ points }: { points: LatLng[] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length > 0) map.fitBounds(points, { padding: [32, 32] });
  }, [map, points]);
  return null;
}

type MapView = "map" | "satellite" | "terrain";

const MAP_VIEWS: Record<MapView, { url: string; attribution: string; maxNativeZoom: number }> = {
  map: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxNativeZoom: 19,
  },
  satellite: {
    url: "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}",
    attribution: 'Imagery: <a href="https://www.usgs.gov/">U.S. Geological Survey</a>',
    maxNativeZoom: 16,
  },
  terrain: {
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution:
      'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, SRTM | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    maxNativeZoom: 17,
  },
};

function GoogleTrailImages({ apiKey, trail, lang, t }: { apiKey: string; trail: Trail; lang: Lang; t: Messages }) {
  const images = useMemo(() => trailImages(apiKey, trail, lang), [apiKey, trail, lang]);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <p className="alert alert--error" role="alert">
        {t.trail.googleImagesFailed}
      </p>
    );
  }
  return (
    <div className="trail-images">
      {images.map((image) => (
        <figure key={image.title}>
          <img
            src={image.src}
            alt={image.alt}
            width={640}
            height={400}
            loading="lazy"
            // A website-restricted key needs the site's address, which the server's same-origin policy would withhold.
            referrerPolicy="strict-origin-when-cross-origin"
            onError={() => setFailed(true)}
          />
          <figcaption className="muted small">{image.title}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function TrailGuide({
  origin,
  trail,
  mode,
  showGoogle,
  lang,
  t,
}: {
  origin: LatLng;
  trail: Trail;
  mode: TravelMode;
  showGoogle: boolean;
  lang: Lang;
  t: Messages;
}) {
  const [directions, setDirections] = useState<Directions | null>(null);
  const [failed, setFailed] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [view, setView] = useState<MapView>("map");
  const views: MapView[] = hasSatelliteImagery(trail.access) ? ["map", "satellite", "terrain"] : ["map", "terrain"];
  const onPhoto = view === "satellite";
  const hike = useMemo(() => buildHike(trail, reverse, lang), [trail, reverse, lang]);

  useEffect(() => {
    const controller = new AbortController();
    setDirections(null);
    setFailed(false);
    getDirections(origin, trail.access, mode, trail.name, controller.signal, lang)
      .then(setDirections)
      .catch(() => {
        if (!controller.signal.aborted) setFailed(true);
      });
    return () => controller.abort();
  }, [origin, trail, mode, lang]);

  const points = useMemo(
    () => [origin, trail.access, ...(directions?.line ?? []), ...trail.paths.flat()],
    [origin, trail, directions],
  );

  return (
    <>
      {showGoogle && GOOGLE_MAPS_KEY ? (
        <GoogleTrailImages apiKey={GOOGLE_MAPS_KEY} trail={trail} lang={lang} t={t} />
      ) : (
        <>
        <div className="trail-modes" role="group" aria-label={t.trail.mapStyle}>
          {views.map((option) => (
            <button key={option} type="button" className="chip" aria-pressed={view === option} onClick={() => setView(option)}>
              {t.trail.views[option]}
            </button>
          ))}
        </div>
        <div className="map">
          <MapContainer
            bounds={[origin, trail.access]}
            scrollWheelZoom={false}
            // On touch screens one finger scrolls the page instead of getting stuck panning the map.
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
            <FitBounds points={points} />
            {trail.paths.map((path, i) => (
              <Polyline key={i} positions={path} pathOptions={{ color: onPhoto ? "#ffffff" : "#8cc7a1", weight: 4 }} />
            ))}
            {hike && <Polyline positions={hike.line} pathOptions={{ color: onPhoto ? "#ffd23f" : "#1f5c38", weight: 5 }} />}
            {directions && <Polyline positions={directions.line} pathOptions={{ color: "#2f6fdb", weight: 5 }} />}
            <CircleMarker center={origin} radius={9} pathOptions={{ color: "#fff", weight: 2, fillColor: "#2f6fdb", fillOpacity: 1 }}>
              <Tooltip>{t.trail.youStartHere}</Tooltip>
            </CircleMarker>
            <CircleMarker center={trail.access} radius={9} pathOptions={{ color: "#fff", weight: 2, fillColor: "#2f7d4f", fillOpacity: 1 }}>
              <Tooltip>{t.trail.joinHere(trail.name)}</Tooltip>
            </CircleMarker>
            {hike && !hike.isLoop && (
              <CircleMarker center={hike.end} radius={9} pathOptions={{ color: "#fff", weight: 2, fillColor: "#b42318", fillOpacity: 1 }}>
                <Tooltip>{t.trail.turnAround}</Tooltip>
              </CircleMarker>
            )}
          </MapContainer>
        </div>
        </>
      )}

      <h3 className="trail-guide__heading">{t.trail.gettingThere}</h3>

      {failed && (
        <p className="alert alert--error" role="alert">
          {t.trail.directionsFailed}
        </p>
      )}
      {!directions && !failed && <p className="muted" role="status">{t.trail.findingWay(trail.name)}</p>}
      {directions && (
        <>
          <p className="trail-guide__summary">
            <strong>{t.trail.duration(directions.minutes)}</strong> · {t.trail.toClosestPoint(directions.distanceKm.toFixed(1))}
          </p>
          <ol className="trail-guide__steps">
            {directions.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </>
      )}
      <a className="button button--secondary" href={googleMapsUrl(origin, trail.access, mode)} target="_blank" rel="noreferrer">
        {t.trail.openGoogleMaps}
      </a>{" "}
      <a className="button button--secondary" href={googleSatelliteUrl(trail.access)} target="_blank" rel="noreferrer">
        {t.trail.googleSatellite}
      </a>

      <h3 className="trail-guide__heading">{t.trail.onTheTrail}</h3>
      {!hike && <p className="muted">{t.trail.noHike}</p>}
      {hike && (
        <>
          <p className="trail-guide__summary">
            <strong>{formatDistance(hike.distanceKm)}</strong>{" "}
            {hike.isLoop ? t.trail.loop : t.trail.oneWay(formatDistance(hike.distanceKm * 2))}
          </p>
          <ol className="trail-guide__steps">
            {hike.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          {hike.canReverse && (
            <button type="button" className="chip" aria-pressed={reverse} onClick={() => setReverse((value) => !value)}>
              {t.trail.reverse}
            </button>
          )}
          {hike.isPartOfTrail && (
            <p className="muted small">{t.trail.partOfTrail}</p>
          )}
          <p className="muted small">{t.trail.osmNote}</p>
        </>
      )}
    </>
  );
}

export default function TrailMapPage() {
  const t = useT();
  const { lang } = useLanguage();
  useDocumentTitle(t.trail.title);

  const [query, setQuery] = useState("");
  const [origin, setOrigin] = useState<Origin | null>(null);
  const [sport, setSport] = useState<Sport>("hike");
  const [radius, setRadius] = useState(10);
  const [length, setLength] = useState<LengthChoice>("any");
  const [difficulty, setDifficulty] = useState<DifficultyChoice>("any");
  const [mode, setMode] = useState<TravelMode>("car");
  const [showGoogle, setShowGoogle] = useState(false);

  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [trails, setTrails] = useState<Trail[] | null>(null);
  const [trailsFailed, setTrailsFailed] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const guideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!origin) return;
    const controller = new AbortController();
    setTrails(null);
    setTrailsFailed(false);
    setSelectedId(null);
    findTrails(origin, radius, controller.signal)
      .then((found) => {
        if (!controller.signal.aborted) setTrails(found);
      })
      .catch(() => {
        if (!controller.signal.aborted) setTrailsFailed(true);
      });
    return () => controller.abort();
  }, [origin, radius]);

  const matches = useMemo(
    () =>
      (trails ?? [])
        .filter((trail) => matchesChoices(trail, length, difficulty))
        .map((trail) => (trail.name === UNNAMED_TRAIL ? { ...trail, name: t.trail.unnamed } : trail)),
    [trails, length, difficulty, t],
  );
  const selected = matches.find((trail) => trail.id === selectedId) ?? null;
  const originPoint = useMemo<LatLng | null>(() => (origin ? [origin.lat, origin.lng] : null), [origin]);

  function locateMe() {
    setLocationError("");
    if (!navigator.geolocation) {
      setLocationError(t.trail.noGeolocation);
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocating(false);
        setOrigin({ lat: coords.latitude, lng: coords.longitude, label: t.trail.yourLocation });
      },
      () => {
        setLocating(false);
        setLocationError(t.trail.geolocationFailed);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  async function searchPlace(event: FormEvent) {
    event.preventDefault();
    const text = query.trim();
    if (!text) return;
    setLocationError("");
    setLocating(true);
    try {
      const place = await findPlace(text);
      if (place) setOrigin(place);
      else setLocationError(t.trail.placeNotFound(text));
    } catch {
      setLocationError(t.trail.placeSearchDown);
    } finally {
      setLocating(false);
    }
  }

  function chooseTrail(trail: Trail) {
    setSelectedId(trail.id);
    setMode(trail.distanceKm > 3 ? "car" : "foot");
    requestAnimationFrame(() => guideRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  return (
    <>
      <header className="page-header">
        <h1>{t.trail.title}</h1>
        <p className="lead muted">{t.trail.lead}</p>
      </header>

      <section className="trail-step card" aria-labelledby="trail-step-where">
        <h2 id="trail-step-where">{t.trail.step1}</h2>
        <div className="trail-where">
          <button type="button" className="button" onClick={locateMe} disabled={locating}>
            {t.trail.useLocation}
          </button>
          <span className="muted">{t.trail.or}</span>
          <form className="trail-where__search" onSubmit={searchPlace}>
            <label htmlFor="trail-place" className="visually-hidden">
              {t.trail.placeLabel}
            </label>
            <input
              id="trail-place"
              className="input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.trail.placeLabel}
            />
            <button type="submit" className="button button--secondary" disabled={locating || !query.trim()}>
              {t.trail.search}
            </button>
          </form>
        </div>
        {locating && <p className="muted" role="status">{t.trail.finding}</p>}
        {locationError && (
          <p className="alert alert--error" role="alert">
            {locationError}
          </p>
        )}
        {origin && !locating && (
          <p className="muted small">
            {t.trail.startingFrom} <strong>{origin.label}</strong>
          </p>
        )}
        <p className="muted small">
          {t.trail.privacy}
        </p>
      </section>

      <section className="trail-step card" aria-labelledby="trail-step-what">
        <h2 id="trail-step-what">{t.trail.step2}</h2>
        <div className="trail-choices">
          <div className="field">
            <label htmlFor="trail-sport" className="field__label">{t.trail.activity}</label>
            <select id="trail-sport" className="input" value={sport} onChange={(e) => setSport(e.target.value as Sport)}>
              <option value="hike">{t.trail.hiking}</option>
              <option value="jogging">{t.trail.running}</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="trail-radius" className="field__label">{t.trail.howFar}</label>
            <select id="trail-radius" className="input" value={radius} onChange={(e) => setRadius(Number(e.target.value))}>
              {RADIUS_OPTIONS.map((km) => (
                <option key={km} value={km}>{t.trail.within(km)}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="trail-length" className="field__label">{t.trail.length}</label>
            <select id="trail-length" className="input" value={length} onChange={(e) => setLength(e.target.value as LengthChoice)}>
              <option value="any">{t.trail.lengths.any}</option>
              <option value="short">{t.trail.lengths.short}</option>
              <option value="medium">{t.trail.lengths.medium}</option>
              <option value="long">{t.trail.lengths.long}</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="trail-difficulty" className="field__label">{t.trail.difficultyLabel}</label>
            <select id="trail-difficulty" className="input" value={difficulty} onChange={(e) => setDifficulty(e.target.value as DifficultyChoice)}>
              <option value="any">{t.trail.anyDifficulty}</option>
              <option value="easy">{t.trail.difficulty.easy}</option>
              <option value="moderate">{t.trail.difficulty.moderate}</option>
              <option value="challenging">{t.trail.difficulty.challenging}</option>
            </select>
          </div>
        </div>
      </section>

      {origin && originPoint && (
        <>
          <section className="trail-step" aria-labelledby="trail-step-choose">
            <h2 id="trail-step-choose">{t.trail.step3}</h2>
            {!trails && !trailsFailed && <p className="muted" role="status">{t.trail.lookingNear(origin.label)}</p>}
            {trailsFailed && (
              <p className="alert alert--error" role="alert">
                {t.trail.trailsFailed}
              </p>
            )}
            {trails && matches.length === 0 && (
              <p className="muted">
                {t.trail.noTrails}
              </p>
            )}
            {matches.length > 0 && (
              <ul className="trail-list">
                {matches.map((trail) => (
                  <li key={trail.id}>
                    <button type="button" className="trail-option" aria-pressed={trail.id === selectedId} onClick={() => chooseTrail(trail)}>
                      <strong>{trail.name}</strong>
                      <span className="muted small">
                        {t.trail.away(trail.distanceKm.toFixed(1))} · {t.trail.long(trail.lengthKm.toFixed(1))} ·{" "}
                        {trail.difficulty ? t.trail.difficulty[trail.difficulty] : t.trail.notRated}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {selected && (
            <section className="trail-step" ref={guideRef} aria-labelledby="trail-guide-title">
              <h2 id="trail-guide-title">{t.trail.yourWay(selected.name)}</h2>
              <div className="trail-modes" role="group" aria-label={t.trail.howGetting}>
                <button type="button" className="chip" aria-pressed={mode === "car"} onClick={() => setMode("car")}>{t.trail.drive}</button>
                <button type="button" className="chip" aria-pressed={mode === "foot"} onClick={() => setMode("foot")}>{t.trail.walk}</button>
              </div>
              {GOOGLE_MAPS_KEY && (
                <div className="trail-modes" role="group" aria-label={t.trail.whatToShow}>
                  <button type="button" className="chip" aria-pressed={!showGoogle} onClick={() => setShowGoogle(false)}>{t.trail.map}</button>
                  <button type="button" className="chip" aria-pressed={showGoogle} onClick={() => setShowGoogle(true)}>{t.trail.googleImages}</button>
                </div>
              )}
              <TrailGuide key={selected.id} origin={originPoint} trail={selected} mode={mode} showGoogle={showGoogle} lang={lang} t={t} />
              <p className="muted small">
                {t.trail.directionsNote}
              </p>
            </section>
          )}

          {!showGoogle && (
            <section className="trail-step" aria-labelledby="trail-komoot">
              <h2 id="trail-komoot">{t.trail.komootTitle}</h2>
              <p className="muted">{t.trail.komootLead(origin.label)}</p>
              <div className="map">
                <iframe
                  className="trail-komoot__frame"
                  title={t.trail.komootFrame(origin.label)}
                  src={komootEmbedUrl(origin, sport, radius)}
                  loading="lazy"
                  allow="fullscreen"
                  allowFullScreen
                />
              </div>
            </section>
          )}

          <p className="muted small">
            {t.trail.creditTrails}{" "}
            <a href="https://hiking.waymarkedtrails.org/" target="_blank" rel="noreferrer">Waymarked Trails</a> {t.trail.creditAnd}{" "}
            <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>{t.trail.creditContributors}{" "}
            <a href="https://routing.openstreetmap.de/about.html" target="_blank" rel="noreferrer">FOSSGIS OSRM</a>.
          </p>
        </>
      )}
    </>
  );
}
