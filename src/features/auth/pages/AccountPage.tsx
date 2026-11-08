import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import { useAuth } from "../AuthContext";

export default function AccountPage() {
  useDocumentTitle("Your account");
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  if (!user) return null; // RequireAuth handles this case.

  const memberSince = new Date(user.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  return (
    <section className="detail">
      <header className="page-header">
        <h1>Hi, {user.name.split(" ")[0]}</h1>
        <p className="lead muted">Member since {memberSince}</p>
      </header>

      <dl className="facts">
        <div>
          <dt>Name</dt>
          <dd>{user.name}</dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>{user.email}</dd>
        </div>
        <div>
          <dt>Goal</dt>
          <dd>{user.goal}</dd>
        </div>
        <div>
          <dt>Age</dt>
          <dd>{user.age}</dd>
        </div>
        <div>
          <dt>Weight</dt>
          <dd>{user.weightKg} kg</dd>
        </div>
        <div>
          <dt>Height</dt>
          <dd>{user.heightCm} cm</dd>
        </div>
        <div>
          <dt>Medical conditions</dt>
          <dd>{user.conditions.length ? user.conditions.join(", ") : "None listed"}</dd>
        </div>
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
        {loggingOut ? "Logging out…" : "Log out"}
      </button>
    </section>
  );
}
