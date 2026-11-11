import { type FormEvent, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  basicSignupSchema,
  type BasicSignupInput,
  CONDITIONS,
  fieldErrorsFrom,
  GOALS,
  PASSWORD_MIN,
  type SignupInput,
  signupSchema,
} from "../../../../shared/auth";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import { ApiRequestError } from "../../../lib/api";
import { type Messages, useT } from "../../../i18n/LanguageContext";
import { useAuth } from "../AuthContext";
import Field from "../Field";
import { redirectTarget } from "../RequireAuth";

const OTHER = "other";

/** The public Cloudflare site asks only for name, email, and password (see `cf:deploy`). */
const BASIC_SIGNUP = import.meta.env.VITE_SIGNUP === "basic";
const schema = BASIC_SIGNUP ? basicSignupSchema : signupSchema;

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

function toInput(f: FormState): SignupInput | BasicSignupInput {
  if (BASIC_SIGNUP) return { name: f.name, email: f.email, password: f.password };
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

function translateErrors(t: Messages, errors: Record<string, string>): Record<string, string> {
  return Object.fromEntries(Object.entries(errors).map(([k, v]) => [k, t.translateError(v) ?? v]));
}

/** Moves focus to the first field with an error so keyboard and screen reader users land on it. */
function focusFirstError(errors: Record<string, string>) {
  const order = ["name", "email", "password", "age", "weightKg", "heightCm", "goal", "conditions"];
  const first = order.find((k) => errors[k]);
  const id = first === "goal" ? "field-goalOther" : first === "conditions" ? "field-conditionsOther" : `field-${first}`;
  requestAnimationFrame(() => document.getElementById(id)?.focus());
}

export default function SignupPage() {
  const t = useT();
  useDocumentTitle(t.auth.signUp);
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
    const parsed = schema.safeParse(input);
    if (!parsed.success) {
      const fieldErrors = translateErrors(t, fieldErrorsFrom(parsed.error));
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
        setErrors(translateErrors(t, err.fieldErrors));
        if (Object.keys(err.fieldErrors).length) focusFirstError(err.fieldErrors);
        else setFormError(t.translateError(err.message) ?? err.message);
      } else {
        setFormError(t.auth.genericError);
      }
    }
  }

  const errorCount = Object.keys(errors).length;

  return (
    <section className="auth-card auth-card--wide card">
      <h1>{t.auth.createTitle}</h1>
      <p className="muted">{BASIC_SIGNUP ? t.auth.basicLead : t.auth.fullLead}</p>

      <form className="form" onSubmit={onSubmit} noValidate>
        {(formError || errorCount > 0) && (
          <p className="alert alert--error" role="alert">
            {formError || (errorCount === 1 ? t.auth.fixOne : t.auth.fixMany)}
          </p>
        )}

        <h2 className="form__section">{t.auth.aboutYou}</h2>
        <Field
          label={t.auth.fullName}
          name="name"
          autoComplete="name"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          error={errors.name}
          required
        />
        <Field
          label={t.auth.email}
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          error={errors.email}
          required
        />
        <Field
          label={t.auth.password}
          name="password"
          type="password"
          autoComplete="new-password"
          hint={t.auth.passwordHint(PASSWORD_MIN)}
          value={form.password}
          onChange={(e) => set("password", e.target.value)}
          error={errors.password}
          required
        />
        {!BASIC_SIGNUP && (
        <>
        <div className="form__row">
          <Field
            label={t.auth.age}
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
            label={t.auth.weightKg}
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
            label={t.auth.heightCm}
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
            {t.auth.yourGoal}
          </label>
          <select
            id="field-goalChoice"
            className="input"
            value={form.goalChoice}
            onChange={(e) => set("goalChoice", e.target.value)}
          >
            {GOALS.map((g) => (
              <option key={g} value={g}>
                {t.auth.goals[g] ?? g}
              </option>
            ))}
            <option value={OTHER}>{t.auth.other}</option>
          </select>
        </div>
        {form.goalChoice === OTHER && (
          <Field
            label={t.auth.describeGoal}
            name="goalOther"
            maxLength={80}
            value={form.goalOther}
            onChange={(e) => set("goalOther", e.target.value)}
            error={errors.goal}
          />
        )}

        <fieldset className="field">
          <legend className="field__label">
            {t.auth.conditions} <span className="muted">{t.auth.optional}</span>
          </legend>
          <p className="field__hint">{t.auth.conditionsHint}</p>
          <div className="checkbox-grid">
            {CONDITIONS.map((c) => (
              <label key={c} className="checkbox">
                <input type="checkbox" checked={form.conditions.includes(c)} onChange={() => toggleCondition(c)} />
                {t.auth.conditionLabels[c] ?? c}
              </label>
            ))}
          </div>
          <Field
            label={t.auth.anythingElse}
            name="conditionsOther"
            placeholder={t.auth.anythingElsePlaceholder}
            maxLength={120}
            value={form.conditionsOther}
            onChange={(e) => set("conditionsOther", e.target.value)}
            error={errors.conditions}
          />
        </fieldset>
        </>
        )}

        <button type="submit" className="button button--block" disabled={submitting}>
          {submitting ? t.auth.creating : t.auth.createAccount}
        </button>
      </form>
      <p className="auth-card__switch">
        {t.auth.haveAccount} <Link to="/login" state={location.state}>{t.auth.logIn}</Link>
      </p>
    </section>
  );
}
