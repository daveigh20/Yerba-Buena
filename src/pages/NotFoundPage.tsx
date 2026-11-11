import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useT } from "../i18n/LanguageContext";

export default function NotFoundPage({ message }: { message?: string }) {
  const t = useT();
  useDocumentTitle(t.notFound.title);
  return (
    <section className="empty-state">
      <h1>{t.notFound.title}</h1>
      <p className="muted">{message ?? t.notFound.page}</p>
      <Link to="/herbs" className="button">
        {t.notFound.cta}
      </Link>
    </section>
  );
}
