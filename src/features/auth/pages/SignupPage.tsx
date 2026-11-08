import { type FormEvent, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { CONDITIONS, fieldErrorsFrom, GOALS, PASSWORD_MIN, type SignupInput, signupSchema } from "../../../../shared/auth";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import { ApiRequestError } from "../../../lib/api";
import { useAuth } from "../AuthContext";
import Field from "../Field";
import { redirectTarget } from "../RequireAuth";

const OTHER = "other";

interface FormState {
  name: string;
  email: string;
  password: string;
  age: string;
  weightKg: string;
  heightCm: string;
  goalChoice: string;
  goalOther: string;
  conditions: string[];
  conditionsOther: string;
}

const EMPTY: FormState = {
  name: "",
  email: "",
  password: "",
  age: "",
  weightKg: "",
  heightCm: "",
  goalChoice: GOALS[0],
  goalOther: "",
  conditions: [],
  conditionsOther: "",
};

function toInput(f: FormState): SignupInput {
  const other = f.conditionsOther.trim();
  return {
    name: f.name,
    email: f.email,
    password: f.password,
    age: f.age,
    weightKg: f.weightKg,
    heightCm: f.heightCm,
    goal: f.goalChoice === OTHER ? f.goalOther : f.goalChoice,
    conditions: other ? [...f.conditions, other] : f.conditions,
  };
}

/** Moves focus to the first field with an error so keyboard and screen reader users land on it. */
function focusFirstError(errors: Record<string, string>) {
  const order = ["name", "email", "password", "age", "weightKg", "heightCm", "goal", "conditions"];
  const first = order.find((k) => errors[k]);
  const id = first === "goal" ? "field-goalOther" : first === "conditions" ? "field-conditionsOther" : `field-${first}`;
  requestAnimationFrame(() => document.getElementById(id)?.focus());
}

export default function SignupPage() {
  useDocumentTitle("Sign up");
  const { user, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to={redirectTarget(location.state)} replace />;

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }));
  const toggleCondition = (c: string) =>
    set("conditions", form.conditions.includes(c) ? form.conditions.filter((x) => x !== c) : [...form.conditions, c]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError("");
    const input = toInput(form);
    const parsed = signupSchema.safeParse(input);
    if (!parsed.success) {
      const fieldErrors = fieldErrorsFrom(parsed.error);
      setErrors(fieldErrors);
      focusFirstError(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      await signup(input);
      navigate(redirectTarget(location.state), { replace: true });
    } catch (err) {
      setSubmitting(false);
      if (err instanceof ApiRequestError) {
        setErrors(err.fieldErrors);
        if (Object.keys(err.fieldErrors).length) focusFirstError(err.fieldErrors);
        else setFormError(err.message);
      } else {
        setFormError("Something went wrong. Please try again.");
      }
    }
  }

  const errorCount = Object.keys(errors).length;

  return (
    <section className="auth-card auth-card--wide card">
      <h1>Create your account</h1>
      <p className="muted">A few details help us tailor workouts and keep you safe.</p>

      <form className="form" onSubmit={onSubmit} noValidate>
        {(formError || errorCount > 0) && (
          <p className="alert alert--error" role="alert">
            {formError || (errorCount === 1 ? "Please fix the highlighted field." : "Please fix the highlighted fields.")}
          </p>
        )}

        <h2 className="form__section">About you</h2>
        <Field
          label="Full name"
          name="name"
          autoComplete="name"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          error={errors.name}
          required
        />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          error={errors.email}
          required
        />
        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          hint={`At least ${PASSWORD_MIN} characters.`}
          value={form.password}
          onChange={(e) => set("password", e.target.value)}
          error={errors.password}
          required
        />
        <div className="form__row">
          <Field
            label="Age"
            name="age"
            type="number"
            inputMode="numeric"
            min={13}
            max={110}
            value={form.age}
            onChange={(e) => set("age", e.target.value)}
            error={errors.age}
            required
          />
          <Field
            label="Weight (kg)"
            name="weightKg"
            type="number"
            inputMode="decimal"
            step="0.1"
            value={form.weightKg}
            onChange={(e) => set("weightKg", e.target.value)}
            error={errors.weightKg}
            required
          />
          <Field
            label="Height (cm)"
            name="heightCm"
            type="number"
            inputMode="decimal"
            step="0.1"
            value={form.heightCm}
            onChange={(e) => set("heightCm", e.target.value)}
            error={errors.heightCm}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="field-goalChoice" className="field__label">
            Your goal
          </label>
          <select
            id="field-goalChoice"
            className="input"
            value={form.goalChoice}
            onChange={(e) => set("goalChoice", e.target.value)}
          >
            {GOALS.map((g) => (
              <option key={g}>{g}</option>
            ))}
            <option value={OTHER}>Other…</option>
          </select>
        </div>
        {form.goalChoice === OTHER && (
          <Field
            label="Describe your goal"
            name="goalOther"
            maxLength={80}
            value={form.goalOther}
            onChange={(e) => set("goalOther", e.target.value)}
            error={errors.goal}
          />
        )}

        <fieldset className="field">
          <legend className="field__label">
            Medical conditions <span className="muted">(optional)</span>
          </legend>
          <p className="field__hint">These help your trainer keep workouts safe.</p>
          <div className="checkbox-grid">
            {CONDITIONS.map((c) => (
              <label key={c} className="checkbox">
                <input type="checkbox" checked={form.conditions.includes(c)} onChange={() => toggleCondition(c)} />
                {c}
              </label>
            ))}
          </div>
          <Field
            label="Anything else?"
            name="conditionsOther"
            placeholder="e.g. migraines"
            maxLength={120}
            value={form.conditionsOther}
            onChange={(e) => set("conditionsOther", e.target.value)}
            error={errors.conditions}
          />
        </fieldset>

        <button type="submit" className="button button--block" disabled={submitting}>
          {submitting ? "Creating your account…" : "Create account"}
        </button>
      </form>
      <p className="auth-card__switch">
        Already have an account? <Link to="/login" state={location.state}>Log in</Link>
      </p>
    </section>
  );
}
