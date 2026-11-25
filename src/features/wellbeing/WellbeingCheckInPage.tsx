import { useEffect, useRef, useState, type RefObject } from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { type Messages, useLanguage, useT } from "../../i18n/LanguageContext";
import { assess, RESOURCES, TOPIC_IDS, TOPICS, type Assessment, type Resource, type ResourceId, type TopicId } from "./support";
import { RESOURCE_TEXT_ES, TOPIC_TEXT_ES } from "./support.es";
import { RESOURCE_TEXT_JA, TOPIC_TEXT_JA } from "./support.ja";
import { RESOURCE_TEXT_ZH, TOPIC_TEXT_ZH } from "./support.zh";

/** Translated topic and resource text. English is the source, in support.ts. */
const TOPIC_TEXT = { es: TOPIC_TEXT_ES, ja: TOPIC_TEXT_JA, zh: TOPIC_TEXT_ZH };
const RESOURCE_TEXT = { es: RESOURCE_TEXT_ES, ja: RESOURCE_TEXT_JA, zh: RESOURCE_TEXT_ZH };

const OPTIONS = [
  { value: "good", emoji: "😊" },
  { value: "okay", emoji: "😐" },
  { value: "not-good", emoji: "☹️" },
] as const;

/** Topic and resource text in the visitor's language. */
function useSupportText() {
  const { lang } = useLanguage();
  return {
    topic: (id: TopicId) => (lang === "en" ? TOPICS[id] : { ...TOPICS[id], ...TOPIC_TEXT[lang][id] }),
    resource: (id: ResourceId): Resource => (lang === "en" ? RESOURCES[id] : { ...RESOURCES[id], ...RESOURCE_TEXT[lang][id] }),
  };
}

type Mood = (typeof OPTIONS)[number]["value"];

type Step =
  | { kind: "mood" }
  | { kind: "thanks"; mood: Mood }
  | { kind: "skipped" }
  | { kind: "follow-up" }
  | { kind: "support"; result: Assessment };

export default function WellbeingCheckInPage() {
  const t = useT();
  useDocumentTitle(t.checkIn.docTitle);
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
        <h1>{t.checkIn.title}</h1>
        {step.kind === "mood" && <p className="lead">{t.checkIn.question}</p>}
      </header>

      {step.kind === "mood" && (
        <>
          <div className="check-in__options" role="group" aria-label={t.checkIn.optionsLabel}>
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
                {t.checkIn.moods[o.value]}
              </button>
            ))}
          </div>
          <button type="button" className="button button--secondary" onClick={() => setStep({ kind: "skipped" })}>
            {t.checkIn.skip}
          </button>
        </>
      )}

      {step.kind === "thanks" && (
        <div className="card check-in__result" role="status">
          <h2 ref={headingRef} tabIndex={-1} className="lead">
            {t.checkIn.thanks} {OPTIONS.find((o) => o.value === step.mood)?.emoji}
          </h2>
          {step.mood === "okay" && (
            <p>
              {t.checkIn.okayBefore}{" "}
              <button type="button" className="link-button" onClick={() => setStep({ kind: "follow-up" })}>
                {t.checkIn.okayLink}
              </button>
              .
            </p>
          )}
          <button type="button" className="button button--secondary" onClick={restart}>
            {t.checkIn.change}
          </button>
        </div>
      )}

      {step.kind === "skipped" && (
        <div className="card check-in__result" role="status">
          <h2 ref={headingRef} tabIndex={-1} className="lead">
            {t.checkIn.skipped}
          </h2>
          <button type="button" className="button button--secondary" onClick={restart}>
            {t.checkIn.take}
          </button>
        </div>
      )}

      {step.kind === "follow-up" && (
        <FollowUp
          t={t}
          headingRef={headingRef}
          onBack={restart}
          onSubmit={(topics, text) => setStep({ kind: "support", result: assess(topics, text) })}
        />
      )}

      {step.kind === "support" && <Support t={t} headingRef={headingRef} result={step.result} onRestart={restart} />}
    </section>
  );
}

