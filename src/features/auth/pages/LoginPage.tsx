import { type FormEvent, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import { ApiRequestError } from "../../../lib/api";
import { useAuth } from "../AuthContext";
import Field from "../Field";
import { redirectTarget } from "../RequireAuth";

export default function LoginPage() {
  useDocumentTitle("Log in");
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
      setError(err instanceof ApiRequestError ? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <section className="auth-card card">
      <h1>Log in</h1>
      <p className="muted">Welcome back to Yerba Buena.</p>
      <form className="form" onSubmit={onSubmit} noValidate>
        {error && (
          <p className="alert alert--error" role="alert">
            {error}
          </p>
        )}
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />
        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="button button--block" disabled={submitting}>
          {submitting ? "Logging in…" : "Log in"}
        </button>
      </form>
      <p className="auth-card__switch">
        New here? <Link to="/signup" state={location.state}>Create an account</Link>
      </p>
    </section>
  );
}
