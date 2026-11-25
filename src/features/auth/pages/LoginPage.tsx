import { type FormEvent, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import { ApiRequestError } from "../../../lib/api";
import { useT } from "../../../i18n/LanguageContext";
import { useAuth } from "../AuthContext";
import Field from "../Field";
import { redirectTarget } from "../RequireAuth";

export default function LoginPage() {
  const t = useT();
  useDocumentTitle(t.auth.logIn);
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to={redirectTarget(location.state)} replace />;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login({ email, password });
      navigate(redirectTarget(location.state), { replace: true });
    } catch (err) {
      setError(err instanceof ApiRequestError ? (t.translateError(err.message) ?? err.message) : t.auth.genericError);
      setSubmitting(false);
    }
  }

  return (
    <section className="auth-card card">
      <h1>{t.auth.logIn}</h1>
      <p className="muted">{t.auth.welcomeBack}</p>
      <form className="form" onSubmit={onSubmit} noValidate>
        {error && (
          <p className="alert alert--error" role="alert">
            {error}
          </p>
        )}
        <Field
          label={t.auth.email}
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />
        <Field
          label={t.auth.password}
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="button button--block" disabled={submitting}>
          {submitting ? t.auth.loggingIn : t.auth.logIn}
        </button>
      </form>
      <p className="auth-card__switch">
        {t.auth.newHere} <Link to="/signup" state={location.state}>{t.auth.createAccountLink}</Link>
      </p>
    </section>
  );
}
