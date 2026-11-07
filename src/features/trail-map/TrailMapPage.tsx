import "leaflet/dist/leaflet.css";
import { CircleMarker, MapContainer, Polyline, Popup, TileLayer, Tooltip } from "react-leaflet";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { STOPS } from "./stops";

export default function TrailMapPage() {
  useDocumentTitle("Trail Map");
  const points = STOPS.map((s) => [s.lat, s.lng] as [number, number]);

  return (
    <>
      <header className="page-header">
        <h1>Trail Map</h1>
        <p className="lead muted">Your route, from start to finish.</p>
      </header>

      <div className="map">
        <MapContainer
          bounds={points}
          boundsOptions={{ padding: [40, 40] }}
          scrollWheelZoom={false}
          className="map__canvas"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polyline positions={points} pathOptions={{ color: "#2f6fdb", weight: 4 }} />
          {STOPS.map((stop, i) => (
            <CircleMarker
              key={stop.name}
              center={[stop.lat, stop.lng]}
              radius={9}
              pathOptions={{ color: "#fff", weight: 2, fillColor: "#2f7d4f", fillOpacity: 1 }}
            >
              <Tooltip>{`${i + 1}. ${stop.name}`}</Tooltip>
              <Popup>{stop.name}</Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      <ol className="stops">
        {STOPS.map((stop) => (
          <li key={stop.name}>
            <strong>{stop.name}</strong>{" "}
            <span className="muted small">
              {stop.lat.toFixed(4)}, {stop.lng.toFixed(4)}
            </span>
          </li>
        ))}
      </ol>
    </>
  );
}
