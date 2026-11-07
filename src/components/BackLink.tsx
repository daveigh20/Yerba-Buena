import { Link, useLocation, useNavigate } from "react-router-dom";

/**
 * Goes back in history when the user came from inside the app (so search results and
 * scroll position are kept); otherwise links to `fallback`.
 */
export default function BackLink({ fallback, label }: { fallback: string; label: string }) {
  const navigate = useNavigate();
  const location = useLocation();
  const cameFromApp = location.key !== "default";

  return (
    <Link
      to={fallback}
      className="back-link"
      onClick={(e) => {
        if (cameFromApp) {
          e.preventDefault();
          navigate(-1);
        }
      }}
    >
      ← {label}
    </Link>
  );
}
