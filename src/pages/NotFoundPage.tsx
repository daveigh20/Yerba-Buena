import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function NotFoundPage({ message = "We couldn't find that page." }: { message?: string }) {
  useDocumentTitle("Not found");
  return (
    <section className="empty-state">
      <h1>Not found</h1>
      <p className="muted">{message}</p>
      <Link to="/herbs" className="button">
        Go to herb search
      </Link>
    </section>
  );
}