function FollowUp({
  t,
  headingRef,
  onBack,
  onSubmit,
}: {
  t: Messages;
  headingRef: RefObject<HTMLHeadingElement>;
  onBack: () => void;
  onSubmit: (topics: TopicId[], text: string) => void;
}) {
  const [selected, setSelected] = useState<TopicId[]>([]);
  const [text, setText] = useState("");
  const { topic } = useSupportText();

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
        {t.checkIn.followUpTitle}
      </h2>
      <p className="muted small">{t.checkIn.followUpHint}</p>

      <div className="check-in__topics" role="group" aria-label={t.checkIn.topicsLabel}>
        {TOPIC_IDS.map((id) => (
          <button
            key={id}
            type="button"
            className="chip"
            aria-pressed={selected.includes(id)}
            onClick={() => toggle(id)}
          >
            {topic(id).label}
          </button>
        ))}
      </div>

      <label htmlFor="check-in-text" className="check-in__label">
        {t.checkIn.textLabel}
      </label>
      <textarea
        id="check-in-text"
        className="check-in__textarea"
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t.checkIn.textPlaceholder}
      />
      <p className="muted small">{t.checkIn.privacy}</p>

      <div className="check-in__actions">
        <button type="submit" className="button">
          {t.checkIn.continue}
        </button>
        <button type="button" className="button button--secondary" onClick={() => onSubmit([], "")}>
          {t.checkIn.ratherNot}
        </button>
        <button type="button" className="link-button" onClick={onBack}>
          {t.checkIn.back}
        </button>
      </div>
    </form>
  );
}

function Support({
  t,
  headingRef,
  result,
  onRestart,
}: {
  t: Messages;
  headingRef: RefObject<HTMLHeadingElement>;
  result: Assessment;
  onRestart: () => void;
}) {
  const topics = result.topics.length ? result.topics : (["other"] as TopicId[]);
  const { topic, resource } = useSupportText();

  return (
    <div className="check-in__support">
      {result.crisis ? (
        <aside className="check-in__crisis" role="alert" aria-labelledby="crisis-title">
          <h2 id="crisis-title" ref={headingRef} tabIndex={-1}>
            {t.checkIn.crisisTitle}
          </h2>
          <p>{t.checkIn.crisisText}</p>
          <div className="check-in__crisis-actions">
            <a className="button" href="tel:988">
              {t.checkIn.call988}
            </a>
            <a className="button button--secondary" href="sms:988">
              {t.checkIn.text988}
            </a>
          </div>
          <p className="small">{t.checkIn.crisisEmergency}</p>
        </aside>
      ) : (
        <h2 ref={headingRef} tabIndex={-1} className="check-in__title">
          {t.checkIn.thankYou}
        </h2>
      )}

      {topics.map((id) => (
        <div key={id} className="card check-in__message">
          <p className="lead">{topic(id).message}</p>
          {topic(id).ideas.length > 0 && (
            <ul>
              {topic(id).ideas.map((idea) => (
                <li key={idea}>{idea}</li>
              ))}
            </ul>
          )}
        </div>
      ))}

      <h2 className="check-in__subtitle">{t.checkIn.peopleTitle}</h2>
      <p className="muted small">{t.checkIn.peopleNote}</p>
      <ul className="check-in__resources">
        {result.resources.map((id) => (
          <ResourceCard key={id} resource={resource(id)} newTab={t.checkIn.newTab} />
        ))}
      </ul>

      <p className="muted small">{t.checkIn.disclaimer}</p>
      <button type="button" className="button button--secondary" onClick={onRestart}>
        {t.checkIn.startOver}
      </button>
    </div>
  );
}

function ResourceCard({ resource, newTab }: { resource: Resource; newTab: string }) {
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
              {external && <span className="visually-hidden"> {newTab}</span>}
            </a>
          );
        })}
      </div>
    </li>
  );
}
