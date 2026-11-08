import { useEffect, useRef, useState, type RefObject } from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { assess, RESOURCES, TOPIC_IDS, TOPICS, type Assessment, type Resource, type TopicId } from "./support";

const OPTIONS = [
  { value: "good", emoji: "😊", label: "Good" },
  { value: "okay", emoji: "😐", label: "Okay" },
  { value: "not-good", emoji: "☹️", label: "Not good" },
] as const;

type Mood = (typeof OPTIONS)[number]["value"];

type Step =
  | { kind: "mood" }
  | { kind: "thanks"; mood: Mood }
  | { kind: "skipped" }
  | { kind: "follow-up" }
  | { kind: "support"; result: Assessment };

export default function WellbeingCheckInPage() {
  useDocumentTitle("Well-being Check-in");
  const [step, setStep] = useState<Step>({ kind: "mood" });

  // Move focus to the new step's heading so screen readers announce it.
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const restart = () => setStep({ kind: "mood" });

  return (
    <section className="check-in">
      <header className="page-header">
        <h1>Mental Well-being Check-in</h1>
        {step.kind === "mood" && <p className="lead">How would you describe your overall mental well-being today?</p>}
      </header>

      {step.kind === "mood" && (
        <>
          <div className="check-in__options" role="group" aria-label="How are you feeling?">
            {OPTIONS.map((o) => (
              <button
                key={o.value}
                type="button"
                className="check-in__option"
                onClick={() => setStep(o.value === "not-good" ? { kind: "follow-up" } : { kind: "thanks", mood: o.value })}
              >
                <span className="check-in__emoji" aria-hidden="true">
                  {o.emoji}
                </span>
                {o.label}
              </button>
            ))}
          </div>
          <button type="button" className="button button--secondary" onClick={() => setStep({ kind: "skipped" })}>
            Skip
          </button>
        </>
      )}

      {step.kind === "thanks" && (
        <div className="card check-in__result" role="status">
          <h2 ref={headingRef} tabIndex={-1} className="lead">
            Thank you for sharing! {OPTIONS.find((o) => o.value === step.mood)?.emoji}
          </h2>
          {step.mood === "okay" && (
            <p>
              If something's on your mind,{" "}
              <button type="button" className="link-button" onClick={() => setStep({ kind: "follow-up" })}>
                you can tell me about it
              </button>
              .
            </p>
          )}
          <button type="button" className="button button--secondary" onClick={restart}>
            Change answer
          </button>
        </div>
      )}

      {step.kind === "skipped" && (
        <div className="card check-in__result" role="status">
          <h2 ref={headingRef} tabIndex={-1} className="lead">
            Survey skipped.
          </h2>
          <button type="button" className="button button--secondary" onClick={restart}>
            Take the check-in
          </button>
        </div>
      )}

      {step.kind === "follow-up" && (
        <FollowUp
          headingRef={headingRef}
          onBack={restart}
          onSubmit={(topics, text) => setStep({ kind: "support", result: assess(topics, text) })}
        />
      )}

      {step.kind === "support" && <Support headingRef={headingRef} result={step.result} onRestart={restart} />}
    </section>
  );
}

function FollowUp({
  headingRef,
  onBack,
  onSubmit,
}: {
  headingRef: RefObject<HTMLHeadingElement>;
  onBack: () => void;
  onSubmit: (topics: TopicId[], text: string) => void;
}) {
  const [selected, setSelected] = useState<TopicId[]>([]);
  const [text, setText] = useState("");

  const toggle = (id: TopicId) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));

  return (
    <form
      className="card check-in__follow-up"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(selected, text);
      }}
    >
      <h2 ref={headingRef} tabIndex={-1} className="check-in__title">
        I'm sorry you're not feeling good. Do you want to tell me what's going on?
      </h2>
      <p className="muted small">Pick anything that fits, or write in your own words. Both are optional.</p>

      <div className="check-in__topics" role="group" aria-label="What's going on?">
        {TOPIC_IDS.map((id) => (
          <button
            key={id}
            type="button"
            className="chip"
            aria-pressed={selected.includes(id)}
            onClick={() => toggle(id)}
          >
            {TOPICS[id].label}
          </button>
        ))}
      </div>

      <label htmlFor="check-in-text" className="check-in__label">
        What's on your mind?
      </label>
      <textarea
        id="check-in-text"
        className="check-in__textarea"
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="For example: I'm feeling bad because…"
      />
      <p className="muted small">What you write stays on this device. It isn't saved or sent anywhere.</p>

      <div className="check-in__actions">
        <button type="submit" className="button">
          Continue
        </button>
        <button type="button" className="button button--secondary" onClick={() => onSubmit([], "")}>
          I'd rather not say
        </button>
        <button type="button" className="link-button" onClick={onBack}>
          Back
        </button>
      </div>
    </form>
  );
}

function Support({
  headingRef,
  result,
  onRestart,
}: {
  headingRef: RefObject<HTMLHeadingElement>;
  result: Assessment;
  onRestart: () => void;
}) {
  const topics = result.topics.length ? result.topics : (["other"] as TopicId[]);

  return (
    <div className="check-in__support">
      {result.crisis ? (
        <aside className="check-in__crisis" role="alert" aria-labelledby="crisis-title">
          <h2 id="crisis-title" ref={headingRef} tabIndex={-1}>
            You don't have to go through this alone
          </h2>
          <p>
            It sounds like you might be thinking about hurting yourself. Please reach out right now. Someone is ready
            to listen, any time of day.
          </p>
          <div className="check-in__crisis-actions">
            <a className="button" href="tel:988">
              Call 988
            </a>
            <a className="button button--secondary" href="sms:988">
              Text 988
            </a>
          </div>
          <p className="small">If you're in immediate danger, call 911 or go to the nearest emergency room.</p>
        </aside>
      ) : (
        <h2 ref={headingRef} tabIndex={-1} className="check-in__title">
          Thank you for telling me
        </h2>
      )}

      {topics.map((id) => (
        <div key={id} className="card check-in__message">
          <p className="lead">{TOPICS[id].message}</p>
          {TOPICS[id].ideas.length > 0 && (
            <ul>
              {TOPICS[id].ideas.map((idea) => (
                <li key={idea}>{idea}</li>
              ))}
            </ul>
          )}
        </div>
      ))}

      <h2 className="check-in__subtitle">People you can talk to</h2>
      <p className="muted small">Free and confidential.</p>
      <ul className="check-in__resources">
        {result.resources.map((id) => (
          <ResourceCard key={id} resource={RESOURCES[id]} />
        ))}
      </ul>

      <p className="muted small">
        This check-in isn't a substitute for professional help. If you're struggling, please talk to a doctor,
        counselor, or someone you trust.
      </p>
      <button type="button" className="button button--secondary" onClick={onRestart}>
        Start over
      </button>
    </div>
  );
}

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <li className="card check-in__resource">
      <div className="check-in__resource-head">
        <h3 className="card__title">{resource.name}</h3>
        <span className="muted small">{resource.hours}</span>
      </div>
      <p>{resource.description}</p>
      <div className="check-in__resource-actions">
        {resource.actions.map((a) => {
          const external = a.href.startsWith("http");
          return (
            <a
              key={a.href}
              className="chip"
              href={a.href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {a.label}
              {external && <span className="visually-hidden"> (opens in a new tab)</span>}
            </a>
          );
        })}
      </div>
    </li>
  );
}
