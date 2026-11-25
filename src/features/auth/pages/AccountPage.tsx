import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import { useLanguage, useT } from "../../../i18n/LanguageContext";
import { useAuth } from "../AuthContext";

export default function AccountPage() {
  const t = useT();
  const { lang } = useLanguage();
  useDocumentTitle(t.auth.accountTitle);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  if (!user) return null; // RequireAuth handles this case.

  const memberSince = new Date(user.createdAt).toLocaleDateString(lang, { year: "numeric", month: "long", day: "numeric" });

  return (
    <section className="detail">
      <header className="page-header">
        <h1>{t.auth.hi(user.name.split(" ")[0] ?? user.name)}</h1>
        <p className="lead muted">{t.auth.memberSince(memberSince)}</p>
      </header>

      <dl className="facts">
        <div>
          <dt>{t.auth.name}</dt>
          <dd>{user.name}</dd>
        </div>
        <div>
          <dt>{t.auth.email}</dt>
          <dd>{user.email}</dd>
        </div>
        {user.age !== null && (
          <>
            <div>
              <dt>{t.auth.goal}</dt>
              <dd>{t.auth.goals[user.goal] ?? user.goal}</dd>
            </div>
            <div>
              <dt>{t.auth.age}</dt>
              <dd>{user.age}</dd>
            </div>
            <div>
              <dt>{t.auth.weight}</dt>
              <dd>{user.weightKg} kg</dd>
            </div>
            <div>
              <dt>{t.auth.height}</dt>
              <dd>{user.heightCm} cm</dd>
            </div>
            <div>
              <dt>{t.auth.conditions}</dt>
              <dd>{user.conditions.length
                  ? user.conditions.map((c) => t.auth.conditionLabels[c] ?? c).join(", ")
                  : t.auth.noneListed}</dd>
            </div>
          </>
        )}
      </dl>

      <button
        type="button"
        className="button button--secondary section"
        disabled={loggingOut}
        onClick={async () => {
          setLoggingOut(true);
          try {
            await logout();
            navigate("/", { replace: true });
          } finally {
            setLoggingOut(false);
          }
        }}
      >
        {loggingOut ? t.auth.loggingOut : t.auth.logOut}
      </button>
    </section>
  );
}
